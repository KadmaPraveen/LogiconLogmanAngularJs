app.service('CostSheetService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.SearchOrder = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/searchOrders/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetLookupData = function (OrderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CostSheet/lookup/' + OrderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCostSheetListByOrderNo = function (orderno) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CostSheet/' + orderno).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveCostSheet = function (cs) {
     
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Billing/CostSheet/save', JSON.stringify(cs)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetCostSheetList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Billing/CostSheet/CostSheetList').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetTableData = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Billing/CostSheet/list/table',JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);