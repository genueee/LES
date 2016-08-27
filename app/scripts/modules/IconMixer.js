App.IconMixer = (function($, App){
  var Module = function(element, options){
    this.options = {
      quantity: 30
    };

    if (options) this.options = $.extend({}, this.options, options);

    if (!this.options.icons) return;

    this.$element = (element instanceof jQuery) ? element : $(element);

    this.init();
  };

  Module.prototype = {
    init: function(){
      var icons = this.options.icons,
        len = icons.length;

      for (var i = 0; i < this.options.quantity; i++) {
        var iconClass = icons[this.getRandom(0, len - 1)],
          $span = $('<span />', {class: iconClass});

        $span.css({
          top: this.getRandom(0, 100) + '%',
          left: this.getRandom(0, 100) + '%'
        });

        this.$element.append($span);
      }
    },

    getRandom: function(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  return Module;
})(jQuery, App);