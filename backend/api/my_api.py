import pymongo
from pymongo import MongoClient
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from collections import defaultdict

app = Flask(__name__)
cors = CORS(app)

app.config[
    "MONGO_URI"
] = "mongodb+srv://test:test@cluster0.iku4q9b.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(app.config["MONGO_URI"])
db = client["UserInfo"]
collection = db["Users"]
# fix


@app.route("/create-user", methods=["POST"])
@cross_origin()
def create_user():
    # getting user information
    print("server received")
    userdata = request.get_json()
    username = userdata.get("user")
    password = userdata.get("pass")
    confirm = userdata.get("confirm")
    if collection.count_documents({"user": username}) > 0: #if the username alr exists in the db
        return jsonify({"status": "failure"})
    elif password != confirm: #if the confirm password doesn't match
        return jsonify({"status": "failure"})
    else:
        collection.insert_one({"user": username, "pass": password, "projects": []}) #projects is the projects that the user has access to
        return jsonify({"status": "success"})


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    userdata = request.json
    username = userdata.get("user")
    password = userdata.get("pass")
    doc = collection.find_one({"user": username})
    if doc:
        userPass = doc.get("pass")
        if password == userPass:
            # the user exists and the password matches
            return jsonify({"status": "success"})
        
        else:
            return jsonify({"status": "failure"})
    else:
        return jsonify({"status": "failure"})


@app.route("/get-docs", methods=["GET"])
@cross_origin()
def getDocs():
    #accessing databases
    projectDB = client["ProjectData"] #accessing projectdb
    userDB = client["UserInfo"] #accessing userDB

    #accessing collections
    projects = db["Projects"]
    hardware = db["HardwareSets"]
    users = userDB["Users"]

    #getting the username from the localstorage
    userdata = request.json
    username = userdata.get("user")

    doc = users.find_one({"user": username})

    #get list of projects that the user has access to
    validProjects = doc.get("projects")

    #what we are returning
    status = None
    hardwareMap = {} #map where key: hardwareSet number and value = map of hardware set attributes
    projectMap = defaultdict(lambda: [0, 0]) #creates a map where: key = project id and value = arr of size 2 
    userMap = defaultdict(list) #map where: key = projectid and value = list of users on the project


    if len(validProjects) != 0:
        status = "success"
        for projectid in validProjects: #for each project
            doc = projects.find_one({"projectID": projectid})
            HWSet1 = doc.get("HWSet1") # number of items used in HWSet1
            HWSet2 = doc.get("HWSet2") # number of items used in HWSet2
            
            userList = doc.get("users") #list of users that have access to the project

            hardwareMap[projectid] = [HWSet1, HWSet2]
            userMap[project] = userList
        
        sets = 


    else:
        #there are no projects that the user has joined
        status = "none"
    
    #now we have to store our shared HWSet data

    allSets = hardware.find()
    for doc in allSets:
        map = {
            "quantity" : doc.get('quantity'),
            "capacity" : doc.get('capacity')
        }
        #mapping the hardware set id to the attributes
        hardwareMap[doc.get('setID')] = map
    return jsonify({
        "status" : status,
        "hardwareMap" : hardwareMap,
        "projectMap" : projectMap,
        "userMap" : userMap
    })
        
        
    

if __name__ == "__main__":
    app.run(debug=True)