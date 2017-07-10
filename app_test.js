const chai = require("chai")
const assert = chai.assert;
const request = require("supertest");
const app = require("./app");

// describe("dat API", function(){
//   it("shape of API is object with games array", function(done){
//     request(app)
//       .get("/api/games")
//       .expect(200)
//       .end(function(err, res){
//         // what is the response?
//         assert.isArray(res.body.games)
//         done();
//       })
//   })
// })
//A customer should be able to get a list of the current items, their costs, and quantities of those items
describe("the api?!?!", function(){
  it("the items and their properties", function(done){
    request(app)
      .get('/api/customer/items')
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end(done)
  })
})
//A vendor should be able to see total amount of money in machine
describe("machine function", function(){
  it("The amount of money is present", function(done){
    request(app)
      .get('/api/vendor/money')
      .expect(200)
      .expect(function(res){
        assert.equal(typeof res.body[0].totalMoney, 'number')
      })
      .end(done)
  })
  it('All purchases with their time and date', function(done){
    request(app)
      .get('/api/vendor/purchases')
      .expect(200)
      //checking that there is a time
      .expect(function(res){
        for (var i = 0; i < res.body[0].log.length; i++) {
          assert.equal(typeof res.body[0].log[i].time, 'string');
        }
      })
      //ensuring all the purchases are pulled, not just one.
      .expect(function(res){
        console.log(res.body[0].log.length);
        assert.isAbove(res.body[0].log.length, 1)
      })
      .end(done)
  })
})
//A vendor should be able to update the description, quantity, and costs of items in the machine
