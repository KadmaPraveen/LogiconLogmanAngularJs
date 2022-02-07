angular.module('LogiCon').controller('CompanyProfileController', ['$scope', function ($scope) {
    $scope.treedata = createSubTree(3, 4, "");
    $scope.showSelected = function (sel) {        
        $scope.selectedNode = sel;
    };
}]);

//test
