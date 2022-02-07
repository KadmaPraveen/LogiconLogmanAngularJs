angular.module('LogiCon').controller('RolesCntrl', ['$scope', 'RolesService', 'growlService', '$uibModal', 'Utility', function ($scope, RolesService, growlService, $uibModal, Utility) {
    $scope.GetList = function () {
        RolesService.GetList().then(function (d) {            
            $scope.rolesList = d.data;
        }, function (err) { });
    };

    $scope.EditRole = function (roleCode) {
        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Admin/Templates/EditRole.html?v=' + Utility.Version,
            size: 'sm',
            controller: 'EditRolesCntrl',
            resolve: {
                roleCode: function () {
                    return roleCode;
                }
            }
        });

        $scope.modalInstance.result.then(function () {
            $scope.GetList();
        });
    };

    $scope.GetList();
}]);