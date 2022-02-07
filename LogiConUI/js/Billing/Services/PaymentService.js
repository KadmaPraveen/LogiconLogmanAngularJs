app.service('PaymentService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GeneratePayment = function (branchId, statementNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/billing/payment/' + branchId + '/' + statementNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ApprovePayment = function (branchId, paymentNo, statementNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/billing/payment/' + branchId + '/' + paymentNo + '/' + statementNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeletePayment = function (branchId, paymentNo, statementNo) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/billing/payment/' + branchId + '/' + paymentNo + '/' + statementNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetPayment = function (paymentNo, statementNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/billing/payment/' + paymentNo + '/' + statementNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);