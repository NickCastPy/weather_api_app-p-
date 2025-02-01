const form = document.querySelector('form')
const location__input = document.querySelector('.weather__text')
const messageFieldOne = document.querySelector('.message__one')
const messageFieldTwo = document.querySelector('.message__two')
const weatherIcon = document.querySelector('.weather__icon')
const weatherWind = document.querySelector('.weather__wind')

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = location__input.value
    messageFieldOne.textContent = 'Loading...'
    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if (data.error) {
                messageFieldTwo.textContent = data.error
            } else {
                messageFieldOne.textContent = `It is currently ${data.forecast.temperature} degrees out there (feels like ${data.forecast.feelsLike}), with a ${data.forecast.precipitation}% chance of rain.`
                weatherIcon.setAttribute("src", data.forecast.weatherIcon)
                weatherWind.textContent = `Wind: ${data.forecast.windSpeed}, ${data.forecast.windDir}`
            }
        })
    })
})