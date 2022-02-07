app.service('CustomerInvoiceService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetLookupData = function (iscashbill) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CustomerInvoice/lookup/' + iscashbill).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    
    this.GetTableList = function (Obj) {
        debugger;
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Billing/CustomerInvoice/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveCustomerInvoice = function (ci) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Billing/CustomerInvoice/save', JSON.stringify(ci)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetExchangeRate = function (currCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CustomerInvoice/getExchangeRate/' + currCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.GetList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CustomerInvoice/list').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveAddress = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Billing/CustomerInvoice/SaveAddress', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.Delete = function (Invoiceno) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Billing/CustomerInvoice/' + Invoiceno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetInvoiceHeader = function (InvoiceNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CustomerInvoice/' + InvoiceNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ApproveCancelInvoice = function (InvoiceNo, ApproveCancel) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/Billing/CustomerInvoice/' + InvoiceNo + '/' + ApproveCancel).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    //this.ApproveCashBillDetails = function () {

    //    var deferred = $q.defer();
    //    $http.get(Utility.ServiceUrl + '/Billing/CustomerInvoice/' + InvoiceNo).then(function (res) {
    //        deferred.resolve(res);
    //    }, function (err) {
    //        deferred.reject(err);
    //    });
    //    return deferred.promise;
    //};
    
    this.GetAddress = function (addressId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/address/' + addressId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);