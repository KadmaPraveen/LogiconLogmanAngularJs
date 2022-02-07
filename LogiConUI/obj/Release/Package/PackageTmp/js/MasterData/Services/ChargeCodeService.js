app.service('ChargeCodeService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetChargeCodeList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/ChargeCode/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/ChargeCode/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetChargeCode = function (chargeCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/ChargeCode/' + chargeCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteChargeCode = function (chargeCode) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/ChargeCode/' + chargeCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetChargeCodeSearch = function (chargeCodeDesc) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/ChargeCode/search/all/' + chargeCodeDesc).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetChargeCodeSearchByModule = function (module, text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/ChargeCode/' + module + '/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/ChargeCode/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveChargeCode = function (cc) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/ChargeCode/save', JSON.stringify(cc)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.GetGSTValues = function (chargeCode)
    {
       
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/ChargeCode/getGSTValues/' + chargeCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetIsSurChargeCodeSearch = function (chargeCodeDesc) {
        debugger;
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/ChargeCode/chargecode/' + chargeCodeDesc).then(function (res) {
            debugger;
            deferred.resolve(res);
        }, function (err) {
            debugger;
            deferred.reject(err);
        });
        return deferred.promise;
    };

}]);