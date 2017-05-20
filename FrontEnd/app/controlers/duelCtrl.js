

var duelCtrl = angular.module('duelCtrl', ['btford.socket-io']);
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
        console.log("listeMAtieres");
            console.log("recuperation de la liste de matieres pour le main player");
         $http.get('http://localhost:8080/listeMatieres').then(function(response){
            $scope.matieres=response.data;
            console.log($scope.matieres);
        });
        //alert(message);
    });

     /*       $scope.loadQuizz=function(id){
                
                    console.log("recuperation de l'id quizz");
                    console.log("idMatiere:");
                    $http.get('http://localhost:8080/listeQuizz/1'/*+id+$routeParams.idMatiere).then(function(response){
                        //console.log("response.data :"+response.data);
                        var liste=response.data;
                        console.log("liste"+liste);
                        for(var i=0; i<liste.length();liste++){
                            console.log("quizz:"+ liste[i]);
                        }
                        $scope.listeQuizz= liste;
                    console.log("listequizz: "+ $scope.listeQuizz);

                    },function(reason){
                        console.log(reason);
                    });
              
            };*/

    socket.on('ready', function(message,socket) {
        
        console.log("notif hote choisi quizz "+message);
        alert(message); 
    });

    socket.on('letsgo', function(message,socket) {
        //alert("on va essayer de rejoindre ce quizz"+ message);
        console.log("tu recois pas letsgo ie pour changer de page");
        console.log("voici l'idQuizz a charger: "+message);
        document.location = 'http://localhost/#/duel/quizz/'+message;
    });
    

});