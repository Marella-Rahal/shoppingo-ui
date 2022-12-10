const Payment = require('../model/payment');
const PaymentReq = require('../model/paymentReq');
const User = require('../model/user');
const { validationResult } = require('express-validator');
const payment = require('../model/payment');
const { all } = require('../routes/managment');
const { default: mongoose } = require('mongoose');
const Seller = require('../model/seller');

const yearandmonths = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  year: 0,
};
const priority = {
  1: 'BANK',
  2: 'AJAR',
  3: 'FOATER',
  4: 'DEANS',
  5: 'OTHERS',
};
function getMonthDifference(startDate, endDate) {
  return (
    endDate.getMonth() -
    startDate.getMonth() +
    12 * (endDate.getFullYear() - startDate.getFullYear())
  );
}

function sortDate(arraypayments, typedate) {
  // console.log(arraypayments);
  if (typedate === 'high') {
    arraypayments.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) return 1;
      else if (new Date(a.date) > new Date(b.date)) return -1;
      else return 0;
    });
  } else {
    arraypayments.sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return 1;
      else if (new Date(a.date) < new Date(b.date)) return -1;
      else return 0;
    });
  }
}
function sortValue(arraypayments, typedate) {
  if (typedate === 'high') {
    arraypayments.sort((a, b) => {
      if (+a.value < +b.value) return 1;
      else if (+a.value > +b.value) return -1;
      else return 0;
    });
  } else {
    arraypayments.sort((a, b) => {
      if (+a.value > +b.value) return 1;
      else if (+a.value < +b.value) return -1;
      else return 0;
    });
  }
}
function sortPrice(arraypayments, typedate) {
  // console.log(arraypayments);
  if (typedate === 'high') {
    arraypayments.sort((a, b) => {
      if (+a.value < +b.value) return 1;
      else if (+a.value > +b.value) return -1;
      else return 0;
    });
  } else {
    arraypayments.sort((a, b) => {
      if (+a.value > +b.value) return 1;
      else if (+a.value < +b.value) return -1;
      else return 0;
    });
  }
}

