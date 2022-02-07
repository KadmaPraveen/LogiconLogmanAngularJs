angular.module('LogiCon').controller('LoadPlanningCntrl', ['$scope', 'Utility', function ($scope, Utility) {
    $scope.tabs = [
        { title: 'Master Job Details', content: 'Js/Transport/Templates/LoadPlanning/masterjobdetails.html?v=' + Utility.Version, active: true, disabled: false },
        { title: 'Unplanned Movements', content: 'Js/Transport/Templates/LoadPlanning/unplannedmovements.html?v=' + Utility.Version, active: false, disabled: false }
    ];
}]);