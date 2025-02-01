import {fileURLToPath} from 'url'
import express, { query } from 'express'
import hbs from 'hbs'
import geocode from './utils/geocode.js'
import forecast from './utils/forecast.js'
import path from 'path'

// Dirname | Filename Def

const __filename = path.join(fileURLToPath(import.meta.url))
const __dirname = path.dirname(__filename)

// App Def

const app = express()
app.use(express.static(path.join(__dirname, '../public')))

// Views & Partials

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// View Engine = HBS

app.set('view engine', 'hbs')
app.set('views', viewsPath )
hbs.registerPartials(partialsPath)

// Routes

app.get('', (req, res)=>{
    res.render('index', {name:"Nick", title:"Weather"})
})

// Main Route

app.get("/weather", (req, res)=>{
    const address = req.query.address
    if(!address){
        res.send("<h1>No address provided!</h1>")
    }else{
        geocode(address, (error, {latitude, longitude, location}={})=>{
            if(error){
                res.send("<h1>There was an error in processing your request.</h1>")
            }else{
                forecast(latitude, longitude, (error, forecastData)=>{ // FORECAST DATA IS THE CALLBACK RESPONSE!!!!
                    if (error) {
                        return res.send({ error })
                    }
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    })
                })
            }
        })
    }
})

app.get("*", (req, res)=>{
    res.send("<h1>Page Not Found.</h1>")
})

app.listen(3000, ()=>{
    console.log("Successfully started the server.");
})

