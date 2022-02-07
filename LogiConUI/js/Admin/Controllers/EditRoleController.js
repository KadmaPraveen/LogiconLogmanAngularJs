angular.module('LogiCon').controller('EditRolesCntrl', ['$scope', 'RolesService', 'growlService', 'roleCode', '$uibModalInstance', function ($scope, RolesService, growlService, roleCode, $uibModalInstance) {
    $scope.role = {};
    $scope.isFrmRoleIsValid = false;
    $scope.$watch('frmRole.$valid', function (isValid) {
        $scope.isFrmRoleIsValid = isValid;
    });

    $scope.SaveRole = function (role) {
        if ($scope.isFrmRoleIsValid) {
            RolesService.SaveRole(role).then(function (d) {
                growlService.growl('Success', 'success');
                $uibModalInstance.close();
            }, function (err) { });
        } else {
            growlService.growl('Please entry all mandatory fields', 'danger');
        }       
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    if (roleCode != 'NEW') {
        RolesService.GetRole(roleCode).then(function (d) {
            $scope.role = d.data;
        }, function (err) { });
    }
}]);