const express = require('express');
const router = express.Router();

const Buyer = require('../models/buyer');

router.get('/api/buyer/list-of-sellers', (req, resp, next) => {

    Buyer.list_of_sellers().then((sellers) => {

        resp.status(200).json(sellers)
    })

})
router.get('/api/buyer/seller-catalog/:seller_id', (req, resp, next) => {

})


module.exports = router;