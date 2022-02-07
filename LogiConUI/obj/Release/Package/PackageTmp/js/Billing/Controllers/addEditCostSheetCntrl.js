angular.module('LogiCon').controller('addEditCostSheetCntrl', ['$scope', '$uibModalInstance', 'CostSheetService', 'CustomerInvoiceService', 'dataObj', 'ChargeCodeService', 'limitToFilter', '$filter', 'growlService', 'UtilityFunc', '$timeout',
    function ($scope, $uibModalInstance, CostSheetService, CustomerInvoiceService, dataObj, ChargeCodeService, limitToFilter, $filter, growlService, UtilityFunc, $timeout) {
        $scope.ValidateInputDecimal = function () {
            $timeout(function () {
                debugger;
                if ($scope.frmCostsheet.PriceAmount.$viewValue != null) {
                    $scope.frmCostsheet.PriceAmount.$$runValidators($scope.frmCostsheet.PriceAmount.$modalValue, $scope.frmCostsheet.PriceAmount.$viewValue, function () {
                        $scope.frmCostsheet.PriceAmount.$setViewValue($scope.frmCostsheet.PriceAmount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                //if ($scope.frmCostsheet.DiscountRates.$viewValue != null) {
                //    $scope.frmCostsheet.DiscountRates.$$runValidators($scope.frmCostsheet.DiscountRates.$modalValue, $scope.frmCostsheet.DiscountRates.$viewValue, function () {
                //        $scope.frmCostsheet.DiscountRates.$setViewValue($scope.frmCostsheet.DiscountRates.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                //    });
                //}
                if ($scope.frmCostsheet.Quantity.$viewValue != null) {
                    $scope.frmCostsheet.Quantity.$$runValidators($scope.frmCostsheet.Quantity.$modalValue, $scope.frmCostsheet.Quantity.$viewValue, function () {
                        $scope.frmCostsheet.Quantity.$setViewValue($scope.frmCostsheet.Quantity.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                } debugger;
                if ($scope.frmCostsheet.DiscountAmount.$viewValue != null) {
                    $scope.frmCostsheet.DiscountAmount.$$runValidators($scope.frmCostsheet.DiscountAmount.$modalValue, $scope.frmCostsheet.DiscountAmount.$viewValue, function () {
                        $scope.frmCostsheet.DiscountAmount.$setViewValue($scope.frmCostsheet.DiscountAmount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }

                if ($scope.frmCostsheet.TotalAmount.$viewValue != null) {
                    $scope.frmCostsheet.TotalAmount.$$runValidators($scope.frmCostsheet.TotalAmount.$modalValue, $scope.frmCostsheet.TotalAmount.$viewValue, function () {
                        $scope.frmCostsheet.TotalAmount.$setViewValue($scope.frmCostsheet.TotalAmount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
            }, 100);
        }
        $scope.init = function () {

        };
        $scope.taxRate = 0.0;
        //var excRate = 0.0;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            $scope.isfrmCustomerInvoice = false;
        };

        $scope.cs = angular.copy(dataObj.costSheetItem);
        $scope.jobType = dataObj.jobType;
        $scope.costSheetList = dataObj.costSheetList;

        if ($scope.cs != null && $scope.cs.ChargeCode != null && $scope.cs.ChargeCode != '') {
            ChargeCodeService.GetGSTValues($scope.cs.ChargeCode).then(function (d) {
                $scope.cs.OutPutGSTDescription = d.data.outputGSTCodeDetails[0].OutPutGSTCodeDescription;
                $scope.cs.InPutGSTDescription = d.data.inputGSTCodeDetails[0].InputGSTCodeDescription;

                $scope.cs.OutputGSTCode = d.data.outputGSTCodeDetails[0].OutPutGSTCode;
                $scope.cs.InputGSTCode = d.data.inputGSTCodeDetails[0].InputGSTCode;

                $scope.cs.OutputGSTRate = d.data.outputGSTCodeDetails[0].OutPutInputGSTRate;
                $scope.cs.InputGSTRate = d.data.inputGSTCodeDetails[0].InputGSTRate;

                $scope.taxRate = parseFloat(d.data.taxRate);
                $scope.CaliculateAmounts();

            }, function (err) { });
        }



        if ($scope.cs.BranchID == undefined) {
            $scope.cs.CurrencyCode = 'MYR';
            $scope.cs.ExRate = '1.0000';
        }

        $scope.isfrmCostsheet = false;
        $scope.$watch('frmCostsheet.$valid', function (isValid) {
            debugger;
            $scope.isfrmCostsheet = isValid;
        });

        $scope.SaveCoseSheet = function (cs) {
            //$scope.ValidateInputDecimal();
            $scope.cs.Status = true;
            $scope.cs.BranchID = UtilityFunc.BranchID;
            $scope.cs.Price = parseFloat($scope.cs.Price);
            $scope.cs.Qty = parseFloat($scope.cs.Qty);
            debugger;
            if ($scope.isfrmCostsheet) {
                $uibModalInstance.close(cs);
            }
            else {
                growlService.growl('please enter all mandatory fields', 'danger');
            }
        };

        $scope.GetLookupData = function (OrderNo) {
            CostSheetService.GetLookupData(OrderNo).then(function (d) {
                $scope.lookupData = d.data;
            }, function (err) {

            });
        };

        $scope.ChargeCodeResults = function (text) {
            return ChargeCodeService.GetChargeCodeSearch(text).then(function (d) {
                return limitToFilter(d.data);
            }, function (err) { });
        };

        $scope.GetLookupData(dataObj.costSheetItem.OrderNo);

        var validateChargeCode = false;
        $scope.ChargeCodeExistsInList = function (ChargeCode) {
            validateChargeCode = true;
            angular.forEach($scope.costSheetList, function (item, index) {

                if (item.ChargeCode == ChargeCode && item.ContainerKey == $scope.cs.ContainerKey) {
                    validateChargeCode = false;
                }
            });
            return validateChargeCode;
        };

        $scope.ContainerKeySelected = function () {
            if (!$scope.ChargeCodeExistsInList($scope.cs.ChargeCode)) {
                growlService.growl('Data exists with same Charge Code and Container Key.', 'danger');
                $scope.cs.ChargeCode = '';
                $scope.cs.ChargeCodeDescription = '';
                $scope.taxRate = '';

                $scope.cs.OutPutGSTDescription = '';
                $scope.cs.InPutGSTDescription = '';

                $scope.cs.OutputGSTCode = '';
                $scope.cs.InputGSTCode = '';

                $scope.cs.OutputGSTRate = '';
                $scope.cs.InputGSTRate = '';

                $scope.cs.ForeignAmount = '';
                $scope.cs.LocalAmount = '';
                $scope.cs.TaxAmount = '';
                $scope.cs.ActualAmount = '';
                $scope.cs.TotalAmount = '';

                $scope.cs.DiscountType = '';
                $scope.cs.DiscountRate = '';
                $scope.cs.DiscountAmount = '';
                $scope.cs.Price = '';
                $scope.cs.Qty = '';
            }
        };

        $scope.ChargeCodeSelected = function (item, type) {
            debugger;
            $scope.cs.ChargeCode = item.Value;
            $scope.cs.ChargeCodeDescription = item.Text;
            if ($scope.ChargeCodeExistsInList($scope.cs.ChargeCode)) {
                if (type == 'ChargeCode') {
                    ChargeCodeService.GetGSTValues(item.Value).then(function (d) {
                        $scope.cs.OutPutGSTDescription = d.data.outputGSTCodeDetails[0].OutPutGSTCodeDescription;
                        $scope.cs.InPutGSTDescription = d.data.inputGSTCodeDetails[0].InputGSTCodeDescription;

                        $scope.cs.OutputGSTCode = d.data.outputGSTCodeDetails[0].OutPutGSTCode;
                        $scope.cs.InputGSTCode = d.data.inputGSTCodeDetails[0].InputGSTCode;

                        $scope.cs.OutputGSTRate = d.data.outputGSTCodeDetails[0].OutPutInputGSTRate;
                        $scope.cs.InputGSTRate = d.data.inputGSTCodeDetails[0].InputGSTRate;

                        $scope.taxRate = parseFloat(d.data.taxRate);
                        $scope.CaliculateAmounts();
                    }, function (err) { });
                }
            }
            else {
                growlService.growl('Data exists with same Charge Code and Container Key.', 'danger');
                $scope.cs.ChargeCode = '';
                $scope.cs.ChargeCodeDescription = '';
                $scope.taxRate = '';

                $scope.cs.OutPutGSTDescription = '';
                $scope.cs.InPutGSTDescription = '';

                $scope.cs.OutputGSTCode = '';
                $scope.cs.InputGSTCode = '';

                $scope.cs.OutputGSTRate = '';
                $scope.cs.InputGSTRate = '';

                $scope.cs.ForeignAmount = '';
                $scope.cs.LocalAmount = '';
                $scope.cs.TaxAmount = '';
                $scope.cs.ActualAmount = '';
                $scope.cs.TotalAmount = '';

                $scope.cs.DiscountType = '';
                $scope.cs.DiscountRate = '';
                $scope.cs.DiscountAmount = '';
                $scope.cs.Price = '';
                $scope.cs.Qty = '';
            }
        };

        $scope.ValidatePercentage = function () {
            debugger;
            if ($scope.cs.DiscountRate <= 100) {
                $scope.cs.DiscountAmount = parseFloat($scope.cs.LocalAmount * ($scope.cs.DiscountRate / 100));
                //$scope.CaliculateAmounts();
                var disAmount = $scope.cs.DiscountAmount;
                $scope.cs.TotalAmount = $scope.cs.ActualAmount - disAmount;

            }
            else {
                $scope.cs.DiscountRate = '';
                growlService.growl('Discount Percentage Rate cannot exceed 100', 'danger');
            }
        }

        $scope.SelectCurrencyCode = function () {

            //$scope.ChargeCodeSelected($scope.csitem,$scope.cs.type);
            if ($scope.jobType == 1060)
                $scope.cs.ExRate = ($filter('filter')($scope.lookupData.currencyList, { Value: $scope.cs.CurrencyCode })[0].ImportRate).toFixed(4);
            else
                $scope.cs.ExRate = ($filter('filter')($scope.lookupData.currencyList, { Value: $scope.cs.CurrencyCode })[0].ImportRate).toFixed(4);
            $scope.CaliculateAmounts();

        }

        $scope.CaliculateAmounts = function () {
            if (($scope.cs.Price != null && $scope.cs.Price != '' && $scope.cs.Price != undefined) && ($scope.cs.Qty != null && $scope.cs.Qty != '' && $scope.cs.Qty != undefined)) {
                debugger;
                $scope.cs.ForeignAmount = parseFloat($scope.cs.Price * $scope.cs.Qty).toFixed(2);
                $scope.cs.LocalAmount = ($scope.cs.ForeignAmount * $scope.cs.ExRate).toFixed(2);
                $scope.cs.TaxAmount = ($scope.cs.LocalAmount * ($scope.taxRate / 100)).toFixed(2);
                $scope.cs.ActualAmount = parseFloat($scope.cs.LocalAmount) + parseFloat($scope.cs.LocalAmount * ($scope.taxRate / 100));
                $scope.cs.TotalAmount = parseFloat($scope.cs.LocalAmount) + parseFloat($scope.cs.LocalAmount * ($scope.taxRate / 100));
                $scope.CalDiscountAmt();
                // $scope.ValidateInputDecimal();
            }
        }

        $scope.CalDiscountAmt = function () {
            if (($scope.cs.DiscountType != "" && $scope.cs.DiscountType != null && $scope.cs.DiscountType != undefined) && ($scope.cs.DiscountAmount != '' && $scope.cs.DiscountAmount != null && $scope.cs.DiscountAmount != undefined)) {
                var disAmount = 0.0;
                debugger;
                if ($scope.cs.DiscountType == "1170") {
                    $scope.cs.DiscountRate = '';
                    $scope.cs.DiscountAmount = '';
                    disAmount = parseFloat($scope.cs.DiscountAmount);
                    $scope.cs.TotalAmount = $scope.cs.ActualAmount;
                } else {
                    var disAmount = $scope.cs.DiscountAmount;
                    $scope.cs.TotalAmount = $scope.cs.ActualAmount - disAmount;
                    //$scope.cs.DiscountAmount = '';
                }

            }
        }


        $scope.init();
        $scope.ValidateInputDecimal();
    }]);