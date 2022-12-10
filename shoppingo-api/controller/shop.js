const Payment = require('../model/payment');
const PaymentReq = require('../model/paymentReq');
const User = require('../model/user');
const { validationResult } = require('express-validator');
const payment = require('../model/payment');
const { all } = require('../routes/managment');
const { default: mongoose } = require('mongoose');
const Seller = require('../model/seller.js');
const Product = require('../model/product.js');
const fabrics = [
	'Cashmere',
	'Chenille',
	'Cotton',
	'Crêpe',
	'Georgette',
	'Gingham',
	'Leather',
	'Linen',
	'Organza',
	'Silk',
	'Velvet',
	'Twill',
	'Damask',
	'naylon'
];
const menCategories = [
	'Blazer',
	'Abayas',
	'Hoodies',
	'Jackets',
	'Pants',
	'Shirts',
	'Sets',
	'Shorts',
	'Suits',
	'T-Shirts',
	'Swimwear',
	'Vests',
	'Pajamas',
	'Bow ties',
	'Hats',
	'Scarves',
	'Ties',
	'Belts'
];
const womenCategories = [
	'Blazer',
	'Abayas',
	'dresss',
	'BodySuits',
	'Hoodies',
	'Jackets',
	'Jeans',
	'Shirts',
	'Sets',
	'Shorts',
	'Suits',
	'T_Shirts',
	'Swimwear',
	'Vests',
	'Skirts',
	'Pajamas',
	'Belts',
	'Hats',
	'Scarves',
	'Ties'
];
const mapCat1 = {};
for (let i = 0; i < womenCategories.length; i++) {
	mapCat1[womenCategories[i].toString()] = 0;
}

const mapCat = new Map();
for (let i = 0; i < womenCategories.length; i++) {
	mapCat.set(womenCategories[i].toString(), 0);
}
arrayMap = [ ...mapCat ];

