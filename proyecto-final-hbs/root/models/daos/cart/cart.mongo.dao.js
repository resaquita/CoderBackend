const { Schema } = require("mongoose");
const MongoContainer = require("../../containers/mongo.container");

const collection = "carts"
const cartsSchema = new Schema({
    id: { type: Schema.Types.ObjectId },
    timestamp: {type: Date, default: Date.now},
    products: {type: Array}
})

class CartMongoDao extends MongoContainer {

    constructor(){
        super(collection, cartsSchema)
    }

    async addProductToCart(cartId, product) {
        try{
           const updatedCart = await this.model.findByIdAndUpdate(
                cartId, 
                { $push: {
                    products: product}
                }
            )
            return updatedCart
        }
        catch(error){
            console.log(error.message)
        }
      }
    
      async save(){
        try{
            const newDocument = new this.model();
            return await newDocument.save();
        }
        catch(error){
            console.log(error.message)
        }
    }
}

module.exports = CartMongoDao