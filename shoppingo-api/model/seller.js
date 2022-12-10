const mongoose = require('mongoose');

const Shcema = mongoose.Schema;

const sellerShcema = new Shcema(
	{
		nameShop: {
			type: String,
			require: true
		},
		emailShop: {
			type: String,
			require: true
		},
		Phone: {
			type: Number,
			require: true
		},
		address: {
			type: String,
			require: true
		},
		infoUser: {
			type: Shcema.Types.ObjectId,
			ref: 'User'
		},
		lat: {
			type: String,
			default: 0
		},
		log: {
			type: String,
			default: 0
		},
		numOfProductsells: {
			type: Number,
			default: 0
		},
		totalIncomeShop: {
			type: Number,
			default: 0
		},
		sellerProducts: [
			{
				type: Shcema.Types.ObjectId,
				ref: 'Product'
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('Seller', sellerShcema);
