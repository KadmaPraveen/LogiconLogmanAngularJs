angular.module('LogiCon').controller('VesselMasterCntrl', ['$scope', 'VesselMasterService', '$uibModal', '$window', '$stateParams', 'growlService', 'Utility', '$location',
    function ($scope, VesselMasterService, $uibModal, $window, growlService, $stateParams, Utility, $location) {
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.AddVesselMaster = function (Code) {
        $location.path('/operation/manifest/vesselprofile/' + Code);
        /*
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/VesselMaster/add-vessel-master.html?v=' + Utility.Version,
            controller: 'AddEditVesselMasterCntrl',
            size: 'md',
            resolve: {
                vesselId: function () {
                    return Code;
                }
            }       
        });

        modalInstance.result.then(function (vessel) {           
            $scope.VesselList();
        }, function (err) {
            growl.error(err.statusText, {});
        });*/
    };




    $scope.VesselList = function () {
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        VesselMasterService.GetVesselMasterList(skip, $scope.limit).then(function (d) {
            
            $scope.vesselList = d.data.vesselList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.pageChanged = function () {
        $scope.VesselList();
    };

    $scope.getData = function (skip, take) {
        VesselMasterService.GetVesselMasterList(skip, take).then(function (d) {
            
            $scope.vesselList = d.data.vesselList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.getData(0, $scope.limit);


    $scope.DeleteVesselMaster = function (vesselId) {
        if ($window.confirm('Are you sure, you want to delete \'' + vesselId + '\' ?')) {
            VesselMasterService.DeleteVesselMaster(vesselId).then(function (d) {
                growlService.growl('Deleted successfully', 'success');
                $scope.getData();
            }, function (err) { });
        }
    };

    //test

}]);


