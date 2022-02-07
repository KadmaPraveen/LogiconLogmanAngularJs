angular.module('LogiCon').controller('StandardQuotationCntrl', ['$scope', '$uibModal', 'CustomerQuotationService', 'UtilityFunc', 'growlService', '$stateParams', '$state', 'Utility',
    function ($scope, $uibModal, CustomerQuotationService, UtilityFunc, growlService, $stateParams, $state, Utility) {

        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();
        $scope.branchID = UtilityFunc.BranchID();
        //$scope.maxdate = moment();
        $scope.mindate = moment();

        $scope.IsfrmStandardCntrl = false;
        $scope.cq = {
            QuotationItems: new Array()
        };
        $scope.cq.QuotationNo = UtilityFunc.StandardQuotationkey();
        $scope.cq.QuotationDate = moment();
        $scope.reportUrl = Utility.ReportPath + '/GetCustomerQuotationReport?Url=DNeX.Customer.Quotation&branchID=' + $scope.branchID + '&quotationNo=' + $scope.cq.QuotationNo;

        $scope.$watch('frmStandardCntrl.$valid', function (valid) {
            $scope.IsfrmStandardCntrl = valid;
        });

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
        $scope.deleteCQDetails = function (index) {
            $scope.cq.QuotationItems.splice(index, 1);
        }

        $scope.AddCQDetails = function (index) {
            var modalInstance = $uibModal.open({
                animation: true,
                template: '<quotation-detail data="data" quotation="standard"></quotation-detail>',
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
            }, function () {

            });
        };

        $scope.SaveStndQuotation = function (cq) {
            debugger;
            if ($scope.IsfrmStandardCntrl) {
                debugger;
                if ($scope.cq.QuotationItems.length > 0) {
                    CustomerQuotationService.SaveCustomerQuotation(cq).then(function (d) {
                        growlService.growl(d.data.message, 'success');
                        $state.go('standardquotation', {
                            quotation: d.data.quotation
                        });
                    }, function (err) {
                        growlService.growl('A QUOTATION ALREADY EXISTS WITH THIS DATE RANGE', 'danger');
                    });
                }
                else {
                    debugger;
                    growlService.growl('Please add atleast one quotation detail', 'danger');
                }
            }

        };

        $scope.getLookUpData = function () {
            CustomerQuotationService.GetLookupData('quotation').then(function (d) {
                $scope.lookupData = d.data;
            }, function (err) { });
        };

        $scope.getLookUpData();

        //$scope.GetStandardQuotaion = function ()
        //{
        //    CustomerQuotationService.GetStandardQuotation().then(function (d) {                
        //        $scope.cq = d.data;
        //    }, function (err) {

        //    });
        //}
        //$scope.GetStandardQuotaion();
        $scope.CustomerQuotationList = function () {
            CustomerQuotationService.getCustomerQuotationListByType(3860).then(function (d) {
                $scope.quotationlist = d.data;
            }, function () { });
        };

        $scope.Clear=function()
        {
            $state.go('standardquotation', {'quotation':''}, { reload:true})
        }

        $scope.VoidQuotation = function (quotationNo) {
            CustomerQuotationService.VoidQuotation(quotationNo).then(function (d) {
                growlService.growl('Void successfully', 'danger');
                $state.go('standardquotation', {
                    quotation: quotationNo
                }, { reload: true });
            }, function (err) { });
        };

        $scope.DeleteQuotation = function (quotationNo) {
            CustomerQuotationService.DeleteQuotation(quotationNo).then(function (d) {
                growlService.growl('Deleted successfully', 'danger');
                $state.go('standardquotationlist', {}, {});
            }, function (err) { });
        };

        $scope.ApproveQuotation = function (quotationNo) {
            CustomerQuotationService.ApproveQuotation(quotationNo).then(function (d) {
                growlService.growl('Approve successfully', 'success');
                $state.go('standardquotation', {
                    quotation: quotationNo
                }, { reload: true });
            }, function (err) { });
        };

        var quotationNo = $stateParams.quotation;
        if (typeof quotationNo != 'undefined') {
            if (quotationNo != 'NEW' && quotationNo != '') {
                CustomerQuotationService.getCustomerQuotation(quotationNo, 3860).then(function (d) {
                    $scope.cq = d.data;
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
            $scope.CustomerQuotationList();
        }
    }]);

