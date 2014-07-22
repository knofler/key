'use strict';

angular.module('keyApp')
  .controller('ClientCtrl', function ($scope,$http,socket) {
    $scope.message = 'Hello';
 
     $scope.firstConnect=true;   
     $scope.socket;
    
     $scope.isConnected =function(){
      if($scope.socket){
        return true;
      }
    }

    $scope.connect= function(){
        if($scope.firstConnect){
            $scope.socket=io.connect();
            $scope.socket.on('connect', function(req,res){
                   $('#status').html("Connected to server");
                   $scope.send_connect_info();
                   $scope.send();
            });

            $scope.socket.on('disconnect',function(){$('#status').html("Disonnected From server client");});
            $scope.socket.on('reconnect',function(nextRetry){$('#status').html("Reconnection " + nextRetry + " in milliseconds .");});     
            $scope.socket.on('reconnect_failed',function(){$('#status').html('Reconnect Failed');});
        $scope.firstConnect=false;
        }else{
            $scope.socket.socket.reconnect();
        }
    };

    $scope.disconnect=function() {
        $scope.socket.disconnect();
    };
    
     $scope.send_connect_info =function(){
        $scope.socket.emit('connect_info');
        $scope.addData();
    };

    $scope.addData = function(){
        socket.socket.on('client_connected',function(data){
        $http.post('/api/clients',{usr:data.message});
        socket.socket.emit('userToserver');       
    }); 
    }


    $scope.send =function(){
		var data='Help ! Help ! Help!';
		$http.post('/api/statuss',{msg:data});
        $scope.socket.emit('toServer');
    };
  });
