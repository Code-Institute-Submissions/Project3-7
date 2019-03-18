import pymongo
import os
import json
from flask import Flask, flash, jsonify ,render_template, redirect, request, url_for, session, g
from werkzeug.security import generate_password_hash, check_password_hash
from flask_pymongo import PyMongo
from bson.objectid import ObjectId




#const set with capital laters with underscore seperating the words
#MONGO_URI was set from the command line with the export command
#mongodb://Admin:B00kjm@ds331735.mlab.com:31735/recipe_book
MONGODB_URI = os.getenv("MONGO_URI")  
COLLECTION_NAME ="recipes"

app = Flask(__name__)
SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY
app.config["DBS_NAME"] = "recipe_book"
app.config["MONGO_URI"] = "mongodb://Admin:B00kjm@ds331735.mlab.com:31735/recipe_book"

mongo = PyMongo(app)

# Collections

users_collection = mongo.db.users
recipes_collection = mongo.db.recipes

@app.route('/')
@app.route('/index')
def index():
    return render_template("index.html")
    
# Sign up
@app.route('/login')
def login():
	# Check if user is not logged in already
	return render_template('login.html')
	
@app.route('/user_auth', methods=['POST'])
def user_auth():
	
	form = request.form.to_dict()
	user_in_db = users_collection.find_one({"user_name": form['user_name']})
	print(user_in_db)
	if 'user' in session:
		flash("your in session allready");
		return redirect(url_for('profile', myuser=user_in_db['user_name']))
	# Check for user in database
	if user_in_db:
		# If passwords match (hashed / real password)
		if check_password_hash(user_in_db['user_password'], form['user_password']):
			# Log user in (add to session)
			session['user'] = form['user_name']
			g.golbalUser = form['user_name']
			flash("You were logged in!")
			print ("You were logged in!")
			print(user_in_db['user_name'])
			return redirect(url_for('profile', myuser=user_in_db['user_name']))
		else:
			flash("Wrong password or user name!")
			print("Wrong password or user name!")
			return redirect(url_for('login'))
	else:
		flash("You must be registered!")
		print("you must be registered")
		return redirect(url_for('index'))
    
# Sign up
@app.route('/register', methods=['GET', 'POST'])
def register():
	# Check if user is not logged in already
	if 'user' in session:
		return jsonify({"error":"your in session allready"});
	if request.method == 'POST':
		form = request.form.to_dict()
		# If so try to find the user in db
		user = users_collection.find_one({"user_name" : form['user_name']})
		if user:
			return jsonify({"error":"user name already taken"});
			#	return redirect(url_for('register'))
			# If user does not exist register new user   f{form['username']} 
		else:				
			# Hash password
			hash_pass = generate_password_hash(form['user_password'])
			#Create new user with hashed password
			users_collection.insert_one(
				{
					'user_name': form['user_name'],
					'user_email': form['user_email'],
					'user_password': hash_pass
				}
			)
			# Check if user is actualy saved
			user_in_db = users_collection.find_one({"user_name": form['user_name']})
			if user_in_db:
				# Log user in (add to session)
				print("data loaded")
				session['user'] = user_in_db['user_name']
				return jsonify({"success":"Register Completed"});
			else:
				print("data not laoded")
				return jsonify({"error":"Problem loading data"});
				
@app.route('/logout')
def logout():
	# Clear the session
	session.clear()
	flash('You were logged out!')
	return redirect(url_for('index'))

				
@app.route('/profile', methods=['GET', 'POST'])
def profile():
	user = session['user'];
	return render_template("profile.html", myrecipes = mongo.db.recipes.find({"user_name": user}))

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

@app.route('/get_name')
def get_name():
    name="john"
    return name;

@app.route('/add_recipe') 
def add_recipe():
    return render_template("add_recipe.html")
    
