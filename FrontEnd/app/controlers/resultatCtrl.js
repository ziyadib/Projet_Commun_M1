

var resultatController = angular.module('resultatCtrl', []);
resultatController.controller('resultatCtrl', function ($scope,$http,$routeParams,LxNotificationService ,LxDialogService,saveResultatQuizz) {
   // console.log("routeparam");
   // console.log($routeParams);

    $scope.resultatPourServeur = {
        "bonneReponse" : 0,
        "total" : 0,
        "idQuizz" : $routeParams.idResultatQuizz
    };

    var resultatFinal = {
        "resultat" : []
    };

    //saveResultatQuizz.get()


    $scope.resultat=saveResultatQuizz.get().questions;
  //  console.log("resultat saveResultatQuizz");
   // console.log($scope.resultat);

    for(var i= 0; i<$scope.resultat.length; i++){
        var reponse = {
            "intituleQuestion": $scope.resultat[i].question,
            "estJuste": true,
            "BonneReponse": []
        };
        for(var j=0; j< $scope.resultat[i].reponse.length;j++){
            if( $scope.resultat[i].reponse[j].estChecker == true && $scope.resultat[i].reponse[j].estJuste==0 || $scope.resultat[i].reponse[j].estChecker == false && $scope.resultat[i].reponse[j].estJuste==1 ){
                reponse.estJuste = false;
            }
            if($scope.resultat[i].reponse[j].estJuste==1){
                reponse.BonneReponse.push($scope.resultat[i].reponse[j].reponse);
            }

        }
        resultatFinal.resultat.push(reponse);
    }

    $scope.resultatPourHTML = resultatFinal.resultat;
    //enregistrement des resultats afin de l'envoyer ensuite en BDD
    for(var i=0; i<resultatFinal.resultat.length;i++){
        console.log("total++");
        $scope.resultatPourServeur.total++;
        if(resultatFinal.resultat[i].estJuste == true){
            console.log("bonne reponse ++");
            $scope.resultatPourServeur.bonneReponse++;
        }
    }
    console.log($scope.resultatPourServeur);
    console.log(resultatFinal.resultat);



    //Requete post pour enregistrer les resultats dans la BDD
    $http.post('http://localhost:8080/resultats', JSON.stringify($scope.resultatPourServeur)).then(function (response) {
        LxNotificationService.success('Vos r�sultat ont bien �t� sauvegard�');
    }, function () {
        LxNotificationService.error('Impossible de contacter le serveur');
    });

    $scope.more=function(dialogId)
    {
        LxDialogService.open(dialogId);
    };


    /*
    $http.get('app/requetes/resultatFinal.json').then(function(response){
        $scope.resultat=response.data.questions;
        console.log($scope.resultat);

        for(var i= 0; i<$scope.resultat.length; i++){
            var reponse = {
                "intituleQuestion": $scope.resultat[i].question,
                "estJuste": true,
                "BonneReponse": []
            };
            for(var j=0; j< $scope.resultat[i].reponse.length;j++){
                if( $scope.resultat[i].reponse[j].estChecker == true && $scope.resultat[i].reponse[j].estJuste==0 || $scope.resultat[i].reponse[j].estChecker == false && $scope.resultat[i].reponse[j].estJuste==1 ){
                 reponse.estJuste = false;
                }
                if($scope.resultat[i].reponse[j].estJuste==1){
                    reponse.BonneReponse.push($scope.resultat[i].reponse[j].reponse);
                }
            }
            resultatFinal.resultat.push(reponse);
        }
        console.log("Resultat final");
        console.log(resultatFinal);

        $scope.resultatPourHTML = resultatFinal.resultat;

        $scope.more=function(dialogId)
        {
            LxDialogService.open(dialogId);
        };


    },function(reason){
        console.log(reason);
    });
*/






});