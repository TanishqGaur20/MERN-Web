const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
require('./DB/conn');

app.use(express.json());

// const User = require('./model/userSchema');

//link routerr files here
app.use(require('./router/auth'));
const PORT = process.env.PORT;

const middleware = (req, res, next) => {
    console.log('Middleware');
    next();
}


app.get('/', (req, res) => {
    res.send('Hello Tanishq Gaur');
})
app.get('/about', middleware, (req, res) => {
    res.send('About');
})
app.get('/contact', (req, res) => {
    res.send('Contact');
})
app.get('/signin', (req, res) => {
    res.send('Signin');
})
app.get('/signup', (req, res) => {
    res.send('Signup');
})

app.listen(PORT, () => {
    console.log(`Connected to server on ${PORT} Port`);
})