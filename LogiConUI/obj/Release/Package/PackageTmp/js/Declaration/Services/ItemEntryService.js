app.service('ItemEntryService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/declaration/itementry/lookUpData').then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ImportDutyCalculation = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/itementry/importduty/calculation', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ExportDutyCalculation = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/declaration/itementry/exportduty/calculation', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    
}]);