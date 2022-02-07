angular.module('LogiCon').controller('CompanyDetailsCntrl', ['$scope', 'CompanyDetailsService', 'RegisteredCompanyService', '$stateParams', 'Utility', '$location', 'growlService', 'DownloadService', '$state',
    function ($scope, CompanyDetailsService, RegisteredCompanyService, $stateParams, Utility, $location, growlService, DownloadService, $state) {
        var companyID = $stateParams.companyID;
        $scope.showLoading = true;


        CompanyDetailsService.CompanyDetails(companyID).then(function (d) {
            $scope.showLoading = false;
            $scope.registeredCompany = d.data.registeredCompany;
            $scope.DailingCode1 = d.data.DailingCode1;
            $scope.DailingCode2 = d.data.DailingCode2;
            $scope.DailingCode3 = d.data.DailingCode3;
            $scope.DailingCode4 = d.data.DailingCode4;

            $scope.CountryName1 = d.data.CountryName1;
            $scope.CountryName2 = d.data.CountryName2;
            $scope.CountryName3 = d.data.CountryName3;
            $scope.CountryName4 = d.data.CountryName4;
            $scope.OTP = d.data.OTP;
            
            $scope.BaseUrl = Utility.BaseUrl + '/UploadImages/' + companyID;
        }, function (err) { });

        $scope.approvedisable = false;
        $scope.Approve = function () {
            $scope.approvedisable = true;
            var Obj = {
                CompanyID: companyID,
                Status: true
            };
            RegisteredCompanyService.UpdateStatus(Obj).then(function (d) {
                if (d.data) {
                    $state.go('registrationlist', {});
                    // $location.path('/operation/registrationlist');
                    growlService.growl('Approved..!', 'success');
                } else {

                }
            }, function (err) { });
        };

        $scope.isFrmRejectValid = false;
        $scope.$watch('Cntrl.frmReject.$valid', function (isValid) {
            $scope.isFrmRejectValid = isValid;
        });

        var fileType = ['image/jpg', 'image/jpeg', 'image/png', 'image/tif', 'application/pdf'];
        $scope.downLoad = function (fileName, companyID) {
            DownloadService.DownloadRegistrationFiles(fileName, 2, getMimeType(fileName), companyID);
        };

        function getMimeType(fileName) {
            var extension = fileName.split('.')[1];

            var returnVal = '';
            if (extension == 'jpg')
                returnVal = 'image/jpg';
            else if (extension == 'jpeg')
                returnVal = 'image/jpeg';
            else if (extension == 'png')
                returnVal = 'image/png';
            else if (extension == 'tif')
                returnVal = 'image/tif';
            else if (extension == 'pdf')
                returnVal = 'application/pdf';

            return returnVal;
        }

        $scope.Reject = function (remarks) {
            if ($scope.isFrmRejectValid) {
                var Obj = {
                    CompanyID: companyID,
                    Status: false,
                    Remarks: remarks
                };

                RegisteredCompanyService.UpdateStatus(Obj).then(function (d) {
                    if (d.data) {
                        $state.go('registrationlist', {});
                        growlService.growl('Rejected..!', 'warning');
                    } else {

                    }
                }, function (err) { });
            } else {
                growlService.growl('Please enter remarks for rejection', 'danger');
            }
        };

        $scope.isFrmAddInfoValid = false;
        $scope.$watch('Cntrl.frmAddInfo.$valid', function (isValid) {
            $scope.isFrmAddInfoValid = isValid;
        });

        $scope.AdditionalInfo = function (remarks) {
            if ($scope.isFrmAddInfoValid) {
                var Obj = {
                    CompanyID: companyID,
                    Status: null,
                    Remarks: remarks
                };
                RegisteredCompanyService.AdditionalInfo(Obj).then(function (d) {
                    if (d.data) {
                        $state.go('registrationlist', {});
                        growlService.growl('Additional Information request sent successfully..!', 'success');
                    } else {

                    }
                }, function (err) { });
            } else {
                growlService.growl('Please enter remarks for additional Information', 'danger');
            }
        };
    }]);