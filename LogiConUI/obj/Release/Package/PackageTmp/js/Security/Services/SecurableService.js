app.service('SecurableService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetSecurables = function (userID) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/security/securables/list', JSON.stringify({ EmailID: userID })).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveUserRights = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/security/securables/saverights', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetUserRights = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/security/securables/userrights').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);