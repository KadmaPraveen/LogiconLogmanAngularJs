angular.module('LogiCon').controller('BillOfLadCntrl', ['$scope', 'Utility', function ($scope, Utility) {
    $scope.tabs = [
        { title: 'General', content: 'Js/Freight/Templates/BillOfLad/general.html?v=' + Utility.Version, active: true, disabled: false },
        { title: 'Mark & Numbers', content: 'Js/Freight/Templates/BillOfLad/mark.html?v=' + Utility.Version, active: false, disabled: false }
    ];
}]);