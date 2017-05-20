/*
 TODO

 */

var duelQuizzCtrl = angular.module('duelQuizzCtrl', []);
duelQuizzCtrl.controller('duelQuizzCtrl', function ($scope, $http, $routeParams,saveResultatQuizz) {
    var socket = io.connect('http://localhost:8080');

    console.log("ID QUIZZ");
    console.log($routeParams);
    //rajoutez si routeParams.idQuizz est undefiened recup via autre moyen
    $scope.idQuizz = $routeParams.idQuizz;
    var id= $scope.idQuizz;
    console.log("id:"+id);
    socket.emit('thisQuizz',$scope.idQuizz);

    $http.get('http://localhost:8080/quizz/' + $routeParams.idQuizz).then(function (response) {
        $scope.quizz = response.data;
        console.log(response.data);


        var questions = {
            "questions": []
        };

        var idDepart = -1;
        var position = 0;
        var question = {
            "question": "",
            "idQuestion": null,
            "reponse": []
        };

        //Injection des questions
        for (var i = 0; i < response.data.length; i++) {
            question.question = response.data[i].nom;
            question.idQuestion = response.data[i].idQuestion;
            if (idDepart !== response.data[i].idQuestion) {
                //On push la question et le tableau de questions
                questions.questions.push(question);
                //On change de question
                position++;
                idDepart = response.data[i].idQuestion;
                //remise à zero
                question = {
                    "question": "",
                    "idQuestion": null,
                    "reponse": []
                };
            }
        }
        //Injection des reponses correspondant aux questions
        var idQuestionPourInjecterReponse = response.data[0].idQuestion;
        var positionReponse = 0;
        //console.log(response.data.length);
        for (var i = 0; i < response.data.length; i++) {
            var reponse = {
                "estChecker": false,
                "estJuste" : response.data[i].estValide,
                "reponse": response.data[i].proposition
            };
            if (idQuestionPourInjecterReponse == response.data[i].idQuestion) {
                //   console.log(i+" et injection "+response.data[i].proposition);
                questions.questions[positionReponse].reponse.push(reponse);
            } else {
                //console.log("position "+positionReponse);
                idQuestionPourInjecterReponse = response.data[i].idQuestion;
                positionReponse++;
                // console.log(i+" et injection "+response.data[i].proposition);
                questions.questions[positionReponse].reponse.push(reponse);
            }

        }


        //console.log("voici les questions");
        console.log(questions);
        $scope.quizz = questions;
        $scope.resultatPourQuizz = angular.toJson($scope.quizz);
//        $scope.resultatPourQuizz = $scope.quizz;

        $scope.enregistrerResultatLocalStorage = function () {
            console.log("saveResultatQuizz");
            saveResultatQuizz.set(questions);
            console.log(saveResultatQuizz.get());
        };







    }, function (reason) {
        console.log(reason);
    });


});