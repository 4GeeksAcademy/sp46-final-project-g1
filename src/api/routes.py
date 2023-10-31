from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Products, Bills, Favorites, Reviews, Categories, Offers
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend"}
    return jsonify(response_body), 200

#  Users, Products, ShoppingCarts, Bills, Favorites, Reviews, Categories, Offers, Suscriptions, TicketCustomerSupport

@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        users = db.session.execute(db.select(Users).order_by(Users.email)).scalars()
        user_list = [user.serialize() for user in users]
        response_body = {'message': 'Listado de usuarios',
                         'results': user_list}
        return response_body, 200
    if request.method == 'POST':
        request_body = request.get_json()
        new_user = Users(email=request_body.get('email'), 
                         password=request_body.get('password'), 
                         is_admin=request_body.get('is_admin'),
                         is_active=request_body.get('is_active'),
                         first_name=request_body.get('first_name'),
                         last_name=request_body.get('last_name'),
                         address=request_body.get('address'),
                         identification_number=request_body.get('identification_number'),
                         identification_type=request_body.get('identification_type'),
                         payment_method=request_body.get('payment_method'))
        db.session.add(new_user)
        db.session.commit()
        response_body = {'message': 'Usuario agregado',
                         'results': new_user.serialize()}
        return response_body, 200


@api.route('/users/<int:users_id>', methods=['GET', 'PUT', 'DELETE'])
def users(users_id):
    if request.method == 'GET':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200  
    if request.method == 'PUT':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200       


@api.route('/products', methods=['GET', 'POST'])
def handle_products():
    if request.method == 'GET':
        products = db.session.execute(db.select(Products).order_by(Products.id)).scalars()
        product_list = [product.serialize() for product in products]
        response_body = {'message': 'Listado de productos',
                         'results': product_list}
        return response_body, 200
    if request.method == 'POST':
        request_body = request.get_json()
        new_product = Products(name=request_body.get('name'), 
                               description=request_body.get('description'), 
                               products_detail=request_body.get('products_detail'),
                               pricing=request_body.get('pricing'),
                               weight=request_body.get('weight'),
                               stock=request_body.get('stock'),
                               subscribeable=request_body.get('subscribeable'),
                               image_url=request_body.get('image_url'),
                               categorie_id=request_body.get('categorie_id')) #  Esta está ok? la intencion es mostrar el nombre de la categoria unicamente
        db.session.add(new_product)
        db.session.commit()
        response_body = {'message': 'Producto agregado',
                         'results': new_product.serialize()}
        return response_body, 200


@api.route('/products/<int:products_id>', methods=['GET', 'PUT', 'DELETE'])
def products(products_id):
    if request.method == 'GET':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200  
    if request.method == 'PUT':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200


@api.route('/bills', methods=['GET'])
def handle_bills():
    bills = db.session.execute(db.select(Bills).order_by(Bills.id)).scalars()
    bill_list = [bill.serialize() for bill in bills]
    response_body = {'message': 'Listado de bills',
                     'results': bill_list}
    return response_body, 200



@api.route('/bills/<int:bills_id>', methods=['GET', 'POST', 'DELETE'])
def bills(bills_id):
    if request.method == 'GET':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200  
    if request.method == 'POST':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 
    if request.method == 'DELETE': #  No se deberia poder elimnar las facturas?
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200


@api.route('/favorites', methods=['GET'])
def handle_favorites():
    favorites = db.session.execute(db.select(Favorites).order_by(Favorites.id)).scalars()
    favorite_list = [favorite.serialize() for favorite in favorites]
    response_body = {'message': 'Listado de favoritos',
                     'results': favorite_list}
    return response_body, 200



@api.route('/favorites/<int:favorites_id>', methods=['GET', 'POST', 'DELETE'])
def favorites(favorites_id):
    if request.method == 'GET':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200  
    if request.method == 'POST':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 
    if request.method == 'DELETE': #  Deberia poder eliminar un producto de la lista pero no la lista
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200


@api.route('/reviews', methods=['GET'])
def handle_reviews():
    reviews = db.session.execute(db.select(Reviews).order_by(Reviews.id)).scalars()
    review_list = [review.serialize() for review in reviews]
    response_body = {'message': 'Listado de reviews',
                     'results': review_list}
    return response_body, 200



@api.route('/reviews/<int:reviews_id>', methods=['GET', 'POST', 'DELETE'])
def reviews(reviews_id):
    if request.method == 'GET':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200  
    if request.method == 'POST':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200


@api.route('/categories', methods=['GET', 'POST'])
def handle_categories():
    if request.method == 'GET':
        categories = db.session.execute(db.select(Categories).order_by(Categories.id)).scalars()
        categorie_list = [categorie.serialize() for categorie in categories]
        response_body = {'message': 'Listado de categorias',
                         'results': categorie_list}
        return response_body, 200
    if request.method == 'POST':
        request_body = request.get_json()
        new_categorie = Categories(name=request_body.get('name'))
        db.session.add(new_categorie)
        db.session.commit()
        response_body = {'message': 'Categoria agregada',
                         'results': new_categorie.serialize()}
        return response_body, 200


@api.route('/offers', methods=['GET'])
def handle_offers():
    offers = db.session.execute(db.select(Offers).order_by(Offers.id)).scalars()
    offer_list = [offer.serialize() for offer in offers]
    response_body = {'message': 'Listado de ofertas',
                     'results': offer_list}
    return response_body, 200


@api.route('/offers/<int:offers_id>', methods=['GET', 'POST', 'DELETE'])
def offers(offers_id):
    if request.method == 'GET':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200  
    if request.method == 'POST':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200


@api.route('/suscriptions', methods=['GET'])
def handle_suscriptions():
    suscriptions = db.session.execute(db.select(Suscriptions).order_by(Suscriptions.id)).scalars()
    suscription_list = [suscription.serialize() for suscription in suscriptions]
    response_body = {'message': 'Listado de ofertas',
                     'results': suscription_list}
    return response_body, 200


@api.route('/suscriptions/<int:suscriptions_id>', methods=['GET', 'POST', 'DELETE'])
def suscriptions(suscriptions_id):
    if request.method == 'GET':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200  
    if request.method == 'POST':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200