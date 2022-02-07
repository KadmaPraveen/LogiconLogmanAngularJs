app.service('ProcessMasterService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.getProcessMasterList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/processmaster/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/processmaster/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getProcessMasterListByModule = function (module, transportMode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/processmaster/module/' + module + "/" + transportMode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/processmaster/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveProcess = function (pm) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/processmaster/save', JSON.stringify(pm)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetProcess = function (code) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/processmaster/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteProcessMaster = function (code) {
        
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/processmaster/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);