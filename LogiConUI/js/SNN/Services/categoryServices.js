app.service('categoryService', ['$http', '$q', 'Utility', 'UtilityFunc', function ($http, $q, Utility, UtilityFunc) {
    this.SaveCategory = function (obj, file) {
        /*
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;*/
        debugger;
        var deferred = $q.defer();

        var data = new FormData();
        data.append('file', file)
        data.append('obj', JSON.stringify(obj));
        debugger;
        var objXhr = new XMLHttpRequest();
        objXhr.onreadystatechange = function () {
            if (objXhr.readyState == 4) {
                deferred.resolve('Success');
            }
        };

        objXhr.onerror = function () {
            deferred.reject('Error');
        };
        debugger;
        objXhr.open('POST', Utility.ServiceUrl + '/master/snncategory/Save');
        objXhr.setRequestHeader('COMPANY_ID', UtilityFunc.CompanyID());
        objXhr.setRequestHeader('USERID', UtilityFunc.UserID());
        objXhr.setRequestHeader('BRANCH_ID', UtilityFunc.BranchID());
        objXhr.send(data);
        return deferred.promise;
    };

}]);