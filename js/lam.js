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


$(document).ready(function() {

  $('#grid').justifiedGallery({
    selector: 'figure, div:not(.spinner)',
    margins: 5,
    rowHeight: 160,
    // cssAnimation: true,
    // imagesAnimationDuration: 0,
    waitThumbnailsLoad: false,
    sizeRangeSuffixes: {
      100  : '_t',
      240  : '_m',
      320  : '_n',
      640  : '_z',
      1024 : '_b'
    }
  });

  var urlBuilder = function(idx) {
      return 'html/img_' + ("0000" + idx).slice(-4) + '.html';
  }

  for (var i = 10; i < 50; i = i + 10) {
  Images.loadMore(i, urlBuilder, function(results) {

    results.forEach(function(result) {
      $('#grid').append(result[0]);
      // console.log($(body).height());
    });

    $('#grid').justifiedGallery('norewind');
      console.log($(document).height());
      console.log($(window).height());
    // $('#grid').justifiedGallery({selector: 'figure, div:not(.spinner)'});
    // // initialize justifiedGallery

  });
  }

});
