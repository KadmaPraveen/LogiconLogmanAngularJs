app.service('GstRateService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
   
    this.GetRateByGstCode = function (gstCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/gstrate/' + gstCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;        
    };

    this.GetGSTRateList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/gstrate/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetRateByGstCode = function (gstCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/gstrate/' + gstCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveGSTRateCode = function (gst) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/gstrate/save', JSON.stringify(gst)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeleteGSTRateCode = function (gstCode) {
        
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/gstrate/' + gstCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);