
app.service('CustomerQuotationService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.getCustomerQuotationList = function (quotation) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/CustomerQuotation/list').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getCustomerQuotationListByType = function (quotationType) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/CustomerQuotation/list/' + quotationType).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/CustomerQuotation/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveCustomerQuotation = function (cq) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/CustomerQuotation/save', JSON.stringify(cq)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getCustomerQuotation = function (quotation, quotationtype) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/CustomerQuotation/' + quotation + '/' + quotationtype).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetLookupData = function (type) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/CustomerQuotation/lookup/' + type).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetSearchedQuotations = function (search) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/CustomerQuotation/search/' + search).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteQuotation = function (quotationNo) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/CustomerQuotation/delete/' + quotationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.VoidQuotation = function (quotationNo) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/CustomerQuotation/' + quotationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.ApproveQuotation = function (quotationNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/master/CustomerQuotation/' + quotationNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetStandardQuotation = function () {
        var deferred = $q.defer();
        
        $http.get(Utility.ServiceUrl + '/master/CustomerQuotation/standardquotaion').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);