angular.module('LogiCon').controller('CompanyBillingCtrl', ['$scope', 'CompanyService', 'StatementService', '$location', '$stateParams', 'growlService', 'UtilityFunc', '$uibModal', 'Utility', 'DownloadService',
    function ($scope, CompanyService, StatementService, $location, $stateParams, growlService, UtilityFunc, $uibModal, Utility, DownloadService) {
        $scope.BaseUrl = Utility.BaseUrl;
        $scope.branchID = UtilityFunc.BranchID();
        $scope.DateFormat = UtilityFunc.DateFormat();
        $scope.currentPage = 1;
        $scope.limit = 10;
        $scope.suspendedPopOver = false;
        $scope.showLoading = true;
       
        $scope.Search = {
            DateFrom: UtilityFunc.FirstDateOfMonth(),
            DateTo: moment()
        };
        $scope.CompanyList = function () {
            $scope.showLoading = true;
            CompanyService.GetCompanyDetailList().then(function (d) {
                $scope.showLoading = false;
                $scope.CompanyList = d.data;
            });
        };

        $scope.viewInfo = function (companyID) {
            $location.path('/operation/subscribers/' + companyID);
        };

        $scope.getData = function () {
            var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
            RegisteredCompanyService.GetRegisteredCompanies($scope.filter, skip).then(function (d) {
                $scope.companies = d.data.registeredCompanies;
                $scope.totalItems = d.data.totalItems;

                $scope.showLoading = false;
            }, function (err) { });
        };

        $scope.filterChanged = function () {
            $scope.showLoading = true;
            $scope.getData();
        };

        $scope.pageChanged = function () {
            $scope.showLoading = true;
            $scope.getData();
        };
        $scope.isFrmSuspensionValid = false;
        $scope.$watch('Cntrl.frmSuspension.$valid', function (isValid) {
            $scope.isFrmSuspensionValid = isValid;
        });

        $scope.closeSuspendPopOver = function () {
            $scope.suspendedPopOver = false;
        };


        $scope.isFrmSearchValid = false;
        $scope.$watch('CompanyBillingCtrl.frmSearch.$valid', function (isValid) {
            $scope.isFrmSearchValid = isValid;
        });

        $scope.SearchCompanies = function (CompanyName, RegistrationNo, DateFrom, DateTo, Email) {
            var obj = {
                CompanyName: CompanyName == undefined ? null : CompanyName,
                RegistrationNo: RegistrationNo == undefined ? null : RegistrationNo,
                DateFrom: DateFrom == undefined ? null : DateFrom,
                DateTo: DateTo == undefined ? null : DateTo,
                Email: Email == undefined ? null : Email
            };
            if ($scope.isFrmSearchValid) {
                $scope.showLoading = true;
                CompanyService.SearchCompanies(obj).then(function (d) {
                    $scope.showLoading = false;
                    $scope.CompanyList = d.data;
                    $scope.searchPopOver = false;
                }, function (err) { });
            }
        };
       
        CompanyService.getSubscribersListCount(UtilityFunc.CompanyID()).then(function (d) {
          
            $scope.UserCount = d.data.UserCount;
            $scope.DeclarationCount = d.data.DeclarationCount;
            $scope.OrderCount = d.data.OrderCount;
        });

        $scope.Suspension = function (remarks) {
            var obj = {
                IsSuspended: !$scope.companyInfo.IsSuspended,
                SuspensionRemarks: remarks,
                CompanyCode: $stateParams.companycode
            };
            if ($scope.isFrmSuspensionValid) {
                CompanyService.SaveSuspendedResume(obj).then(function (d) {
                    $scope.companyInfo.IsSuspended = obj.IsSuspended;
                    $scope.suspendedPopOver = false;
                }, function (err) { });
            }
        };

        $scope.generateInvoice = function () {
            $scope.showLoading = true;
            StatementService.GenerateStatement($scope.companyInfo.CompanyCode).then(function (d) {
                $location.path('/billing/generateinvoice/' + d.data);
                $scope.showLoading = false;
            }, function (err) {
               
                growlService.growl(err.data.ExceptionMessage, 'danger');
                $scope.showLoading = false;
            });
        };

        $scope.UpdateCompanySubscription = function () {
            $scope.showLoading = true;
            CompanyService.UpdateSubscription(CompanyCode, $scope.companySubscripbersList).then(function (d) {
                $scope.showLoading = false;
                growlService.growl('Company Business Modules Updated Successfully', 'success');
            }, function (err) { });
        };

        $scope.UpdateBillingModules = function () {
            $scope.showLoading = true;
            CompanyService.UpdateBillingModules(CompanyCode, $scope.billingModules).then(function (d) {
                $scope.showLoading = false;
                growlService.growl('Company Billing Modules Updated Successfully', 'success');
            }, function (err) { });
        };

        $scope.GenerateInvoiceReport = function (obj) {
            if (true) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'Js/Reports/Templates/Report.html?v=' + Utility.Version,
                    controller: 'ReportCntrl',
                    windowClass: 'app-modal-window2',
                    resolve: {
                        reportObj: function () {
                            return {
                                reportId: 'ViewReport',
                                reportName: 'Tax Invoice',
                                branchID: $scope.branchID,
                                dateFrom: moment().format('MM/DD/YYYY'),
                                dateTo: moment().format('MM/DD/YYYY'),
                                Url: 'Statement.TaxInvoice'
                            }
                        }
                    }
                });

                modalInstance.result.then(function (d) {

                }, function () {

                });
            }
            else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };


        $scope.GenerateReport = function (obj) {
            if (true) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'Js/Reports/Templates/Report.html?v=' + Utility.Version,
                    controller: 'ReportCntrl',
                    windowClass: 'app-modal-window2',
                    resolve: {
                        reportObj: function () {
                            return {
                                reportId: 'ViewReport',
                                reportName: 'Statement Of Account',
                                branchID: $scope.branchID,
                                dateFrom: moment().format('01/MM/YYYY'),
                                dateTo: moment().format('MM/DD/YYYY'),
                                Url: 'DNeX.SOAReport'
                            }
                        }
                    }
                });

                modalInstance.result.then(function (d) {

                }, function () {

                });
            }
            else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
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
        var fileType = ['image/jpg', 'image/jpeg', 'image/png', 'image/tif', 'application/pdf'];
        $scope.downLoad = function (fileName, companyID) {
           
            DownloadService.DownloadRegistrationFiles(fileName, 2, getMimeType(fileName), companyID);
        };

        CompanyService.GetLookUpData().then(function (d) {
            $scope.lookupData = d.data;
        }, function () { });

        var CompanyCode = UtilityFunc.CompanyID();
      
        //if (angular.isUndefined(CompanyCode))
        //    $scope.CompanyList();
        //else {
        //    $scope.showLoading = true;
        //    CompanyService.GetCompanyDetails(CompanyCode).then(function (d) {
        //        console.log(d.data);
        //        $scope.companyInfo = d.data.companyInfo;
        //        $scope.usersCount = d.data.usersCount;
        //        $scope.branchCount = d.data.branchCount;
        //        $scope.companySubscripbersList = d.data.companySubscripbersList;
        //        $scope.billingModules = d.data.billingModules;
        //        $scope.usersList = d.data.usersList;
        //        $scope.contactDetails = d.data.contactDetails;
        //        $scope.docList = d.data.docList;
        //        $scope.DailingCode1 = d.data.DailingCode1;
        //        $scope.DailingCode2 = d.data.DailingCode2;
        //        $scope.DailingCode3 = d.data.DailingCode3;
        //        $scope.DailingCode4 = d.data.DailingCode4;
               
        //        $scope.showLoading = false;
        //    });
        //}
        if (angular.isUndefined(CompanyCode))
            $scope.CompanyList();
        else {
            $scope.showLoading = true;

            CompanyService.GetCompanyDetails(CompanyCode).then(function (d) {
                console.log(d.data);
               
                $scope.companyInfo = d.data.companyInfo;
                $scope.usersCount = d.data.usersCount;
                $scope.branchCount = d.data.branchCount;
                $scope.companySubscripbersList = d.data.companySubscripbersList;
                $scope.billingModules = d.data.billingModules;
                $scope.usersList = d.data.usersList;
                $scope.affiliationList = d.data.affiliationList;
                $scope.currentUsageList = d.data.currentUsageList;
                $scope.tariffList = d.data.tariffList;
                $scope.contactDetails = d.data.contactDetails;
                $scope.docList = d.data.docList;
                $scope.DailingCode1 = d.data.DailingCode1;
                $scope.DailingCode2 = d.data.DailingCode2;
                $scope.DailingCode3 = d.data.DailingCode3;
                $scope.DailingCode4 = d.data.DailingCode4;
                $scope.regDetails = d.data.regDetails;
                $scope.showLoading = false;

                
            });
           

        }
    }]);