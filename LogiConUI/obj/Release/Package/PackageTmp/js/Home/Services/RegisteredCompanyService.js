app.service('RegisteredCompanyService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetRegisteredCompanies = function (awaitingApprovalID, skip) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/root/registeredcompany/companies/' + skip + '/' + awaitingApprovalID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.UpdateStatus = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/root/companydetails/updatestatus', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.AdditionalInfo = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/root/companydetails/additionalInfo', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ExportData = function (type, mimetype) {
        var requestConfig = {
            method: 'Get',
            url: Utility.ServiceUrl + '/root/registeredcompany/export/' + type,
            responseType: 'arraybuffer',
            cache: 'false'
        };
        var filename = type == 'pdf' ? 'companies.pdf' : 'companies.xls';
        $http(requestConfig)
            .success(function (data) {
                var arr = new Uint8Array(data);
                var raw = '';
                var i, j, subArray, chunk = 5000;
                for (i = 0, j = arr.length; i < j; i += chunk) {
                    subArray = arr.subarray(i, i + chunk);
                    raw += String.fromCharCode.apply(null, subArray);
                }
                var b64 = btoa(raw);
                download('data:image/jpeg;base64,' + b64, filename, mimetype)
            });
    };

    this.SearchRegisteredCompanies = function (obj) {
        
        var deferred = $q.defer();

        
        $http.post(Utility.ServiceUrl + '/root/registeredcompany/SearchRegisteredCompanies', JSON.stringify(obj)).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.DeletedCompany = function (obj) {
        
        var deferred = $q.defer();

        
        $http.post(Utility.ServiceUrl + '/root/registeredcompany/DeleteRegisteredCompany', JSON.stringify(obj)).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.SearchRegisteredStatus = function (obj) {
        
        var deferred = $q.defer();
        
        $http.post(Utility.ServiceUrl + '/root/registeredcompany/list/table', JSON.stringify(obj)).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

}]);