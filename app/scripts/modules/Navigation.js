App.Navigation = (function($, App){
  var Module = function(options){
    this.options = {
      classes: {
        open: '__nav-open'
      },
      selectors: {
        nav: '[data-nav]',
        navOpen: '[data-nav-open]',
        navClose: '[data-nav-close]'
      }
    };

    if (options) this.options = $.extend({}, this.options, options);

    this.elements = {};

    this.init();
  };

  Module.prototype = {
    init: function(){
      var selectors = this.options.selectors;

      this.elements.nav = $(selectors.nav);
      this.elements.navOpen = $(selectors.navOpen);
      this.elements.navClose = $(selectors.navClose);

      this.bind();
    },

    bind: function(){
      var elements = this.elements;

      elements.navOpen.on('click', function(e){
        this.open();
        e.preventDefault();
      }.bind(this));

      elements.navClose.on('click', function(e){
        this.close();
        e.preventDefault();
      }.bind(this));
    },

    open: function(){
      $('html').addClass(this.options.classes.open);
    },

    close: function(){
      $('html').removeClass(this.options.classes.open);
    }
  };

  return Module;
})(jQuery, App);