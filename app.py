from datetime import datetime
from flask import Flask, request, jsonify, render_template, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    content = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return '<Task %r>' % self.id

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        history = History.query.order_by(History.id).all()
        return render_template('index.html', history=history)
    elif request.method == 'POST':

        task_content = request.json
        new_task = History(content=task_content)
        try:
            db.session.add(new_task)
            db.session.commit()
            return jsonify("success")
        except:
            return jsonify("error")

if __name__ == '__main__':
    app.run(debug=True)