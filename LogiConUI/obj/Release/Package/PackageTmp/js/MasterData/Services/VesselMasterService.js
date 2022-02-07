app.service('VesselMasterService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {    

    this.GetVesselByVesselName = function (vesselName) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/vessel/search/vesselName/' + vesselName).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
   
    this.GetVesselMasterList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/vessel/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetVesselMasterById = function (vesselId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/vessel/' + vesselId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveVesselMaster = function (vessel) {
       
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/vessel/save', JSON.stringify(vessel)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeleteVesselMaster = function (vesselId) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/vessel/' + vesselId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetCountryList = function () {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/vessel/country').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);