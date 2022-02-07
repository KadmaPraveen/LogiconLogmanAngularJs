app.service('HoldStatusService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetHoldStatusList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/holdstatus/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetHoldStatus = function (code) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/holdstatus/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveHoldStatus = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/holdstatus/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteHoldStatus = function (code) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/holdstatus/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);