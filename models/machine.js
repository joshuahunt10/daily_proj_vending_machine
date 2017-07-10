const mongoose = require("mongoose");

const machineSchema = new mongoose.Schema({
  totalMoney: {type: Number},
  log: [{
    description:{type: String},
    quantity: {type: Number},
    time: {type: Date, default: Date.now}
  }]
})

const Machine = mongoose.model('Machine', machineSchema)

module.exports = Machine;
