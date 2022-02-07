app.service('VesselProfileService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.lookUpData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/VesselProfile/lookupdata').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetVesselList = function (skip, limit) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/VesselProfile/list/' + skip + ',' + limit).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveVesselProfile = function (vp) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/VesselProfile/save', JSON.stringify(vp)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetVessel = function (vesselID) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/VesselProfile/' + vesselID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteVessel = function (vesselID) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/Operation/VesselProfile/' + vesselID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetTableData = function (obj) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/VesselProfile/list/table', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
   
}]);