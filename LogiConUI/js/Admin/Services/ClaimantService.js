app.service('ClaimantService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.GetClaimantDatatable = function (obj) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/CustomClaimant/list/table', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.saveClaimant = function (obj) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/CustomClaimant/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;;
    }
    //this.saveClaimant = function (obj) {
    //    
    //    var deferred = $q.defer();
    //    $http.post(Utility.ServiceUrl + '/master/Reposiory/save', JSON.stringify(obj)).then(function (res) {
    //        deferred.resolve(res);
    //    }, function (err) {
    //        deferred.reject(err);
    //    });
    //    return deferred.promise;;
    //}
    this.getClaimant = function (claimantID) {
        var deferred = $q.defer();
        
        $http.get(Utility.ServiceUrl + '/master/CustomClaimant/getcustomClaimant/' + claimantID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    this.deleteClaimant = function (claimantID) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/CustomClaimant/delete/' + claimantID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
    
}]);