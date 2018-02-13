var _index = 0;

var _resizeTimeout = null;

var _lazyLoad = new LazyLoad(
  // { threshold: -300
  { threshold: 300
  // , container: document.getElementById('grid')
  // , elements_selector: 'div, img'
  // , elements_selector: 'img'
  // , elements_selector: '.grid-box, img'
  // , callback_enter: function() { console.log('callback_enter'); }
  // , callback_set: function() { console.log('callback_set'); }
  // , callback_load: function() { console.log('callback_load'); }
  // , callback_error: function() { console.log('callback_error'); }
  }
);

function getIndex() {
  return _index
}

function nextIndex() {
  return _index++;
}

// function buildUrl(index) {
//   return 'html/img_' + ("0000" + index).slice(-4) + '.html';
// }

// function loadMore(cb) {
//   return $.ajax({
//     url: 'html/img_' + ("0000" + nextIndex()).slice(-4) + '.html',
//     success: cb,
//   });
// }

function loadMore(cb) {
  function handler() {
    if(this.status == 200 && this.responseXML != null) {
      cb(this.responseXML);
    } else {
      console.log(this.statusText)
    }
  }

  var client = new XMLHttpRequest();
  client.responseType = 'document';
  client.onload = handler;
  client.open('GET', 'html/img_' + ("0000" + nextIndex()).slice(-4) + '.html');
  client.send();
}

/*
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
*/

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

/*
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
*/

/*
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
*/

// $(document).ready(function() {

  // $('#grid').justifiedGallery({
  //   selector: 'figure, div:not(.spinner)',
  //   margins: 5,
  //   // rowHeight: 160,
  //   rowHeight: 200,
  //   // cssAnimation: true,
  //   // imagesAnimationDuration: 0,
  //   waitThumbnailsLoad: false,
  //   sizeRangeSuffixes: {
  //     100  : '_t',
  //     240  : '_m',
  //     320  : '_n',
  //     640  : '_z',
  //     1024 : '_b'
  //   }
  // });

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

  // initPage(10);
// });



function resizeHandler() {
  var aspects = [];

  var imgs = document.getElementById('grid').children;

  for (var i = 0; i < imgs.length; ++i) {
    aspects.push(parseFloat(imgs[i].firstElementChild.dataset.aspect));
  }

  var layoutGeometry = require('justified-layout')(aspects,
    { targetRowHeight: 240
    , containerWidth: grid.clientWidth
    });

  for (var i = 0; i < imgs.length; ++i) {
    var box = layoutGeometry.boxes[i];
    var style=`width: ${box.width}px; height: ${box.height}px; top: ${box.top}px; left: ${box.left}px`;
    imgs[i].firstElementChild.style = style;
  }
}

function throttledResizeCb() {
  if (!_resizeTimeout) {
    window.removeEventListener("resize", throttledResizeCb);
    _resizeTimeout = setTimeout(function() {
      _resizeTimeout = null;
      resizeHandler();
      window.addEventListener("resize", throttledResizeCb, false);
    }, 125);
  }
}

// init / main
(function() {

  loadMore(function(response) {

    var imgs = response.activeElement.children;

    aspects = [];
    for (var i = 0; i < imgs.length; ++i) {
      aspects.push(parseFloat(imgs[i].firstElementChild.dataset.aspect));
    }

    var grid = document.getElementById('grid');

    var layoutGeometry = require('justified-layout')(aspects,
      { targetRowHeight: 240
      , containerWidth: grid.clientWidth
      });

    for (var i = 0; i < imgs.length; ++i) {
      var box = layoutGeometry.boxes[i];
      var style=`width: ${box.width}px; height: ${box.height}px; top: ${box.top}px; left: ${box.left}px`;
      // index == 0, because appending to grid removes it from imgs!
      imgs[0].firstElementChild.style = style;
      grid.appendChild(imgs[0]);
    }

    _lazyLoad.update();

  });

  window.addEventListener("resize", throttledResizeCb, false);

}());
