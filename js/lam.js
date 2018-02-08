var UrlLoader = {
  loadUrls: function(urls) {
    var promises = [];

    urls.forEach(function(url) {
      promises.push($.ajax(url))
    });

    return promises;
  },

  withPromises: function(promises, withResults) {
    $.when.apply($, promises).then(function() {
      results = [];

      for (idx in arguments) {
        results.push(arguments[idx]);
      }

      withResults(results);
    });
  }
}

var Images = {
  index: 0,

  loadMore(n, urlBuilder, withResults) {
    urls = [];

    for (var idx = Images.index; idx < Images.index + n; ++idx) {
      urls.push(urlBuilder(idx));
    }

    promises = UrlLoader.loadUrls(urls);

    UrlLoader.withPromises(promises, withResults);

    Images.index = Images.index + n;
  }
}

function toHtml(imgMeta) {
  var template = document.createElement('template');

  var i = imgMeta['w_dir'] + '/' + imgMeta['i'];
  var img = '<img src="' + i + '"/>';

  // var t = imgMeta['t_dir'] + '/' + imgMeta['t'];
  // var img = '<img src="' + t + '"/>';

  var div = '<div class="grid-item">' + img + '</div>';

  if (imgMeta['i_width'] > imgMeta['i_height']) {
    div = '<div class="grid-item grid-item--aspect-fix">' + img + '</div>';
  // } else if (imgMeta['exif']['rating'] == 5) {
  //   div = '<div class="grid-item grid-item--5star">' + img + '</div>';
  // } else if (imgMeta['exif']['rating'] == 4) {
  //   div = '<div class="grid-item grid-item--width4">' + img + '</div>';
  }

  html = div

  // html = '<img class="grid-item" src="' + t + '" style="width:' + imgMeta['width'] + 'px; height:' + imgMeta['height'] + 'px;"/>';

  // html = '<div class="grid-item" style="width:' + imgMeta['width'] + 'px;"></div>';

  html = html.trim()
  template.innerHTML = html;

  return template.content.firstChild;

  // {{t_dir}}/{{t}}" width="{{t_width}}" height="{{t_height}}" 
  // itemprop="thumbnail" alt="{{title}}"/>'
}

$(document).ready(function() {

  var urlBuilder = function(idx) {
      return 'html/img_' + ("0000" + idx).slice(-4) + '.html';
      // return 'json/img_' + ("0000" + idx).slice(-4) + '.json';
  }

  Images.loadMore(52, urlBuilder, function(results) {

    results.forEach(function(result) {
      $('#grid').append(result[0]);
      // $('#grid').append(toHtml(result[0]));

    });

    // $('#grid').justifiedGallery({selector: 'figure, div:not(.spinner)'});
    // // initialize justifiedGallery
    $('#grid').justifiedGallery({
      selector: 'figure, div:not(.spinner)',
      margins: 5,
      rowHeight: 240,
      cssAnimation: true,
      imagesAnimationDuration: 0,
      // waitThumbnailsLoad: false,
      sizeRangeSuffixes: {
        100  : '_t',
        240  : '_m',
        320  : '_n',
        640  : '_z',
        1024 : '_b'
      }
    });

  });

});
