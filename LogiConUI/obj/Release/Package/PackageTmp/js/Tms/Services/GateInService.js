app.service('GateInService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.getLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/gatein/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getDamageData = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/gatein/damage/' + text).then(function (res) {
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

    this.SearchGateInTrans = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/gatein/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetGateInTrans = function (transNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/gatein/' + transNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    
}]);