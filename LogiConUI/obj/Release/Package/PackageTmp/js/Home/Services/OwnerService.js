app.service('OwnerService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.DashBoardInfo = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/owner/dashboardinfo').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);