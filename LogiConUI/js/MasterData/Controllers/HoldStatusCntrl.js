angular.module('LogiCon').controller('HoldStatusCntrl', ['$scope', '$uibModal', 'growlService', '$window', 'HoldStatusService', 'Utility',
    function ($scope, $uibModal, growlService, $window, HoldStatusService, Utility) {

    $scope.HoldStatusList = function (skip, take) {
        HoldStatusService.GetHoldStatusList(skip, take).then(function (d) {          
            $scope.holdStatusList = d.data.holdStatusList;
            $scope.totalItems = d.data.totalItems;
        }, function () { });
    };    

    $scope.AddHoldStatus = function (code) {
        
        if (code == 'NEW')
            $scope.truefalse = false;
        else
            $scope.truefalse = true;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/HoldStatus/add-holdstatus.html?v=' + Utility.Version,
            controller: 'EditHoldStatusCntrl',
            size: 'md',
            resolve: {
                holdStatusCode: function () {
                    return code;
                }
            }
        });

        modalInstance.result.then(function (pm) {
            $scope.HoldStatusList($scope.skip, $scope.limit);
        }, function (err) {
            //growlService.growl(err.statusText, 'danger');
        });
    };

    $scope.DeleteHoldStatus = function (code) {
        var result = $window.confirm('Are you sure, do want to delete? \'' + code + '\'');
        if (result) {
            HoldStatusService.DeleteHoldStatus(code).then(function (d) {
                $scope.HoldStatusList($scope.skip, $scope.limit);
            }, function (err) { });
        }
    };

    $scope.getData = function () {
        $scope.skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        $scope.HoldStatusList(skip, $scope.limit);
    };

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.skip = 0;
    $scope.HoldStatusList($scope.skip, $scope.limit);
}]);