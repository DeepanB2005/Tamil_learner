from flask import Blueprint, request, jsonify
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash

user_bp = Blueprint('user', __name__)

@user_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    user = User.objects(email=email).first()
    if user:
        if check_password_hash(user.password, password):
            return jsonify({"user": {
                "name": user.name,
                "email": user.email,
                "language": user.language,
                "field": user.field
            }})
        else:
            return jsonify({"error": "Invalid password"}), 401
    # Register new user if not found
    hashed_pw = generate_password_hash(password)
    new_user = User(
        name=data.get('name'),
        email=email,
        password=hashed_pw,
        language=data.get('language'),
        field=data.get('field')
    )
    new_user.save()
    return jsonify({"user": {
        "name": new_user.name,
        "email": new_user.email,
        "language": new_user.language,
        "field": new_user.field
    }}), 201