const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.post('/api/auth/login', (req, resp, next) => {
    const email = req.body.email;

    const password = req.body.password;
    const user = new User(email, password)
    user.login().then((user) => {
        resp.status(200).json({ user: user })



    }).catch((err) => { console.log(err); })



})

module.exports = router;