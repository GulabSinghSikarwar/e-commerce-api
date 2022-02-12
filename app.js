const express = require('express')
const app = express();


const MongoConnect = require('./utils/database').mongoConnect

const bodyParser = require('body-parser');

// routes import 
const register = require('./routes/register');
const login = require('./routes/login')

const buyer = require('./routes/Buyers')
const seller = require('./routes/Seller')




const session = require("express-session");

const mongodbStore = require("connect-mongodb-session")(session);






const URI = "mongodb://127.0.0.1:27017/Unity_user_sessions";

const store = new mongodbStore({
    uri: URI,
    collection: "sessions"
})

app.use(
    session({
        secret: "my session-session ",
        resave: false,
        saveUninitialized: false,
        store: store,




    })


);





app.use(bodyParser.json())

// Auth API 
app.use(register)
app.use(login)

//  API's for Buyers ---> All buyers Request will be handeled 

app.use(buyer);

//  API's for Sellers ---> All Sellers Request will be handeled 
app.use(seller);








MongoConnect(() => {

    app.listen('3000');
})