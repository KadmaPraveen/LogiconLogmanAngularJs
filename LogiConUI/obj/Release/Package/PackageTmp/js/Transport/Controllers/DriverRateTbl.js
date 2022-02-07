angular.module('LogiCon').controller('DriverRateTblCntrl', ['$scope', '$uibModal', 'Utility', function ($scope, $uibModal, Utility) {
    $scope.AddDriverRateTbl = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Transport/Templates/DriverRateTbl/add-driverratetbl.html?v=' + Utility.Version,
            controller: 'AddDriverRateTblCntrl',
            windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {

        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

angular.module('LogiCon').controller('AddDriverRateTblCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);