//@router post
//@desc   enter full income
//@view   public
exports.addIncome = async (req, res, next) => {
  const error = validationResult(req);
  const user=await User.findById(req.userId)
  if (!error.isEmpty()) {
    const error = new Error('enter valid things');
    error.statusCode = 422;
    throw error;
  }
  // console.log("add befor",user)
  const value = req.body.value;
  // console.log(value)
  User.findById(req.userId)
    .then((user) => {
      // console.log(user)
      user.income += +value;
      user.totalBalance += +value;
      console.log("add befor",user.income)
      user.save();
      res.status(201).json({ message: 'income is added', user: user });
    })
    .catch((err) => {
      err.statusCode = 422;
      throw err;
    });
};
//@router post
//@desc   add a new payment
//@view   public
exports.addPayment = (req, res, next) => {
  const error = validationResult(req);
  // const user=await User.findById(req.userId);
  
  if (!error.isEmpty()) {
    const error = new Error('enter valid things');
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const value = parseInt(req.body.value);
  const type = req.body.type;
  const date = req.body.date;
  // user.totalPayments+=(+value);
  // user.totalBalance-=(+value);
  User.findById(req.userId)
    .then((user) => {
      // console.log(value,user.income)
      if (value > user.totalBalance) {
        res.status(401).json({
          message:
            'you cant make payment the cost of it more than the total Balance',
        });
      } else {
        const payment = new Payment({
          name: name,
          value: value,
          type: type,
          date: date,
        });

        payment.save();
        user.payments.push(payment._id);
        user.totalBalance -= value;
        user.totalPayments += value;
        user.save();
        res.status(201).json({ message: 'user payment added', user });
      }
    })
    .catch((err) => {
      err.statusCode = 422;
      throw err;
    });
};
//@router post
//@desc   add a new reqpayment
//@view   public
exports.addPaymentReq = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error('enter valid things');
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const value = parseInt(req.body.value);
  const date = req.body.date;
  const isRepeater = req.body.isRepeater;
  const type = req.body.type;

  let dateNow,
    numOfMonthRepeater = 0,
    everyPaidValueRepeater = 0;
  paymentuntilnow = 0;
  almotabaki = 0;
  let typeMessage;
  if (isRepeater == true) {
    dateNow = new Date();
    endDate = new Date(date);
    if (dateNow.getMonth() === endDate.getMonth()) {
      numOfMonthRepeater = 0;
      everyPaidValueRepeater = 0;
      typeMessage = 'You must pay the full amount this month';
    } else {
      numOfMonthRepeater = Math.ceil(getMonthDifference(dateNow, endDate));
      everyPaidValueRepeater =Math.floor( (value / numOfMonthRepeater).toString());
      typeMessage = `you must pay ${everyPaidValueRepeater} over ${numOfMonthRepeater} months`;
    }
  } else {
    typeMessage = `One-time payment`;
    everyPaidValueRepeater=0;
    numOfMonthRepeater=0;
  }
  const paymentReq = new PaymentReq({
    name: name,
    value: value,
    date: date,
    type: type,
    isRepeater: (isRepeater ? 1 : 0),
    numOfMonthRepeater: numOfMonthRepeater,
    everyPaidValueRepeater: everyPaidValueRepeater,
    paymentuntilnow: 0,
    almotabaki: value,
    typeMessage: typeMessage,
    Ispaied:0
  });
  paymentReq.save();
  User.findById(req.userId)
    .then((user) => {
      user.paymentsReq.push(paymentReq._id);
      user.save();
    })
    .catch((err) => {
      err.statusCode = 422;
      throw err;
    });
  const finaluser = await User.findById(req.userId);
  res
    .status(201)
    .json({ message: 'user reqpayment Required added', user: finaluser });
};
//@router get
//@desc   get all payments
// //@view   public
exports.getpayments = async (req, res, next) => {
  const now = new Date();
  const pay = await User.findById(req.userId).populate('payments');
  // necessarymessage;
  if (!pay) {
    necessorymessage = 'you do not have any payment';
  }
  const filter = pay.payments.filter((payment) => {
    if (
      (new Date(payment.date).getMonth() === now.getMonth() &&
        new Date(payment.date).getFullYear() !== now.getFullYear()) ||
      (new Date(payment.date).getMonth() !== now.getMonth() &&
        new Date(payment.date).getFullYear() === now.getFullYear())
    ) {
      // console.log(2);
      return false;
    } else return true;
  });
  const user = req.userr;
  res.json({
    pay: filter,
    user,
  });
};
//@router get
//@desc   get all reqapayments
//@view   public
exports.getreqpayments = async (req, res, next) => {

  const now = new Date();
  const payreq = await User.findById(req.userId).populate('paymentsReq');
  // console.log(now.getDate())
  if(now.getDate()===1)
  {

   
    payreq.paymentsReq.forEach(p=>{
      p.Ispaied=0;
    })
    payreq.save()
    

  }
//  console.log(payreq)
  if (!payreq) {
    necessorymessage = 'you do not have any payment';
  }
  //  console.log(payreq.paymentsReq)
  const filter = payreq.paymentsReq.filter((payment) => {
    // console.log(payment)
    if (new Date(payment.date) < now) return false;
    if (new Date(payment.date) === now && payment.value !== 0) {
      necessorymessage = `you must pay to ${payment.name}`;
    } else return true;
  });

  const user = req.userr;
  res.json({
    payreq: filter,
    user,
   
});}
//@router get
//@desc   get data for dashboard
//@view   public
exports.getdatadashboard = async (req, res, next) => {
  let all = [];
  const necessorymessage = [];
  const user = await User.findById(req.userId);
  // user.totalPayments = 0;
  const pay = await User.findById(req.userId).populate('payments');
  const payreq = await User.findById(req.userId).populate('paymentsReq');
  const now = new Date();
 
  // user.totalBalance = user.income - user.totalPayments;
  // user.save();
  // count percent for every category
  const categories = {
    food: 0,
    clothes: 0,
    transporation: 0,
    schoolCost: 0,
    healthInsurunce: 0,
    entertainment: 0,
    others: 0,
  };
  yearandmonths['year'] = now.getFullYear();
  for (u in yearandmonths) {
    pay.payments.forEach((payment) => {
      if (new Date(payment.date).getFullYear() === now.getFullYear())
        yearandmonths[new Date(payment.date).getMonth()] += payment.value;
    });
  }

  yearandmonths[now.getMonth()] = user.totalPayments;
  pay.payments.forEach((payment) => {
    categories[payment.type] = categories[payment.type] + 1;
  });
  // get five by five
  pay.payments.sort((a, b) => {
    if (+a.value < +b.value) return 1;
    if (+a.value > +b.value) return -1;
    return 0;
  });
  payreq.paymentsReq.sort((a, b) => {
    if (+a.value < +b.value) return 1;
    if (+a.value > +b.value) return -1;
    return 0;
  });
  console.log(user.totalBalance)
  all.push({
    totalBalance: user.totalBalance,
    totalPayments: user.totalPayments,
    income: user.income,
  });
  all.push(categories);
  all.push(pay.payments.slice(0, 5));
  all.push(payreq.paymentsReq.slice(0, 5));

  res.json({
    dash: all,
    necessorymessage: necessorymessage,
    yearandmonths: yearandmonths,
  });
};
//@router post
//@desc   get filtered paym
//@view   public
exports.filterPayments = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const pay = await User.findById(req.userId).populate('payments');

  const filterbydate = req.body.filterbydate;
  const filterbytype = req.body.filterbytype;
  const filterbyprice = req.body.filterbyprice;
  if (filterbytype) {
    const filterpayments = pay.payments.filter((payment) => {
      // console.log(payment.type," ",filterbytype)
      return payment.type === filterbytype;
    });
    res.json({ data: filterpayments });
  } else if (filterbydate) {
    sortDate(pay.payments, filterbydate);
    res.json({ data: pay.payments });
  } else if (filterbyprice) {
    sortPrice(pay.payments, filterbyprice);
    res.json({ data: pay.payments });
  }
  // res.json({data:pay.payments})
};
//@router post
//@desc   get filtered data
//@view   public
exports.filterReqPayments = async (req, res, next) => {
  const payreq = await User.findById(req.userId).populate('paymentsReq');
  const filterbydate = req.body.filterbydate;
  const filterbyvalue = req.body.filterbyvalue;
  const filterbypri = req.body.filterbypri;

  if (filterbydate) {
    sortDate(payreq.paymentsReq, filterbydate);
    res.json({
      filterReqPayments: payreq.paymentsReq,
    });
  }
  if (filterbyvalue) {
    sortValue(payreq.paymentsReq, filterbyvalue);
    res.json({
      filterReqPayments: payreq.paymentsReq,
    });
  }
  if (filterbypri) {
    const all = [];
    //   console.log(1)
    if (filterbypri == 'high') {
      for (u in priority) {
        const first = payreq.paymentsReq.filter((payment) => {
          // console.log(payment.type);
          return payment.type === priority[u];
        });

        all.push(...first);
      }
      res.json({
        filterReqPayments: all,
      });
    } else {
      for (let i = 5; i > 0; i--) {
        const first = payreq.paymentsReq.filter((payment) => {
          //   console.log(payment)
          return payment.type === priority[i];
        });

        all.push(...first);
      }
      res.json({
        filterReqPayments: all,
      });
    }
  }
};

