/**
 * Created by Salifukayta on 09/04/2016.
 */

(function(){
  angular.module('starter')
    .controller('CallController', ['localStorageService', '$scope', '$ionicPopup', CallController]);

  function CallController(localStorageService, $scope, $ionicPopup){

    $scope.username = localStorageService.get('username');

    var peer = new Peer($scope.username, {
      key: '3xropnkux78sq0k9',
      config: {'iceServers': [
        { url: 'stun:stun1.l.google.com:19302' },
        { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
      ]},
        debug: 3
    });

    // if you run your own peerserver
    // var peer = new Peer($scope.username, {
    //   host: '192.168.1.30', port: 3000, path: '/call_peerjs',
    //   config: {'iceServers': [
    //     { url: 'stun:stun1.l.google.com:19302' },
    //     { url: 'turn:numb.viagenie.ca', credential: 'muazkh', username: 'webrtc@live.com' }
    //   ]},
    //   debug: 3
    // });

    // var dataConnection = peer.connect($scope.username);
    // dataConnection.on('error', function(err) {
    //   console.log(err);
    // });


    function getVideo(successCallback, errorCallback){
      navigator.webkitGetUserMedia({audio: true, video: true}, successCallback, errorCallback);
    }


    function onReceiveCall(call){

      $ionicPopup.alert({
        title: 'Incoming Call',
        template: 'Someone is calling you. Connecting now..'
      });

      getVideo(
        function(MediaStream){
          call.answer(MediaStream);
        },
        function(err){
          $ionicPopup.alert({
            title: 'Error',
            template: 'An error occurred while try to connect to the device mic and camera'
          });
        }
      );

      call.on('stream', onReceiveStream);
    }


    function onReceiveStream(stream){
      var video = document.getElementById('contact-video');
      video.src = window.URL.createObjectURL(stream);
      video.onloadedmetadata = function(){
        $ionicPopup.alert({
          title: 'Call Ongoing',
          template: 'Call has started. You can speak now'
        });
      };

    }

    $scope.startCall = function(){
      var contact_username = $scope.contact_username;

      getVideo(
        function(MediaStream){

          var call = peer.call(contact_username, MediaStream);
          call.on('stream', onReceiveStream);
        },
        function(err){
          $ionicPopup.alert({
            title: 'Error',
            template: 'An error occurred while try to connect to the device mic and camera'
          });
        }
      );

    };

    peer.on('call', onReceiveCall);

    peer.on('error', function (err) {
      console.log(err);
    });


  }

})();
