import os
from flask_admin import Admin
from .models import db, Users, Products, ShoppingCarts, ShoppingCartItems, Bills, BillItems, Favorites, Reviews, Categories, Offers, Suscriptions, TicketCostumerSupports
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(Products, db.session))
    admin.add_view(ModelView(ShoppingCarts, db.session))
    admin.add_view(ModelView(ShoppingCartItems, db.session))
    admin.add_view(ModelView(Bills, db.session))
    admin.add_view(ModelView(BillItems, db.session))
    admin.add_view(ModelView(Favorites, db.session))
    admin.add_view(ModelView(Reviews, db.session))
    admin.add_view(ModelView(Categories, db.session))
    admin.add_view(ModelView(Offers, db.session))
    admin.add_view(ModelView(Suscriptions, db.session))
    admin.add_view(ModelView(TicketCostumerSupports, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
