
angular.module('RevisatorProfApp')
    .controller('ImportQuizController', function ($scope, $http, sharedStorageService, $location, LxNotificationService) {
      //texte explicatif pour l'utilisateur
        var texteintroductif = "Ce module a pour objectif de vous permettre d'importer vos propres quiz merci de respecter \n le pattern ci-dessous:" ;
        var patternTitle = "{\"title\":\"le titre de ce quizz est pattern\",";
        var patternQuestion ="\"questions\":[{\"questionTitle\":\"titre question 1\",\"questionAnswer\":{\"1\":\"reponse question 1\",\"2\":\"reponse 2 question 1\"},\"correctAnswer\":{\"1\":false,\"2\":true},\"nombreReponse\":2},{\"questionTitle\":\"titre question 2\",\"questionAnswer\":{\"1\":\"reponse 1 question 2\",\"2\":\"reponse 2 question 2\"},\"correctAnswer\":{\"2\":true},\"nombreReponse\":2}],";
        var patternComplementaire ="\"year\":{\"idNiveau_etude\":3,\"niveau\":\"BAC +4\"},\"matiere\":{\"nom\":\"Nom matiere du quizz\"},\"nbOfQuestions\":2}";
        $scope.explicationsDetaillees =texteintroductif;
        $scope.patternTitle = patternTitle;
        $scope.patternQuestion=patternQuestion;
        $scope.patternComplementaire=patternComplementaire;



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