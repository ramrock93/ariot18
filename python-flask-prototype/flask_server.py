"""
Routes and views for the flask application.
"""
from flask import make_response, Flask, jsonify, render_template, request
import requests
import nltk
from nltk import word_tokenize



flask_app = Flask(__name__)


@flask_app.route('/text2slides', methods=['POST'])
def predict():
    try:
        print(request.json)
        text = word_tokenize(request.json['message'])
        tagged = nltk.pos_tag(text)
        # print(tagged)
        preferred_pos = ['NN', 'NNP', 'NNS', 'JJ']
        stripped_message = " ".join([e[0] for e in tagged if e[1] in preferred_pos])
        print(stripped_message)

        payload = {
                    "key": "AIzaSyC6HQu8GA-fndW8Bl_MaUXmQwrXam3V9HM",
                    "cx": "13710860529765588748:mpunbp22wgo",
                    "q": stripped_message
                    }

        # try:
        r = requests.get('https://www.googleapis.com/customsearch/v1', params=payload)
        # print(r.text)

        slide_items = []
        for item in r.json()['items']:
            if 'cse_image' in item['pagemap'].keys():
                slide_item = {'title': item['title'],
                              'url': item['pagemap']['cse_image'][0]['src']}
                slide_items.append(slide_item)

        return jsonify({"inputMessage": request.json['message'],
                        "slides": slide_items,
                        "googleResponse": r.json(),
                        "status": "success"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@flask_app.route('/')
def index():
    return render_template("index.html")


flask_app.run(debug=True)
