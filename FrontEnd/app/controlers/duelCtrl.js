

var duelCtrl = angular.module('duelCtrl', []);
duelCtrl.controller('duelCtrl', function ($scope,$http) {
    console.log("let's get ready socket io");

    var socket = io.connect('http://localhost:8080');
    socket.on('message', function(message) {
        $scope.messageCo = message;
        //alert(message);
        socket.broadcast.emit('message', 'Allez vous relever le défi');
    });
    console.log("on va commencer les choses sérieuses: recuperation de la liste de quizz pour le main player");
     $http.get('http://localhost:8080/listeMatieres').then(function(response){
        $scope.matieres=response.data;
        console.log($scope.matieres);

    /*socket.on('m',function(start){
    */
    });

});