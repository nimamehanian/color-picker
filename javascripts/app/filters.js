app.filter('capitalize', function () {
  return function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
});

app.filter('centsless', function () {
  return function (string) {
    return string.replace('.00', '');
  };
});

app.filter('commaSeparate', function ($filter) {
  var currency = $filter('currency');
  var centsless = $filter('centsless');
  return function (number) {
    return centsless(currency(number)).replace('$', '');
  };
});

app.filter('ellipsis', function () {
  return function (string) {
    return string.replace(string.slice(string.length - 3), '...');
  };
});

app.filter('percentage', function () {
  return function (value) {
    return Math.round((value * 100).toFixed(2));
  };
});

app.filter('round', function () {
  return function (value) {
    return Math.round(value);
  };
});
