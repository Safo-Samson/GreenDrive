

const https = require('https');
const { parse } = require('querystring');

const apiKey = 'mDKpeAwFn72aQKOS8cBxV5KB9hvfjVMD8NRLCmtP';

const options = {
    hostname: 'driver-vehicle-licensing.api.gov.uk',
    path: '/vehicle-enquiry/v1/vehicles',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
    },
};

const handleDVLARequest = (req, res) => {
    if (req.method === 'GET' && req.url === '/backend/vehicle-enquiry.js') {
        let rawData = '';

        req.on('data', (chunk) => {
            rawData += chunk;
        });

        req.on('end', () => {
            try {
                const { registrationNumber } = JSON.parse(rawData);
                const data = JSON.stringify({ registrationNumber });

                const req = https.request(options, (apiRes) => {
                    console.log(`statusCode: ${apiRes.statusCode}`);
                    let apiData = '';
                    apiRes.on('data', (chunk) => {
                        apiData += chunk;
                    });

                    apiRes.on('end', () => {
                        try {
                            const vehicleData = JSON.parse(apiData);
                            const { make, colour, yearOfManufacture } = vehicleData;
                            console.log(`Make: ${make}, Colour: ${colour}, Year of Manufacture: ${yearOfManufacture}`);

                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ make, colour, yearOfManufacture }));

                        } catch (error) {
                            console.error(error);
                        }
                    });
                });

                req.on('error', (error) => {
                    console.error(error);
                });

                req.write(data);
                req.end();

            } catch (error) {
                console.error(error);
            }
        });
    }
}

module.exports = handleDVLARequest;



// const https = require('https');

// const apiKey = 'mDKpeAwFn72aQKOS8cBxV5KB9hvfjVMD8NRLCmtP';

// const data = JSON.stringify({ registrationNumber: 'Fx09ohw' });

// const options = {
//     hostname: 'driver-vehicle-licensing.api.gov.uk',
//     path: '/vehicle-enquiry/v1/vehicles',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': apiKey,
//     },
// };

// const req = https.request(options, (res) => {
//     console.log(`statusCode: ${res.statusCode}`);

//     let rawData = '';
//     res.on('data', (chunk) => {
//         rawData += chunk;
//     });

//     res.on('end', () => {
//         try {
//             const vehicleData = JSON.parse(rawData);
//             const { make, colour, yearOfManufacture } = vehicleData;
//             console.log(`Make: ${make}, Colour: ${colour}, Year of Manufacture: ${yearOfManufacture}`);
//         } catch (error) {
//             console.error(error);
//         }
//     });
// });

// req.on('error', (error) => {
//     console.error(error);
// });

// req.write(data);
// req.end();

