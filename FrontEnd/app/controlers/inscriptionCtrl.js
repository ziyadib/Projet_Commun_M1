//inscriptionCtrl

var inscriptionCtrl = angular.module('inscriptionCtrl', []);
inscriptionCtrl.controller('inscriptionCtrl', function ($scope, $http,$filter, LxNotificationService) {
    console.log("inscriptionCtrl");


    // Liste des choix pour le select du niveau d'étude
    $scope.year = [
        {name: 'L1'},
        {name: 'L2'},
        {name: 'L3'},
        {name: 'M1'},
        {name: 'M2'},
        {name: 'Doctorat'}
    ];

    $http.get('http://localhost:8080/inscription/etablissement').then(function (response) {
        $scope.etablissements = response.data;
        console.log($scope.reponse);
    }, function (reason) {
        console.log(reason);
    });

    $http.get('http://localhost:8080/inscription/formation').then(function (response) {
        $scope.year = response.data;
        console.log($scope.reponse);
    }, function (reason) {
        console.log(reason);
    });


    // ng-models
    $scope.inscEleve = {
        username: "",
        nom: "",
        prenom: "",
        password: "",
        mail: "",
        birthday: undefined,
        year: "",
        typeCompte: 1
    };
    // Vérification du formulaire d'inscritpion
    $scope.isCreateButtonDisabled = function () {
        return false;
    };
    // Fonction appelé lors du click sur le bouton de création de compte
    $scope.accountConfirmCreation = function (quiz) {
        $scope.inscEleve.birthday = $filter('date')($scope.inscEleve.birthday, "yyyy-MM-dd");
        $http.post('http://localhost:8080/inscription', JSON.stringify($scope.inscEleve)).then(function (response) {
            LxNotificationService.success('Votre compte a bien été créé. Merci de vérifier vos mails et de cliquer sur le lien d activation');
            console.log(response);
            $scope.hasAccountCreationButtonBeenClicked = true;
        }, function () {
            console.log("http://localhost:8080/inscription");
            console.log($scope.inscEleve);
            LxNotificationService.error('Impossible de contacter le serveur');
        });

    };


});