exports.addProduct = async (req, res, next) => {
	//////////////////////////////////////////////////////////////////////////////////////////////
	const {
		gender,
		categ,
		price,
		percent,
		colors1,
		x,
		s,
		xl,
		m,
		l,
		xxl,
		xxxl,
		fabricType,
		quantity,
		Brand,
		numOfModel
	} = req.body;

	// console.log(typeof(colors1));
	// console.log(colors1);

	const sizes = [ s, l, x, xxl, xl, m, xxxl ];

	let colors;
	if (colors1.length > 7) {
		colors = colors1.split(',');
	} else {
		colors = [ colors1 ];
	}
	console.log(colors);
	// console.log(typeof(colors));
	// console.log(colors)

	//  newqw=colors[0];
	// colors[0]=newqw.substr(2,newqw.length-3);
	// newqw=colors[colors.length-1];
	//  colors[colors.length-1]=newqw.substr(1,newqw.length-3);
	// for(let i=1;i<colors.length-1;i++)
	// {
	// 	newqw=colors[i];
	//  colors[i]=newqw.substr(1,newqw.length-2);

	// }
	// console.log(colors)

	//check if a product already exists
	const user = await User.findById(req.userId);
	const product = await Product.find({ Brand: Brand, numOfModel: numOfModel });
	const seller = await Seller.find({ emailShop: user.email });
	// console.log(seller)
	sizes1 = sizes.filter((size) => {
		if (size) return { size: true };
		else return false;
	});
	// colors1 = colors.filter((color) => {
	// 	if (color) return { color: true };
	// 	else return false;
	// });
	if (percent) {
		oldPrice = +price;
		newPrice = +price - +price * +percent / 100;
	} else {
		oldPrice = +price;
		newPrice = +price;
	}
	// console.log(seller)
	if (product.length !== 0) {
		let x = true;
		// console.log(product[0].shops)
		product[0].shops.forEach((shop) => {
			if (shop.sellerId == seller[0]._id) {
				shop.quantity += +quantity;
				shop.colors = colors;
				shop.sizes = sizes1;

				product[0].save();
				// seller[0].sellerProducts
				x = false;
				res.json({
					message: 'product is updated',
					product: product
				});
			}
		});
		if (x) {
			product[0].shops.push({
				nameShop: seller[0].nameShop,
				lat: seller[0].lat,
				log: seller[0].log,
				colors: colors,
				sizes: sizes1,
				oldPrice: +oldPrice,
				newPrice: +newPrice,
				quantity: +quantity,
				sellerId: seller[0]._id
				// number of buiers
			});
			product[0].save();
			// user.save();
			seller[0].sellerProducts.push(product[0]._id);
			seller[0].save();
			res.json({
				message: 'product is updated',
				product: product
			});
		}
		// console.log(seller[0]);
	} else {
		const shops = [];
		// console.log(seller)
		shops.push({
			nameShop: seller[0].nameShop,
			lat: seller[0].lat,
			log: seller[0].log,
			colors: colors,
			sizes: sizes1,
			oldPrice: +oldPrice,
			newPrice: +newPrice,
			sellerId: seller[0]._id,
			quantity: +quantity
		});
		const product = new Product({
			gender: gender,
			categ: categ,
			fabricType: fabricType,
			Brand: Brand,
			numOfModel: numOfModel,
			shops: shops,
			productImage: req.file.path,
			description: gender + ' ' + fabricType + ' ' + categ
		});
		user.save();
		product.save();
		seller[0].sellerProducts.push(product._id);
		seller[0].save();
		res.json({
			message: 'product is added',
			product: product
		});
	}
};
exports.getProducts = async (req, res, next) => {
	//get all products
	const products = await Product.find();
	//recomendtion
	const filter1 = [];
	const pay = await User.findById(req.userId).populate('payments');
	if (pay) {
		pay.payments.forEach((p) => {
			if (p.type === 'fashion' && p.fromShoppingo) {
				filter1.push(p);
			}
		});
	}
	if (filter1.length > 0) {
		filter1.forEach((f) => {
			mapCat1[f.fashionType]++;
		});
		for (let i = 0; i < womenCategories.length; i++) {
			arrayMap[i][1] = mapCat1[arrayMap[i][0]];
		}
		var sortedArray = arrayMap.sort(function(a, b) {
			return b[1] - a[1];
		});
		allProducts = [];

		setTimeout((x) => {
			arrayMap.forEach(async (m) => {
				const clothes = await Product.find({ categ: m[0] });
				obj = {};
				obj[m[0]] = clothes;
				allProducts.push(obj);
			});
		}, 2000);
		const result = [];
		setTimeout((x) => {
			allProducts.forEach((p) => {
				let categ = Object.keys(p)[0];
				const Offers = [];
				const noOffers = [];
				p[categ].forEach((product) => {
					count = 0;
					product.shops.forEach((shop) => {
						if (+shop.oldPrice !== +shop.newPrice) count += 1;
						// Offers.push(product)
					});
					if (count) Offers.push(product);
					else noOffers.push(product);
				});
				obj = {};
				obj['offers' + categ] = Offers;
				obj['nooffers' + categ] = noOffers;
				result.push(obj);
			});
		}, 3000);
		setTimeout((x) => res.json(result), 5000);
		//end
	} else {
		const Offers = [];
		const noOffers = [];
		products.forEach((product) => {
			count = 0;
			product.shops.forEach((shop) => {
				if (+shop.oldPrice !== +shop.newPrice) count += 1;
				// Offers.push(product)
			});
			if (count) Offers.push(product);
			else noOffers.push(product);
		});

		res.json({ Offers: Offers, noOffers: noOffers });
	}
};

