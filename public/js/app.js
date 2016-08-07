'use strict'

var INVOISE = angular.module('INVOISE', ['ui.router', 'ui.bootstrap', 'autoActive', 'file-model']);
INVOISE.run(function ($rootScope){
    $rootScope.endPoint = 'http://localhost:8000'
});



