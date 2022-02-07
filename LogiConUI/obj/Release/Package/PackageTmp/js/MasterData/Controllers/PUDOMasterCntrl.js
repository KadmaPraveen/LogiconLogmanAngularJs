angular.module('LogiCon').controller('PUDOMasterCntrl', ['$scope', 'PUDOMasterService', '$uibModal', '$window', '$stateParams', 'growlService', 'Utility',
    function ($scope, PUDOMasterService, $uibModal, $window, growlService, $stateParams, Utility) {
   
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.AddPUDOMaster = function (pudomaster) {
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/PUDOMaster/add-pudo-master.html?v=' + Utility.Version,
            controller: 'AddEditPUDOMasterCntrl',
            size: 'md',
            resolve: {
                pudomaster: function () {
                    return pudomaster;
                }
            }
        });

        modalInstance.result.then(function (gst) {
            //$scope.getData();
            $scope.PUDOMasterList();
        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });
    };


    $scope.PUDOMasterList = function () {
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        PUDOMasterService.GetPUDOMasterList(skip, $scope.limit).then(function (d) {
            
            $scope.pudomasterList = d.data.pudomasterList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) {
            //growlService.growl(err.statusText, 'danger')
        });
    };

    $scope.pageChanged = function () {
        $scope.GetPUDOMasterList();
    };

    $scope.getData = function (skip, take) {
        PUDOMasterService.GetPUDOMasterList(skip, take).then(function (d) {          
            $scope.pudomasterList = d.data.pudomasterList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) {
            //growlService.growl(err.statusText, 'danger')
        });
    };

    $scope.getData(0, $scope.limit);


    $scope.DeletePUDOMaster = function (pudomaster) {       
        if ($window.confirm('Are you sure, you want to delete \'' + pudomaster.MovementCode + '\' ?')) {
            PUDOMasterService.DeletePUDOMaster(pudomaster).then(function (d) {
                growlService.growl('Deleted successfully', 'success');
                $scope.GetPUDOMasterList();
            }, function (err) { });
        }
    };




}]);


