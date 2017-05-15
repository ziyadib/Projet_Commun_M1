

var statistiqueController = angular.module('statistiqueCtrl', []);
statistiqueController.controller('statistiqueCtrl', function ($scope,$http) {

    /*
    $http.get('app/requetes/statistique.json').then(function(response){
        $scope.stat=response.data.statistique;
    //    console.log($scope.stat);
    },function(reason){
        console.log(reason);
    });
    */

    $scope.stat = [];

    $http.get('http://localhost:8080/statDetaille').then(function(response){
        $scope.statistique=response.data;
       console.log(response.data);

        //On va d'abord faire un premier tour pour filtrer les statistique en fonction des matières
        var triParIdMatiere = -1;//$scope.statistique[0].idMatiere;
        for(var i=0; i<$scope.statistique.length;i++){
            var template = {
                "idMatiere" : "",
                "nomMatiere" : "",
                "label": [],
                "series": [],
                "data": [[]]
            };
            if($scope.statistique[i].idMatiere!=triParIdMatiere){
                console.log("ici");
                template.idMatiere=$scope.statistique[i].idMatiere;
                template.nomMatiere=$scope.statistique[i].nom;
              //  console.log("template : ");
              //  console.log(template);
                triParIdMatiere=$scope.statistique[i].idMatiere;
                $scope.stat.push(template);
            }
        }
        console.log("Resultat Triééé --- Tour 1");
        console.log($scope.stat);

        //Puis on fera un deuxieme tour pour inserer les valeurs de statistiques dans chaque matiere
        for(var i=0;i<$scope.statistique.length;i++){
            var idMatierePourInjecter = $scope.statistique[i].idMatiere;
            for(var j=0;j<$scope.stat.length;j++){
                if(idMatierePourInjecter == $scope.stat[j].idMatiere){
                    $scope.stat[j].label.push($scope.statistique[i].quizz);
                    $scope.stat[j].data[0].push(
                        ($scope.statistique[i].nbQuestionBonne * 20) / $scope.statistique[i].nbQuestionTotal); //On met la note sur 20
                    $scope.stat[j].series.push($scope.statistique[i].nom);
                }
            }
        }
        console.log("Resultat Triééé --- Tour 1");
        console.log($scope.stat);



    },function(reason){
        console.log(reason);
    });



});