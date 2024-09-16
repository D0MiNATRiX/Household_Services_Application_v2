from flask_restful import Resource, Api, reqparse, marshal_with, fields
from flask_security import auth_required, roles_required
from .models import Service, db

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
    @marshal_with(service_fields)
    @auth_required("token")
    def get(self):
        all_services = Service.query.all()
        return all_services
    
    @auth_required("token")
    @roles_required("admin")
    def post(self):
        args = parser.parse_args()
        service = Service(**args)
        db.session.add(service)
        db.session.commit()
        return {"message": "Service Created"}
    
api.add_resource(Services, '/services')