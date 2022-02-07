angular.module('LogiCon').controller('CustomerCashBillCntrl', ['$scope', '$uibModal', 'CustomerInvoiceService', 'growlService', 'DataTransferService', '$stateParams', 'Utility', 'CostSheetService', 'limitToFilter', 'MerchantProfileService', 'UtilityFunc', '$timeout', '$state',
function ($scope, $uibModal, CustomerInvoiceService, growlService, DataTransferService, $stateParams, Utility, CostSheetService, limitToFilter, MerchantProfileService, UtilityFunc, $timeout, $state) {

    $scope.InvoiceNo = $stateParams.Invoiceno;
    $scope.init = function () {
        debugger;

        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.ccb = {
            IsApproved: false,
            IsCancel: false
        };
        $scope.ccb.InvoiceDate = new Date();

        $scope.IsaddressValidated = false;
        $scope.isChecked = true;
        var customerCashBillIndex = -1;
        //$scope.IsInvoiceExists = false;

        if (!angular.isUndefined($scope.InvoiceNo) && $scope.InvoiceNo != null && $scope.InvoiceNo != '')
            $scope.GetInvoiceHeader($scope.InvoiceNo);

        var chkArr = new Array();
        var merchantInfo = {};
        debugger;
        var obj = JSON.parse(sessionStorage.getItem('SSN_COSTSHEET_DETAILS'));
        if (obj != null) {
            chkArr = obj.costSheetList;
            $scope.orderDetails = obj.orderDetails;
            //sessionStorage.removeItem('SSN_COSTSHEET_DETAILS');
            if ($scope.orderDetails != null || $scope.orderDetails != undefined) {
                $scope.ccb.CustomerName = $scope.orderDetails.CustomerName;
                $scope.ccb.CustomerCode = $scope.orderDetails.CustomerCode;
            }

            MerchantProfileService.GetMerchant($scope.ccb.CustomerCode).then(function (d) {
                merchantInfo = d.data;
                $scope.Details = d.data.AddressList;
                $scope.ccb.CreditTerm = d.data.CreditTerm;
            }, function (err) { });

            $scope.ccb.invoiceDetailList = new Array();
            if (chkArr.length > 0) {
                $scope.ccb.invoiceDetailList = chkArr;
                CalcTaxAmount();
            }
        }
        $scope.hdrChkCustInvoice = false;

        CustomerInvoiceService.GetLookupData(true).then(function (d) {
            $scope.lookupData = d.data;
            debugger;
            $scope.ccb.InvoiceType = d.data.invoiceType;
        }, function (err) { });

        $scope.ValidateInputDecimal();
        //CalcTaxAmount();
    }
    $scope.GetInvoiceHeader = function (Invoiceno) {
        debugger;
        CustomerInvoiceService.GetInvoiceHeader(Invoiceno).then(function (d) {
            $scope.ccb = d.data.invoiceHeader;
            $scope.DataAddress(d.data.address);
            MerchantProfileService.GetMerchant(d.data.invoiceHeader.CustomerCode).then(function (d) {
                $scope.Details = d.data.AddressList;
                $scope.IsInvoiceApproved = true;
                if ($scope.ccb.IsApproved == true) {
                    $scope.approveCancelBtn = 'Disapprove';
                }
                else {
                    $scope.approveCancelBtn = 'Approve';
                }
                $scope.ValidateDates();
                $scope.ValidateInputDecimal();
            }, function (err) { });

        }, function (err) { });
    }

    //$scope.customercashbillDetails = function (index) {

    //    customerCashBillIndex = index;
    //    var modalInstance = $uibModal.open({
    //        animation: true,
    //        templateUrl: 'Js/Billing/Templates/CustomerCashBill/add-customercash-bill.html?v=' + Utility.Version,
    //        controller: 'addEditCustomerCashBillCntrl',
    //        size: 'lg',
    //        resolve: {
    //            customerCashBillItemObj: function () {
    //                return {
    //                    customerCashBillItem: customerCashBillIndex != -1 ? $scope.ccb.customerCashBillList[customerCashBillIndex] : "",
    //                    //currencyCode: $scope.ccb.CurrencyCode != "" ? $scope.ccb.CurrencyCode : ""
    //                }
    //            }
    //        }
    //    });

    $scope.customercashbillDetails = function (index) {
        customerCashBillIndex = index;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Billing/Templates/CustomerCashBill/add-customercash-bill.html?v=' + Utility.Version,
            controller: 'addEditCustomerCashBillCntrl',
            //size: 'lg',
            size: 'lg',
            resolve: {
                customerCashBillItemObj: function () {
                    return customerCashBillIndex != -1 ? $scope.ccb.invoiceDetailList[customerCashBillIndex] : ""
                }
            }
        });

        modalInstance.result.then(function (ci) {

        }, function () {
        });
    };

    //$scope.SavecustomercashbillDetails = function () {
    //    var tt = $scope.ccb;
    //    if ($scope.ccb.customercashbillList.length > 0) {
    //        CustomerCashBillService.Save($scope.ccb).then(function (d) {
    //            sessionStorage.removeItem('SSN_COSTSHEET_DETAILS');
    //            growlService.growl('Saved Successfully', 'success');
    //        });
    //    }
    //};

    $scope.hdrChkCustCash = false;
    $scope.toggleCustCash = function () {

        $scope.hdrChkCustCash = !$scope.hdrChkCustCash;
        angular.forEach($scope.ccb.invoiceDetailList, function (item, index) {
            item.chk = $scope.hdrChkCustCash;
        });
    };

    $scope.SelectCurrencyCode = function (curCode) {
        CustomerInvoiceService.GetExchangeRate(curCode).then(function (d) {
        }, function (err) { });
    }
    $scope.isFrmValid = false;
    $scope.$watch('frmCustomerBillInfo.$valid', function (isValid) {
        $scope.isFrmValid = isValid;
    });

    $scope.SaveCustomerCashBillInvoiceDetails = function (ccb) {
        debugger;
        if ($scope.isFrmValid) {
            if ($scope.ccb.AddressId) {
                if ($scope.ccb.invoiceDetailList.length > 0) {
                    CustomerInvoiceService.SaveCustomerInvoice(ccb).then(function (d) {
                        sessionStorage.removeItem('SSN_COSTSHEET_DETAILS');
                        //$scope.IsInvoiceExists = true;
                        $scope.ccb.InvoiceNo = d.data;
                        $scope.IsInvoiceApproved = true;
                        debugger;
                        growlService.growl('Invoice ' + $scope.ccb.InvoiceNo + '  Saved Successfully ', 'success');
                    });
                }
            }
            else
                growlService.growl('Please select address', 'danger');
        } else {

            var error = $scope.frmCustomerBillInfo.$error;
            angular.forEach(error.required, function (field) {
                if (field.$invalid) {
                    var fieldName = field.$name;
                }
            });
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    };

    //$scope.DeletecustomercashbillDetails = function () {
    //    CustomerCashBillService.DeleteAddress($scope.ccb).then(function (d) {
    //        growlService.growl('Delete Successfully', 'success');
    //        // $uibModalInstance.close(obj);
    //    });
    //}
    $scope.DataAddress = function (item) {
        debugger;
        $scope.Address1 = item.Address1;
        $scope.Address2 = item.Address2;
        $scope.ZipCode = item.ZipCode;
        $scope.State = item.State;
        $scope.CountryCode = item.CountryCode;
        $scope.TelNo = item.TelNo;
        $scope.FaxNo = item.FaxNo;
        $scope.MobileNo = item.MobileNo;
        $scope.City = item.City;
        $scope.ccb.AddressId = item.AddressId;
        $scope.ccb.isAddressOpen = false;
    };

    function CalcTaxAmount() {
        var totalTaxAmount = 0.0;
        var totalAmount = 0.0;
        var invoiceAmount = 0.00;

        if ($scope.ccb.invoiceDetailList.length > 0) {
            angular.forEach($scope.ccb.invoiceDetailList, function (item, index) {
                totalTaxAmount += parseFloat(item.TaxAmount);
                //totalAmount += parseFloat(item.TotalAmount);
                invoiceAmount += parseFloat(item.ActualAmount);
                $scope.ccb.Remark = item.Remark;
            });
            $scope.ccb.TaxAmount = totalTaxAmount.toFixed(2);
            $scope.ccb.InvoiceAmount = invoiceAmount.toFixed(2);
            $scope.ccb.NetAmount = (invoiceAmount + totalTaxAmount).toFixed(2);
            $scope.ccb.TotalAmount = (invoiceAmount + totalTaxAmount).toFixed(2);
            $scope.ccb.CashAmount = (invoiceAmount + totalTaxAmount).toFixed(2);
        }
        else {
            $scope.ccb.TaxAmount = 0.0;
            $scope.ccb.TotalAmount = 0.0;
            $scope.ccb.InvoiceAmount = 0.0;
            $scope.ccb.NetAmount = 0.0;
            $scope.ccb.CashAmount = 0.0;
        }

    }

    $scope.approveCancelBtn = 'Approve';
    $scope.ApproveCancelCustomerDetails = function () {
        debugger;
        if ($scope.approveCancelBtn == 'Approve') {
            $scope.isApproval = true;

            debugger;
            $scope.approveCancelBtn = 'Disapprove';
        } else {
            $scope.isApproval = false;
            $scope.approveCancelBtn = 'Approve';

        }
        $scope.ApprovecustomercashbillDetails($scope.isApproval);
    };
    $scope.ApprovecustomercashbillDetails = function (approveCancel) {
        debugger;
        CustomerInvoiceService.ApproveCancelInvoice($scope.ccb.InvoiceNo, approveCancel)
            .then(function (d) {
                debugger;
                if (approveCancel) {
                    $scope.ccb = d.data.invoiceHeader;
                    $scope.DataAddress(d.data.address);
                    MerchantProfileService.GetMerchant(d.data.invoiceHeader.CustomerCode).then(function (d) {
                        $scope.Details = d.data.AddressList;
                        $scope.IsInvoiceApproved = true;
                        $scope.ccb.IsCancel = true;
                        $scope.ValidateInputDecimal();
                    }, function (err) { });
                } else {
                    $state.go('customercashbilltype', { 'Invoiceno': '' });
                }

                if (approveCancel)
                    growlService.growl($scope.ccb.InvoiceNo + '  Approved Successfully..', 'success');
                else
                    growlService.growl($scope.ccb.InvoiceNo + '  Cancelled Successfully..', 'danger');
            },
            function (err) {
            });
    };

    $scope.ValidateDates = function () {
        if (!angular.isUndefined($scope.ccb.InvoiceDate) && $scope.ccb.InvoiceDate != null) {
            if ($scope.ccb.InvoiceDate == null) {
                $scope.ccb.InvoiceDate = undefined;
            }
            else
                $scope.ccb.InvoiceDate = moment($scope.ccb.InvoiceDate);
        }
    }
    $scope.ValidateInputDecimal = function () {
        $timeout(function () {
            if ($scope.frmCustomerBillInfo.TaxAmount.$viewValue != null) {
                $scope.frmCustomerBillInfo.TaxAmount.$$runValidators($scope.frmCustomerBillInfo.TaxAmount.$modalValue, $scope.frmCustomerBillInfo.TaxAmount.$viewValue, function () {
                    $scope.frmCustomerBillInfo.TaxAmount.$setViewValue($scope.frmCustomerBillInfo.TaxAmount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                });
            }
            if ($scope.frmCustomerBillInfo.TotalAmount.$viewValue != null) {
                $scope.frmCustomerBillInfo.TotalAmount.$$runValidators($scope.frmCustomerBillInfo.TotalAmount.$modalValue, $scope.frmCustomerBillInfo.TotalAmount.$viewValue, function () {
                    $scope.frmCustomerBillInfo.TotalAmount.$setViewValue($scope.frmCustomerBillInfo.TotalAmount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                });
            }
        }, 200);
    }

    $scope.init();
}]);



//cashbill.js
