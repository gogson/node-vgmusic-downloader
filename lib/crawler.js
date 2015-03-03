var fs = require('fs');
var path = require('path');
var crawler = require("simplecrawler");
var helpers = require("./helpers");
var config = require("../config");
var colors = require('colors');

//
// Page Crawler Function
// ---------------------
//

var pageCrawler = function(page, i) {
  console.log(('* Starting Crawler #'+i+' for page\t' + page.replace(config.domain, '')+'...').blue);

  // Crawler only crawl this page
  var myCrawler = crawler.crawl(page);
  myCrawler.maxDepth = 1;

  // Crawler Handler (on resource fetch complete)
  myCrawler.on('fetchcomplete', function(queueItem, responseBuffer, response) {
    var destination_dir = config.downloadFolder+"/"+page.split('/music/')[1];
    var file_name = queueItem.url.split('/')[queueItem.url.split('/').length - 1];
    if ("audio/midi" === response.headers['content-type'])
    {
      console.log(('[#'+i+'] ').grey+("Downloaded " + file_name + " ("+ (responseBuffer.length / 1000)+" kb) in %dms").blue, queueItem.stateData.downloadTime);
      fs.mkdirParent(destination_dir);
      fs.writeFile((destination_dir+"/"+file_name), responseBuffer, function(err) { 
        if (err) console.log(('Crawler #'+i+('\tError saving the MIDI file '+file_name+'\n'+err+'').red));
      });
    }
  });

  // Fired when the crawler has started
  myCrawler.on("crawlstart", function() {
    console.log(('[#'+i+'] ').grey+('Info: Started Crawler #'+i+' for page\t' + page.replace(config.domain, '')).green);
  });

  // Fired when a duplicate URI is found in the queue
  myCrawler.on("queueduplicate", function(uri) {
    helpers.debuglog(('[#'+i+'] ').grey+('Warning : duplicate resource found in queue: '+uri.path).yellow);
  });

  // Fired when a resource is added to the download queue
  myCrawler.on("queueadd", function(queueItem) {
    helpers.debuglog(('[#'+i+'] ').grey+('Info: Added resource to queue : '+queueItem.url).blue);
  });

  // Fired when the queue is empty
  myCrawler.on("complete", function(queueItem) {
    console.log(('[#'+i+'] ').grey+('Info: Crawler #'+i+' completed downloads.').green);
  });

  // Fired when link discovery 
  myCrawler.on("discoverycomplete", function(queueItem) {
    console.log(('[#'+i+'] ').grey+('Info: Crawler #'+i+' completed resources discovery!').green);
  });

  // Don't download useless files and invalid path files
  myCrawler.addFetchCondition(function(parsedURL) {
    if (parsedURL.path.match( /\.(html|gif|js|css|php|jpg)$/i))
      return false;

    if (parsedURL.path.indexOf(page.split('/music/')[1]) === -1)
      return false;

    return true;
  });

};

module.exports.pageCrawler = pageCrawler;
