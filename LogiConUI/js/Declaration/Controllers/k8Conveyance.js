angular.module('LogiCon').controller('k8ConveyanceCntrl', ['$scope', '$uibModalInstance', 'limitToFilter', '$filter', 'growlService', 'dataObj',
function ($scope, $uibModalInstance, limitToFilter, $filter, growlService, dataObj) {
   
    $scope.init = function () {
        $scope.con = {
            BranchID: null,
            DeclarationNo: null,
            ItemNo: null,
            ConveyanceID: null,
            ConveyanceType: null,
            CustomStationCode: null,
            LicenseNo: null,
            RegistrationYear: null,
            ItemCode: null,
            PType: null,
            PMeterFigure: null,
            PTankFigure: null,
            CreatedBy: null,
            CreatedOn: null,
            ModifiedBy: null,
            ModifiedOn: null
        }
        
        $scope.con = angular.copy(dataObj.Conveyance);
        $scope.smkList = angular.copy(dataObj.smkList);
        $scope.conveyanceList = angular.copy(dataObj.conveyanceList)
    }
    //$scope.showLoading = true;   

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };


    $scope.IsFrmConveyanceValid = false;
    $scope.$watch('frmConveyance.$valid', function (isValid) {
        $scope.IsFrmConveyanceValid = isValid;
    });

    $scope.SaveConveyance = function (con) {

        if ($scope.IsFrmConveyanceValid) {
            $uibModalInstance.close(con);
        }
        else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    };

    //$scope.showLoading = false;
    $scope.init();
    
}]);