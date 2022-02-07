app.service('IMOCodeService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetIMOCodeList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/imocode/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetIMOCode = function (code) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/imocode/' + code).then(function (res) {
            deferred.resolve(res);ss
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveIMOCode = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/imocode/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteIMOCode = function (code) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/imocode/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);