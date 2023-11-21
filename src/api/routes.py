import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users, Products, Bills, BillItems, Favorites, Reviews, Categories, Offers, Suscriptions, TicketCostumerSupports, ShoppingCarts, ShoppingCartItems
from api.utils import generate_sitemap, APIException
from sqlalchemy import func
from datetime import datetime
import cloudinary
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, unset_jwt_cookies
import stripe


api = Blueprint('api', __name__)


@api.route("/login", methods=["POST"])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    results = {'user': {},
               'cart': {},
               'item': {}}
    user = db.one_or_404(db.select(Users).filter_by(email=email, password=password, is_active=True), 
                         description=f"Email o password incorrectos.")
    access_token = create_access_token(identity=[user.id, 
                                                 user.is_admin,])
    results['user'] = user.serialize()
    if user.is_admin:
        response_body = {'message': 'Token created',
                         'token': access_token,
                         'results': results}
        return response_body, 200
    cart = db.session.execute(db.select(ShoppingCarts).where(ShoppingCarts.user_id == user.id)).scalar()
    if not cart:
        response_body = {'message': 'Token created',
                         'token': access_token,
                         'results': results}
        return response_body, 200
    items = db.session.execute(db.select(ShoppingCartItems).where(ShoppingCartItems.shopping_cart_id == cart.id)).scalars()
    results['cart'] = cart.serialize() if cart else {}
    results['item'] = [cart_item.serialize() for cart_item in items] if items else {}
    response_body = {'message': 'Token created',
                     'token': access_token,
                     'results': results}
    return response_body, 200


@api.route('/logout', methods=["POST"])  # TODO 
@jwt_required()
def handle_logout():
    user_id = get_jwt_identity()[0]  # Obtén el ID del usuario a partir del token
    #  unset_jwt_cookies()  
    #  Revoca el token actual para deshabilitarlo
    response_body = {'message': 'Logout successful'}
    return response_body, 200


@api.route('/signup', methods=["POST"])
def handle_signup():
    request_body = request.get_json()
    response_body = {}
    try: 
        email = request_body['email'].lower()
    except:
        response_body['message'] = 'user or email is empty or wrong'
        return response_body, 400
    # Verificamos si el usuario ya existe
    is_user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    if is_user:
        response_body['message'] = 'The email is registered'
        return response_body, 403
    email = request_body.get('email')
    password = request_body.get('password')
    new_user = Users(email=request_body['email'], 
                     password=request_body['password'],
                     first_name=request_body.get('first_name'),
                     last_name=request_body.get('last_name'),
                     is_active=True, 
                     is_admin=False)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=[new_user.id, new_user.is_admin])
    response_body = {'message': 'Usuario creado',
                     'token': access_token,
                     'results': new_user.serialize()}
    return response_body, 201

"""
@api.route('/forgot-password', methods=["POST"]) # TODO
def handle_forgot_password():
    email = request.json.get('email')  
    # Validar email, generar un token, enviar un correo electrónico (biblioteca Flask-Mail)
    response_body = {'message': 'Password reset instructions sent to your email'}
    return jsonify(response_body), 200
"""

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {"message": "Hello! I'm a message that came from the backend"}
    return jsonify(response_body), 200
    

@api.route('/users', methods=['GET', 'POST'])
@jwt_required()
def handle_users():
    current_identity = get_jwt_identity()
    if current_identity[1]:
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
                             is_admin=True,
                             is_active=True,
                             first_name=request_body.get('first_name'),
                             last_name=request_body.get('last_name'),
                             address=request_body.get('address'),
                             identification_number=request_body.get('identification_number'),
                             identification_type=request_body.get('identification_type'))
            db.session.add(new_user)
            db.session.commit()
            response_body = {'message': 'Usuario creado',
                             'results': new_user.serialize()}
            return response_body, 200
    response_body = {'message': "Acceso restringido"}
    return response_body, 401


