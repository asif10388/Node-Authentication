const express = require('express');
const authRoute = require('./routes/auth');
const profileRoute = require('./routes/profile');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const path = require('path');


const app = express();

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser: true, useUnifiedTopology: true },() => {
    console.log("CONNECTED TO DB");
});
app.use(express.json());
app.use('/api/user', authRoute);
app.use('/api/profile', profileRoute);

app.use(express.static('public'));

app.listen(3000, () => {
    console.log("Server Up")
})