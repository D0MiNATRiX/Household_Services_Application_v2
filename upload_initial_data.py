from main import app
from application.models import db, Role

with app.app_context():
    db.create_all()
    admin = Role(id='admin', name='Admin', description='Admin Description')
    db.session.add(admin)
    admin = Role(id='professional', name='Service Professional', description='Service Professional Description')
    db.session.add(admin)
    admin = Role(id='customer', name='Customer', description='Customer Description')
    db.session.add(admin)
    try:
        db.session.commit()
    except:
        pass