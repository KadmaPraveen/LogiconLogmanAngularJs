angular.module('LogiCon').controller('FuelUsageCntrl', ['$scope', '$uibModal', 'Utility', function ($scope, $uibModal, Utility) {
    $scope.AddFuelUsage = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Transport/Templates/FuelUsage/add-fuelusage.html?v=' + Utility.Version,
            controller: 'AddFuelUsageCntrl',
            windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {

        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

angular.module('LogiCon').controller('AddFuelUsageCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

}]);