var _index = 0;

var _lazyLoad = new LazyLoad(
  // { threshold: -300
  { threshold: 300
  // , container: document.getElementById('grid')
  // , elements_selector: 'div, img'
  // , elements_selector: 'img'
  // , elements_selector: '.grid-box, img'
  , callback_enter: function() { console.log('callback_enter'); }
  , callback_set: function() { console.log('callback_set'); }
  , callback_load: function() { console.log('callback_load'); }
  , callback_error: function() { console.log('callback_error'); }
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

function loadMore(success) {
  return $.ajax({
    url: 'html/img_' + ("0000" + nextIndex()).slice(-4) + '.html',
    success: success
    // function(response) {
    //   // console.log(response);
    //   // var e = document.createElement("div");
    //   // e.className = "subgrid";
    //   // e.innerHTML = response;
    //   // document.getElementById("grid").appendChild(e);
    //   document.getElementById("grid").innerHTML += response;
    //   _lazyLoad.update();
    //   cb();
    // }
  });
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


$(document).ready(function() {

  loadMore(function(response) {

    var imgs = document.createElement('div');
    imgs.innerHTML = response;

    // console.log(e.children);

    // console.log(document.getElementById("grid").children.length);
    // var grid = document.getElementById('grid');
    // console.log(grid
    // var children = document.getElementById('grid').children;
    // console.log(children);

    aspects = [];
    for (var i = 0; i < imgs.children.length; ++i) {
      // console.log(imgs.children[i].children);
      aspects.push(parseFloat(imgs.children[i].children[0].dataset.aspect));
    }

    var grid = document.getElementById('grid');

    var layoutGeometry = require('justified-layout')(aspects,
      { containerWidth: grid.clientWidth });

    // console.log(aspects);
    // console.log(layoutGeometry.boxes);

    // for (var i = 0; i < aspects.length; ++i) {
    //   console.log(aspects[i] == layoutGeometry.boxes[i].aspectRatio)
    // }

    // var boxes = layoutGeometry.boxes.map(function(box) {
    //   var style=`width: ${box.width}px; height: ${box.height}px; top: ${box.top}px; left: ${box.left}px"`;
    //   return '<div class="box" style="' + style + '"></div>"
    // }).join('\n')

    // console.log(layoutGeometry.boxes.length)
    // console.log(imgs.children.length)

    images = [];
    for (var i = 0; i < imgs.children.length; ++i) {
      var img = imgs.children[i].children[0];
      var box = layoutGeometry.boxes[i];
      var style=`width: ${box.width}px; height: ${box.height}px; top: ${box.top}px; left: ${box.left}px`;
      // imgs.children[i].style.cssText = style;
      // img.className = 'grid-image';
      img.style.cssText = style;
      // grid.appendChild(img);
      // console.log(img);
      // console.log(i);
      // console.log(imgs.children[i]);
      images.push(imgs.children[i]);
      // grid.appendChild(imgs.children[i]);
    }
      // console.log(imgs.children[i]);
      // console.log('images');
      // console.log(images);

    images.forEach(function(image) {
      grid.appendChild(image);
    });

    // grid.appendChild(imgs);

    // for (var i = 0; i < layoutGeometry.boxes.length; ++i) {
    //   console.log(i);
    //   var box = layoutGeometry.boxes[i];
    //   var img = imgs.children[i];
    //   // console.log(img);
    //   var style=`width: ${box.width}px; height: ${box.height}px; top: ${box.top}px; left: ${box.left}px`;
    //
    //   img.style.cssText = style;
    //
    //   // grid.appendChild(img);
    //
    //   // html = '<div style="' + style + '">' + img + '</div>';
    //   // console.log(html);
    //   // grid.innerHTML += '<div class="grid-box" style="' + style + '">' + img + '</div>';
    //
    //   // var e = document.createElement('div');
    //   // e.className = 'grid-box';
    //   // e.style.cssText = `width: ${box.width}px; height: ${box.height}px; top: ${box.top}px; left: ${box.left}px`;
    //
    //   // // try {
    //   // e.appendChild(img);
    //   // // } catch (err) {
    //   // //   console.log(err);
    //   //   console.log(img);
    //   // // }
    //
    //   // e.innerHTML = img;
    //   // grid.appendChild(e);
    //   // console.log(img);
    // }

    // grid.innerHTML = boxes;

    _lazyLoad.update();

  });

});
