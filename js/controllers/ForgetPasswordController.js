
define([], function(app){
    'use strict';

    function ForgetController($rootScope,requestManager,checkAuthorization,$state){
    	var vm = this;

        function initRootScope() {
        	//after login set login variable in root scope
        	$rootScope.login = true;
            initRootScope();
            checkAuthorization.Authentication();
            //goForgetPassword(); 
        }

        function goForgetPassword(){
        	var req = {
	        		
	        }
        	requestManager.forgetPassword(req).then(function(result) {
                        console.log('forgetPassword response: ' + JSON.stringify(result));
            });
        }
    }

    ForgetController.$inject=['$rootScope','requestManager','checkAuthorization','$state'];

    return ForgetController;
});
