app.service('DepotBookingService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookUpData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/bookingentry/lookUp').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.getOrderTypeData = function (bookingtype) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/bookingentry/ordertypenpumode/' + bookingtype).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveBookingEntry = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/depot/bookingentry/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetBookingEntry = function (orderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/bookingentry/'+orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }



    this.BookingBLAutoComplete = function (text) {

        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/depot/bookingentry/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.ContainerDetailAutoCompleteByContainerNo = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/depot/bookingentry/search/container', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };




    this.GetTableData = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/depot/bookingentry/list/table', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.deleteBookingEntry = function (orderNo) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/depot/bookingentry/deleteBookingEntry/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

}]);