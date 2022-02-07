app.service('UnBilledOrdersService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function () {
        debugger;
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/unBilledOrders/lookUpData').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetUnBilledOrders = function (offset,limit) {
        debugger;
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/unBilledOrders/UnBilledOrders/'+offset+'/'+limit).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);