exports.addinstallment = async (req, res, next) => {
  const id = req.params.id;
  // console.log(typeof(id))
  const now = new Date();
  const paymentReq = await PaymentReq.findById(id);
  const user=await User.findById(req.userId);
  paymentReq.numOfMonthRepeater = getMonthDifference(
    now,
    new Date(paymentReq.date)
  );
  const necessarymessage = [];
  const { payment } = req.body;
  console.log(payment)
  if (paymentReq.isRepeater === 0) {
    necessarymessage.push('you are complete all this installment');
    const id1 = mongoose.Types.ObjectId(id);
    console.log(user.totalBalance,user.totalPayments)
    user.totalPayments+=(+payment);
    user.totalBalance-=(+payment);
    var index = user.paymentsReq.indexOf(id1);
if (index !== -1) {
  user.paymentsReq.splice(index, 1);
}
    user.save()
    await PaymentReq.deleteOne({ _id: id1 });

    res.json({
      necessarymessage: necessarymessage,
      message:"deleting"
    });
  } else {
    // const id1 = mongoose.Types.ObjectId(id);
    paymentReq.paymentuntilnow = (+paymentReq.paymentuntilnow) + (+payment);
    paymentReq.almotabaki = +paymentReq.value - +paymentReq.paymentuntilnow;
    paymentReq.numOfMonthRepeater = (+paymentReq.numOfMonthRepeater) - 1;
    paymentReq.Ispaied=1;
    paymentReq.save();
   
    if (+paymentReq.numOfMonthRepeater === 0 && +paymentReq.almotabaki > 0) {
      necessarymessage.push('you must pay all payments ,the time has expired');
      necessarymessage.push('you are pay for this Month');
      user.totalPayments+=(+payment);
      user.totalBalance-=(+payment);
      user.save()
      res.json({
        paymentReq: paymentReq,
        necessarymessage: necessarymessage,
      });
    } else if (+paymentReq.almotabaki === 0) {
      necessarymessage.push('you are complete all this installment');
      const id1 = mongoose.Types.ObjectId(id);
      await PaymentReq.deleteOne({ _id: id1 });
      user.totalPayments+=(+payment);
      user.totalBalance-=(+payment);
      
      var index = user.paymentsReq.indexOf(id1);
      if (index !== -1) {
        user.paymentsReq.splice(index, 1);
      }
      user.save()

      res.json({
        necessarymessage: necessarymessage,
      });
    } else {
      // console.log("o")
      user.totalPayments+=(+payment);
      user.totalBalance-=(+payment);
      // console.log(user.totalPayments)
      user.save()
      necessarymessage.push('you are pay for this Month');
      res.json({
        paymentReq: paymentReq,
        necessarymessage: necessarymessage,
      });
    }
  }
};
exports.addmonthlyinstallment = async (req, res, next) => {
  const id = req.params['id'];
  const now = new Date();
  const paymentReq = await PaymentReq.findById(id);
  const user=await User.findById(req.userId)
  paymentReq.numOfMonthRepeater = getMonthDifference(
    now,
    new Date(paymentReq.date)
  );
  // console.log(typeof(id))
  const necessarymessage = [];

  if (+paymentReq.almotabaki >= +paymentReq.everyPaidValueRepeater) {
    paymentReq.paymentuntilnow =
      +paymentReq.paymentuntilnow + +paymentReq.everyPaidValueRepeater;
    paymentReq.almotabaki = +paymentReq.value - +paymentReq.paymentuntilnow;
    paymentReq.numOfMonthRepeater = (+paymentReq.numOfMonthRepeater) - 1;
    paymentReq.Ispaied=1;
    user.totalPayments+=(+paymentReq.everyPaidValueRepeater);
    user.totalBalance-=(+paymentReq.everyPaidValueRepeater);
    // user.save()

    paymentReq.save();
  } else if (+paymentReq.almotabaki < +paymentReq.everyPaidValueRepeater) {
    paymentReq.paymentuntilnow =
      +paymentReq.paymentuntilnow + +paymentReq.almotabaki;
    paymentReq.almotabaki = +paymentReq.value - +paymentReq.paymentuntilnow;
    paymentReq.numOfMonthRepeater = +paymentReq.numOfMonthRepeater - 1;
    paymentReq.Ispaied=1;
    paymentReq.save();
    user.totalPayments+=(+paymentReq.almotabaki);
    user.totalBalance-=(+paymentReq.almotabaki);
    // user.save()

  }
  if (+paymentReq.numOfMonthRepeater === 0 && +paymentReq.almotabaki > 0) {
    necessarymessage.push('you must pay all payments ,the time has expired');
    necessarymessage.push('you are pay for this Month');
    user.save()
    res.json({
      paymentReq: paymentReq,
      necessarymessage: necessarymessage,
    });
  } else if (+paymentReq.almotabaki === 0) {
    necessarymessage.push('you are complete all this installment');
    const id1 = mongoose.Types.ObjectId(id);
    await PaymentReq.deleteOne({ _id: id1 });
    var index = user.paymentsReq.indexOf(id1);
    if (index !== -1) {
      user.paymentsReq.splice(index, 1);
    }
    user.save();
    res.json({
      necessarymessage: necessarymessage,
    });
  } else {
    user.save();
    necessarymessage.push('you are pay for this Month');
    res.json({
      paymentReq: paymentReq,
      necessarymessage: necessarymessage,
    });
  }
};

