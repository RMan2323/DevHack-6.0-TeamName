const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Route to sell an item
router.post('/sell', itemController.sellItem);

// Route to fetch all items
router.get('/', itemController.getAllItems); // Change from '/items' to '/'

module.exports = router;