app.directive('customerAddress', function () {
    return {
        restrict: 'EA',
        replace: true,
        scope: {
            code: '=merchant'
        },
        templateUrl: 'Js/MasterData/Directives/logicon-address.html',
        controller: ['$scope', '$q', 'AddressService', '$stateParams',
            function ($scope, $q, AddressService, $stateParams) {
                var code = $stateParams.code;
                AddressService.GetAddress(code).then(function (d) {
                    $scope.address = d.data;
                }, function (err) { });
            }]
    };
});