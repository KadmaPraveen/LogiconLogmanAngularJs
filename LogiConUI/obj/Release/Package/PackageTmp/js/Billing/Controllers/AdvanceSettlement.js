angular.module('LogiCon').controller('AdvanceSettlementCntrl', ['$scope', '$uibModal', 'Utility', function ($scope, $uibModal, Utility) {
    $scope.AddAdvanceSettlement = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Billing/Templates/AdvanceSettlement/add-advancesettlement.html?v=' + Utility.Version,
            controller: 'AddAdvanceSettlementCntrl',
            //size: 'lg',
            windowClass: 'app-modal-window'
        });

        modalInstance.result.then(function () {

        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);

angular.module('LogiCon').controller('AddAdvanceSettlementCntrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {

}]);