angular.module('LogiCon').controller('AdvanceEntryCntrl', ['$scope', '$uibModal', 'Utility', function ($scope, $uibModal, Utility) {
    $scope.AddAdvanceEntry = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Billing/Templates/AdvanceEntry/add-advanceentry.html?v=' + Utility.Version,
            controller: 'AddAdvanceEntryCntrl',
            size: 'lg',
            //windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    
}]);

angular.module('LogiCon').controller('AddAdvanceEntryCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

}]);