"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Products
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend"}
    return jsonify(response_body), 200

# Users, Products, ShoppingCarts, Bills, Favorites, Reviews, Categories, Offers, Suscriptions, TicketCustomerSupport

@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    if request.method == 'GET':
        users = db.session.execute(db.select(Users).order_by(Users.email)).scalars()
        # response_body = Users.query.all()  # Se aplica la nueva documentacion utilizando select, porque los .query quedaron legacy en la version 3.x
        user_list = [user.serialize() for user in users]
        response_body = {'message': 'Listado de usuarios',
                         'results': user_list}
        return response_body, 200
    if request.method == 'POST':
        users = Users(email='', password='')
        db.session.add(users)
        db.session.commit()
        response_body = {'message': 'Usuario agregado',
                         'results': users}
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


@api.route('/products', methods=['GET'])
def get_products():
    response_body = Products.query.all()
    product_list = [product.serialize() for product in response_body]
    return jsonify(product_list), 200   
