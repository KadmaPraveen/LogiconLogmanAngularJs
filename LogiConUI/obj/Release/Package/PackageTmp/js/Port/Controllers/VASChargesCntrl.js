angular.module('LogiCon').controller('VASChargesCntrl', ['$scope', '$uibModalInstance', 'JobCategoryChargesService', 'DTOObj',
    function ($scope, $uibModalInstance, JobCategoryChargesService, DTOObj) {

    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.selected = [];

    $scope.toggle = function (item, list) {        
        var idx = list.indexOf(item);
        if (idx > -1) {
            list.splice(idx, 1);
        }
        else {
            list.push(item);
        }
    };

    $scope.exists = function (item, list) {        
        return list.indexOf(item) > -1;
    };

    $scope.SaveVasCharges = function () {
        $uibModalInstance.close($scope.selected);
    };

    JobCategoryChargesService.ChargeVasByJobCategoryCode(DTOObj.orderType, DTOObj.containerKey).then(function (d) {        
        $scope.chargesVasList = d.data.jobCategoryChargeVasList;
    }, function (err) { });
}]);