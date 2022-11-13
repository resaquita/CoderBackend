const {Router} = require('express');

const cartsController = require('../../controllers/carts.controller')

const router = Router();

router.get('/', cartsController.getCarts);  
router.get('/:id', cartsController.getCartById);  
router.post('/', cartsController.saveCart);  
router.post('/:id', cartsController.addProduct);  
router.delete('/:id', cartsController.deleteById);  


module.exports = router;
