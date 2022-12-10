const mongoose = require('mongoose');

const Shcema = mongoose.Schema;
const reviewSchema = mongoose.Schema(
	{
	  name: { type: String, required: true },
	  rating: { type: Number, required: true },
	  comment: { type: String, required: true },
	  user: {
	   type: mongoose.Schema.Types.ObjectId,
	   required: true,
	   ref: 'User',
			 },
	 },
	{
	  timestamps: true,
	}
  )

const productShcema = new Shcema({
	categ: {
		type: String,
		required: true
	},
	gender: {
		type: String,
		required: true
	},
	
	percent: {
		type: Number,
		default: 0
	},

	fabricType: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	
	productImage: {
		type: String,
		required: true
	},
	shops: [{
		nameShop: String,
			lat:String,
			log: String,
			colors: Array,
			sizes:Array,
			oldPrice:Number,
			newPrice: Number,
			sellerId:String,
			quantity:Number
		
	}],
	reviews: [reviewSchema],
	rating: {
	  type: Number,
	  default: 0,
	},
	numReviews: {
	  type: Number,
	  default: 0,
	},
	Brand: {
		type: String,
		required: true
	},
	numOfModel: {
		type: String,
		required: true
	}
});
module.exports = mongoose.model('Product', productShcema);
