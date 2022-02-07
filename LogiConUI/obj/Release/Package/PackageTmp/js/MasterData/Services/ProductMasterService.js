app.service('ProductMasterService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
   
    //this.GetLookupData = function () {
    //    
    //    var deferred = $q.defer();
    //    $http.get(Utility.ServiceUrl + '/master/productmaster/lookup/').then(function (res) {
    //        deferred.resolve(res);
    //    }, function (err) {
    //        deferred.reject(err);
    //    });
    //    return deferred.promise;
    //}

    this.GetLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/productmaster/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.SaveProductMaster = function (productmaster) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/productmaster/save', JSON.stringify(productmaster)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    this.GetProductMaster = function (productCode, principalCode) {
       
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/productmaster/' + productCode + ',' + principalCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeleteProductMaster = function (productCode, principalCode) {
        
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/productmaster/' + productCode + ',' + principalCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    
       
}]);