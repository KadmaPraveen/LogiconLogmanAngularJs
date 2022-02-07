app.service('BookingEntryListService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.SearchBookingEntries = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/port/portbooking/SearchBookingEntries', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);