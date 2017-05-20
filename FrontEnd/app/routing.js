myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/accueil', {
        templateUrl: 'app/views/accueil.html',
        controller: 'accueilCtrl'
    });
    $routeProvider.when('/login', {
        templateUrl: 'app/views/login.html',
        controller: 'loginCtrl'
    });
    $routeProvider.when('/inscription', {
        templateUrl: 'app/views/inscription.html',
        controller: 'inscriptionCtrl'
    });
    $routeProvider.when('/tableauDeBord', {
        templateUrl: 'app/views/tableauDeBord.html',
        controller: 'tableauDeBordCtrl'
    });
      $routeProvider.when('duel/listeQuizz', {
        templateUrl: 'app/views/listeQuizz.html',
        controller: 'duelCtrl'
    });
    $routeProvider.when('/listeMatiere', {
        templateUrl: 'app/views/listeMatiere.html',
        controller: 'listeMatiereCtrl'
    });
    $routeProvider.when('/listeQuizz/:idMatiere', {
        templateUrl: 'app/views/listeQuizz.html',
        controller: 'listeQuizzCtrl'
    });
    $routeProvider.when('/quizz/:idQuizz', {
        templateUrl: 'app/views/quizz.html',
        controller: 'quizzCtrl'
    });
    $routeProvider.when('/statistique', {
        templateUrl: 'app/views/statistique.html',
        controller: 'statistiqueCtrl'
    });
    $routeProvider.when('/listeJoueursCo', {
        templateUrl: 'app/views/listeJoueursCo.html',
        controller: 'listeJoueursCoCtrl'
    });
    $routeProvider.when('/resultat/:idResultatQuizz', {
        templateUrl: 'app/views/resultat.html',
        controller: 'resultatCtrl'
    });
    //a enlever une fois que les resultat sont bien transmi
    $routeProvider.when('/resultat', {
        templateUrl: 'app/views/resultat.html',
        controller: 'resultatCtrl'
    });
    $routeProvider.when('/duel', {
        templateUrl: 'app/views/duel.html',
        controller: 'duelCtrl'
    });
    $routeProvider.otherwise({
        redirectTo: '/accueil'
    });

}]);