from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Products, Bills, Favorites, Reviews, Categories, Offers, Suscriptions, TicketCostumerSupports, ShoppingCarts
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
        user = db.session.get(Users, users_id)
        if user is None:
            return {'message': 'User not found'}, 404
        response_body = user.serialize()
        return response_body, 200
    if request.method == 'PUT':
        request_body = request.get_json()
        user = db.session.get(Users, users_id)
        if user is None:
            return {'message': 'Usuario no encontrado'}, 404
        user.email = request_body.get('email')
        user.password = request_body.get('password')
        user.is_admin = request_body.get('is_admin')
        user.is_active = request_body.get('is_active')
        user.first_name = request_body.get('first_name')
        user.last_name = request_body.get('last_name')
        user.address = request_body.get('address')
        user.identification_number = request_body.get('identification_number')
        user.identification_type = request_body.get('identification_type')
        user.payment_method = request_body.get('payment_method')
        db.session.commit()
        response_body = {'message': 'Usuario actualizado',
                         'results': user.serialize()}
        return response_body, 200
    if request.method == 'DELETE':
        user = db.session.get(Users, users_id)
        if user is None:
            return {'message': 'Usuario no encontrado'}, 404
        db.session.delete(user)
        db.session.commit()
        response_body = {'message': 'Usuario eliminado'}
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
                               categorie_id=request_body.get('categorie_id')) #  Esta está ok? la intencion es mostrar el nombre de la categoria unicamente y al crear un producto se deberia poder crear una categoria nueva
        db.session.add(new_product)
        db.session.commit()
        response_body = {'message': 'Producto agregado',
                         'results': new_product.serialize()}
        return response_body, 200


@api.route('/products/<int:products_id>', methods=['GET', 'PUT', 'DELETE'])
def products(products_id):
    if request.method == 'GET':
        product = db.session.get(Products, products_id)
        if product is None:
            return {'message': 'Product not found'}, 404
        response_body = product.serialize()
        return response_body, 200
    if request.method == 'PUT':
        request_body = request.get_json()
        product = db.session.get(Products, products_id)
        if product is None:
            return {'message': 'Producto no encontrado'}, 404
        product.name = request_body.get('name')
        product.description = request_body.get('description')
        product.products_detail = request_body.get('products_detail')
        product.pricing = request_body.get('pricing')
        product.weight = request_body.get('weight')
        product.stock = request_body.get('stock')
        product.subscribeable = request_body.get('subscribeable')
        product.image_url = request_body.get('image_url')
        db.session.commit()
        response_body = {'message': 'Producto actualizado',
                         'results': product.serialize()}
        return response_body, 200
    if request.method == 'DELETE':
        product = db.session.get(Products, products_id)
        if product is None:
            return {'message': 'Producto no encontrado'}, 404
        db.session.delete(product)
        db.session.commit()
        response_body = {'message': 'Producto eliminado'}
        return response_body, 200


@api.route('/shopping-carts', methods=['GET'])
def handle_shopping_carts():
    shopping_carts = db.session.execute(db.select(ShoppingCarts).order_by(ShoppingCarts.id)).scalars()
    shopping_cart_list = [shopping_cart.serialize() for shopping_cart in shopping_carts]
    response_body = {'message': 'Listado de carritos',
                     'results': shopping_cart_list}
    return response_body, 200


@api.route('/users/<int:users_id>/shopping-carts', methods=['GET', 'POST', 'DELETE'])
def shopping_carts(users_id):
    if request.method == 'GET':
        shopping_cart = db.session.get(ShoppingCarts, users_id)
        if shopping_cart is None:
            return {'message': 'shopping_cart not found'}, 404
        response_body = shopping_cart.serialize()
        return response_body, 200
    if request.method == 'POST':
        request_body = request.get_json()
        shopping_cart = db.session.get(ShoppingCarts, users_id)
        if product is None:
            return {'message': 'Carrito no encontrado'}, 404
        shopping_cart.total_price = request_body.get('total_price')
        shopping_cart.shipping_total_price = request_body.get('shipping_total_price')
        shopping_cart.user_id = request_body.get('user_id')
        db.session.commit()
        response_body = {'message': 'Carrito creado',
                         'results': shopping_cart.serialize()}
        return response_body, 200
    if request.method == 'DELETE':
        shopping_cart = db.session.get(ShoppingCarts, users_id)
        if shopping_cart is None:
            return {'message': 'Carrito no encontrado'}, 404
        db.session.delete(shopping_cart)
        db.session.commit()
        response_body = {'message': 'Carrito eliminado'}
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
    if request.method == 'DELETE': #  Deberia poder eliminar un producto de la lista pero no la lista?
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


@api.route('/categories/<int:categories_id>', methods=['GET', 'PUT', 'DELETE'])
def categories(categories_id):
    if request.method == 'GET':
        categorie = db.session.get(Categories, categories_id)
        if categorie is None:
            return {'message': 'Categorie not found'}, 404
        response_body = categorie.serialize()
        return response_body, 200
    if request.method == 'PUT':
        request_body = request.get_json()
        categorie = db.session.get(Categories, categories_id)
        if categorie is None:
            return {'message': 'Categoria no encontrada'}, 404
        categorie.name = request_body.get('name')
        db.session.commit()
        response_body = {'message': 'Categoria actualizada',
                         'results': categorie.serialize()}
        return response_body, 200
    if request.method == 'DELETE':
        categorie = db.session.get(Categories, categories_id)
        if categorie is None:
            return {'message': 'Categoria no encontrada'}, 404
        db.session.delete(categorie)
        db.session.commit()
        response_body = {'message': 'Categoria eliminada'}
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


@api.route('/suscriptions', methods=['GET', 'POST'])
def handle_suscriptions():
    if request.method == 'GET':
        suscriptions = db.session.execute(db.select(Suscriptions).order_by(Suscriptions.id)).scalars()
        suscription_list = [suscription.serialize() for suscription in suscriptions]
        response_body = {'message': 'Listado de suscripciones',
                         'results': suscription_list}
        return response_body, 200
    if request.method == 'POST':
        request_body = request.get_json()
        new_suscription = Suscriptions(quantity=request_body.get('quantity'), 
                                       frecuency=request_body.get('frecuency'), 
                                       user_id=request_body.get('user_id'),
                                       product_id=request_body.get('product_id'))
        db.session.add(new_suscription)
        db.session.commit()
        response_body = {'message': 'Suscripcion agregada',
                         'results': new_suscription.serialize()}
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


@api.route('/ticket-costumer-supports', methods=['GET'])
def handle_ticket_costumer_supports():
    ticket_costumer_supports = db.session.execute(db.select(TicketCostumerSupports).order_by(TicketCostumerSupports.id)).scalars()
    ticket_costumer_support_list = [ticket_costumer_support.serialize() for ticket_costumer_support in ticket_costumer_supports]
    response_body = {'message': 'Listado de tickets',
                     'results': ticket_costumer_support_list}
    return response_body, 200


@api.route('/ticket-costumer-supports/<int:ticket_costumer_supports_id>', methods=['GET', 'POST', 'DELETE'])
def ticket_costumer_supports(ticket_costumer_supports_id):
    if request.method == 'GET':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200  
    if request.method == 'POST':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200 
    if request.method == 'DELETE':
        response_body = {'message': 'endpoint todavia no realizado'}
        return response_body, 200
