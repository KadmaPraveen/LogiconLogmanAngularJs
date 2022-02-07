app.service('DeclarantService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetDeclarantList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/declarant/list').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.saveDeclarant = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/admin/declarant/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;;
    };

    this.getDeclarant = function (declatantId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/declarant/getdeclarant/' + declatantId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.deleteDeclarant = function (declatantId) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/admin/declarant/delete/' + declatantId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDeclarantDatatable = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/admin/declarant/list/table', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);