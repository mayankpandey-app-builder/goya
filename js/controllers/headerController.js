
define([], function(app){
    'use strict';

    function headerController($scope,$rootScope, $state,requestManager,FactoryIndexedDBLoad,$window){
        var vm = this;
        var perrr = [];

        function initRootScope() {
            //after login set login variable in root scope
            $rootScope.login = false;
            vm.username = localStorage['userName'];
            if(localStorage['access_token']){
            permission();
            }
        }
        initRootScope();
         function permission() {
            if($rootScope.online == true){
                var req = {
                     userId: localStorage['user_id'],
                     appId: '23'
                }
                 $rootScope.isLoading = true;
                requestManager.permissionRequestPost(req).then(function (result) {                      
                     if(!localStorage['access_token']){
                     $rootScope.isLoading = false;
                
            }
                    vm.per = 
                    {
                        home: 'True',//result.Payload[0].IsAccess,
                        customer:'True',//result.Payload[7].IsAccess,
                        orderEntry:'True',//result.Payload[8].IsAccess,
                        orderHistory:'True',//result.Payload[9].IsAccess,
                        searchItem:'True',//result.Payload[10].IsAccess,
                        logout:'True',//result.Payload[11].IsAccess,
                        SalesCommunicator:'True'//result.Payload[13].IsAccess
                    }
                })
             }
            }
        function getPermisssionList(){
                if($rootScope.online == false){
                    $rootScope.stopCall = true;
                     $rootScope.isLoading = true;
            FactoryIndexedDBLoad.getPermissionIndexDb().then(function(result) {
                if(result){
                    $rootScope.isLoading = false;
                        vm.per = {                    
                        home:result[0].IsAccess,
                        customer:result[7].IsAccess,
                        orderEntry:result[4].IsAccess,
                        orderHistory:result[9].IsAccess,
                        searchItem:result[10].IsAccess,
                        logout:result[11].IsAccess,
                        SalesCommunicator:result[13].IsAccess
                        }
                    }
                })
            }
        }

   getPermisssionList();  
        $scope.$on('usersend',function  (event,res) {
           initRootScope();
        })
        $scope.$on('permit',function (event,data) {
            vm.per = data;
        })
        vm.logout = function () {
             $rootScope.isLoading=false;
            localStorage.removeItem('access_token');
            localStorage.removeItem('token_type');
            localStorage.removeItem('user_Id');
            localStorage.removeItem('user_id');
            localStorage.removeItem('Cust_id');
            localStorage.removeItem('Cust_Name');
            localStorage.removeItem('userName');
            localStorage.removeItem('menuPer');
              var indexedDB = $window.indexedDB;
                var request =  indexedDB.open("GOYAOMS",4);
                indexedDB =  indexedDB ||  mozIndexedDB || webkitIndexedDB ||  msIndexedDB;
                //prefixes of window.IDB objects
                window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
                window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

                if (!indexedDB) {
                    //console.log("Your browser doesn't support a stable version of IndexedDB.")
                }

                var DBDeleteRequest = indexedDB.deleteDatabase("GOYAOMS");
                DBDeleteRequest.onerror = function(event) {
                  console.log("Error deleting database.");
                };
                 
                DBDeleteRequest.onsuccess = function(event) {
                  console.log("Database deleted successfully");
                    
                };     
            $state.go("login");


            /*requestManager.logOut().then(function(result) {
                    console.log('logOut response: ' + JSON.stringify(result));
                    //$rootScope.login = true;
                    //$location.url('/order-entry');
                    //$state.go("login");
            });*/
        }
        vm.getOrderDataFromIndexDB = function(){
          if($rootScope.online == true){
            var con = confirm('Are you sure want to Syncronize these Orders?');
          console.log(con)
          if(con==true){
            FactoryIndexedDBLoad.getOrderData().then(function (result) {
            var indexdbOrderData = result[0];
                vm.dbOrderData=result;
            console.log('orderData****'+JSON.stringify(vm.dbOrderData));
              if(indexdbOrderData!=undefined){
                indexDBAddItemOrder(vm.dbOrderData);
              }
              
                });  
            }  
          }      
        }
       
        

        function indexDBAddItemOrder(data){
          var reqObject=data;
          console.log('Order Data****'+JSON.stringify(reqObject));
            $rootScope.isLoading = true;
            for(var i=0;i<data.length;i++){
               requestManager.AddItemToOrder(reqObject[i]).then(function(result) 
               { 
                     if(i == data.length){
                        location.reload();
                        $rootScope.isLoading = false;
                     }                         
                 }); 
            }
            
         
        }
         
    }

    headerController.$inject=['$scope','$rootScope', '$state','requestManager','FactoryIndexedDBLoad','$window'];

    return headerController;
});
