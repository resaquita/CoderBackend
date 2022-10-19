module.exports = {
   mariaDb: {
       client: 'mysql',
       connection: {
           host: '127.0.0.1',
           port: 3306,
           user: 'root',
           database: 'productos'
       }
   },
   sqlite3:{
    client: 'sqlite3',
    connection: {
        filename: './db/ecommerce.sqlite'
    },
    useNullAsDefault: true,
   }
}