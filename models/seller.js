const { get } = require("express/lib/response");
const mongodb = require("mongodb");
const getdb = require("../utils/database").getDb;
module.exports = class Seller {
    constructor(email, password, type, catalog) {
        this.email = email;

        this.password = password;

        this.type = type;

        this.catalog = [];
    }

    createSeller() {
        const db = getdb();
        return db
            .collection("User")
            .findOne({ email: this.email })
            .then((user) => {
                if (user) {
                    console.log("user_Already_Exsist");
                    return user;
                }
                return db
                    .collection("User")
                    .insertOne(this)
                    .then((result) => {
                        // console.log(result);

                        return {...result };
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    static createCatalog(id, newCatalogProducts) {
        const db = getdb();
        return db.collection("User")

        .findOne({ _id: new mongodb.ObjectId(id) })

        .then((seller) => {
            let updatedCatalog = [...seller.catalog];

            let prevCatlog = [...seller.catalog];
            console.log();

            if (prevCatlog.length > 0) {
                console.log("length ", prevCatlog.length);

                newCatalogProducts.forEach(product => {
                    let a_product = updatedCatalog.find((ele) => {
                        return product.name === ele.name
                    })

                    if (!a_product) {
                        updatedCatalog.push(product)

                    }
                    console.log(updatedCatalog);





                });
            } else {
                console.log("length : 0");
                updatedCatalog = [...newCatalogProducts]
            }






            return db.collection("User").updateOne({ _id: new mongodb.ObjectId(id) }, {
                $set: {
                    catalog: updatedCatalog
                }

            }).then((result) => {
                console.log(result);
                return result;

            }).catch((err) => { console.log(err); });

        });
    }

    static getOrders(id) {
        const db = getdb();
        return db.collection('User').findOne({ _id: new mongodb.ObjectId(id) }).then((seller) => {
            return seller.orders;

        })
    }
};