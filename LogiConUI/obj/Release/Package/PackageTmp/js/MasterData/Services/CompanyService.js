app.service('CompanyService', ['$http', '$q', 'Utility', 'UtilityFunc', function ($http, $q, Utility, UtilityFunc) {
    this.GetCompaniesList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/list/').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCompanyAutoComplete = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/list/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetEmail = function (companyCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/GetEmailByCompany/' + companyCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetRocNoAutoComplete = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/list/SearchRoc/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCompanyDetailList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/detail/list').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetBranchDetails = function (obj) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/branch/' + obj.BranchID + '/' + obj.CompanyCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveCompany = function (obj, file) {

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveCompanyWithLogo = function (obj, file) {
        /*
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;*/
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

        objXhr.open('PUT', Utility.ServiceUrl + '/master/company/savewithlogo');
        objXhr.setRequestHeader('COMPANY_ID', UtilityFunc.CompanyID());
        objXhr.setRequestHeader('USERID', UtilityFunc.UserID());
        objXhr.setRequestHeader('BRANCH_ID', UtilityFunc.BranchID());
        objXhr.send(data);
        return deferred.promise;
    };

    this.SaveBranch = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/branch/save', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetCompanyDetails = function (CompanyCode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/' + CompanyCode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveSuspendedResume = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/suspendedresume', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchCompanies = function (obj) {
        var deferred = $q.defer();
        var temp = Utility.ServiceUrl + '/master/company/SearchCompanies/' + obj.CompanyName + '/' + obj.RegistrationNo + '/' + obj.DateFrom + '/' + obj.DateTo;
        $http.post(Utility.ServiceUrl + '/master/company/SearchCompanies', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTableData = function (Obj) {
        var deffered = $q.defer();
        $http.post(Utility.ServiceUrl + "/master/company/list/table", JSON.stringify(Obj)).then(function (res) {
            deffered.resolve(res);
        }, function (err) {
            // 
            deffered.reject(err);
        });
        return deffered.promise;
    }

    this.GetCompanySubscription = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/modules').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SaveCompanySubscription = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/save/companysubscription', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchCompany = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.UpdateSubscription = function (companyID, obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/update/companysubscription/' + companyID, JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.UpdateBillingModules = function (companyID, obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/update/billingmodules/' + companyID, JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetLookUpData = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteCompanyLogo = function () {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/master/company/logo').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.checkisUserExists = function () {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/Checkdata').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getSubscribersListCount = function (CompanyCode) {
        var deffered = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/getSubscribersListCount/' + CompanyCode).then(function (res) {
            deffered.resolve(res);
        }, function (err) {
            deffered.reject(err);
        });
        return deffered.promise;
    }
    
    this.checkCompanyMailBoxNo = function (MailBoxNo, companycode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/company/checkCompanyMailBoxNo/' + MailBoxNo + "/" + companycode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.UpdateCompanyMailBoxAndAgentCode = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/company/UpdateAgentcodeAndMailBox', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.checkBranchMailBoxNo = function (MailBoxNo, branchId, companycode) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/branch/checkBranchMailBoxNo/' + MailBoxNo + "/" + branchId + "/" + companycode).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.UpdateBranchMailBoxAndAgentCode = function (obj) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/master/branch/UpdateAgentcodeAndMailBox', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetRegisteredCompany = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/Company/registeredcompany').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);