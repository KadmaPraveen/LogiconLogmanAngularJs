app.service('BookingEntryService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.getLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/bookingentry/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getBookingHeader = function (orderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/bookingentry/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getBookingHeaderList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/bookingentry/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.getOrderTypeData = function (bookingtype) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/bookingentry/ordertypenpumode/' + bookingtype).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveBookingHeader = function (bookingHeader) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/depot/bookingentry/save', JSON.stringify(bookingHeader)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchPorts = function (text) {
        //var deferred = $q.defer();
        //$http.get(Utility.ServiceUrl + '/Master/Port/search/1300/' + text).then(function (res) {
        //    deferred.resolve(res);
        //}, function (err) {
        //    deferred.reject(err);
        //});
        //return deferred.promise;

        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/Port/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);