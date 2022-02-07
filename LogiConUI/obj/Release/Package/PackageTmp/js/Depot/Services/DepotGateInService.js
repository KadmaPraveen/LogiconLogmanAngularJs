app.service('DepotGateInService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.getLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/gatein/lookUp').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.SaveGateIn = function (gi) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/depot/gatein/save', JSON.stringify(gi)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);