angular.module('LogiCon').controller('UomCntrl', ['$scope', 'UomService', '$uibModal', 'Utility', function ($scope, UomService, $uibModal, Utility) {
    $scope.currentPage = 1;
    $scope.limit = 10;

    $scope.UomList = function (skip, take) {
        UomService.UomList(skip, take).then(function (d) {
            $scope.uomList = d.data.uomList;
            $scope.totalItems = d.data.totalItems
        }, function (err) { });
    };

    $scope.getData = function () {
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        $scope.UomList(skip, $scope.limit);
    };

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.AddUom = function (uomCode) {        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/Uom/edit-uom.html?v=' + Utility.Version,
            controller: 'EditUomCntrl',
            size: 'lg',
            resolve: {
                dataObj: function () {
                    return {
                        uomCode: uomCode
                    };
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.UomList(0, $scope.limit);
        });
    };

    $scope.DeleteUom = function (uomCode) {
        UomService.DeleteUom(uomCode).then(function (d) {
            $scope.UomList(0, $scope.limit);
        }, function (err) { });
    };

    $scope.UomList(0, $scope.limit);
}]);