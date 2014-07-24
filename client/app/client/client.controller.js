'use strict';

angular.module('keyApp')
  .controller('ClientCtrl', function ($scope,$http,socket) {
    $scope.message = 'Hello';
      
     $scope.firstConnect=true;   
     $scope.socket;
     $scope.getUsrData="";

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


    $scope.addData = function(){
        socket.socket.on('client_connected',function(data){
        var ipaddress= data.message.ipaddress;
        var info =data.message.info;
            $http.post('/api/clients',{usr:info + " " +ipaddress});
              $http.get('/api/devices/'+ipaddress).success(function(devicefromApi) {
              $http.post('/api/connect_logs',{
                    device          :devicefromApi.ComputerName,
                    oneid           :devicefromApi.OneID,
                    jobtitle        :devicefromApi.JobTitle,
                    fname           :devicefromApi.FirstName,
                    lname           :devicefromApi.LastName,
                    email           :devicefromApi.EmailAddress,
                    officelocation  :devicefromApi.OfficeLocation,
                    phone           :devicefromApi.PhoneNumber,
                    systembrand     :devicefromApi.SystemBrand,
                    make            :devicefromApi.Make,
                    model           :devicefromApi.Model,
                    processor       :devicefromApi.ProcessorType,
                    cpu             :devicefromApi.CPUSPEED,
                    lastimaged      :devicefromApi.LastImaged,
                    hdd             :devicefromApi.HardDiskSize,
                    freedisk        :devicefromApi.FreeDiskSpace,
                    ipaddress       :devicefromApi.IPAddress,
                    lanaddress      :devicefromApi.MACAddress,
                    serial          :devicefromApi.SerialNumber,
                    ram             :devicefromApi.Memory,
                    lastcontact     :devicefromApi.LastContractMade,
                    lastagentconnect:devicefromApi.LastAgentLoad,
                    created: new Date()
              });
                socket.socket.emit('deviceToserver'); 
              });
        }); 
    }

    $scope.disconnect=function() {
        $scope.socket.disconnect();
    };
    
     $scope.send_connect_info =function(){
        $scope.socket.emit('connect_info');
        $scope.addData();
    };


    $scope.send =function(){
    var data='Help ! Help ! Help!';
    $http.post('/api/statuss',{msg:data});
        $scope.socket.emit('toServer');
    };
  });
