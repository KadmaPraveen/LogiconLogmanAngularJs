app.service('BookingInquiryService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function (code) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/inquiry/booking/lookUp').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);