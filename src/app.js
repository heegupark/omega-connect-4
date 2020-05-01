const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

let sitename = 'heegu.net'
let name = 'Omegathrone'
let email = 'omegathrone@omegathrone.com'
let subtitle = 'Omegathrone makes'

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    sitename,
    title: 'omega connect 4',
    name,
    subtitle,
    selectHome: 'selected'
  })
})

app.get('/game', (req, res) => {
  res.render('game', {
    sitename,
    title: 'game',
    name,
    subtitle,
    selectGame: 'selected'
  })
})

app.get('/portfolio', (req, res) => {
  res.render('portfolio', {
    sitename,
    title: 'portfolio',
    name,
    subtitle,
    selectPortfolio: 'selected'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    sitename,
    title: 'about',
    name,
    email,
    subtitle,
    publicDirectoryPath,
    selectAbout: 'selected'
  })
})

app.get('/contact', (req, res) => {
  res.render('contact', {
    sitename,
    title: 'contact',
    name,
    email,
    subtitle,
    selectContact: 'selected'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    sitename,
    title: 'Error 404',
    name: name,
    errorMessage: 'Page not found.',
    subtitle
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
