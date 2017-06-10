var listeQuizzCtrl = angular.module('listeQuizzCtrl', []);
listeQuizzCtrl.controller('listeQuizzCtrl', function ($scope,$http,$routeParams,LxNotificationService) {
    console.log($routeParams.idMatiere);

    $http.get('http://localhost:8080/listeQuizz/'+$routeParams.idMatiere).then(function(response){
        $scope.listeQuizz=response.data;
        console.log($scope.listeQuizz);
        //recuperation des scores et affectation aux quizz
            $http.get('http://localhost:8080/listeQuizz/aVoter/score').then(function(response){
		        $scope.score=response.data;
		        //console.log($scope.score);
		        for(var i=0; i<response.data.length;i++){
		        	for(var j =0; j<$scope.listeQuizz.length; j++){
		        		//console.log("objet j:"+$scope.listeQuizz[j]);
		        		if(response.data[i].id_quizz=== $scope.listeQuizz[j].idQuizz){
		        			$scope.listeQuizz[j].score = response.data[i].nbVotes;
		        			//console.log("listeQuizzscore:"+$scope.listeQuizz[j].score+" response data score"+response.data[i].nbVotes);
		        		}
		        	}
		        }
		    },function(reason){
		        console.log(reason);
		    });

    },function(reason){
        console.log(reason);
    });

$scope.post = {
        idquizz : 0
    };
    $scope.aVoter = function (quizz) {
         	$scope.post.idquizz = quizz.idQuizz;
         	console.log("poste.idquizz"+$scope.post.idquizz);
         	console.log(JSON.stringify($scope.post.idquizz));
       $http.post('http://localhost:8080/listeQuizz/aVoter',JSON.stringify($scope.post)).then(function (response) {
            LxNotificationService.success('Votre vote a été pris en compte, Merci pour votre contribution');
            console.log(response);
        }, function () {
            console.log("error : http://localhost:8080/listeQuizz/aVoter");
            LxNotificationService.error('Vous avez deja voter pour ce quizz');
     });
     };

     $scope.deVoter = function (quizz) {
     	$scope.idquizz = quizz.idQuizz;
     	console.log('id quizz a supprimer'+quizz.idQuizz);
           $http.delete('http://localhost:8080/listeQuizz/deVoter/'+$scope.idquizz+'', JSON.stringify(quizz)).then(function (response) {
                LxNotificationService.success('Votre vote a bien été retiré');
            }, function () {
                LxNotificationService.error('Impossible de retirer un vote que vous n\'avez pas effectué ');
            });
     };
});