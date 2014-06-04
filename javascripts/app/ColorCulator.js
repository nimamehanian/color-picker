app.factory('ColorCulator', function ($window) {
  return {
    hue: function (event) {
      // Subtracting 60 to account for width of sidebar
      return Math.round(((event.x - 60) / ($window.innerWidth - 60)) * 360)
    },

    saturation: function (event) {
      // 753 pixels is the hard-coded max allotted scrolling amount
      var saturation = Math.round((event.srcElement.scrollTop / 753) * 100);
      if (saturation > 100) {
        saturation = 100;
      } else if (saturation < 0) {
        saturation = 0;
      }
      return saturation;
    },

    brightness: function (event) {
      return Math.round((event.y / $window.innerHeight) * 100);
    },

    HSBtoRGB: function (hsb) {
      var chroma = this._chroma(hsb);
      var x = this._x(chroma, hsb);
      var m = this._m(chroma, hsb);

      if (0 <= hsb.hue && hsb.hue < 60) {
        return this._sector1(chroma, x, m);

      } else if (60 <= hsb.hue && hsb.hue < 120) {
        return this._sector2(chroma, x, m);

      } else if (120 <= hsb.hue && hsb.hue < 180) {
        return this._sector3(chroma, x, m);

      } else if (180 <= hsb.hue && hsb.hue < 240) {
        return this._sector4(chroma, x, m);

      } else if (240 <= hsb.hue && hsb.hue < 300) {
        return this._sector5(chroma, x, m);

      } else if (300 <= hsb.hue && hsb.hue <= 360) {
        return this._sector6(chroma, x, m);
      }
    },

    _chroma: function (hsb) {
      return (hsb.saturation * hsb.brightness) * 0.0001;
    },

    _x: function (chroma, hsb) {
      return chroma * (1 - Math.abs(((hsb.hue / 60) % 2) - 1));
    },

    _m: function (chroma, hsb) {
      return (hsb.brightness * 0.01) - chroma;
    },

    _sector1: function (chroma, x, m) {
      return {
        red: Math.round(((chroma + m) * 255)),
        green: Math.round(((x + m) * 255)),
        blue: Math.round(((0 + m) * 255))
      };
    },

    _sector2: function (chroma, x, m) {
      return {
        red: Math.round(((x + m) * 255)),
        green: Math.round(((chroma + m) * 255)),
        blue: Math.round(((0 + m) * 255))
      };
    },

    _sector3: function (chroma, x, m) {
      return {
        red: Math.round(((0 + m) * 255)),
        green: Math.round(((chroma + m) * 255)),
        blue: Math.round(((x + m) * 255))
      };
    },

    _sector4: function (chroma, x, m) {
      return {
        red: Math.round(((0 + m) * 255)),
        green: Math.round(((x + m) * 255)),
        blue: Math.round(((chroma + m) * 255))
      };
    },

    _sector5: function (chroma, x, m) {
      return {
        red: Math.round(((x + m) * 255)),
        green: Math.round(((0 + m) * 255)),
        blue: Math.round(((chroma + m) * 255))
      };
    },

    _sector6: function (chroma, x, m) {
      return {
        red: Math.round(((chroma + m) * 255)),
        green: Math.round(((0 + m) * 255)),
        blue: Math.round(((x + m) * 255))
      };
    },

    RGBtoHEX: function (rgb) {
      return ((1 << 24) + (rgb.red << 16) + (rgb.green << 8) + rgb.blue).toString(16).substr(1);
    }
  };
});
