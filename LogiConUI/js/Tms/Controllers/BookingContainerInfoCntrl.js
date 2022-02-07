angular.module('LogiCon').controller('BookingContainerInfoCntrl', ['$scope', '$uibModalInstance', 'dataObj', 'OrderEntryService', function ($scope, $uibModalInstance, dataObj, OrderEntryService) {
    
    $scope.bc = dataObj.bookingContainer;    
    $scope.lookUpData = dataObj.lookUpData;
    $scope.isFrmBookingConInfoValid = false;
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
        //
        //$scope.bc.Type = dataObj.bookingContainer.Type;
    }

    $scope.$watch('frmBookingConInfo.$valid', function (valid) {
        $scope.isFrmBookingConInfoValid = valid;
    });

    $scope.SaveBookingContainer = function (bc) {
        if ($scope.isFrmBookingConInfoValid) {
            $uibModalInstance.close(bc);
        }
    };
}]);