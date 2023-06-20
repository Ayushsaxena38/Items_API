const express = require('express');
const router = express.Router()
//require controller
const itemsController = require('../controllers/itemsController');
//apis
router.get('/api/items',itemsController.allItems);
router.post("/api/items",itemsController.create);
router.get('/api/items/:id',itemsController.oneItem);
router.put('/api/items/:id',itemsController.updateOne);
router.delete('/api/items/:id',itemsController.delete);
module.exports = router;