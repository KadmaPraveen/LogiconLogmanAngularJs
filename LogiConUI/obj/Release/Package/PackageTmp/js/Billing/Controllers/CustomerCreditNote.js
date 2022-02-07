angular.module('LogiCon').controller('CustomerCreditNoteCntrl', ['$scope', '$uibModal', 'Utility', 'UtilityFunc', 'ActivityService', 'CustomerCreditNoteService', 'limitToFilter', 'LookUpService', 'growlService', 'NgTableParams', '$stateParams',
    function ($scope, $uibModal, Utility, UtilityFunc, ActivityService, CustomerCreditNoteService, limitToFilter, LookUpService, growlService, NgTableParams, $stateParams) {
        
        $scope.CreditNoteNo = $stateParams.CreditNoteNo;
        $scope.init = function () {
            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.GetModules();
            // $scope.GetLookUpData();
            $scope.hdrChkEnabled = false;
            $scope.hdrCostSheet = false;
            $scope.saveCheck = false;

        }

        $scope.lookUpData = {};
        $scope.Cn = {
            customerCreditNoteHeader: {},
            customerCreditNoteDetail: new Array()
        };
        $scope.CreditList = new Array();
        /* lookup data*/
        $scope.GetLookUpData = function () {
            LookUpService.GetCurrencyList().then(function (d) {
                $scope.lookUpData.currencyList = d.data.currencyList;
            }, function (err) {
            });
        };

        $scope.InvoiceResults = function (text) {
           
            return CustomerCreditNoteService.InvoiceResults(text).then(function (res) {
                return limitToFilter(res.data, 15);
            }, function (err) { });
        };

        $scope.InvoiceNoSelected = function (item) {
            $scope.InvoiceNo = item.InvoiceNo;
            CustomerCreditNoteService.GetCreditListByInvoiceNo(item.InvoiceNo).then(function (d) {
                
                if (d.data != null) {
                    $scope.Cn.customerCreditNoteHeader = d.data;
                    $scope.CreditList = d.data.invoiceDetailList;
                }

                //for (var i = 0; i < $scope.Cn.customerCreditNoteDetail.length; i++) {
                //    if ($scope.Cn.customerCreditNoteDetail[i].Status) {
                //        $scope.hdrChkEnabled = true;
                //        break;
                //    }
                //}
            }, function (err) { });

        };

        $scope.GetModules = function () {
            ActivityService.GetModules().then(function (d) {
                $scope.modules = d.data;
            }, function (err) { });
        };

        $scope.toggleCreditNote = function () {
         
            var count = 0;
            $scope.hdrCostSheet = !$scope.hdrCostSheet;
            angular.forEach($scope.CreditList, function (item, index) {
                item.chk = $scope.hdrCostSheet;
                if (item.chk)
                    count++;

            });
            if (count > 0)
                $scope.saveCheck = true;
            else
                $scope.saveCheck = false;
        };
        $scope.onChanged = function () {
           
            var count = 0;
            angular.forEach($scope.CreditList, function (item, index) {
                if (item.chk) {
                    count++;
                }

            });
            if (count > 0)
                $scope.saveCheck = true;
            else
                $scope.saveCheck = false;
        };

        $scope.isCreditNoteValid = false;
        $scope.$watch('frmCredit.$valid', function (valid) {
            $scope.isCreditNoteValid = valid;
        });

        $scope.SaveCreditNote = function () {
            if ($scope.isCreditNoteValid) {
                $scope.Cn.customerCreditNoteDetail = new Array();
                angular.forEach($scope.CreditList, function (item, index) {
                    if (item.chk) {

                        var Obj = {};
                        Obj.ChargeCode = item.ChargeCode;
                        Obj.BaseAmount = item.ActualAmount;
                        Obj.TaxAmount = item.TaxAmount;
                        Obj.UnitPrice = item.Price;
                        Obj.Quantity = item.Qty;
                        Obj.CreditNoteNo = '';
                        Obj.ContainerKey = item.ContainerKey;
                        Obj.InvoiceNo = item.InvoiceNo;
                        Obj.ContainerNo = item.ActualAmount;
                        Obj.OrderNo = item.OrderNo;
                        Obj.JobNo = item.JobNo;
                        Obj.Remarks = item.Remark
                        Obj.BillingUnit = item.BillingUnit;
                        Obj.GstCode = item.InputGSTCode;

                        console.log(item);
                        $scope.Cn.customerCreditNoteDetail.push(Obj);
                        console.log($scope.Cn.customerCreditNoteDetail);
                    }
                });
                CustomerCreditNoteService.SaveCreditList($scope.Cn).then(function (d) {
                    growlService.growl('Saved successfully...!', 'success');
                }, function (err) { });
            } else {
                var error = $scope.frmCredit.$error;
                angular.forEach(error.required, function (field) {
                    if (field.$invalid) {
                        var fieldName = field.$name;
                    }
                });
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };

        $scope.AddCustomerCreditNote = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Billing/Templates/CustomerCreditNote/add-customercreditnote.html?v=' + Utility.Version,
                controller: 'addCustomerCreditNoteCntrl',
                //size: 'lg',
                windowClass: 'app-modal-window'
            });

            modalInstance.result.then(function () {

            }, function () {

            });
        };


        if ($scope.CreditNoteNo != 'NEW' && $scope.CreditNoteNo != "" &&$scope.CreditNoteNo != null) {
            
            CustomerCreditNoteService.EditCreditNote($scope.CreditNoteNo).then(function (d) {
               
                if (d.data != null) {
                    $scope.Cn = d.data;
                    $scope.CreditList = d.data.customerCreditNoteDetail;
                }
            }, function (err) { });
        }
        $scope.init();
    }]);

angular.module('LogiCon').controller('addCustomerCreditNoteCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);