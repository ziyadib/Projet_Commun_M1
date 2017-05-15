angular.module('myRevisator')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q) {
            return {
                'request': function(config) {


                    if (SecurityContext.hasToken()) {
                        config.headers = config.headers || {};
                        config.headers.Authorization = 'toto';
                    }
                    return config || $q.when(config);
                }
            };
        });
    });