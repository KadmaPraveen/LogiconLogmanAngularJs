
angular.module('LogiCon').controller('addEditCustomerInvoiceCntrl', ['$scope', '$uibModalInstance', 'CostSheetService', 'CustomerInvoiceService', 'costSheetItem', 'ChargeCodeService', 'limitToFilter', '$filter',
    function ($scope, $uibModalInstance, CostSheetService, CustomerInvoiceService, costSheetItem, ChargeCodeService, limitToFilter, $filter) {
        var taxRate = 0.0;
        var excRate = 0.0;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
            $scope.isfrmCustomerInvoice = false;
        };

       
        $scope.cs = angular.copy(costSheetItem);

        //$scope.cs.CurrencyCode = 'MYR';
        $scope.isfrmCustomerInvoice = false;
        $scope.$watch('frmCustomerInvoice.$valid', function (isValid) {
            $scope.isfrmCustomerInvoice = isValid;
        });

        $scope.SaveCoseSheet = function (cs) {
            $uibModalInstance.close(cs);
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

        $scope.GetLookupData(costSheetItem.OrderNo);


        $scope.ChargeCodeSelected = function (item, type) {
           
            if (type == 'ChargeCode') {
                ChargeCodeService.GetGSTValues(item.Value).then(function (d) {
                   
                    $scope.cs.OutPutGSTDescription = d.data.outputGSTCodeDetails[0].OutPutGSTCodeDescription;
                    $scope.cs.InPutGSTDescription = d.data.inputGSTCodeDetails[0].InputGSTCodeDescription;

                    $scope.cs.OutputGSTCode = d.data.outputGSTCodeDetails[0].OutPutGSTCode;
                    $scope.cs.InputGSTCode = d.data.inputGSTCodeDetails[0].InputGSTCode;

                    $scope.cs.OutputGSTRate = d.data.outputGSTCodeDetails[0].OutPutInputGSTRate;
                    $scope.cs.InputGSTRate = d.data.inputGSTCodeDetails[0].InputGSTRate;

                    taxRate = parseFloat(d.data.taxRate);
                    $scope.CaliculateAmounts();

                }, function (err) { });
            }
        };

        $scope.SelectCurrencyCode = function () {
            $scope.cs.ExRate = ($filter('filter')($scope.lookupData.currencyList, { Value: $scope.cs.CurrencyCode })[0].ImportRate).toFixed(4);
            $scope.CaliculateAmounts();
        }


        $scope.CaliculateAmounts = function () {
           
            if (($scope.cs.Price != null && $scope.cs.Price != '' && $scope.cs.Price != undefined) && ($scope.cs.Qty != null && $scope.cs.Qty != '' && $scope.cs.Qty != undefined)) {
                $scope.cs.TaxAmount = ($scope.cs.Price * $scope.cs.Qty * (taxRate / 100)).toFixed(2);
                //$scope.cs.ExRate = ($scope.cs.Price * $scope.cs.Qty * excRate).toFixed(2);
                $scope.cs.LocalAmount = ($scope.cs.Price * $scope.cs.Qty).toFixed(2);
                $scope.cs.TotalAmount = ($scope.cs.Price * $scope.cs.Qty) + ($scope.cs.Price * $scope.cs.Qty * (taxRate / 100));
                $scope.cs.ActualAmount = ($scope.cs.Price * $scope.cs.Qty) + ($scope.cs.Price * $scope.cs.Qty * (taxRate / 100));
                $scope.CalDiscountAmt();
            }
        }

        $scope.CalDiscountAmt = function () {
            if (($scope.cs.DiscountType != "" && $scope.cs.DiscountType != null && $scope.cs.DiscountType != undefined) && ($scope.cs.DiscountAmount != '' && $scope.cs.DiscountAmount != null && $scope.cs.DiscountAmount != undefined)) {
                var disAmount = 0.0;
               
                if ($scope.cs.DiscountType == "1170") {
                    disAmount = parseFloat($scope.cs.DiscountAmount);
                    $scope.cs.TotalAmount = ($scope.cs.Price * $scope.cs.Qty) + ($scope.cs.Price * $scope.cs.Qty * (taxRate / 100)) - disAmount;
                    $scope.cs.ActualAmount = ($scope.cs.Price * $scope.cs.Qty) + ($scope.cs.Price * $scope.cs.Qty * (taxRate / 100)) - disAmount;
                } else {
                    var disAmount = parseFloat($scope.cs.Price * $scope.cs.Qty * ($scope.cs.DiscountAmount / 100));
                    $scope.cs.TotalAmount = ($scope.cs.Price * $scope.cs.Qty) + ($scope.cs.Price * $scope.cs.Qty * (taxRate / 100)) - disAmount;
                    $scope.cs.ActualAmount = ($scope.cs.Price * $scope.cs.Qty) + ($scope.cs.Price * $scope.cs.Qty * (taxRate / 100)) - disAmount;
                }
            }
        }
    }]);