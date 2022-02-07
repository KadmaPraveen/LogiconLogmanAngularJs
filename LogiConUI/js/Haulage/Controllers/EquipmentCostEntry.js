angular.module('LogiCon').controller('EquipmentCostEntry', ['$scope', '$uibModal', 'growlService', 'Utility', function ($scope, $uibModal, growlService, Utility) {
    $scope.AddEquipmentCostEntry = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Haulage/Templates/EquipmentCostEntry/add-equipmentcostentry.html?v=' + Utility.Version,
            controller: 'EditEquipmentCostEntry',
            size: 'lg'

        });

        modalInstance.result.then(function () {

        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });
    };
}]);