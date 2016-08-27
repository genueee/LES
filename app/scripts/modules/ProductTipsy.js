App.ProductTipsy = (function($, App){
  var Module = function(element, options){
    this.options = {
      classes: {
        open: '__open'
      },
      selectors: {
        tipsy: '[data-product-tipsy]',
        toggle: '[data-product-tipsy-toggle]',
        popup: '[data-product-tipsy-popup]',
        arrow: '[data-product-tipsy-popup-arrow]'
      }
    };

    if (options) this.options = $.extend({}, this.options, options);

    this.elements = {};

    this.elements.$tipsy = $(element);

    this.isOpen = false;

    this.init();
  };

  Module.prototype = {
    init: function(){
      var self = this,
        classes = self.options.classes,
        selectors = self.options.selectors,
        elements = self.elements;

      elements.$toggle = elements.$tipsy.find(selectors.toggle);
      elements.$popup = elements.$tipsy.find(selectors.popup);
      elements.$arrow = elements.$tipsy.find(selectors.arrow);

      this.getPositions();

      self.bind();
    },

    bind: function(){
      var self = this,
        classes = self.options.classes,
        selectors = self.options.selectors,
        elements = self.elements;

      if (App.supports.touch) {
        var isClicked = false;

        $(window).on('productTipsy:close', function(){
          if (!isClicked) self.close();

          isClicked = false;
        });

        App.$doc.on('click', function(e){
          self.close();

          if ($(e.target).is(selectors.tipsy) || $(e.target).closest(selectors.tipsy).length) {
            self.noPropagation(e);
          }
        });

        elements.$toggle.on('click', function(e){
          isClicked = true;
          self.toggle();
          $(window).trigger('productTipsy:close');
          self.noPropagation(e);
        });
      } else {
        elements.$toggle.on('click', function(e){
          self.noPropagation(e);
        });

        elements.$toggle.on('mouseenter', function(){
          self.open();
        });

        elements.$toggle.on('mouseleave', function(){
          self.close();
        });
      }

      App.$win.on('resize', function(){
        self.close();
      });
    },

    open: function(){
      this.getPositions();
      this.elements.$tipsy.addClass(this.options.classes.open);
      this.isOpen = true;
    },

    close: function(){
      this.elements.$tipsy.removeClass(this.options.classes.open);
      this.isOpen = false;
    },

    toggle: function(){
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },

    getPositions: function(){
      var self = this,
        classes = self.options.classes,
        elements = self.elements,
        visiblePopup = elements.$popup.is(':visible');

      if (!visiblePopup) {
        elements.$tipsy.addClass(classes.open);
      }

      this.widthToggle = elements.$toggle.outerWidth();
      this.widthPopup = elements.$popup.outerWidth();
      this.widthArrow = elements.$arrow.outerWidth();

      this.leftPopup = -(this.widthPopup / 2) + (this.widthToggle / 2);
      this.leftArrow = (this.widthPopup / 2) - (this.widthArrow / 2);

      // Чтобы проще рассчитать offset попапа
      elements.$popup.css({
        left: this.leftPopup
      });

      var windowWidth = App.$win.width(),
        offsetToggle = elements.$toggle.offset().left,
        offsetPopup = elements.$popup.offset().left;

      if (offsetPopup + this.widthPopup > windowWidth) {
        this.leftPopup = this.leftPopup - (offsetPopup + this.widthPopup - windowWidth);
        this.leftArrow = Math.abs(this.leftPopup + this.widthToggle / 2 - this.widthArrow / 2);
      }

      if (offsetPopup < 0) {
        this.leftPopup = this.leftPopup - offsetPopup;
        this.leftArrow = Math.abs(this.leftPopup + this.widthToggle / 2 - this.widthArrow / 2);
      }

      elements.$popup.css({
        left: this.leftPopup
      });

      elements.$arrow.css({
        left: this.leftArrow
      });

      if (!visiblePopup) {
        elements.$tipsy.removeClass(classes.open);
      }
    },

    noPropagation: function(e){
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return Module;
})(jQuery, App);