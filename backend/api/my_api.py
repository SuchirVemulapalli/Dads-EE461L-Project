import pymongo
from pymongo import MongoClient
from flask import Flask, request, jsonify   
from flask_cors import CORS, cross_origin   

cors_config = {
    "origins" : ["http://localhost:5173"],
    "methods" : ["OPTIONS", "GET", "POST"],
    "allow_headers" : ["Authorization", "Content-Type"]
}
app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": cors_config}) #Add your url of project here

app.config['MONGO_URI'] = "mongodb+srv://akim678910:2812368663a@cluster0.b9lpktw.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(app.config['MONGO_URI'])
db = client["test"]
collection = db["test"]

@app.route('/api/test', methods = ['GET'])
@cross_origin()
def test():
    response_data = {"message": "API is working!"}
    return jsonify(response_data)

@app.route('/api/createUser', methods=["POST"])
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

@app.route('/api/login', methods=['GET'])
def login():
    userdata = request.json
    username = userdata.get("user")
    password = userdata.get("pass")
    doc = collection.find_one({"user": username})
    userPass = doc.get("pass")
    if password == userPass:
        return jsonify({"status": "success"})
    else:
        return jsonify({"status": "failure"})
if __name__ == "__main__":
    app.run(debug=True)
