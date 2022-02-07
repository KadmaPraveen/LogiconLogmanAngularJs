angular.module('LogiCon').controller('BookingContainerInfoCntrl', ['$scope', '$uibModalInstance', 'dataObj', 'OrderEntryService', 'growlService', 'UtilityFunc',
    function ($scope, $uibModalInstance, dataObj, OrderEntryService, growlService, UtilityFunc) {
        
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();

        $scope.bc = angular.copy(dataObj.bookingContainer);
        $scope.lookUpData = dataObj.lookUpData;
        $scope.isFrmBookingConInfoValid = false;
        if ($scope.bc.index == -1)
            $scope.bc.Status = 1041;
        if ($scope.bc.index == -1)
        {
           $scope.bc.PickupDate = moment();
        }
       
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

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
                $scope.bc.PickupDate = moment($scope.bc.PickupDate);
        }
        $scope.SaveBookingContainer = function (bc) {
           
            if ($scope.isFrmBookingConInfoValid) {
                $uibModalInstance.close(bc);
            }
            else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };
    }]);