"""
Routes and views for the flask application.
"""
from rake_nltk import Rake
from flask import Flask, jsonify, render_template, request
from gensim.summarization.summarizer import summarize
import random
import nltk
from nltk import word_tokenize
from urllib.request import Request, urlopen
import json

# adapted from http://stackoverflow.com/questions/20716842/python-download-images-from-google-image-search
def download_page(url):
    try:
        headers = {}
        headers['User-Agent'] = "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36"
        req = Request(url, headers=headers)
        resp = urlopen(req)
        respData = str(resp.read())
        return respData
    except Exception as e:
        print(str(e))


def format_object(object):
    formatted_object = {}
    formatted_object['image_format'] = object['ity']
    formatted_object['image_height'] = object['oh']
    formatted_object['image_width'] = object['ow']
    formatted_object['url'] = object['ou']
    formatted_object['title'] = object['pt']
    formatted_object['image_host'] = object['rh']
    formatted_object['image_source'] = object['ru']
    formatted_object['image_thumbnail_url'] = object['tu']
    return formatted_object


def _get_next_item(s):
    start_line = s.find('rg_meta notranslate')
    if start_line == -1:  # If no links are found then give an error!
        end_quote = 0
        link = "no_links"
        return link, end_quote
    start_line = s.find('class="rg_meta notranslate">')
    start_object = s.find('{', start_line + 1)
    end_object = s.find('</div>', start_object + 1)
    object_raw = str(s[start_object:end_object])
    object_decode = bytes(object_raw, "utf-8").decode("unicode_escape")
    final_object = json.loads(object_decode)
    return final_object, end_object


# Getting all links with the help of '_images_get_next_image'
def _get_all_items(page, limit):
    items = []
    i = 0
    count = 1
    while count < limit+1:
        html_object, end_content = _get_next_item(page)
        if html_object == "no_links":
            break
        else:
            # format the item for readability
            html_object = format_object(html_object)
            items.append(html_object)  # Append all the links in the list named 'Links'
            count += 1
            page = page[end_content:]
        i += 1
    return items



def get_images(query, max_images=3):
    query = query.split()
    query = '+'.join(query)
    url = "https://www.google.no/search?q="+query+"&source=lnms&tbm=isch"
    page = download_page(url)
    items = _get_all_items(page, max_images)
    return items

def filter_small_slides(slide_items):
    new_slides = []
    for slide in slide_items:
        size_product = int(slide['image_height']) * int(slide['image_width'])
        if size_product >= 100000:
            new_slides.append(slide)
    return new_slides


flask_app = Flask(__name__)


@flask_app.route('/text2slides', methods=['POST'])
def text2slides():
    try:
        r = Rake()
        r.extract_keywords_from_text(request.json['text'])
        keywords = r.get_ranked_phrases()[0:3]
        print("Key phrases:", keywords)

        np = word_tokenize(request.json['text'])
        np = nltk.pos_tag(np)
        print(np)
        included_pos = ['NN', 'JJ']
        np = [n[0].lower() for n in np if n[1] in included_pos]
        print("Nouns and Adjectives:", np)

        search_words = " ".join(keywords)
        search_words = word_tokenize(search_words)
        np = [n for n in np if n not in search_words]
        search_words = search_words + np

        if 'excludedText' in request.json.keys():
            excluded_text = word_tokenize(request.json['excludedText'])
            print("Words to exclude:", excluded_text)
            search_words = [word for word in search_words if word not in excluded_text]
        if 'staticText' in request.json.keys():
            static_text = word_tokenize(request.json['staticText'])
            print("Words to add:", static_text)
            search_words = search_words + static_text

        print("Final search words", search_words)
        search_words = " ".join(search_words)

        #
        # payload = {
        #             "key": "AIzaSyDNPK7YppoMYsXB4EnTE4ruvhKUatslly4",
        #             "cx": "13710860529765588748:mpunbp22wgo",
        #             "q": search_words
        #           }
        #
        # # try:
        # r = requests.get('https://www.googleapis.com/customsearch/v1', params=payload)
        # print(r.text)

        # slide_items = []
        # for item in r.json()['items']:
        #     if 'cse_image' in item['pagemap'].keys():
        #         slide_item = {'title': item['title'],
        #                       'url': item['pagemap']['cse_image'][0]['src']}
        #         slide_items.append(slide_item)

        slide_items = get_images(search_words)

        slide_items = filter_small_slides(slide_items)

        if len(slide_items) == 0:
            print("no text, awkward silence..")
            slide_items = get_images("awkward silence", 8)
            slide_items = filter_small_slides(slide_items)
            random.shuffle(slide_items)


        return jsonify({"inputMessage": request.json['text'],
                        "slides": slide_items,
                        "searchTerm": search_words,
                        "status": "success"}), 200
    except Exception as e:
        print(e)
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
        print(e)
        return jsonify({'error': str(e)}), 400


@flask_app.route('/')
def index():
    return render_template("index.html")


flask_app.run("0.0.0.0", port=80, threaded=True)
