'use strict'

var INVOISE = angular.module('INVOISE', ['ui.router', 'ui.bootstrap', 'autoActive']);
INVOISE.run(function ($rootScope){
    $rootScope.endPoint = 'http://localhost:8000'
});



