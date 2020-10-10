
from flask import Flask, render_template, redirect, url_for, Response, jsonify
from bson import json_util
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
import requests
import json


app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*"
    }
})
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_ORIGINS'] = '*'

app.config['DEBUG'] = True


# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/superheroes"
mongo = PyMongo(app)

# database
superheroes = mongo.db

# collection
superdb = mongo.db.supers

@app.route("/", methods=["GET"])
def index():
    superdb.drop()

    response = requests.get(
        "https://akabab.github.io/superhero-api/api/all.json")
    # print(response.json())

    responseJson = response.json()
    superdb.insert(responseJson)

    #update hair color
    for x in superdb.find({'appearance.hairColor': "Brownn"}):
        superdb.update_many({'appearance.hairColor': 'Brownn'}, {'$set':{'appearance.hairColor': 'Brown'}})
    #update eye color
    for x in superdb.find({'appearance.eyeColor': "Bown"}):
        superdb.update_many({'appearance.eyeColor': 'Bown'}, {'$set':{'appearance.eyeColor': 'Brown'}})

#for Character Profile, 
@app.route("/allheroes/", methods=['GET'])
@cross_origin()
def allheroes():

    supers = superdb.find({})
    supersjson = json.loads(json_util.dumps(supers))
    return jsonify(supersjson)

#Builds the gener pie chart
@app.route("/gender/", methods=['GET'])
def gender():
    
    gendercount = list(superdb.aggregate([
        {"$group": {
            "_id": {"$toLower": "$appearance.gender"},
            "count": {"$sum": 1}
        }},
        {"$group": {
            "_id": "-",
            "counts": {
                "$push": {"k": "$_id", "v": "$count"}
            }
        }},
        {"$replaceRoot": {
            "newRoot": {"$arrayToObject": "$counts"}
        }}
    ]))

    gendersjson = json.loads(json_util.dumps(gendercount))
    return jsonify(gendersjson)

#builds the Universe pie
@app.route("/universe/", methods=['GET'])
def universe():

    universecount = list(superdb.aggregate([
        {"$group": {
            "_id": {"$toLower": "$biography.publisher"},
            "count": {"$sum": 1}
        }},
        {"$group": {
            "_id": "",
            "counts": {
                "$push": {"k": "$_id", "v": "$count"}
            }
        }},
        {"$replaceRoot": {
            "newRoot": {"$arrayToObject": "$counts"}
        }}
    ]))

    universejson = json.loads(json_util.dumps(universecount))
    return jsonify(universejson)

#builds the hair color pie
@app.route("/hairColor/", methods=['GET'])
def hairColor():

    hairColorcount = list(superdb.aggregate([
        {"$group": {
            "_id": {"$toLower": "$appearance.hairColor"},
            "count": {"$sum": 1}
        }},
        {"$group": {
            "_id": "-",
            "counts": {
                "$push": {"k": "$_id", "v": "$count"}
            }
        }},
        {"$replaceRoot": {
            "newRoot": {"$arrayToObject": "$counts"}
        }}
    ]))

    hairColorjson = json.loads(json_util.dumps(hairColorcount))
    return jsonify(hairColorjson)

#builds the eye color pie
@app.route("/eyeColor/", methods=['GET'])
def eyeColor():
    eyeColorcount = list(superdb.aggregate([
        {"$group": {
            "_id": {"$toLower": "$appearance.eyeColor"},
            "count": {"$sum": 1}
        }},
        {"$group": {
            "_id": "-",
            "counts": {
                "$push": {"k": "$_id", "v": "$count"}
            }
        }},
        {"$replaceRoot": {
            "newRoot": {"$arrayToObject": "$counts"}
        }}
    ]))

    eyeColorjson = json.loads(json_util.dumps(eyeColorcount))
    return jsonify(eyeColorjson)

#for the power stats section in the analysis and character section
# @app.route("/powerStats/<character>", methods=['GET'])
# def powerStats(character):

#     stats = superdb.find_one({"name": character})

#     # load the json
#     statsJSON = json.loads(json_util.dumps(stats))

#     powerStats = statsJSON["powerstats"]
#     return jsonify(powerStats)


if __name__ == "__main__":
    app.run()