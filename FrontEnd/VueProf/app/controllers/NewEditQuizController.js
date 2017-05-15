/**
 * Created by Victor on 21/02/2016.
 */

angular.module('RevisatorProfApp')
    .controller('NewEditQuizController', function ($scope, $http, sharedStorageService, $location, LxNotificationService) {


        // Récupération de la liste des matières
        $http.get('http://localhost:8080/listeMatiereProf').then(function (response) {
            $scope.matiere = response.data;
        }, function (reason) {
            console.log(reason);
        });

        // Récupération de la liste des niveaux d'étude
        $http.get('http://localhost:8080/inscription/formation').then(function (response) {
            $scope.domaine = response.data;
        }, function (reason) {
            console.log(reason);
        });

        // Affiche le nom et le prénom de l'utilisateur connecté dans la ToolBar
        $scope.nom = "";

        // Liste des domaines
        $scope.domaine = "";

        // Liste des matières
        $scope.matiere = "";


        // Permet d'enregistrer le domaine sélectionné
        $scope.selectedDomaine = '';

        $scope.selectedMatiere = '';

        // Lorsque l'utilisateur sélectionne un domaine, enregistre le domaine en mémoire
        $scope.setSelectedDomaine = function (domaine) {
            $scope.selectedDomaine = domaine;
        };

        // Lorsque l'utilisateur sélectionne un domaine, enregistre le domaine en mémoire
        $scope.setSelectedMatiere = function (matiere) {
            $scope.selectedMatiere = matiere;
        };

        // Nb de question que comporte le quiz, par défaut 1
        $scope.numberOfQuestions = 1;

        // Renvoie le nombre de question que comporte le quiz sous forme d'un tableau (pour ng-repeat)
        $scope.getNumberOfQuestions = function (num) {
            return new Array(num);
        };

        // Incrémente le nombre de questions
        $scope.increaseNumberOfQuestions = function () {
            $scope.numberOfQuestions = $scope.numberOfQuestions + 1;
        };

        // Décrémente le nombre de questions
        $scope.decreaseNumberOfQuestions = function () {
            if ($scope.numberOfQuestions != 1) {
                $scope.numberOfQuestions = $scope.numberOfQuestions - 1;
            }
        };

        // Liste des choix possibles pour le nombre de réponses
        $scope.nbAnswer = [
            {name: 2},
            {name: 3},
            {name: 4},
            {name: 5},
            {name: 6}
        ];

        // Stock le nombre de réponses pour chaque question, où le n° de la qu est l'index du tableau
        $scope.nbOfAnswer = [];
        $scope.showAnswetSelect = [];

        // Enregistre le nombre de réponse que l'utilisateur souhaite avoir pour une question
        $scope.setSelectedNbAnswer = function (QuestionNb, nbOfAnswer) {
            $scope.nbOfAnswer[QuestionNb] = nbOfAnswer;
        };

        // Retourne le nombre de réponses pour une question donnée sous la forme d'un tableau (ng-repeat)
        $scope.getNbOfAnswer = function (questionNb) {
            return new Array($scope.nbOfAnswer[questionNb]);
        };

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


// Variable de désactivation / activation du bouton envoyé
        $scope.isFormNotFilledCorrectly = '';

        // Vérification du formulaire
        $scope.formVerification = function () {

            var notification = '';
            var isSometingWrong = false;
            var areCorrectAnswer = false;

            // Titre
            if ($scope.quiz.title === '' || $scope.quiz.title === undefined) {
                LxNotificationService.error('- Le titre du quiz n\'est pas renseigné');
                isSometingWrong = true;
            }

            // Domaine
            if ($scope.quiz.year === '' || $scope.quiz.year === undefined) {
                LxNotificationService.error('\n- Le domaine du quiz n\'est pas renseigné');
                isSometingWrong = true;
            }

            // Matière
            if ($scope.quiz.matiere === '' || $scope.quiz.matiere === undefined) {
                LxNotificationService.error('\n- La matière du quiz n\'est pas renseigné');
                isSometingWrong = true;
            }

            // Nombre de question
            if ($scope.numberOfQuestions === 1) {
                LxNotificationService.error('\n- Un quiz ne peut pas avoir qu\'une seule question');
                isSometingWrong = true;
            }

            // Titre des questions et réponses
            for (i = 1; i < $scope.numberOfQuestions + 1; i++) {
                areCorrectAnswer = false;
                // Question renseignée
                if (angular.isUndefined($scope.quiz.questions[i])) {
                    LxNotificationService.error('\n- La question ' + i + ' et ses réponses ne sont pas renseignés');
                    isSometingWrong = true;
                    // Nb de réponses
                    if ($scope.nbAnswer[i] === 1 || $scope.nbOfAnswer[i] === undefined) {
                        LxNotificationService.error('\n- La questoion ' + i + ' ne possède qu\' une seule réponse');
                        isSometingWrong = true;
                    }
                } else {
                    // Question
                    if ($scope.quiz.questions[i].questionTitle === '') {
                        LxNotificationService.error('\n- Le titre de la questoion ' + i + ' n\'est pas renseigné');
                        isSometingWrong = true;
                    }
                    // Nb de réponses
                    if ($scope.nbAnswer[i] === 1 || $scope.nbOfAnswer[i] === undefined) {
                        LxNotificationService.error('\n- La questoion ' + i + ' ne possède qu\' une seule réponse');
                        isSometingWrong = true;
                    }
                    // Réponses
                    for (j = 1; j <= $scope.nbOfAnswer[i]; j++) {
                        if (angular.isUndefined($scope.quiz.questions[i].questionAnswer[j])) {
                            LxNotificationService.error('\n- La réponse ' + j + ' de la questoion ' + i + ' n\'est pas renseigné');
                            isSometingWrong = true;
                        }
                        else {
                            if ($scope.quiz.questions[i].questionAnswer[j] === '') {
                                LxNotificationService.error('\n- La réponse ' + j + ' de la questoion ' + i + ' n\'est pas renseigné');
                                isSometingWrong = true;
                            }
                        }
                        // Réponses correctes
                        if (angular.isUndefined($scope.quiz.questions[i].correctAnswer)) {
                            if (j === $scope.nbOfAnswer[i]) {
                                LxNotificationService.error('\n- La question ' + i + ' n\' a pas de bonne réponse');
                                isSometingWrong = true;
                            }

                        }
                        else {
                            if ($scope.quiz.questions[i].correctAnswer[j] === true) {
                                areCorrectAnswer = true;
                            }
                            if (areCorrectAnswer === false && j === $scope.nbOfAnswer[i]) {
                                LxNotificationService.error('\n- La question ' + i + ' n\' a pas de bonne réponse');
                                isSometingWrong = true;
                            }
                        }
                    }

                }


            }

            if (isSometingWrong === true) {
                $scope.isFormNotFilledCorrectly = true;
            } else {
                $scope.isFormNotFilledCorrectly = false;
            }

        };

        //      $scope.hasSendQuizButtonBeenClicked = false;

    });