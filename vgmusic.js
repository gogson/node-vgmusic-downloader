//
//  Requires
//

var fs = require('fs');
var path = require('path');
var crawler = require("simplecrawler");
var helpers = require("./helpers");
var config = require("./config");
var colors = require('colors');

// Helpers
 
fs.mkdirParent = function(dirPath, mode, callback) {
  fs.mkdir(dirPath, mode, function(error) {
    if (error && error.errno === 34) {
      fs.mkdirParent(path.dirname(dirPath), mode, callback);
      fs.mkdirParent(dirPath, mode, callback);
    }
    callback && callback(error);
  });
};

//
// Page Crawler
//

var pageCrawler = function(page, i) {
  var current = page;
  console.log(('* Starting Crawler #'+i+' for page\t' + current.replace(config.domain, '')+'...').blue);
  crawler.crawl(current, function(queueItem, responseBuffer, response) {
    var destination_dir = config.downloadFolder+"/"+current.split('/music/')[1];
    var file_name = queueItem.url.split('/')[queueItem.url.split('/').length - 1];
    if ("audio/midi" === response.headers['content-type'])
    {
      console.log("Crawler #"+i+("\tDownloaded " + file_name + " ("+(responseBuffer.length / 1000)+" kb) in %dms").blue, queueItem.stateData.downloadTime);
      fs.mkdirParent(destination_dir);
      fs.writeFile((destination_dir+"/"+file_name), responseBuffer, function(err) { 
        console.log((err) ? ('Crawler #'+i(+'\tError saving the MIDI file '+file_name+'\n'+err+'').red): ('Crawler #'+i+('\tSaved file '+file_name+' !').blue));
      });
    }
  });
}

//
//  Main
//

console.log('========================================================================');
console.log('============           VGMusic MIDI Files Downloader        ============');
console.log('========================================================================\n');
console.log(('Starting crawling '+config.pages.length+' pages.\n').yellow);

fs.mkdirParent(config.downloadFolder);

for (var i = 0; i < config.pages.length; i++)
  pageCrawler((config.domain + '/' + config.pages[i]), i);

console.log('\nPlease wait until all links are crawled...\n'.yellow);
