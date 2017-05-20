

var duelCtrl = angular.module('duelCtrl', []);
duelCtrl.controller('duelCtrl', function ($scope,$http,$routeParams) {
    console.log("let's get ready socket io");

    var socket = io.connect('http://localhost:8080');
    socket.on('message', function(message,socket) {
        $scope.messageCo = message;
        //alert(message);
    });
    /*socket.emit('message1', 'Allez vous relever le défi');*/

    socket.on('listeMatieres', function(messagex,socket) {
        $scope.Instruction1MP = "Choisissez votre matieres";
        console.log("message1");
        console.log($scope.message1);
            console.log("on va commencer les choses sérieuses: recuperation de la liste de quizz pour le main player");
         $http.get('http://localhost:8080/listeMatieres').then(function(response){
            $scope.matieres=response.data;
            console.log($scope.matieres);

            $scope.loadQuizz=function(){
                console.log("loadquizz");
                console.log("idMatiere:"+$routeParams.idMatiere);
                $http.get('http://localhost:8080/listeQuizz/1'/*+$routeParams.idMatiere*/).then(function(response){
                $scope.listeQuizz=response.data;
                console.log("listequizz: "+ $scope.listeQuizz);
                },function(reason){
                    console.log(reason);
                });
            };
        });
        //alert(message);
    });


});