@app.route('/submit_recipe', methods=['GET', 'POST']) 
def submit_recipe():
	if request.method == 'POST':
		form = request.form.to_dict()
		steps=[]
		if form['step1'] !="":
			steps.append({'step':form['step1']})
			if form['step2'] !="":
				steps.append({'step':form['step2']})
				if form['step3'] !="":
					steps.append({'step':form['step3']})
					if form['step4'] !="":
						steps.append({'step':form['step4']})
						if "step5" in form:
							steps.append({'step':form['step5']})
							if "step6" in form:
								steps.append({'step':form['step6']})
								if "step7" in form:
									steps.append({'step':form['step7']})
									if "step8" in form:
										steps.append({'step':form['step8']})
								

		allergens=[]
		if form['allergen1'] !="":
			allergens.append({'allergen':form['allergen1']})
			if form['allergen2'] !="":
				allergens.append({'allergen':form['allergen2']})
				if "allergen3" in form:
					allergens.append({'allergen':form['allergen3']})
					if "allergen4" in form:
						allergens.append({'allergen':form['allergen4']})
						if "allergen5" in form:
							allergens.append({'allergen':form['allergen5']})
						
		ingredients=[]
		if form['ingredient1'] !="":
			ingredients.append({'ingredient':form['ingredient1'],'portion':form['portion1']})
			if form['ingredient2'] !="":
				ingredients.append({'ingredient':form['ingredient2'],'portion':form['portion2']})
				if form['ingredient3'] !="":
					ingredients.append({'ingredient':form['ingredient3'],'portion':form['portion3']})
					if form['ingredient4'] !="":
						ingredients.append({'ingredient':form['ingredient4'],'portion':form['portion4']})
						if "ingredient5" in form:
							ingredients.append({'ingredient':form['ingredient5'],'portion':form['portion5']})
							if "ingredient6" in form:
								ingredients.append({'ingredient':form['ingredient6'],'portion':form['portion6']})
								if "ingredient7" in form:
									ingredients.append({'ingredient':form['ingredient7'],'portion':form['portion7']})
									if "ingredient8" in form:
										ingredients.append({'ingredient':form['ingredient8'],'portion':form['portion8']})
										if "ingredient9" in form:
											ingredients.append({'ingredient':form['ingredient9'],'portion':form['portion9']})
											if "ingredient10" in form:
												ingredients.append({'ingredient':form['ingredient10'],'portion':form['portion10']})
	
		# If so try to find the user in db
		recipe = recipes_collection.find_one({"dish_name" : form['dish_name']})
		if recipe:
			flash("Recipe name already taken");		
			return redirect(url_for('add_recipe'))
		else:	
			author = session['user'];
			recipes_collection.insert_one(
				{
					'user_name': author,
					'dish_name': form['dish_name'],
					'type': form['type'],
					'prep_time':form['prep_time'],
					'cook_time':form['cook_time'],
					'serves':form['serves'],
					'url_image':form['url_image'],
					'origin':form['country'],
					'ingredients':(ingredients),
					'method': (steps),
					'allergens': (allergens)
				}
			)
			# Check if user is actualy saved
			recipe_in_db = recipes_collection.find_one({"dish_name": form['dish_name']})
			if recipe_in_db:
				# Log user in (add to session)
				print("recipe loaded")
				flash("You have successfully added you recipe")
				return redirect(url_for('add_recipe'))
			else:
				flash("You have successfully added you recipe")
				return redirect(url_for('add_recipe'))
	

@app.route('/find_recipe', methods=["POST","GET"])
def find_recipe():
   name = request.form['dish_name']
   recipe = mongo.db.recipes.find_one({ 'dish_name': name })
   if recipe is None:
        return jsonify({"error":"missing data"})
   else:
        array = json.dumps([{'dish': recipe['dish_name']}, 
                       {'author': recipe['user_name']},
                       {'origin': recipe['origin']},
                       {'type': recipe['type']},
                       {'prep_time': recipe['prep_time']},
                       {'cook_time': recipe['cook_time']},
                       {'serves': recipe['serves']},
                       {'url_image': recipe['url_image']},
                      {'recipe_id': str(recipe['_id'])}
                       ])
        return jsonify(array)
    
if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)