from celery import shared_task
from .models import ServiceRequest
import flask_excel as excel

@shared_task(ignore_result=False)
def create_service_request_csv():
    service_requests = ServiceRequest.query.with_entities(ServiceRequest.id, ServiceRequest.service_id, ServiceRequest.customer_id, ServiceRequest.professional_id).all()
    
    csv_output = excel.make_response_from_query_sets(service_requests, ["id", "service_id", "customer_id", "professional_id"], "csv")
    filename="test.csv"
    
    with open(filename, 'wb') as f:
        f.write(csv_output.data)

    return filename