app.service('GateInService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.getLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/port/gatein/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.SaveGateIn = function (gi) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/port/gatein/save', JSON.stringify(gi)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.SaveActivityStatus = function (obj) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/port/gatein/activityLogSave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

}]);