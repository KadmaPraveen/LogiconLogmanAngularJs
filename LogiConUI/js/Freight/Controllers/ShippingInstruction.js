angular.module('LogiCon').controller('ShippingInstructionCntrl', ['$scope', 'Utility', function ($scope, Utility) {
    $scope.tabs = [
        { title: 'General', content: 'Js/Freight/Templates/ShippingInstruction/general.html?v=' + Utility.Version, active: true, disabled: false },
        { title: 'Mark & Numbers', content: 'Js/Freight/Templates/ShippingInstruction/mark.html?v=' + Utility.Version, active: false, disabled: false }
    ];
}]);