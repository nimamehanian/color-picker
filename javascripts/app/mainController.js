app.controller('Controller', function ($scope, $window, ColorCulator) {
  $scope.locked = false;
  $scope.swatches = [];
  $scope.hsb = {hue: 180, saturation: 60, brightness: 60};
  $scope.rgb = {red: 61, green: 153, blue: 153};
  $scope.hex = '3d9999';

  $scope.updateColor = function (event) {
    if (!$scope.locked) {
      $scope.hsb.hue = ColorCulator.hue(event);
      $scope.hsb.saturation = ColorCulator.saturation(event);
      $scope.hsb.brightness = ColorCulator.brightness(event);
      $scope.rgb = ColorCulator.HSBtoRGB($scope.hsb);
      $scope.hex = ColorCulator.RGBtoHEX($scope.rgb);
    }
  };

  $scope.saveColor = function (hex) {
    if (!$scope.locked) {
      if (!_($scope.swatches).contains(hex)) {
        $scope.swatches.push(hex);
      }
    }
  };

  $scope.clearSwatches = function () {
    $scope.swatches = [];
  };

  $scope.removeSwatch = function (index) {
    $scope.swatches.splice(index, 1);
  };
});
