
app.service('CollectionAdviceService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.FilterLookup = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/freight/collectionadvice/filter/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);