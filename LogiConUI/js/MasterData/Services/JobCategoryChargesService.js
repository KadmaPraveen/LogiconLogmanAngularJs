app.service('JobCategoryChargesService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.ChargesLookup = function (moduleID) {        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/charges/lookup/' + moduleID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ChargesByJobCategoryCode = function (jobCategoryCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/charges/' + jobCategoryCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ChargeVasByJobCategoryCode = function (jobCategoryCode, containerKey) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/chargevas/' + jobCategoryCode + '/' + containerKey).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.MovementsByJobCategoryCode = function (jobCategoryCode, containerKey, pumode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/movements/' + jobCategoryCode + ',' + containerKey + ',' + pumode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.MovementsByCategoryCode = function (jobCategoryCode, containerKey) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/movementsbyjobcategory/' + jobCategoryCode + '/' + containerKey).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);