angular.module('LogiCon').controller('ProductMasterController', ['$scope', function ($scope) {
    $scope.tabs = [
        { title: 'General', content: 'Js/MasterData/ProductMaster/Templates/general.html', active: true, disabled: false },
        { title: 'Package Defination', content: 'Js/MasterData/ProductMaster/Templates/package-defination.html', active: false, disabled: false }
    ];
}]);