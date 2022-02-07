angular.module('LogiCon').controller('LayoutController', ['$scope', '$log', '$location', '$uibModal', 'mySharedService', 'UtilityFunc', 'Utility', '$timeout', '$route', function ($scope, $log, $location, $uibModal, mySharedService, UtilityFunc, Utility, $timeout, $route) {
   
    $scope.Version = Utility.Version;
    $scope.appVersion = Utility.appVersion;    
    $scope.showLinks = false;
    $scope.companyType = '';
    $scope.userName = '';
    $scope.userDesignation = '';

    var defaultLogo = '';//'images/logo.png?v=' + Utility.Version;
    $scope.logo = defaultLogo;
    $scope.$on('LOOKUPSEARCH', function (event, args) {
        $scope.LookUpSearch(args);
    });

    $scope.$on('USERLOGGEDIN', function () {
        $scope.showLinks = true;
        $scope.companyType = UtilityFunc.CompanyType();
        /*
        if (UtilityFunc.IsAuthenticate() && $scope.companyType == '')
            $scope.companyType = 'TRADER';*/

        $scope.userName = UtilityFunc.UserName();
        $scope.userDesignation = UtilityFunc.UserDesignation();
        var logoname = UtilityFunc.Logo();
        if (logoname != null && logoname != "")
            $scope.logo = Utility.BaseUrl + '/UploadImages/' + UtilityFunc.CompanyID() + '/' + logoname;
        else
            $scope.logo = defaultLogo;
    });

    $scope.$on('USERLOGGEDOUT', function () {
        $scope.showLinks = false;
        $scope.logo = defaultLogo;
    });

    /* to retain the login-header when page refresh and back navigations */
    var isUserLoggedIn = (sessionStorage.IS_AUTHENTICATE != null && sessionStorage.IS_AUTHENTICATE != '') ? true : false;
    if (isUserLoggedIn) {
        $scope.showLinks = true;
        $scope.companyType = UtilityFunc.CompanyType();

        /*
        if (UtilityFunc.IsAuthenticate() && $scope.companyType == '')
            $scope.companyType = 'TRADER';*/

        $scope.userName = UtilityFunc.UserName();
        $scope.userDesignation = UtilityFunc.UserDesignation();
        var logoname = UtilityFunc.Logo();
        if (logoname != null && logoname != "")
            $scope.logo = Utility.BaseUrl + '/UploadImages/' + UtilityFunc.CompanyID() + '/' + logoname;
        else
            $scope.logo = defaultLogo;
    }

    /* incomplete registration user loggedin */
    //sessionStorage.removeItem('SsnRegUserID');

    $scope.$on('REGUSERLOGGEDIN', function () {        
        var regUserID = sessionStorage.getItem('SsnRegUserID');
        $scope.showLinks = true;
        $scope.userName = sessionStorage.getItem('SsnRegUserName');
        $scope.userDesignation = '--';
    });

    var regUserID = sessionStorage.getItem('SsnRegUserID');    
    if (!angular.isUndefined(regUserID) && regUserID != null) {        
        $scope.showLinks = true;
        $scope.userName = sessionStorage.getItem('SsnRegUserName');
        $scope.userDesignation = '--';
    }
    
    /**/
    
    $scope.LookUpSearch = function (args) {
        var Url = GetTemplateUrl(args);
       
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: Url,
            controller: 'LookUpController',
              size: 'lg',
            resolve: {
                type: function () {
                    return args;
                }
            }
        });

        modalInstance.result.then(function () {
            //$scope.getAddress();
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    function GetTemplateUrl(type) {
        var templateUrl = 'Js/Shared/Layout/Templates/agent.html?v=' + Utility.Version;       
        
        return templateUrl;
    }

    $scope.logout = function () {        
        angular.forEach(sessionStorage, function (value, key) {
            sessionStorage.removeItem(key);
        });        
        mySharedService.LogOutBroadcast();
        /*
        $location.path('/login');
        $timeout(function () {
            location.reload();
        }, 100);*/
        location.href = 'default.html';
    };

    $scope.logoNavigation = function () {
        if ($scope.showLinks) {
            if ($scope.companyType == 'OWNER') {

            }
        } else {
            location.href = 'default.html?v=' + Utility.Version
        }
    };
}]);

angular.module('LogiCon').controller('LookUpController', ['$scope', '$uibModalInstance', 'type', 'LookUpService', function ($scope, $uibModalInstance, type, LookUpService) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    var Obj = {
        SearchBy: null,
        SearchTable: type,
        txtSearch: '',
        whereclause: null
    };
    var strObj = JSON.stringify(Obj);
    LookUpService.getData(Obj).then(function (res) {
        $scope.modalData = res.data;        
    }, function (err) { });
}]);

//http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api



app.service('LookUpService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.getData = function (Obj) {
        var deferred = $q.defer();        

        $http({
            url: Utility.ServiceUrl + '/search',
            method: 'post',
            data: JSON.stringify(Obj),            
            headers:{ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8', 'Data-Type': 'json' }            
        }).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };
}]);

angular.module('LogiCon').controller('footerCntrl', ['$scope', 'Utility', function ($scope, Utility) {
    $scope.Version = Utility.Version;
    $scope.appVersion = Utility.appVersion;
}]);