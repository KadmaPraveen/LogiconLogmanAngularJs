app.factory('HttpRequestInterceptor', ['$rootScope', '$q', 'growlService', '$timeout', function ($rootScope, $q, growlService, $timeout) {
    return {
        request: function ($config) {

            var IS_AUTHENTICATE = sessionStorage.getItem('IS_AUTHENTICATE') == 'true' ? true : false;
            var AUTH_TOKEN = '';
            var USER_ID = '';
            var COMPANY_ID = '';
            var AUTHTOKEN = '';
            if (IS_AUTHENTICATE) {
                COMPANY_ID = sessionStorage.getItem('COMPANYID');
                USER_ID = sessionStorage.getItem('USERID');
                BRANCH_ID = sessionStorage.getItem('BRANCHID');
                AUTHTOKEN = sessionStorage.getItem('AUTHTOKEN');

                $config.headers['COMPANY_ID'] = COMPANY_ID;
                $config.headers['USERID'] = USER_ID;
                $config.headers['BRANCH_ID'] = BRANCH_ID;
                $config.headers['AUTH_TOKEN'] = AUTHTOKEN;
            }

            /*
            var IS_AUTHENTICATE = sessionStorage.getItem('IS_AUTHENTICATE') == 'true' ? true : false;
            if (IS_AUTHENTICATE) {
                $config.headers['AUTH_TOKEN'] = AUTH_TOKEN;
                $config.headers['USER_ID'] = USER_ID;
            }*/

            return $config;
        },
        responseError: function (err) {
            //
            //if (rejection.status > 399) { // assuming that any code over 399 is an error
            //    $q.reject(rejection)
            //}

            //return rejection;

            if (!angular.isUndefined(err.data) && err.data != null) {
                if (err.data == 'LOGIN SESSION EXPIRED') {
                    growlService.growl("LOGIN SESSION EXPIRED.", 'danger');
                    $timeout(function () {
                        parent.window.location.href = 'default.html';
                    }, 4000);

                }
                if (err.data == 'NO ACCESS RIGHT')
                    growlService.growl("You don't have permissions to asscess. Please Contact Administrator.", 'danger');
            }
            return $q.reject(err);

        }
    }
}]);

app.directive('preventRightClick', ['$window',
    function ($window) {
        //return true;
        if ($window.location.hostname != 'localhost') {
            $(document).keydown(function (event) {
                if (event.keyCode == 123) {
                    return false;
                }
                else if ((event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.shiftKey && event.keyCode == 74)) {
                    return false;
                }
            });
        }
        return {
            restrict: 'A',
            link: function ($scope, $ele) {
                $ele.bind("contextmenu", function (e) {
                    if ($window.location.hostname != 'localhost') {
                        e.preventDefault();
                    }
                });
            }
        };
    }
]);



