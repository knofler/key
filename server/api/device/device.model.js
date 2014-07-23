'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
  MachineName: String,
  LoginName: String,
  IPAddress: String,
  LANAddress: String,
  SerialNumber: String,
  Memory: String,
  LastScanDate:String,
  active: Boolean
});

module.exports = mongoose.model('Device', DeviceSchema);