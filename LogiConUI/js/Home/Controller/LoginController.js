angular.module('LogiCon').controller('LoginCntrl', ['$scope', '$location', 'mySharedService', 'RegistrationService', 'LayoutService', 'growlService', function ($scope, $location, mySharedService, RegistrationService, LayoutService, growlService) {
    sessionStorage.removeItem('SsnRegUserID');
    sessionStorage.removeItem('SsnRegUserName');
    mySharedService.LogOutBroadcast();

    $scope.showLoading = false;
    $scope.login = function () {
        sessionStorage.setItem('IS_AUTHENTICATE', true);
        $location.path('/home');
        mySharedService.LoginBroadcast();
    };

    $scope.isFrmLoginValid = false;
    $scope.$watch('frmLogin.$valid', function (isValid) {
        $scope.isFrmLoginValid = isValid;
    });

    $scope.log = {};
    $scope.Login = function (log) {        
        if ($scope.isFrmLoginValid) {
            $scope.showLoading = true;
            /*
            if (log.Email == 'admin@gmail.com' && log.Password == 'admin') {
                growl.success('Welcome admin', {});
                sessionStorage.setItem('IS_AUTHENTICATE', true);
                sessionStorage.setItem('COMPANYTYPE', 'OWNER');
                sessionStorage.setItem('USERID', 'admin@gmail.com');
                sessionStorage.setItem('COMPANYID', '1000');

                mySharedService.LoginBroadcast();
                $location.path('/owner');
                $scope.showLoading = false;
            } else {
                if (log.Email == 'arigelavijay@ymail.com' && log.Password == '1234') {
                    growl.success('Welcome Vijay', {});
                    sessionStorage.setItem('IS_AUTHENTICATE', true);
                    sessionStorage.setItem('COMPANYTYPE', 'TRADER');
                    sessionStorage.setItem('USERID', 'arigelavijay@ymail.com');
                    sessionStorage.setItem('COMPANYID', '1001');                   
                    
                    LayoutService.GetUserRights().then(function (d) {                        
                        mySharedService.LoginBroadcast();                        
                        $location.path('/home');
                        $scope.showLoading = false;

                        sessionStorage.setItem('SsnUserRights', JSON.stringify(d.data));
                    }, function (err) { });                    
                } else {
                    RegistrationService.Login(log).then(function (d) {
                        if (d.data.Status) {
                            growl.success('Complete the registration process', {});
                            $location.path('/registration');
                            sessionStorage.setItem('SsnRegUserID', d.data.UserID);
                        } else {
                            growl.warning('Bad email or password', {});
                        }
                        $scope.showLoading = false;
                    }, function (err) { });
                }
            }*/
            RegistrationService.Login(log).then(function (d) {
                $scope.showLoading = false;
                sessionStorage.removeItem('SsnRegUserID');
                if (!angular.isUndefined(d.data.USERID)) {                    
                    if (d.data.IS_AUTHENTICATE) {
                        growlService.growl(d.data.Message, 'success');
                        sessionStorage.setItem('IS_AUTHENTICATE', d.data.IS_AUTHENTICATE);
                        sessionStorage.setItem('COMPANYTYPE', d.data.COMPANYTYPE);
                        sessionStorage.setItem('USERID', d.data.USERID);
                        sessionStorage.setItem('COMPANYID', d.data.COMPANYID);
                        sessionStorage.setItem('BRANCHID', d.data.BRANCHID);
                        sessionStorage.setItem('USERNAME', d.data.USERNAME);
                        sessionStorage.setItem('USERDESIGNATION', d.data.USERDESIGNATION);
                        sessionStorage.setItem('LOGO', d.data.LOGO);
                        sessionStorage.setItem('COMPANYSUBSCRIPTIONLIST', JSON.stringify(d.data.COMPANYSUBSCRIPTIONLIST));
                        
                        LayoutService.GetUserRights(d.data.USERID).then(function (res) {
                            mySharedService.LoginBroadcast();
                            if (d.data.COMPANYTYPE == 'OWNER')
                                $location.path('/owner');
                            else
                                $location.path('/home');

                            $scope.showLoading = false;
                            sessionStorage.setItem('SsnUserRights', JSON.stringify(res.data));
                        }, function (err) { });
                    } else {
                        growlService.growl(d.data.Message, 'success');
                        $location.path('/registration');                        
                        
                        sessionStorage.setItem('SsnRegUserID', d.data.USERID);
                        sessionStorage.setItem('SsnRegUserName', log.Email);
                        mySharedService.RegUserLoggedIn();
                    }                    
                } else {
                    if (!angular.isUndefined(d.data.Message))
                        growlService.growl(d.data.Message, 'warning');
                    else
                        growlService.growl(d.data, 'warning');
                }
                $scope.showLoading = false;
            }, function (err) { });
        } else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    };
}]);

app.service('LayoutService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    
    this.GetUserRights = function (UserID) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/security/securables/userrights/' + UserID+'/').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);