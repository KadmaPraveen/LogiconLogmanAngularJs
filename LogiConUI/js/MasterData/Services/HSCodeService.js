app.service('HSCodeService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/hscode/lookupData').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.Search = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/hscode/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.AutoComplete = function (text) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/hscode/autocomplete/' + text).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.AutoCompletek2Export = function (text) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/hscode/autocomplete/k2export/' + text).then(function (res) {
            deferred.resolve(res);
            
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetHSCodeHeader = function (headingCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/hscode/' + headingCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetHSCode = function (tariffCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/hscode/gethscode/' + tariffCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetHSCodeHeaderAutoComplete = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/hscode/hscodeheader/autocomplete/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetHSCodeHeaderByTariffCode = function (tariffCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/hscode/tariffcode/' + tariffCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTableList = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/hscode/list/table', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveHSCode = function (hs) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/hscode/save', JSON.stringify(hs)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);