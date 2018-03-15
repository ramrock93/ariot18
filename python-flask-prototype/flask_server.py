"""
Routes and views for the flask application.
"""
from flask import make_response, Flask, jsonify, render_template, request
import requests



flask_app = Flask(__name__)


@flask_app.route('/predict', methods=['POST'])
def predict():
    # TODO
    # Implement text selection
    # Implement google image search on text selection
    # Implement schema for search results (image and text)
    print(request.json)


    payload = {
                "key": "AIzaSyA-K_DdRj1-C9wbW_tINgKkpLusewwgbbU",
                "cx": "13710860529765588748:mpunbp22wgo",
                "q": request.json['message']
                }

    try:
        r = requests.get('https://www.googleapis.com/customsearch/v1', params=payload)
        return jsonify({"messageReceived": request.json['message'],
                        "url": r.json()['items'][0]['pagemap']['cse_image'][0]['src'],
                        "status": "success"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@flask_app.route('/')
def index():
    return render_template("index.html")


flask_app.run(debug=True)
