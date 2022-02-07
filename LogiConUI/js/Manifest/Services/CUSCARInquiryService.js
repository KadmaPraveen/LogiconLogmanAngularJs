app.service('CUSCARInquiryService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.CUSREPInquiry = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/edi/cusrep/inquiry').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);