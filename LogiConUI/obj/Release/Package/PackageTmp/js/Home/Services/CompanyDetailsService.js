app.service('CompanyDetailsService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.CompanyDetails = function (companyID) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/root/companydetails/' + companyID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    
    
}]);