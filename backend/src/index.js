const express = require('express');

const controllers = require('./controllers');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', controllers)

app.listen(3333);
