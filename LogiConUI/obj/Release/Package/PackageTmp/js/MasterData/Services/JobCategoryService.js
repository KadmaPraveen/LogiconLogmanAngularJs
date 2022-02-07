app.service('JobCategoryService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

    this.getJobCategoryList = function (skip, take) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/list/all/' + skip + ',' + take).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTableList = function (Obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/jobcategory/table', JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getJobCategoryListByJobType = function (jobType, shipmentType) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/list/' + jobType + '/' + shipmentType).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getJobCategoryItem = function (code) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getLookupData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveJobCategory = function (jc) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/jobcategory/save', JSON.stringify(jc)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.RemoveMovementItem = function (Obj, code) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/jobcategory/remove/' + code, JSON.stringify(Obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.MovementsByJobCode = function (JobCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/jobcategory/movements/' + JobCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteJobCategory = function (code) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/jobcategory/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

}]);