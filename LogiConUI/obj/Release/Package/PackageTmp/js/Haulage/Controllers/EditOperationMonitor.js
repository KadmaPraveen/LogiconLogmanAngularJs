angular.module('LogiCon').controller('EditOperationMonitor', ['$scope', '$uibModalInstance', 'growlService', function ($scope, $uibModalInstance, growlService) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);