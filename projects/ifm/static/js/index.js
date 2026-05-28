window.HELP_IMPROVE_VIDEOJS = false;


// Lazy-load videos and only play them while they are in the viewport.
// Sources use `data-src` instead of `src`, so nothing downloads until the
// video scrolls into view (avoids loading every video on page load).
function playPauseVideo() {
  let videos = document.querySelectorAll("video");
  let observer = new IntersectionObserver(
      (entries) => {
          entries.forEach((entry) => {
              let video = entry.target;
              if (entry.isIntersecting) {
                  // Swap data-src -> src and load the first time it enters view
                  if (!video.dataset.loaded) {
                      video.querySelectorAll("source[data-src]").forEach((s) => {
                          s.src = s.getAttribute("data-src");
                      });
                      video.load();
                      video.dataset.loaded = "1";
                  }
                  // We can only autoplay without interaction if the video is muted
                  video.muted = true;
                  let playPromise = video.play();
                  if (playPromise !== undefined) {
                      playPromise.catch(() => {});
                  }
              } else if (!video.paused) {
                  video.pause();
              }
          });
      },
      { threshold: 0.25, rootMargin: "200px 0px" }
  );
  videos.forEach((video) => observer.observe(video));
}

// modified from https://camp-nerf.github.io/ 
class TabsWidget {
  constructor(container) {
    this.container = container;
    this.activeIndex = 0;
    this.listItems = container.children('.tabs').children('ul').children('li');
    let self = this;
    this.listItems.click(function (e) {
      let index = $(this).index();
      self.update($(this), index);
    })

    this.update(this.listItems[this.activeIndex], this.activeIndex);
  }

  update(element, targetIndex) {
    this.activeIndex = targetIndex;
    const tabs = this.container.children('.tabs');
    const tabsContent = this.container.children('.tabs-content');
    this.listItems.each(function () {
      if ($(this).index() == targetIndex) {
        $(this).addClass('is-active');
      } else {
        $(this).removeClass('is-active');
      }
    });
    tabsContent.children().each(function () {
      if ($(this).index() == targetIndex) {
        $(this).show();
        $(this).find('*').each(function () {
          if ($(this).is(':visible')) {
            $(this).trigger('tab:show');
          }
        })
      } else {
        $(this).hide();
        $(this).find('*').trigger('tab:hide');
      }
    });
  }
}

// ready function
$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			// slidesToShow: 3,
      slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }
    bulmaSlider.attach();

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/  

    // from other repos    
    $('.tabs-widget').each(function() {
      const containerElement = $(this);
      tabsWidget = new TabsWidget(containerElement);
    });
    playPauseVideo();
})



