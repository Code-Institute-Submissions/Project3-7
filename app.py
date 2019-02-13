import pymongo
import os
from flask import Flask
app = Flask(__name__)
#const set with capital laters with underscore seperating the words
#MONGO_URI was set from the command line with the export command
#mongodb://Admin:B00kjm@ds331735.mlab.com:31735/recipe_book
MONGODB_URI = os.getenv("MONGO_URI")  
DBS_NAME ="recipe_book"
COLLECTION_NAME ="recipes"



#Connect to mongo database
def mongo_connect(url):
    try:
       conn = pymongo.MongoClient(url)
       return conn
    except pymongo.errors.ConnectionFailure as e:
        print("Could not connect to MongoDB: %s") % e

@app.route('/')
def display():
    return("hello")

# call function
#"mongodb://Admin:B00kjm@ds331735.mlab.com:31735/recipe_book"
#conn = mongo_connect(MONGODB_URI)
#coll = conn[DBS_NAME][COLLECTION_NAME]
#documents = coll.find()
#for doc in documents:
#    print(doc)

if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)