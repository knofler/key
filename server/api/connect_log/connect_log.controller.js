'use strict';

var _ = require('lodash');
var ConnectLog = require('./connect_log.model');

// Get list of connect_logs
exports.index = function(req, res) {
  ConnectLog.find(function (err, connect_logs) {
    if(err) { return handleError(res, err); }
    return res.json(200, connect_logs);
  });
};

// Get a single connect_log
exports.show = function(req, res) {
  ConnectLog.findById(req.params.id, function (err, connect_log) {
    if(err) { return handleError(res, err); }
    if(!connect_log) { return res.send(404); }
    return res.json(connect_log);
  });
};

// Creates a new connect_log in the DB.
exports.create = function(req, res) {
  ConnectLog.create(req.body, function(err, connect_log) {
    if(err) { return handleError(res, err); }
    return res.json(201, connect_log);
  });
};

// Updates an existing connect_log in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ConnectLog.findById(req.params.id, function (err, connect_log) {
    if (err) { return handleError(err); }
    if(!connect_log) { return res.send(404); }
    var updated = _.merge(connect_log, req.body);
    updated.save(function (err) {
      if (err) { return handleError(err); }
      return res.json(200, connect_log);
    });
  });
};

// Deletes a connect_log from the DB.
exports.destroy = function(req, res) {
  ConnectLog.findById(req.params.id, function (err, connect_log) {
    if(err) { return handleError(res, err); }
    if(!connect_log) { return res.send(404); }
    connect_log.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}