exports.deleteinstallment = async (req, res, next) => {
  const id = req.params['id'];
  const id1 = mongoose.Types.ObjectId(id);
  const user = await User.findById(req.userId);
  const payments = user.paymentsReq.filter((pay) => {
    if (pay != id) return true;
  });
  user.paymentsReq = payments;
  user.save();
  await PaymentReq.deleteOne({ _id: id1 });
  // const paymentReq = await PaymentReq.findById(id);
  res.json(
    "deleting"
  );

};
exports.updateinstallment = async (req, res, next) => {
  const id = req.params['id'];
   const { name, value, date, isRepeater,type } = req.body;
  const paymentReq = await PaymentReq.findById(id);
  const monthly = paymentReq.paymentuntilnow;
  const all = paymentReq.almotabaki;
  if (name) paymentReq.name = name;
   if(type)paymentReq.type=type;
  if (value) {
    paymentReq.value = value;
    paymentReq.numOfMonthRepeater = getMonthDifference(
      new Date(),
      new Date(paymentReq.date)
    );
    paymentReq.everyPaidValueRepeater =
      paymentReq.value / paymentReq.numOfMonthRepeater;
    paymentReq.almotabaki = (+paymentReq.value) - (+paymentReq.paymentuntilnow);
  }
  if (date) {
    paymentReq.date = date;
    paymentReq.numOfMonthRepeater = getMonthDifference(
      new Date(),
      new Date(paymentReq.date)
    );
    paymentReq.everyPaidValueRepeater =
      (+paymentReq.value) / (+paymentReq.numOfMonthRepeater);
  }
  if (isRepeater===false||isRepeater===true) {
    // console.log("ui")
    paymentReq.isRepeater = isRepeater;
    paymentReq.numOfMonthRepeater = getMonthDifference(
      new Date(),
      new Date(paymentReq.date)
    );
    paymentReq.everyPaidValueRepeater =
    (+paymentReq.value) / (+paymentReq.numOfMonthRepeater);
    paymentReq.paymentuntilnow = 0;
    paymentReq.almotabaki = (+paymentReq.value);
  }
  // console.log("l")
  paymentReq.save();
  res.json({
    message: 'DONE',
    paymentReq: paymentReq,
  });
};
exports.updatePayReq = async (req, res, next) => {
  const id = req.params['id'];
  const paymentReq = await PaymentReq.findById(id);
  res.json({
    paymentReq: paymentReq,
    editing: true,
  });
};

