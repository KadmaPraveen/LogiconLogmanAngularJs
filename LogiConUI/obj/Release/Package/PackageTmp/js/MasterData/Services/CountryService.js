app.service('CountryService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.SaveCountry = function (c) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/Country/save', JSON.stringify(c)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCountry = function (countryCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/Country/' + countryCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteCountry = function (countryCode) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/Country/' + countryCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCountryList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/Country/all/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCountriesList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/country/list').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchCountries = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/country/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    
}]);