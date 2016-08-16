define([], function(app) {
    'use strict';

    function checkAuthorization($q, $http,$state,$rootScope) {
    	return {
    		Authentication: function (request) {
    			if(localStorage.getItem('access_token') == null && localStorage.getItem('user_id') == null){
	        		$state.go("login");
	            }else{  
	                //goOrderDetail();	
	            }
    		},
            permissionAdmin: function (data) {
                $rootScope.$broadcast('permit',data)
            },
            showInfo: function (data) {
                $rootScope.$broadcast('info',data)
            }
            
    	  }
    	}

    checkAuthorization.$inject = ['$q', '$http','$state','$rootScope'];

    return checkAuthorization;
});