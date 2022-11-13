const HTTP_STATUS = require('../constants/api.constants');
const {CartsDao} = require('../models/daos/app.daos');
const { successResponse } = require('../utils/api.utils');

const cartsDao = new CartsDao();

class CartsController {
    async getCarts (req, res, next) {
        try{
            const carts = await cartsDao.getAll();
            const response = successResponse(carts);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch(error){
            next(error)
        }
    }
    async getCartById (req, res, next) {
        const {id} = req.params;
        try{
            const cart = await cartsDao.getById(id);
            const response = successResponse(cart);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch(error){
            next(error)
        }
    }
    async saveCart (req, res, next) {
        try{
            const newCart = await cartsDao.save(req.body);
            const response = successResponse(newCart);
            res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch(error){
            next(error)
        }
    }

    async addProduct (req, res, next) {
        const {id} = req.params
        const product = req.body
        
        try{
            const newCart = await cartsDao.addProductToCart(id, product);
            const response = successResponse(newCart);
            res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch(error){
            next(error)
        }
    }

    // async updateProduct (req, res, next) {
    //     const {id} = req.params;
    //     try{
    //         const updatedProduct = await cartsDao.update(id, req.body);
    //         const response = successResponse(updatedProduct);
    //         res.status(HTTP_STATUS.OK).json(response);
    //     }
    //     catch{
    //         next(error)
    //     }
    // }

    async deleteById (req, res, next) {
        const {id} = req.params;
        try{
            const deletedUser = await cartsDao.delete(id);
            const response = successResponse(deletedUser);
            res.status(HTTP_STATUS.OK).json(response);

        }
        catch(error){
            next(error)
        }
    }
}

module.exports = new CartsController();