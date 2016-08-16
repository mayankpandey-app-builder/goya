define([], function(app) {
    'use strict';

    function customerDetailsController($rootScope, $state, requestManager, checkAuthorization, errorService, errorModalService,FactoryIndexedDBLoad) {
        var vm = this;
        vm.itemsPerPage = 10;
        vm.currentPage = 0;
        vm.image='./images/checkbox-hover.png';
        vm.showCheckCls=false;
        vm.newData=[];
       
        //after login set login variable in root scope
        function goBack() {
            localStorage.setItem('path', '/customer-details');
        }
        goBack();

        function initRootScope() {
            if (localStorage.getItem('access_token') == null && localStorage.getItem('user_id') == null ) {
                $state.go("login");
            } else {
                $rootScope.login = true;
                goCutomerdetail();
            }
            if(localStorage['Cust_id']){
                    vm.custId = localStorage['Cust_id'];
                    vm.custName = localStorage['Cust_Name'];
                }else{
                    vm.custId ='';
                    vm.custName ='';
                }

        }
        initRootScope();
        
        function goCutomerdetail() {
            if($rootScope.online == true){
               $rootScope.isLoading = true;  

                 var req = {
                BrokerId: localStorage['user_id']
            }
            requestManager.customerDetailPost(req).then(function(result) {
                if (result.Payload) {
                    vm.filterData = result.Payload;
                    $rootScope.isLoading = false;  
                  for(var i=0;i<vm.filterData.length;i++){
                  vm.filterData[i]['checked'] = false;
                }
                }
                

                vm.range = function() {
                    var rangeSize = 5;
                    var ps = [];


                    var start = vm.currentPage;
                    if (start > vm.pageCount() - rangeSize) {
                        start = vm.pageCount() - rangeSize + 1;
                    }

                    for (var i = start; i < start + rangeSize; i++) {
                        if (i >= 0)
                            ps.push(i);
                    }
                    return ps;
                };

                vm.prevPage = function() {
                    if (vm.currentPage > 0) {
                        vm.currentPage--;
                    if(vm.userDeatilData){
                          vm.userDeatilData[0].UserID = '';  
                        }                    
                    }
                };

                vm.DisablePrevPage = function() {
                    return vm.currentPage === 0 ? "disabled" : "";
                };

                vm.pageCount = function() {
                    return Math.ceil(vm.filterData.length / vm.itemsPerPage) - 1;
                };

                vm.nextPage = function() {
                    if (vm.currentPage < vm.pageCount()) {
                        vm.currentPage++;
                        if(vm.userDeatilData){
                          vm.userDeatilData[0].UserID = '';  
                        }
                        
                    }

                };

                vm.DisableNextPage = function() {
                    return vm.currentPage === vm.pageCount() ? "disabled" : "";
                };

                vm.setPage = function(n) {
                    vm.currentPage = n;
                };

            }) 
            }
            
        }
        function  goForIndexDbData() {
            $rootScope.isLoading = true;  
            if($rootScope.online == false){  
               FactoryIndexedDBLoad.getCustDbIndexData().then(function (result)
                {
               vm.filterData = result;
               $rootScope.isLoading = false;

            }); 
            }
            
            
        }
        goForIndexDbData();

        vm.showDetail = function(userId,custName, companyId,index) {
            vm.usersId=userId;
            localStorage.setItem('Cust_id',userId);
            localStorage.setItem('Cust_Name',custName);
            if(localStorage['Cust_id']){
                    vm.custId = localStorage['Cust_id'];
                    vm.custName = localStorage['Cust_Name'];
                }else{
                    vm.custId ='';
                    vm.custName ='';
                }
            var req = {
                 CustomerId: userId,
                CompanyId: companyId
            }
            $rootScope.isLoading = false;  
            requestManager.customerMoreDetailPost(req).then(function(result) {
                $rootScope.isLoading = false;  
                vm.userDeatilData = result.Payload;
            });
        }

        vm.checkRedioBtn=function (userId,custName,companyId,checked,index) {
            vm.usersId=userId;
            localStorage.setItem('Cust_id',userId);
             localStorage.setItem('Cust_Name',custName);
            if(localStorage['Cust_id']){
                    vm.custId = localStorage['Cust_id'];
                    vm.custName = localStorage['Cust_Name'];
                }else{
                    vm.custId ='';
                    vm.custName ='';
                }
            var req = {
                CustomerId: userId,
                CompanyId: companyId
            }
            $rootScope.isLoading = false; 
            if($rootScope.online==true)
            {
                requestManager.customerMoreDetailPost(req).then(function(result)
                 {
                    $rootScope.isLoading = false;  
                    vm.userDeatilData1 = result.Payload;
                });
           }
                              
     } 
     vm.goTomHome = function  (check) {
        if(check=='c'){
           localStorage.removeItem('Cust_id'); 
           localStorage.removeItem('Cust_Name');
           $state.go('home'); 
        }else{
            if(localStorage['Cust_id']){
            $('.homeScreen').modal('show');
        }else{
           $('.homeScreen').modal('show'); 
        }   
        }
        
     } 

    }

    customerDetailsController.$inject = ['$rootScope', '$state', 'requestManager', 'checkAuthorization', 'errorService', 'errorModalService','FactoryIndexedDBLoad'];

    return customerDetailsController;
});













