angular.module('LogiCon').controller('EquipmentPlanning', ['$scope', '$uibModal', 'growlService', 'Utility', function ($scope, $uibModal, growlService, Utility) {
    $scope.AddEquipment = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Haulage/Templates/EquipmentPlanning/add-equipment.html?v=' + Utility.Version,
            controller: 'EditEquipmentController',
            windowClass: 'app-modal-window'
            
        });

        modalInstance.result.then(function () {
            
        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });
    };
}]);