exports.getSellerDash = async (req, res, next) => {
  const user = await User.findById(req.userId);
  console.log(user, 'from dash*******************************');
  const seller = await Seller.findOne({ infoUser: user._id }).populate(
    'sellerProducts'
  );
  // console.log(seller);
  // console.log(seller._id);
  // res.json(seller.sellerProducts);
  const payments = await Payment.find({ sellerId: seller._id.toString() });
  console.log(payments);
  const monthsIfno = {
    1: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    2: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    3: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    4: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    5: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    6: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    7: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    8: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    9: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    10: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    11: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
    12: {
      numOfSellesPerMonth: 0,
      paymentsValueInMonth: 0,
    },
  };
  const paymentsInCurrentYear = payments.filter((payment) => {
    if (new Date(payment.date).getFullYear() === new Date().getFullYear())
      return true;
    else return false;
  });
  paymentsInCurrentYear.forEach((payment) => {
    const month = new Date(payment.date).getMonth() + 1;
    monthsIfno[month].numOfSellesPerMonth += 1;
    monthsIfno[month].paymentsValueInMonth += +payment.value;
  });
  let productsInfo = [];
  seller.sellerProducts.forEach((product) => {
    let price1, price2;

    product.shops.forEach((shop) => {
      if (shop.sellerId == seller._id) {
        price1 = shop.newPrice;
        price2 = shop.oldPrice;

        return;
      }
    });
    let info = {
      productId:product._id,
      productCateg: product.description,
      oldPrice: price2,
      newPrice: price1,
      imgUrl: product.productImage,
    };
    productsInfo.push(info);
  });
  res.json({
    monthsIfno,
    sellerProducts: productsInfo,
    numOfProductsells: seller.numOfProductsells,
    totalIncomeShop: seller.totalIncomeShop,
  });
};
