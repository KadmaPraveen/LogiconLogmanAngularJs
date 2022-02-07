app.service('BookingEntryService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.getLookupData = function () {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/port/portbooking/lookup').then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getBookingHeader = function (orderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/port/portbooking/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getBookingHeaderList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/port/portbooking/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    
    this.getOrderTypeData = function (bookingtype) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/port/portbooking/ordertypenpumode/' + bookingtype).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveBookingHeader = function (bookingHeader) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/port/portbooking/save', JSON.stringify(bookingHeader)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.deleteBookingEntry = function (orderNo) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/port/portbooking/deleteBookingEntry/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchPorts = function (text) {       

        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/Port/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.BookingBLAutoComplete = function (text) {
        
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/port/portbooking/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ContainerDetailAutoCompleteByContainerNo = function (obj) {        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/port/portbooking/search/container', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.SaveActivityStatus = function (obj) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/port/portbooking/activityLogSave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);