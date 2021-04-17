const request = require("postman-request");

const geocode = (address, callback) => { // args and callback
    // url
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/`+encodeURI(address)+`.json?access_token=${process.env.GEOCODE_API}&limit=1`
    request({url, json:true},(error,{body}) =>{ // { body } destructuring
       if(error){
          // if error object
        callback('Unable to connect to location services',undefined);
      }else if(body.features.length===0){
          // if location not found
        callback("Unable to find the location.  Try another search",undefined);
      } else{
          // get response from API
        callback(undefined,{
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          placeName: body.features[0].place_name
        })
      }
    })
  }
  // export
  module.exports = geocode