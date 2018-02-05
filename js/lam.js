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

    // $('.lam-gallery').justifiedGallery('norewind');
    // console.log("handleImages(..): cbFn");
    // cbFn(img_idx);

  // console.log("handleImages(..) -> when callback: call isotope");

  // $('.lam-gallery').imagesLoaded().progress(function() {
  //   $('.lam-gallery').isotope({
  //     // options
  //     itemSelector: '.lam-gallery-item',
  //     layoutMode: 'masonry',
  //     percentPosition: true,
  //     masonry: {
  //       // use element for option
  //       columnWidth: '.lam-gallery-sizer'
  //     }
  //   });
  // });

  // $lam_gallery.isotope('masonry');

    // // init Isotope
    // var $grid = $('.lam-gallery').isotope({
    //   itemSelector: '.lam-gallery-item',
    //   percentPosition: true,
    //   masonry: {
    //     columnWidth: '.lam-gallery-sizer'
    //   }
    // });

    // // layout Isotope after each image loads
    // $grid.imagesLoaded().progress( function() {
      // $grid.isotope('layout');
    // });

    // imagesLoaded('.lam-gallery', function() {
    //   // images have loaded
    //   $grid.isotope('layout');
    // });

    // var $grid = $('.lam-gallery').isotope({
    //   // itemSelector: '.lam-gallery-item',
    //   layoutMode: 'packery',
    //   percentPosition: true,
    //   packery: {
    //     gutter: 10,
    //     columnWidth: '.lam-gallery-sizer'
    //   }
    // });

    // $grid.imagesLoaded().progress(function() {
    //   $grid.packery();
    // });

    // var grid = new Muuri('.lam-gallery');

    // var grid = new Muuri({
    //   container: document.getElementsByClassName('lam-gallery')[0],
    //   items: document.getElementsByClassName('lam-gallery-item')
    // });

// function scrollEventHandler() {
//   console.log("scrollEventHandler");
//   // $(window).unbind('scroll');
//   $(window).on('scroll', function() {
//     if ($(window).scrollTop() + $(window).height() >= 0.8 * $(document).height()) {
//     console.log("$(window).scrollTop() + $(window).height() = " + ($(window).scrollTop() + $(window).height()));
//     console.log("0.8 * $(document).height() = " + 0.8 * $(document).height());
//     console.log("$(document).height() = " + $(document).height());
//       // if ($(window).scrollTop() + $(window).height() == 0.8 * $(document).height()) {
//       $(window).unbind('scroll');
//       [next_idx, promises] = loadImages(img_idx, 10);
//       handleImages(promises, next_idx);
//       // }
//     }
//   });
// }

// initialize justifiedGallery
function initGallery() {
  $('#lam-gallery').justifiedGallery({
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
}

// $(window).on("load", function() {
//   console.log("$(window).on(load, ..)");
//   scrollEventHandler;
// });

/*
$(document).ready(function() {
  scrollEventHandler();

  initGallery();

  [img_idx, promises] = loadImages(0, 20);

  handleImages(promises, img_idx);
});
*/

  // updateFn(20)

  // handleImages(promises, function() {
  //   $('.lam-gallery').justifiedGallery('norewind');
  // });

  // handleImages(updateFn, promises);



  // var update_fn = initGallery();

  // start to build gallery

  // function runGallery() {

//   initGallery();
//
//   var lam_index = loadImages(loadMore(0.9), 0, 20);
//
//   function loadMore(at) {
//     if ($(window).scrollTop() + $(window).height() >= at * $(document).height()) {
//       console.log("$(window).scrollTop(): " + $(window).scrollTop()); 
//       console.log("$(window).height(): " + $(window).height()); 
//       console.log("$(document).height(): " + $(document).height()); 
//       $(window).unbind('scroll');
//       lam_index = loadImages(loadMore(at), lam_index, 10);
//     }
//   }

  /*
                $(window).scroll(function() {
                        if ($(window).scrollTop() + $(window).height() == $(document).height() + 100) {
  // if ($(window).scrollTop() + $(window).height() >= 0.9 * $(document).height()) {
                                console.log("$(window).scrollTop(): " + $(window).scrollTop()); 
                                console.log("$(window).height(): " + $(window).height()); 
                                console.log("$(document).height(): " + $(document).height()); 
                                $(window).unbind('scroll');
                                lam_index = loadImages(update_fn, lam_index, 10);
                        }
                });
                */
  // }

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
  // [idx, promises] = loadImages(0, 20);
  // handleImages(promises, idx);
  // $('#grid').isotope({
  //   // options
  //   itemSelector: '.grid-item',
  //   layoutMode: 'masonry'
  // });

  // var justifiedLayout = require('justified-layout');
  // console.log(justifiedLayout([1.33, 1, 0.65]));

  var urlBuilder = function(idx) {
      return 'gallery/img_' + ("0000" + idx).slice(-4) + '.html';
      // return 'json/img_' + ("0000" + idx).slice(-4) + '.json';
  }

  Images.loadMore(30, urlBuilder, function(results) {

    results.forEach(function(result) {
      $('#grid').append(result[0]);
      // $('#grid').append(toHtml(result[0]));
    });

    // var $grid = $('grid').imagesLoaded(function() {
    //   $grid.masonry({
    //     // options
    //     itemSelector: '.grid-item',
    //     columnWidth: 200
    //   });
    // });

    var $grid = $('#grid').packery({
      itemSelector: '.grid-item',
      percentPosition: true
    });

    $grid.imagesLoaded('#grid', function() {
      $grid.packery('layout');
    });

//     // console.log(results);
//
//     aspects = []
//     results.forEach(function(result) {
//       aspects.push(result[0]['i_width'] / result[0]['i_height']);
//     });
//
//     // console.log(aspects);
//
//     var justifiedLayout = require('justified-layout');
//     var geometries = justifiedLayout(aspects, {
//       // fullWidthBreakoutRowCadence: 2
//     });
//
//     // console.log(geometries);
//
//     // geometries.boxes.forEach(function(box) {
//     //   var elem =
//     //   `<div class="box" style="width: ${box.width}px; height: ${box.height}px;
//     //                            top: ${box.top}px; left: ${box.left}px"></div>`;
//     //   $('#grid').append(elem);
//     // });
//
//     for (idx in geometries.boxes) {
//       var imgMeta = results[idx][0];
//       var t = imgMeta['t_dir'] + '/' + imgMeta['t'];
//       var img = '<img src="' + t + '"/>';
//
//       var box = geometries.boxes[idx];
//       var style = `width: ${box.width}px; height: ${box.height}px;
//                    top: ${box.top}px; left: ${box.left}px`
//       var elem = `<div class="box" style="${style}">${img}</div>`;
//
//       $('#grid').append(elem);
//     }

//     results.forEach(function(result) {
//       $('#grid').append(result[0]);
//       // $('#grid').append(toHtml(result[0]));
//     });
//
//     initGallery();

    // $('#grid').justifiedGallery('norewind');
  });

});
