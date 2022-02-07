app.service('VerificationService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.EmailVerification = function (uniqueid) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/root/verify/' + uniqueid).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);