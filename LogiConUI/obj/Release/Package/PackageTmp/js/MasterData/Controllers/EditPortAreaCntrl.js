angular.module('LogiCon').controller('EditPortAreaCntrl', ['$scope', '$uibModalInstance', 'PortAreaService', 'growlService', 'dataObj',
    function ($scope, $uibModalInstance, PortAreaService,  growlService, dataObj) {
    
    $scope.truefalse = false;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    if (dataObj.portCode != '' && dataObj.portCode != 'NEW') {
        PortAreaService.portByPortCode(dataObj.portCode).then(function (d) {
            $scope.port = d.data;
            $scope.truefalse = true;
        }, function (err) {

        });
    }
    else {
        $scope.port = {
            CountryCode: dataObj.CountryCode,
            PortType: 1300
        };
    }

    PortAreaService.GetIntegrationBranch().then(function (d) {        
        $scope.branchList = d.data;
    }, function (err) { });

    $scope.isFrmPortAreaValid = false;

    $scope.$watch('frmPortArea.$valid', function (valid) {
        $scope.isFrmPortAreaValid = valid;
    });
    $scope.SavePort = function (port) {
        if ($scope.isFrmPortAreaValid) {
            PortAreaService.SavePort(port).then(function (d) {
                if (d.data == 'Saved Successfully...!') {
                    $uibModalInstance.close(true);
                    growlService.growl('Saved successfully!', 'success');
                }
                else {
                    $uibModalInstance.close(false);
                    growlService.growl('failed', 'danger');
                }
            }, function (err) {

            });
        } else {
            growlService.growl('failed', 'danger');
        }
        
    };
}]);