from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, Boolean, Float



db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(80))
    identification_type = db.Column(db.Enum) #enum??
    identification_number = db.Column(db.Integer)
    payment_method = db.Column(db.Enum)
    is_admin = db.Column(db.Boolean)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        # do not serialize the password, its a security breach
        return {"id": self.id,
                "email": self.email,}


class Product (db.Model):
    __tablename__ = 'Product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    pricing = db.Column(db.Float, nullable=False)
    weight = db.Column(db.Float)
    stock = db.Column(db.Integer)
    categorie_id = db.Column(db.Enum) #Enum???
    subscribeable = db.Column(db.Boolean)
    image_url = db.Column(db.String, nullable=false ) #cloudinary? crear una base de album? producto-url hasta 3/5 fotos con su url


class Shopping_cart (db.Model): #otra tabla de shopping?
    __tablename__ = 'Shopping_cart'
    id = db.Column(db.Integer, primary_key=True)
    product_id =
    user_id =
    quantity = db.Column(db.Integer)
    item_price = db.Column(db.Float)


class Bill (db.Model):
    __tablename__ = 'Bill'
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.Enum) #Enum???
    user_id =
    bill_address = db.Column(db.String(180), nullable=False)
    delivery_address = db.Column(db.String(180))
    payment_method = db.Column(db.Enum, nullable=False) #Enum??


class Bill_item (db.Model):
    __tablename__ = 'Bill_item'
    id = db.Column(db.Integer, primary_key=True)
    bill_id 
    product_id
    price_per_unit = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)


class Favourites (db.Model):
    __tablename__ = 'Favourites'
    id = db.Column(db.Integer, primary_key=True)
    user_id
    product_id


class Reviews (db.Model):
    __tablename__ = 'Reviews'
    id = db.Column(db.Integer, primary_key=True)
    user_id
    product_id
    comment = db.Column(db.String(500))
    stars = db.Column(db.Integer)


class Categories (db.Model):
    __tablename__ = 'Categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)


class Offerts (db.Model):
    __tablename__ = 'Offerts'
    id = db.Column(db.Integer, primary_key=True)
    product_id
    discount = db.Column(db.Enum) #Enum??
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)


class Suscription (db.Model):
    __tablename__ = 'Suscription'
    id = db.Column(db.Integer, primary_key=True)
    product_id
    user_id
    quantity = db.Column(db.Integer, nullable=False)
    frecuency = db.Column(db.Integer, nullable=False)


class Ticket_costumer_support (db.Model):
    __tablename__ = 'Ticket_costumer_support'
    id = db.Column(db.Integer, primary_key=True)
    user_id
    bill_id
    request = db.Column(db.String(500), nullable=False)
    start_date = db.Column(db.DateTime)
    close_date = db.Column(db.DateTime)
    status = db.Column(db.Enum) #Enum??
    resolution = db.Column(db.String(500), nullable=False)




    
    



try:
    result = render_er(Base, 'diagram.png')
    print("Success! Check the diagram.png file")
except Exception as e:
    print("There was a problem genering the diagram")
    raise e