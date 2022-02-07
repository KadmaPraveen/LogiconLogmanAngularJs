angular.module('LogiCon').controller('UnBilledOrdersCntrl', ['$scope', 'UnBilledOrdersService', '$http', 'Utility', function ($scope, UnBilledOrdersService, $http, Utility) {
    $scope.getLookupData = function () {
        debugger;
        UnBilledOrdersService.GetLookupData().then(function (d) {
            $scope.lookupdata = d.data;
        });
    };
    $scope.getLookupData();
}]);