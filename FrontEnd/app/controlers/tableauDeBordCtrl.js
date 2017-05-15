var tableauDeBordCtrl = angular.module('tableauDeBordCtrl', []);
tableauDeBordCtrl.controller('tableauDeBordCtrl', function ($scope, $http) {
    console.log("tableauDeBordCtrl");

    $scope.labels = [];
    $scope.data = [
        []
    ];




    $http.get('http://localhost:8080/statsG').then(function (response) {
        $scope.statG = response.data;
        console.log($scope.statG);
        for (var i=0; i<$scope.statG.length;i++){
            $scope.labels.push($scope.statG[i].nom);
            $scope.data[0].push($scope.statG[i].moyenne);

        }

    }, function (reason) {
        console.log(reason);
    });

});