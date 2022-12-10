const mongoose = require('mongoose');

const Shcema = mongoose.Schema;

const paymentReqShcema = new Shcema({
	name: {
		type: String,
		required: true
	},
	value: {
		type: Number,
		required: true
	},
	remaining: {
		type: Number,
		default: 0
	},
	type:{
		type:String,
		required:true
	},
	paided: {
		type: Number,
		default: 0
	},
	date: {
		type: String,
		required: true
	},
	isRepeater: {
		type: Number,
		required: true
	},
	numOfMonthRepeater: {
		type: Number,
		default: 0
	},
	everyPaidValueRepeater: {
		type: String ,
		default: 0,
	},
	paymentuntilnow:{
		type:Number,
		default:0
	},
	almotabaki:{
		type:Number,
		default:0
	},
	typeMessage:{
		type:String,
		default:""
	},
	Ispaied:{
		type:Number
	}

});
module.exports = mongoose.model('PaymentReq', paymentReqShcema);
