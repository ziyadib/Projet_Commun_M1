/**
 * Created by Victor on 20/02/2016.
 */
var app = angular.module('RevisatorProfApp', ['lumx', 'ngRoute']);

app.config(function ($routeProvider) {

    $routeProvider
        .when('/welcome', {
            controller: 'MainPageController',
            templateUrl: 'app/views/MainPage.html'
        })
        .when('/newQuiz', {
            controller: 'NewEditQuizController',
            templateUrl: 'app/views/NewEditQuiz.html'
        })
        .when('/', {
            controller: 'LoginController',
            templateUrl: 'app/views/LoginPage.html'
        })
        .otherwise({
            redirectTo: '/'
        });
}).config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, sharedStorageService) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                config.headers.Authorization = sharedStorageService.get();

                return config || $q.when(config);
            }
        };
    });
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
});

// Redirige en cas de perte du userID
app.run(function ($location, sharedStorageService) {

    if ($location.path() != '/') {
        if (isNaN(sharedStorageService.get())) {
            $location.path("/");
        }
    }
});
