import imp
from flask import Flask, request, Response, jsonify, json
from flask_restful import Api
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import recognize

import speech_recognition as sr

app = Flask(__name__)
# api = Api(app)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=["GET", "POST"])
@cross_origin()
def index():
    if request.method == "POST":
        file = request.files["file"]
        filePath = "./audio/" + secure_filename(file.filename)
        file.save(filePath)
        transcript = recognize.recognize(filePath)
        print(transcript)
        return jsonify(transcript)

app.run()
