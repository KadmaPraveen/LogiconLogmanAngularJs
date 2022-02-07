app.service('EmailSettingService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.SaveEmailSetting = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/admin/emailsetting/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetEmailSetting = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/admin/emailsetting/settings').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SentEmailTo = function (email) {
        debugger;
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/admin/emailsetting/test', JSON.stringify(email)).then(function (res) {
            deferred.resolve(res);
        },
        function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);