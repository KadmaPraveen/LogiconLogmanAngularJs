app.service('RolesService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/roles/list').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetAllRoles = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/securables/getallroles').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.SaveRole = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/admin/roles/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetRole = function (roleCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/roles/' + roleCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteRole = function (roleCode) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/admin/roles/' + roleCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);