'use strict';

angular.module('keyApp')
  .controller('StatusCtrl',['$scope','$http','socket',function ($scope,$http,socket) {
    $scope.alarms = [];
    $scope.issueLog=[];
    $scope.userLog=[];

 	$http.get('/api/statuss').success(function(alarmfromApi) {
			    $scope.alarms = alarmfromApi;
			    socket.syncUpdates('status',$scope.alarms);
	});

  $http.get('/api/clients').success(function(userfromApi) {
        $scope.userLog = userfromApi;
        socket.syncUpdates('client',$scope.userLog);
  });

  $scope.count= 1;
  
  $scope.isConnected =function(){
      if(socket){
        return true;
      }
  }


  socket.socket.on('connect', function(){$('#status').html("Server connected,Ready to serve");});
  socket.socket.on('disconnect', function(){$('#status').html("Disonnected From server");});
	
	//Incoming cient connection information
  socket.socket.on('client_connected',function(data){
    $scope.issueLog.push(data.message);	
  });  
  
  //API call to bring data for display	  
	socket.socket.on('display_data',function(){
	    $http.get('/api/statuss').success(function(alarmfromApi) {
		    $scope.alarms = alarmfromApi;
		    socket.syncUpdates('status',$scope.alarms);
	    });   	
  });

  socket.socket.on('display_usr',function(){
      $http.get('/api/clients').success(function(userfromApi) {
        $scope.userLog = userfromApi;
        socket.syncUpdates('client',$scope.userLog);
      });     
  });

}]);
