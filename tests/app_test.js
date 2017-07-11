const chai = require("chai")
const assert = chai.assert;
const request = require("supertest");
const app = require("../app");
const Item = require("../models/schema");
const Machine = require("../models/machine")

//A customer should be able to get a list of the current items, their costs, and quantities of those items
describe("The items.", function(){
  let item = false

  afterEach(function(done){
    Item.deleteMany().then(function(){
      done()
    })
  })

  beforeEach(function(done){
    const i = new Item()
    i.description = 'snack',
    i.cost = 1
    i.quantity = 5
    i.save()
      .then(function(i){
        item = i;
        done();
      })
  })

  it("the items and their properties", function(done){
    request(app)
      .get('/api/customer/items')
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end(done)
  })
})
//A vendor should be able to see total amount of money in machine
// describe("machine function", function(){
//   it("The amount of money is present", function(done){
//     request(app)
//       .get('/api/vendor/money')
//       .expect(200)
//       .expect(function(res){
//         assert.equal(typeof res.body[0].totalMoney, 'number')
//       })
//       .end(done)
//   })
//   it('All purchases with their time and date', function(done){
//     request(app)
//       .get('/api/vendor/purchases')
//       .expect(200)
//       //checking that there is a time
//       .expect(function(res){
//         for (var i = 0; i < res.body[0].log.length; i++) {
//           assert.equal(typeof res.body[0].log[i].time, 'string');
//         }
//       })
//       //ensuring all the purchases are pulled, not just one.
//       .expect(function(res){
//         console.log(res.body[0].log.length);
//         assert.isAbove(res.body[0].log.length, 1)
//       })
//       .end(done)
//   })
// })
//A vendor should be able to update the description, quantity, and costs of items in the machine
describe('updating items', function(){
  let item = false

  afterEach(function(done){
    Item.deleteMany().then(function(){
      done()
    })
  })

  beforeEach(function(done){
    const i = new Item()
    i.description = 'snack',
    i.cost = 1
    i.quantity = 5
    i.save()
      .then(function(i){
        item = i;
        done();
      })
  })

  it('Update the item\'s description, quantity, and cost in the machine', function(done){
    request(app)
    .post('/api/vendor/items')
    .send({
      description: "Lays",
      cost: 1.50,
      quantity: 20
    })
    expect(200);
    // expect(function(res){
    // })
  })
})
