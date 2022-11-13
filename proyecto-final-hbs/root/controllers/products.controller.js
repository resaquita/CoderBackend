const HTTP_STATUS = require('../constants/api.constants');
const {ProductsDao} = require('../models/daos/app.daos');
const { successResponse } = require('../utils/api.utils');

const productsDao = new ProductsDao();

class ProductsController {
    async getProducts (req, res, next) {
        try{
            const products = await productsDao.getAll();
            const response = successResponse(products);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch{
            next()
        }
    }
    async getProductById (req, res, next) {
        const {id} = req.params;
        try{
            const product = await productsDao.getById(id);
            const response = successResponse(product);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch{
            next()
        }
    }
    async saveProduct (req, res, next) {
        try{
            const newProduct = await productsDao.save(req.body);
            const response = successResponse(newProduct);
            res.status(HTTP_STATUS.CREATED).json(response);
        }
        catch{
            next()
        }
    }
    async updateProduct (req, res, next) {
        const {id} = req.params;
        try{
            const updatedProduct = await productsDao.update(id, req.body);
            const response = successResponse(updatedProduct);
            res.status(HTTP_STATUS.OK).json(response);
        }
        catch{
            next()
        }
    }
    async deleteById (req, res, next) {
        const {id} = req.params;
        try{
            const deletedUser = await productsDao.delete(id);
            const response = successResponse(deletedUser);
            res.status(HTTP_STATUS.OK).json(response);

        }
        catch{
            next()
        }
    }
}

module.exports = new ProductsController();