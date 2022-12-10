const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		cartItems: [
			{
				product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
				quantity: { type: Number, default: 1 },
				price: { type: Number },
				colors: { type: Array },
				sizes: { type: Array },
				sellerId: { type: String },
				date: {
					type: Date,
					default: new Date()
				},
				name:{type:String}
				// total:{type:Number}
			}
		]
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);
