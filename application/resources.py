from flask_restful import Resource, Api, reqparse, marshal_with, fields
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
    def get(self):
        all_services = Service.query.all()
        return all_services
    
    def post(self):
        args = parser.parse_args()
        service = Service(**args)
        db.session.add(service)
        db.session.commit()
        return {"mesage": "Service Created"}
    
api.add_resource(Services, '/services')