var loginController = angular.module('loginCtrl', []);
loginController.controller('loginCtrl', function ($scope, $http, sharedStorageService, LxNotificationService,$location) {
    $scope.login = {
        "username": "boutouik",
        "password": "BLq8z93z"
    };

    /*
     $scope.startConnect = function(){
     $http.post('http://localhost:8080/vuep/connexion', JSON.stringify($scope.connect)).then(function (response) {
     sharedStorageService.set(response.data[0].id);
     $location.path("/welcome");
     }, function () {
     LxNotificationService.error('Impossible de contacter le serveur');
     });
     };
     */


    $scope.connexion = function(){
        $http.post('http://localhost:8080/connexion', JSON.stringify($scope.connect)).then(function (response) {
            LxNotificationService.success('connexion');
//            console.log(response.data);
            sharedStorageService.set(response.data[0].id);
            $location.path("/tableauDeBord");
        }, function () {
            console.log('http://localhost:8080/connexion', JSON.stringify($scope.login));
            LxNotificationService.error('Impossible de contacter le serveur');
        });
    };



});