angular.module('LogiCon').controller('OperationMonitor', ['$scope', '$uibModal', 'growlService', 'Utility', function ($scope, $uibModal, growlService, Utility) {
    $scope.AddOperationMonitor = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Haulage/Templates/OperationMonitor/add-operation-monitor.html?v=' + Utility.Version,
            controller: 'EditOperationMonitor',
            windowClass: 'app-modal-window'

        });

        modalInstance.result.then(function () {

        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });
    };
}]);