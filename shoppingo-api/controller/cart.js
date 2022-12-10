const Payment = require('../model/payment');
const PaymentReq = require('../model/paymentReq');
const User = require('../model/user');
const { validationResult } = require('express-validator');
const payment = require('../model/payment');
const { all } = require('../routes/managment');
const { default: mongoose } = require('mongoose');
const Seller = require('../model/seller.js');
const Product = require('../model/product.js');
const Cart = require('../model/cart.js');
const equals = (a, b) =>
a.length === b.length &&
a.every((v, i) => v === b[i]);
exports.addItemToCart = async (req, res, next) => {
	Cart.findOne({ user: req.userId }).exec((error, cart) => {
		if (error) return res.status(400).json({ error });
		if (cart) {
			bool = true;
			//if cart already exists then update cart by quantity
			
			cart.cartItems.forEach((cartItem) => {
				const product = req.body.cartItems[0].product;
				const item = cartItem.product == product;
				// console.log(cartItem.colors,req.body.cartItems[0].colors)
				const colors=equals(cartItem.colors, req.body.cartItems[0].colors);
				const sizes=equals(cartItem.sizes , req.body.cartItems[0].sizes);
				const name=cartItem.name === req.body.cartItems[0].name;
				// console.log(item,colors,sizes)

				//
				let condition, update;
				if (item&&sizes&&colors&&name) {
					cartItem.quantity = +cartItem.quantity + +req.body.cartItems[0].quantity;
					// cartItem.total = (+cartItem.quantity)*(+cartItem.price) ;
					

					cart.save();
					res.json('updating');
					bool = false;
				}
			});
			
			if (bool) {
				// console.log("ooo")
				Cart.findOneAndUpdate(
					
					{ user: req.userId },
					{
						$push: {
							cartItems: {
								product: mongoose.Types.ObjectId(req.body.cartItems[0].product),
								quantity: req.body.cartItems[0].quantity,
								price: +req.body.cartItems[0].price,
								colors: req.body.cartItems[0].colors,
								sizes: req.body.cartItems[0].sizes,
								sellerId: req.body.cartItems[0].sellerId,
								name:req.body.cartItems[0].name,
							}
						}
					}
				).then((cart) => {
					res.json(cart);
				});
				// res.json(cart);
			}
		} else {
			//if cart not exist then create a new cart
			const cart = new Cart({
				user: req.userId,
				cartItems: req.body.cartItems
			});
			cart.save((error, cart) => {
				if (error) return res.status(400).json({ error });
				if (cart) {
					return res.status(201).json({ cart });
				}
			});
		}
	});
};

exports.getCart = (req, res, next) => {
	Cart.findOne({ user: req.userId })
		.populate('cartItems.product', '_id description productImage')
		.exec((error, cart) => {
			if (!cart) return res.status(422).json({ message: 'cart is empty' });
			if (cart) {
				 i=0;
				let cartItems =[];
				cart.cartItems.forEach((item, index) => {
					// console.log(item.product.name)
					cartItems[i++] = {
						_id: item.product._id.toString(),
						name: item.name,
						img: item.product.productImage,
						qty: item.quantity,
						color: item.colors,
						size: item.sizes,
						price:item.price,
						id: item._id
					};
				});
				res.status(200).json({ cartItems });
			}
		});
	//}
};

exports.removeCartItems = (req, res, next) => {
	const productId = req.body.id;
	//
	if (productId) {
		Cart.findOneAndUpdate(
			{ user: req.userId },
			{
				$pull: {
					cartItems: {
						_id : productId
					}
				}
			}
		).exec((error, result) => {
			if (error) return res.status(400).json({ error });
			if (result) {
				res.status(202).json("deleting");
			}
		});
	}
};

exports.addCartToPayments = async (req, res, next) => {
	Cart.findOne({ user: req.userId })
		.then((cart) => {
			if (!cart) {
				return res.status(400).json({ message: 'mafi cart' });
			}
			if (cart.cartItems.length !== 0) {
				cart.cartItems.forEach(async (item) => {
					// console.log(item)
					const productId = item.product.toString();
					Product.findById(productId)
						.then((product) => {
							const user = req.userr;
							if (item.price > user.totalBalance) {
								console.log('i am inside if (+item.newPrice > +user.totalBalance  ');
								const error = new Error(
									'you cant make payment the cost of it more than the total Balance'
								);
								error.statusCode = 422;
								throw error;
							}
							const sellerId = item.sellerId.toString();
							// console.log(item.price)
							// console.log(typeof(item.price))
							// console.log(item.quantity)
							// console.log(typeof(item.quantity))
							const payment = new Payment({
								name: 'fashion from shoppingoooooooooo',
								fromShoppingo: true,
								type: 'clothes',
								value: +item.price * +item.quantity,
								fashionType: product.categ,
								date: new Date(),
								sellerId: sellerId
							});
							payment.save();
							// *****************************
							// console.log(product.shops)
							let s;
							// console.log(productId)
							Product.findById(productId).then((p) => {
								p.shops.forEach(async (shop) => {
									// console.log(1)
									c = +shop.quantity;
									if (shop.sellerId == sellerId) {
										console.log(item.quantity, ' ', shop.quantity);
										c = c - +item.quantity;
										shop.quantity = c;
										// shop.sellerId=1
										s = c;
										//  p.save()
										//  shop.save()
										p.save();
										// console.log(shop.quantity)
									}
								});
							});
							Product.updateOne(
								{ 'items.sellerId': sellerId },
								{
									$set: {
										'items.$.quantity': 30
									}
								},
								function(err) {
									console.log();
								}
							);

							Seller.findById(sellerId).then((seller) => {
								seller.numOfProductsells += item.quantity;
								seller.totalIncomeShop += payment.value;
								seller.save();
							});
							// console.log("2")

							User.findById(req.userId).then((user) => {
								user.payments.push(payment._id);
								user.totalBalance -= payment.value;
								user.totalPayments += payment.value;
								user.save();
							});
						})
						.catch((error) => {
							error.statusCode = 422;
							throw error;
						});
				});

				//if every thing true find way to check that and  do this
				// *************************
				Cart.deleteOne({ user: req.userId }).then(async (result) => {
					const user = await User.findById(req.userId);
					res.json({ user });
				});
				// *************************
			} else {
				res.json({ message: 'cart is empty' });
			}
		})
		.catch((error) => {
			error.statusCode = 422;
			throw error;
		});
};
exports.updateQuantity=async(req,res,next)=>{
	Cart.findOne({ user: req.userId  }).exec((error, cart) => {
		if (error) return res.status(400).json({ error });
		if (cart) {
			// console.log(cart)
			cart.cartItems.forEach((cartItem) => {
				const product = req.body.product;
				const item = cartItem._id == product;
			
				if (item) {
					cartItem.quantity = +req.body.quantity;
					cart.save();
					res.json('updating');
					bool = false;
				}
			});
		}});}
			
	


