'use strict'

INVOISE.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $urlRouterProvider.otherwise("invoices");
    $stateProvider
        .state('invoices', {
            url: "/invoices",
            templateUrl: "partials/invoices.html",
            controller:'InvoicesCtrl'
        })
        .state('customers', {
            url: "/customers",
            templateUrl: "partials/customers.html",
            controller:'CustomersCtrl'
        })
        .state('products', {
            url: "/products",
            templateUrl: "partials/products.html",
            controller:'ProductsCtrl'
        })
})
