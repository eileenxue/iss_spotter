const { fetchMyIP, fetchCoordsByIP } = require('./iss');

// fetchMyIP Function Test
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

fetchCoordsByIP('142.117.8.214', (error, coordinates) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log('It worked!', coordinates);
});