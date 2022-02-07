angular.module('LogiCon').controller('editdriverpaymentbreakdown', ['$scope', '$uibModalInstance', 'growlService', function ($scope, $uibModalInstance, growlService) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);