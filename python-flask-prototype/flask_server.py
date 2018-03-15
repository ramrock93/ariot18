"""
Routes and views for the flask application.
"""
from flask import make_response, Flask, jsonify, render_template, request


flask_app = Flask(__name__)


@flask_app.route('/predict', methods=['POST'])
def predict():
    # TODO
    # Implement text selection
    # Implement google image search on text selection
    # Implement schema for search results (image and text)
    print(request.json)
    try:
        return jsonify({"messageReceived": request.json['message'],
                        "status": "success"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@flask_app.route('/')
def index():
    return render_template("index.html")


flask_app.run(debug=True)
