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
router.get('/api/seller/orders', (req, resp, next) => {
    console.log("req.session.user ", req.session.user);
    const user = req.session.user;
    const id = user._id.toString();

    console.log("req.session.user_id ", id);


    // const id = req.session.user._id.toString();
    Seller.getOrders(id).then((orders) => {
        console.log("output : ", orders);
        resp.status(200).json(orders);



    }).catch((err) => {
        console.log(err);

    })
})

module.exports = router