angular.module('LogiCon').controller('CustomerCreditList', ['$scope', 'NgTableParams', 'CustomerCreditNoteService','$window','$state','$stateParams',
    function ($scope, NgTableParams, CustomerCreditNoteService, $window, $state, $stateParams) {

    var DataTblobj = {};

    $scope.refresh = function () {
        debugger;
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }
    $scope.GetTableData = function (IsAdvSearch) {
        
        $scope.ngTblData = new NgTableParams({
            page: 0,
            count: 10,
            sorting: {
                CreatedOn: 'desc'
            }
        },
            {
                counts: [10, 20, 30],
                getData: function ($defer, params) {
                    DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    DataTblobj.limit = params.count();
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        DataTblobj.sortColumn = orderBy.substring(1);
                        DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                    }
                    CustomerCreditNoteService.GetTableList(DataTblobj).then(function (res) {
                        debugger;
                        params.total(res.data.records);
                        $defer.resolve(res.data.data);
                    }, function (err) { })
                }
            });
    };
    $scope.BroadCastInvoice = function (obj) {
        $window.parent.MainModuleFunction(obj, 'customercreditnotelistinvoice', 'Customer Credit Note');
    }
    $scope.GetTableData(true);
}]);