exports.displayProduct = async (req, res, next) => {
	// get all information for product
	// console.log("kkk")
	const id = req.params['id'];
	const allProduct = await Product.findById(id);
	if (!allProduct) {
		return res.json({ msg: 'prdouct does not found' });
	}
	const shops = allProduct.shops;

	testing = {};
	var coodiants = [];
	var prices = [];
	RED = [];
	BLUE = [];
	GREEN = [];
	ORANGE = [];
	CHEAP = 12000000000;
	closedShop = 100000000;
	nameClosedShop = '';
	var logCurrent = +req.body.log;
	var latCurrent = +req.body.lat;
	console.log(latCurrent, logCurrent);
	// get lat and log for all shops
	setTimeout((x) => {
		// console.log(shops)
		shops.forEach(async (shop) => {
			// console.log(shop)
			const id1 = shop.sellerId;
			const seller = await Seller.findById(id1);
			// console.log()
			const lat = seller.lat;
			const log = seller.log;
			coodiants.push({
				sellerId: seller._id,
				name: seller.nameShop,
				coo: [ log, lat ],
				id: seller._id,
				old: +shop.oldPrice,
				new: +shop.newPrice,
				description: allProduct.description,
				newColor: shop.colors,
				newSize: shop.sizes
			});
			prices.push({
				sellerId: seller._id,
				name: seller.nameShop,
				old: +shop.oldPrice,
				new: +shop.newPrice,
				coo: [ log, lat ],
				description: allProduct.description,
				newColor: shop.colors,
				newSize: shop.sizes
			});
		});
	}, 1200);
	L = 0;
	setTimeout((y) => {
		for (const i of coodiants) {
			lat1 = i.coo[1];
			log2 = i.coo[0];
			// console.log(lat1,log2,L)
			L = Math.sqrt(Math.pow(lat1 - latCurrent, 2) + Math.pow(log2 - logCurrent, 2));
			console.log('1');
			if (L < closedShop) {
				ORANGE = {
					sellerId: i.sellerId,
					name: i.name,
					old: i.old,
					new: i.new,
					coo: [ log2, lat1 ],
					description: i.description,
					newColor: i.newColor,
					newSize: i.newSize
				};
				closedShop = L;
			}
		}
		testing[ORANGE.name] = true;
		// get all product with offer
		prices.forEach((price) => {
			if (price.new != price.old) {
				// console.log("2")
				// console.log(price.name)
				RED.push(price);
				testing[price.name] = true;
			}
		});
		// get the cheapest
		prices.forEach((price) => {
			// console.log("3")
			if (price.new != price.old && price.new < CHEAP) (CHEAP = price.new), (GREEN = price);
			else if (price.new == price.old && price.old < CHEAP) (CHEAP = price.old), (GREEN = price);
		});
		testing[GREEN.name] = true;
		// console.log(GREEN.name)

		// testing[GREEN.name] = true;
		//get the rest
		// console.log(shops)
		prices.forEach((shop) => {
			if (testing[shop.name] != true) BLUE.push(shop);
			// console.log(shop.name)
		});
		// console.log("uu")
		res.json({
			allProduct: allProduct,
			RED: RED,
			GREEN: GREEN,
			ORANGE: ORANGE,
			BLUE: BLUE
		});
	}, 1500);
};

exports.getCategoriesProduct = async (req, res, next) => {
	const category = req.body.categ;
	const gender = req.body.gender;
	if (gender && category) {
		const products = await Product.find({ categ: category, gender: gender });

		const Offers = [];
		const noOffers = [];
		products.forEach((product) => {
			count = 0;
			product.shops.forEach((shop) => {
				if (+shop.oldPrice !== +shop.newPrice) count += 1;
			});
			if (count) Offers.push(product);
			else noOffers.push(product);
		});

		res.json({ Offers: Offers, noOffers: noOffers });
	} else {
		const products = await Product.find({ gender: gender });

		const Offers = [];
		const noOffers = [];
		products.forEach((product) => {
			count = 0;
			product.shops.forEach((shop) => {
				if (+shop.oldPrice !== +shop.newPrice) count += 1;
			});
			if (count) Offers.push(product);
			else noOffers.push(product);
		});

		res.json({ Offers: Offers, noOffers: noOffers });
	}
};

