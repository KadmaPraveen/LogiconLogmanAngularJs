app.service('CustomerCashBillService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/billing/CustomerCashBill/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.Save = function (ccb) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/billing/CustomerCashBill/save', JSON.stringify(ccb)).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.getDataByContainerKeys = function (keys) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/billing/CustomerCashBill/keys', JSON.stringify(keys)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveAddress=function(obj)
    {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/billing/CustomerCashBill/SaveAddress', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.Delete = function (Invoiceno) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/billing/CustomerCashBill/' + Invoiceno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);