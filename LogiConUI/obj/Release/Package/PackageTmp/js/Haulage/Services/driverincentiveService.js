app.service('DriverIncentiveService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookUpData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/haulage/driverincentive/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveDriverIncentive = function (di) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/haulage/driverincentive/save', JSON.stringify(di)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetQuotationList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/haulage/driverincentive/quotationlist').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetQuotation = function (quotation) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/haulage/driverincentive/' + quotation).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    /*
    this.SaveDriver = function (driver) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/driver/save', JSON.stringify(driver)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDriver = function (driverId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/driver/' + driverId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteDriver = function (driverId) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/driver/' + driverId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDriverList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/driver/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchDriver = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/driver/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };*/
}]);