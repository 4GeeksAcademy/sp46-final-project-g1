from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Products, Bills, BillItems, Favorites, Reviews, Categories, Offers, Suscriptions, TicketCostumerSupports, ShoppingCarts, ShoppingCartItems
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
    shopping_carts = db.session.query(ShoppingCarts).order_by(ShoppingCarts.id).all()
    shopping_cart_list = []
    for shopping_cart in shopping_carts:
        current_shopping_cart = shopping_cart.serialize()
        item_list = []
        items = db.session.query(ShoppingCartItems).filter_by(shopping_cart_id=shopping_cart.id).all()
        for item in items:
            current_item = item.serialize()
            item_list.append(current_item)
        current_shopping_cart['shopping_cart_items'] = item_list
        shopping_cart_list.append(current_shopping_cart)
    response_body = {'message': 'Listado de carritos', 'results': shopping_cart_list}
    return response_body, 200


@api.route('/users/<int:users_id>/shopping-carts', methods=['GET', 'POST', 'DELETE'])
def shopping_carts(users_id):
    if request.method == 'GET':
        shopping_cart = db.one_or_404(db.select(ShoppingCarts).filter_by(user_id=users_id),
                                      description=f"No user named")
        response_body = {'message': 'Carrito creado',
                         'results': shopping_cart.serialize()}
        return response_body, 200
    if request.method == 'POST':
        request_body = request.get_json()
        if 'total_price' not in request_body or 'shipping_total_price' not in request_body or 'user_id' not in request_body: # no deberia ser necesario escribir manualmente el numero de id de usuario si ya está en la url
            return {'message': 'Invalid request body'}, 400
        existing_shopping_cart = db.session.get(ShoppingCarts, users_id)
        if existing_shopping_cart is None:
            shopping_cart = ShoppingCarts(total_price=request_body['total_price'],
                                          shipping_total_price=request_body['shipping_total_price'],
                                          user_id=request_body['user_id'])
            db.session.add(shopping_cart)
            db.session.commit()
        response_body = {'message': 'Carrito creado',
                         'results': shopping_cart.serialize()}
        return response_body, 200
    if request.method == 'DELETE':
        shopping_cart = db.one_or_404(db.select(ShoppingCarts).filter_by(user_id=users_id),
                                      description=f"Este usuario no tiene carrito")
        db.session.delete(shopping_cart)
        db.session.commit()
        response_body = {'message': 'Carrito eliminado'}
        return response_body, 200


# @api.route('/bills', methods=['GET'])
# def handle_bills():
#     bills = db.session.execute(db.select(Bills).order_by(Bills.id)).all()
#     #  bill_list = [bill.serialize() for bill in bills]
#     bill_list = []
#     for bill in bills: 
#         item_list = []
#         current_bill = bill.serialize()
#         items = db.session.execute(db.select(BillItems).filter_by(bill_id = bill.id)).scalars()
#         print(items)
#         for item in items:
#             current_item = item.serialize()
#             print(current_item)
#             item_list.append(current_item)
#         current_bill[items] = item_list
#         bill_list.append(current_bill)
#     response_body = {'message': 'Listado de bills',
#                      'results': bill_list}
#     return response_body, 200


@api.route('/bills', methods=['GET'])
def handle_bills():
    bills = db.session.query(Bills).order_by(Bills.id).all()
    bill_list = []
    for bill in bills:
        current_bill = bill.serialize()
        item_list = []
        items = db.session.query(BillItems).filter_by(bill_id=bill.id).all()
        for item in items:
            current_item = item.serialize()
            item_list.append(current_item)
        current_bill['bill_items'] = item_list
        bill_list.append(current_bill)
    response_body = {'message': 'Listado de bills', 'results': bill_list}
    return response_body, 200


