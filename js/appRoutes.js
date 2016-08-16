define([],function(){
    'use strict';

    function config($stateProvider, $urlRouterProvider, $httpProvider,$rootScope) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = false;
        delete $httpProvider.defaults.headers.common["X-Requested-With"];

        $urlRouterProvider.otherwise('/login');

        $stateProvider
        // this is route used for acess services using resolve method for asynchronus 
            .state('login', {
                url: "/login",
                templateUrl: "html/pages/login.html",
                controller: "loginController as vm"
            })
            .state('signup', {
                url: "/signup",
                templateUrl: "html/pages/signup.html",
                controller: "signupController as vm"
            })
            .state('home', {
                url: "/home",
                templateUrl: "html/pages/home.html",
                controller: "homeController as vm"
            })
            .state('forget', {
                url: "/forget-password",
                templateUrl: "html/pages/forget-password.html",
                controller: "ForgetPasswordController as vm"
            })
            .state('orderentry', {
                url: "/order-entry",
                templateUrl: "html/pages/quick-order-entryaddinfo.html",
                controller: "OrderAddController as vm"
            })
            .state('orderentryaddinfo', {
                url: "/order-entry-addinfo",
                templateUrl: "html/pages/quick-order-entryaddinfo.html",
                controller: "OrderAddController as vm"
            })
            .state('searchorderentry', {
                url: "/search-order-entry",
                templateUrl: "html/pages/search-order-entry.html",
                controller: "SearchOrderController as vm"
            })
            .state('searchitem', {
                url: "/search-item",
                templateUrl: "html/pages/search_item_add_cart.html",
                controller: "SearchItemController as vm"
            })
             .state('customerdetails', {
                url: "/customer-details",
                templateUrl: "html/pages/customer-details.html",
                controller: "customerDetailsController as vm"
            })
             .state('customerinfo',{
                url: "/customer-info",
                templateUrl: "html/pages/custInfo.html",
                controller:"customercInfo as vm"
             })
             .state('salescommunicator',{
                url: "/sales-communicator",
                templateUrl: "html/pages/communicator.html",
                controller:"salesCommunicatorController as vm"
             })
    }

    config.$inject=['$stateProvider','$urlRouterProvider', '$httpProvider'];

    return config;
});