const { get } = require('express/lib/response');

const getdb = require('../utils/database').getDb
module.exports = class {
    constructor(email, password) {
        this.email = email;

        this.password = password;


    }
    login() {
        const email = this.email;

        const password = this.password;

        const db = getdb();
        return db.collection('User').findOne({ email: email }).then((user) => {
            if (!user) {
                return null;
            } else {
                if (password === user.password) {
                    return user
                } else {
                    return null;

                }
            }
        }).catch((err) => { console.log(err); })






    }
}