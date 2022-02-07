angular.module('LogiCon').controller('CustomerInvoiceCntrl', ['$scope', '$uibModal', 'CustomerInvoiceService', '$stateParams', 'DataTransferService', '$location', 'Utility', 'limitToFilter', '$http', 'UtilityFunc', 'MerchantProfileService', 'growlService', '$timeout', '$state',
    function ($scope, $uibModal, CustomerInvoiceService, $stateParams, DataTransferService, $location, Utility, limitToFilter, $http, UtilityFunc, MerchantProfileService, growlService, $timeout, $state) {
        $scope.Invoiceno = $stateParams.Invoiceno;
        
        $scope.init = function () {
            

            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.branchID = UtilityFunc.BranchID();
            $scope.cin = {
                IsApproved: false,
                IsCancel: false
            };
            $scope.cin.InvoiceDate = new Date();
            $scope.chkArr = {};
            $scope.IsaddressValidated = false;
            $scope.isChecked = true;
            var customerInvoiceIndex = -1;
            //$scope.IsInvoiceExists = false;

            if (!angular.isUndefined($scope.Invoiceno) && $scope.Invoiceno != null && $scope.Invoiceno != '')
                $scope.GetInvoiceHeader($scope.Invoiceno);

            $scope.reportUrl = Utility.ReportPath + '/GetCustomerBillingInvoiceReport?Url=DNeX.CustomerBilling.Invoice&branchID=' + $scope.branchID + '&invoiceNo=' + $scope.Invoiceno;

            var chkArr = new Array();
            var merchantInfo = {};
            
            var obj = JSON.parse(sessionStorage.getItem('SSN_COSTSHEET_DETAILS'));
            if (obj != null) {
                chkArr = obj.costSheetList;
                $scope.orderDetails = obj.orderDetails;
                //sessionStorage.removeItem('SSN_COSTSHEET_DETAILS');
                if ($scope.orderDetails != null || $scope.orderDetails != undefined) {
                    $scope.cin.CustomerName = $scope.orderDetails.CustomerName;
                    $scope.cin.CustomerCode = $scope.orderDetails.CustomerCode;
                }

                MerchantProfileService.GetMerchant($scope.cin.CustomerCode).then(function (d) {
                    merchantInfo = d.data;
                    $scope.Details = d.data.AddressList;
                    $scope.cin.CreditTerm = d.data.CreditTerm;
                }, function (err) { });

                $scope.cin.invoiceDetailList = new Array();
                if (chkArr.length > 0) {
                    
                    $scope.cin.invoiceDetailList = chkArr;

                    CalcTaxAmount();
                }
                //$scope.cin.IsApproved = false;
                //$scope.cin.IsCancel = false;

            }

            $scope.hdrChkCustInvoice = false;
            CustomerInvoiceService.GetLookupData().then(function (d) {
                $scope.lookupData = d.data;
                $scope.cin.InvoiceType = d.data.invoiceType;
            }, function (err) { });
            $scope.ValidateInputDecimal();
            //CalcTaxAmount();
        }

        $scope.GetInvoiceHeader = function (Invoiceno) {
            
            CustomerInvoiceService.GetInvoiceHeader(Invoiceno).then(function (d) {
                
                $scope.cin = d.data.invoiceHeader;
                angular.forEach($scope.cin.invoiceDetailList, function (obj,i) {
                    if (obj.QuotationNo.startsWith('S'))
                        obj.QuotationNo = "STANDARD"
                });

                $scope.DataAddress(d.data.address);
                MerchantProfileService.GetMerchant(d.data.invoiceHeader.CustomerCode).then(function (d) {
                    $scope.Details = d.data.AddressList;
                    $scope.ValidateDates();
                    
                    $scope.IsInvoiceApproved = true;
                    if ($scope.cin.IsApproved == true) {
                        $scope.approveCancelBtn = 'Disapprove';
                    }
                    else {
                        $scope.approveCancelBtn = 'Approve';
                    }

                    $scope.ValidateInputDecimal();
                }, function (err) { });
            }, function (err) { });
        }


        $scope.customerInvoiceDetails = function (index) {
            customerInvoiceIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Billing/Templates/CustomerInvoice/add-customer-invoice.html?v=' + Utility.Version,
                controller: 'addEditCustomerInvoiceCntrl',
                //size: 'lg',
                size: 'lg',
                resolve: {
                    costSheetItem: function () {
                        return customerInvoiceIndex != -1 ? $scope.cin.invoiceDetailList[customerInvoiceIndex] : ""
                    }
                }
            });

            modalInstance.result.then(function (ci) {

            }, function () {

            });
        };

        $scope.isFrmValid = false;
        $scope.$watch('frmCustomerInfo.$valid', function (isValid) {
            $scope.isFrmValid = isValid;
        });
        $scope.SaveCustomerInvoiceDetails = function (cin) {
            console.log(JSON.stringify(cin));
            if ($scope.isFrmValid) {
                if ($scope.cin.AddressId) {
                    if ($scope.cin.invoiceDetailList.length > 0) {
                        CustomerInvoiceService.SaveCustomerInvoice(cin).then(function (d) {
                            sessionStorage.removeItem('SSN_COSTSHEET_DETAILS');
                            //$scope.IsInvoiceExists = true;
                            $scope.cin.InvoiceNo = d.data;
                            $scope.IsInvoiceApproved = true;
                            growlService.growl('Invoice ' + $scope.cin.InvoiceNo + '  Saved Successfully ', 'success');
                        }, function (err) { });
                    }
                }
                else
                    growlService.growl('Please select address', 'danger');
            }
            else {


                var error = $scope.frmCustomerInfo.$error;
                angular.forEach(error.required, function (field) {
                    if (field.$invalid) {
                        var fieldName = field.$name;
                    }
                });
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };


        

        $scope.MerchantResults = function ($query) {
            return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + $query + '/billingCustomer').then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };

        $scope.toggleCustInvoice = function () {
            $scope.hdrChkCustInvoice = !$scope.hdrChkCustInvoice;
            angular.forEach($scope.cin.invoiceDetailList, function (item, index) {
                item.chk = $scope.hdrChkCustInvoice;
            });
        };

        $scope.SelectedAddress = function (addressObj) {
            $scope.cin.AddressId = addressObj.AddressId;
            $scope.SelectedDetails = addressObj;
            $scope.IsaddressValidated = true;
        };

        //$scope.DeleteCustomerInvoice = function (index) {
        //    $scope.cin.invoiceDetailList = UtilityFunc.removeArrayElementByKey($scope.cin.invoiceDetailList, 'Index', index);
        //};

        $scope.SelectCurrencyCode = function (curCode) {
            CustomerInvoiceService.GetExchangeRate(curCode).then(function (d) {

            }, function (err) { });
        }

        function CalcTaxAmount() {
            var totalTaxAmount = 0.0;
            var totalAmount = 0.0;
            var invoiceAmount = 0.00;

            if ($scope.cin.invoiceDetailList.length > 0) {
                angular.forEach($scope.cin.invoiceDetailList, function (item, index) {
                    totalTaxAmount += parseFloat(item.TaxAmount);
                    //totalAmount += parseFloat(item.TotalAmount);
                    invoiceAmount += parseFloat(item.ActualAmount);
                    $scope.cin.Remark = item.Remark;
                });

                $scope.cin.TaxAmount = totalTaxAmount.toFixed(2);
                $scope.cin.TotalAmount = (invoiceAmount + totalTaxAmount).toFixed(2);
                $scope.cin.InvoiceAmount = invoiceAmount.toFixed(2);
                $scope.cin.NetAmount = (invoiceAmount + totalTaxAmount).toFixed(2);
                $scope.cin.CashAmount = (invoiceAmount + totalTaxAmount).toFixed(2);
                $scope.ValidateInputDecimal();
            }
            else {
                $scope.cin.TaxAmount = 0.0;
                $scope.cin.TotalAmount = 0.0;
                $scope.cin.InvoiceAmount = 0.0;
                $scope.cin.NetAmount = 0.0;
                $scope.cin.CashAmount = 0.0;
            }

        }

        $scope.DeleteCustomerInvoice = function () {
            CustomerInvoiceService.Delete($scope.cin.Invoiceno).then(function (d) {
                growlService.growl('Invoice deleted Successfully', 'success');
                // $uibModalInstance.close(obj);

            });
        }
        $scope.DataAddress = function (item) {
            $scope.Address1 = item.Address1;
            $scope.Address2 = item.Address2;
            $scope.ZipCode = item.ZipCode;
            $scope.State = item.State;
            $scope.CountryCode = item.CountryCode;
            $scope.TelNo = item.TelNo;
            $scope.FaxNo = item.FaxNo;
            $scope.MobileNo = item.MobileNo;
            $scope.City = item.City;
            $scope.cin.AddressId = item.AddressId;
            $scope.cin.isAddressOpen = false;
        };

        $scope.approveCancelBtn = 'Approve';
        //    $scope.cin.IsApproved = false;
        $scope.ApproveCancelCustomerDetails = function () {
            
            if ($scope.approveCancelBtn == 'Approve') {
                $scope.isApproval = true;

                
                $scope.approveCancelBtn = 'Disapprove';
            } else {
                $scope.isApproval = false;
                $scope.approveCancelBtn = 'Approve';

            }
            $scope.ApprovecustomercashbillDetails($scope.isApproval);
        };

        $scope.ApprovecustomercashbillDetails = function (isApproval) {
            CustomerInvoiceService.ApproveCancelInvoice($scope.cin.InvoiceNo, isApproval)
                .then(function (d) {
                    
                    if (isApproval) {
                        $scope.cin = d.data.invoiceHeader;
                        $scope.DataAddress(d.data.address);
                        MerchantProfileService.GetMerchant(d.data.invoiceHeader.CustomerCode).then(function (d) {
                            $scope.Details = d.data.AddressList;
                            $scope.IsInvoiceApproved = true;
                            //$scope.approveCancelBtn = 'Disapprove';
                            $scope.cin.IsCancel = true;
                            $scope.ValidateInputDecimal();
                        }, function (err) { });
                    } else {
                        $state.go('customerinvoices', { 'Invoiceno': '' });
                    }
                    if (isApproval)
                        growlService.growl($scope.cin.InvoiceNo + '  Approved Successfully..', 'success');
                    else {
                        growlService.growl($scope.cin.InvoiceNo + '  Cancelled Successfully..', 'danger');
                    }
                },
                function (err) {

                });
        };
        $scope.ValidateDates = function () {
            if (!angular.isUndefined($scope.cin.InvoiceDate) && $scope.cin.InvoiceDate != null) {
                if ($scope.cin.InvoiceDate == null) {
                    $scope.cin.InvoiceDate = undefined;
                }
                else
                    $scope.cin.InvoiceDate = moment($scope.cin.InvoiceDate);
            }
        }
        $scope.ValidateInputDecimal = function () {
            $timeout(function () {
                if ($scope.frmCustomerInfo.TaxAmount.$viewValue != null) {
                    $scope.frmCustomerInfo.TaxAmount.$$runValidators($scope.frmCustomerInfo.TaxAmount.$modalValue, $scope.frmCustomerInfo.TaxAmount.$viewValue, function () {
                        $scope.frmCustomerInfo.TaxAmount.$setViewValue($scope.frmCustomerInfo.TaxAmount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmCustomerInfo.TotalAmount.$viewValue != null) {
                    $scope.frmCustomerInfo.TotalAmount.$$runValidators($scope.frmCustomerInfo.TotalAmount.$modalValue, $scope.frmCustomerInfo.TotalAmount.$viewValue, function () {
                        $scope.frmCustomerInfo.TotalAmount.$setViewValue($scope.frmCustomerInfo.TotalAmount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
            }, 200);
        }
        $scope.init();
    }]);
//customerinvoices.js