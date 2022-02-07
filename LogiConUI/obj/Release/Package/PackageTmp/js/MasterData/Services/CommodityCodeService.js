app.service('CommodityCodeService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
   
    

    this.GetCommodityCodeList = function (skip, take) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/commoditycode/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

  

    this.SaveCommodityCode = function (cmc) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/commoditycode/save', JSON.stringify(cmc)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeleteCommodityCode = function (commodityCode) {
        
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/commoditycode/' + commodityCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }


    this.GetCommodityByCode = function (commodityCode) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/commoditycode/' + commodityCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

}]);