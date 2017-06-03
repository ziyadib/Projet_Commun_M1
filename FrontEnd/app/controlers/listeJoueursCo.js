

var listeJoueursCoCtrl = angular.module('listeJoueursCoCtrl', []);
listeJoueursCoCtrl.controller('listeJoueursCoCtrl', function ($scope,$http) {
    console.log("listeJoueursCoCtrl");

    /*
    $http.get('app/requetes/matiere.json').then(function(response){
        $scope.matieres=response.data;
        console.log($scope.matieres);
    },function(reason){
        console.log(reason);
    });
    */


    $http.get('http://localhost:8080/listeJoueursCo').then(function(response){
        console.log(response.data);
        $scope.joueurs=response.data;
        console.log($scope.joueurs);


    },function(reason){
        console.log(reason);
    });



});