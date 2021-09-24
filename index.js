const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP Function Test
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIP('142.117.8.214', (error, coordinates) => {
//   if (error) {
//     console.log("Couldn't get your location coordinates", error);
//     return;
//   }

//   console.log('Your coordinates are', coordinates);
// });

// My Coordinates
const coords = { latitude: 43.7012, longitude: -79.3877 };

fetchISSFlyOverTimes(coords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log('It worked! Passtimes are', passTimes);
});