angular.module('LogiCon').controller('AssociationListController', ['$scope', 'AssociationListService', '$location', function ($scope, AssociationListService, $location) {
    $scope.showLoading = true;

    AssociationListService.GetList().then(function (d) {       
        $scope.showLoading = false;
        $scope.associationList = d.data;        
    }, function (err) { });

    $scope.Association = function (id) {
        $location.path('/admin/Association/' + id);
    };


}]);