app.service("SnnService", ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.savesnnupdate = function (obj) {
        var defer = $q.defer();
        debugger;
        $http.post(Utility.ServiceUrl + '/snnupdate/save', JSON.stringify(obj)).then(function (res) {
            debugger;
            defer.resolve(res);
        }, function (err) {
            defer.reject(err);
        });
        return defer.promise;
    }
}]);