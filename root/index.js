const express = require('express')
const path = require('path')
const { engine } = require('express-handlebars')
const {date} = require('./utils/utils')



const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');

const PORT = process.env.PORT || 8080 
const app = express();
const httpServer = new HttpServer(app);

httpServer.listen(PORT, ()=>console.log("Ready on port => ",PORT));

const io = new SocketServer(httpServer);

const { Contenedor } = require('./classContenedor')
const  texto  = new Contenedor("products.json");
const msgs = new Contenedor("messages.json")


app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.set('views', './views');
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded())
app.use(express.static('public'))


io.on('connection', (socket) => {
     texto.getAll().then(result =>{
         socket.emit('products',result)
     })  
     msgs.getAll().then(result =>{
        socket.emit('messages',result)
    })  

    socket.on("send-msg", (data) =>{
        data.date = date;
        msgs.saveMsg(data).then(()=>{
            msgs.getAll().then(result =>{
                io.emit('messages',result)
            })  
        });
    })

     socket.on('productAdded', (data)=>{
        texto.save(data).then(()=>{
            texto.getAll().then(result =>{
                io.emit('products',result)
            }) 
        })
     })
})


app.get('/', (req, res)=>{
    res.render('main')
})

// app.post('/', (req,res,next)=>{
//     texto.save(req.body);
//     next
// })

// app.post('/msg', (req,res,next) =>{
//     let object = req.body
//     object.date = date
//     msgs.save(object)
//     next
// })
