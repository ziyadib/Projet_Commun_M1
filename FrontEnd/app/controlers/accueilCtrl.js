var accueilController = angular.module('accueilCtrl', []);
accueilController.controller('accueilCtrl', function ($scope, $location, $window) {


	$scope.redirectProf = function(){
	
	$window.open(window.location.origin + window.location.pathname + "/VueProf");
	
	}

});