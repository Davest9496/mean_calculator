from flask import Flask, jsonify, render_template, request,session
import random, os

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/mean_calculator', methods=['GET'])
def mean_calculator():
    num_elements = random.randint(6, 10)
    set_num = [random.randint(10, 90) for _ in range(num_elements)]
    total_sum = sum(set_num)
    mean = total_sum/len(set_num)
    size = len(set_num)
    return jsonify({'numbers': set_num, 'total': total_sum, 'mean': mean, 'size': size})

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
