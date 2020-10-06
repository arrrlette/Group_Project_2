
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
# superheroes.superdb.drop()
# Or set inline
#mongo = PyMongo(app, uri="mongodb://localhost:27017/superheroes")

#This is not recommended in production
# What would happen is every time you visit the root route it would load the DB again with all the data
#
@app.route("/", methods=["GET"])
def index():
    superdb.drop()

    response = requests.get(
        "https://akabab.github.io/superhero-api/api/all.json")
    # print(response.json())

    responseJson = response.json()
    superdb.insert(responseJson)

    # return render_template("index.html", mars=mars)


@app.route("/allheroes/", methods=['GET'])
@cross_origin()
def allheroes():

    supers = superdb.find({})
    supersjson = json.loads(json_util.dumps(supers))
    return jsonify(supersjson)


@app.route("/findhero/", methods=['GET'])
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


@app.route("/powerStats/<character>", methods=['GET'])
def powerStats(character):

    stats = superdb.find_one({"name": character})

    # load the json
    statsJSON = json.loads(json_util.dumps(stats))

    powerStats = statsJSON["powerstats"]
    return jsonify(powerStats)


# @app.route("/alignment/", methods=['GET'])
# def alignment():

    # alignmentcount = list(superdb.aggregate([
    #   {"$group": {
    #       "_id": {"$toLower": "$biography.alignment"},
    #       "count": {"$sum": 1}
    #  }},
    #  {"$group": {
    #      "_id": "null",
    #      "counts": {
    #         "$push": {"k": "$_id", "v": "$count"}
    #    }
    #  }},
    #  {"$replaceRoot": {
    #      "newRoot": {"$arrayToObject": "$counts"}
    #  }}
    # ]))

    # good_count = superheroes.superdb.find(
    # {"biography.alignment": "good"}).count()

    # bad_count = superheroes.superdb.find(
    # {"biography.alignment": "bad"}).count()

    #alignment_counts = [good_count, bad_count]

    #alignmentjson = json.loads(json_util.dumps(alignment_counts))
    # return jsonify(alignmentjson)


if __name__ == "__main__":
    app.run()
