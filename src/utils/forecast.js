const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url ="http://api.weatherstack.com/current?access_key=5b162ccdc0ee47e7d0adc6c77d6ef91b&query=" + latitude + "," + longitude + "&units=f"
    request({url, json: true}, (err,{body} = {}) => {
        if(err){
            callback("Unable to connect to weather service", undefined)
        }
        else if(body.error){
            callback("Unable to find the weather data, try another search", undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees fahrenheit " + "and it feels like " + body.current.feelslike + " degress fahrenheit.");
        }
    })
}

module.exports = forecast