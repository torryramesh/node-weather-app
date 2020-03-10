const request = require('request')

const forecast = (latitude,longitude, callback) =>{


    const url = 'https://api.darksky.net/forecast/265f39f2ff9038ba394a3f7e77c532a6/'+latitude+','+longitude

    request({url, json:true}, (error, {body}) => {

        if (error){
          callback('Unable to connect to weather api...check network connection',undefined)
        }else if(!body.currently){
            callback(undefined,'Unable to get forecast')
        }else{
          const summary = body.daily.data[0].summary
          const temp =  body.currently.temperature
          const precip = body.currently.precipProbability
     
          callback(undefined, summary+". Temperature of "+temp+" degrees with "+precip+"% chance for rain.")
            
                
            
      
        }
    })
}

module.exports = forecast
