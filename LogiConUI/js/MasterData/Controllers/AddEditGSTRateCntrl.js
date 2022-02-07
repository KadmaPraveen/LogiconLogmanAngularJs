angular.module('LogiCon').controller('AddEditGSTRateCntrl', ['$scope', '$uibModalInstance', 'gstCode', 'GstRateService', 'growlService',
    function ($scope, $uibModalInstance, gstCode, GstRateService, growlService) {
   
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $scope.isfrmAddGstRateMaster = false;
    };

    $scope.isfrmAddGstRateMaster = false;
    $scope.$watch('frmAddGSTRateMaster.$valid', function (isValid) {      
        $scope.isfrmAddGstRateMaster = isValid;
    });

    $scope.AddGSTRateMaster = function (gst) {       
        if ($scope.isfrmAddGstRateMaster) {
            GstRateService.SaveGSTRateCode(gst).then(function (d) {
                $uibModalInstance.close();
                growlService.growl(d.data, 'success');

            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };
    $scope.truefalse = false;

    if (gstCode != -1) {        
        GstRateService.GetRateByGstCode(gstCode).then(function (d) {
            $scope.truefalse = true;
            $scope.gst = d.data;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    }

}]);