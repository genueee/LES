/*========================================
// Vendor
========================================*/

require('./vendor.js');


/*========================================
// Setup
========================================*/

window.App = {
  $win: $(window),
  $doc: $(document)
};


/*========================================
// Modules
========================================*/

require('./modules/Navigation.js');
require('./modules/Slider.js');
require('./modules/GoogleMaps.js');
require('./modules/GoogleMapsLoader.js');
require('./modules/ProductTipsy.js');
require('./modules/ProductWeightSlider.js');
require('./modules/IconMixer.js');


/*========================================
// Run
========================================*/

(function(){
  var isTouch = function(){
    return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
  };

  App.supports = {
    touch: isTouch()
  };

  App.$html = $('html');

  App.$html.removeClass('__no-js').addClass('__js');
  App.$html.addClass(App.supports.touch ? '__touch' : '__no-touch');

  App.$doc.ready(function(){
    // Mobile site navigation
    var navigation = new App.Navigation();

    $('[data-hero-slider]').addClass('__inited').slick();

    $('[data-post-slider]').each(function(){
      var slider = new App.Slider(this, {
        slick: {
          infinite: false,
          slidesToShow: 3,
          slidesToScroll: 3,
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 544,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        }
      });
    });

    $('[data-single-slider]').each(function(){
      var slider = new App.Slider(this, {
        slick: {
          infinite: false
        }
      });
    })


    var $googleMap = $('[data-google-map]');

    if ($googleMap.length) {
      App.GoogleMapsLoader({key: 'AIzaSyA634wNXTYsK7CkuyO0aOhWZ0ET32Rznvw'});

      $(window).on('googleMaps:loaded', function(){
        $googleMap.each(function(){
          new App.GoogleMaps(this);
        });
      });
    }



    $('[data-icon-mix]').each(function(){
      var $this = $(this);

      if ($this.data('icon-mix') == 'error-layout') {
        new App.IconMixer($this, {
          icons: [
            'tree-1', 'tree-2', 'tree-3', 'tree-5', 'tree-6', 'tree-7', 'tree-8'
          ],
          quantity: App.supports.touch ? 10 : 30
        });
      }
    });


    $('[data-product-tipsy]').each(function(){
      new App.ProductTipsy(this);
    });


    $('[data-product-weight-slider]').each(function(){
      new App.ProductWeightSlider(this);
    });
  });
})();