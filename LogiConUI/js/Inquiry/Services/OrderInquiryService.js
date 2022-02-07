app.service('OrderInquiryService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.OrderInquirySearch = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Inquiry/booking/orderinquirysearch', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;

    };

}]);











