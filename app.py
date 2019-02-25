import pymongo
import os
from flask import Flask, flash, jsonify ,render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId



#const set with capital laters with underscore seperating the words
#MONGO_URI was set from the command line with the export command
#mongodb://Admin:B00kjm@ds331735.mlab.com:31735/recipe_book
MONGODB_URI = os.getenv("MONGO_URI")  
COLLECTION_NAME ="recipes"
print(MONGODB_URI)
app = Flask(__name__)
SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY
app.config["DBS_NAME"] = "recipe_book"
app.config["MONGO_URI"] = "mongodb://Admin:B00kjm@ds331735.mlab.com:31735/recipe_book"

mongo = PyMongo(app)

@app.route('/')
@app.route('/get_recipes')
def get_recipes():
    return render_template("recipes.html", recipes = mongo.db.recipes.find())
    
@app.route('/show_recipe/<recipe_id>')
def show_recipe(recipe_id):
    return render_template("show_recipe.html",
    recipe = mongo.db.recipes.find_one({ '_id': ObjectId(recipe_id) })
    )
    
@app.route('/search_recipes')
def search_recipes():
    return render_template("search_recipes.html", recipes = mongo.db.recipes.find())

@app.route('/find_recipe', methods=['POST'])
def find_recipe():
        name = request.form['dish_name']
        recipe = mongo.db.recipes.find_one({ 'dish_name': name })
        if recipe is None:
             flash('No Record found')
             return redirect(url_for('search_recipes'))
        return jsonify(recipe)
       # return render_template("show_recipe.html", recipe = recipe)


    
if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)