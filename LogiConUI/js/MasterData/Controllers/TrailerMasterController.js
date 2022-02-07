angular.module('LogiCon').controller('TrailerMasterController', ['$scope', '$uibModal', 'TrailerMasterService', '$window', 'Utility', function ($scope, $uibModal, TrailerMasterService, $window, Utility) {
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.skip = 0;

    $scope.GetTrailerList = function (skip, take) {
        TrailerMasterService.GetTrailerList(skip, take).then(function (d) {            
            $scope.trailerList = d.data.list;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { });
    };

    $scope.AddTrailerMaster = function (trailerID) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/TrailerMaster/add-trailer.html?v=' + Utility.Version,
            controller: 'EditTrailerController',
              size: 'lg',
            resolve: {
                trailerID: function () {
                    return trailerID;
                }
            }
        });

        modalInstance.result.then(function (pm) {
            $scope.GetTrailerList($scope.skip, $scope.limit);
        }, function (err) {

        });
    };

    $scope.getData = function () {
        $scope.skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        $scope.GetTrailerList(skip, $scope.limit);
    };

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.DeleteTrailerMaster = function (trailerID) {
        if ($window.confirm('Are you sure, you want to delete \'' + trailerID + '\' ?')) {
            TrailerMasterService.DeleteTrailer(trailerID).then(function (d) {
                $scope.GetTrailerList($scope.skip, $scope.limit);
            }, function (err) { });
        }
    };

    $scope.GetTrailerList($scope.skip, $scope.limit);
}]);