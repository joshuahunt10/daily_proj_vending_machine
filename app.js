const express = require("express");
const mustache = require("mustache-express");
const bodyParser = require("body-parser");
const app = express();
const apiRoutes = require('./routes/api')

const mongoose = require('mongoose');

app.engine('mustache', mustache());
app.set("view engine", 'mustache');
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost:27017/vendingMachineDB');

const nodeEnv = process.env.NODE_ENV || "development";
const config = require("./config")[nodeEnv]
mongoose.connect(config.mongoUrl)


// const Machine = require("./models/machine")
//
// Machine.findOne({_id:'5963d93c50a0b59c9226bf4d'})
// .then(function(machine){
//   machine.log.push({description: 'dorritos', quantity: '1'})
//   machine.save()
// })

// var machine = new Machine()
// machine.totalMoney = 0
// machine.log.push({description: 'dorritos', quantity: 1})
// machine.save().then( function(machine){
//
//   console.log("SAVED!", machine)
// })


app.use(apiRoutes);

app.listen(3000, function(){
  console.log('You bought a Snickers');
})

module.exports = app;
