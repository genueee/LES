App.ProductWeightSlider = (function($, App){
  var Module = function(slider, options){
    this.options = {
      classes: {
        first: '__first',
        last: '__last',
        active: '__active'
      },
      prefix: '',
      values: [0, 100],
      start: 0
    };

    this.sliderOptions = {
      step: 1,
      start: this.options.start,
      range: {
        min: this.options.values[0],
        max: this.options.values[1]
      },
      pips: {
        mode: 'positions',
        values: [0, 100],
      }
    };

    if (options) this.options = $.extend({}, this.options, options);

    this.elements = {};

    this.elements.slider = slider;
    this.elements.$slider = $(slider);

    if (options) {
      this.setSliderOptions(this.options);
    }

    this.setSliderOptions({
      values: this.elements.$slider.data('values'),
      start: this.elements.$slider.data('start')
    });

    var prefix = this.elements.$slider.data('prefix');

    if (prefix) {
      this.options.prefix = prefix;
    }

    this.init();
  };

  Module.prototype = {
    init: function(){
      var self = this,
        classes = self.options.classes,
        elements = self.elements;

      noUiSlider.create(elements.slider, self.sliderOptions);

      elements.$sliderValues = elements.$slider.find('.noUi-value-large');
      elements.$sliderValues.eq(0).addClass(classes.first);
      elements.$sliderValues.eq(-1).addClass(classes.last);

      if (self.options.prefix.trim() !== '') {
        elements.$sliderValues.each(function(){
          var $this = $(this);

          $this.html($this.text() + '&nbsp;' + self.options.prefix);
        })
      }

      self.activateValue(elements.$sliderValues.eq(self.getIndexToActivateValue()));

      self.bind();
    },

    bind: function(){
      var self = this,
        elements = self.elements,
        values = self.options.values;

        elements.slider.noUiSlider.on('update', function (value) {
          self.activateValue(elements.$sliderValues.eq(self.getIndexToActivateValue()));

          var input = $('input',elements.slider).get(0);
          if(input){
            input.value = parseInt(value.pop(),10);
            if ("createEvent" in document) {
              var event = document.createEvent("HTMLEvents");
              event.initEvent("change", false, true);
              input.dispatchEvent(event);
            }
            else {
              input.fireEvent("onchange");
            }
          }
        });

      elements.$sliderValues.each(function(i){
        var $this = $(this);

        $this.on('click', function(){
          elements.slider.noUiSlider.set(values[i]);
          self.activateValue($this);
        });
      })
    },

    setSliderOptions: function(options){
      var values = options.values,
        start = options.start;

      if (values && values.length) {
        var lenValues = values.length,
          tempRange = {};

        if (lenValues < 2) {
          tempRange.min = values[0];
          tempRange.max = values[lenValues - 1];
        } else {
          var tempPipsValues = [];

          values.forEach(function(value, i){
            var tempRangeRow = [];

            tempRangeRow.push(values[i]);
            if (values[i + 1]) tempRangeRow.push(values[i + 1] - values[i]);

            if (i == 0) {
              tempRange.min = tempRangeRow;
            } else if (i == lenValues - 1) {
              tempRange.max = tempRangeRow;
            } else {
              tempRange[100 / (lenValues - 1) * i + '%'] = tempRangeRow;
            }

            tempPipsValues.push(100 / (lenValues - 1) * i);
          });

          this.sliderOptions.pips.values = tempPipsValues;
        }

        this.sliderOptions.range = tempRange;
        this.options.values = values;
      }

      if (start) {
        if (start < this.options.values[0]) {
          this.sliderOptions.start = this.options.values[0];
        } else {
          this.sliderOptions.start = start;
        }

        this.options.start = this.sliderOptions.start;
      }
    },

    getIndexToActivateValue: function(){
      var value = parseInt(this.elements.slider.noUiSlider.get());

      return this.options.values.indexOf(value);
    },

    activateValue: function($target){
      var activeClass = this.options.classes.active;

      this.elements.$sliderValues.filter('.' + activeClass).removeClass(activeClass);
      $target.addClass(activeClass);
    }
  };

  return Module;
})(jQuery, App);