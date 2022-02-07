app.service('ActivityService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetLookUpData = function () {        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/activity/lookUp').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetModules = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/activity/modules').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
  

    this.saveActivity = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/activity/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetActivity = function (actCode, moduleId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/activity/' + moduleId + '/' + actCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetAll = function (module) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/activity/list/' + module).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);