exports.ProductFilter = async (req, res, next) => {
	// console.log(56)
	typeOfFilter = req.body.typeOfFilter;
	from = req.body.from;
	to = req.body.to;
	currentLat = req.body.lat;
	currentLog = req.body.log;
	fromOffer = req.body.fromOffer;
	// console.log(currentLat," ",currentLog)
	const products = await Product.find();
	prices = [];
	pricesOffer = [];
  
	products.forEach((product) => {
	  min = 1000000000000000000;
	  nearest = 1000000000000000000;
	  max = 0;
	  product.shops.forEach((shop) => {
		L = Math.sqrt(
		  Math.pow(+shop.lat - +currentLat, 2) +
			Math.pow(+shop.log - +currentLog, 2)
		);
		// console.log(L)
		if (shop.newPrice < min) {
		  min = +shop.newPrice;
		}
		if (shop.newPrice > max) {
		  max = +shop.newPrice;
		}
		if (L < nearest) {
		  nearest = L;
		}
		if (shop.newPrice !== shop.oldPrice) {
		  pricesOffer.push({
			product: product,
			productId: product._id,
			shop,
			price: shop.newPrice,
		  });
		}
	  });
	  prices.push({
		max: max,
		min: min,
		_id: product._id,
		L: nearest,
		productImage: product.productImage,
		description: product.description,
	  });
	  // res.json(prices.length)
	});
	//  console.log(prices.length)
	if (typeOfFilter === 'LOW') {
	  prices.sort((a, b) => {
		if (a.min > b.min) {
		  return 1;
		} else if (a.min < b.min) return -1;
		else return 0;
	  });
	  pricesOffer.sort((a, b) => {
		if (a.price > b.price) {
		  return 1;
		} else if (a.price < b.price) return -1;
		else return 0;
	  });
	}
	if (typeOfFilter === 'HIGH') {
	  prices.sort((a, b) => {
		if (a.max < b.max) {
		  return 1;
		} else if (a.max > b.max) return -1;
		else return 0;
	  });
	  pricesOffer.sort((a, b) => {
		if (a.price < b.price) {
		  return 1;
		} else if (a.price > b.price) return -1;
		else return 0;
	  });
	}
	if (typeOfFilter === 'NEAREST') {
	  prices.sort((a, b) => {
		if (a.L > b.L) {
		  return 1;
		} else if (a.L < b.L) return -1;
		else return 0;
	  });
	}
	if (from && to) {
	  let result = [];
	  products.forEach((p) => {
		flag = true;
		p.shops.forEach((s) => {
		  if (s.newPrice >= from && s.newPrice <= to && flag == true) {
			result.push({ p, s });
			flag = false;
		  } else if (s.oldPrice >= from && s.oldPrice <= to && flag == true) {
			result.push({ p, s });
			flag = false;
		  }
		});
	  });
  
	  prices = result;
	}
	if (!fromOffer) {
	  res.json(prices);
	} else if (fromOffer && from && to) {
	  res.json(prices);
	} else {
	  console.log('ccccc');
	  res.json(pricesOffer);
	}
  };
exports.createProductReview = async (req, res) => {
	const { rating, comment, id } = req.body;

	const product = await Product.findById(id);

	if (product) {
		const alreadyReviewed = product.reviews.find((r) => r.user.toString() === req.userId.toString());

		if (alreadyReviewed) {
			res.status(400);
			throw new Error('Product already reviewed');
		}

		const review = {
			name: req.userr.name,
			rating: Number(rating),
			comment,
			user: req.userId
		};

		product.reviews.push(review);

		product.numReviews = product.reviews.length;

		product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

		await product.save();
		res.status(201).json({ message: 'Review added', rating: product.rating });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
};

exports.deleteProduct = async (req, res, next) => {
	const productId = req.params.id;
	const user = req.userr;
	const seller = await Seller.findOne({ infoUser: user._id });
	seller.sellerProducts.pull(productId);
	seller.save();
	const product = await Product.findById(productId);
	// pull seller from product info
	const updatedshops = product.shops.filter((shop) => shop.sellerId != seller._id);
	product.shops = updatedshops;
	// Product.findByIdAndUpdate(productId, {
	// 	$set: { shops: updatedshops }
	// });
	if (product.shops.length == 0) {
		const deletedProductFromProducts = await Product.deleteOne({ _id: productId });
		res.json({ seller, deletedProductFromProducts });
	} else {
		product.save();
		res.json({ seller, product });
	}
};

exports.updateProduct = async (req, res, next) => {
	const productId = req.params.id;
	const product = await Product.findById(productId);
	const user = req.userr;
	const seller = await Seller.findOne({ infoUser: user._id });
	const {
		price,
		colors1,
		x,
		s,
		xl,
		m,
		xxl,
		xxxl,
		quantity
	} = req.body;
	console.log(req.body)

	// console.log(typeof(colors1));
	// console.log(colors1);

	const sizes = [ s, x, xxl, xl, m, xxxl ];
console.log(typeof colors1,colors1);
	let colors;
	if (colors1.length > 7) {
		colors = colors1.split(',');
	} else {
		colors = [ colors1 ];
	}	
	product.shops.forEach((shop) => {
		if (shop.sellerId == seller._id) {
			if (colors) shop.colors = colors;
			if (sizes) shop.sizes = sizes;
			if (price) shop.newPrice = price;
			if (quantity) shop.quantity = quantity;
			product.save();
			return res.status(201).json({ msg: 'product information is updated' });
		}
	});
};

exports.getProductInfoForUpdate = async (req, res, next) => {
	const productId = req.params.id;
	const product = await Product.findById(productId);
	const user = req.userr;
	const seller = await Seller.findOne({ infoUser: user._id });
	product.shops.forEach((shop) => {
		if (shop.sellerId == seller._id) {
			res.status(200).json({ product, shop });
		}
	});
};
