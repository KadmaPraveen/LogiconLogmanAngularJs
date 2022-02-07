app.service('k8Service', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k8/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k8/lookUpData').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDeclaration = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k8/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.Savek8Declaration = function (obj) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k8/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.k8Inquiry = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k8/inquiry', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GenerateFile = function (declarationNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/declaration/k8/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GenerateReportPDF = function (branchID, declarationNo, type) {
        var requestConfig = {
            method: 'Get',
            url: Utility.ServiceUrl + '/download/file/CreatePdfK8Report/' + branchID + '/' + declarationNo + '/' + type,
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
        $http.get(Utility.ServiceUrl + '/declaration/k8/clone/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCustomResponse = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k8/customResponse/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCustomResponseInfo = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k8/customResponseInfo', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ValidateContainer = function (containerNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/declaration/k8/validate/' + containerNo).then(function (res) {
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

    this.OutPutFOBCIF = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k8/outputfobcif', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.WarehouseAutoComplete = function (WarehouseName, CustomStationCode) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k8/warehouse/' + WarehouseName + '/' + CustomStationCode).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.PortAutoComplete = function (portName) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k8/port/' + portName).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.MovementAutoComplete = function (stationName) {
        var deferred = $q.defer();
        
        $http.get(Utility.ServiceUrl + '/declaration/k8/Movement/' + stationName).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    this.DeclineDeclaration = function (declarationno, orderno) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k8/Declined/' + declarationno + '/' + orderno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.GetDeclartionStatus = function (declarationno) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k8/getdeclartionstatus/' + declarationno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveActivityStatus = function (obj) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k8/activityLogSave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);