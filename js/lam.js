// returns XMLHttpRequest object
function loadMore(url, successCb) {
  return $.ajax({
    // type: "GET",
    url: url,
    // data: "",
    success: successCb
  });
}

function infiLoad() {
  console.log('infiLoad');
  if ($(window).scrollTop() + $(window).height() >= 0.8 * $(document).height()) {
    $(window).unbind('scroll');
    ++index;
    loadMore(buildURL(index), function() {
      $('#grid').append(response);
      $('#grid').justifiedGallery('norewind');
      $(window).on('scroll', function() {
        infiLoad();
      });
    });
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

  function buildURL(index) {
    return 'html/img_' + ("0000" + index).slice(-4) + '.html';
  }

  var index = 0;

  function rabbitHole(response) {
    $('#grid').append(response);
    $('#grid').justifiedGallery('norewind');
    if ($(document).height() <= $(window).height()) {
      ++index;
      loadMore(buildURL(index), rabbitHole);
    }
  }

  loadMore(buildURL(index), rabbitHole);

  $(window).on('scroll', function() {
    console.log('scroll');
    if ($(window).scrollTop() + $(window).height() >= 0.8 * $(document).height()) {
      $(window).unbind('scroll');
    }
  });

});
