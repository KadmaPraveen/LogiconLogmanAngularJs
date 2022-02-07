angular.module('LogiCon').controller('CostSheetController', ['$scope', '$uibModal', 'CostSheetService', '$stateParams', 'DataTransferService', '$location', 'Utility', 'limitToFilter', '$http', 'UtilityFunc', '$state', 'growlService', '$window', '$stateParams',
    function ($scope, $uibModal, CostSheetService, $stateParams, DataTransferService, $location, Utility, limitToFilter, $http, UtilityFunc, $state, growlService, $window, $stateParams) {
        debugger;
        var orderNo = $stateParams.orderno;
        $scope.cs = {
            OrderNo: orderNo
        };
        debugger;
        if (orderNo == null) {
            $scope.orderNo = '';
        }
        else {
            
            $scope.orderNo = orderNo;
        }
        CostSheetService.GetCostSheetListByOrderNo(orderNo).then(function (d) {
            
                        if (d.data.costSheetList.length > 0)
                            $scope.IsCostSheetSaved = true;

                        $scope.costSheetList = d.data.costSheetList;
                        $scope.orderHeaderDetails = d.data.orderHeaderObj;
                        $scope.orderHeaderDetails.Billable = 'Billable';


                        for (var i = 0; i < $scope.costSheetList.length; i++) {
                            if ($scope.costSheetList[i].Status) {
                                $scope.hdrChkEnabled = true;
                                break;
                            }
                        }
                    }, function (err) { })
                

        //CostSheetService.GetCostSheetListByOrderNo(orderNo).then(function () { }, function (err) { });
        $scope.IsCostSheetSaved = false;
        $scope.tabs = [
            { title: 'Details', content: 'Js/Billing/Templates/CostSheet/details.html?v=' + Utility.Version, active: false, disabled: false },
        ];
        $scope.chkArr = {};
        $scope.isChecked = true;
        var costSheetIndex = -1;
        //$scope.orderNo = '';
       

        $scope.CostSheetDetails = function (index) {
            costSheetIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Billing/Templates/CostSheet/add-cost-sheet.html?v=' + Utility.Version,
                controller: 'addEditCostSheetCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            costSheetItem: (costSheetIndex != -1 ? $scope.costSheetList[costSheetIndex] : { OrderNo: $scope.orderNo }),
                            costSheetList: $scope.costSheetList,
                            jobType: $scope.orderHeaderDetails.JobType

                        }
                    }
                }
            });
            debugger;

            modalInstance.result.then(function (cs) {
                debugger;
                if (costSheetIndex == -1) {
                    if ($scope.costSheetList != null) {
                        $scope.costSheetList.push(cs);
                    }
                    else {
                        $scope.costSheetList = new Array();
                        $scope.costSheetList.push(cs);
                    }
                }
                else {
                    $scope.costSheetList[costSheetIndex] = cs;
                }
                $scope.SaveCostSheet();
                //$scope.orderNoSelected(item);
                for (var i = 0; i < $scope.costSheetList.length; i++) {
                    if ($scope.costSheetList[i].Status) {
                        $scope.hdrChkEnabled = true;
                        break;
                    }
                }

            }, function () {

            });
        };

        $scope.costSheetList = new Array();
        $scope.saveCheck = true;
        $scope.hdrCostSheet = false;
        $scope.checkEnable = false;

        $scope.toggleCostSheet = function () {
            $scope.hdrCostSheet = !$scope.hdrCostSheet;
            angular.forEach($scope.costSheetList, function (item, index) {
                if (item.Status) {
                    debugger;
                    item.chk = $scope.hdrCostSheet;
                    $scope.saveCheck = false;
                    if (item.chk) {
                        $scope.checkEnable = true;
                    }
                    else {
                        $scope.checkEnable = false;
                    }
                }

            });
            debugger;
            //angular.forEach($scope.costSheetList, function (item, index) {
            //    if (!item.chk) {
            //        debugger;
            //        $scope.checkEnable = false;
            //    }

            //});
        };


        $scope.DeleteCostSheet = function (index) {
            $scope.costSheetList = UtilityFunc.removeArrayElementByKey($scope.costSheetList, 'Index', index);
        };

        $scope.CloneCostSheet = function () {
            var tempArray = new Array();
            debugger;
            angular.forEach($scope.costSheetList, function (item, index) {
                if (item.chk) {
                    debugger;
                    tempArray.push(index);
                }
            });

            angular.forEach(tempArray, function (item, index) {
                var tempObj = {};
                angular.copy($scope.costSheetList[item], tempObj);
                $scope.costSheetList.push(tempObj);
            });

            angular.forEach($scope.costSheetList, function (item, index) {
                item.Index = index;
                item.chk = false;
            });
        };

        $scope.RemoveCostSheet = function () {
            var tempArray = new Array();
            angular.forEach($scope.costSheetList, function (item, index) {
                if (item.chk) {

                    tempArray.push(index);
                }
            });

            angular.forEach(tempArray, function (item, index) {
                $scope.costSheetList = UtilityFunc.removeArrayElementByKey($scope.costSheetList, 'Index', item);
            });

            angular.forEach($scope.costSheetList, function (item, index) {
                item.Index = index;
                item.chk = false;
            });
        };


        $scope.AddOtherContainers = function () {
            var chargeCode = null;
            angular.forEach($scope.costSheetList, function (item, index) {
                if (item.chk) {
                    chargeCode = item.ChargeCodeDesc;
                }
            });

            angular.forEach($scope.costSheetList, function (item, index) {
                item.ChargeCodeDesc = chargeCode;
            });
        }

        $scope.ChangeCreditTerm = function () {

        }

        $scope.ChangeSellingRate = function () {
            var sellingPrice = 0;

            angular.forEach($scope.costSheetList, function (item, index) {
                if (item.chk) {
                    sellingPrice = item.Price;
                }
            });

            angular.forEach($scope.costSheetList, function (item, index) {
                item.Price = sellingPrice;
            });
        }


        $scope.ExistingCustometInvoice = function () {
            debugger;

            var tempArray = new Array();
            angular.forEach($scope.costSheetList, function (item, index) {
                debugger;
                if (item.chk) {
                    var _item = angular.copy(item);
                    tempArray.push(_item);
                }
            });
            var obj = {
                costSheetList: tempArray,
                orderDetails: $scope.orderHeaderDetails
            };

            //DataTransferService.SetData(tempArray);
            sessionStorage.setItem('SSN_COSTSHEET_DETAILS', JSON.stringify(obj));
            $state.go('customerinvoiced');
            //$window.parent.MainModuleFunction(obj, 'customerinvoiced', 'Customer Invoice');
        }
        $scope.ExistingCustomerCashBill = function () {
            debugger;
            var tempArray = new Array();
            angular.forEach($scope.costSheetList, function (item, index) {
                if (item.chk) {
                    var _item = angular.copy(item);
                    tempArray.push(_item);
                }
            });
            var obj = {
                costSheetList: tempArray,
                orderDetails: $scope.orderHeaderDetails
            };

            //DataTransferService.SetData(tempArray);
            sessionStorage.setItem('SSN_COSTSHEET_DETAILS', JSON.stringify(obj));
            $state.go('customercashbill');
        }


        //$scope.isCostSheetValid = false;
        //$scope.$watch('frmCostsheet.$valid', function (valid) {
        //    $scope.isCostSheetValid = valid;
        //});
        $scope.SaveCostSheet = function () {
            $scope.submitted = true;

            CostSheetService.SaveCostSheet($scope.costSheetList).then(function (d) {
                $scope.IsCostSheetSaved = true;
                growlService.growl('Saved successfully...!', 'success');
            }, function (err) {

            });
        };

        $scope.NewCustomerInvoice = function (chkArr) {
            var arr = Object.keys(chkArr);
            var jsonArray = new Array();
            for (var i = 0; i < arr.length; i++) {
                if (chkArr[arr[i]]) {
                    jsonArray.push(arr[i]);
                }
            }

            DataTransferService.SetData(jsonArray);
            $location.path('/billing/customercashbill');
        };

        $scope.isChecked = function () {

            var chkArr = $scope.chkArr;
            var arr = Object.keys(chkArr);
            var flag = true;
            for (var i = 0; i < arr.length; i++) {
                if (chkArr[arr[i]]) {
                    flag = false;
                    break;
                }
            }
            return flag;
        }

        $scope.MerchantResults = function ($query) {
            return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + $query + '/billingCustomer').then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };

        $scope.CustomerSelected = function (item, type) {
            $scope.orderHeaderDetails[type] = item.Value;
        };


        $scope.OrderResults = function (text) {
            return CostSheetService.SearchOrder(text).then(function (res) {
                return limitToFilter(res.data.orderentry, 15);
            }, function (err) { });
        };

        $scope.hdrChkEnabled = false;
        $scope.orderNoSelected = function (item) {
            $scope.orderNo = item.Value;
            CostSheetService.GetCostSheetListByOrderNo(item.Value).then(function (d) {
                if (d.data.costSheetList.length > 0)
                    $scope.IsCostSheetSaved = true;

                $scope.costSheetList = d.data.costSheetList;
                $scope.orderHeaderDetails = d.data.orderHeaderObj;
                $scope.orderHeaderDetails.Billable = 'Billable';


                for (var i = 0; i < $scope.costSheetList.length; i++) {
                    if ($scope.costSheetList[i].Status) {
                        $scope.hdrChkEnabled = true;
                        break;
                    }
                }
            }, function (err) { })
        };

        $scope.onChanged = function (item) {
            debugger;
            if (item) {
                $scope.checkEnable = true;
            }
            else {
                $scope.checkEnable = false;
            }

        }

    }]);

app.service('DataTransferService', ['$http', function ($http) {
    this.Data = [];


    this.SetData = function (data) {
        this.Data = data;
    };

    this.GetData = function () {
        return this.Data;
    }
}]);
//costsheet.js