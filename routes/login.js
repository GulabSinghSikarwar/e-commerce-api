const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.post('/api/auth/login', (req, resp, next) => {


    const email = req.body.email;

    const password = req.body.password;
    const user = new User(email, password)
    user.login().then((result) => {
        req.session.isLoggedIn = true;
        req.session.user = result;
        console.log(" req.session.user : ", req.session.user);


        resp.status(200).json({ user: result })



    }).catch((err) => { console.log(err); })



})

module.exports = router;