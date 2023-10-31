from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    address = db.Column(db.String(120))
    identification_type = db.Column(db.Enum('Dni', 'Nie', 'Passport', name='identification_type'))
    identification_number = db.Column(db.Integer)
    payment_method = db.Column(db.Enum('MasterdCard', 'Visa', 'American', 'PayPal', name='payment_method'))
    is_admin = db.Column(db.Boolean, nullable=False)
    is_active = db.Column(db.Boolean, nullable=False)

    def __repr__(self):
        return f'<Users {self.email}>'

    def serialize(self):
        return {"id": self.id,
                "email": self.email,
                "first_name": self.first_name,
                "last_name": self.last_name,
                "address": self.address,
                "identification_type": self.identification_type,
                "identification_number": self.identification_number,
                "payment_method": self.payment_method,
                "is_admin": self.is_admin,
                "is_active": self.is_active}


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(300), nullable=False)
    products_detail = db.Column(db.String(300), nullable=False)
    pricing = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float)
    stock = db.Column(db.Integer, nullable=False)
    subscribeable = db.Column(db.Boolean, nullable=False)
    image_url = db.Column(db.String, nullable=False)
    categorie_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    categorie = db.relationship('Categories')

    def __repr__(self):
        return f'<Products {self.name}>'

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "description": self.description,
                "products_detail": self.products_detail,
                "pricing": self.pricing,
                "weight": self.weight,
                "stock": self.stock,
                "subscribeable": self.subscribeable,
                "image_url": self.image_url,
                "categorie_id": self.categorie_id}


class ShoppingCarts(db.Model):
    __tablename__ = 'shoppingcarts'
    id = db.Column(db.Integer, primary_key=True)
    total_price = db.Column(db.Float)
    shipping_total_price = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    user = db.relationship('Users')

    def __repr__(self):
        return f'<ShoppingCarts {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "quantity": self.quantity,
                "total_price": self.total_price,
                "shipping_total_price": self.shipping_total_price,
                "user_id": self.user_id}


class ShoppingCartItems(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer)
    item_price = db.Column(db.Float)
    shipping_item_price = db.Column(db.Float)
    shopping_cart_id = db.Column(db.Integer, db.ForeignKey('shoppingcarts.id'))  # ShoppingCarts o shoppingcarts (las mayusculas)???
    shopping_cart = db.relationship('ShoppingCarts')

    def __repr__(self):
        return f'<ShoppingCartItems {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "quantity": self.quantity,
                "item_price": self.item_price,
                "shipping_item_price": self.shipping_item_price,
                "shopping_cart_id": self.shopping_cart_id}


class Bills(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime)
    total_price = db.Column(db.Float, nullable=False)
    order_number = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Enum('pending', 'paid', 'cancel', name='status'), nullable=False)
    bill_address = db.Column(db.String(180), nullable=False)
    delivery_address = db.Column(db.String(180), nullable=False)
    payment_method = db.Column(db.Enum('MasterdCard', 'Visa', 'American', 'PayPal', name='payment_method'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('Users')

    def __repr__(self):
        return f'<Bills {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "created_at": self.created_at,
                "total_price": self.total_price,
                "order_number": self.status,
                "status": self.status,
                "bill_address": self.bill_address,
                "delivery_address": self.delivery_address,
                "payment_method": self.payment_method,
                "user_id": self.user_id}


class BillItems(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price_per_unit = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    bill = db.relationship('Bills', foreign_keys=[bill_id])
    product = db.relationship('Products', foreign_keys=[product_id])
    
    def __repr__(self):
        return f'<BillItems {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "price_per_unit": self.price_per_unit,
                "quantity": self.quantity,
                "bill_id": self.bill_id,
                "product_id": self.product_id}


class Favorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    user = db.relationship('Users', foreign_keys=[user_id])
    product = db.relationship('Products', foreign_keys=[product_id])

    def __repr__(self):
        return f'<Favorites {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "created_at": self.created_at,
                "user_id": self.user_id,
                "product_id": self.product_id}


class Reviews(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(500))
    created_at = db.Column(db.DateTime)
    stars = db.Column(db.Enum('1', '2', '3', '4', '5', name='stars'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    user = db.relationship('Users', foreign_keys=[user_id])
    product = db.relationship('Products', foreign_keys=[product_id])

    def __repr__(self):
        return f'<Reviews {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "comment": self.comment,
                "created_at": self.created_at,
                "stars": self.stars,
                "user_id": self.user_id,
                "product_id": self.product_id}


class Categories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True)

    def __repr__(self):
        return f'<Categories {self.name}>'

    def serialize(self):
        return {"id": self.id,
                "name": self.name}


class Offers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    discount = db.Column(db.Integer)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'))
    product = db.relationship('Products')

    def __repr__(self):
        return f'<Offers {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "discount": self.discount,
                "start_date": self.start_date,
                "end_date": self.end_date,
                "product_id": self.product_id}


class Suscriptions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    frecuency = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), unique=True)
    user = db.relationship('Users', foreign_keys=[user_id])
    product = db.relationship('Products', foreign_keys=[product_id])

    def __repr__(self):
        return f'<Suscriptions {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "quantity": self.quantity,
                "frecuency": self.frecuency,
                "user_id": self.user_id,
                "product_id": self.product_id}


class TicketCostumerSupports(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    request = db.Column(db.String(500), nullable=False)
    start_date = db.Column(db.DateTime)
    close_date = db.Column(db.DateTime)
    status = db.Column(db.Enum('Open', 'Close', name='status'), nullable=False)
    resolution = db.Column(db.String(500), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bill_id = db.Column(db.Integer, db.ForeignKey('bills.id'), unique=True)
    user = db.relationship('Users', foreign_keys=[user_id])
    bill = db.relationship('Bills', foreign_keys=[bill_id])

    def __repr__(self):
        return f'<TicketCostumerSupports {self.id}>'

    def serialize(self):
        return {"id": self.id,
                "request": self.request,
                "start_date": self.start_date,
                "close_date": self.close_date,
                "status": self.status,
                "resolution": self.resolution,
                "user_id": self.user_id,
                "bill_id": self.bill_id}
