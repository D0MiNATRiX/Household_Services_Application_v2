from flask import current_app as app, jsonify
from flask_security import auth_required, roles_required
from .models import User, db

@app.get('/')
def home():
    return 'Hello World'

@app.get('/admin')
@auth_required("token")
@roles_required("admin")
def admin():
    return "Welcome Admin"

@app.get('/activate/professional/<int:pro_id>')
@auth_required("token")
@roles_required("admin")
def activate_professional(pro_id):
    professional = User.query.get(pro_id)
    if not professional or "professional" not in professional.roles:
        return jsonify({"message": "Professional Not Found"}), 404
    
    professional.active = True
    db.session.commit()
    return jsonify({"message": "User Activated"})