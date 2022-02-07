angular.module('LogiCon').controller('CustomerQuotationCntrl', ['$scope', '$uibModal', 'CustomerQuotationService', 'limitToFilter', '$stateParams', '$location', 'MerchantProfileService', '$filter', 'growlService', 'Utility', 'UtilityFunc', '$state', 'NgTableParams', '$window',
    function ($scope, $uibModal, CustomerQuotationService, limitToFilter, $stateParams, $location, MerchantProfileService, $filter, growlService, Utility, UtilityFunc, $state, NgTableParams, $window) {
        $scope.tabs = [
           { title: 'Customer Quotation', content: 'Js/MasterData/Templates/CustomerQuotation/general.html?v=' + Utility.Version, active: true, disabled: false },
           { title: 'Details', content: 'Js/MasterData/Templates/CustomerQuotation/details.html?v=' + Utility.Version, active: false, disabled: false }
        ];
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.branchID = UtilityFunc.BranchID();
        $scope.cq = {
            QuotationItems: new Array()
        };
        $scope.cq.QuotationDate = moment();
        //$scope.cq.EffectiveDate = moment();
        $scope.mindate = moment();
        $scope.AddCQDetails = function (index) {
            var modalInstance = $uibModal.open({
                animation: true,
                template: '<quotation-detail data="data" quotation="customer"></quotation-detail>',
                controller: 'QuotationDetailCntrl',
                windowClass: 'app-modal-window4',
                resolve: {
                    quotationDetailsObj: function () {

                        return (index != -1 ? $scope.cq.QuotationItems[index] : { Index: index });
                    }
                }
            });

            modalInstance.result.then(function (quotationDetails) {

                if ($scope.cq.QuotationItems != null) {
                    if (quotationDetails.Index != -1) {
                        $scope.cq.QuotationItems[quotationDetails.Index] = quotationDetails;
                    }
                    else {
                        $scope.cq.QuotationItems.push(quotationDetails);
                    }
                }
                else {
                    $scope.cq.QuotationItems = new Array();
                    $scope.cq.QuotationItems.push(quotationDetails);
                }
                $scope.ngTblMerchantQuotation();
            }, function () {

            });
        };

        $scope.MerchantQuotationIndex = -1;
        $scope.ngTblMerchantQuotation = function () {
            $scope.tblMerchantQuotation = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.cq.QuotationItems.length,
                getData: function ($defer, params) {
                    var conData = params.sorting() ? $filter('orderBy')($scope.cq.QuotationItems, params.orderBy()) : $scope.cq.QuotationItems;
                    $defer.resolve(conData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.MerchantQuotationIndex = (params.page() - 1) * params.count();
                }
            });
        }

        $scope.deleteCQDetails = function (index) {
            $scope.cq.QuotationItems.splice(index, 1);
            $scope.ngTblMerchantQuotation();
        };
        $scope.isFrmCustomerQuotationValid = false;
        $scope.$watch('frmCustomerQuotation.$valid', function (valid) {
            $scope.isFrmCustomerQuotationValid = valid;
        });

        $scope.SaveCustomerQuotation = function (cq) {
            if ($scope.isFrmCustomerQuotationValid) {
                if ($scope.cq.QuotationItems.length > 0) {
                    CustomerQuotationService.SaveCustomerQuotation(cq).then(function (d) {
                        if (d.data.message == 'Duplicate records exists') {
                            growlService.growl(d.data.message, 'danger');
                        }
                        else {
                            growlService.growl(d.data.message, 'success');
                            //$location.reload();
                            $state.go('customerquotation', {
                                quotation: d.data.quotation
                            });
                        }
                    }, function (err) {

                        growlService.growl('A QUOTATION ALREADY EXISTS WITH THIS DATE RANGE', 'danger');
                    });
                }
                else {
                    growlService.growl('Please add atleast one quotation detail', 'danger');
                }
            }
            else {
                growlService.growl('Please enter all mandatory fields..', 'danger');
            }
        };

        $scope.lookupData = {};
        $scope.getLookUpData = function () {
            CustomerQuotationService.GetLookupData('quotation').then(function (d) {
                $scope.lookupData = d.data;
            }, function (err) { });
        };

        $scope.getLookUpData();

        $scope.CustomerResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (response) {
                return limitToFilter(response.data, 15);
            }, function (err) { });
        };

        $scope.AgentResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (response) {
                return limitToFilter(response.data, 15);
            }, function (err) { });
        };

        $scope.ForwarderResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (response) {
                return limitToFilter(response.data, 15);
            }, function (err) { });
        };

        $scope.CustomerQuotationList = function () {
            CustomerQuotationService.getCustomerQuotationListByType(3861).then(function (d) {
                $scope.quotationlist = d.data;
            }, function () { });
        };

        /*Ng Table */

        var DataTblobj = {};
        $scope.GetTableData = function () {
            $scope.ngTableMerchant = new NgTableParams({
                page: 0,
                count: 10,
                sorting: {
                    CreatedOn: 'desc'
                }
            },
            {
                counts: [10, 20, 30],
                getData: function ($defer, params) {
                    DataTblobj.BranchID = null;
                    DataTblobj.QuotationType = 3861;
                    DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    DataTblobj.limit = params.count();
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];
                        DataTblobj.sortColumn = orderBy.substring(1);
                        DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                    }
                   
                    CustomerQuotationService.GetTableList(DataTblobj).then(function (res) {
                        params.total(res.data.records);
                        $defer.resolve(res.data.data);
                    }, function (err) {
                    })
                }
            });

        }
        //$scope.GetTableData();

        /*Ng Table */

        var quotationNo = $stateParams.quotation;

        $scope.reportUrl = Utility.ReportPath + '/GetCustomerQuotationReport?Url=DNeX.Customer.Quotation&branchID=' + $scope.branchID + '&quotationNo=' + quotationNo;
        if (typeof quotationNo != 'undefined') {
            if (quotationNo != 'NEW' && quotationNo != '') {
                CustomerQuotationService.getCustomerQuotation(quotationNo, 3861).then(function (d) {
                    $scope.cq = d.data;
                    $scope.ngTblMerchantQuotation();
                    if ($scope.cq.QuotationDate != null) {
                        $scope.cq.QuotationDate = new Date(moment($scope.cq.QuotationDate));
                    }

                    if ($scope.cq.EffectiveDate != null)
                        $scope.cq.EffectiveDate = new Date(moment($scope.cq.EffectiveDate));

                    if ($scope.cq.ExpiryDate != null)
                        $scope.cq.ExpiryDate = new Date(moment($scope.cq.ExpiryDate));
                }, function (err) { });
            } else {
                $scope.cq.QuotationNo = 'NEW';
            }
        }
        else {
            //$scope.CustomerQuotationList();
            $scope.GetTableData();
        }

        $scope.backToList = function () {
            $location.path('/MasterData/customerquotation/list');
        };

        $scope.searchClick = function (type) {
            $stateParams.code = $scope.cq[type];
        };

        $scope.AddQuotation = function (quotationNo) {
            $location.path('/MasterData/customerquotation/' + quotationNo);
        }
        $scope.Clear = function () {
            $state.go('customerquotation', { 'quotation': '' }, { reload: true })
        }

        $scope.VoidQuotation = function (quotationNo) {
            CustomerQuotationService.VoidQuotation(quotationNo).then(function (d) {
                growlService.growl('Void successfully', 'danger');
                $state.go('customerquotation', {
                    quotation: quotationNo
                }, { reload: true });
            }, function (err) { });
        };

        $scope.DeleteQuotation = function (quotationNo) {
            CustomerQuotationService.DeleteQuotation(quotationNo).then(function (d) {
                growlService.growl('Deleted successfully', 'danger');
                $state.go('customerquotationlist', {}, {});
            }, function (err) { });
        };

        $scope.ApproveQuotation = function (quotationNo) {
            CustomerQuotationService.ApproveQuotation(quotationNo).then(function (d) {
                growlService.growl('Approve successfully', 'success');
                $state.go('customerquotation', {
                    quotation: quotationNo
                }, { reload: true });
            }, function (err) { });
        };

        $scope.validateEffectivedate = function () {
            if (!angular.isUndefined($scope.cq.EffectiveDate) && angular.isUndefined($scope.cq.ExpiryDate)) {
                $scope.cq.ExpiryDate = moment($scope.cq.EffectiveDate).add(30, 'days');
            }
            if ($scope.cq.ExpiryDate != undefined && $scope.cq.EffectiveDate != undefined) {
                var effectiveDate = moment($scope.cq.EffectiveDate);
                var expiryDate = moment($scope.cq.ExpiryDate);
                if (effectiveDate == expiryDate || effectiveDate > expiryDate) {
                    $scope.cq.ExpiryDate = undefined;
                    growlService.growl('ExpiryDate Should be greater than Effective date', 'danger');
                }
            }
        }
        $scope.BroadCastDeclaration = function (obj) {
            $window.parent.MainModuleFunction(obj, 'customerquotation', 'merchant quotation');
        };
    }]);



