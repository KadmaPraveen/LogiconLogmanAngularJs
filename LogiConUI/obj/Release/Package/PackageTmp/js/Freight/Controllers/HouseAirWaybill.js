angular.module('LogiCon').controller('HouseAirWaybillCntrl', ['$scope', 'Utility', function ($scope, Utility) {
    $scope.tabs = [
        { title: 'Header', content: 'Js/Freight/Templates/HouseAirWaybill/header.html?v=' + Utility.Version, active: true, disabled: false },
        { title: 'Details', content: 'Js/Freight/Templates/HouseAirWaybill/details.html?v=' + Utility.Version, active: false, disabled: false },
        { title: 'Footer', content: 'Js/Freight/Templates/HouseAirWaybill/footer.html?v=' + Utility.Version, active: false, disabled: false }
    ];
}]);