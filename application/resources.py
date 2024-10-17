from flask_restful import Resource, Api, reqparse, marshal, fields
from flask_security import auth_required, roles_required, current_user
from .models import Service,Customer,User, db
from werkzeug.security import generate_password_hash
from application.sec import datastore

api = Api(prefix='/api')

parser = reqparse.RequestParser()

parser.add_argument('name', type=str, help='Name is required and should be a string', required=True)
parser.add_argument('price', type=int, help='Price is required and should be an integer', required=True)
parser.add_argument('time_required', type=str, help='Time Required is required and should be a string', required=True)
parser.add_argument('description', type=str, help='Description is required and should be a string', required=True)

service_fields = {
    "id": fields.Integer,
    "name": fields.String,
    "price": fields.Integer,
    "time_required": fields.String,
    "description": fields.String
}

class Services(Resource):
    @auth_required("token")
    def get(self):
        all_services = Service.query.all()
        if "professional" not in current_user.roles:
            return marshal(all_services, service_fields)
        else:
            return {"message": "This funtion us not allowed for current user"}, 404
    
    @auth_required("token")
    @roles_required("admin")
    def post(self):
        args = parser.parse_args()
        service = Service(**args)
        db.session.add(service)
        db.session.commit()
        return {"message": "Service Created"}
    
parser = reqparse.RequestParser()

parser.add_argument('email', type=str, help='Email is required and should be a string', required=True)
parser.add_argument('password', type=str, help='Password is required and should be a string', required=True)
parser.add_argument('full_name', type=str, help='Full Name is required and should be a string', required=True)
parser.add_argument('address', type=str, help='Address is required and should be a string', required=True)
parser.add_argument('pincode', type=int, help='Pincode is required and should be an integer', required=True)

class Customers(Resource):
    def post(self):
        args = parser.parse_args()
        datastore.create_user(email=args.email, password=generate_password_hash(args.password), roles=['customer'])
        customer = Customer(full_name=args.full_name, address=args.address, pincode=args.pincode, user_id = User.query.filter_by(email=args.email).all()[0].id)
        db.session.add(customer)
        db.session.commit()
        return {"message": "Customer Added"}
    
api.add_resource(Services, '/services')
api.add_resource(Customers, '/customers')