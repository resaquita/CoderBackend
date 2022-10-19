
const dbConfig = require('./db/config')

const { Contenedor } = require('./classContenedor');

const dbMaria = new Contenedor(dbConfig.mariaDb);

const dbSqlite3 = new Contenedor(dbConfig.sqlite3)

const productos = [
    {
        title: "reloj",
        price: 120,
        image: "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-256.png",
    },
    {
        title: "avion de papel",
        price: 120,
        image: "https://cdn3.iconfinder.com/data/icons/education-209/64/plane-paper-toy-science-school-256.png",
    },
    {
        title: "manzana",
        price: 120,
        image: "https://cdn3.iconfinder.com/data/icons/education-209/64/apple-fruit-science-school-256.png",
    },
    {
        title: "cuaderno",
        price: "80",
        image: "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-256.png",
    },
    {
        title: "cuaderno rojo",
        price: "123",
        image: "https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-256.png",
    }
];

const mensajes = [
    {
        email: "usuario@gmail.com",
        text: "hola",
        date: "03-10-2022 20:47:52"
    }
];

// (async () => {
//     try{
//             dbMaria.insertRecords("productos", productos);
            
//             const tabla = await dbMaria.getRecords("productos");
//             console.table(tabla);
//         }
//         catch(error){
//             console.log(error);
//         }
//         finally{
//             dbMaria.disconnect();
//         };
//     })();
    
    (async () => {
        try{
                 const tabla = await dbSqlite3.getMensajes("mensajes");
                 console.table(tabla);
            }
            catch(error){
                console.log(error);
            }
            finally{
                dbSqlite3.disconnect();
            };
        })();
