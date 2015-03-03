var fs = require('fs');
var path = require('path');
var path = require('path');
var config = require("../config");


//
// Helper functions
//

// Recursive mkdir command
fs.mkdirParent = function(dirPath, mode, callback) {
  fs.mkdir(dirPath, mode, function(error) {
    if (error && error.errno === 34) {
      fs.mkdirParent(path.dirname(dirPath), mode, callback);
      fs.mkdirParent(dirPath, mode, callback);
    }
    callback && callback(error);
  });
};

// Debug console logs
var debuglog = function(string) {
  if (config.enable_debug)
    console.log('[DEBUG] ' + string);
};

module.exports.debuglog = debuglog;
