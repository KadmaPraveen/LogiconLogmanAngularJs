app.service('EquipmentSizeTypeService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
   
    this.GetEquipmentSizeTypeList = function (skip, take) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/equipment/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetEquipmentSizeTypeByCode = function (stCode) {
       
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/equipment/'+ stCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveEquipmentSizeType = function (equipmentsizetype) {
       
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/equipment/save', JSON.stringify(equipmentsizetype)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeleteEquipmentSizeType = function (stCode) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/equipment/' + stCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetEquipmentType = function () {      
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/equipment/equipmentType').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);