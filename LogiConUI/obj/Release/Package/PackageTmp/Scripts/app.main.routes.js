app.config(function ($stateProvider, $urlRouterProvider, Utility, $ocLazyLoadProvider, $httpProvider, $mdDateLocaleProvider, $sceProvider, $uibModalProvider) {
    
    $uibModalProvider.options.backdrop = 'static';
    $uibModalProvider.options.keyboard = false;

    $sceProvider.enabled(false);

    $stateProvider
        .state('logicon', {
            url: '/',
            views: {
                '': { templateUrl: 'Js/Home/Views/tabs.html?v=' + Utility.Version }
            }

        })
    .state('registration', {
        url: '/registration',
        templateUrl: 'Js/Home/Views/Registration.html?v=' + Utility.Version,
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        name: 'LogiCon',
                        files: [
                            'js/Home/controller/RegistrationController.js?v=' + Utility.Version,
                            'js/Home/Services/RegistrationService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version
                        ]
                    }
                ])
            }
        }
    })
        .state('registrationuserID', {
            url: '/registration/:userID',
            templateUrl: 'Js/Home/Views/Registration.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/RegistrationController.js?v=' + Utility.Version,
                            'js/Home/Services/RegistrationService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('forgotpassword', {
            url: '/forgotpassword',
            templateUrl: 'Js/Home/Views/forgotpassword.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/RegistrationController.js?v=' + Utility.Version,
                            'js/Home/Services/RegistrationService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('emailverification/:uniqueid', {
            url: '/emailverification/:uniqueid',
            templateUrl: 'Js/Home/Views/Emailverification.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/EmailVerificationController.js?v=' + Utility.Version,
                            'js/Home/Services/VerificationService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })

    $urlRouterProvider.otherwise('/');
    $httpProvider.interceptors.push('HttpRequestInterceptor');
    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD/MM/YYYY');
    };
});
