const path = require('path')
const express = require('express')
const hbs = require('hbs')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const app = express()
const publicRouters = require('./routers/public/public')
const userRouters = require('./routers/private/user')
const adminRouter = require('./routers/private/admin')


const port = process.env.PORT

// Define Path for Expore Configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialPath = path.join(__dirname, '../template/partials')
const cssDirectory = path.join(__dirname, '../public/css')

// Set Up handbars Engine and views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirectoryPath))

//app.use('/admin', express.static('css'))
hbs.registerPartials(partialPath)

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser('secret'))
app.use(session({ cookie: { maxAge: 3600 } }))

// flash message middleware
app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

// Router Middleware
app.use(publicRouters)
app.use(adminRouter)
app.use(userRouters)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})