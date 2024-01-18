const https = require('https');
const querystring = require('querystring');

const formPost = async (host, path, headers, body) => {
  return new Promise((resolve, reject) => {
    try {
      // Request data
      const requestData = querystring.stringify(body);

      // Request options
      const options = {
        hostname: host,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(requestData),
          ...headers
        }
      };

      // Create the request
      const req = https.request(options, (res) => {
        let responseData = '';

        // Collect response data
        res.on('data', (chunk) => {
          responseData += chunk;
        });

        // Process response data
        res.on('end', () => {
          console.log('Response:', responseData);
          resolve(responseData);
        });
      });

      // Handle errors
      req.on('error', (error) => {
        console.error('Error:', error);
        reject(error);
      });

      // Send the request
      req.write(requestData);
      req.end();
    }
    catch (error) {
      console.log(error);
      reject(error);
    }

  });

}

const jsonPost = async (host, path, headers, body) => {
  return new Promise((resolve, reject) => {
    try {
      // Request data
      const requestData = JSON.stringify(body);

      // Request options
      const options = {
        hostname: host,
        port: 443,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': requestData.length,
          ...headers
        }
      };

      // Create the request
      const req = https.request(options, (res) => {
        let responseData = '';

        // Collect response data
        res.on('data', (chunk) => {
          responseData += chunk;
        });

        // Process response data
        res.on('end', () => {
          console.log('Response:', responseData);
          resolve(responseData);
        });
      });

      // Handle errors
      req.on('error', (error) => {
        console.error('Error:', error);
        reject(error);
      });

      // Send the request
      req.write(requestData);
      req.end();
    }
    catch (error) {
      console.log(error);
      reject(error);
    }

  });

}

module.exports = { jsonPost, formPost }