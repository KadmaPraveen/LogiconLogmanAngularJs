app.service('NewsService', ['$http', '$q', 'Utility', 'UtilityFunc', function ($http, $q, Utility, UtilityFunc) {

    this.saveNews = function (obj, file) {
        var formData = new FormData();
        angular.forEach(obj, function (value, key) {
            formData.append(key, value);
        });
        //var formData = new FormData();
        //formData.append('file', file)
        ////formData.append('SNNNewsDTO', JSON.stringify(obj));
        //formData.append('CategoryCode', obj.CategoryCode);
        //formData.append('Title', obj.Title);
        //formData.append('Message', obj.Message);
        //formData.append('NewsDate', obj.NewsDate);
        //formData.append('ExpiryDate', obj.ExpiryDate);
        //formData.append('Image', obj.Image);
        //formData.append('CreatedBy', obj.CreatedBy);
        //formData.append('CreatedOn', obj.CreatedOn);
        //formData.append('ModifiedBy', obj.ModifiedBy);
        //formData.append('ModifiedOn', obj.ModifiedOn);


        //var data = new FormData();
        
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: Utility.ServiceUrl + '/master/snn/save',
            data: formData
        }).success(function (res) {
                deferred.resolve(res);
            }).error(function (err, status) {
                deferred.reject(err);
            });
        return deferred.promise;
        //var deferred = $q.defer();
        //$http.post(Utility.ServiceUrl + '/master/snn/save', formData).then(function (res) {
        //    deferred.resolve(res);
        //}, function (err) {
        //    deferred.reject(err);
        //});
        //return deferred.promise;
        //var deferred = $q.defer();      
        
        
        //var objXhr = new XMLHttpRequest();
        //objXhr.onreadystatechange = function () {
        //    if (objXhr.readyState == 4) {
        //        deferred.resolve('Success');
        //    }
        //};

        //objXhr.onerror = function () {
        //    deferred.reject('Error');
        //};
        //
        //objXhr.open('POST', Utility.ServiceUrl + '/master/snn/save');
        //objXhr.setRequestHeader('COMPANY_ID', UtilityFunc.CompanyID());
        //objXhr.setRequestHeader('USERID', UtilityFunc.UserID());
        //objXhr.setRequestHeader('BRANCH_ID', UtilityFunc.BranchID());
        //objXhr.send(formData);

        //return deferred.promise;
    };

    this.GetLookUpData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/snn/lookUpData').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);