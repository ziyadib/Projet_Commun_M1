

var listeMatiereCtrl = angular.module('listeMatiereCtrl', []);
listeMatiereCtrl.controller('listeMatiereCtrl', function ($scope,$http) {
    console.log("listeQuizzCtrl");

    /*
    $http.get('app/requetes/matiere.json').then(function(response){
        $scope.matieres=response.data;
        console.log($scope.matieres);
    },function(reason){
        console.log(reason);
    });
    */


    $http.get('http://localhost:8080/listeMatieres').then(function(response){
        $scope.matieres=response.data;
        console.log($scope.matieres);


    },function(reason){
        console.log(reason);
    });



});