import pymongo
from pymongo import MongoClient
from flask import Flask, request, jsonify   
from flask_cors import CORS, cross_origin   

app = Flask(__name__)
cors = CORS(app)

app.config['MONGO_URI'] = "mongodb+srv://test:test@cluster0.iku4q9b.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(app.config['MONGO_URI'])
db = client["UserInfo"]
collection = db["Users"]
#fix


@app.route('/create-user', methods=["POST"])
@cross_origin()
def create_user():
    #getting user information
    print("server received")
    userdata = request.get_json()
    username = userdata.get("user")
    password = userdata.get("pass")
    confirm = userdata.get("confirm")
    if collection.count_documents({"user": username}) > 0:
        return jsonify({"status" : "failure"})
    elif password != confirm:
        return jsonify({"status" : "failure"})
    else:
        collection.insert_one({"user" : username, "pass" : password})
        return jsonify({"status": "success"})
    


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    userdata = request.json
    username = userdata.get("user")
    password = userdata.get("pass")
    doc = collection.find_one({"user": username})
    if doc:
        userPass = doc.get("pass")
        if password == userPass:
            #the user exists and the password matches
            return jsonify({"status": "success"})
        else:
            return jsonify({"status": "failure"})
    else:
        return jsonify({"status" : "failure"})
if __name__ == "__main__":
    app.run(debug=True)
