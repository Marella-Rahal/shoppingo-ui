const express = require('express');
const isAuth = require('../middleware/isAuth');
const profileController = require('../controller/profile.js');
const router = express.Router();
///////////////start process image////////////
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './profiles/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
	}
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else cb(null, false);
};
const upload = multer({
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilter
});
///////end process image////////////////

router.get('/profile', isAuth, profileController.getProfile);
router.post('/updateProfile',upload.single('imageUrl'), isAuth, profileController.updateProfile);
module.exports = router;
