app.service('k1AService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1A/lookUpData').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.Savek1ADeclaration = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1A/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetK1Declaration = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1A/getk1declaration/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1A/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.CloneDeclaration = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1A/clone/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetDeclaration = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1A/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GenerateReportPDF = function (branchID, declarationNo, type) {
        var requestConfig = {
            method: 'Get',
            url: Utility.ServiceUrl + '/download/file/CreatePdfK1AReport/' + branchID + '/' + declarationNo + '/' + type,
            responseType: 'arraybuffer',
            cache: 'true'
        };

        $http(requestConfig)
            .success(function (data) {
                var arr = new Uint8Array(data);
                var raw = '';
                var i, j, subArray, chunk = 5000;
                for (i = 0, j = arr.length; i < j; i += chunk) {
                    subArray = arr.subarray(i, i + chunk);
                    raw += String.fromCharCode.apply(null, subArray);
                }
                var b64 = btoa(raw);
                //attrs.$set('src', "data:image/jpeg;base64," + b64);
                download('data:application/pdf;base64,' + b64, declarationNo + '.pdf', 'application/pdf')
            });
    };
    this.GetCustomResponse = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1A/customResponse/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GenerateFile = function (declarationNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/declaration/k1A/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetCustomResponseInfo = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1A/customResponseInfo', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.DeclineDeclaration = function (declarationno, orderno) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1A/Declined/' + declarationno + '/' + orderno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    this.GetDeclartionStatus = function (declarationno) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1A/getdeclartionstatus/' + declarationno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveActivityStatus = function (obj) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1A/activityLogSave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);