var app = angular.module('LogiConMain', [
    'ngAnimate',
    'ngResource',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'oc.lazyLoad',
    'nouislider',
    'ngTable',
    'ngSanitize',
    //'ui.bootstrap.datetimepicker',
    //'ui.dateTimeInput
    'ngMaterial',
    'ngMaterialDatePicker',
    'treeControl',
    'mwl.calendar',
    'ngTagsInput',
    'vtex.ngCurrencyMask'
]);





app.factory('mySharedService', function ($rootScope) {
    var sharedService = {};
    sharedService.path = '';

    sharedService.prepForBroadcast = function (path) {
        this.path = path;
        this.broadcastItem(path);
    };

    sharedService.broadcastItem = function (path) {
        $rootScope.$broadcast('handleBroadcast');
    };

    sharedService.LoginBroadcast = function () {
        this.broadcastLogin();
    };

    sharedService.broadcastLogin = function () {
        $rootScope.$broadcast('USERLOGGEDIN');
    };

    sharedService.LogOutBroadcast = function () {
        this.broadcastLogOut();
    };

    sharedService.broadcastLogOut = function () {
        $rootScope.$broadcast('USERLOGGEDOUT');
    };

    sharedService.RegUserLoggedIn = function () {
        this.broadcastRegLoggedIn();
    };

    sharedService.broadcastRegLoggedIn = function () {
        $rootScope.$broadcast('REGUSERLOGGEDIN');
    };

    sharedService.LookUpSearchItem = function (type) {
        $rootScope.$broadcast('LOOKUPSEARCH', type);
    };

    return sharedService;
});

app.controller('TabsCtrl', ['$scope', '$state', '$timeout', 'UtilityFunc', '$window', 'Utility', '$rootScope', function ($scope, $state, $timeout, UtilityFunc, $window, Utility, $rootScope) {
    var counter = 0 //1;
    $scope.tabs = [];

    var addTab = function (obj) {
        counter++;

        angular.forEach($scope.tabs, function (item, index) {
            item.active = false;
        });

        $scope.tabs.push({
            title: obj.Title,
            content: 'iframe-template.html?id=' + obj.State,
            tabIndex: counter - 1,//$scope.tabs.length,
            active: true
        });


        $timeout(function () {
            $scope.active = counter - 1//$scope.tabs.length - 1;
        }, 300);

    };

    var removeTab = function (event, index) {
        event.preventDefault();
        event.stopPropagation();
        $scope.tabs.splice(index, 1);
    };

    $scope.addTab = addTab;
    $scope.removeTab = removeTab;

    addTab({
        Title: 'Dashboard',
        State: UtilityFunc.CompanyType() == 'OWNER' ? 'owner' : 'user'
    });

    $rootScope.$on('NEW_TAB_REQUEST', function (event, args) {
        addTab({
            Title: args.Title,
            State: args.State
        });
    });

    //alert($(document).height());
    //if ($window.location.hostname === 'localhost')
    //    $scope.iframeHeight = 662 - 85;
    //else
    //    $scope.iframeHeight = $(document).height() - 85;

    // $scope.iframeHeight = $(document).height() - 85;


    $scope.appVersion = Utility.appVersion;
}]);

app.directive('resize', function ($window) {
    return function (scope, element) {
       var w = angular.element($window);
        scope.getWindowDimensions = function () {
            return {
                'h': w.height(),
                //'w': w.width()
            };
        };
        scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {
            scope.iframeHeight = newValue.h - 85;
            // scope.windowWidth = newValue.w;

            scope.style = function () {
                return {
                    'height': (newValue.h - 100) + 'px',
                    // 'width': (newValue.w - 100) + 'px'
                };
            };

        }, true);

        w.bind('resize', function () {
            scope.$apply();
        });
    }
})

app.directive('tabHighlight', [function () {
    return {
        restrict: 'A',
        link: function (scope, element) {
            var x, y, initial_background = '#c3d5e6';

            element
                .removeAttr('style')
                .mousemove(function (e) {
                    // Add highlight effect on inactive tabs
                    if (!element.hasClass('active')) {
                        x = e.pageX - this.offsetLeft;
                        y = e.pageY - this.offsetTop;

                        element
                            .css({ background: '-moz-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background })
                            .css({ background: '-webkit-radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background })
                            .css({ background: 'radial-gradient(circle at ' + x + 'px ' + y + 'px, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.0) 45px), ' + initial_background });
                    }
                })
                .mouseout(function () {
                    element.removeAttr('style');
                });
        }
    };
}]);

app.directive('hasRight', function () {
    return {

        link: function (scope, element, attrs) {
            
            var rightvalue = attrs.rightvalue;
            var AccessRight = attrs.accessright;
            var flag = false;
            var rights = JSON.parse(sessionStorage.getItem('SECURABLES'));
            angular.forEach(rights, function (item, index) {
                
                if (item.OperationID == rightvalue && item.AccessRight != "1" && AccessRight != "3" && item.AccessRight != "0")
                    flag = true;
                else if (item.OperationID == rightvalue && item.AccessRight == AccessRight)
                    flag = true;
                else if (item.OperationID == rightvalue && item.AccessRight == "0")
                    flag = true;
                else if (item.OperationID == rightvalue && item.AccessRight == "4")
                    flag = true;
                //if (item.OperationID == rightvalue && item.AccessRight == "1")
                //    flag = false;
                if (item.OperationID == rightvalue)
                    flag = true;
            });
            if (flag)
                element.show();
            else
                element.hide();
        }
    }
});
