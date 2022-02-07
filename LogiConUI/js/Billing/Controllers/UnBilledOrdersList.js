angular.module('LogiCon').controller('UnBilledOrdersListCntrl', ['$scope', 'UnBilledOrdersService', '$stateParams', 'Utility', '$window', 'UtilityFunc','$state','NgTableParams',
    function ($scope, UnBilledOrdersService, $stateParams, Utility, $window, UtilityFunc, $state, NgTableParams) {
        //$scope.getUnBilledOrdersList = function () {
        //    debugger;
        //    UnBilledOrdersService.GetUnBilledOrders().then(function (d) {
        //        $scope.UnBilledOrdersList = d.data.unbilledorderslist;
        //    });
        //}
    
       // $scope.getUnBilledOrdersList();
        $scope.refresh = function () {
            debugger;
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }
        $scope.GetTableData = function (IsSearch) {

            $scope.ngTblData = new NgTableParams({
                page: 0,
                count: 10,
            },
                {
                    counts: [10, 20, 30],
                    getData: function ($defer, params) {
                      var offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                         var limit = params.count();
                        //if (params.sorting()) {
                        //    var orderBy = params.orderBy()[0];

                        //    DataTblobj.sortColumn = orderBy.substring(1);
                        //    DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                        //}
                        UnBilledOrdersService.GetUnBilledOrders(offset,limit).then(function (res) {
                            debugger;
                            params.total(res.data.count);
                            $defer.resolve(res.data.data);
                        }, function (err) { })
                    }
                });
        };

        $scope.GetTableData(true);
        $scope.BroadCastUnBilledOrdersList = function (obj) {
            $window.parent.MainModuleFunction(obj, 'unbilledorderslistorderno', 'unbilled orders');
        };


}]);