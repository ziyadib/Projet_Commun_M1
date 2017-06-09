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

        $scope.export =function(quiz){
            console.log(quiz);
            console.log(quiz.idQuizz);
            $http.get('http://localhost:8080/quizz/'+quiz.idQuizz+'').then(function (response) {
                var data = response.data
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

                        console.log("voici les questions");
                        console.log(questions);
                         var doc = new jsPDF();
                         //doc.setFillColor(0, 204, 68);
                         var str=["Revisator quizz: "+quiz.nom+"\n\n"];
                        // doc.lines([[2,2],[-2,2]], 212,110, 10);
                         var cpt=0
                        //edition du pdf
                        for(var i=0; i<questions.questions.length;i++){
                            //console.log("i"+i);
                            if(i >=4 && questions.questions.length > 4 && i%4 ===0 ){
                                   // console.log(i+"=i vs cpt:"+cpt);
                                    cpt++;
                                   //console.log(i+"=i vs i+1:"+(i+1));
                                   str[cpt]=(i+1)+") "+questions.questions[i].question+"\n";
                                    
                            }else {  
                                    str[cpt]=str[cpt]+(i+1)+") "+questions.questions[i].question+"\n";
                                    //console.log("str: "+str[cpt]);
                                    // doc.text(questions.questions[i].question+"\n",10,10);
                            }
                           str[cpt]=str[cpt]+"\n";
                            for(var j=0; j<questions.questions[i].reponse.length;j++){
                               // doc.text(questions.questions[i].reponse[j].reponse+"\n",50,10);
                               str[cpt]=str[cpt]+questions.questions[i].reponse[j].reponse+"\n";
                            }
                             //console.log("str + question: "+str[cpt]);
                            str[cpt]=str[cpt]+"\n";
                        }
                        //ecriture du pdf
                        for(var i=0; i<=cpt; i++){
                            //console.log("cpt:"+cpt+"\n str:"+str[i]);
                            doc.text(str[i],10,10);
                            doc.addPage();
                        }
                        //envoie du pdf
                        doc.save(quiz.nom+".pdf");

            });
        }
    });