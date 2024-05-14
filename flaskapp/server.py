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


@app.route('/submit_answer', methods=['POST'])
def submit_answer():
    #Retrieve sessions from mean_calculator
    sum_total = session.get('sum')
    mean = session.get('mean', None)
    size = session.get('size')

    #Get form inputs
    step1 = request.form.get('step1')
    step2 = request.form.get('step2')
    step3 = request.form.get('step3')
    return jsonify({'message': 'Answer submitted successfully', 'answer': answer})

@app.route('/')
def home():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)