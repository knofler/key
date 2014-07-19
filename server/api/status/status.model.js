'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StatusSchema = new Schema({
  msg: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Status', StatusSchema);