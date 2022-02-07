app.service('PUDOMasterService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
  
    this.GetPUDOMasterList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/pudomaster/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetPUDOMaster = function (pudomaster) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/pudomaster/getpudomaster', JSON.stringify(pudomaster)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SavePUDOMaster = function (pudomaster) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/pudomaster/save', JSON.stringify(pudomaster)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeletePUDOMaster = function (pudomaster) {

      
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/pudomaster/deletepudomaster', JSON.stringify(pudomaster)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }




    this.GetBookingTypeList = function () {
      
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/pudomaster/bookingtypelist').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    
    this.GetPUDOModeList = function (BookingType) {        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/pudomaster/pudomodelist/'+BookingType).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetOrderTypeList = function () {      
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/pudomaster/ordertypelist').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetMovementCodeList = function (OrderType) {      
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/pudomaster/movementcodelist/'+OrderType).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


}]);