from celery import shared_task
from .models import ServiceRequest, User, Role
import flask_excel as excel
from .mail_service import send_message
from jinja2 import Template

@shared_task(ignore_result=False)
def create_service_request_csv():
    service_requests = ServiceRequest.query.all()
    
    csv_output = excel.make_response_from_query_sets(service_requests, ["id", "service_id", "customer_id", "professional_id", "date_of_request", "date_of_completion", "rating", "remarks", "service_status"], "csv")
    filename="test.csv"
    
    with open(filename, 'wb') as f:
        f.write(csv_output.data)

    return filename

@shared_task(ignore_result=True)
def daily_reminder(subject):
    service_requests = ServiceRequest.query.filter_by(service_status='requested').all()
    if (len(service_requests) != 0):
        professionals = User.query.filter(User.roles.any(Role.name == 'professional')).all()
        for professional in professionals:
            send_message(professional.email, subject, 'Hello Service Professional,\n\nYou have pending service requests.\nPlease visit the application to accept/reject the service requests.\n\nRegards,\nA to Z Household Services')
        return "OK"