from flask import Flask, request, render_template, redirect

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html')
    elif request.method == 'POST':
        task_content = request.form['content']

if __name__ == '__main__':
    app.run(debug=True)