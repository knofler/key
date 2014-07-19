'use strict';

angular.module('keyApp')
  .controller('StatusCtrl',['$scope','$http','socket',function ($scope,$http,socket) {
    $scope.alarms = [];
    $scope.issueLog=[];

 	$http.get('/api/statuss').success(function(alarmfromApi) {
			    $scope.alarms = alarmfromApi;
			    socket.syncUpdates('status',$scope.alarms);
	});
    //Add data to Mongo DB

    //Incoming data from server to modify model for display.
 	$scope.$on('sendtoClient',function(data){
   		$scope.myStatus.push(data);
   	});

    $scope.socket=io.connect();
    $scope.count= 1;

    $scope.isConnected =function(){
      if($scope.socket){
        return true;
      }
    }


    socket.socket.on('connect', function(){$('#status').html("Server connected,Ready to serve");});
    socket.socket.on('disconnect', function(){$('#status').html("Disonnected From server");});
	
	//Incoming cient connection information
    socket.socket.on('client_connected',function(data){
        $scope.issueLog.push(data.message);	
    });  


    console.log($scope.alarms);
    //API call to bring data for display	  
	socket.socket.on('display_data',function(){
		    $http.get('/api/statuss').success(function(alarmfromApi) {
			    $scope.alarms = alarmfromApi;
			    socket.syncUpdates('status',$scope.alarms);
		    });   	
    	});   
  }]);
