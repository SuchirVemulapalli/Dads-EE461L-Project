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
    password = encrypt(userdata.get("pass"),5, -1)
    confirm = encrypt(userdata.get("confirm"),5,-1)
    if collection.count_documents({"user": username}) > 0: #if the username alr exists in the db
        return jsonify({"status": "user already exists"})
    elif password != confirm: #if the confirm password doesn't match
        return jsonify({"status": "passwords do not match"})
    else:
        collection.insert_one({"user": username, "pass": password, "projects": []}) #projects is the projects that the user has access to
        return jsonify({"status": "success"})


@app.route("/login", methods=["POST"])
@cross_origin()
def login():
    userdata = request.json
    username = userdata.get("user")
    password = encrypt(userdata.get("pass"),5,-1)
    doc = collection.find_one({"user": username})
    if doc:
        userPass = doc.get("pass")
        if password == userPass:
            # the user exists and the password matches
            return jsonify({"status": "success"})
        
        else:
            return jsonify({"status": "password is incorrect"})
    else:
        return jsonify({"status": "user does not exist"})


@app.route("/get-docs", methods=["POST"])
@cross_origin()
def getDocs():
    #accessing databases
    projectDB = client["ProjectData"] #accessing projectdb
    userDB = client["UserInfo"] #accessing userDB

    #accessing collections
    projects = projectDB["Projects"]
    hardware = projectDB["HardwareSets"]
    users = userDB["Users"]


    #getting the username from the localstorage
    userdata = request.json
    username = userdata.get("user")
    
    doc = users.find_one({"user": username})
    if not doc:
        return jsonify({"status" : "none"})
    #get list of projects that the user has access to
    validProjects = doc.get("projects")

    #what we are returning
    status = None
    hardwareMap = {} #map where key: hardwareSet number and value = map of hardware set attributes
    projectMap = defaultdict(lambda: [0, 0, ""]) #creates a map where: key = project id and value = arr of size 2 
    userMap = defaultdict(list) #map where: key = projectid and value = list of users on the project

    if len(validProjects) != 0:
        status = "success"
        for projectid in validProjects: #for each project
            doc = projects.find_one({"projectID": projectid})
            if doc:
                
                HWSet1 = doc.get("HWSet1") # number of items used in HWSet1
                HWSet2 = doc.get("HWSet2") # number of items used in HWSet2
                description = doc.get("description")
                
                userList = doc.get("users") #list of users that have access to the project

                projectMap[projectid] = [HWSet1, HWSet2, description]
                userMap[projectid] = userList
            else:
                print("none") #debugging purposes

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
        "userMap" : userMap,
        "projectList" : validProjects #list of user's projects
    })
        
@app.route("/create-project", methods=["POST"])
@cross_origin()
def createProject():
    # getting db information
    print("server received")
    projectDB = client['ProjectData']
    userDB = client['UserInfo']

    #getting collection information
    projects = projectDB['Projects']
    hardwareSets = projectDB['HardwareSets']
    users = userDB['Users']

    #info from front end
    userdata = request.get_json()
    projectID = userdata.get("projectID")
    description = userdata.get("description")
    username = userdata.get("user")

    
    
    if projects.count_documents({"projectID" : projectID}) > 0: #the projectid alr exists
        return jsonify({"status": "project already exists"})
    else:
        #add the new document to the project collection
        doc = {
        "projectID" : projectID,
        "description" : description,
        "users" : [username],
        "HWSet1": 0,
        "HWSet2": 0
        }
        projects.insert_one(doc)

        #add the project to the user's project list in user collection

        filter = {'user' : username}
        doc = users.find_one({'user' : username})
        arr = doc.get("projects")
        arr.append(projectID)
        update = {'$set': {'projects': arr}}
        result = users.update_one(filter, update)
        return jsonify({"status": "successfully created project"})
    
