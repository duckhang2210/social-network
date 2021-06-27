const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
//Register

router.post('/register', async (req, res) => {
	try {
		//generate new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		//create user
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword
		});
		//save user
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
	}
});

//Login
router.post('/login', async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });

		//Wrong username or password
		!user && res.status(404).send('User not found');
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);

		!validPassword && res.status(400).send('Wrong password');

		//Correct account
		res.status(200).json(user);
	} catch (err) {
		console.log(err);
	}
});

module.exports = router;
