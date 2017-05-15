var listeQuizzCtrl = angular.module('listeQuizzCtrl', []);
listeQuizzCtrl.controller('listeQuizzCtrl', function ($scope,$http,$routeParams) {
    console.log($routeParams.idMatiere);

    $http.get('http://localhost:8080/listeQuizz/'+$routeParams.idMatiere).then(function(response){
        $scope.listeQuizz=response.data;
        console.log($scope.listeQuizz);
    },function(reason){
        console.log(reason);
    });

});