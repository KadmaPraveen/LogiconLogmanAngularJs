angular.module('LogiCon').controller('CollectionAdviceFilter', ['$scope', '$uibModalInstance', 'CollectionAdviceService', function ($scope, $uibModalInstance, CollectionAdviceService) {
    CollectionAdviceService.FilterLookup().then(function (d) {
        $scope.lookUpData = d.data;
    }, function (err) { });
}]);