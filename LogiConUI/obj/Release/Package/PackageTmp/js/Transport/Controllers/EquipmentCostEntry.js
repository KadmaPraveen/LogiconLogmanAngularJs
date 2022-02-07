angular.module('LogiCon').controller('EquipmentCostEntryCntrl', ['$scope', '$uibModal', 'Utility', function ($scope, $uibModal, Utility) {

    $scope.AddEquipCostEntry = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Transport/Templates/EquipmentCostEntry/add-equipcostentry.html?v=' + Utility.Version,
            controller: 'AddEquipCostEntryCntrl',
            windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {

        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

angular.module('LogiCon').controller('AddEquipCostEntryCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);