import pytest
import pytest_check as check
import json
from pymongo import MongoClient
from my_api import app

# Use a different name for the MongoClient to avoid naming conflicts
mongo_test_client = MongoClient("mongodb+srv://test:test@cluster0.iku4q9b.mongodb.net/?retryWrites=true&w=majority")

@pytest.fixture
def client():
    # Create a test client using the Flask application
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

def test_create_user(client):
    # Define the user data for testing
    username = "asamant"  # Fix the variable name from userID to username
    password = "Temp123"
    user_data = {
        "user": username,
        "pass": password,
        "confirm": password,
    }

    # Make a POST request to the create_user route with the test data
    response = client.post("/create-user", json=user_data)

    # Assuming the expected response is a JSON object with a "status" field
    data = json.loads(response.get_data(as_text=True))
    assert data["status"] == "success"

    # Now we check the database just in case
    db = mongo_test_client["UserInfo"]  # Use the MongoClient for database operations
    collection = db["Users"]

    # Check if the document with the given username and password exists
    check.equal(collection.count_documents({"user": username}) > 0, True, "User not found in the database")

    encryptedpass = encrypt(password, 5, -1)
    query = {
        'user': username,
        'pass': encryptedpass
    }

    result = collection.find_one(query)
    check.equal(result is not None, True, "User is not being added to the database")

def test_initialized_database(client):
    projectDB = mongo_test_client["ProjectData"]
    hardware = projectDB["HardwareSets"]

    # Document to update
    set_id_to_update = "HWSet1"

    # Value to insert into the "capacity" field
    new_capacity_value = 100  # Replace this with the desired value

    # Update the document with the new capacity value
    hardware.update_one(
    {"setID": set_id_to_update},
    {"$set": {"capacity": new_capacity_value}}
    )

    # Verify that the update was successful
    updated_doc = hardware.find_one({"setID": set_id_to_update})
    updated_capacity = updated_doc.get("capacity")
    updated_capacity = int(updated_capacity)
    check.equal(updated_capacity, new_capacity_value, "Capacity is not initialized correctly")

    set_id_to_update = "HWSet2"

    hardware.update_one(
    {"setID": set_id_to_update},
    {"$set": {"capacity": new_capacity_value}}
    )

    updated_doc = hardware.find_one({"setID": set_id_to_update})
    updated_capacity = updated_doc.get("capacity")
    updated_capacity = int(updated_capacity)
    check.equal(updated_capacity, new_capacity_value, "Capacity is not initialized correctly")


def test_create_new_project(client):

    projectDB = mongo_test_client['ProjectData']

    #getting collection information
    projects = projectDB['Projects']
    hardwareSets = projectDB['HardwareSets']

    # Define the project data for testing
    project_data = {
        "projectID": "test_project",
        "description": "Test project description",
        "user": "asamant",
        "HWSet1": 0,
        "HWSet2": 0
    }

    response = client.post("/create-project", json=project_data)

    newproject_data = {
        "projectID": "test_project",
        "description": "Test project description",
        "users": ["asamant"],
        "HWSet1": 0,
        "HWSet2": 0

    }

    result = projects.find_one(newproject_data)

    # Assert that the project exists in the collection
    check.equal(result is not None, True, "Project was not added to the database")

def test_checkout_HW1(client):
    db = mongo_test_client['ProjectData']
    hardware = db['HardwareSets']
    projects = db['Projects']

     # Document to update
    set_id_to_update = "HWSet1"

    # Value to insert into the "capacity" field
    checkout = 10  # Replace this with the desired value
    projectid = "test_project"

    #Grab current availability
    doc = hardware.find_one({"setID": set_id_to_update})
    availability = doc.get("quantity")
    availability = int(availability)
    
    #Update using API
    user_data = {
        "set": set_id_to_update,
        "input": str(checkout),
        "projectid": projectid
    }

    response = client.post("/checkOut", json=user_data)

    # Check the updated value
    updated_doc = hardware.find_one({"setID": set_id_to_update})
    updated_availability = updated_doc.get("quantity")
    updated_availability = int(updated_availability)
    check.equal(updated_availability, (availability-checkout), "Checkout is not subtracting correctly")

    updated_project_doc = projects.find_one({"projectID": projectid})
    updated_allocation = updated_project_doc.get(set_id_to_update)
    check.equal(updated_allocation, checkout, "Checkout is not allocating correctly")

     
def test_query_available(client):
    projectDB = mongo_test_client["ProjectData"]
    hardware = projectDB["HardwareSets"]

    # Document to update
    set_id_to_update = "HWSet1"

    # Value to insert into the "capacity" field
    new_avail_value = 66  # Replace this with the desired value

    # Update the document with the new capacity value
    hardware.update_one(
    {"setID": set_id_to_update},
    {"$set": {"quantity": new_avail_value}}
    )

    # Verify that the update was successful
    updated_doc = hardware.find_one({"setID": set_id_to_update})
    updated_availability = updated_doc.get("quantity")
    updated_availability = int(updated_availability)
    check.equal(updated_availability, new_avail_value, "Capacity is not initialized correctly")

    set_id_to_update = "HWSet2"

    hardware.update_one(
    {"setID": set_id_to_update},
    {"$set": {"quantity": new_avail_value}}
    )

    updated_doc = hardware.find_one({"setID": set_id_to_update})
    updated_availability = updated_doc.get("quantity")
    updated_availability = int(updated_availability)
    check.equal(updated_availability, new_avail_value, "Capacity is not initialized correctly")


    


    


    




    
    

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