@api.route('/users/<int:user_id>/bills', methods=['GET', 'POST', 'DELETE'])
def user_bills(user_id):
    if request.method == 'GET':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        user_bills = db.session.query(Bills).filter_by(user_id=user_id).all()
        bill_list = []
        for bill in user_bills:
            current_bill = bill.serialize()
            item_list = []
            items = db.session.query(BillItems).filter_by(bill_id=bill.id).all()
            for item in items:
                current_item = item.serialize()
                item_list.append(current_item)
            current_bill['bill_items'] = item_list
            bill_list.append(current_bill)
        response_body = {'message': f'Facturas de usuario {user_id}', 'results': bill_list}
        return response_body, 200
    elif request.method == 'POST':
        request_body = request.get_json()
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        new_bill = Bills(created_at=request_body['created_at'],
                        total_price=request_body['total_price'],
                        order_number=request_body['order_number'],
                        status=request_body['status'],
                        bill_address=request_body['bill_address'],
                        delivery_address=request_body['delivery_address'],
                        payment_method=request_body['payment_method'],
                        user_id=request_body['user_id'])
        db.session.add(new_bill)
        db.session.commit()
        response_body = {'message': 'Nueva factura creada para el usuario', 'result': new_bill.serialize()}
        return response_body, 201  # Código 201: Created
    elif request.method == 'DELETE':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        user_bills = db.session.query(Bills).filter_by(user_id=user_id).all()
        for bill in user_bills:
            db.session.delete(bill)
        db.session.commit()
        return {'message': f'Todas las facturas del usuario {user_id} han sido eliminadas'}, 200


# @api.route('/users/<int:users_id>/bills', methods=['GET', 'POST', 'DELETE'])
# def bills(users_id):
#     if request.method == 'GET':
#         #  bill = db.one_or_404(db.select(Bills).filter_by(user_id=users_id), description=f"No user named")
#         #  Cuando el usuario tiene una sola factura funciona bien pero si tiene mas de una arroja el error "no user name"
#         bills = db.select(Bills).filter_by(user_id=users_id)
#         #  1- Verificar que bills tiene algo, sino tiene nada un mensaje "no hay facturas"
#         #  2- Si tiene algo, recorrer el array para ir guandando en un result los serialize de cada factura, y sus items                           
#         response_body = {'message': 'Facturas encontradas',
#                          'results': bill.serialize()}
#         return response_body, 200
#     if request.method == 'POST':
#         request_body = request.get_json()
#         existing_bill = db.session.get(Bills, users_id)
#         if existing_bill is None:
#             bill = Bills(created_at=request_body['created_at'],
#                          total_price=request_body['total_price'],
#                          order_number=request_body['order_number'], # el numero de orden no lo esta tomando por alguna razon, repite el status
#                          status=request_body['status'],
#                          bill_address=request_body['bill_address'],
#                          delivery_address=request_body['delivery_address'],
#                          payment_method=request_body['payment_method'],
#                          user_id=request_body['user_id'])
#             db.session.add(bill)
#             db.session.commit()
#         response_body = {'message': 'Factura creada',
#                          'results': bill.serialize()}
#         return response_body, 200
#     if request.method == 'DELETE': # este metodo funciona si el usuario tiene una sola factura
#         bill = db.one_or_404(db.select(Bills).filter_by(user_id=users_id),
#                                       description=f"Facturas no encontrada")
#         db.session.delete(bill)
#         db.session.commit()
#         response_body = {'message': 'Factura eliminada'}
#         return response_body, 200


@api.route('/favorites', methods=['GET'])
def handle_favorites():
    favorites = db.session.execute(db.select(Favorites).order_by(Favorites.id)).scalars()
    favorite_list = [favorite.serialize() for favorite in favorites]
    response_body = {'message': 'Listado de favoritos',
                     'results': favorite_list}
    return response_body, 200



@api.route('/users/<int:user_id>/favorites', methods=['GET', 'POST', 'DELETE'])
def user_favorites(user_id):
    if request.method == 'GET':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'no se encontraron favoritos de este usuario'}, 404
        user_favorites = db.session.query(Favorites).filter_by(user_id=user_id).all()
        favorite_list = []
        for favorite in user_favorites:
            current_favorite = favorite.serialize()
            item_list = []
            current_favorite['favorite_items'] = item_list
            favorite_list.append(current_favorite)
        response_body = {'message': f'favoritos del usuario {user_id}', 'results': favorite_list}
        return response_body, 200
    elif request.method == 'POST':
        request_body = request.get_json()
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        new_favorite = Favorites(created_at=request_body['created_at'],
                                 user_id=request_body['user_id'],
                                 product_id=request_body['product_id'])
        db.session.add(new_favorite)
        db.session.commit()
        response_body = {'message': 'Nuevo favorito creado para el usuario', 'result': new_favorite.serialize()}
        return response_body, 201  # Código 201: Created
    elif request.method == 'DELETE':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        user_favorites = db.session.query(Favorites).filter_by(user_id=user_id).all()
        for favorite in user_favorites:
            db.session.delete(favorite)
        db.session.commit()
        return {'message': f'Todas los favoritos del usuario {user_id} han sido eliminados'}, 200


