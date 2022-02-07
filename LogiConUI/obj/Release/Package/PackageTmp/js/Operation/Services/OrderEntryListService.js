app.service('OrderEntryListService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    //this.SearchOrderEntries = function (obj) {        
    //    var deferred = $q.defer();
    //    $http.post(Utility.ServiceUrl + '/Operation/OrderEntry/SearchOrderEntries', JSON.stringify(obj)).then(function (res) {            
    //        deferred.resolve(res);
    //    }, function (err) {
    //        deferred.reject(err);
    //    });
    //    return deferred.promise;
    //};

    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/OrderEntry/list/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


}]);
