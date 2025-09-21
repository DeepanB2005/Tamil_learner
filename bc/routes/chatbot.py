import os
from flask import Blueprint, request, jsonify
import google.generativeai as genai

chatbot_bp = Blueprint('chatbot', __name__)

genai.configure(api_key=os.getenv("chat_api"))

@chatbot_bp.route('/chat', methods=['POST'])
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
        print("Error in /chat:", e)
        return jsonify({"error": str(e)}), 500