angular.module('LogiCon').controller('EquipmentSizeTypeCntrl', ['$scope', 'EquipmentSizeTypeService', '$uibModal', '$window', '$stateParams', 'growlService', 'Utility',
    function ($scope, EquipmentSizeTypeService, $uibModal, $window, growlService, $stateParams, Utility) {
    
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.AddEquipmentSizeType = function (Code) {
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/EquipmentSizeType/add-equipmentsizetype.html?v=' + Utility.Version,
            controller: 'AddEditEquipmentSizeTypeCntrl',
            size: 'lg',
            resolve: {
                stCode: function () {
                    return Code;
                }
            }
        });

        modalInstance.result.then(function (res) {
            //$scope.getData();

            $scope.EquipmentSizeTypeList();
        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });
    };


    $scope.EquipmentSizeTypeList = function () {      
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        EquipmentSizeTypeService.GetEquipmentSizeTypeList(skip, $scope.limit).then(function (d) {
           
            $scope.equipmentSizeTypeList = d.data.equipmentSizeTypeList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.pageChanged = function () {
        $scope.EquipmentSizeTypeList();
    };

    $scope.getData = function (skip, take) {
       
        EquipmentSizeTypeService.GetEquipmentSizeTypeList(skip, take).then(function (d) {
            
            $scope.equipmentSizeTypeList = d.data.equipmentSizeTypeList;
            $scope.totalItems = d.data.totalItems;

        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.getData(0, $scope.limit);


    $scope.DeleteEquipmentSizeType = function (stCode) {
        if ($window.confirm('Are you sure, you want to delete \'' + stCode + '\' ?')) {
            EquipmentSizeTypeService.DeleteEquipmentSizeType(stCode).then(function (d) {                
                growlService.growl('Deleted successfully', 'success');
                $scope.EquipmentSizeTypeList();
            }, function (err) { });
        }
    };


}]);


