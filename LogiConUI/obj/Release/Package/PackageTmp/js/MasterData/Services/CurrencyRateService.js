app.service('CurrencyRateService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.CurrencyRateList = function (currencyCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/currencyrate/list/' + currencyCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveCurrencyRateList = function (currencyRateList) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/currencyrate/save', JSON.stringify(currencyRateList)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetExRate = function (currencyCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/currencyrate/exrate/' + currencyCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);