angular.module('LogiCon').controller('CollectionAdviceCntrl', ['$scope', '$uibModal', 'growlService', 'CollectionAdviceService', '$http', 'Utility', 'limitToFilter', 'PortAreaService',
    function ($scope, $uibModal, growlService, CollectionAdviceService, $http, Utility, limitToFilter,PortAreaService) {
    /*
    $scope.Filter = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Freight/Templates/collectionadvice/filterby.html',
            controller: 'CollectionAdviceFilter',
            size: 'md'

        });

        modalInstance.result.then(function () {

        }, function (err) {
            // growl.error(err.statusText, {});
        });
    };
    */
    CollectionAdviceService.FilterLookup().then(function (d) {        
        $scope.lookUpData = d.data;
    }, function (err) { });

    $scope.portResults = function (text) {
        return PortAreaService.PortAutoComplete(text).then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };
}]);