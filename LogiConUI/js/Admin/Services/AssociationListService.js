app.service('AssociationListService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.saveAssociation = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/admin/association/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/association/list').then(function (res) {            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetAssociation = function (associationID) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/association/' + associationID).then(function (res) {            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);