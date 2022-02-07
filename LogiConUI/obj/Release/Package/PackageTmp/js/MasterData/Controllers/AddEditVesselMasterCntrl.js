angular.module('LogiCon').controller('AddEditVesselMasterCntrl', ['$scope', '$uibModalInstance', 'vesselId', 'VesselMasterService', 'growlService',
    function ($scope, $uibModalInstance, vesselId, VesselMasterService, growlService) {
   
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $scope.isfrmAddVesselMaster = false;
    };

    $scope.isfrmAddVesselMaster = false;
    $scope.$watch('frmVesselMaster.$valid', function (isValid) {
        $scope.isfrmAddVesselMaster = isValid;
    });

    $scope.AddVesselMaster = function (vessel) {
       
        if ($scope.isfrmAddVesselMaster) {
            VesselMasterService.SaveVesselMaster(vessel).then(function (d) {
                $uibModalInstance.close();
                growlService.growl(d.data, 'success');

            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };

   

    VesselMasterService.GetCountryList().then(function (d) {       
        $scope.countryDataList = d.data;
       
    }, function (err) {
        growlService.growl(err.statusText, 'danger');
    });

    $scope.truefalse = false;

    if (vesselId != -1) {
       
        VesselMasterService.GetVesselMasterById(vesselId).then(function (d) {         
            
            $scope.vessel = d.data;
            $scope.truefalse = true;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
       
    }



}]);