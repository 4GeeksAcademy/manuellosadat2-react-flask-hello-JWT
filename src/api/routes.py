"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""

from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity


# Crear Blueprint
api = Blueprint('api', __name__)

# Permitir CORS
CORS(api)


# ---------------------------
# SIGNUP (crear usuario)
# ---------------------------

@api.route('/signup', methods=['POST'])
def signup():

    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(
        email=email,
        password=password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created successfully"}), 200


# ---------------------------
# LOGIN (crear token)
# ---------------------------

@api.route('/login', methods=['POST'])
def login():

    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({
        "token": access_token,
        "user_id": user.id
    }), 200


# ---------------------------
# RUTA PRIVADA
# ---------------------------

@api.route('/private', methods=['GET'])
@jwt_required()
def private():

    current_user_id = get_jwt_identity()

    user = User.query.get(current_user_id)

    return jsonify({
        "message": "Welcome to the private page",
        "user": user.email
    }), 200


# ---------------------------
# Ruta de prueba
# ---------------------------

@api.route('/hello', methods=['GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200