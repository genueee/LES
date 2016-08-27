App.Slider = (function($, App){
  var Module = function(element, options){
    this.options = {
      classes: {
        inited: '__inited',
      },
      selectors: {
        sliderViewer: '.slider__viewer',
        sliderState: '.slider__state',
        sliderStateCurrent: '.slider__state-current',
        sliderStateCount: '.slider__state-count'
      },
      state: true,
      stateTemplate: '' +
        '<div class="slider__state">' +
          '<span class="slider__state-current"></span>' +
          ' из ' +
          '<span class="slider__state-count"></span>' +
        '</div>'
    };

    if (options) this.options = $.extend({}, this.options, options);

    this.elements = {};
    this.elements.slider = $(element);

    this.init();
  };

  Module.prototype = {
    init: function(){
      var self = this,
        options = self.options,
        classes = options.classes,
        selectors = options.selectors,
        elements = self.elements;

      elements.sliderViewer = elements.slider.find(selectors.sliderViewer);

      if (self.options.state) {
        this.renderState();
        elements.sliderStateCurrent = elements.slider.find(selectors.sliderStateCurrent);
        elements.sliderStateCount = elements.slider.find(selectors.sliderStateCount);
      }

      this.bind();

      if (options.slick) {
        elements.sliderViewer.slick(options.slick);
      } else {
        elements.sliderViewer.slick();
      };
    },

    renderState: function(current, count){
      var self = this;

      self.elements.slider.prepend(self.options.stateTemplate);
    },

    bind: function(){
      var self = this,
        classes = self.options.classes,
        elements = self.elements;

      if (self.options.state) {
        var handleSlider = function(event, slick, currentSlide, nextSlide){
          var currentSlide = (event.type == 'beforeChange') ? nextSlide : currentSlide,
            count = self.getStateCount(slick.slideCount, slick.options.slidesToScroll),
            current = self.getStateCurrent(currentSlide, slick.slideCount, count);

          elements.sliderStateCurrent.text(current);
          elements.sliderStateCount.text(count);

          if (event.type == 'init') elements.slider.addClass(classes.inited);
        };

        elements.sliderViewer.on('init reInit beforeChange', handleSlider);
      } else {
        elements.sliderViewer.on('init', function(){
          elements.slider.addClass(classes.inited);
        });
      }
    },

    getStateCount: function(slideCount, slidesToScroll){
      return Math.ceil(slideCount / slidesToScroll);
    },

    getStateCurrent: function(currentSlide, slideCount, convertedCount){
      var i = (currentSlide ? currentSlide : 0) + 1;

      return Math.ceil(i * convertedCount / slideCount);
    }
  };

  return Module;
})(jQuery, App);