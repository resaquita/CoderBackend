const FirebaseContainer = require("../../containers/firebase.container");

const collection = "carts";

class CartsFirebaseDao extends FirebaseContainer {

    constructor(){
        super(collection);
    }

    async save(items){
        const newCart = {
            timestamp: Date.now(),
            products: [{...items}]
        }
        const docRef = this.query.doc();
        return await docRef.set(newCart);
    }
    
    async addProductToCart(cartId, product){
        const cart = await this.getById(cartId);
        if (!cart){
            const message = `Cart with id ${cartId} doesn't exist`
            throw new HttpError(HTTP_STATUS.NOT_FOUND, message)
        }
        
        try{
            await cart.products.push(product);
            this.update(cartId,cart);
            return cart;
        
        }
        catch(error){
            console.log(error.message)
        }
        
    }
}

module.exports = CartsFirebaseDao