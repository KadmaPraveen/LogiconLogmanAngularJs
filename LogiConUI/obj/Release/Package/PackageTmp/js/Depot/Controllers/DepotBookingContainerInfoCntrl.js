angular.module('LogiCon').controller('DepotBookingContainerInfoCntrl',
    ['$scope', '$uibModalInstance', 'growlService', 'UtilityFunc', 'dataObj', 'OrderEntryService',
    function ($scope, $uibModalInstance, growlService, UtilityFunc, dataObj, OrderEntryService) {

        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();
       
        $scope.bc = angular.copy(dataObj.bookingContainer);
        $scope.lookUpData = dataObj.lookUpData;
        if ($scope.bc.conInfo == -1)
            $scope.bc.Status = 1041;
       
        if ($scope.bc.conInfo == -1) {
            $scope.bc.PickupDate = moment();
        }
        $scope.sizeChanged = function () {
            OrderEntryService.GetSizeType($scope.bc.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
            }, function () { })
        };
        if ($scope.bc.Size != null) {
            $scope.sizeChanged();

        }
        $scope.isFrmBookingConInfoValid = false;
        $scope.$watch('frmBookingConInfo.$valid', function (valid) {
            $scope.isFrmBookingConInfoValid = valid;
        });

        if (!angular.isUndefined($scope.bc.PickupDate) && $scope.bc.PickupDate != null) {
            if ($scope.bc.PickupDate == null) {
                $scope.bc.PickupDate = undefined;
            }
            else
                $scope.bc.PickupDate =moment($scope.bc.PickupDate);
        }
        $scope.SaveBookingContainer = function (bc) {
          
            if ($scope.bc.ContainerGrade == ""|| angular.isUndefined($scope.bc.ContainerGrade))
            {
                $scope.bc.ContainerGrade = null;
            }
            if ($scope.bc.IMOCode == "" || angular.isUndefined($scope.bc.IMOCode))
            {
                $scope.bc.IMOCode = null;
            }
            if ($scope.bc.CargoCategory == "" || angular.isUndefined($scope.bc.CargoCategory))
            {
                $scope.bc.CargoCategory = null;
            }

            if ($scope.isFrmBookingConInfoValid)
                $uibModalInstance.close(bc);
        }
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        }
    }]);