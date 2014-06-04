'use strict';
Error.stackTraceLimit = Infinity;

var app = angular.module('app', [
  'ui.bootstrap',
  'ngSanitize',
  'ngAnimate',
  'mgcrea.ngStrap'
]);

app.config(function ($sceProvider) {
  $sceProvider.enabled(false);
});

app.run(function ($rootScope) {
  // console.log('app loaded');
});
