angular.module('LogiCon').controller('AddOrderEntryContainer', ['$scope', 'OrderEntryService', '$uibModalInstance', 'dataObj', 'growlService', 'UtilityFunc',
    function ($scope, OrderEntryService, $uibModalInstance, dataObj, growlService, UtilityFunc) {
        $scope.maxdate = moment();
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        
        $scope.showLoading = true;
        $scope.con = angular.copy(dataObj.containerItem);
        $scope.IsWebOrder = dataObj.iswebOrder;

        //if (!angular.isUndefined($scope.con)) {
        //    if ($scope.con.RequiredDate == null) {
        //        $scope.con.RequiredDate = undefined;
        //    }

        //    if ($scope.con.WeighingDate == null) {
        //        $scope.con.WeighingDate = undefined;
        //    }
        //}

        if (!angular.isUndefined($scope.con) && $scope.con != null) {
            
            if ($scope.con.WeighingDate == null ||  $scope.con.WeighingDate == undefined) {
                $scope.con.WeighingDate = undefined;
            }
            else
                $scope.con.WeighingDate = moment($scope.con.WeighingDate);
        }



        $scope.IsContainerMandatory = dataObj.JobType == 1060 ? true : false;
        
        OrderEntryService.GetContainerLookupData($scope.con.Size).then(function (d) {            
            $scope.showLoading = false;
            $scope.lookupData = d.data;
        }, function (err) { });

        $scope.popup = {
            RequiredDate: false,
            DehireDate: false
        };

        $scope.open = function (type) {
            $scope.popup[type] = true;
        };

        $scope.isFrmContainerValid = false;
        $scope.$watch('frmContainer.$valid', function (isValid) {
            $scope.isFrmContainerValid = isValid;
        });

        $scope.SaveContainer = function (con) {

            if (con.Temprature == 'null')
                con.Temprature = null;
            if ($scope.isFrmContainerValid) {
                $uibModalInstance.close(con);
            } else {
                growlService.growl('please enter all mandatory fields', 'danger');
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.sizeChanged = function () {
            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.con.Size).then(function (d) {
                $scope.showLoading = false;
                $scope.lookupData.TypeList = d.data;
            }, function () { })
        };


        $scope.ValidateContainerPattern = (function () {
            return {
                test: function (con) {
                    if ($scope.con.IsSOC)
                        return true;
                    var isValid = $scope.ISO6346Check(con);
                    $scope.IsContainerValid = isValid;
                    return isValid;
                }
            };
        })();

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
        $scope.SOCChecked = function () {
            $scope.frmContainer.ContainerNo.$$runValidators($scope.frmContainer.ContainerNo.$modalValue, $scope.frmContainer.ContainerNo.$viewValue, function () {
                $scope.con.ContainerNo = $scope.frmContainer.ContainerNo.$viewValue;
            });
        };
    }]);