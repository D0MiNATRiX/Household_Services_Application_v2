from main import app
from application.sec import datastore
from application.models import db
from werkzeug.security import generate_password_hash

with app.app_context():
    db.create_all()
    datastore.find_or_create_role(id=1, name="admin", description="User is an Admin")
    datastore.find_or_create_role(id=2, name='professional', description='User is a Service Professional')
    datastore.find_or_create_role(id=3, name='customer', description='User is a Customer')
    db.session.commit()
    if not datastore.find_user(email='admin@email.com'):
        datastore.create_user(email='admin@email.com', password=generate_password_hash('admin'), roles=['admin'])
    if not datastore.find_user(email='professioanl1@email.com'):
        datastore.create_user(email='professional1@email.com', password=generate_password_hash('professional1'), roles=['professional'], active=False)
    if not datastore.find_user(email='customer1@email.com'):
        datastore.create_user(email='customer1@email.com', password=generate_password_hash('customer1'), roles=['customer'])
    db.session.commit()