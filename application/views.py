from flask import current_app as app, jsonify, request, render_template
from flask_security import auth_required, roles_required
from werkzeug.security import check_password_hash
from .models import User, db
from .sec import datastore

@app.get('/')
def home():
    return render_template("index.html")

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

@app.post('/user-login')
def user_login():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({"message": "Email Not Provided"}), 400
    
    user = datastore.find_user(email=email)
    if not user:
        return jsonify({"message": "User Not Found"}), 404
    
    if check_password_hash(user.password, data.get("password")):
        return jsonify({"token": user.get_auth_token(), "email": user.email, "role": user.roles[0].name})
    else:
        return jsonify({"message" :"Wrong Password"}), 400