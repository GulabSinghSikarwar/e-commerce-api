const express = require('express');
const router = express.Router();
const Seller = require('../models/seller')

router.post('/api/seller/:sellerId/catalog', (req, resp, next) => {
    const id = req.params.sellerId;

    const products = req.body;

    console.log(products);
    Seller.createCatalog(id, products).then((result) => {
        resp.status(201).json(result)

    }).catch((err) => { console.log(err); })







})

module.exports = router