app.service('HolidayService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

   
  
    this.GetHolidayList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/holiday/list/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetHolidayByDate = function (holiday) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/holiday' , JSON.stringify(holiday)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveHoliday = function (holiday) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/holiday/save', JSON.stringify(holiday)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.DeleteHoliday = function (holidayId) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/holiday', JSON.stringify(holiday)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetCountryList = function () {

        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/vessel/country').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);