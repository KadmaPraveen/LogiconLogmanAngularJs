
/* containers : Maruthi */
angular.module('LogiCon').controller('AddOrEditK8Container', ['$scope', '$uibModalInstance', 'OrderEntryService', 'dataObj', 'growlService', 'k8Service', '$window', 'UtilityFunc',
    function ($scope, $uibModalInstance, OrderEntryService, dataObj, growlService, k8Service, $window, UtilityFunc) {

        $scope.init = function () {
            $scope.dc = {
                BranchID: null,
                DeclarationNo: null,
                OrderNo: null,
                ContainerKey: null,
                ContainerNo: null,
                IsSOC: null,
                Size: null,
                Type: null,
                ContainerStatus: null,
                EQDStatus: null,
                MarksNos: null,
                IsActive: null,
                CreatedBy: null,
                CreatedOn: null,
                ModifiedBy: null,
                ModifiedOn: null,
            };
        }
        $scope.init();
        $scope.SOCChecked = function () {

            $scope.frmContainerInfo.ContainerNo.$$runValidators($scope.frmContainerInfo.ContainerNo.$modalValue, $scope.frmContainerInfo.ContainerNo.$viewValue, function () {
                $scope.dc.ContainerNo = $scope.frmContainerInfo.ContainerNo.$viewValue;
            });
        };
        $scope.ISO6346Check = function (con) {
            if (!con || con == "" || con.length != 11) { return false; }
            con = con.toUpperCase();
            var re = /^[A-Z]{4}\d{7}/;
            if (re.test(con)) {
                var sum = 0;
                for (i = 0; i < 10; i++) {
                    var n = con.substr(i, 1);
                    if (i < 4) {
                        n = "0123456789A?BCDEFGHIJK?LMNOPQRSTU?VWXYZ".indexOf(con.substr(i, 1));
                    }
                    n *= Math.pow(2, i); //2的i次方
                    sum += n;
                }
                if (con.substr(0, 4) == "HLCU") {
                    sum -= 2;
                }
                sum %= 11;
                sum %= 10; //余数为10的取0
                return sum == con.substr(10);
            } else {
                return false; //不匹配正则表达式   
            }
        };

        $scope.ValidateContainerBlur = function (con) {

            var isValid = $scope.ISO6346Check(con);
            $scope.IsContainerValid = isValid;

            return isValid;
        };

        $scope.ValidateContainerPattern = (function () {
            return {
                test: function (con) {
                    if ($scope.dc.IsSOC)
                        return true;
                    var isValid = $scope.ISO6346Check(con);
                    $scope.IsContainerValid = isValid;
                    return isValid;
                }
            };
        })();

        $scope.checkContainerType = function () {
            if (!$scope.IsContainerValid && !$scope.dc.IsSOC) {
                var r = $window.confirm('Is container of SOC Type ?');
                if (r) {
                    $scope.dc.IsSOC = true;
                } else {
                    $scope.dc.IsSOC = false;
                }
            }
        };

        $scope.dc = angular.copy(dataObj.dc);
        
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.lookUpData = {
            sizeList: dataObj.sizeList,
            jobTypeList: UtilityFunc.removeArrayElementByKey(dataObj.jobTypeList, 'Value', 1062),
            containerStatusList: dataObj.containerStatusList
        };

        $scope.sizeChanged = function () {

            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
                $scope.showLoading = false;
            }, function () { })
        };

        $scope.isFrmContainerInfoValid = false;
        $scope.$watch('frmContainerInfo.$valid', function (isValid) {
            $scope.isFrmContainerInfoValid = isValid;
        });
        $scope.SaveContainerInfo = function (dc) {

            if ($scope.isFrmContainerInfoValid) {
                $uibModalInstance.close(dc);
            } else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }

        }

        if (!angular.isUndefined($scope.dc.Size) && $scope.dc.Size != null) {
            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
                $scope.showLoading = false;
            }, function () { })
        }

       // $scope.init();
    }]);
/* containers */