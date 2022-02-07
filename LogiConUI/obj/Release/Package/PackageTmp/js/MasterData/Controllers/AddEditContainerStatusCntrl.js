angular.module('LogiCon').controller('AddEditContainerStatusCntrl', ['$scope', '$uibModalInstance', 'Code', 'ContainerStatusService', 'growlService',
    function ($scope, $uibModalInstance, Code, ContainerStatusService, growlService) {
    $scope.truefalse = false;
    $scope.cancel = function () {
       
        $uibModalInstance.dismiss('cancel');
        $scope.isfrmAddContainerStatus = false;
    };
   

    $scope.isfrmAddContainerStatus = false;
    $scope.$watch('frmAddContainerStatus.$valid', function (isValid) {
        $scope.isfrmAddContainerStatus = isValid;
    });


    $scope.AddContainerStatus = function (containerstatus) {
      
        if ($scope.isfrmAddContainerStatus) {
            ContainerStatusService.SaveContainerStatus(containerstatus).then(function (d) {
                $uibModalInstance.close();
                growlService.growl(d.data, 'success');

            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };
  

    if (Code != -1) {
            ContainerStatusService.GetContainerStatusByCode(Code).then(function (d) {
                $scope.containerstatus = d.data;
                $scope.truefalse = true;
            }, function (err) { growlService.growl(err.statusText, 'danger'); });
    }

}]);