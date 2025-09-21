import os
from dotenv import load_dotenv  # Add this import
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

load_dotenv()  # Load environment variables from .env

app = Flask(__name__)
CORS(app)  # This allows your React app to make requests to this server

# Configure the Gemini API with your key
genai.configure(api_key=os.getenv("chat_api"))
translation_api_key = os.getenv("translation_API")  # Import translation_API from .env

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        response = model.generate_content(user_message)
        return jsonify({"response": response.text})
    except Exception as e:
        print("Error in /chat:", e)  # Add this line for debugging
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)