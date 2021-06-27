const router = require('express').Router();

router.get('/', (req, res) => {
	res.send('Hey its user page');
});

module.exports = router;
