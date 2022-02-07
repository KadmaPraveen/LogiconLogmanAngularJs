app.service('ContainerMasterService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
 
    this.getLookupData = function () {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/gatein/lookup').then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };



    this.SaveContainerStatus = function (containermaster) {
      
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/depot/containermaster/save', JSON.stringify(containermaster)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetContainerMaster = function (continerNo) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/depot/containermaster/' + continerNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    this.DeleteContainerMaster = function (continerNo) {
       
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/depot/containermaster/' + continerNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    this.SaveContainerPortFix = function (obj)
    {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/depot/containermaster/saveContainerPortFix', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.ContainerStatusUpdates = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/depot/containermaster/saveContainerStatusUpdate', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}
]);