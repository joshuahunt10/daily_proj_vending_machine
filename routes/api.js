const express = require("express");
const router = express.Router();
const Item = require("../models/schema");
const Machine = require("../models/machine")




//Done:
// GET /api/customer/items - get a list of items
// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
// GET /api/vendor/money - get a total amount of money accepted by the machine

//Needs Tests:
// POST /api/customer/items/:itemId/purchases - purchase an item
// POST /api/vendor/items - add a new item not previously existing in the machine
// PUT /api/vendor/items/:itemId - update item quantity, description, and cost

router.put('/api/vendor/items/:itemId', function(req, res){
  Item.findOne({_id: req.params.itemId})
    .then(function(item){
      item.description = req.body.description || item.description
      item.cost = req.body.cost || item.cost
      item.quantity = req.body.quantity || item.quantity
      item.save().then(function(updatedItem){
        res.json(updatedItem)
      })
    })
  })

router.post('/api/vendor/items', function(req, res){
  var item = new Item()
  item.description = req.body.description
  item.cost = req.body.cost
  item.quantity = req.body.quantity
  item.save().then( function(item){
    res.json(item)
  })
})

router.post('/api/customer/items/:itemId/purchases', function(req, res){
  Item.findOne({_id: req.params.itemId})
  .then(function(item){
    item.quantity -= req.body.quantity;
    item.save()
    .then(function(item){
      Machine.findOne()
      .then(function(machine){
        machine.totalMoney = machine.totalMoney + (req.body.quantity * item.cost)
        machine.log.push({description: item.description, quantity: req.body.quantity})
        machine.save()
        .then(function(){
          res.json(machine)
        })
      })
    })
  })
})


router.get('/api/customer/items', function(req, res){
  Item.find()
  .then(function(items){
    res.json(items)
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
