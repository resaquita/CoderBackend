const express = require('express')
const path = require('path')

const PORT = 8080

const app = express();

const { Contenedor } = require('./classContenedor')

const  texto  = new Contenedor("products.json");

app.set('views', './views');
app.set('view engine', 'ejs');

//Middlewares
app.use(express.json());
app.use(express.urlencoded())
app.use(express.static('public'))

app.get('/', (req, res)=>{
    texto.getAll().then(result =>{
        return (
           res.render('index', { products: result})
        )
    })  
})
app.get('/productos', (req, res)=>{
    texto.getAll().then(result =>{
        return (
           res.render('productos', { products: result})
        )
    })  
})
app.post('/productos', (req,res)=>{
    texto.save(req.body);
    res.redirect('/productos')
})

app.listen(PORT, ()=>console.log("Ready on port => ",PORT));