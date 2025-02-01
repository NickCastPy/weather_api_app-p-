import request from "postman-request"
const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=f7b3eec770f5869391cd9318f0cb33db&query='+latitude+','+longitude
    console.log(url);
    request({url:url, json:true}, (error, {body})=>{
        if(error){
            callback(error, undefined)
        }else{
            callback(undefined, {
                temperature:body.current.temperature,
                feelsLike: body.current.feelslike,
                precipitation: body.current.precip,
                weatherIcon: body.current.weather_icons[0],
                windSpeed: body.current.wind_speed,
                windDir: body.current.wind_dir
            })
        }
    })
}
export default forecast