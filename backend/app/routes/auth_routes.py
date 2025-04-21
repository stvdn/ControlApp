from flask import Blueprint, jsonify, make_response, request
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    unset_jwt_cookies,
    set_access_cookies,
    set_refresh_cookies,
    create_refresh_token
)
import datetime
from ..models import db, UserInfo


bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email", "")
    password = data.get("password", "")

    if not email or not password:
        return jsonify({"error": "Missing credentials"}), 400
    
    user = UserInfo.query.filter_by(email=email).first()

    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401
    
    access_token = create_access_token(
        identity= email,
        expires_delta=datetime.timedelta(minutes=15),
        additional_claims={"role": user.role}
    )

    refresh_token = create_refresh_token(
        identity=email,
        expires_delta=datetime.timedelta(days=7)
    )

    response = make_response(jsonify({
        "message": "Login successful",
        "user": {
                    "email": user.email,
                    "role": user.role,
                    "id": user.id,
                    "name": user.name,
                    "lastname": user.lastname

                }
    }))

    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response

@bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")
    lastname = data.get("lastname")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    if UserInfo.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 409

    new_user = UserInfo(
        email=email,
        name=name,
        lastname=lastname,
        role="admin"  # Default role
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User created successfully"}), 201

@bp.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)  # Only accepts refresh tokens
def refresh():
    email = get_jwt_identity()
    user = UserInfo.query.filter_by(email=email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Issue a new access token
    new_access_token = create_access_token(
        identity=email,
        expires_delta=datetime.timedelta(minutes=15),
        additional_claims={"role": user["role"]}
    )
    
    response = jsonify({"message": "Token refreshed"})
    set_access_cookies(response, new_access_token)
    return response

@bp.route("/user", methods=["POST"])
@jwt_required(refresh=True)  # Only accepts refresh tokens
def get_user():
    email = get_jwt_identity()
    user = UserInfo.query.filter_by(email=email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({
        "email": user.email,
        "role": user.role,
        "id": user.id,
        "name": user.name,
        "lastname": user.lastname
    })
    

@bp.route('/logout', methods=['POST'])
def logout():
    response = jsonify({"message": "Logout successful"})
    unset_jwt_cookies(response)
    response.delete_cookie('access_token')
    return response

@bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200