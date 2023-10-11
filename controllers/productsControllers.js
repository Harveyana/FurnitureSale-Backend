const product = require('../models/products')

module.exports ={
    createProduct: async(req,res)=>{
        
        try {
            const newProduct = new product(req.body);
            await newProduct.save();
            res.status(200).json('product created successfully')
        } catch (error) {
            res.status(500).json('failed to create product')

        }
    },

    getAllproducts: async(req,res)=>{
        try {
            const products = await product.find().sort({createdAt: -1})
            res.status(200).json(products)
        } catch (error) {
            res.status(500).json('failed to get products')

        }
    },

    getProduct: async(req,res)=>{
        try {
            const product = await product.findbyId(req.params.id)
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json('failed to get product')
        }
    },

    searchProduct: async(req,res)=>{
        try {
            const result = await product.aggregate(
                [
                    {
                      $search: {
                        index: "Furniture",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json('failed to get products')
        }
    }
}