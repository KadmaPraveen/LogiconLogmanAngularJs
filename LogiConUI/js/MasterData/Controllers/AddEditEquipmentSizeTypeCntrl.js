angular.module('LogiCon').controller('AddEditEquipmentSizeTypeCntrl', ['$scope', '$uibModalInstance', 'stCode', 'EquipmentSizeTypeService', 'growlService',
    function ($scope, $uibModalInstance, stCode, EquipmentSizeTypeService, growlService) {
    $scope.truefalse = false;
    $scope.cancel = function () {
        
        $uibModalInstance.dismiss('cancel');
        $scope.isfrmAddEquipmentSizeType = false;
    };
   
    $scope.isfrmAddEquipmentSizeType = false;
    $scope.$watch('frmAddEquipmentSizeType.$valid', function (isValid) {
        $scope.isfrmAddEquipmentSizeType = isValid;
    });

    $scope.AddEquipmentSizeType = function (equipmentsizetype) {
       
        if ($scope.isfrmAddEquipmentSizeType) {
            EquipmentSizeTypeService.SaveEquipmentSizeType(equipmentsizetype).then(function (d) {
                $uibModalInstance.close();
                growlService.growl(d.data, 'success');

            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };

    EquipmentSizeTypeService.GetEquipmentType().then(function (d) {       
        $scope.equipmenttypeList = d.data;
    });

  
    
    if (stCode != -1) {
              
        EquipmentSizeTypeService.GetEquipmentSizeTypeByCode(stCode).then(function (d) {           
            $scope.equipmentsizetype = d.data;
            $scope.truefalse = true;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
    

}]);