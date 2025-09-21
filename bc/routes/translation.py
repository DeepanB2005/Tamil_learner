import os
import requests
from flask import Blueprint, request, jsonify

translation_bp = Blueprint('translation', __name__)

TRANSLATION_API_KEY = os.getenv("translation_api")  # your API key

@translation_bp.route("/translate", methods=["POST"])
def translate_text():
    data = request.json
    text = data.get("text")
    target_lang = data.get("target_lang", "en")

    if not text:
        return jsonify({"error": "No text provided"}), 400

    url = "https://translation.googleapis.com/language/translate/v2"
    payload = {
        "q": text,  # text can be a string or a list
        "target": target_lang,
        "key": TRANSLATION_API_KEY
    }
    response = requests.post(url, data=payload)
    if response.status_code != 200:
        return jsonify({"error": "Translation API failed"}), 500

    translations = response.json()["data"]["translations"]
    translated_texts = [t["translatedText"] for t in translations]
    return jsonify({"translated_text": translated_texts})