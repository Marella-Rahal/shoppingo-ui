const mongoose = require('mongoose');

const Shcema = mongoose.Schema;

const paymentShcema = new Shcema({
	name: {
		type: String,
		required: true
	},
	value: {
		type: Number,
		required: true
	},
	type: {
		type: String,
	
	},
	date: {
		type: String,
		required: true
	},
	fromShoppingo: {
		type: Boolean,
		default: false
	},
	fashionType: {
		type: String
	},
	sellerId: {
		type: String
	}
});
module.exports = mongoose.model('Payment', paymentShcema);
