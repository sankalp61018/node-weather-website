const express = require("express")
const path = require("path")
const hbs = require("hbs")
const geocode=require("./utils/geocode")
const forecast=require("./utils/forecast")
const app = express()
const PORT = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")


app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

app.get("/",(req,res) => {
    res.render("index",{
        title:"Weather App",
        name:"Sankalp"
    })
})
app.get("/weather",(req,res) => {
    if(!req.query.address){
       return res.send({error: "You must provide a address!"})
    }
    geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })
        })
    })
})
app.get("/about",(req,res) => {
    res.render("about",{
        title:"About Me",
        name:"Sankalp"
    })
})
app.get("/help",(req,res) => {
    res.render("help",{
        message:"Hello, how are You?",
        title:"Help",
        name:"Sankalp"
    })
})
app.get("/help/*",(req,res) => {
    res.render("404",{
        title:"404 help",
        name:"Sankalp",
        errorMessage:"Help article not found"
    })
})
app.get("*",(req,res) => {
    res.render("404",{
        title:"404",
        name:"Sankalp",
        errorMessage:"Page Not Found"
    })
})
app.listen(PORT,() => {
    console.log("Server is up on port " + PORT)
})

