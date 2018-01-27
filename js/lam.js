$(document).ready(function() {

  function loadImages(start, n) {
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
      $('#lam-gallery').justifiedGallery('norewind');
    });

    return start + n;
  }

  // start to build gallery

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

  var lam_index = loadImages(0, 20);

  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
      lam_index = loadImages(lam_index, 10);
    }
  });

});
