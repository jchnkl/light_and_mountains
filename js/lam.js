function loadImages(start, n) {
  console.log("loadImages(" + start + ", " + n + ")");
  var promises = [];

  for (var i = start; i < start + n; ++i) {
    url = 'gallery/img_' + ("0000" + i).slice(-4) + '.html';
    promises.push($.ajax(url))
  }

  return [start + n, promises];
}

function handleImages(promises, img_idx) {
  console.log("handleImages(promises, " + img_idx + ", cbFn)");

  $.when.apply($, promises).then(function() {
    results = arguments;
    for (idx in arguments) {
      $('#lam-gallery').append(arguments[idx][0]);
    }

    $('#lam-gallery').justifiedGallery('norewind');
    // console.log("handleImages(..): cbFn");
    // cbFn(img_idx);

  });
}

function scrollEventHandler() {
  console.log("scrollEventHandler");
  // $(window).unbind('scroll');
  $(window).on('scroll', function() {
    if ($(window).scrollTop() + $(window).height() >= 0.8 * $(document).height()) {
    console.log("$(window).scrollTop() + $(window).height() = " + ($(window).scrollTop() + $(window).height()));
    console.log("0.8 * $(document).height() = " + 0.8 * $(document).height());
    console.log("$(document).height() = " + $(document).height());
      // if ($(window).scrollTop() + $(window).height() == 0.8 * $(document).height()) {
      $(window).unbind('scroll');
      [next_idx, promises] = loadImages(img_idx, 10);
      handleImages(promises, next_idx);
      // }
    }
  });
}

// initialize justifiedGallery
function initGallery() {
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
}

// $(window).on("load", function() {
//   console.log("$(window).on(load, ..)");
//   scrollEventHandler;
// });

$(document).ready(function() {

  scrollEventHandler();

  initGallery();

  [img_idx, promises] = loadImages(0, 20);

  handleImages(promises, img_idx);

  // updateFn(20)

  // handleImages(promises, function() {
  //   $('#lam-gallery').justifiedGallery('norewind');
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

});