@api.route('/reviews', methods=['GET'])
def handle_reviews():
    reviews = db.session.execute(db.select(Reviews).order_by(Reviews.id)).scalars()
    review_list = [review.serialize() for review in reviews]
    response_body = {'message': 'Listado de reviews',
                     'results': review_list}
    return response_body, 200



@api.route('/users/<int:user_id>/reviews', methods=['GET', 'POST', 'DELETE'])
def user_reviews(user_id):
    if request.method == 'GET':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'no se encontraron reviews de este usuario'}, 404
        user_reviews = db.session.query(Reviews).filter_by(user_id=user_id).all()
        review_list = []
        for review in user_reviews:
            current_review = review.serialize()
            item_list = []
            current_review['review_items'] = item_list
            review_list.append(current_review)
        response_body = {'message': f'reviews del usuario {user_id}', 'results': review_list}
        return response_body, 200
    elif request.method == 'POST':
        request_body = request.get_json()
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        new_review = Reviews(comment=request_body['comment'],
                             created_at=request_body['created_at'],
                             stars=request_body['stars'],
                             user_id=request_body['user_id'],
                             product_id=request_body['product_id'])
        db.session.add(new_review)
        db.session.commit()
        response_body = {'message': f'Nuevo review creado para el usuario {user_id}', 'result': new_review.serialize()}
        return response_body, 201  # Código 201: Created
    elif request.method == 'DELETE':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        user_reviews = db.session.query(Reviews).filter_by(user_id=user_id).all()
        for review in user_reviews:
            db.session.delete(review)
        db.session.commit()
        return {'message': f'Todas las reviews del usuario {user_id} han sido eliminadas'}, 200


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


@api.route('/offers', methods=['GET'])  # la idea es que los usuarios que tengan un producto en favoritos, si ese producto recibe una oferta, notificar al usuario.
def handle_offers():
    offers = db.session.execute(db.select(Offers).order_by(Offers.id)).scalars()
    offer_list = [offer.serialize() for offer in offers]
    response_body = {'message': 'Listado de ofertas',
                     'results': offer_list}
    return response_body, 200


@api.route('/products/<int:product_id>/offers', methods=['GET', 'POST', 'DELETE'])
def product_reviews(product_id):
    if request.method == 'GET':
        product = db.session.query(Products).get(product_id)
        if not product:
            return {'message': 'no se encontraron ofertas de este producto'}, 404
        product_offers = db.session.query(Offers).filter_by(product_id=product_id).all()
        offer_list = []
        for offer in product_offers:
            current_offer = offer.serialize()
            item_list = []
            current_offer['offer_items'] = item_list
            offer_list.append(current_offer)
        response_body = {'message': f'ofertas del producto {product_id}', 'results': offer_list}
        return response_body, 200
    elif request.method == 'POST':
        request_body = request.get_json()
        product = db.session.query(Products).get(product_id)
        if not product:
            return {'message': 'Producto no encontrado'}, 404
        new_offer = Offers(discount=request_body['discount'],
                           start_date=request_body['start_date'],
                           end_date=request_body['end_date'],
                           product_id=request_body['product_id'])
        db.session.add(new_offer)
        db.session.commit()
        response_body = {'message': f'Nueva oferta creada para el producto {product_id}', 
                         'result': new_offer.serialize()}
        return response_body, 201  # Código 201: Created
    elif request.method == 'DELETE':
        product = db.session.query(Products).get(product_id)
        if not product:
            return {'message': 'Producto no encontrado'}, 404
        product_offers = db.session.query(Offers).filter_by(product_id=product_id).all()
        for offer in product_offers:
            db.session.delete(offer)
        db.session.commit()
        return {'message': f'La oferta del producto {product_id} ha sido eliminada'}, 200


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


#  Invalid input value for enum status: "Open"


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
