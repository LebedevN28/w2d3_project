const express = require('express');

const app = express();

const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const accountRouter = require('./routes/accountRouter');
const tokensRouter = require('./routes/tokensRouter');
const initiativeRouter = require('./routes/initiativeRouter');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/account/', accountRouter);
app.use('/api/tokens/', tokensRouter);
app.use('/api/initiatives', initiativeRouter);

module.exports = app;
