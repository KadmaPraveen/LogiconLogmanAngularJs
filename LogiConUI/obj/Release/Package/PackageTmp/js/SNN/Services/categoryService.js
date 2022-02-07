app.service('categoryService', ['$http', '$q', 'Utility', 'UtilityFunc', function ($http, $q, Utility, UtilityFunc) {
    this.SaveCategory = function (obj, file) {
        
        var deferred = $q.defer();

        var data = new FormData();
        data.append('file', file)
        data.append('obj', JSON.stringify(obj));
        
        var objXhr = new XMLHttpRequest();
        objXhr.onreadystatechange = function () {
            if (objXhr.readyState == 4) {
                deferred.resolve('Success');
            }
        };

        objXhr.onerror = function () {
            deferred.reject('Error');
        };
        
        objXhr.open('POST', Utility.ServiceUrl + '/master/snncategory/Save');
        objXhr.setRequestHeader('COMPANY_ID', UtilityFunc.CompanyID());
        objXhr.setRequestHeader('USERID', UtilityFunc.UserID());
        objXhr.setRequestHeader('BRANCH_ID', UtilityFunc.BranchID());
        objXhr.send(data);
        return deferred.promise;
    };
    this.GetTableList = function (offset,limit) {
        var deferred = $q.defer();
        
        $http.get(Utility.ServiceUrl + '/master/snncategory/list/' + offset + '/' + limit).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.GetSNNCategory = function (id, code) {
        var deferred = $q.defer();
        
        $http.get(Utility.ServiceUrl + '/master/snncategory/getSNNCategory/' + id + '/' + code).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    //this.GetCategory = function (id, code) {
    //    var deferred = $q.defer();
    //    
    //    $http.get(Utility.ServiceUrl + '/master/snncategory/getSNNCategory/' + id + '/' + code).then(function (res) {
    //        deferred.resolve(res);
    //    }, function (err) {
    //        deferred.reject(err);
    //    });
    //    return deferred.promise;
    //};
}]);