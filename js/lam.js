$(document).ready(function() {

  function loadImages(update_fn, start, n) {
    var promises = [];

    for (var i = start; i < start + n; ++i) {
      url = 'gallery/img_' + ("0000" + i).slice(-4) + '.html';
      promises.push($.ajax(url))
    }

    $.when.apply($, promises).then(function() {
      results = arguments;
      for (idx in arguments) {
        $('#lam-gallery').append(arguments[idx][0]);
      }

      update_fn();

    });

    return start + n;
  }

  function initGallery() {
    // initialize justifiedGallery
    $("#lam-gallery").justifiedGallery({
        selector: 'figure, div:not(.spinner)',
        margins: 3,
        rowHeight: 240,
        cssAnimation: false,
        imagesAnimationDuration: 0,
        waitThumbnailsLoad: false,
        sizeRangeSuffixes: {
            100  : '_t',
            240  : '_m',
            320  : '_n',
            640  : '_z',
            1024 : '_b'
        }
    });

    return function() {
      $('#lam-gallery').justifiedGallery('norewind');
    }
  }

  // start to build gallery

  var update_fn = initGallery();

  var lam_index = loadImages(update_fn, 0, 20);

  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() >= 3 * $(document).height() / 4) {
      lam_index = loadImages(update_fn, lam_index, 10);
    }
  });

});
