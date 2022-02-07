app.service('k1Service', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1/lookUpData').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.Savek1Declaration = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    //this.k1Inquiry = function (obj, isDefault) {
    //    var deferred = $q.defer();
    //    $http.post(Utility.ServiceUrl + '/declaration/k1/inquiry', JSON.stringify(obj)).then(function (res) {
    //        deferred.resolve(res);
    //    }, function (err) {
    //        deferred.reject(err);
    //    });
    //    return deferred.promise;
    //};

    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDeclaration = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GenerateReportPDF = function (branchID, declarationNo, type) {
        var requestConfig = {
            method: 'Get',
            url: Utility.ServiceUrl + '/download/file/CreatePdfK1Report/' + branchID + '/' + declarationNo + '/' + type,
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



    this.CloneDeclaration = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1/clone/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GenerateFile = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1/GenerateFile', JSON.stringify(obj) ).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.OutPutFOBCIF = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1/outputfobcif', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCustomResponse = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1/customResponse/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCustomResponseInfo = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1/customResponseInfo', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ValidateContainer = function (containerNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/declaration/k1/validate/' + containerNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    //
    this.ClaimantNameResults = function (text) {
        var deferred = $q.defer();
        
        $http.get(Utility.ServiceUrl + '/master/CustomClaimant/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GenearateK1FromK8 = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1/k1fromk8/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeclineDeclaration = function (declarationNo,orderNo) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1/declinedeclartion/' + declarationNo + '/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.GetDeclarationStatus = function (declarationNo,orderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k1/getdeclartionstatus/' + declarationNo + '/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveActivityStatus = function (obj) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k1/activityLogSave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);