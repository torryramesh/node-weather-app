const express = require('express')
const path = require('path')
const hbs = require('hbs') //init handlebar 
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//initialize the web server
const app = express()

// define path to configure express
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set up handlebars engine and set the view and partials locations 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// set express with path to serve static content
app.use(express.static(publicDirectoryPath))



app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather Forecast',
        name : 'Ramesh Balu'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Me...',
        name : 'Ramesh Balu'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        helpText: 'This Help Page is all about NodeJS...',
        title: "Help",
        name: 'Ramesh Balu'
    })
})



app.get('/weather', (req,res) =>{
    const address = req.query.address
    if (!address){
        return res.send({
            error: 'no address found in query string'
        })
    }else{
        geocode(address, (error, {latitude,longitude,place} ={} ) => {
            console.log('error = ', error)
            if (error){
              res.send(error)
            }else{
                forecast(latitude, longitude,(error, wdata) =>{
                    console.log('lat = '+latitude+'long =', longitude )
                  if(error){
                    return res.send(error)
                  }
                  res.send({
                    forecast : wdata,
                    location : place,
                    
                })
                 
                })
      
            } 
        })
    }
})


app.get('/help/*', (req,res) =>{
    res.render('error',{
        errorMessage: 'No help page available for this topic',
        title:'404',
        name: 'Ramesh Balu'
    })
})

app.get('*', (req,res) =>{
    res.render('error',{
        errorMessage : 'Page not found.',
        title:'404',
        name: 'Ramesh Balu'
    })
})

app.listen(3000, () => {
    console.log("Server ready for e-business")
})