@app.route("/join-project", methods=["POST"])
@cross_origin()
def joinProject():
    # getting db information
    print("server received")
    projectDB = client['ProjectData']
    userDB = client['UserInfo']

    #getting collection information
    projects = projectDB['Projects']
    users = userDB['Users']

    #info from front end
    userdata = request.get_json()
    username = userdata.get("user")
    projectID = userdata.get("projectID")

    #adding the user to the project user list
    doc = projects.find_one({"projectID": projectID})
    if not doc:  #if the project doesn't exist
        return jsonify({"status" : "the project does not exist"})
    arr = doc.get("users")
    seen = set(arr)
    if username in seen: #the user is alr in the project
        return jsonify({"status" : "user already in project"})
    arr.append(username)
    filter = {'projectID' : projectID}
    update = {'$set': {'users': arr}}
    result = projects.update_one(filter, update)

    #adding the project to the user's project list
    doc = users.find_one({"user": username})
    arr = doc.get("projects")
    seen = set(arr)
    if projectID in seen: #the user is alr in the project
        return jsonify({"status" : "user already in project"})
    arr.append(projectID)
    filter = {"user": username}
    update = {'$set': {'projects': arr}}
    result = users.update_one(filter, update)

    return jsonify({"status" : "successfully joined project"})

@app.route("/leave-project", methods=["POST"])
@cross_origin()
def leaveProject():
    # getting db information
    print("server received")
    projectDB = client['ProjectData']
    userDB = client['UserInfo']
    hardware = projectDB['HardwareSets']

    #getting collection information
    projects = projectDB['Projects']
    users = userDB['Users']

    #info from front end
    userdata = request.get_json()
    username = userdata.get("user")
    projectID = userdata.get("projectID")

    #removing the user to the project user list
    doc = projects.find_one({"projectID": projectID})
    if not doc:  #if the project doesn't exist
        return jsonify({"status" : "project does not exist"})
    arr = doc.get("users")
    seen = set(arr)
    if username not in seen: #the user is not in the project
        return jsonify({"status" : "user not in project"})
    arr.remove(username)

    if (len(arr) == 0):
        doc = projects.find_one({"projectID": projectID})
        amount1 = doc.get("HWSet1")
        amount2 = doc.get("HWSet2")
        
        filter = {'setID' : "HWSet1"}
        filter2 = {'setID' : "HWSet2"}
        hardwareDoc = hardware.find_one(filter)
        hardwareDoc2 = hardware.find_one(filter2)
        prev1 = hardwareDoc.get("quantity")
        prev2 = hardwareDoc2.get("quantity")

        update = {'$set': {'quantity': amount1 + prev1}}
        update2 = {'$set': {'quantity': amount2 + prev2}}
        hardware.update_one(filter, update)
        hardware.update_one(filter2, update2)

        result = projects.delete_one({"projectID": projectID})
        
        #Prints to console if Project was successfully deleted when no user owns project
        if result.deleted_count == 1:
            print("Document deleted successfully.")
        else:
            print("Document not found or not deleted.")
    else:
        update = {'$set': {'users': arr}}
        projects.update_one({"projectID": projectID}, update)
    

    #removing the project to the user's project list
    doc = users.find_one({"user": username})
    arr = doc.get("projects")
    seen = set(arr)
    if projectID not in seen: #the user is not in the project
        return jsonify({"status" : "user not in project"})
    arr.remove(projectID)
    filter = {"user": username}
    update = {'$set': {'projects': arr}}
    result = users.update_one(filter, update)

    return jsonify({"status" : "successfully left project"})

@app.route("/get-sets", methods=["POST"])
@cross_origin()
def getSets():
    #accessing databases
    projectDB = client["ProjectData"] #accessing projectdb

    #access collections 
    hardware = projectDB["HardwareSets"]

    doc1 = hardware.find_one({"setID": "HWSet1"})
    doc2 = hardware.find_one({"setID": "HWSet2"})
    
    quantity1 = doc1.get("quantity")
    capacity1 = doc1.get("capacity")

    quantity2 = doc2.get("quantity")
    capacity2 = doc2.get("capacity")

    return jsonify({
        "quantity1" : quantity1,
        "quantity2" : quantity2,
        "capacity1" : capacity1,
        "capacity2" : capacity2
    })

