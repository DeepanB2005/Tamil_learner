import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)
CORS(app)

# Import and register the chatbot blueprint
from routes.chatbot import chatbot_bp
app.register_blueprint(chatbot_bp)

if __name__ == '__main__':
    app.run(port=5000, debug=True)