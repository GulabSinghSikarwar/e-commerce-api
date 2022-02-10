const getdb = require('../utils/database').getDb;

module.exports = class Buyer {

    constructor(email, password, type) {

        this.email = email;

        this.password = password;

        this.type = type;





    }
    createBuyer() {
        const db = getdb();
        return db.collection('User').findOne({ email: this.email }).then((user) => {
            if (user) {
                console.log("user_Already_Exsist");
                return;

            }
            db.collection('User').insertOne(this).then((result) => {
                return result;
            }).catch((err) => { console.log(err); })


        }).catch((err) => { console.log(err); })



    }

}