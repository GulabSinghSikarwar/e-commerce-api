const express = require('express')
const app = express();


const MongoConnect = require('./utils/database').mongoConnect
const buyer = require('./routes/register')

const register = require('./routes/register');
const login = require('./routes/login')


const bodyParser = require('body-parser');


app.use(bodyParser.json())
app.use(register)

app.use(login)




MongoConnect(() => {

    app.listen('3000');
})