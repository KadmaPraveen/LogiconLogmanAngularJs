app.service('CustomDeclarantService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetCustomDeclarantAutoComplete = function (declarantId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/customdeclarant/' + declarantId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);