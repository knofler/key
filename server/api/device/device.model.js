'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var DeviceSchema = new Schema({
ComputerName: String,
OneID: String,
JobTitle: String,
FirstName: String, 
LastName: String,
EmailAddress: String,
OfficeLocation: String,
PhoneNumber: String,
SystemBrand: String,
Make: String,
Model: String,
ProcessorType: String,
CPUSPEED: String,
LastImaged: String,
HardDiskSize: String,
FreeDiskSpace: String,
IPAddress: String,
MACAddress: String,
SerialNumber: String,
Memory: String,
LastContractMade: String,
LastAgentLoad: String,
active: Boolean
});

module.exports = mongoose.model('Device', DeviceSchema);