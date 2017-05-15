/**
 * Created by Victor on 20/02/2016.
 */
angular.module('RevisatorProfApp')
    .controller('MainPageController', function ($scope, $location, $http, sharedStorageService, LxNotificationService) {



        // Récupération de la liste des quiz
        $http.get('http://localhost:8080/listeQuizzProf').then(function (response) {
            $scope.quizList = response.data;
        }, function (reason) {
            console.log(reason);
        });

        // Récupération de la liste des matières
        // TODO Affichage
        $http.get('http://localhost:8080/listeMatiereProf').then(function (response) {
            $scope.matiere = response.data;
        }, function (reason) {
            console.log(reason);
        });

        $scope.matiere = "";

        $scope.nom = "";

        // Fonction appelée lors du clic sur supprimer le quiz
        $scope.confirm = function (quiz, $index) {
            $http.delete('http://localhost:8080/suppQuizz/'+ quiz.idQuizz +'', JSON.stringify(quiz)).then(function (response) {
                LxNotificationService.success(quiz.nom + ' a bien été supprimé');
                $scope.removeQuiz($scope.quizList, $index);
            }, function () {
                LxNotificationService.error('Impossible de contacter le serveur');
            });
        };

        // Enleve le quiz supprime de $scope.quizList
        $scope.removeQuiz = function(array, index){
            array.splice(index, 1);
        }

    });