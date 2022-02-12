const express = require('express');
const router = express.Router();

const Buyer = require('../models/buyer');

router.get('/api/buyer/list-of-sellers', (req, resp, next) => {

    Buyer.list_of_sellers().then((sellers) => {

        resp.status(200).json(sellers)
    })

})

//  GET :  get catalog of seller of  by using seller id 

router.get('/api/buyer/seller-catalog/:seller_id', (req, resp, next) => {
    const id = req.params.seller_id;
    Buyer.get_Seller_Catalog_By_SellerId(id).then((catalog) => {

        resp.status(200).json(catalog);


    })


})
router.post('/api/buyer/create-order/:seller_id', (req, resp, next) => {
    console.log("in buyer req.session.user", req.session.user);

    let user = {...req.session.user }

    let Buyer_id = user._id.toString();
    console.log("user_id: ", Buyer_id);

    let Seller_id = req.params.seller_id.trim();
    console.log("Seller_id: ", Seller_id);

    let products = [...req.body.products];



    Buyer.create_order(Buyer_id, Seller_id, products).then((result) => {
        resp.status(201).json(result)
    }).catch((err) => {
        console.log(err);
    })


})


module.exports = router;