import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from api.models import db, bcrypt
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

app = Flask(__name__)
app.url_map.strict_slashes = False

# CORS
CORS(app, origins="*", methods=["GET","POST","PUT","DELETE","OPTIONS"], allow_headers=["Content-Type","Authorization"])

# JWT

app.config["JWT_SECRET_KEY"] = "super-secret-key"
jwt = JWTManager(app)

# DATABASE

db_url = os.getenv("DATABASE_URL")

if db_url:
    app.config["SQLALCHEMY_DATABASE_URI"] = db_url.replace("postgres://", "postgresql://")
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:////tmp/test.db"

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
bcrypt.init_app(app)

Migrate(app, db)

# ADMIN

setup_admin(app)

# COMMANDS

setup_commands(app)

# ROUTES

app.register_blueprint(api, url_prefix="/api")


@app.route("/")
def home():
    return jsonify({
        "message": "Backend running"
    })


# RUN SERVER

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3001))
    port = int(os.environ.get("PORT", 3001))
    app.run(host="0.0.0.0", port=port, debug=True)