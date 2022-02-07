
angular.module('LogiConMain').controller('RegisterCntrl', ['$scope', 'RegistrationService', 'CountryService', 'growlService', '$location', '$stateParams', '$q', '$filter', 'Utility', '$timeout', 'UtilityFunc','$interval',
    function ($scope, RegistrationService, CountryService, growlService, $location, $stateParams, $q, $filter, Utility, $timeout, UtilityFunc, $interval) {

        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.maxdate = moment();
        $scope.pwd = {};
        $scope.reg = {};
        $scope.registration = {};
        $scope.registeredCompany = {
            RegisteredCompanyDocsList: new Array(),
            companyAddress: {
                CountryCode1: '',
                CountryCode2: '',
                CountryCode3: '',
                CountryCode4: '',
                Phone1CountryCode: "MY",
                Mobile1CountryCode: "MY",
                Phone2CountryCode: "MY",
                Mobile2CountryCode: "MY"
            }
        };
        $scope.data = {

        };
        $scope.company = {};
        $scope.isRegistration = true;
        $scope.showLoading = false;

        var decreamentCountdown = function () {
            
            if ($scope.countdown >= 1) {
                $timeout(function () {
                    $scope.countdown -= 1;
                }, 1000);
                
            }
            
            if ($scope.countdown <= 1) {
                $scope.message = "timed out";
            }
        };
        var startCountDown = function () {
            $interval(decreamentCountdown, 1000, $scope.countdown)
        };

        var promise1 = RegistrationService.GetLookUpdata();
        var promise2 = CountryService.GetCountriesList();

        $q.all([promise1, promise2]).then(function (d) {
            $scope.lookUpData = d[0].data;
            $scope.lookUpData.CountriesList = d[1].data;
            $scope.reg.CountryCode = "MY";
            $scope.reg.Extension = $filter('filter')($scope.lookUpData.countryCodeList, { Value: $scope.reg.CountryCode })[0].DailingCode;
            $scope.ContinueRegistration();
        }, function (err) {

        });

        $scope.tabs = [
            { index: 0, title: 'User Information', content: 'Js/Home/Templates/user-information.html?v=' + Utility.Version, active: true, disabled: false },
            { index: 1, title: 'Company Information', content: 'Js/Home/Templates/company-information.html?v=' + Utility.Version, active: true, disabled: false },
            { index: 2, title: 'Documents', content: 'Js/Home/Templates/documents.html?v=' + Utility.Version, active: true, disabled: false },
            { index: 3, title: 'Declaration', content: 'Js/Home/Templates/declaration.html?v=' + Utility.Version, active: true, disabled: false },
            { index: 4, title: 'Application Status', content: 'Js/Home/Templates/application-status.html?v=' + Utility.Version, active: true, disabled: false }
        ];

        $scope.countryChanged = function () {
            $scope.reg.Extension = $filter('filter')($scope.lookUpData.countryCodeList, { Value: $scope.reg.CountryCode })[0].DailingCode;
        };
        $scope.countryChanged1 = function () {
            $scope.registeredCompany.companyAddress.Phone1CountryCode = $filter('filter')($scope.lookUpData.countryCodeList, { Value: $scope.registeredCompany.companyAddress.CountryCode1 })[0].Value;
        };
        $scope.countryChanged2 = function () {
            $scope.registeredCompany.companyAddress.Mobile1CountryCode = $filter('filter')($scope.lookUpData.countryCodeList, { Value: $scope.registeredCompany.companyAddress.CountryCode2 })[0].Value;
        };
        $scope.countryChanged3 = function () {
            $scope.registeredCompany.companyAddress.Phone2CountryCode = $filter('filter')($scope.lookUpData.countryCodeList, { Value: $scope.registeredCompany.companyAddress.CountryCode3 })[0].Value;
        };
        $scope.countryChanged4 = function () {
            $scope.registeredCompany.companyAddress.Mobile2CountryCode = $filter('filter')($scope.lookUpData.countryCodeList, { Value: $scope.registeredCompany.companyAddress.CountryCode4 })[0].Value;
        };
        //$scope.countryChangedforUserInfo = function () {
        //    $scope.registration.Extension = $filter('filter')($scope.lookUpData.countryCodeList, { Value: $scope.registration.CountryCode })[0].DailingCode;
        //};


        $scope.OrganisationTypeChanged = function () {
            $scope.showLoading = true;
            RegistrationService.GetRegistrationDocTypeByOrgType($scope.registeredCompany.OrganisationType)
                    .then(function (d) {
                        $scope.showLoading = false;
                        
                        $scope.docList = d.data;
                    }, function (err) { });
        };

        $scope.isPasswordMatched = true;
        
        $scope.ComparePassword = function () {
            
            if ($scope.reg.Password != $scope.reg.ConfirmPassword) {
                $scope.isPasswordMatched = false;
                growlService.growl('ConfirmPassword is Mismatch with Password', 'danger');
                //growlService.growl.error('Password must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers and symbols', {});
            }
            else {
                $scope.isPasswordMatched = true;
            }
        }


        $scope.isPasswordValidate = true;
        
        $scope.removeValidation = function (password) {
            
            var Regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
            if (Regex.test(password)) {
                $scope.isPasswordValidate = true;
            } else {
                
                growlService.growl('Password must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers and symbols', 'danger');
                $scope.isPasswordValidate = false;
            }


        }


        //$scope.SameAbove1 = function () {
        //    
        //    if ($scope.Cntrl.sameasabove1) {

        //        $scope.registeredCompany.companyAddress.Phone1CountryCode = $scope.registration.CountryCode;


        //        var ExtensionObj = $filter('filter')($scope.lookUpData.countryCodeList, {
        //            Value: $scope.registeredCompany.companyAddress.Phone1CountryCode
        //        })[0];

        //        if (ExtensionObj.DailingCode != null && ExtensionObj.DailingCode != undefined) {
        //            $scope.registeredCompany.companyAddress.ContactPerson1 = $scope.registration.FullName;
        //            $scope.registeredCompany.companyAddress.Phone1 = $scope.registration.MobileNo.replace(Extension, '');
        //        }

        //    } else {
        //        $scope.registeredCompany.companyAddress.ContactPerson1 = null;
        //        $scope.registeredCompany.companyAddress.Phone1 = null;
        //    }
        //};

        $scope.SameAbove1 = function () {
            if ($scope.Cntrl.sameasabove1) {

                $scope.registeredCompany.companyAddress.Mobile1CountryCode = $scope.registration.CountryCode;


                var Extension = $filter('filter')($scope.lookUpData.countryCodeList, {
                    Value: $scope.registeredCompany.companyAddress.Mobile1CountryCode
                })[0].DailingCode;

                $scope.registeredCompany.companyAddress.ContactPerson1 = $scope.registration.FullName;
                $scope.registeredCompany.companyAddress.Mobile1 = $scope.registration.MobileNo.replace(Extension, '');
                $scope.registeredCompany.companyAddress.ContactEmailID1 = $scope.registration.Email;

            } else {
                $scope.registeredCompany.companyAddress.ContactPerson1 = null;
                $scope.registeredCompany.companyAddress.Mobile1 = null;
                $scope.registeredCompany.companyAddress.ContactEmailID1 = null;
            }
        };

        $scope.SameAbove2 = function () {
            if ($scope.Cntrl.sameasabove2) {

                $scope.registeredCompany.companyAddress.Mobile2CountryCode = $scope.registration.CountryCode;


                var Extension = $filter('filter')($scope.lookUpData.countryCodeList, {
                    Value: $scope.registeredCompany.companyAddress.Mobile2CountryCode
                })[0].DailingCode;

                $scope.registeredCompany.companyAddress.ContactPerson2 = $scope.registration.FullName;
                $scope.registeredCompany.companyAddress.Mobile2 = $scope.registration.MobileNo.replace(Extension, '');
                $scope.registeredCompany.companyAddress.ContactEmailID2 = $scope.registration.Email;

            } else {
                $scope.registeredCompany.companyAddress.ContactPerson2 = null;
                $scope.registeredCompany.companyAddress.Mobile2 = null;
                $scope.registeredCompany.companyAddress.ContactEmailID2 = null;
            }
        };

        $scope.navToLogin = function () {
            //$location.path('/login');
            location.href = 'default.html';
        };



        $scope.EmailValid = false;
        $scope.securityQuestionValid = false;

        $scope.submittedEmail = false;
        $scope.submittedQuestion = false;
        $scope.submittedPwd = false;

        $scope.isFrmEmailValid = false;
        $scope.$watch('Cntrl.frmEmail.$valid', function (isValid) {
            $scope.isFrmEmailValid = isValid;
        });

        $scope.isFrmQuestionValid = false;
        $scope.$watch('Cntrl.frmQuestion.$valid', function (isValid) {
            $scope.isFrmQuestionValid = isValid;
        });

        $scope.isFrmPasswordValid = false;
        $scope.$watch('Cntrl.frmPassword.$valid', function (isValid) {
            $scope.isFrmPasswordValid = isValid;
        });
        //$scope.pwd.ConfirmPassword='';
        //$scope.pwd.Password = '';
        $scope.isPasswordMatchedFP = true;
        $scope.ComparePasswordinFP = function () {
            if ($scope.pwd.Password != $scope.pwd.ConfirmPassword) {
                $scope.isPasswordMatchedFP = false;
                growlService.growl('Password and Confirm Password does not match.', 'danger');
                //growlService.growl.error('Password and Confirm Password does not match.', {});
            }
            else {
                $scope.isPasswordMatchedFP = true;
            }
        }

        $scope.isPasswordValidates = true;
        $scope.removeValidations = function (password) {
            
            var Regex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
            if (Regex.test($scope.pwd[password])) {
                $scope.isPasswordValidates = true;

            } else {
                
                growlService.growl('Password must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers and symbols', 'danger');
                $scope.isPasswordValidates = false;
            }


        }

        $scope.CheckEmailAvailability = function () {
            $scope.showLoading = true;
            if ($scope.isFrmEmailValid) {
                if (!angular.isUndefined($scope.pwd.Email) && $scope.pwd.Email != '') {
                    RegistrationService.ForgotPasswordcheckemail({ email: $scope.pwd.Email }).then(function (d) {
                        if (d.data) {
                            $scope.EmailValid = true;
                            $scope.isUserEmailExists = true;
                            $scope.pwd.SecurityQuestion = d.data.SecurityQuestion;
                        }
                        else {
                            growlService.growl('Your Email ID is incorrect. Please try again.', 'danger');
                        }

                        $scope.showLoading = false;
                    }, function (err) {

                    });
                } else {
                    $scope.showLoading = false;
                    growlService.growl('Please enter valid email id', 'danger');
                }
            } else {
                $scope.showLoading = false;
                //growlService.growl('Please enter valid email id', 'danger');
            }
        };
        $scope.ResendOTPForRegistration = function (email) {
            

            $scope.pwd = {
                Email: email
            }
            RegistrationService.ResendOTP($scope.pwd).then(function (d) {
                if (d.data) {
                    
                    $scope.buttonResendOTPEnabled = false;
                    $scope.countdown = 120;
                    $scope.message = '';
                    startCountDown();

                    $timeout(function () {
                        $scope.buttonResendOTPEnabled = true;
                    }, 120000);
                    growlService.growl('OTP Resend successfully.', 'success');
                }
                else {
                    // growlService.growl('Security Answer does not match. Please try again.', 'danger');
                }

                $scope.showLoading = false;
            }, function (err) {

            });
        };

        $scope.ResendOTP = function (pwd) {
            
            RegistrationService.ResendOTP(pwd).then(function (d) {
                if (d.data) {
                    
                    $scope.buttonEnabled = false;
                    $scope.countdown = 120;
                    $scope.message = '';
                    startCountDown();

                    $timeout(function () {
                        $scope.buttonEnabled = true;
                    }, 120000);
                    growlService.growl('OTP Resend successfully.', 'success');

                }
                else {
                   
                   // growlService.growl('Security Answer does not match. Please try again.', 'danger');
                }

                $scope.showLoading = false;
            }, function (err) {

            });
        };
        $scope.buttonEnabled = false;
        $scope.Validate = function (pwd) {
            $scope.showLoading = true;
            if ($scope.isFrmQuestionValid) {
                if (!angular.isUndefined($scope.pwd.SecurityQuestion) && !angular.isUndefined($scope.pwd.Answer)) {
                    RegistrationService.validateSecurityQuestion(pwd).then(function (d) {
                        if (d.data) {
                            $scope.EmailValid = true;
                            $scope.isUserEmailExists = true;
                            //$scope.securityQuestionValid = true;
                            $scope.ShowOTP = true;
                            //growlService.growl.success('Email ID is available!', {});

                            $scope.countdown = 120;
                            $scope.message = '';
                            startCountDown();

                            $timeout(function () {
                                $scope.buttonEnabled = true;
                            }, 120000);
                        }
                        else {
                            $scope.EmailValid = true;
                            $scope.isUserEmailExists = true;
                            growlService.growl('Security Answer does not match. Please try again.', 'danger');
                        }

                        $scope.showLoading = false;
                    }, function (err) {

                    });
                } else {
                    $scope.showLoading = false;
                    growlService.growl('Please enter security answer', 'danger');
                }
            } else {
                $scope.showLoading = false;
                growlService.growl('Please enter security answer', 'danger');
            }
        };

        $scope.VerifyOTPForgotPassword = function (email, otp) {
            RegistrationService.VerifyOTP(email, otp).then(function (d) {
                if (d.data == 'OTP Verified') {
                    $scope.securityQuestionValid = true;
                    $scope.ShowOTP = false;
                    growlService.growl('OTP verified', 'success');
                }
                else if (d.data == 'OTP Not verified') {
                    $scope.securityQuestionValid = false;
                    $scope.ShowOTP = true;
                    growlService.growl('OTP mismatched', 'danger');
                }
            }, function (err) { });
        };

        $scope.UpdatePassword = function (pwd) {
            $scope.showLoading = true;
            $scope.submitted = true;
            if ($scope.isFrmPasswordValid) {
                RegistrationService.UpdatePassword(pwd).then(function (d) {
                    growlService.growl('Your Password has been reset. You may use the new password you created to login.', 'success');
                    $timeout(function () { location.href = 'default.html'; }, 2000);
                }, function (err) {

                });
            } else {
                if (!angular.isUndefined($scope.Cntrl.frmPassword.$error.pattern)) {
                    if ($scope.Cntrl.frmPassword.$error.pattern.length == 2)
                        growlService.growl('Password must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers and symbols', 'danger');
                    else if ($scope.Cntrl.frmPassword.$error.pattern.length == 1)
                        growlService.growl('Password must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers and symbols', 'danger');
                }
                else
                    growlService.growl('Please fill all mandatory fields', 'danger');

                $scope.showLoading = false;
            }
        };



        $scope.CheckAvailability = function () {
            $scope.showLoading = true;
            if (!angular.isUndefined($scope.reg.Email)) {
                RegistrationService.checkisUserExists({ email: $scope.reg.Email }).then(function (d) {
                    if (d.data)
                        growlService.growl('Email already exists', 'danger');
                    else
                        growlService.growl('Email ID is available!', 'success');

                    $scope.isUserExists = !d.data;
                    $scope.showLoading = false;
                }, function (err) {

                });
            } else {
                $scope.showLoading = false;
                growlService.growl('Please enter valid email id', 'danger');
            }
        };

        $scope.isFrmSignUpValid = false;
        $scope.$watch('frmSignUp.$valid', function (isValid) {
            $scope.isFrmSignUpValid = isValid;
        });
        $scope.buttonResendOTPEnabled = false;
        $scope.SignUp = function (reg) {
            $scope.showLoading = true;
            $scope.submitted = true;

            if ($scope.isFrmSignUpValid) {
                

                var regNumber = $scope.reg.MobileNo;
                var startingValue = regNumber.charAt(0);
                if (startingValue == "0") {
                    regNumber = regNumber.slice(1, regNumber.length);
                }
                else {
                    regNumber = $scope.reg.MobileNo;
                }
                $scope.reg.MobileNo = $scope.reg.Extension + regNumber;
                RegistrationService.SaveRegistration(reg).then(function (d) {
                    if (d.data == 'Email Id already exists') {
                        growlService.growl(d.data, 'danger');
                    } else {
                        $scope.submitted = false;
                        $scope.showLoading = false;
                        $scope.isRegistration = false;
                        $scope.reg = {};

                        sessionStorage.setItem('SsnRegUserID', d.data.UserID);
                        $scope.ContinueRegistration();

                        $scope.countdown = 120;
                        $scope.message = '';
                        startCountDown();
                        $timeout(function () {
                            $scope.buttonResendOTPEnabled = true;
                        }, 120000);
                    }
                    $scope.showLoading = false;
                }, function (err) {

                });
            } else {
                if (!angular.isUndefined($scope.frmSignUp.$error.pattern)) {
                    if ($scope.frmSignUp.$error.pattern.length == 2)
                        growlService.growl('Password must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers and symbols', 'danger');
                    else if ($scope.frmSignUp.$error.pattern.length == 1)
                        growlService.growl('Password must have at least 8 characters and contain the following: uppercase letters, lowercase letters, numbers and symbols', 'danger');
                }
                else
                    growlService.growl('Please fill all mandatory fields', 'danger');

                $scope.showLoading = false;
            }
        };

        $scope.imagesArr = new Array();
        //$scope.companyInfo = function (registeredCompany, companyAddress) {

        //};

        //$scope.SaveImages = function (queue) {
        //    var temp = $scope;
        //    
        //};

        $scope.isFrmUserInfoValid = false;
        $scope.isFrmCompanyInfoValid = false;
        $scope.isFrmDocsValid = false;

        $scope.$watch('Cntrl.frmUserInfo.$valid', function (isValid) {
            $scope.isFrmUserInfoValid = isValid;
        });
        $scope.$watch('Cntrl.frmCompanyInfo.$valid', function (isValid) {
            $scope.isFrmCompanyInfoValid = isValid;
        });
        $scope.$watch('Cntrl.frmDocs.$valid', function (isValid) {
            $scope.isFrmDocsValid = isValid;
        });

        $scope.SaveUserInfo = function (registration) {
            
            if ($scope.isFrmUserInfoValid) {
                $scope.nextTab();
            } else {
                growlService.growl('Please enter all mandatory fields', 'danger')
            }
        };

        $scope.SaveCompanyInfo = function (registeredCompany) {
            if ($scope.isFrmCompanyInfoValid) {
                $scope.registeredCompany = registeredCompany;

                $scope.nextTab();

            } else {
                growlService.growl('Please enter all mandatory fields', 'danger')
            }
        };

        $scope.docRequired = function (text) {
            var flag = false;
            if (text.toLowerCase().indexOf('optional') > 0)
                flag = false;
            else
                flag = true;

            return flag;
        };

        $scope.SaveDocuments = function () {
            if ($scope.isFrmDocsValid) {
                $scope.nextTab();
            } else {
                growlService.growl('Please upload all document types', 'danger');
            }
            /*
            var tempregistrationDocTypeList = new Array();
            var tempArray = new Array();
            angular.copy($scope.lookUpData.registrationDocTypeList, tempregistrationDocTypeList);
            angular.forEach(tempregistrationDocTypeList, function (item, index) {
                if (item.Text.toLowerCase().indexOf('optional') < 0) {
                    var obj = $filter('filter')($scope.imagesArr, { RegistrationDocType: item.Value })[0];
                    if (obj == null) {
                        tempArray.push(index);
                    }
                }
            });
    
            if (tempArray.length > 0) {
                growlService.growl.error('Please upload all document types', {});
            } else {
                $scope.nextTab();
            }*/
        };

        $scope.nextTab = function () {
            
            var companyID = $scope.registeredCompany.CompanyID;
            if (companyID != 0) {
                if ($scope.active == 3)
                    $scope.active = 5;
                else if ($scope.active == 5)
                    $scope.active = 1;
                else
                    $scope.active = $scope.active + 1;
            } else {
                if ($scope.active < 4)
                    $scope.active = $scope.active + 1;
                else
                    $scope.active = 1;
            }
        };

        $scope.UploadFileUploadFlag = function () {
            angular.forEach($scope.imagesArr, function (item, index) {
                item.IsFileUploaded = true;
            });
        };

        $scope.DeleteImage = function (docType, ItemNo, index) {
            
            if (angular.isUndefined($scope.registeredCompany.CompanyID) || parseInt($scope.registeredCompany.CompanyID) == 0) {
                document.getElementById('docs_' + index).value = null;
                $scope.docList[index].FileName = '';
            } else {
                RegistrationService.DeleteImage($scope.registeredCompany.CompanyID, docType, ItemNo).then(function (d) {
                    
                    document.getElementById('docs_' + index).value = null;
                    $scope.docList[index].FileName = '';
                }, function (err) {
                    document.getElementById('docs_' + index).value = null;
                    $scope.docList[index].FileName = '';
                });
            }
        };

        $scope.disableRegister = false;
        $scope.disableTabs = false;
        $scope.Save = function () {

            
            if ($scope.isFrmUserInfoValid && $scope.isFrmCompanyInfoValid && $scope.isFrmDocsValid) {
                $scope.registeredCompany.RegisteredCompanyDocsList = $scope.imagesArr;

                //var regNumber = $scope.registration.MobileNo;
                //var startingValue = regNumber.charAt(0);
                //if (startingValue == "0") {
                //    regNumber = regNumber.slice(1, regNumber.length);
                //}
                //else {
                //    regNumber = $scope.registration.MobileNo;
                //}
                //$scope.registration.MobileNo = $scope.registration.Extension + regNumber;

                var obj = {
                    registration: $scope.registration,
                    registeredCompany: $scope.registeredCompany,
                    docList: $scope.docList

                };
                $scope.disableRegister = true;
                var data = new FormData();
                var fileObj = angular.element('.fileCss');
                angular.forEach(fileObj, function (item, index) {
                    if (item.files.length > 0)
                        data.append('file', document.getElementById(item.id).files[0]);
                });
                data.append('obj', JSON.stringify(obj));

                $scope.showLoading = true;
                
                RegistrationService.Save(sessionStorage.getItem('SsnRegUserID'), data, $scope.registeredCompany.IsMailCopy).then(function (d) {

                    console.log(d.data);
                    $scope.showLoading = false;
                    if ($scope.registeredCompany.CompanyID == 0) {
                        growlService.growl('Registration has been sent successfully.', 'success');
                        $timeout(function () { location.href = 'default.html'; }, 5000);
                    }
                    else
                        growlService.growl('Profile updated successfully.', 'success');
                    //location.href = 'default.html?v=' + Utility.Version;
                }, function (err) {
                    alert(err);
                });
            } else {
                if (!$scope.isFrmUserInfoValid) {
                    $scope.active = 1;
                    $scope.submittedUserInfo = true;
                    growlService.growl('Please enter all mandatory fields in User Information tab', 'danger');
                }
                else if (!$scope.isFrmCompanyInfoValid) {
                    $scope.active = 2;
                    $scope.submittedCompanyInfo = true;
                    growlService.growl('Please enter all mandatory fields in Company Information tab', 'danger');
                }
                else if (!$scope.isFrmDocsValid) {
                    $scope.active = 3;
                    $scope.submittedDocs = true;
                    growlService.growl('Please Upload all mandatory documents type', 'danger');
                }
            }
        };

        $scope.VerifyOTP = function (otp) {
            if($scope.countdown >= 1){
                RegistrationService.VerifyOTP($scope.registration.Email, otp).then(function (d) {
                    if (d.data == 'OTP Verified') {
                        $scope.disableTabs = false;
                        growlService.growl('OTP verified', 'success');
                    }
                    else if (d.data == 'OTP Not verified') {
                        $scope.disableTabs = true;
                        growlService.growl('OTP mismatched', 'danger');
                    }
                }, function (err) { });
            }
            else {
                growlService.growl("Timed Out",'danger');
            }
        };



        $scope.ContinueRegistration = function () {
            
            var userid = sessionStorage.getItem('SsnRegUserID');
            $scope.userid = userid;
            $scope.queue = new Array();
            if (!angular.isUndefined(userid) && userid != null) {
                $scope.showLoading = true;
                $scope.isRegistration = false;
                RegistrationService.GetDetails(userid).then(function (d) {                    
                    $scope.showLoading = false;
                    $scope.registration = d.data.registration;
                    var Extension = $filter('filter')($scope.lookUpData.countryCodeList, {
                        Value: $scope.registration.CountryCode
                    })[0].DailingCode;

                    $scope.registrationMobileNo = $scope.registration.MobileNo.replace(Extension, '');

                    if (d.data.registeredCompany != null) {


                        if (d.data.registeredCompany.CompanyID != 0)
                            $scope.Url = Utility.BaseUrl + '/UploadImages/' + d.data.registeredCompany.CompanyID;
                        else
                            $scope.Url = '';

                        $scope.docList = d.data.docList;
                        $scope.registeredCompany = d.data.registeredCompany;
                        $scope.isDeclarationChecked();
                        if ($scope.registeredCompany.OrganisationType == 0)
                            $scope.registeredCompany.OrganisationType = undefined;
                        $scope.showApplicationStatusTab = d.data.registeredCompany.IsDeclared;
                        if (d.data.registeredCompany.RegisteredCompanyDocsList != null) {
                            $scope.imagesArr = d.data.registeredCompany.RegisteredCompanyDocsList;

                            angular.forEach($scope.imagesArr, function (item, index) {
                                item.IsFileUploaded = true;
                                item.show = true;
                            });
                        }
                        else
                            $scope.registeredCompany.RegisteredCompanyDocsList = new Array();

                        $scope.registrationStatusList = d.data.activityList;
                    }
                    else {
                        $scope.registeredCompany = {};
                        $scope.registeredCompany.RegisteredCompanyDocsList = new Array();
                        $scope.showApplicationStatusTab = false;

                    }

                    $scope.buttonResendOTPEnabled = false;
                    if (!d.data.registration.IsOTPVerified) {
                        $scope.disableTabs = true;

                        $scope.countdown = 120;
                        $scope.message = '';
                        startCountDown();
                        $timeout(function () {
                            $scope.buttonResendOTPEnabled = true;
                        }, 120000);
                    }

                    angular.forEach($scope.imagesArr, function (item, index) {
                        var obj = {
                            url: Utility.BaseUrl + '/UploadImages/' + d.data.registeredCompany.CompanyID + '/' + item.FileName,
                            name: item.FileName,
                            error: ''
                        };

                        $scope.queue.push(obj);
                    });
                    
                    if ($scope.registeredCompany.companyAddress != null) {
                        //$scope.registeredCompany.companyAddress.Phone1CountryCode = "MY";
                        //$scope.registeredCompany.companyAddress.Mobile1CountryCode = "MY";
                        //$scope.registeredCompany.companyAddress.Phone2CountryCode = "MY";
                        //$scope.registeredCompany.companyAddress.Mobile2CountryCode = "MY";
                    }
                    else {
                        $scope.registeredCompany.companyAddress = {
                            Phone1CountryCode: "MY",
                            Mobile1CountryCode: "MY",
                            Phone2CountryCode: "MY",
                            Mobile2CountryCode: "MY"
                        }
                    }


                    
                    if (!angular.isUndefined(d.data.CountryCode1) && d.data.CountryCode1 != null) {
                        $scope.registeredCompany.companyAddress.CountryCode1 = d.data.CountryCode1;
                    }
                    if (!angular.isUndefined(d.data.CountryCode2) && d.data.CountryCode2 != null) {
                        $scope.registeredCompany.companyAddress.CountryCode2 = d.data.CountryCode2;
                    }
                    if (!angular.isUndefined(d.data.CountryCode3) && d.data.CountryCode3 != null) {
                        $scope.registeredCompany.companyAddress.CountryCode3 = d.data.CountryCode3;
                    }
                    if (!angular.isUndefined(d.data.CountryCode4) && d.data.CountryCode4 != null) {
                        $scope.registeredCompany.companyAddress.CountryCode4 = d.data.CountryCode4;
                    }




                }, function (err) {
                    growlService.growl('Please login to proceed', 'danger');
                    //$location.path('/login')
                    location.href = 'default.html';
                });
            }
        };

        $scope.initFile = function (savedObj, newObj, index, docTypeId) {
            if (angular.isUndefined(savedObj)) {
                var obj = {
                    FileName: newObj.name,
                    RegistrationDocType: docTypeId,
                    RegistrationDocTypeText: $filter('filter')($scope.lookUpData.registrationDocTypeList, { Value: docTypeId })[0].Text,
                    IsFileUploaded: false,
                    show: true
                };
                $scope.imagesArr.push(obj);
            }
            else {

            }
        };

        var fileType = ['image/jpg', 'image/jpeg', 'image/png', 'image/tif', 'application/pdf'];
        var fileSize = 1024 * 1024 * 5;
        $scope.fileChanged = function (files, id) {
            var isValidFileType = false;
            angular.forEach(fileType, function (item, index) {
                if (item == files[0].type)
                    isValidFileType = true;
            });

            var isValidFileSize = false;
            if (files[0].size <= fileSize)
                isValidFileSize = true;

            if (isValidFileType && isValidFileSize) {
                $scope.docList[parseInt(id)].FileName = files[0].name;
                $scope.$digest();
            } else {
                if (!isValidFileType)
                    growlService.growl('Please upload valid file type', 'danger');
                else if (!isValidFileSize)
                    growlService.growl('File size must be not more that 5 MB', 'danger');

                document.getElementById('docs_' + id).value = null;
                return false;
            }

        };
        

        $scope.isDeclaration = false;
        $scope.isDeclarationChecked = function () {
            
            var obj = $filter('filter')($scope.registeredCompany.CompanyRegistrationTypeList, { ModuleID: 9152 })[0];

            if (angular.isUndefined(obj))
                $scope.isDeclaration = false;
            else
                $scope.isDeclaration = obj.isSelected;
        };

    }]);

