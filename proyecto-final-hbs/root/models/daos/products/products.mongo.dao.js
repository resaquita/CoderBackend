const { Schema } = require("mongoose");
const MongoContainer = require("../../containers/mongo.container");

const collection = "products"
const usersSchema = new Schema({
    id: { type: Schema.Types.ObjectId },
    title: {type: String},
    description: {type: String},
    price: {type: Number, min: 0},
    image: {type: String},
    stock: {type: Number, min: 0},
    
})

class ProductsMongoDao extends MongoContainer {

    constructor(){
        super(collection, usersSchema)
    }

}

module.exports = ProductsMongoDao;