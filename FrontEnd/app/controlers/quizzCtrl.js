/*
 TODO

 */


var quizzCtrl = angular.module('quizzCtrl', []);
quizzCtrl.controller('quizzCtrl', function ($scope, $http, $routeParams,saveResultatQuizz) {

    console.log("ID QUIZZ");
    console.log($routeParams);
    $scope.idQuizz = $routeParams.idQuizz;

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

    //chrono quiz 
   /*         var startTime = 0
            var start = 0
            var end = 0
            var diff = 0
            var timerID = 0
            $scope.chrono =function(){
                end = new Date()
                diff = end - start
                diff = new Date(diff)
                var msec = diff.getMilliseconds()
                var sec = diff.getSeconds()
                var min = diff.getMinutes()
                var hr = diff.getHours()-1
                if (min < 10){
                    min = "0" + min
                }
                if (sec < 10){
                    sec = "0" + sec
                }
                if(msec < 10){
                    msec = "00" +msec
                }
                else if(msec < 100){
                    msec = "0" +msec
                }
                document.getElementById("chronotime").innerHTML = hr + ":" + min + ":" + sec + ":" + msec
                timerID = setTimeout("chrono()", 10)
            }
            $scope.chronoStart =function(){
                document.chronoForm.startstop.value = "stop!"
                document.chronoForm.startstop.onclick = chronoStop
                document.chronoForm.reset.onclick = chronoReset
                start = new Date()
                chrono()
            }
            $scope.chronoContinue = function(){
                document.chronoForm.startstop.value = "stop!"
                document.chronoForm.startstop.onclick = chronoStop
                document.chronoForm.reset.onclick = chronoReset
                start = new Date()-diff
                start = new Date(start)
                chrono()
            }
           $scope.chronoReset = function(){
                document.getElementById("chronotime").innerHTML = "0:00:00:000"
                start = new Date()
            }
            $scope.chronoStopReset =function(){
                document.getElementById("chronotime").innerHTML = "0:00:00:000"
                document.chronoForm.startstop.onclick = chronoStart
            }
            $scope.chronoStop =function(){
              document.chronoForm.startstop.value = "start!"
                document.chronoForm.startstop.onclick = chronoContinue
                document.chronoForm.reset.onclick = chronoStopReset
                clearTimeout(timerID)
            }*/

            var centi=0 // initialise les dixtièmes
            var secon=0 //initialise les secondes
            var minu=0 //initialise les minutes 
           var main = null;

            var main = function(){
            centi++; //incrémentation des dixièmes de 1
            if (centi>9){centi=0;secon++} //si les dixièmes > 9,  on les réinitialise à 0 et on incrémente les secondes de 1
            if (secon>59){secon=0;minu++} //si les secondes > 59, on les réinitialise à 0 et on incrémente les minutes de 1
            document.forsec.secc.value=" "+centi //on affiche les dixièmes
            document.forsec.seca.value=" "+secon //on affiche les secondes
            document.forsec.secb.value=" "+minu //on affiche les minutes
            compte=setTimeout('main()',100) //la fonction est relancée tous les 10° de secondes
            }
             $scope.chrono= main;

            $scope.rasee=function(){ //fonction qui remet les compteurs à 0
                clearTimeout(compte) //arrête la fonction chrono()
                centi=0;
                secon=0;
                minu=0;
                document.forsec.secc.value=" "+centi
                document.forsec.seca.value=" "+secon
                document.forsec.secb.value=" "+minu
            }



});