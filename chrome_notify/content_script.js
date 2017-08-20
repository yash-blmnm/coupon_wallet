
var tabURL = document.location.host;
chrome.runtime.sendMessage({taburl: tabURL}, function(response) {
  console.log(response.farewell);

});