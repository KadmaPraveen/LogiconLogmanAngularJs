angular.module('LogiCon').controller('driverpaymentbreakdown', ['$scope', '$uibModal', 'growlService', 'Utility', function ($scope, $uibModal, growlService, Utility) {
    $scope.AddBreakdown = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Haulage/Templates/Driverpaymentbreakdown/add-driverbreakdown.html?v=' + Utility.Version,
            controller: 'editdriverpaymentbreakdown',
            windowClass: 'app-modal-window2'

        });

        modalInstance.result.then(function () {

        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });
    };
}]);