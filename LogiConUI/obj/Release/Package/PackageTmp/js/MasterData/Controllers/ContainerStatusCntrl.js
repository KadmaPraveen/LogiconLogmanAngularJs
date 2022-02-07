angular.module('LogiCon').controller('ContainerStatusCntrl', ['$scope', 'ContainerStatusService', '$uibModal', '$window', '$stateParams', 'growlService', 'Utility',
    function ($scope, ContainerStatusService, $uibModal, $window, growlService, $stateParams, Utility) {

   
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.AddContainerStatus = function (Code) {
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/ContainerStatus/add-container-status.html?v=' + Utility.Version,
            controller: 'AddEditContainerStatusCntrl',
            size: 'md',
            resolve: {
                Code: function () {
                    return Code;
                }
            }
        });

        modalInstance.result.then(function (res) {
            //$scope.getData();
            $scope.ContainerStatusList();
        }, function (err) {
            growlService.growl(err.statusText, 'denger');
        });
    };


    $scope.ContainerStatusList = function () {
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        ContainerStatusService.GetContainerStatusList(skip, $scope.limit).then(function (d) {
           
            $scope.containerstatusList = d.data.containerstatusList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.pageChanged = function () {
        $scope.ContainerStatusList();
    };

    $scope.getData = function (skip, take) {
        ContainerStatusService.GetContainerStatusList(skip, take).then(function (d) {
            
            $scope.containerstatusList = d.data.containerstatusList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.getData(0, $scope.limit);


    $scope.DeleteContainerStatus = function (Code) {
        if ($window.confirm('Are you sure, you want to delete \'' + Code + '\' ?')) {
            ContainerStatusService.DeleteContainerStatus(Code).then(function (d) {
                growlService.growl('Deleted successfully', 'success');
                $scope.ContainerStatusList();
            }, function (err) { });
        }
    };


}]);