angular.module('LogiConMain').controller('DemoFileUploadController', ['$scope', '$http', 'Utility', '$stateParams',
            function ($scope, $http, Utility, $stateParams) {
                $scope.options = {
                    url: Utility.ServiceUrl + '/root/image/UploadFiles'
                };
                if (true) {
                    $scope.loadingFiles = true;
                    $http.get(Utility.ServiceUrl + '/root/image/UploadFiles')
                        .then(
                            function (response) {
                                $scope.loadingFiles = false;
                                $scope.queue = response.data.files || [];
                            },
                            function () {
                                $scope.loadingFiles = false;
                            }
                        );
                }
            }
]);

angular.module('LogiConMain').controller('FileDestroyController', [
    '$scope', '$http', 'RegistrationService',
    function ($scope, $http, RegistrationService) {
        var file = $scope.file,
            state;
        if (file.url) {
            file.$state = function () {
                return state;
            };
            file.$destroy = function (companyId, docType, itemNo) {
                state = 'pending';

                RegistrationService.DeleteImage(companyId, docType, itemNo).then(function (d) {
                    $scope.clear(file);
                }, function (err) { });
            };
        } else if (!file.$cancel && !file._index) {
            file.$cancel = function () {
                $scope.clear(file);
            };
        }
    }
]);