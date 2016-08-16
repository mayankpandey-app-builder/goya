define([], function(app) {
    'use strict';
        function homeController($scope,$rootScope,$timeout,requestManager,FactoryIndexedDBLoad) {
        	var vm = this;
            var perrr = [];
        	function getInitial(){
                console.log('hii');
        		if(localStorage['Cust_id']){
        			vm.custId = localStorage['Cust_id'];
        			vm.custName = localStorage['Cust_Name'];
        		}else{
        			vm.custId ='';
        			vm.custName ='';
        		}
                 
                $rootScope.login = true;
                if(localStorage['access_token']){
                localStorage['path'] = '/home';
                
                console.log('hii'+JSON.stringify(vm.per) )
            }
                
        		
        	} 
        	getInitial();
            vm.permission = function () {
            
                if($rootScope.online == true){
                    var req = {
                     userId: localStorage['user_id'],
                     appId: '23'
                }
                console.log('show ')
                 $rootScope.isLoading = true;
                requestManager.permissionRequestPost(req).then(function (result) {
                    //console.log('show res'+JSON.stringify(result));
                     $rootScope.isLoading = false;
                        vm.per = {
                            home:'True',//result.Payload[0].IsAccess,
                            customer:'True',//result.Payload[7].IsAccess,
                            orderEntry:'True',//result.Payload[8].IsAccess,
                            orderHistory:'True',//result.Payload[9].IsAccess,
                            searchItem:'True',//result.Payload[10].IsAccess,
                            button:'True',//result.Payload[12].IsAccess
                        }
                    })  
                }
                
            }
            vm.permission();
            function getPermisssionList(){
                console.log('conn online or offline'+$rootScope.online);
                if($rootScope.online == false){
                     $rootScope.isLoading = true;
            FactoryIndexedDBLoad.getPermissionIndexDb().then(function(result) {
                if(result){
                    $rootScope.isLoading = false;
                    console.log('get PerlistOnline'+JSON.stringify(result));
                         vm.per = {
                            home:result[0].IsAccess,
                            customer:result[7].IsAccess,
                            orderEntry:result[4].IsAccess,
                            orderHistory:result[9].IsAccess,
                            searchItem:result[10].IsAccess
                        }
                    }
                })
            }
        }

   getPermisssionList();
               
            
        }
 homeController.$inject = ['$scope','$rootScope','$timeout','requestManager','FactoryIndexedDBLoad'];

    return homeController;
});