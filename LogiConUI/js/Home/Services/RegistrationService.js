app.service('RegistrationService', ['$http', '$q', 'Utility', 'UtilityFunc', function ($http, $q, Utility, UtilityFunc) {
    
    this.Save = function (userid, data, IsMailCopy) {
        var deferred = $q.defer();        

        var objXhr = new XMLHttpRequest();
        objXhr.onreadystatechange = function () {
            if (objXhr.readyState == 4) {
                deferred.resolve('Success');
            }
        };

        objXhr.onerror = function () {
            deferred.reject('Error');
        };

        objXhr.open('POST', Utility.ServiceUrl + '/root/registeredcompany/save/' + userid + '/' + IsMailCopy);
        objXhr.setRequestHeader('COMPANY_ID', UtilityFunc.CompanyID());
        objXhr.setRequestHeader('USERID', UtilityFunc.UserID());
        objXhr.setRequestHeader('BRANCH_ID', UtilityFunc.BranchID());        
        objXhr.send(data);
        return deferred.promise;
    };

    this.checkisUserExists = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/root/registration/checkemail', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ForgotPasswordcheckemail = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/root/registration/ForgotPasswordcheckemail', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.validateSecurityQuestion = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/root/registration/validatesecurityquestion', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ResendOTP = function (obj) {
        
        var deferred = $q.defer();

        $http.post(Utility.ServiceUrl + '/root/registration/resendOTP', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.UpdatePassword = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/root/registration/updatepassword', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.Login = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/root/registration/login', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetLookUpdata = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/root/registration/lookupData').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDetails = function (userid) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/root/registeredcompany/' + userid).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };    

    this.SaveRegistration = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/root/registration/save/', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteImage = function (companyId, docType, ItemNo) {
        
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/root/registeredcompany/' + companyId + '/' + docType + '/' + ItemNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetRegistrationDocTypeByOrgType = function (orgType) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/root/registration/registrationdoctype/' + orgType).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.VerifyOTP = function (email, otp) {
        var deferred = $q.defer();
        
        $http.get(Utility.ServiceUrl + '/root/registration/verifyotp/' + email + '/' + otp).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    /*
    this.VerifyOTPFortgotPassword = function (email, otp) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/root/registration/verifyotp/forgotpassword/' + email + '/' + otp).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };*/
}]);