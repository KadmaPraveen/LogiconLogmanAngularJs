app.service('PendingBillingService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/billing/pendingbilling/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchPendingBilling = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/billing/pendingbilling/search', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);