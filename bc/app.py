import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from mongoengine import connect

load_dotenv()

app = Flask(__name__)
CORS(app)

# Import and register the chatbot blueprint
from routes.chatbot import chatbot_bp
app.register_blueprint(chatbot_bp)

# Import and register the translation blueprint
from routes.translation import translation_bp
app.register_blueprint(translation_bp)

# Import and register the user blueprint
from routes.user import user_bp
app.register_blueprint(user_bp)

MONGODB_URI = os.getenv("MONGODB_URI")  # Store your connection string in .env
connect(host=MONGODB_URI)

if __name__ == '__main__':
    app.run(port=5000, debug=True)