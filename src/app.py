"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
# from models import Person


ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False
# Database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)
# Other configurations
CORS(app)  # Allow CORS requests to this API
setup_admin(app)  # add the admin
setup_commands(app)  # add the admin
app.register_blueprint(api, url_prefix='/api')  # Add all endpoints form the API with a "api" prefix

app.config["JWT_SECRET_KEY"] = os.getenv("JWT_API_KEY")
jwt = JWTManager(app)


# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')


# Any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # Avoid cache memory
    return response


@app.route('/stripe-key', methods = ['GET'])
def get_publishable_key():
    stripe_config = {"publicKey": stripe_keys["publishable_key"]}
    return jsonify(stripe_config)


@app.route('/payment', methods=['POST'])
@jwt_required()
def stripe_payment():
    identity = get_jwt_identity()
    if identity[1]:
        response_body['message'] = "Administradores no realizan compras"
        return response_body, 401
    try:
        # Genero el listado de items
        bill = db.session.execute(db.select(Bills).where(Bills.user_id == identity[0],
                                                         Bills.status == 'pending')).scalar()
        bill_items = db.session.execute(db.select(BillItems).where(BillItems.bill_id == bill.id)).scalars()
        bill_items_list = [item.serialize() for item in bill_items]
        line_items = [{'price': item['stripe_price'], 'quantity': item['quantity']} for item in bill_items_list]
        # Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        session = stripe.checkout.Session.create(line_items=line_items,
                                                 mode='payment',
                                                 success_url=front_url + '/payment-success',
                                                 cancel_url=front_url + '/payment-canceled')
        response_body = {'sessionId': session['id']}
        return response_body, 200
    except Exception as e:
        response_body = {'message': str(e)}
        return response_body, 403
    # return jsonify(clientSecret=session.client_secret)


# This only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
