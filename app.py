from flask import Flask, render_template, render_template_string
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
import json
import urllib.parse
import random

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///kaplandb.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)

migrate = Migrate (app, db)

class extable (db.Model):
    id = db.Column (db.Integer, primary_key = True)
    subject = db.Column(db.String())
    message = db.Column(db.String())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    def __repr__(self):
        return f'<extable: {self.name}>'
        
    
class user (db.Model):
    id =  db.Column (db.Integer, primary_key = True)
    name = db.Column(db.String())
    mail = db.Column(db.String())
    phone = db.Column(db.Integer())
    def __repr__(self):
        return f'<ulser: {self.name}>'

@app.route('/')
def index():
 return render_template("index.html")
@app.route('/contact')
def contact():
 return render_template("contact.html")
@app.route('/threeD')
def threeD():
 return render_template("threeD.html")
@app.route('/service_page')
def service_page():
 return render_template("service_page.html")
@app.route('/main')
def main():
 return render_template("main.html")
@app.route('/test')
def test():
 return render_template("test.html")
@app.route('/video')
def video():
 return render_template("video.html")
@app.route('/webdev')
def webdev():
 return render_template("webdev.html")

@app.route("/informations", methods=['POST'])
def comment():
    print("Adding new module to the database")

    print(str(request.data))

    # Decode URL-encoded string
    decoded_string = urllib.parse.unquote(request.data.decode())

    # Extract JSON part
    json_string = decoded_string.split('=', 1)[1]

    # Parse JSON string to JSON object
    json_object = json.loads(json_string)

    # Print JSON object
    print(json_object["name"])
    print(json_object["mail"])
    print(json_object["phone"])
    print(json_object["subject"])
    print(json_object["message"])
    
    unique_id = int(random.getrandbits(4))

    
    User = user(
        id=unique_id,
        name=json_object["name"],
        mail=json_object["mail"],
        phone=json_object["phone"],
    )
    newModule = extable(
        id=unique_id,
        subject=json_object["subject"],
        message=json_object["message"],
        user_id=unique_id,
    )
    
    
    db.session.add(User)
    db.session.add(newModule)
    
    db.session.commit()

    return "Hello"

if __name__ == "__main__":
    app.run(debug = True)
