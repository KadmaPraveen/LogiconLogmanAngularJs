app.service('ContainerRequestService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetLookUpData = function () {
        var deferred = $q.defer();

        $http.get(Utility.ServiceUrl + '/freight/ContainerRequest/filter/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    this.SaveConRequest = function (obj) {
        var deferred = $q.defer();

        $http.post(Utility.ServiceUrl + '/freight/ContainerRequest/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }


    this.GetTableList = function (obj) {
        debugger;
        var deferred = $q.defer();

        $http.post(Utility.ServiceUrl + '/freight/ContainerRequest/list/table', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    this.GetContainerRequest = function (requestNo) {
        var deferred = $q.defer();

        $http.get(Utility.ServiceUrl + '/freight/ContainerRequest/GetRequest/' + requestNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });

        return deferred.promise;
    }

    this.GetContainerRequestFromOe = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/freight/ContainerRequest/GetRequestFromOe', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeleteConRequest = function (requestNo) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/freight/ContainerRequest/delete/' + requestNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.SaveActivityStatus = function (obj) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/freight/ContainerRequest/activityLogSave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);