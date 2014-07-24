'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ConnectLogSchema = new Schema({
   	device          : String,
	oneid           : String,
	jobtitle        : String,
	fname           : String,
	lname           : String,
	email           : String,
	officelocation  : String,
	phone           : String,
	systembrand     : String,
	make            : String,
	model           : String,
	processor       : String,
	cpu             : String,
	lastimaged      : String,
	hdd             : String,
	freedisk        : String,
	ipaddress       : String,
	lanaddress      : String,
	serial          : String,
	ram             : String,
	lastcontact     : String,
	lastagentconnect: String,
	created:Date,
  	active: Boolean
});

module.exports = mongoose.model('ConnectLog', ConnectLogSchema);