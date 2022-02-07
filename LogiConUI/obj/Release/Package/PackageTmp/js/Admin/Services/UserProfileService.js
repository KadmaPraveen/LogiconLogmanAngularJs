app.service('UserProfileService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.getLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/user/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getUsersList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/user/list').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getUser = function (obj) {        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/admin/user/details', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    
    this.SaveUserProfile = function (user) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/admin/user/save', JSON.stringify(user)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    
    this.GetTableData = function (obj) {
       
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/admin/user/list/table', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

}]);