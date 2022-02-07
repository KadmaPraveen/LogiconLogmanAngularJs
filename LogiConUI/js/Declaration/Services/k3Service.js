app.service('k3Service', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    

   
    this.GetLookupData = function () {
        var deferred = $q.defer();
        
        $http.get(Utility.ServiceUrl + '/declaration/k3/lookUpData').then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.Savek3Declaration = function (obj) {
        var deferred = $q.defer();
        
        $http.post(Utility.ServiceUrl + '/declaration/k3/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    //this.k3Inquiry = function (obj) {
    //    var deferred = $q.defer();
    //    $http.post(Utility.ServiceUrl + '/declaration/k1/inquiry', JSON.stringify(obj)).then(function (res) {
    //        deferred.resolve(res);
    //    }, function (err) {
    //        deferred.reject(err);
    //    });
    //    return deferred.promise;
    //};

    this.GetDeclaration = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k3/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.OutPutFOBCIF = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k3/outputfobcif', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GenerateFile = function (declarationNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/declaration/k3/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k3/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetCustomResponse = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k3/customResponse/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCustomResponseInfo = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k3/customResponseInfo', JSON.stringify(obj)).then(function (res) {

            
            deferred.resolve(res);
        }, function (err) {
            
            alert(err);
            deferred.reject(err);
            
        });
        return deferred.promise;
    };
    this.CloneDeclaration = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k3/clone/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GenerateReportPDF = function (branchID, declarationNo, type) {
        var requestConfig = {
            method: 'Get',
            url: Utility.ServiceUrl + '/download/file/CreatePdfK3Report/' + branchID + '/' + declarationNo + '/' + type,
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
    this.DeclineDeclaration = function (declarationno, orderno) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k3/Declined/' + declarationno + '/' + orderno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.GetDeclartionStatus = function (declarationno) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k3/getdeclartionstatus/' + declarationno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveActivityStatus = function (obj) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k3/activityLogSave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);