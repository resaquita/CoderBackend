const express = require('express')

const {Contenedor} = require('./index')

const texto = new Contenedor("productos.json");

// const todo = texto.getAll().then(result =>{
//          return result
//       })

const PORT = process.env.PORT || 8080

const app = express()


app.get('/', (req, res)=>{
    res.send('pagina de inicio')   
})

app.get('/productos', (req,res)=>{
    texto.getAll().then(result =>{
        array = JSON.stringify(result)
         return (
            res.send(`${array}`)
         )
     })
    
})



app.get('/productoRandom', (req,res)=>{
    texto.getRandom().then(result =>{
        array = JSON.stringify(result)
         return (
            res.send(`${array}`)
         )
     })
})

app.get('*', (req, res) => {
    res.status(404).send('<h1> Page does not exist </h1>')
})

const connectedServer = app.listen(PORT, () => {
    console.log(`server is up an running on port ${PORT}`)
})

connectedServer.on('error', (error) =>{
    console.log(error.message)
})