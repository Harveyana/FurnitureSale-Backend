const router = require('express').Router();
const productControllers = require('../controllers/productsControllers')

router.get('/', productControllers.getAllproducts)
router.get('/:id', productControllers.getProduct)
router.get('/search/:key', productControllers.searchProduct)
router.post('/', productControllers.createProduct)

module.exports = router