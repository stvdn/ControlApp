from flask import Flask
from flask_jwt_extended import JWTManager
import os
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# JWT Configuration
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY') # Use environment variable in production
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_COOKIE_SECURE'] = False #True in production
app.config['JWT_COOKIE_SAMESITE'] = 'Strict'
JWTManager(app)

# Configure CORS with explicit settings
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": "http://localhost:5173",
            "supports_credentials": True,
            "allow_headers": ["Content-Type"],
            "methods": ["GET", "POST", "OPTIONS", "PUT", "DELETE"]
        }
    }
)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DB_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from .models import *

from .routes import *
app.register_blueprint(product_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(presigned_bp)