var fs = require('fs');
var path = require('path');

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
