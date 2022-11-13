const envConfig = require('../../utils/config');

let ProductsDao;
let CartsDao;

switch(envConfig.DATASOURCE){
    case 'mongo':
        ProductsDao = require('../daos/products/products.mongo.dao');
        CartsDao = require('../daos/cart/cart.mongo.dao');
        break;
    case 'firebase':
        ProductsDao = require('../daos/products/products.firebase.dao');
        CartsDao = require('./cart/cart.firebase.dao')
        break;
    case 'memory':
        ProductsDao = require('../daos/products/products.mem.dao');
        CartsDao = require('./cart/cart.mem.dao')
        break;
    default:
        throw new Error("Invalid Datasource");
}

module.exports = {ProductsDao, CartsDao}