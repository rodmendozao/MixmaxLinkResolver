var sync = require('synchronize');
var request = require('request');

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var url = req.query.url.trim();

  // Youku video urls are in the format:
  // http://v.youku.com/v_show/id_<alphanumeric id>[=<metadata>][.html][<more metadata>]
  var matches = url.match(/.*youku\.com\/v_show\/id_([a-zA-Z0-9]+)[=\.]*.*$/);
  if (!matches) {
    res.status(400).send('Invalid URL format');
    return;
  }

  var id = encodeURIComponent(matches[1]);

  var response;
  try {
    response = sync.await(request({
      url: 'http://v.youku.com/v_show/id_' + id,
      timeout: 15 * 1000
    }, sync.defer()));
  } catch (e) {
    res.status(500).send('Error');
    return;
  }

  var DOMParser = require('xmldom').DOMParser;
  var responseHtml = new DOMParser().parseFromString(response.body)
  var title = responseHtml.getElementById('subtitle')

  var html = '<!-- Youku preview (title and video) -->';

  html += '<a href="http://v.youku.com/v_show/id_' + id;
  html += '" target="_blank" style="text-decoration:none; font-size:200%; font-family:courier; display:block; color:#333; border:none;">';
  html += title + '</a>';

  html += '<embed src="http://player.youku.com/player.php/sid/' + id;
  html += '/v.swf" quality="high" width="480" height="400" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"/>';

  res.json({
    body: html
  });
};