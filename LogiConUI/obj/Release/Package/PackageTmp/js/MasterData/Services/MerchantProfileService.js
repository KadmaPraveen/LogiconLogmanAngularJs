app.service('MerchantProfileService', ['$http', '$q', 'Utility', 'limitToFilter', function ($http, $q, Utility, limitToFilter) {
    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/MerchantProfile/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetMerchantProfileList = function (skip, limit, filter) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/MerchantProfile/list/' + skip + '/' + limit + '/' + filter).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/MerchantProfile/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    /*admin*/
    this.GetAdminTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/MerchantProfile/admin/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveAdminMerchantProfile = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/MerchantProfile/adminsave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    /*admin*/

    this.GetMerchantProfile = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/MerchantProfile/details', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.InsertMerchantProfile = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/MerchantProfile/InsertMerchantProfile', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveMerchantProfile = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/MerchantProfile/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetMerchantResults = function (text, filter) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/MerchantProfile/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchMerchantResults = function (text, filter) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/MerchantProfile/search/' + text + '/' + filter).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    //this.SearchMerchantResultsForList = function (text) {
    //    var deferred = $q.defer();
    //    $http.get(Utility.ServiceUrl + '/Master/MerchantProfile/SearchMerchantForList/' + text).then(function (res) {
    //        deferred.resolve(res);
    //    }, function (err) {
    //        deferred.reject(err);
    //    });
    //    return deferred.promise;
    //};

    this.DeleteMerchant = function (code) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/MerchantProfile/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetMerchant = function (code) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/MerchantProfile/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetRegistrationNoResults = function (regNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/MerchantProfile/registrationno/' + regNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);