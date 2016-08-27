App.GoogleMapsLoader = (function($, App){
  var instance,
    isLoaded = false;

  window.onLoadGoogleMaps = function(){
    if (!isLoaded) {
      isLoaded = true;


      $(window).trigger('googleMaps:loaded');
    }
  };

  var Module = function(options){
    this.options = {
      url: 'https://maps.googleapis.com/maps/api/js?v=3.exp'
    };

    if (options) this.options = $.extend({}, this.options, options);

    if (this.options.key) {
      this.options.url += '&key=' + this.options.key;
    }

    this.init();
  };

  Module.prototype = {
    init: function(){
      var self = this,
        options = self.options,
        classes = options.classes,
        selectors = options.selectors,
        elements = self.elements;

      if (!isLoaded) this.load();
    },

    load: function(){
      var self = this,
        options = self.options;

      if (isLoaded) return;

      var script = document.createElement('script');

      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', self.options.url + '&callback=onLoadGoogleMaps');

      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script);
    }
  };

  function createInstance(options){
    return new Module(options);
  }

  function init(options){
    if (!instance) {
      instance = createInstance(options);
      return instance;
    } else {
      console.log('OOPS! Scripts have been loaded.');
    }
  }

  return init;
})(jQuery, App);