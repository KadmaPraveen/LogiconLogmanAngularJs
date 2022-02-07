app.service('TruckMasterService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookUpData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/truck/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveTruck = function (truck) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/truck/save', JSON.stringify(truck)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTruck = function (truckId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/truck/' + truckId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteTruck = function (truckId) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/truck/' + truckId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTruckList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/truck/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);