@api.route('/users/<int:users_id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def users(users_id):
    current_identity = get_jwt_identity()
    current_user = db.session.query(Users).filter_by(id=current_identity[0]).first()  # De esta manera identifico si el usuario intentando ver los datos es el mismo de los datos a consultar
    if current_identity[1]:
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
            if current_user.id == users_id:
                return {'message': 'No puedes eliminar tu propio usuario como administrador'}, 401
            user_to_delete = db.session.query(Users).get(users_id)
            if user_to_delete is None:
                return {'message': 'User not found'}, 404
            if user_to_delete.is_admin:
                # Verificar si hay otro usuario administrador activo
                admin_count = db.session.query(Users).filter(Users.is_admin == True, Users.id != user_to_delete.id).count()
                if admin_count == 1:
                    return {'message': 'No puedes eliminar el último administrador activo'}, 401
                db.session.delete(user_to_delete)
                db.session.commit()
                response_body = {'message': 'Usuario eliminado'}
                return response_body, 200
    if current_user.id == users_id:
        if request.method == 'GET':  
            user = db.session.query(Users).get(users_id)
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
            user.is_admin = False
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
            user.is_active = False
            db.session.commit()
            response_body = {'message': 'User inactived'}
            return response_body, 200
    response_body = {'message': "Acceso restringido"}
    return response_body, 401


@api.route('/products', methods=['GET'])
def handle_products():
        products = db.session.execute(db.select(Products).order_by(Products.id)).scalars()
        product_list = [product.serialize() for product in products]
        response_body = {'message': 'Listado de productos',
                         'results': product_list}
        return response_body, 200


@api.route('/products', methods=['POST'])
@jwt_required()
def handle_post_products():
    current_identity = get_jwt_identity()
    if current_identity[1]:
        request_body = request.get_json()
        new_product = Products(name=request_body.get('name'), 
                               description=request_body.get('description'), 
                               products_detail=request_body.get('products_detail'),
                               pricing=request_body.get('pricing'),
                               weight=request_body.get('weight'),
                               stock=request_body.get('stock'),
                               subscribeable=request_body.get('subscribeable'),
                               image_url=request_body.get('image_url'),
                               categorie_id=request_body.get('categorie_id'))
        db.session.add(new_product)
        db.session.commit()
        response_body = {'message': 'Producto agregado',
                         'results': new_product.serialize()}
        return response_body, 200
    response_body = {'message': "Acceso restringido"}
    return response_body, 401


@api.route('/products/<int:products_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def admin_products(products_id):
    current_identity = get_jwt_identity()
    if current_identity[1]:
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
    response_body = {'message': "Acceso restringido"}
    return response_body, 401


@api.route('/products/<int:products_id>', methods=['GET'])
def single_product(products_id):
    product = db.session.get(Products, products_id)
    if product is None:
        return {'message': 'Product not found'}, 404
    response_body = product.serialize()
    return response_body, 200


@api.route('/categories', methods=['POST'])
@jwt_required()
def create_categories():
    current_identity = get_jwt_identity()
    if current_identity[1]:
        request_body = request.get_json()
        new_categorie = Categories(name=request_body.get('name'))
        db.session.add(new_categorie)
        db.session.commit()
        response_body = {'message': 'Categoria agregada',
                         'results': new_categorie.serialize()}
        return response_body, 200
    response_body = {'message': "Acceso restringido"}
    return response_body, 401


@api.route('/categories', methods=['GET'])
def handle_categories():
    if request.method == 'GET':
        categories = db.session.execute(db.select(Categories).order_by(Categories.id)).scalars()
        categorie_list = [categorie.serialize() for categorie in categories]
        response_body = {'message': 'Listado de categorias',
                         'results': categorie_list}
        return response_body, 200


@api.route('/categories/<int:categories_id>', methods=['GET'])
def categories(categories_id):
    categorie = db.session.get(Categories, categories_id)
    if categorie is None:
        return {'message': 'Categorie not found'}, 404
    response_body = categorie.serialize()
    return response_body, 200


@api.route('/categories/<int:categories_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def admin_categories(categories_id):
    current_identity = get_jwt_identity()
    if current_identity[1]:
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
    response_body = {'message': "Acceso restringido"}
    return response_body, 401


@api.route('/shopping-carts', methods=['GET'])
@jwt_required()
def handle_shopping_carts():
    current_identity = get_jwt_identity()
    results = {}
    if current_identity[1]:
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
    response_body = {'message': "Acceso restringido"}
    return response_body, 401 


@api.route('/shopping-cart-items', methods=['POST'])
@jwt_required()
def shopping_cart_items():
    current_identity = get_jwt_identity()
    if current_identity[1]:
        response_body = {'message': 'administradores no pueden realizar compras'}
        return response_body, 401
    cart = db.session.execute(db.select(ShoppingCarts).where(ShoppingCarts.user_id == current_identity[0])).scalar()
    results = {}
    if not cart:
        cart = ShoppingCarts(total_price=0, 
                             shipping_total_price=0,
                             user_id=current_identity[0])
        db.session.add(cart)
        db.session.commit()
    request_body = request.get_json()
    cart_item = ShoppingCartItems(quantity=request_body['quantity'], 
                                  item_price=request_body['item_price'],
                                  shipping_item_price=request_body['shipping_item_price'],
                                  product_id=request_body['product_id'],
                                  shopping_cart_id=cart.id)
    db.session.add(cart_item)
    db.session.commit()
    cart_item_data = cart_item.serialize()
    cart.total_price += cart_item_data['item_price'] * cart_item_data['quantity']
    db.session.commit()
    results['cart'] = cart.serialize()
    cart_items = db.session.execute(db.select(ShoppingCartItems).where(ShoppingCartItems.shopping_cart_id == cart.id)).scalars()
    list_items = []
    for item in cart_items:
            list_items.append(item.serialize())
    results['items'] = list_items
    response_body = {'message': 'Shopping Cart with all items', 
                     'results': results}
    return response_body, 201


@api.route('/users/<int:user_id>/shopping-cart-items/<int:cart_item_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_cart_items_id(user_id, cart_item_id):
    current_identity = get_jwt_identity()
    response_body = {}
    if current_identity[1]:
        response_body['message'] = "Area no para administradores"
        return response_body, 401
    try:
        cart = db.session.execute(db.select(ShoppingCarts).where(ShoppingCarts.user_id == current_identity[0])).scalar()
        cart_item = db.session.execute(db.select(ShoppingCartItems).where(ShoppingCartItems.shopping_cart_id == cart.id, 
                                                                          ShoppingCartItems.id == cart_item_id)).scalar()
        if request.method == 'PUT':
            request_body = request.get_json()
            cart_item.quantity = request_body.get('quantity')
            db.session.commit()
            response_body['message'] = "Shopping Cart Item updated"
        if request.method == 'DELETE':
            db.session.delete(cart_item)
            db.session.commit()
            response_body['message'] = "Shopping Cart Item deleted"
        return response_body, 200 
    except:
        response_body['message'] = "Bad request"
        return response_body, 403



@api.route('/shopping-carts/<int:shopping_cart_id>', methods=['GET', 'DELETE'])
@jwt_required()
def shopping_carts(shopping_cart_id):
    current_identity = get_jwt_identity()
    if current_identity[1]:
        response_body = {'message': 'administradores no pueden realizar compras'}
        return response_body, 401
    if request.method == 'GET':
        cart = db.session.execute(db.select(ShoppingCarts).where(ShoppingCarts.id == shopping_cart_id,
                                                                 ShoppingCarts.user_id == current_identity[0])).scalar()
        if cart:
            cart_items = db.session.execute(db.select(ShoppingCartItems).filter_by(shopping_cart_id=cart.id)).scalars()
            cart_items_list = [item.serialize() for item in cart_items]
            response_body = {'message': 'Shopping Cart',
                             'results': {'cart': cart.serialize(),
                                         'items': cart_items_list}}
            return response_body, 200
        response_body = {'message': "Bad request"}
        return response_body, 403
    if request.method == 'DELETE':
        cart = db.session.execute(db.select(ShoppingCarts).where(ShoppingCarts.id == shopping_cart_id,
                                                                 ShoppingCarts.user_id == current_identity[0])).scalar()
        if cart:
            cart_items = db.session.execute(db.select(ShoppingCartItems).filter_by(shopping_cart_id=cart.id)).scalars()
            for item in cart_items:
                db.session.delete(item)
                db.session.commit()
            db.session.delete(cart)
            db.session.commit()
            response_body = {'message': 'Carrito eliminado'}
            return response_body, 200
        response_body = {'message': "Usuario no tiene carrito"}
        return response_body, 403


@api.route('/bills', methods=['GET', 'POST'])
@jwt_required()
def handle_bills():
    current_identity = get_jwt_identity()
    response_body = {}
    if request.method == 'GET' and current_identity[1]:
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
    if request.method == 'POST' and not current_identity[1]:
            results = {}
            try: 
                cart = db.session.execute(db.select(ShoppingCarts).where(ShoppingCarts.user_id == current_identity[0])).scalar()
                cart_items = db.session.execute(db.select(ShoppingCartItems).where(ShoppingCartItems.shopping_cart_id == cart.id)).scalars()
                cart_items_list = [item.serialize() for item in cart_items]
                address = db.session.execute(db.select(Users.address).where(Users.id  == current_identity[0])).scalar()
                request_body = request.get_json()
                bill = Bills(created_at=datetime.utcnow(),
                             total_price=cart.total_price,
                             order_number="1",
                             status='pending',
                             bill_address=address,
                             delivery_address=address,
                             payment_method='Visa',
                             user_id=current_identity[0])
                db.session.add(bill)
                db.session.commit()
                results['bill'] = bill.serialize()
                list_items = []
                for item in cart_items_list:
                    bill_item = BillItems(price_per_unit=item['item_price'],
                                          quantity=item['quantity'],
                                          bill_id=bill.id,
                                          product_id=item['product_id'])
                    db.session.add(bill_item)
                    db.session.commit()
                    list_items.append(bill_item.serialize())
                results['bill_items'] = list_items
                for item in cart_items:
                    db.session.delete(item)
                db.session.delete(cart)
                response_body = {'message': 'Bill created', 
                                'results': results}
                return response_body, 201
            except:
                response_body['message'] = "bad request"
                return response_body, 403
    response_body['message'] = "Acceso Restringido"
    return response_body, 401 


@api.route('/users/<int:user_id>/bills', methods=['GET'])
@jwt_required()
def user_bills(user_id):
    current_identity = get_jwt_identity()
    if request.method == 'GET':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        user_bills = db.session.query(Bills).filter_by(user_id=current_identity[0]).all()
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
    response_body = {'message': "Acceso restringido"}
    return response_body, 401
    


@api.route('/bills/<int:bills_id>', methods=['GET', 'DELETE'])  #TODO working
@jwt_required()
def bills(bills_id):
    current_identity = get_jwt_identity()
    response_body = {}
    if current_identity[1]:
        response_body = {'message': 'Administradores no tienen facturas'}
        return response_body, 401
    if request.method == 'GET':
        bill = db.session.execute(db.select(Bills).where(Bills.id == bills_id, Bills.user_id == current_identity[0])).scalar()
        if bill is None:
            return {'message': 'Acceso Restringido'}, 404
        all_bills = db.session.query(Bills).filter_by(id=bills_id).all()
        bill_list = []
        for bill in all_bills:
            current_bill = bill.serialize()
            item_list = []
            items = db.session.query(BillItems).filter_by(bill_id=bill.id).all()
            for item in items:
                current_item = item.serialize()
                item_list.append(current_item)
            current_bill['bill_items'] = item_list
            bill_list.append(current_bill)
        response_body = {'message': f'Facturas de usuario', 'results': bill_list}
        return response_body, 200
    if request.method == 'DELETE':
        response_body = {'message': 'no se pueden borrar las facturas'}
        return response_body, 200 


@api.route('/upload', methods=['POST', 'GET'])
def handle_upload():
    if 'image' not in request.files:
        raise APIException("No image to upload")
    my_image = UserImage()
    result = cloudinary.uploader.upload(
        request.files['image'],
        public_id=f'sample_folder/profile/my-image-name',
        crop='limit',
        width=450,
        height=450,
        eager=[{'width': 200, 'height': 200,
                'crop': 'thumb', 'gravity': 'face',
                'radius': 100}],
        tags=['profile_picture'])
    my_image.url = result['secure_url']
    my_image.save()
    return jsonify(my_image.serialize()), 200



"""
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
@jwt_required()
def handle_suscriptions():
    current_identity = get_jwt_identity()
    if current_identity[1]:
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
                                           product_id=request_body.get('product_id'))   #  No deberia estar este POST abajo, donde se envia el user_id en el endpoint??
            db.session.add(new_suscription)
            db.session.commit()
            response_body = {'message': 'Suscripcion agregada',
                             'results': new_suscription.serialize()}
            return response_body, 200
    response_body = {'message': "Acceso restringido"}
    return response_body, 401


@api.route('/suscriptions/<int:suscriptions_id>', methods=['GET', 'DELETE'])
def suscriptions(suscriptions_id):
    if request.method == 'GET':
        suscription = db.session.get(Suscriptions, suscriptions_id)
        if suscription is None:
            return {'message': 'suscription not found'}, 404
        response_body = suscription.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        suscription = db.session.get(Suscriptions, suscriptions_id)
        if suscription is None:
            return {'message': 'suscription not found'}, 404
        db.session.delete(suscription)
        db.session.commit()
        response_body = {'message': 'suscription deleted'}
        return response_body, 200 


@api.route('/users/<int:user_id>/suscriptions', methods=['GET', 'POST', 'DELETE'])
def user_suscriptions(user_id):
    if request.method == 'GET':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'no se encontraron reviews de este usuario'}, 404
        user_suscriptions = db.session.query(Suscriptions).filter_by(user_id=user_id).all()
        suscription_list = []
        for suscription in user_suscriptions:
            current_suscription = suscription.serialize()
            item_list = []
            current_suscription['suscription_items'] = item_list
            suscription_list.append(current_suscription)
        response_body = {'message': f'suscriptions del usuario {user_id}', 'results': suscription_list}
        return response_body, 200
    elif request.method == 'DELETE':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        user_suscriptions = db.session.query(Suscriptions).filter_by(user_id=user_id).all()
        for suscription in user_suscriptions:
            db.session.delete(suscription)
        db.session.commit()
        return {'message': f'Todas las suscriptions del usuario {user_id} han sido eliminadas'}, 200


@api.route('/ticket-costumer-supports', methods=['GET'])
def handle_ticket_costumer_supports():
    ticket_costumer_supports = db.session.execute(db.select(TicketCostumerSupports).order_by(TicketCostumerSupports.id)).scalars()
    ticket_costumer_support_list = [ticket_costumer_support.serialize() for ticket_costumer_support in ticket_costumer_supports]
    response_body = {'message': 'Listado de tickets',
                     'results': ticket_costumer_support_list}
    return response_body, 200


@api.route('/ticket-costumer-supports/<int:ticket_costumer_supports_id>', methods=['GET', 'DELETE'])
def ticket_costumer_supports(ticket_costumer_supports_id):
    if request.method == 'GET':
        ticket_costumer_support = db.session.get(TicketCostumerSupports, ticket_costumer_supports_id)
        if ticket_costumer_support is None:
            return {'message': 'ticket_costumer_support not found'}, 404
        response_body = ticket_costumer_support.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        ticket_costumer_support = db.session.get(TicketCostumerSupports, ticket_costumer_supports_id)
        if ticket_costumer_support is None:
            return {'message': 'ticket_costumer_support not found'}, 404
        db.session.delete(ticket_costumer_support)
        db.session.commit()
        response_body = {'message': 'ticket_costumer_support deleted'}
        return response_body, 200 


@api.route('/users/<int:user_id>/ticket-costumer-supports', methods=['GET', 'POST', 'DELETE'])
def user_ticket_costumer_supports(user_id):
    if request.method == 'GET':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'no se encontraron ticket_costumer_supports de este usuario'}, 404
        user_ticket_costumer_supports = db.session.query(TicketCostumerSupports).filter_by(user_id=user_id).all()
        ticket_costumer_support_list = []
        for ticket_costumer_support in user_ticket_costumer_supports:
            current_ticket_costumer_support = ticket_costumer_support.serialize()
            item_list = []
            current_ticket_costumer_support['ticket_costumer_support_items'] = item_list
            ticket_costumer_support_list.append(current_ticket_costumer_support)
        response_body = {'message': f'reviews del usuario {user_id}', 'results': ticket_costumer_support_list}
        return response_body, 200
    elif request.method == 'POST':
        request_body = request.get_json()
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        new_ticket_costumer_support = TicketCostumerSupports(request=request_body['request'],
                                                             start_date=request_body['start_date'],
                                                             close_date=request_body['close_date'],
                                                             status=request_body['status'],
                                                             resolution=request_body['resolution'],
                                                             user_id=request_body['user_id'],
                                                             bill_id=request_body['bill_id'])
        db.session.add(new_ticket_costumer_support)
        db.session.commit()
        response_body = {'message': f'Nuevo ticket_costumer_support creado para el usuario {user_id}', 'result': new_ticket_costumer_support.serialize()}
        return response_body, 201
    elif request.method == 'DELETE':
        user = db.session.query(Users).get(user_id)
        if not user:
            return {'message': 'Usuario no encontrado'}, 404
        user_ticket_costumer_supports = db.session.query(TicketCostumerSupports).filter_by(user_id=user_id).all()
        for ticket_costumer_support in user_ticket_costumer_supports:
            db.session.delete(ticket_costumer_support)
        db.session.commit()
        return {'message': f'Todas las tickets del usuario {user_id} han sido eliminadas'}, 200


@api.route('/favorites', methods=['GET'])
def handle_favorites():
    favorites = db.session.execute(db.select(Favorites).order_by(Favorites.id)).scalars()
    favorite_list = [favorite.serialize() for favorite in favorites]
    response_body = {'message': 'Listado de favoritos',
                     'results': favorite_list}
    return response_body, 200


@api.route('/favorites/<int:favorites_id>', methods=['GET', 'PUT', 'DELETE'])
def favorites(favorites_id):
    if request.method == 'GET':
        favorite = db.session.get(Favorites, favorites_id)
        if favorite is None:
            return {'message': 'favorite not found'}, 404
        response_body = favorite.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        favorite = db.session.get(Favorites, favorites_id)
        if favorite is None:
            return {'message': 'favorite not found'}, 404
        db.session.delete(favorite)
        db.session.commit()
        response_body = {'message': 'favorite deleted'}
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
        return response_body, 201
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


@api.route('/reviews/<int:reviews_id>', methods=['GET', 'DELETE'])
def reviews(reviews_id):
    if request.method == 'GET':
        review = db.session.get(Reviews, reviews_id)
        if review is None:
            return {'message': 'review not found'}, 404
        response_body = review.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        review = db.session.get(Reviews, reviews_id)
        if review is None:
            return {'message': 'review not found'}, 404
        db.session.delete(review)
        db.session.commit()
        response_body = {'message': 'review deleted'}
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
"""
