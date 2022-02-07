angular.module('LogiCon').controller('WareHouseController', ['$scope', function ($scope) {
    $scope.treedata = createSubTree(3, 4, "");
    $scope.showSelected = function (sel) {
        $scope.selectedNode = sel;
    };
}]);