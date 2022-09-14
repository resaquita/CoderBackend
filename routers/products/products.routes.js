const express = require('express');

const {Contenedor} = require('../../claseContenedor')

const texto = new Contenedor("productos.json");

const router = express.Router();

router.get('/', (req,res)=>{
    texto.getAll().then(result =>{
         return (
            res.json(result)
         )
     })  
})

router.get('/:id', (req,res)=>{
    const { id } = req.params;
    texto.getAll().then(result =>{
        const product = result.find(product => product.id === +id);
        if (!product) {
            return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
          }
          return res.json({ success: true, result: product });
        
     })  
})


router.post('/', (req, res) => {
    const { name, description, price, image } = req.body;
    console.log(req.body);
    
    if ( !name || !description || !price || !image) {
      return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    const newProduct = {
      name,
      description,
      price: +(price),
      image
    };
    texto.save(newProduct).then(result =>{
         return res.json({ success: true, result: newProduct });
     })  
  });


  router.put('/:productId', (req, res) => {
    const { params: { productId }, body: { name, description, price, image} } = req;
    if ( !name || !description || !price || !image) {
      return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    texto.getBtId(productId).then(result =>{
        if(!result){
            return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!`})
        }

    })
    //const productIndex = products.findIndex((product) => product.id === +productId);
    const newProduct = {
      name,
       description,
       price,
       image,
       id: +productId
     };
     texto.edit(newProduct).then(result =>{
        return res.json({ success: true, result: newProduct });
    }) 
     
  });


router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    texto.deleteById(+id).then(result =>{
        if (!result) {
            return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!`});
          }
         return (
            console.log(`product correctly eliminated`)
         )
     })  
})

module.exports = router;