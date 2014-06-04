app.factory('ColorModels', function () {
  return {
    normalize: function (rgbValue) {
      return rgbValue / 255;
    },

    min: function (rgb) {
      return Math.min(rgb.r, rgb.g, rgb.b);
    },

    max: function (rgb) {
      return Math.max(rgb.r, rgb.g, rgb.b);
    },

    delta: function (max, min) {
      return max - min;
    },

    hue: function (rgb, rgbPrime, delta, max) {
      var max = max / 255;
      if (max === rgbPrime.r) {
        return this._hueR(rgb, delta);

      } else if (max === rgbPrime.g) {
        return this._hueG(rgb, delta);

      } else if (max === rgbPrime.b) {
        return this._hueB(rgb, delta);
      }
    },

    _hueR: function (rgb, delta) {
      return 360 - Math.abs((((rgb.g - rgb.b) / delta) % 6) * (60));
    },

    _hueG: function (rgb, delta) {
      return (((rgb.b - rgb.r) / delta) + 2) * (60);
    },

    _hueB: function (rgb, delta) {
      return (((rgb.r - rgb.g) / delta) + 4) * (60);
    },

    saturation: function (rgb, max, min) {
      return this.delta(max, min) === 0 ? 0 : (this.delta(max, min) / this.max(rgb));
    },

    brightness: function (rgb) {
      return this.max(rgb) / 255;
    }

  };
});
