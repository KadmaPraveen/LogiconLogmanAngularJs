angular.module('LogiCon').controller('DocumentationCntrl', ['$scope', 'Utility', function ($scope, Utility) {
    $scope.tabs = [
        { title: 'General', content: 'Js/Freight/Templates/Documentation/general.html?v=' + Utility.Version, active: true, disabled: false },
        { title: 'Shipping Details', content: 'Js/Freight/Templates/Documentation/shippingdetails.html?v=' + Utility.Version, active: false, disabled: false },
        { title: 'Marks & Numbers', content: 'Js/Freight/Templates/Documentation/marks.html?v=' + Utility.Version, active: false, disabled: false },
        { title: 'Others', content: 'Js/Freight/Templates/Documentation/others.html?v=' + Utility.Version, active: false, disabled: false },
        { title: 'Extra', content: 'Js/Freight/Templates/Documentation/extra.html?v=' + Utility.Version, active: false, disabled: false }
    ];
}]);