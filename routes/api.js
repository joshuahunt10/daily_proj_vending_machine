const express = require("express");
const router = express.Router();
const Item = require("../models/schema");
const Machine = require("../models/machine")



// POST /api/customer/items/:itemId/purchases - purchase an item
// POST /api/vendor/items - add a new item not previously existing in the machine
// PUT /api/vendor/items/:itemId - update item quantity, description, and cost

//Done:
// GET /api/customer/items - get a list of items
// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
// GET /api/vendor/money - get a total amount of money accepted by the machine


router.post('/api/customer/items/:itemId/purchases', function(req, res){

})


router.get('/api/customer/items', function(req, res){
  Machine.find()
  .then(function(machine){
    res.json(machine)
  })
})

router.get('/api/vendor/purchases', function(req, res){
  Machine.find({}, {'log.description': 1, 'log.time':1})
  .then(function(purchases){
    res.json(purchases)
  })
})

router.get('/api/vendor/money', function(req, res){
  Machine.find({}, {'totalMoney': 1})
  .then(function(money){
    res.json(money)
  })
})



module.exports = router;
