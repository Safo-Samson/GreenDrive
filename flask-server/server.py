

from flask import Flask, jsonify
from flask import Flask, jsonify, request, make_response
import requests
from flask_cors import CORS


# app = Flask(__name__)
# CORS(app)


# @app.route('/find-vehicle', methods=['GET', 'POST'])
# def find_vehicle():

#     # registration_number = request.form['number-plate']

#     data = request.get_json()
#     print(request.data)  # add this line to check the request data
#     registration_number = data['numberPlate']

#     registration_number = request.json['numberPlate']

#     headers = {'x-api-key': 'mDKpeAwFn72aQKOS8cBxV5KB9hvfjVMD8NRLCmtP',
#                'Content-Type': 'application/json'}
#     url = f'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles{registration_number}'

#     response = requests.get(url, headers=headers, json=data)

#     if response.status_code == 200:
#         vehicle_info = response.json()
#         return jsonify({'name': vehicle_info['make']})
#     else:
#         return jsonify({'error': 'Invalid registration number'})


# if __name__ == "__main__":
#     app.run(debug=True)


app = Flask(__name__)


@app.route('/find-vehicle', methods=['GET', 'POST'])
def find_vehicle():

    # data = request.get_json()
    # registration_number = data['numberPlate']

    if request.method == 'GET':
        registration_number = 'FX09OHW'
        api_key = 'mDKpeAwFn72aQKOS8cBxV5KB9hvfjVMD8NRLCmtP'
        url = 'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles'
        headers = {
            'x-api-key': api_key,
            'Content-Type': 'application/json'
        }
        data = {
            'registrationNumber': registration_number
        }
        response = requests.post(url, headers=headers, json=data)

        if response.status_code == 200:
            vehicle_info = response.json()
            return jsonify(vehicle_info)
        else:
            return jsonify({'error': 'Invalid registration number'})
    else:
        'Post not implemented yet'


if __name__ == '__main__':
    app.run(debug=True)
