angular.module('LogiCon').controller('EditUomCntrl', ['$scope', '$uibModalInstance', 'UomService', 'dataObj',
    function ($scope, $uibModalInstance, UomService, dataObj) {
        
        if (dataObj.uomCode != 'NEW') {
            UomService.GetUom(dataObj.uomCode).then(function (d) {
                $scope.uom = d.data;
            }, function (err) { });
        }

        $scope.SaveUom = function (uom) {
            UomService.SaveUom(uom).then(function (d) {
                if (d.data == 'Saved Successfully...!')
                    $uibModalInstance.close();
            }, function (err) { });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
}]);