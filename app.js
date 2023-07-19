const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');
const { PORT = 3001 } = process.env;
const app = express();
const routes = require('./routes');
app.use(express.json());
app.use((req, res, next) => {
    req.user = {
        _id: '5d8b8592978f8bd833ca8133'// paste the _id of the test user created in the previous step
    };
    next();
});

app.use(routes);
app.all("*", (req, res) => {
    res.status(404).send({ message: "The requested resource not found" })
})
app.listen(PORT, () => {
    console.log('App started on port: ' + PORT);
})