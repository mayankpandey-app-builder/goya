define(['js/appRoutes',
        'js/controllers/homeController',
        'js/controllers/headerController',
        'js/controllers/loginController',
        'js/controllers/signupController',
        'js/controllers/ForgetPasswordController',
        'js/controllers/OrderController',
        'js/controllers/OrderAddController',
        'js/controllers/SearchOrderController',
        'js/controllers/SearchItemController',
        'js/controllers/customerDetailsController',
        'js/controllers/customerInfoController',
        'js/controllers/communicator',
        'js/services/requestManager',
        'js/services/connectionManager',
        'js/services/checkAuthorization',
        'js/services/errorService',
        'js/services/errorModalService',
        'js/services/indexDBDataLoad',
        'js/services/paginationFilter',
        'js/services/salesFilter',
        'js/services/checkUserservice',
        'js/directive/toggleDirective',
        'js/directive/hideToggle',
        'js/directive/modalDirective',
        'js/directive/datetoPickerDirective',
        'js/directive/datefromPickerDirective',
        'js/directive/datePickertoMobDirective',
        'js/directive/datePickerfromMobDirective',
        'js/directive/bulkDeleteDirective',
        'js/directive/cartDirective',
        'js/directive/dblClickDirective',
        'js/directive/homeRedirectingDirective',
        'js/directive/cartClickDirective',
        'js/directive/swipeTouchDirective',
        'js/directive/customerInfoDirective',
        'js/directive/positionClick'
        ],
    function(config,homeController,headerController, loginController, signupController,ForgetPasswordController,OrderController,OrderAddController,SearchOrderController,SearchItemController,customerDetailsController,customercInfo,salesCommunicatorController,requestManager,connectionManager,checkAuthorization,errorService,errorModalService,FactoryIndexedDBLoad,pagination,salesfilter,setUser,menuToggle,hideToggle,errorModal,datetopicker,datefrompicker,datetomobmpicker,datefrommobpicker,bulkModal,cartModal,iosDblclick,homescreen,cartClick,swipeTouch,customerInfo,positionClick){
    'use strict';

    var app = angular.module('app', ['ui.router','acute.select']);

    app.run(function($rootScope, $state, $location,$window) {
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            var path; 
            $rootScope.online = navigator.onLine;
             $window.addEventListener("offline", function() {
                $rootScope.$apply(function() {
                    $rootScope.online = false;
                    //location.reload();
                    $rootScope.stopCall=false;
                        });
                            }, false); 
            $window.addEventListener("online", function() {
                $rootScope.$apply(function() {
                    $rootScope.online = true;
                    
                    });
                        }, false);   
            if(!localStorage['access_token']){
                path = localStorage.getItem('path');
                $rootScope.login = false;
                $location.path('/login');
            }else{ 
                $rootScope.login = true;  
                path = localStorage.getItem('path');
                    if(path == '/home'){
                        $location.path(localStorage['path']);
                    }                               
            }
        });    
    });

    app.config(config);
    app.controller('homeController', homeController);
    app.controller('headerController', headerController);
    app.controller('loginController', loginController);
    app.controller('signupController',signupController);
    app.controller('ForgetPasswordController',ForgetPasswordController);
    app.controller('OrderController',OrderController);
    app.controller('OrderAddController',OrderAddController);
    app.controller('SearchOrderController',SearchOrderController);
    app.controller('SearchItemController',SearchItemController);customercInfo
    app.controller('customerDetailsController',customerDetailsController);
    app.controller('customercInfo',customercInfo);
    app.controller('salesCommunicatorController',salesCommunicatorController);
    app.factory('requestManager',requestManager);
    app.factory('checkAuthorization',checkAuthorization);
    app.factory('errorService',errorService);
    app.factory('errorModalService',errorModalService);
    app.factory('FactoryIndexedDBLoad',FactoryIndexedDBLoad);   
    app.filter('pagination',pagination);
    app.filter('salesfilter',salesfilter);
    app.factory('setUser',setUser); 
    app.directive('menuToggle',menuToggle);
    app.directive('hideToggle',hideToggle); 
    app.directive('errorModal',errorModal);  
    app.directive('datetoPicker',datetopicker);
    app.directive('datefromPicker',datefrompicker);
    app.directive('datemtoPicker',datetomobmpicker);
    app.directive('datemfromPicker',datefrommobpicker);
    app.directive('bulkModal',bulkModal);  
    app.directive('cartModal',cartModal);
    app.directive('iosDblclick',iosDblclick); 
    app.directive('homescreen',homescreen); 
    app.directive('cartClick',cartClick);
    app.directive('swipeTouch',swipeTouch);
    app.directive('customerInfo',customerInfo); 
    app.directive('positionClick',positionClick);
    app.factory('connectionManager',connectionManager);
});