import imp
import json
from flask import Flask, request
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/', methods=["GET", "POST"])
@cross_origin()
def index():
    if request.method == "POST":
        file = request.files["file"]
        filePath = "./audio/" + secure_filename(file.filename)
        file.save(filePath)
        return 'file uploaded successfully'

app.run()
