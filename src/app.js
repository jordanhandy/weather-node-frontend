require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// Define path for Express config
const publiDirPath= path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../src/templates/views');
const partialsPath = path.join(__dirname,'../src/templates/partials');

// setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publiDirPath));
const PORT = process.env.PORT || 3000;


app.get("/",(req,res) =>{
    res.render('index',{
        title: "Weather App",
        name: "Jordan Handy"
    });
})
app.get("/weather",(req,res)=>{
    // address is required, will throw error if none
    // else, run
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
                });
    }
    // return error if no address found
    geocode(req.query.address,(error,{ latitude, longitude, placeName } ={}) => {
        if(error){
            return res.send({
                error:error
            });
        }
        // otherwise return forecast
        forecast(latitude,longitude,(error,forecastData) =>{
            // return error if no forecast found
            if(error){
                return res.send({
                    error: error
                });
            }
             res.send({
                forecast: forecastData,
                location: placeName,
                address:req.query.address
            })
        })

    })
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        });
    }
    res.send({
        products: []
    })
})

app.get("/about",(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Jordan Handy"
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Jordan Handy"
    });
})
app.get('/help/*',(req,res) =>{
    res.render('404',{
        error:"help article not found"
    });

})
app.get('*',(req,res)=>{
    res.render('404',{
        error:"This page could not be found"
    });
});

// Listener
app.listen(PORT,(req,res)=>{
    console.log(`Listening on port ${PORT}`);
});