app.factory('UtilityFunc', ['$filter', '$q', function ($filter, $q) {
    var obj = {};
    obj.removeArrayElementByKey = function (array, key, value) {
        if (array.length == 0)
            return array;
        else {

            var filterObj = {};
            filterObj[key] = value;

            var removableList = $filter('filter')(array, filterObj);

            angular.forEach(removableList, function (obj, key) {
                var index = array.indexOf(obj);
                array.splice(index, 1);
            });

            return array;
        }
    };

    obj.GetExcelData = function (file, sheetName) {
        var deferred = $q.defer();
        var reader = new FileReader();
        var name = file.name;
        if (name.split('.')[1] == 'xlsx') {
            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, { type: 'binary' });
                var data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                deferred.resolve(data);
            };
            reader.readAsArrayBuffer(file);
        } else if (name.split('.')[1] == 'xls') {
            reader.onload = function (e) {
                var data = e.target.result;
                var cfb = XLS.CFB.read(data, { type: 'binary' });
                var workbook = XLS.parse_xlscfb(cfb);
                var data = XLS.utils.sheet_to_json(workbook.Sheets[sheetName]);
                deferred.resolve(data);
            };
            reader.readAsBinaryString(file);
        }
        return deferred.promise;
    };

    obj.UserID = function () {
        return sessionStorage.getItem('USERID');
    };

    obj.UserName = function () {
        return sessionStorage.getItem('USERNAME');
    };

    obj.UserDesignation = function () {
        return sessionStorage.getItem('USERDESIGNATION');
    };

    obj.CompanyID = function () {
        return parseInt(sessionStorage.getItem('COMPANYID'));
    };

    obj.BranchID = function () {
        return parseInt(sessionStorage.getItem('BRANCHID'));
    };

    obj.AuthToken = function () {
        return sessionStorage.getItem('AUTHTOKEN');
    };

    obj.CompanyType = function () {
        return sessionStorage.getItem('COMPANYTYPE');
    };

    obj.IsDefaultBranch = function () {
        var companyId = this.CompanyID();
        var branchId = this.BranchID();
        var defaultBranchId = companyId + '001';

        return branchId == defaultBranchId;

    };

    obj.Logo = function () {
        return sessionStorage.getItem('LOGO');
    };

    obj.IsAuthenticate = function () {
        return sessionStorage.getItem('IS_AUTHENTICATE') == 'true' ? true : false;
    };

    obj.CompanySubscriptionList = function () {
        return JSON.parse(sessionStorage.getItem('COMPANYSUBSCRIPTIONLIST'))
    };
    //
    //obj.getSecurable=function()
    //{
    //    var ar = new Array();
    //    ar.push('Order Entry.Save');
    //    ar.push('Order Entry.Delete');
    //    return ar;
    //}
    //obj.getSecurable = function () {
    //    var ar = new Array();
    //    ar.push('Order Entry.Save');
    //    ar.push('Order Entry.Delete');
    //    return ar;;
    //}
    obj.DateFormat = function () {
        return 'DD/MM/YYYY';
    };

    obj.TimeFormat = function () {
        return 'hh:mm';
    };

    obj.DateTimeFormat = function () {
        return 'DD/MM/YYYY hh:mm';
    };

    obj.DateTimeFormat12 = function () {
        return 'DD/MM/YYYY hh:mm a';
    };

    obj.DefaultCurrency = function () {
        return 'MYR';
    };

    obj.DefaultCountry = function () {
        return 'MY';
    };

    obj.FirstDateOfMonth = function () {
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var firstDay = new Date(y, m, 1);
        return moment(firstDay);
    };

    obj.StandardQuotationkey = function () {
        return 'STANDARD_1000001';
    };

    obj.DataGridNorecords = function () {
        return 'No records found.';
    };



    obj.GetSecurables = function () {
        // var array = new Array();
        // array.push('Order Entry.Delete');
        //// array.push('Order Entry.Save');
        // array.push('Order Entry.View');
        //array.push('ORDERENTRY.SAVE');
        //array.push('ORDERENTRY.DELETE');
        //array.push('ORDERENTRY.SENDTODECLARATION');
        //array.push('ORDERENTRY.SAVE');
        //return JSON.parse(sessionStorage.getItem('GetSecurables'))
        //has-securable data-securable="ORDERENTRY.SAVE"
        //return array;
        return JSON.parse(sessionStorage.getItem('SECURABLES'))
    };

    //obj.GetRegx = function (inputNumber) {
    //    
    //    //var numbers = inputNumber.split('.');
    //    //var preDecimal = numbers[0];
    //    //var postDecimal = numbers[1];
    //    //if (preDecimal.length > 4 || postDecimal.length > 4) {

    //    //    this.select();
    //    //}
    ////    return number.search(/^[0-9]{0,3}.?[0-9]{0,3}$/) == 0 ? true : false;

    //    //
    //    return inputNumber='/^[0-9]{0,13}.?[0-9]{0,4}$/';
    //    //return '';
    //};

    //obj.GetRegx = function (preDecimal, postDecimal) {
    //    
    //    var regStr = '^[0-9]{0,' + preDecimal + '}.?[0-9]{0, ' + postDecimal + '}$';
    //    console.log(regStr);
    //    return regStr;
    //}
    return obj;
}]);

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

app.filter('trustAsResourceUrl', ['$sce', function ($sce) {
    return function (val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);

app.directive('activityLogs', function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            linkbranchId: '@linkbranchId',
            linkdocumentNo: '@linkdocumentNo',
            linkmoduleId: '@linkmoduleId',
            transactionbranchId: '@transactionbranchId',
            transactionNo: '@transactionNo',
            transactionmoduleId: '@transactionmoduleId',
            title: '@title',
            widgettitle: '@widgettitle',
            widgetclass: '@widgetclass',
            ispullright: '@ispullright'
        },
        templateUrl: 'js/Default/Templates/activity-logs.html',
        controller: ['$scope', '$q', '$http', 'Utility', '$attrs',
            function ($scope, $q, $http, Utility, $attrs) {
                $scope.GetActivities = function (activityObj) {
                    var deferred = $q.defer();
                    $http.post(Utility.ServiceUrl + '/master/activity/activities', JSON.stringify(activityObj)).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                };
                $scope.showWidget = false;

                $scope.GetActivities({
                    LinkBranchID: $scope.linkbranchId,
                    LinkDocumentNo: $scope.linkdocumentNo,
                    LinkModuleID: $scope.linkmoduleId,
                    TransactionBranchID: $scope.transactionbranchId,
                    TransactionNo: $scope.transactionNo,
                    TransactionModuleID: $scope.transactionmoduleId
                }).then(function (d) {
                    $scope.activityList = d.data.activities;
                    $scope.percent = d.data.percent;
                    $scope.showWidget = true;
                    $scope.ispullright = ($scope.ispullright == 'true' ? true : false);

                    $scope.options = {
                        lineWidth: 20,
                        lineCap: 'circle'
                    };

                }, function (err) { });

            }]
    };
});

app.directive('hasModule', function ($filter, UtilityFunc) {
    return {
        link: function (scope, element, attrs) {
            var companySubscriptionList = UtilityFunc.CompanySubscriptionList();
            var moduleArray = attrs.module.split(',');

            var flag = false;
            for (var i = 0; i < moduleArray.length; i++) {
                var obj = $filter('filter')(companySubscriptionList, { ModuleDescription: moduleArray[i].trim().toLowerCase() }, true)[0];
                if (!angular.isUndefined(obj)) {
                    if (obj.ModuleDescription.toLowerCase() == moduleArray[i].trim().toLowerCase()) {
                        flag = true;
                        break;
                    }
                }
            }

            if (flag)
                element.show();
            else
                element.hide();

        }
    };
});


app.service("LookUpService", ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetCurrencyList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/Currency/currencylookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }



}]);