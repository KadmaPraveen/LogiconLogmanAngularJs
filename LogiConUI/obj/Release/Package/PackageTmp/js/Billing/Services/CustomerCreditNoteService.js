app.service('CustomerCreditNoteService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.InvoiceResults = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CreditNote/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject();
        });
        return deferred.promise;
    }
    this.GetCreditListByInvoiceNo = function (invoiceNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CreditNote/creditnotes/' + invoiceNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject();
        });
        return deferred.promise;
    }
    this.SaveCreditList = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Billing/CreditNote/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject();
        });
        return deferred.promise;
    }
    this.GetTableList = function (obj) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Billing/CreditNote/list/table', JSON.stringify(obj)).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject();
        });
        return deferred.promise;
    }
    this.EditCreditNote = function (invoiceNo) {

        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CreditNote/GetCustomerCreditEdit/' + invoiceNo).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject();
        });
        return deferred.promise;
    }
}]);

