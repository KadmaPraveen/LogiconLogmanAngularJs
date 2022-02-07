app.service('TariffService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function (tariffno) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/tariff/lookupdata/' + tariffno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveTariff = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/tariff/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetList = function (tarifftype) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/tariff/' + tarifftype).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTariff = function (QuotationNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/tariff/byquotationno/' + QuotationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);