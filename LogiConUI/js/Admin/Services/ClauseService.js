app.service('ClauseService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/declarationclause/lookupdata').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetByClauseCode = function (clauseCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/declarationclause/clauseCode/' + clauseCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveClause = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/declarationclause/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

}]);