/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ConnectLog = require('./connect_log.model');

exports.register = function(socket) {
  ConnectLog.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ConnectLog.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('connect_log:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('connect_log:remove', doc);
}