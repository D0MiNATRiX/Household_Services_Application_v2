from flask_sqlalchemy import SQLAlchemy
from flask_security import UserMixin, RoleMixin

db = SQLAlchemy()

class RolesUsers(db.Model):
    __tablename__ = 'roles_users'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column('user_id', db.Integer(), db.ForeignKey('user.id'))
    role_id = db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    fs_uniquifier = db.Column(db.String(255), unique=True, nullable=False)
    roles = db.relationship('Role', secondary='roles_users', backref=db.backref('users', lazy='dynamic'))

class Customer(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    full_name = db.Column(db.String(255))
    address = db.Column(db.String(255))
    pincode = db.Column(db.Integer())
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))

class Professional(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    full_name = db.Column(db.String(255))
    service = db.Column(db.String(255))
    experience = db.Column(db.String(255))
    address = db.Column(db.String(255))
    pincode = db.Column(db.Integer())
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'))
    active = db.Column(db.Boolean())

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class Service(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True, nullable=False)
    price = db.Column(db.Integer(), nullable=False)
    time_required = db.Column(db.String(), nullable=False)
    description = db.Column(db.String(), nullable=False)