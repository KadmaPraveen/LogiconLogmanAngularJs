angular.module('LogiCon').controller('EditIMOCodeCntrl', ['$scope', '$uibModalInstance', 'imoCode', 'IMOCodeService', 'growlService',
    function ($scope, $uibModalInstance, imoCode, IMOCodeService,  growlService) {

        $scope.isFrmIMOCodeValid = false;
        $scope.$watch('frmIMOCode.$valid', function (valid) {
            $scope.isFrmIMOCodeValid = valid;
        });

        if (imoCode != 'NEW' && imoCode != '') {
            IMOCodeService.GetIMOCode(imoCode).then(function (d) {
                $scope.imo = d.data;
            }, function (err) { });
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.SaveIMOCode = function (imo) {
            if ($scope.isFrmIMOCodeValid) {
                IMOCodeService.SaveIMOCode(imo).then(function (d) {
                    $uibModalInstance.close();
                }, function (err) { });
            }
        };
}]);
