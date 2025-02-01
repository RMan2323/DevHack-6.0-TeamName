const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/sell', authMiddleware.authenticateUser, itemController.sellItem);
router.get('/', itemController.getAllItems);

module.exports = router;