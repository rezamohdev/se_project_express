const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');
const { PORT = 3001 } = process.env;
const app = express();
const routes = require('./routes');
app.use(routes);
app.listen(PORT, () => {
    console.log('App started on port: ' + PORT);
})