# For simplicity, n=5, d=-1 always, Change later to randomize
def encrypt(inputText, N, D):

    if(N>92):
        return encrypt(inputText, (N%93), D)

    reversedInput = ""
    for i in inputText:
        reversedInput = i + reversedInput

    encryptedInput = ""
    for i in reversedInput:
        if(D>0):
            if(ord(i)+N>126):
                encryptedInput = encryptedInput + chr((ord(i)+N)-126+33)
            else:
                encryptedInput = encryptedInput + chr(ord(i)+N)
        else:
            if(ord(i)-N<34):
                encryptedInput = encryptedInput + chr(((ord(i) - N)) - 34 + 127)

            else:
                encryptedInput = encryptedInput + chr(ord(i)-N)
    return encryptedInput


def decrypt(reversedText, N, D):
   return encrypt(reversedText, N, (-1)*D)


#from hw6
@app.route("/checkIn", methods=["POST"])
@cross_origin()
def checkIn_hardware():
    db = client['ProjectData']
    hardware = db['HardwareSets']
    projects = db['Projects']

    userdata = request.get_json()
    set = userdata.get("set")
    input = int(userdata.get("input"))
    projectid = userdata.get("projectid")

    if set == "HWSet1":
        doc = hardware.find_one({"setID" : "HWSet1"})
    else:
        doc = hardware.find_one({"setID" : "HWSet2"})
    capacity = doc.get("capacity")
    quantity = doc.get("quantity")

    filter = {"projectID": projectid}
    doc = projects.find_one({"projectID": projectid})
    prev = doc.get(set)
    
    if input <= 0:
        return jsonify({"status": "Enter a positive value"})
    elif input+quantity > 100:
        return jsonify({"status": "Checking in more than total capacity"})
    elif not input:
        return jsonify({"status": "Please enter a value"})
    elif prev-input < 0:
        return jsonify({"status": "Checking in more than currently checked out"})
    else:
        #updating set in HWSet DB
        filter = {'setID' : set}
        update = {'$set': {'quantity': quantity + input}}
        result = hardware.update_one(filter, update)

        #updating project in project DB
        filter = {"projectID": projectid}
        doc = projects.find_one({"projectID": projectid})
        prev = doc.get(set)
        new = prev - input
        update = {'$set': {set: new}}
        result = projects.update_one(filter, update)

        return jsonify({
                "status": "success",
                "projectid": projectid,
                "output" : (new)
            })

@app.route("/checkOut", methods=["POST"])
@cross_origin()
def checkOut_hardware():
    db = client['ProjectData']
    hardware = db['HardwareSets']
    projects = db['Projects']

    userdata = request.get_json()
    set = userdata.get("set")
    input = int(userdata.get("input"))
    projectid = userdata.get("projectid")

    if set == "HWSet1":
        doc = hardware.find_one({"setID" : "HWSet1"})
    else:
        doc = hardware.find_one({"setID" : "HWSet2"})
    quantity = doc.get("quantity")
    if input > quantity:
        return jsonify({"status": "Not enough quantity"})
    elif input <= 0:
        return jsonify({"status": "Enter a positive value"})
    elif not input:
        return jsonify({"status": "Please enter a value"})
    else:
        #updating set in HWSet DB
        filter = {'setID' : set}
        update = {'$set': {'quantity': quantity - input}}
        result = hardware.update_one(filter, update)

        #updating project in project DB
        filter = {"projectID": projectid}
        doc = projects.find_one({"projectID": projectid})
        prev = doc.get(set)
        new = prev + input
        update = {'$set': {set: new}}
        result = projects.update_one(filter, update)

        return jsonify({
                "status": "success",
                "projectid": projectid,
                "output" : (new)
            })

if __name__ == "__main__":
    app.run(debug=True)