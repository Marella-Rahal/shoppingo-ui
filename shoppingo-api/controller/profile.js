const User = require('../model/user');
const bycrpt = require('bcryptjs');
const crypto = require('crypto');
const { encrypt, decrypt } = require('../crypto');
exports.getProfile = async (req, res, next) => {
  // console.log(JSON.parse("{u:ttt}"))
  userId = req.userId;
  // console.log(userId);

  user = await User.findById(userId);
  // console.log(user);
  //const decpass = decrypt(user.pass);
  //  console.log(typeof decpass)
  if (!user.imageUrl) user.imageUrl = user.name.slice(0, 1);
  // user.password=decpass;
  user.save();

  res.json({ user: user});
};
exports.updateProfile = async (req, res, next) => {
  userId = req.userId;
  user = await User.findById(userId);
  const password = req.body.password;
  let imageUrl;
  if (req.file) imageUrl = req.file.path;
  const name = req.body.name;
  if (password) {
    const hash = encrypt(password);
    const hashedPassword = await bycrpt.hash(password, 12);
    user.password = hashedPassword;
    user.pass = hash;
  }
  if (imageUrl) {
    user.imageUrl = imageUrl;
  }
  if (name) user.name = name;

  user.save();
  res.json({ status: 201, user: user, msg: 'profile Updated' });
};
