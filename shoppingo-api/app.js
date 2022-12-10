require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth');
const managmentRoute = require('./routes/managment');
const cartRoute = require('./routes/cart');
const shopRoute = require('./routes/shop');
const profileRoute = require('./routes/profile');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

app.use(bodyParser.json());
app.use(
	bodyParser.json({
		limit: '50mb'
	})
);

app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		extended: true
	})
);
app.use('/uploads', express.static('uploads'));
app.use('/profiles', express.static('profiles'));


app.use('/auth', authRoute);

app.use((error, req, res, next) => {
	console.log(error);
	const status = error.statusCode || 500;
	const message = error.message;
	res.status(status).json({ message: message });
});

app.use('/managment', managmentRoute);
app.use('/shop', shopRoute);
app.use('/', profileRoute);
app.use('/cart', cartRoute);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log(process.env.MONGODB_URI);
	app.listen(process.env.PORT, () => {
		console.log(`you are stupied ${process.env.PORT} `);
	});
});
