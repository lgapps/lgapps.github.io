function getParams() {
  var url = window.location.search.replace("?", "");
  var params = {};
  var urlArray = url.split("&");

  for (var i in urlArray) {
    var param = urlArray[i].split("=");
    params[param[0]] = param[1];
  }
  console.log("log. detail. url=" + url);
  console.log("log. params=" + params);
  return params;
}

window.getParams = getParams;
