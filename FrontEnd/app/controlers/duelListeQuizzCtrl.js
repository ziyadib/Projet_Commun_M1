var duelListeQuizzCtrl = angular.module('duelListeQuizzCtrl', []);
duelListeQuizzCtrl.controller('duelListeQuizzCtrl', function ($scope,$http,$routeParams) {
    console.log($routeParams.idMatiere);

    $http.get('http://localhost:8080/listeQuizz/'+$routeParams.idMatiere).then(function(response){
        $scope.listeQuizz=response.data;
        console.log($scope.listeQuizz);
    },function(reason){
        console.log(reason);
    });
    var socket = io.connect('http://localhost:8080');
   	socket.emit('wichQuizz',"votre hote est en train de choisir le quizz tenez vous pret!");

   	$scope.shareQuiz= function(idQ){
   		console.log('je trasmets le quizz aux autres');
   		socket.emit('thisQuizz',idQ);
   	};
});