const express = require('express');

const path = require('path');

const apiRoutes = require('./routers/app.routers')

const app = express()

const PORT = process.env.PORT || 8080

//Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//Routes

app.use('/api', apiRoutes)



app.get('*', (req, res) => {
    res.status(404).send('<h1> Page does not exist</h1>')
})

const connectedServer = app.listen(PORT, () => {
    console.log(`server is up an running on port ${PORT}`)
})

connectedServer.on('error', (error) =>{
    console.log(error.message)
})