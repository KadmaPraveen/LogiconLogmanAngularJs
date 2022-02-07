angular.module('LogiCon').controller('NewsSNN', ['$scope', 'UtilityFunc', '$state', '$stateParams', 'NgTableParams',
    function ($scope, UtilityFunc, $state, $stateParams, NgTableParams) {
        $scope.init = function () {
            $scope.i = {};

            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.i.dateFrom = UtilityFunc.FirstDateOfMonth();
            $scope.i.dateTo = moment();
        }

        var DataTblobj = {};
        $scope.init();
    }]);