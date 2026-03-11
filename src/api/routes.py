from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


# SIGNUP
@api.route('/signup', methods=['POST'])
def signup():

    body = request.get_json()

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(email=email)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "User created"}), 201


# LOGIN
@api.route('/login', methods=['POST'])
def login():

    body = request.get_json()

    email = body.get("email")
    password = body.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"msg": "Bad email or password"}), 401

    token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": token,
        "user": user.serialize()
    }), 200


# PRIVATE ROUTE
@api.route('/private', methods=['GET'])
@jwt_required()
def private():

    user_id = get_jwt_identity()

    user = User.query.get(int(user_id))

    return jsonify({
        "message": "Welcome to the private page",
        "user": user.email
    }), 200


# TEST
@api.route('/hello', methods=['GET'])
def hello():

    return jsonify({
        "message": "Hello from backend"
    }), 200
