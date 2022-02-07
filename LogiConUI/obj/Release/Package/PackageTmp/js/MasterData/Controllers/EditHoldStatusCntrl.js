angular.module('LogiCon').controller('EditHoldStatusCntrl', ['$scope', '$uibModalInstance', 'holdStatusCode', 'HoldStatusService', 'growlService',
    function ($scope, $uibModalInstance, holdStatusCode, HoldStatusService,  growlService) {

        $scope.isFrmHoldStatusValid = false;
        $scope.$watch('frmHoldStatus.$valid', function (valid) {
            $scope.isFrmHoldStatusValid = valid;
        });

        if (holdStatusCode != 'NEW' && holdStatusCode != '') {
            HoldStatusService.GetHoldStatus(holdStatusCode).then(function (d) {
                $scope.hs = d.data;
            }, function (err) { });
        }

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.SaveHoldStatus = function (hs) {
            if ($scope.isFrmHoldStatusValid) {
                HoldStatusService.SaveHoldStatus(hs).then(function (d) {
                    $uibModalInstance.close();
                }, function (err) { });
            }
        };
    }]);
