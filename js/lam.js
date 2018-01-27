$(document).ready(function() {

  function loadImages(update_fn, start, n) {
  // function loadImages(lightbox, start, n) {
    var promises = [];

    for (var i = start; i < start + n; ++i) {
      url = 'gallery/img_' + ("0000" + i).slice(-4) + '.html';
      promises.push($.ajax(url))
    }

		console.log("Before when...");
    $.when.apply($, promises).then(function() {
      results = arguments;
      for (idx in arguments) {
        $('#lam-gallery').append(arguments[idx][0]);
      }
			console.log("When then done...");

			// lightbox.destroy();
			// lightbox = $('#lam-gallery a').simpleLightbox();
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

    // initialize simpleLightbox
    var lightbox = $('#lam-gallery a').simpleLightbox();

    console.log('initGallery()')
    return function() {
      console.log('update_fn()')
      $('#lam-gallery').justifiedGallery('norewind');
      lightbox.destroy();
			lightbox = $('#lam-gallery a').simpleLightbox();
    }
  }

	/*
  function on_update(lightbox) {
    return function() {
      $('#lam-gallery').justifiedGallery('norewind');
      lightbox.refresh();
    }
  }

  // start to build gallery

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
	*/

  // initialize simpleLightbox
  // var lightbox = $('#lam-gallery a').simpleLightbox();

  var update_fn = initGallery();

  var lam_index = loadImages(update_fn, 0, 20);

	/*
  $('#lam-gallery a').on('error.simplelightbox', function (e) {
    console.log(e);
  });

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function demo() {
		console.log('Taking a break...');
		await sleep(3000);
	loadImages(lightbox, 10, 20);
	loadImages(lightbox, 30, 39);
	loadImages(lightbox, 50, 59);
	loadImages(lightbox, 70, 79);
		console.log('Two second later');
	}

	loadImages(lightbox, 0, 10);
	loadImages(lightbox, 20, 29);
	loadImages(lightbox, 40, 49);
	loadImages(lightbox, 60, 69);
	loadImages(lightbox, 80, 89);
	// console.log("Sleeping...");
	demo();
	// console.log("Continue");
	// lightbox.destroy();
  // var lightbox = $('#lam-gallery a').simpleLightbox();
	*/

	/*
  function loadGallery() {
		var update_fn = initGallery();
    lam_index = loadImages(update_fn, 0, 20);
    return function() {
      loadImages(update_fn, lam_index, 10);
    }
  }

	var loadMore = loadGallery();
	*/

  $(window).scroll(function() {
    if ($(window).scrollTop() + $(window).height() == $(document).height()) {
			// loadMore();
      lam_index = loadImages(update_fn, lam_index, 10);
    }
  });

});
