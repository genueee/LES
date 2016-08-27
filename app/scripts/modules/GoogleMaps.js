App.GoogleMaps = (function($, App){
  var Module = function(element, options){
    if (!window.google) {
      console.warn('Sorry! Google maps is not loaded')
      return;
    }

    this.options = {
      maxLimitAutoZoom: 9,
      offset: {
        x: 0,
        y: -20
      },
      map: {
        // По дефолту центр - Москва
        draggable: !App.supports.touch || false,
        scrollwheel: false,
        center: {
          lat: 55.755826,
          lng: 37.6173
        },
        zoom: 9,
        disableDefaultUI: true,
        styles: [
          {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#444444"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
              {
                "color": "#f2f2f2"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
              {
                "saturation": -100
              },
              {
                "lightness": 45
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
              {
                "color": "#004d32"
              },
              {
                "visibility": "on"
              }
            ]
          }
        ]
      }
    };

    if (options) this.options = $.extend({}, this.options, options);

    this.element = element;
    this.$element = $(element);

    var markers = this.$element.data('markers');

    if (markers && markers.length) {
      this.markers = markers;
    }

    var center = this.$element.data('center');

    if (center && center.lat && center.lng) {
      this.options.map.center.lat = center.lat * 1;
      this.options.map.center.lng = center.lng * 1;
    }

    var maxLimitAutoZoom = this.$element.data('max-limit-autozoom');

    if (maxLimitAutoZoom) {
      this.options.maxLimitAutoZoom = maxLimitAutoZoom;
    }

    var offset = this.$element.data('offset');

    if (offset) {
      if (offset.x) this.options.offset.x = offset.x;
      if (offset.y) this.options.offset.y = offset.y;
    }

    this.map = undefined;
    this.LatLngList = [];

    // Внутренний класс для создания кастомных маркеров на карте
    this.CustomMarker = (function(){
      var SubModule = function(latlng, map, args){
        this.latlng = latlng;
        this.args = args;

        this.setMap(map);
      }

      SubModule.prototype = new google.maps.OverlayView();

      SubModule.prototype.draw = function(){
        var self = this,
          div = this.div;

        if (!div) {
          var className = this.args.className ? this.args.className : 'gmaps-marker';

          div = this.div = document.createElement('div');
          div.className = className;

          innerDiv = document.createElement('div');
          innerDiv.className = className + '__inner';

          div.style.position = 'absolute';

          div.appendChild(innerDiv);

          if (typeof(self.args.markerId) !== 'undefined') {
            div.dataset.markerId = self.args.markerId;
          }

          if (typeof(self.args.label) !== 'undefined') {
            innerDiv.innerHTML = self.args.label;
          }

          var panes = this.getPanes();
          panes.overlayImage.appendChild(div);
        }

        this.setPosition();
      };

      SubModule.prototype.remove = function(){
        if (this.div) {
          this.div.parentNode.removeChild(this.div);
          this.div = null;
        }
      };

      SubModule.prototype.setPosition = function(){
        var div = this.div;
        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

        if (point) {
          div.style.left = (point.x - div.clientWidth / 2) + 'px';
          div.style.top = (point.y - div.clientHeight) + 'px';
        }
      };

      SubModule.prototype.getPosition = function(){
        return this.latlng;
      };

      return SubModule;
    })();

    this.init();
  }

  Module.prototype = {
    init: function(){
      if (this.markers) {
        var mapOptions = $.extend({}, this.options.map);

        mapOptions.center = new google.maps.LatLng(mapOptions.center.lat, mapOptions.center.lng);

        this.map = new google.maps.Map(this.element, mapOptions);

        this.addMarkers();

        this.bind();
      }
    },

    bind: function(){
      var resizeTimeout,
        windowWidth = App.$win.width();

      App.$win.on('resize', function(){
        if (resizeTimeout) clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(function(){
          if (windowWidth !== App.$win.width()) {
            windowWidth = App.$win.width();
            this.setCenter();
          }
        }.bind(this), 600);
      }.bind(this));
    },

    addMarkers: function(){
      this.markers.forEach(function(marker, i){
        var options = {};

        if (marker.id) {
          options.markerId = marker.id;
        }

        if (marker.label) {
          options.label = marker.label;
        }

        if (marker.className) {
          options.className = marker.className;
        }

        this.addMarker(marker.lat, marker.lng, options);
      }.bind(this));

      this.setCenter();
    },

    addMarker: function(lat, lng, args){
      var latLng = new google.maps.LatLng(lat * 1, lng * 1);

      this.LatLngList.push(latLng);

      new this.CustomMarker(
        latLng,
        this.map,
        args
      );
    },

    setCenter: function(){
      var offsetX = this.options.offset.x,
        offsetY = this.options.offset.y;

      var latlngbounds = new google.maps.LatLngBounds();

      this.LatLngList.forEach(function(latLng){
        latlngbounds.extend(latLng);
      });

      google.maps.event.addListenerOnce(this.map, 'bounds_changed', function(e){
        this.map.setZoom(Math.min(this.options.maxLimitAutoZoom, this.map.getZoom()));
        this.offsetCenter(latlngbounds.getCenter(), offsetX, offsetY);
      }.bind(this));

      this.map.fitBounds(latlngbounds);
    },

    // http://stackoverflow.com/questions/10656743/how-to-offset-the-center-point-in-google-maps-api-v3
    offsetCenter: function(latlng, offsetx, offsety){
      // latlng is the apparent centre-point
      // offsetx is the distance you want that point to move to the right, in pixels
      // offsety is the distance you want that point to move upwards, in pixels
      // offset can be negative
      // offsetx and offsety are both optional

      var scale = Math.pow(2, this.map.getZoom());

      var worldCoordinateCenter = this.map.getProjection().fromLatLngToPoint(latlng);
      var pixelOffset = new google.maps.Point((offsetx/scale) || 0,(offsety/scale) ||0)

      var worldCoordinateNewCenter = new google.maps.Point(
        worldCoordinateCenter.x - pixelOffset.x,
        worldCoordinateCenter.y + pixelOffset.y
      );

      var newCenter = this.map.getProjection().fromPointToLatLng(worldCoordinateNewCenter);

      this.map.panTo(newCenter);
    }
  };

  return Module;
})(jQuery, App);