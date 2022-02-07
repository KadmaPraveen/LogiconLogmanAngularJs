app.service('PortAreaService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.portByCountryCode = function (countryCode, skip, limit) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/Port/bycountry/' + countryCode + '/' + skip + ',' + limit).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.portByPortCode = function (portCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/Port/' + portCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetIntegrationBranch = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/Port/integrationbranch').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetPortListByCountryPortName = function (countryCode, text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/Port/' + countryCode + '/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SavePort = function (port) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/Port/save', JSON.stringify(port)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.DeletePortArea = function (portCode) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/Port/' + portCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    //this.PortAutoComplete = function (text) {
    //    var deferred = $q.defer();
    //    $http.get(Utility.ServiceUrl + '/Master/Port/search/1300/' + text).then(function (res) {
    //        deferred.resolve(res);
    //    }, function (err) {
    //        deferred.reject(err);
    //    });
    //    return deferred.promise;
    //};

    //Common port details
    this.PortAutoComplete = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/Port/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.PortReport = function (text) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/Master/port/report').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };



}]);