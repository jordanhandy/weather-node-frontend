const request = require("postman-request"); // request library
const forecast = (lat,lon,callback) => { // args, and callback function
    // define api URL
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API}&query=`+lat+","+lon;
    request({url,json:true},(error,{body}) => { // { body } destructuring
      if(error){
          // if error object
        callback("Unable to connect to service",undefined);
      }else if(body.error){
          // if location not found
        callback("Unable to find location.  Please try again.",undefined);
      } else{
          // print forecast
        callback(undefined,"FORECAST: " +
                      body.current.weather_descriptions[0] +
                      "\nIt is currently " +
                      body.current.temperature +
                      " degrees outside.\nThere is currently a " +
                      body.current.precip +
                      " percent chance of rain.\nIt feels like " +
                      body.current.feelslike +
                      " degrees outside."
        )
      }
    })
  }
  // export
  module.exports = forecast;