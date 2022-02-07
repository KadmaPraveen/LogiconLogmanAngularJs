app.service('AddressService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetAddress = function (code) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/address/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);