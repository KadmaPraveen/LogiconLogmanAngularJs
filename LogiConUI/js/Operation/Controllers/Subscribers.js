angular.module('LogiCon').controller('SubscribersListCntrl', ['$scope', 'CompanyService', 'StatementService', '$location', '$stateParams', 'growlService', 'UtilityFunc', '$uibModal', 'Utility', 'DownloadService', 'NgTableParams',
    function ($scope, CompanyService, StatementService, $location, $stateParams, growlService, UtilityFunc, $uibModal, Utility, DownloadService, NgTableParams) {
        $scope.BaseUrl = Utility.BaseUrl;
        $scope.branchID = UtilityFunc.BranchID();
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.currentPage = 1;
        $scope.limit = 10;
        $scope.suspendedPopOver = false;
        $scope.IsAdvSearch = false;
        $scope.Search = {};
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
        $scope.IsBtnCUpdate = false;
        $scope.checkCompanyMailBoxNo = function (EDIMailBoxNo) {
            CompanyService.checkCompanyMailBoxNo(EDIMailBoxNo, $stateParams.companycode).then(function (d) {
                if (d.data) {
                    growlService.growl('Mail Box No already exists', 'danger');
                    angular.element('#cEDIMailBoxNo').focus();
                    $scope.IsBtnCUpdate = true;
                }
                else
                    $scope.IsBtnCUpdate = false;
                //    growlService.growl('Email ID is available!', 'success');

            }, function (err) {

            });
        };
        $scope.UpdateCompanyMailBoxAndAgentCode = function (customMailBoxNo, agentCode) {
            $scope.showLoading = true;
            var obj = {
                EDIMailBoxNo: customMailBoxNo,
                AgentCode: agentCode,
                CompanyCode: $stateParams.companycode
            };
            CompanyService.UpdateCompanyMailBoxAndAgentCode(obj).then(function (d) {

                $scope.showLoading = false;
                growlService.growl(d.data, 'success');

            });
        };
        $scope.IsBtnBUpdate = false;
        $scope.checkBranchMailBoxNo = function (customMailBoxNo, branchId) {
            CompanyService.checkBranchMailBoxNo(customMailBoxNo, branchId, $stateParams.companycode).then(function (d) {
                if (d.data) {
                    growlService.growl('Mail Box No already exists', 'danger');
                    angular.element('#bEDIMailBoxNo').focus();
                    $scope.IsBtnBUpdate = true;
                }
                else
                    $scope.IsBtnBUpdate = false;
                //    growlService.growl('Email ID is available!', 'success');

            }, function (err) {

            });
        };

        $scope.UpdateBranchMailBoxAndAgentCode = function (branchId, customMailBoxNo, agentCode) {
            $scope.showLoading = true;
            var obj = {
                BranchID: branchId,
                EDIMailBoxNo: customMailBoxNo,
                AgentCode: agentCode,
                CompanyCode: $stateParams.companycode
            };

            CompanyService.UpdateBranchMailBoxAndAgentCode(obj).then(function (d) {

                $scope.showLoading = false;

                $scope.data = d.data;

                growlService.growl(d.data, 'success');

            });
        };

        $scope.viewInfo = function (companyID) {
            $location.path('/operation/subscribers/' + companyID);
        };

        /* vijay */
        //$scope.getSubscribersListCount = function () {
        //    CompanyService.getSubscribersListCount().then(function (res) {

        //    }, function (err) {
        //    });
        //}


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
        $scope.$watch('SubscribersCntrl.frmSearch.$valid', function (isValid) {
            $scope.isFrmSearchValid = isValid;
        });

        var DataTblobj = {};

        $scope.GetTableData = function (IsAdvSearch) {
            $scope.ngTblData = new NgTableParams({
                page: 0,
                count: 10,
                sorting: {
                    CreatedOn: 'desc'

                }
            },
                {
                    counts: [10, 20, 30],
                    getData: function ($defer, params) {
                        DataTblobj.CompanyName = $scope.Search.CompanyName == undefined ? null : $scope.Search.CompanyName;
                        DataTblobj.RegistrationNo = $scope.Search.RegistrationNo == undefined ? null : $scope.Search.RegistrationNo;
                        DataTblobj.DateFrom = $scope.Search.DateFrom == undefined ? null : $scope.Search.DateFrom;
                        DataTblobj.DateTo = $scope.Search.DateTo == undefined ? null : $scope.Search.DateTo;
                        DataTblobj.Email = $scope.Search.Email == undefined ? null : $scope.Search.Email;
                        DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                        DataTblobj.limit = params.count();
                        if (params.sorting()) {
                            var orderBy = params.orderBy()[0];

                            DataTblobj.sortColumn = orderBy.substring(1);
                            DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'

                        }
                        CompanyService.GetTableData(DataTblobj).then(function (d) {
                            params.total(d.data.records);
                            $defer.resolve(d.data.data);
                        }, function (err) { });
                    }
                });
        };





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
                                branchID: $stateParams.companycode,
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

        var CompanyCode = $stateParams.companycode;
        CompanyService.getSubscribersListCount(CompanyCode).then(function (d) {
            $scope.UserCount = d.data.UserCount;
            $scope.DeclarationCount = d.data.DeclarationCount;
            $scope.OrderCount = d.data.OrderCount;
        });

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
        $scope.GetTableData();
    }]);
