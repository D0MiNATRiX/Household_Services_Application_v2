from flask_restful import Resource, Api, reqparse, marshal, fields
from flask_security import auth_required, roles_required, current_user
from .models import Service,Customer,User,Professional, db
from werkzeug.security import generate_password_hash
from application.sec import datastore

api = Api(prefix='/api')

parser1 = reqparse.RequestParser()
parser1.add_argument('name', type=str, help='Name is required and should be a string', required=True)
parser1.add_argument('price', type=int, help='Price is required and should be an integer', required=True)
parser1.add_argument('time_required', type=str, help='Time Required is required and should be a string', required=True)
parser1.add_argument('description', type=str, help='Description is required and should be a string', required=True)

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
        # else:
        #     return {"message": "This funtion us not allowed for current user"}, 404
    
    @auth_required("token")
    @roles_required("admin")
    def post(self):
        args = parser1.parse_args()
        service = Service(**args)
        db.session.add(service)
        db.session.commit()
        return {"message": "Service Created"}
    
class UpdateService(Resource):
    @auth_required('token')
    @roles_required('admin')
    def get(self,id):
        service = Service.query.get(id)
        return marshal(service, service_fields)
    
    def post(self,id):
        service = Service.query.get(id)
        args = parser1.parse_args()
        service.name = args.name
        service.price = args.price
        service.time_required = args.time_required
        service.description = args.description
        db.session.commit()
        return {"message": "Service Updated"}

    
parser2 = reqparse.RequestParser()
parser2.add_argument('email', type=str, help='Email is required and should be a string', required=True)
parser2.add_argument('password', type=str, help='Password is required and should be a string', required=True)
parser2.add_argument('full_name', type=str, help='Full Name is required and should be a string', required=True)
parser2.add_argument('address', type=str, help='Address is required and should be a string', required=True)
parser2.add_argument('pincode', type=int, help='Pincode is required and should be an integer', required=True)
customer_fields = {
    "id": fields.Integer,
    "full_name": fields.String,
    "address": fields.String,
    "pincode": fields.Integer,
    "user_id": fields.Integer
}
class Customers(Resource):
    @auth_required('token')
    @roles_required('admin')
    def get(self):
        customers = Customer.query.all()
        if len(customers) == 0:
            return {"message": "No User Found"}, 404
        return marshal(customers, customer_fields)
    def post(self):
        args = parser2.parse_args()
        datastore.create_user(email=args.email, password=generate_password_hash(args.password), roles=['customer'])
        customer = Customer(full_name=args.full_name, address=args.address, pincode=args.pincode, user_id = User.query.filter_by(email=args.email).all()[0].id)
        db.session.add(customer)
        db.session.commit()
        return {"message": "Customer Added"}
    
parser3 = reqparse.RequestParser()
parser3.add_argument('email', type=str, help='Email is required and should be a string', required=True)
parser3.add_argument('password', type=str, help='Password is required and should be a string', required=True)
parser3.add_argument('full_name', type=str, help='Full Name is required and should be a string', required=True)
parser3.add_argument('service', type=str, help='Service is required and should be a string', required=True)
parser3.add_argument('experience', type=str, help='Experience is required and should be a string', required=True)
parser3.add_argument('address', type=str, help='Address is required and should be a string', required=True)
parser3.add_argument('pincode', type=int, help='Pincode is required and should be an integer', required=True)

professional_fields = {
    "id": fields.Integer,
    "full_name": fields.String,
    "experience": fields.String,
    "service": fields.String,
    "active": fields.Boolean
}

class Professionals(Resource):
    @auth_required('token')
    @roles_required('admin')
    def get(self):
        professionals = Professional.query.all()
        if len(professionals) == 0:
            return {"message": "No User Found"}, 404
        return marshal(professionals, professional_fields)
    
    def post(self):
        args = parser3.parse_args()
        datastore.create_user(email=args.email, password=generate_password_hash(args.password), roles=['professional'], active=False)
        professional = Professional(full_name=args.full_name, service=args.service, experience=args.experience, address=args.address, pincode=args.pincode, user_id = User.query.filter_by(email=args.email).all()[0].id, active=False)
        db.session.add(professional)
        db.session.commit()
        return {"message": "Professional Added"}
    
api.add_resource(Services, '/services')
api.add_resource(Customers, '/customers')
api.add_resource(Professionals, '/professionals')
api.add_resource(UpdateService, '/update/service/<int:id>')