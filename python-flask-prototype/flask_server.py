"""
Routes and views for the flask application.
"""
from rake_nltk import Rake
from flask import make_response, Flask, jsonify, render_template, request
from gensim.summarization.summarizer import summarize
import requests
import nltk
from nltk import word_tokenize

flask_app = Flask(__name__)


@flask_app.route('/text2slides', methods=['POST'])
def predict():
    try:
        r = Rake()
        r.extract_keywords_from_text(request.json['text'])

        keywords = r.get_ranked_phrases()[0:3]

        print("Keywords:", keywords)

        search_words = " ".join(keywords)
        search_words = word_tokenize(search_words)

        if 'excludedText' in request.json.keys():
            excluded_text = word_tokenize(request.json['excludedText'])
            search_words = [word for word in search_words if word not in excluded_text]
        if 'staticText' in request.json.keys():
            static_text = word_tokenize(request.json['staticText'])
            search_words = search_words + static_text

        print("Filtered keywords", search_words)
        search_words = " ".join(search_words)


        payload = {
                    "key": "AIzaSyDNPK7YppoMYsXB4EnTE4ruvhKUatslly4",
                    "cx": "13710860529765588748:mpunbp22wgo",
                    "q": search_words
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

        return jsonify({"inputMessage": request.json['text'],
                        "slides": slide_items,
                        "searchTerm": search_words,
                        "status": "success"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@flask_app.route('/summary', methods=['POST'])
def summary_of_text():
    try:
        text = request.json['text']
        word_count = 10
        summary = summarize(text, word_count=word_count)
        while len(summary) == 0:
            summary = summarize(text, word_count=word_count)
            word_count += 10
            if word_count > 400:
                return jsonify({'error': 'text could not be summarized (too short?)'}), 400
        return jsonify({"summary": summary,
                        "status": "success"}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@flask_app.route('/')
def index():
    return render_template("index.html")


flask_app.run("0.0.0.0", port=80, threaded=True)
