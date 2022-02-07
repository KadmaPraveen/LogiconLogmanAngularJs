
angular.module('LogiCon').controller('addEditGenerateReceiptCntrl', ['$scope', '$uibModalInstance', 'ChargeCodeService', 'MerchantProfileService', 'limitToFilter', 'customerInvoiceItemObj', 'CustomerInvoiceService',
                                      function ($scope, $uibModalInstance, ChargeCodeService, MerchantProfileService, limitToFilter, customerInvoiceItemObj, CustomerInvoiceService) {

    $scope.ci = {};

    if (customerInvoiceItemObj.customerInvoiceItem != "") {

        $scope.ci = customerInvoiceItemObj.customerInvoiceItem;

    } else {
        //$scope.ci = customerInvoiceItemObj.customerInvoiceItem;
    }

    if (customerInvoiceItemObj.currencyCode != "") {

        $scope.ci.CurrencyCode = customerInvoiceItemObj.currencyCode;
    }



    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    var taxRate = 0;
    var excRate = 0;

    //$scope.ci = customerInvoiceItemObj.customerInvoiceItem;

    $scope.SaveCustomerInvoice = function (ci) {

        $uibModalInstance.close(ci);
    };

    //$scope.GetLookupData();

    $scope.GetLookupData = function () {

        CustomerInvoiceService.GetLookupData().then(function (d) {
            $scope.lookupData = d.data;
        }, function (err) {

        });
    };

    $scope.ChargeCodeResults = function (text) {
        return ChargeCodeService.GetChargeCodeSearch(text).then(function (d) {
            return limitToFilter(d.data);
        }, function (err) { });
    };


    $scope.ChargeCodeSelected = function (item, type) {

        if (type == 'ChargeCode') {
            ChargeCodeService.GetGSTValues(item.Value).then(function (d) {
                $scope.ci.OutPutGSTDescription = d.data.outputGSTCodeDetails[0].GSTCodeDescription;
                $scope.ci.InPutGSTDescription = d.data.inputGSTCodeDetails[0].GSTCodeDescription;
                taxRate = parseFloat(d.data.taxRate);


            }, function (err) { });
        }
    };

    $scope.SelectCurrencyCode = function (curCode) {
        CustomerInvoiceService.GetExchangeRate(curCode).then(function (d) {
            excRate = d.data;
            //$scope.lookupData = d.data;
            $scope.CaliculateAmounts();
        }, function (err) { });
    }




    $scope.CaliculateAmounts = function () {
        if ($scope.ci.Price != null && $scope.ci.Qty != "") {
            $scope.ci.TaxAmount = ($scope.ci.Price * $scope.ci.Qty * (taxRate / 100)).toFixed(2);
            $scope.ci.ExRate = ($scope.ci.Price * $scope.ci.Qty * excRate).toFixed(2);
            $scope.ci.LocalAmount = ($scope.ci.Price * $scope.ci.Qty).toFixed(2);
            $scope.ci.TotalAmount = ($scope.ci.Price * $scope.ci.Qty) + ($scope.ci.Price * $scope.ci.Qty * (taxRate / 100));
        }
    }



    $scope.GetLookupData();
                                      }]);