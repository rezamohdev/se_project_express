const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require("cors");
const { ERROR_404 } = require('./utils/errors')
const routes = require('./routes');
// const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const errorHandler = require('./middlewares/error-handler');



mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db');
const { PORT = 3001 } = process.env;
const app = express();
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use(cors());
app.use(helmet())
app.post('/signin', login);
app.post('/signup', createUser);
app.use(routes);
app.all("*", (req, res) => {
    res.status(ERROR_404).send({ message: "The requested resource not found" })
})


app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`App started on port: ${PORT}`);
})