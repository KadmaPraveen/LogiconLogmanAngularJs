angular.module('LogiCon').controller('addContainerRequestCntrl', ['$scope', '$uibModalInstance', 'growlService', 'OrderEntryService', 'dataObj', 'UtilityFunc',
function ($scope, $uibModalInstance, growlService, OrderEntryService, dataObj, UtilityFunc) {
    debugger;
    $scope.con = angular.copy(dataObj.dc);
    debugger;
    $scope.lookUpData = {
        sizeList: dataObj.sizeList,
        trailerTypeList: dataObj.trailerTypeList,
        emptyDehireList: dataObj.emptyDehireList,
        shipmentTypeList: dataObj.shipmentTypeList
    }
        $scope.init = function () {
          
            $scope.DateFormat = UtilityFunc.DateFormat();
            $scope.DateTimeFormat = UtilityFunc.DateTimeFormat();
            $scope.validateDates();
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.isFrmValid = false;
        $scope.$watch('frmContainerInfo.$valid', function (isValid) {
            $scope.isFrmValid = isValid;
        });

       
        $scope.SaveContainer = function (obj) {
            debugger;
            if ($scope.isFrmValid) {
                $uibModalInstance.close(obj);
            }
            else
                growlService.growl('Please enter all mandatory fields', 'danger');
        }
       
        $scope.validateDates=function()
        {
            if (!angular.isUndefined($scope.con.RequiredDate) && $scope.con.RequiredDate != null) {
                debugger;
                if ($scope.con.RequiredDate == null)
                    $scope.con.RequiredDate = undefined;
                else
                    $scope.con.RequiredDate = moment($scope.con.RequiredDate);
            }

            if (!angular.isUndefined($scope.con.ETD) && $scope.con.ETD != null) {
                if ($scope.con.ETD == null)
                    $scope.con.ETD = undefined;
                else
                    $scope.con.ETD = moment($scope.con.ETD);
            }
            if (!angular.isUndefined($scope.con.ETA) && $scope.con.ETA != null) {
                if ($scope.con.ETA == null)
                    $scope.con.ETA = undefined;
                else
                    $scope.con.ETA = moment($scope.con.ETA);
            }
            if (!angular.isUndefined($scope.con.DischargeDate) && $scope.con.DischargeDate != null) {
                if ($scope.con.DischargeDate == null)
                    $scope.con.DischargeDate = undefined;
                else
                    $scope.con.DischargeDate = moment($scope.con.DischargeDate);
            }
            if (!angular.isUndefined($scope.con.GateInDate) && $scope.con.GateInDate != null) {
                if ($scope.con.GateInDate == null)
                    $scope.con.GateInDate = undefined;
                else
                    $scope.con.GateInDate = moment($scope.con.GateInDate);
            }
            if (!angular.isUndefined($scope.con.GateOutDate) && $scope.con.GateOutDate != null) {
                if ($scope.con.GateOutDate == null)
                    $scope.con.GateOutDate = undefined;
                else
                    $scope.con.GateOutDate = moment($scope.con.GateOutDate);
            }
            if (!angular.isUndefined($scope.con.LoadDate) && $scope.con.LoadDate != null) {
                if ($scope.con.LoadDate == null)
                    $scope.con.LoadDate = undefined;
                else
                    $scope.con.LoadDate = moment($scope.con.LoadDate);
            }
       }
       

        $scope.sizeChanged = function () {
            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.con.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
                $scope.showLoading = false;
            }, function () { })
        };

        if (!angular.isUndefined($scope.sizeChanged) && $scope.sizeChanged != null)
        {
            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.con.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
                $scope.showLoading = false;
            }, function () { })

          }
        $scope.init();
    }]);