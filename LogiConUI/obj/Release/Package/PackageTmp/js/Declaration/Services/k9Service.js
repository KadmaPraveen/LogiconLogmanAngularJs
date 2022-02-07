app.service('k9Service', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k9/lookUpData').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTableList = function (Obj) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k9/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.Savek9Declaration = function (obj) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k9/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GenerateReportPDF = function (branchID, declarationNo, type) {
        var requestConfig = {
            method: 'Get',
            url: Utility.ServiceUrl + '/download/file/CreatePdfK9Report/' + branchID + '/' + declarationNo + '/' + type,
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
        $http.get(Utility.ServiceUrl + '/declaration/k9/clone/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.k9Inquiry = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k9/inquiry', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDeclaration = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k9/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetCustomResponse = function (declarationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k9/customResponse/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCustomResponseInfo = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k9/customResponseInfo', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.OutPutFOBCIF = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k9/outputfobcif', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.GenerateFile = function (declarationNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/declaration/k9/' + declarationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.ClaimantNameResults = function (text) {
        var deferred = $q.defer();
        
        $http.get(Utility.ServiceUrl + '/master/CustomClaimant/search/' + text).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            
            deferred.reject(err);
        });
        return deferred.promise;
    }



    this.WarehouseAutoComplete = function (WarehouseName) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k9/warehouse/' + WarehouseName).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.WarehouseRocAutoComplete = function (WarehouseRocNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k9/warehouseroc/' + WarehouseRocNo).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.AutoCompleteItemType = function (itemDescription) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k9/ItemDetails/' + itemDescription).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeclineDeclaration = function (declarationno, orderno) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k9/Declined/' + declarationno + '/' + orderno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    this.GetDeclartionStatus = function (declarationno) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/k9/getdeclartionstatus/' + declarationno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveActivityStatus = function (obj) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/k9/activityLogSave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);