const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, deleteProduct, getAllProducts } = require('../Controller/Product');

router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/products', getAllProducts);

module.exports = router;
