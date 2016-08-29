App.Field = (function($, App){
  var Module = function(element, options){
    this.options = {
      classes: {
        focus: '__focus'
      },
      selectors: {
        fieldLabel: '[data-field-label]',
        fieldControl: '[data-field-control]'
      }
    };

    if (options) this.options = $.extend({}, this.options, options);

    this.elements = {};

    this.elements.field = $(element);

    this.init();
  };

  Module.prototype = {
    init: function(){
      var selectors = this.options.selectors,
        elements = this.elements;

      elements.fieldLabel = elements.field.find(selectors.fieldLabel);
      elements.fieldControl = elements.field.find(selectors.fieldControl);

      this.bind();
    },

    bind: function(){
      var self = this,
        focusClass = self.options.classes.focus,
        elements = self.elements;

      elements.fieldControl.on('focus', self.handleFocus.bind(this));
      elements.fieldControl.on('blur', self.handleBlur.bind(this));
    },

    handleFocus: function(){
      var self = this,
        focusClass = self.options.classes.focus,
        elements = self.elements;

      if (!elements.field.hasClass(focusClass)) {
        elements.field.addClass(focusClass);
      }
    },

    handleBlur: function(){
      var self = this,
        focusClass = self.options.classes.focus,
        elements = self.elements;

      if (elements.fieldControl.val() == '') {
        elements.field.removeClass(focusClass);
      }
    }
  };

  return Module;
})(jQuery, App);