app.service('CurrencyService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.SaveCurrency = function (c) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/Currency/save', JSON.stringify(c)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCurrency = function (currencyCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/Currency/' + currencyCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteCurrency = function (currencyCode) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/Currency/' + currencyCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCurrencyList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/Currency/all/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);