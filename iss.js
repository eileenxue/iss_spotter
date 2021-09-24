/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const request = require('request');

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request('https://api.ipify.org?format=json', (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

    // If request fails due to invalid domain, user offline
    if (error) {
      callback(error, null);
      return;
    }

    // For non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // Parse the body string into object
    const data = JSON.parse(body).ip;
    
    // Return the ip
    return callback(null, data);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    // Failed request due to invalid domain
    if (error) {
      callback(error, null);
      return;
    }

    // For non-200 status code, send error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching page. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    // Find latitude and longitude and convert object
    const { latitude, longitude } = JSON.parse(body);

    // console.log(typeof { latitude, longitude })
    return callback(null, { latitude, longitude });

  });

};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
  
    // Failed request due to domain
    if (error) {
      callback(error, null);
      return;
    }

    // For non-200 status code, send error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching page. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    // Parse the result
    const passTimes = JSON.parse(body).response;

    // Return the passTimes
    callback(null, passTimes);

  });

};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };