const getdb = require("../utils/database").getDb;
const mongodb = require('mongodb')
module.exports = class Buyer {
    constructor(email, password, type) {
        this.email = email;

        this.password = password;

        this.type = type;
    }
    create_Buyer() {
        const db = getdb();
        return db
            .collection("User")
            .findOne({ email: this.email })
            .then((user) => {
                if (user) {
                    console.log("user_Already_Exsist");
                    return;
                }
                db.collection("User")
                    .insertOne(this)
                    .then((result) => {
                        return result;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }
    static list_of_sellers() {
        const db = getdb();

        let sellers = [];

        return db.collection("User")
            .find()
            .toArray()
            .then((users) => {
                const allSellers = users.filter((user) => {
                    return user.type === "seller";

                })
                return allSellers

            })
            .catch((err) => {
                console.log(err);
            });
    }

    static get_Seller_Catalog_By_SellerId(id) {
        const db = getdb();
        return db.collection('User').findOne({ _id: new mongodb.ObjectId(id) })

        .then((seller) => {
            console.log(seller);
            return seller.catalog;

        }).catch((err) => {
            console.log(err);
        })



    }
    static create_order(buyer_id, seller_id, products_list) {
        const db = getdb();
        return db.collection('User').findOne({ _id: new mongodb.ObjectId(seller_id) }).then((seller) => {

            let seller_order = []
            if (seller.orders) {
                seller_order = [...seller.orders];

            }


            if (seller_order.length === 0) {
                return db.collection('User').updateOne({ _id: new mongodb.ObjectId(seller_id) }, {
                    $set: {
                        orders: [{
                                buyer_id: new mongodb.ObjectId(buyer_id),
                                buyer_orders: [{
                                    products: [...products_list]
                                }]

                            }

                        ]

                    }
                }).then((result) => {
                    return result;


                })
            } else {

                let buyer_order_index = seller_order.findIndex((buyerOrder) => {
                    return buyerOrder.buyer_id.toString() == buyer_id.toString()
                })
                let buyer_order_object = seller_order[buyer_order_index];

                if (!buyer_order_object) {
                    // buyer order is alredy available 
                    // and we just need to add products
                    let new_order = {
                        products: [...product_list]
                    }

                    let updated_buyer_order = {
                        buyer_id: new mongodb.ObjectId(buyer_id),
                        buyer_orders: [
                            ...buyer_order_object.buyer_orders, new_order

                        ]
                    }
                    let new_seller_orders = [seller.orders];
                    new_seller_orders[buyer_order_index] = updated_buyer_order;

                    return db.collection("User").updatedOne({ _id: new mongodb.ObjectId(seller_id) }, {
                        $set: {
                            orders: new_seller_orders

                        }
                    }).then((result) => {
                        return result;


                    }).catch((err) => {
                        console.log(err);

                    })

                } else {

                    // our no previeous order by Buyer exsist 
                    const new_seller_order = [...seller.orders];

                    let newOrder = {
                        products: [...products_list]
                    }


                    let newBuyerOrder = {
                        buyer_id: new mongodb.ObjectId(buyer_id),
                        buyer_orders: [
                            newOrder

                        ]
                    }
                    new_seller_order.push(newBuyerOrder);

                    return db.collection('User').updateOne({ _id: new mongodb.ObjectId(seller_id) }, {
                        $set: {
                            orders: new_seller_order

                        }
                    }).then((result) => {
                        return result;




                    }).catch((err) => {
                        console.log(err);

                    })


                }

            }

        })
    }

};