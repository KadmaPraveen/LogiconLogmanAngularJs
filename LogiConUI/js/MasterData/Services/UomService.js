app.service('UomService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.UomList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/uom/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteUom = function (uomCode) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/uom/' + uomCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveUom = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/uom/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };    

    this.GetUom = function (uomCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/uom/' + uomCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);