

# from flask import Flask, jsonify, request, make_response
# import requests
# from flask_cors import CORS


# app = Flask(__name__)
# CORS(app)


# @app.route('/find-vehicle', methods=['GET', 'POST'])
# def find_vehicle():

#     registration_number = request.form['number-plate']

#     # data = request.get_json()
#     # print(request.data)  # add this line to check the request data
#     # registration_number = data['numberPlate']

#     # registration_number = request.json['numberPlate']

#     headers = {'x-api-key': '8Oj2kIjEE798h8yKtsmlearu2cXk18GW5EK9H1hk'}
#     url = f'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles{registration_number}'

#     response = requests.get(url, headers=headers)

#     if response.status_code == 200:
#         vehicle_info = response.json()
#         return jsonify({'name': vehicle_info['make']})
#     else:
#         return jsonify({'error': 'Invalid registration number'})


# if __name__ == "__main__":
#     app.run(debug=True)
from flask import Flask, jsonify, request, make_response
import requests

app = Flask(__name__)


@app.route('/find-vehicle', methods=['GET', 'POST'])
def find_vehicle():
    registration_number = "RP09JUN"
    headers = {'x-api-key': '8Oj2kIjEE798h8yKtsmlearu2cXk18GW5EK9H1hk'}
    url = f'https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles/{registration_number}'

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        vehicle_info = response.json()
        return jsonify({'name': vehicle_info['make']})
    else:
        return str(response.status_code)


if __name__ == "__main__":
    app.run(debug=True)
