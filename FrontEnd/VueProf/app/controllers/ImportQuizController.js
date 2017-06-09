/**
 * Created by Victor on 21/02/2016.
 */

angular.module('RevisatorProfApp')
    .controller('ImportQuizController', function ($scope, $http, sharedStorageService, $location, LxNotificationService) {
        var texteintroductif = "Ce module a pour objectif de vous permettre d'importer vos propres quiz merci de respecter \n le pattern ci-dessous " +$scope.quiz;
        $scope.explicationsDetaillees =texteintroductif;
        $scope.test ="toz";
    $scope.add = function() {
        var f = document.getElementById('file').files[0],
            r = new FileReader();

        r.onloadend = function(e) {
              var data =e.target.result;
              console.log("data normale"+data);

            $http.post('http://localhost:8080/ajouterQuizz',data).then(function (response) {
                        LxNotificationService.success('Votre quiz a bien été créé');
                        $location.path("/welcome");
                    }, function () {
                        LxNotificationService.error('Impossible de contacter le serveur');
                    });
            
        }
        var buffer =r.readAsText(f);
          //  console.log(buffer);
    }



        $scope.quiz = {
            title: "titre du quizz",
            questions: [{
                questionTitle: "",
                questionAnswer: "",
                correctAnswer: "",
                nombreReponse: ""
            }],
            year: "",
            matiere: "",
            nbOfQuestions: ""
        };


    });