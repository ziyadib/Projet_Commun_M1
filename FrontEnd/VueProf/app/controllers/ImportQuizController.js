/**
 * Created by Victor on 21/02/2016.
 */

angular.module('RevisatorProfApp')
    .controller('ImportQuizController', function ($scope, $http, sharedStorageService, $location, LxNotificationService) {

       /* $scope.upload = function(_newfile){
            console.log("voicciiii eeeeeeee"+_newfile);
        }
*/
        $scope.test = function(){
            console.log("je ressens qlqchose");
        }
        console.log($scope.file);
        // Fonction appelée lors de l'appui sur le bouton de création du quiz
        $scope.confirmCreation = function () {

            $scope.formVerification();
            if ($scope.isFormNotFilledCorrectly === false) {
                for (i = 1; i <= $scope.numberOfQuestions; i++) {
                    $scope.quiz.questions[i].nombreReponse = $scope.nbOfAnswer[i];
                }
                $scope.quiz.nbOfQuestions = $scope.numberOfQuestions;
                $http.post('http://localhost:8080/ajouterQuizz', JSON.stringify($scope.quiz)).then(function (response) {
                    LxNotificationService.success('Votre quiz a bien été créé');
                    $location.path("/welcome");
                }, function () {
                    LxNotificationService.error('Impossible de contacter le serveur');
                });
            }
        };

        $scope.quiz = {
            title: "",
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