angular.module('LogiCon').controller('TruckMasterController', ['$scope', '$uibModal', 'TruckMasterService', '$window', 'Utility', function ($scope, $uibModal, TruckMasterService, $window, Utility) {
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.skip = 0;

    $scope.GetTruckList = function (skip, take) {
        TruckMasterService.GetTruckList(skip, take).then(function (d) {
            $scope.truckList = d.data.list;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { });
    };

    $scope.AddTruckMaster = function (id) {
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/TruckMaster/add-truck.html?v=' + Utility.Version,
            controller: 'EditTruckController',
              size: 'lg',
            resolve: {
                truckId: function () {
                    return id;
                }
            }
        });

        modalInstance.result.then(function (pm) {
            $scope.GetTruckList($scope.skip, $scope.limit);
        }, function (err) {
            
        });
    };

    $scope.getData = function () {
        $scope.skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));        
        $scope.GetTruckList(skip, $scope.limit);
    };

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.DeleteTruckMaster = function (truckID) {
        if ($window.confirm('Are you sure, you want to delete \'' + truckID + '\' ?')) {
            TruckMasterService.DeleteTruck(truckID).then(function (d) {
                $scope.GetTruckList($scope.skip, $scope.limit);
            }, function (err) { });
        }
    };

    $scope.GetTruckList($scope.skip, $scope.limit);
}]);

