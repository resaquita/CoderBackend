const express = require('express');
const errorMiddleware = require('./middleware/error.middleware')
const apiRoutes = require('./routers/app.routers')
const path = require('path')


const { engine } = require('express-handlebars')



const app = express();

//HBS

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))

app.set('views', './views');
app.set('view engine', 'hbs');


//Middle ware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//Routes
app.use('/api', apiRoutes);

app.use(errorMiddleware);

module.exports = app;

