const request = require ('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidG9ycnlyYW1lc2giLCJhIjoiY2syNjVuZmRuMDMybDNqbWptcjFkZW1veiJ9.2u8CSDH6B4FympsmZ0FRVg'
    console.log('geocode url = ',url)
    request({url, json:true}, (error, {body}) => {
      if (error){
          callback('Unable to connect to mapbox...check network connection',undefined)
      }else if(body.features === undefined || body.features.length === 0){
          console.log("body.features.length = ",body.features.length)
          callback('Unable to get location data...try another search',undefined)
      }else{
        callback(undefined,{
            latitude : body.features[0].center[0],
            longitude : body.features[0].center[1],
            place : body.features[0].place_name
        })
      
      }
    })
}
   

 
module.exports = geocode 