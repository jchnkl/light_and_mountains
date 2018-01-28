$(document).ready(function() {

  function loadImages(loadMoreFn, start, n) {
  // function loadImages(update_fn, start, n) {
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

      // update_fn();
      $('#lam-gallery').justifiedGallery('norewind');
			$(window).scroll(loadMoreFn);

    });

		console.log("return " + (start + n));
    return start + n;
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
		/*
    return function() {
      $('#lam-gallery').justifiedGallery('norewind');
    }
		*/
  }

	// var update_fn = initGallery();

  // start to build gallery

	// function runGallery() {

	initGallery();

	var lam_index = loadImages(loadMore(0.9), 0, 20);

	function loadMore(at) {
		if ($(window).scrollTop() + $(window).height() >= at * $(document).height()) {
			console.log("$(window).scrollTop(): " + $(window).scrollTop()); 
			console.log("$(window).height(): " + $(window).height()); 
			console.log("$(document).height(): " + $(document).height()); 
			$(window).unbind('scroll');
			lam_index = loadImages(loadMore(at), lam_index, 10);
		}
	}

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