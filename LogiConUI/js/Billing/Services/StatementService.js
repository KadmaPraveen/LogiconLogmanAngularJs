app.service('StatementService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GenerateStatement = function (accountNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/billing/statement/' + accountNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteStatement = function (branchId, statementNo) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/billing/statement/' + branchId + '/' + statementNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ApproveStatement = function (branchId, statementNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/billing/statement/' + branchId + '/' + statementNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetStatement = function (statementNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/statement/' + statementNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);