
angular.module('LogiCon').controller('addEditCustomerCashBillCntrl', ['$scope', '$uibModalInstance', 'CustomerCashBillService', 'ChargeCodeService', 'CustomerInvoiceService', 'limitToFilter', 'customerCashBillItemObj', 'CostSheetService', 'growlService',function ($scope, $uibModalInstance, CustomerCashBillService, ChargeCodeService, CustomerInvoiceService, limitToFilter, customerCashBillItemObj, CostSheetService, growlService) {
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cb = {};
    
    $scope.cb = angular.copy(customerCashBillItemObj);
    //if (customerCashBillItemObj.customerCashBillItem != "") {

       // $scope.cb = customerCashBillItemObj.customerCashBillItem;
        //$scope.cb.OrderNo = $scope.cb.OrderNo;
        //$scope.cb.ContainerNo = $scope.cb.ContainerKey;
        //$scope.cb.ChargeCode = $scope.cb.ChargeCode;
        //$scope.cb.CurrencyCode = $scope.cb.CurrencyCode;
        //$scope.cb.ExRate = $scope.cb.ExRate;

    //} else {
    //    //$scope.ci = customerInvoiceItemObj.customerInvoiceItem;
    //}

    if (customerCashBillItemObj.currencyCode != "") {
       

        $scope.cb.CurrencyCode = customerCashBillItemObj.currencyCode;
    }
    
   
    var taxRate = 0;
    var excRate = 0;

    //$scope.ci = customerInvoiceItemObj.customerInvoiceItem;

    $scope.SaveCustomerCashBill = function (cb) {
        
        $uibModalInstance.close(cb);
    };

   

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
                $scope.cb.OutPutGSTDescription = d.data.outputGSTCodeDetails[0].GSTCodeDescription;
                $scope.cb.InPutGSTDescription = d.data.inputGSTCodeDetails[0].GSTCodeDescription;
                taxRate = parseFloat(d.data.taxRate);


            }, function (err) { });
        }
    };

    $scope.SelectCurrencyCode = function (curCode) {
        CustomerInvoiceService.GetExchangeRate(curCode).then(function (d) {
            excRate = d.data;
            //$scope.lookupData = d.data;
        }, function (err) { });
    }


    $scope.CaliculateAmounts = function () {
        if ($scope.cb.Price != null && $scope.cb.Qty != "") {
            $scope.cb.TaxAmount = ($scope.cb.Price * $scope.cb.Qty * (taxRate / 100)).toFixed(2);
            $scope.cb.ExRate = ($scope.cb.Price * $scope.cb.Qty * excRate).toFixed(2);
            $scope.cb.LocalAmount = ($scope.cb.Price * $scope.cb.Qty).toFixed(2);
            $scope.cb.TotalAmount = ($scope.cb.Price * $scope.cb.Qty) + ($scope.cb.Price * $scope.cb.Qty * (taxRate / 100));
        }
    }


    $scope.OrderResults = function (text) {
        
        return CostSheetService.SearchOrder(text).then(function (res) {
            
            return limitToFilter(res.data.orderentry, 15);
        }, function (err) { });
    };

    $scope.orderNoSelected = function (item) {
        
        $scope.orderNo = item.Value;
    };
   

    $scope.isfrmCustomerCashBill = false;
    $scope.$watch('frmCustomerCashBill.$valid', function (isValid) {
        
        $scope.isfrmCustomerCashBill = isValid;
    });
    



    $scope.savecash = function (cb) {
        
   
            $uibModalInstance.close(cb);

    };
    $scope.GetLookupData();

}]);