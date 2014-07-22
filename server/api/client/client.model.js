'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClientSchema = new Schema({
  usr: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Client', ClientSchema);