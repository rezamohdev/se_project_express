const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cors = require("cors");
const { errors } = require('celebrate');

const { ERROR_404 } = require('./utils/errors')
const routes = require('./routes');
const { login, createUser } = require('./controllers/users');
const { errorHandler } = require('./middlewares/error-handler');
const { validateUserInfoBody, validateUserLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');


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
app.use(helmet());
app.get('/crash-test', () => {
    setTimeout(() => {
        throw new Error('Server will crash now');
    }, 0);
});

app.use(requestLogger);
app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUserInfoBody, createUser);
app.use(routes);

app.use(errorLogger); // enabling the error logger
app.use(errors());

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`App started on port: ${PORT}`);
})