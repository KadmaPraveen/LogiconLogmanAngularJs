angular.module('LogiCon').controller('fuelusage', ['$scope', '$uibModal', 'growlService', 'Utility', function ($scope, $uibModal, growlService, Utility) {
    $scope.AddFuelUsage = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Haulage/Templates/fuelusage/add-fuelusage.html?v=' + Utility.Version,
            controller: 'editfuelusage',
            windowClass: 'app-modal-window2'

        });

        modalInstance.result.then(function () {

        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });
    };
}]);