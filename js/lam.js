var _index = 0;

function getIndex() {
  return _index
}

function nextIndex() {
  return _index++;
}

function buildUrl(index) {
  return 'html/img_' + ("0000" + index).slice(-4) + '.html';
}

function loadMore(urls, cb) {
  var promises = [];
  for (idx in urls) {
    promises.push($.ajax(urls[idx]));
  }
  $.when.apply($, promises).then(function() {
    results = [];
    for (idx in arguments) {
      results.push(arguments[idx][0]);
    }
    cb(results);
  });
}

// // returns XMLHttpRequest object
// function loadMore(url, successCb) {
//   return $.ajax({
//     // type: "GET",
//     url: url,
//     // data: "",
//     // success: function(r) { console.log("successCb"); successCb(r); }
//     success: successCb
//   });
// }

// function infiLoad() {
//   console.log('infiLoad');
//   if ($(window).scrollTop() + $(window).height() >= 0.8 * $(document).height()) {
//     $(window).unbind('scroll');
//     ++index;
//     loadMore(buildUrl(index), function() {
//       $('#grid').append(response);
//       $('#grid').justifiedGallery('norewind');
//       $(window).on('scroll', function() {
//         infiLoad();
//       });
//     });
//   }
// }

function initPage(items) {
  var urls = [];

  for (var idx = 0; idx < items; ++idx) {
    urls.push(buildUrl(index()));
  }

  loadMore(urls, function(results) {
    for (idx in results) {
      $('#grid').append(results[idx]);
    }

    $('#grid').justifiedGallery().on('jg.complete', function (e) {
      $('#grid').justifiedGallery().unbind('jg.complete');
      // console.log('norewind callback')
      if ($(document).height() <= $(window).height()) {
        console.log('initPage again')
        initPage(items);
      }
    });

    // console.log('norewind start')
    $('#grid').justifiedGallery('norewind');
    // console.log('norewind end')

  });
}

function onScroll() {
  $(window).unbind('scroll');
  if ($(window).scrollTop() + $(window).height() >= 0.8 * $(document).height()) {
    var urls = [];

    for (var idx = 0; idx < 10; ++idx) {
      urls.push(buildUrl(index()));
    }

    loadMore(urls, function(results) {
      for (idx in results) {
        $('#grid').append(results[idx]);
      }

      $('#grid').justifiedGallery().on('jg.complete', function (e) {
        console.log('jg.complete callback');
        $('#grid').justifiedGallery().unbind('jg.complete');
        $(window).on('scroll', onScroll);
      });

      $('#grid').justifiedGallery('norewind');

    });
  } else {
    $(window).on('scroll', onScroll);
  }
}

$(window).on('scroll', onScroll);

$(document).ready(function() {

  $('#grid').justifiedGallery({
    selector: 'figure, div:not(.spinner)',
    margins: 5,
    // rowHeight: 160,
    rowHeight: 200,
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

//   function rabbitHole(response) {
//     // console.log(response);
//     $('#grid').append(response);
//     console.log("append");
//     $('#grid').justifiedGallery('norewind');
//     console.log($(document).height());
//     console.log($(window).height());
//     if ($(document).height() <= $(window).height()) {
//       // ++index;
//       loadMore(buildUrl(++index), rabbitHole);
//     }
//   }
//
//   loadMore(buildUrl(index), rabbitHole);

  // $(window).on('scroll', infiLoad);

  // $(window).on('scroll', function() {
  //   console.log('scroll');
  //   if ($(window).scrollTop() + $(window).height() >= 0.8 * $(document).height()) {
  //     $(window).unbind('scroll');
  //   }
  // });

  // function withResponse(response) {
  //   $('#grid').append(response);
  //   $('#grid').justifiedGallery('norewind');
  // }

  // function onScroll() {
  //   if ($(window).scrollTop() + $(window).height() >= 0.8 * $(document).height()) {
  //     $(window).unbind('scroll');
  //     loadMore(buildUrl(index++), function (response) {
  //       withResponse(response);
  //       $(window).on('scroll', onScroll);
  //     });
  //   }
  // }

  // $('#grid').justifiedGallery().on('jg.complete', function (e) {
  //   console.log('complete');
  //   init = ($(document).height() <= $(window).height());
  //   if ($(document).height() <= $(window).height()) {
  //     loadMore(buildUrl(index++), withResponse);
  //   } else {
  //     $('#grid').justifiedGallery().on('jg.complete', function (e) {
  //     });
  //   }
  // });

  // $('#grid').justifiedGallery().on('jg.complete', function (e) {
  //   console.log('complete');
  //   if ($(document).height() <= $(window).height()) {
  //     loadMore(buildUrl(++index), withResponse);
  //   }
  // });

  // $('#grid').justifiedGallery().on('jg.rowflush', function (e) {
  //   console.log('rowflush');
  //   if ($(document).height() <= $(window).height()) {
  //     loadMore(buildUrl(++index), withResponse);
  //   }
  // });

  // while (init) {

  // loadMore(buildUrl(index++), withResponse);

  // $(window).on('scroll', onScroll);

  // }

//   var urls = [];
//
//   for (var idx = 0; idx < more; ++idx) {
//     urls.push(buildUrl(idx));
//   }
//
//   loadMore(urls, function(results) {
//     for (idx in results) {
//       console.log(results[idx]);
//       $('#grid').append(results[idx]);
//     }
//   });

  initPage(10);
});
