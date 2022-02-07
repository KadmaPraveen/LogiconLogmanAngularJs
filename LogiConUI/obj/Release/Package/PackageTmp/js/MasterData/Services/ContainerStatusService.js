app.service('ContainerStatusService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
   
    this.GetContainerStatusList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/containerstatus/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetContainerStatusByCode = function (Code) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/containerstatus/' + Code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveContainerStatus = function (containerstatus) {
      
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/containerstatus/save', JSON.stringify(containerstatus)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeleteContainerStatus = function (Code) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/containerstatus/' + Code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

}]);