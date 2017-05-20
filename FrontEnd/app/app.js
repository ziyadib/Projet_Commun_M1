var myApp = angular.module('myRevisator',
    ['lumx', 'chart.js', 'ngRoute',
        'accueilCtrl',
        'loginCtrl',
        'inscriptionCtrl',
        'tableauDeBordCtrl',
        'listeMatiereCtrl',
        'listeQuizzCtrl',
        'quizzCtrl',
        'duelCtrl',
        'listeJoueursCoCtrl',
        'statistiqueCtrl',
        'resultatCtrl',
        'btford.socket-io'])
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q, sharedStorageService) {
            return {
                'request': function (config) {


                    config.headers = config.headers || {};
                    config.headers.Authorization = 3; // sharedStorageService.get();

                    return config || $q.when(config);
                }
            };
        });
    }).factory('mySocket', function (socketFactory) {
        return socketFactory();
    }).factory('sharedStorageService', function () {
        var savedData = {};

        function set(data) {
            savedData = data;
        }

        function get() {
            return savedData;
        }

        return {
            set: set,
            get: get
        }
    }).factory('saveResultatQuizz', function () {
    var savedData = {};

    function set(data) {
        savedData = data;
    }

    function get() {
        return savedData;
    }

    return {
        set: set,
        get: get
    }
});


myApp.run(function ($location, sharedStorageService) {
    if ($location.path() != '/login') {
        if (isNaN(sharedStorageService.get())) {
            $location.path("/accueil");
        }
    }
});