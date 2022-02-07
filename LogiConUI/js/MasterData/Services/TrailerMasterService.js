app.service('TrailerMasterService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookUpData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/trailer/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveTrailer = function (trailer) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/trailer/save', JSON.stringify(trailer)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTrailer = function (trailerId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/trailer/' + trailerId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteTrailer = function (trailerId) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/trailer/' + trailerId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTrailerList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/trailer/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchTrailer = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/trailer/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);