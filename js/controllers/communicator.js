define([], function(app) {
    'use strict';
    function salesCommunicatorController($state,$rootScope,requestManager,$scope) {
        var vm = this;
        vm.cmd = false;
        vm.path = 'http://166.62.119.178/omsdev';
        function initialData(){
        	if(localStorage['access_token']){
        		localStorage.setItem('path', '/sales-communicator');
        		$rootScope.login = true;
        	}else{
        		$state.go('login');
        	}
        }
        initialData();
        function getInitialData(){
            var req = {
                WeekNo:0
            }
            $rootScope.isLoading = true;  
            requestManager.salesCommunicator(req).then(function (result) {               
                if(result.Status == 'True'){
                    $rootScope.isLoading = false;  
                    vm.salesData = result.Payload; 
                    for(var i = 0;i<vm.salesData.length;i++){
                        vm.salesData[i]['fullFile'] = vm.path+vm.salesData[i].FilePath;                   
                    }
                }               
               console.log('show det'+JSON.stringify(result)); 
            })
        }
        getInitialData();
        vm.resetClass = function(){
            console.log('hffff');
             vm.cmd = false;           
        }
        vm.setEvent = function (index) {
            console.log(index);
            vm.cmd = false;
            //vm.cmd[index]=true;
        }
        vm.preview = function(file,index){
          var w = window.open('http://166.62.119.178/omsdev'+file);
            w.print();
           // console.log(file)
           
            //  $('#'+index).attr('src','http://166.62.119.178/omsdev'+file);

        }
        $scope.$on('resetSetting',function (event) {
            vm.resetClass();
        })
       
    }

    salesCommunicatorController.$inject = ['$state','$rootScope','requestManager','$scope'];

    return salesCommunicatorController;
});