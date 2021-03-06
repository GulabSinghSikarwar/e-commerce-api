const express = require('express');
const router = express.Router();

const Seller = require('../models/seller')
const Buyer = require('../models/buyer')


router.post('/api/auth/register', (req, resp, next) => {
    console.log(req.body);

    const email = req.body.email;

    const password = req.body.password
    const type = req.body.type;
    if (type === "seller") {
        const seller = new Seller(email, password, type, null);

        seller.createSeller().then((result) => {

            console.log({ result });

            resp.status(201).json(result)



        }).catch((err) => {
            console.log(err);
        })
    } else {

        let buyer = new Buyer(email, password, type);

        buyer.create_Buyer().then((result) => {


            resp.status(201).json(result)



        }).catch((err) => {
            console.log(err);
        })
    }







})

module.exports = router;