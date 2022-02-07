angular.module('LogiCon').controller('k1AInquiryCntrl', ['$scope', '$state', '$stateParams', 'k1AService', 'UtilityFunc', 'NgTableParams', '$window', function ($scope, $state, $stateParams, k1AService, UtilityFunc, NgTableParams, $window) {

    $scope.i = {};
    $scope.dateFormat = UtilityFunc.DateFormat();
    $scope.i.dateFrom = UtilityFunc.FirstDateOfMonth();
    $scope.i.dateTo = moment();
    

    var DataTblobj = {};
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
                    
                    DataTblobj.BranchID = null;
                    DataTblobj.OrderNo = $scope.i.OrderNo == undefined ? '' : $scope.i.OrderNo;
                    DataTblobj.DeclarationNo = $scope.i.declarationNo == undefined ? '' : $scope.i.declarationNo;
                    DataTblobj.K1RegistrationNo = $scope.i.k1RegistrationNo == undefined ? '' : $scope.i.k1RegistrationNo;
                 
                    if (IsAdvSearch) {
                        DataTblobj.DateFrom = $scope.i.dateFrom == undefined ? null : $scope.i.dateFrom;
                        DataTblobj.DateTo = $scope.i.dateTo == undefined ? null : $scope.i.dateTo;
                    }
                    else {
                        DataTblobj.DateFrom = null;
                        DataTblobj.DateTo = null;
                    }

                    //DataTblobj.DeclarationType = $scope.i.declarationType == undefined ? '' : $scope.i.declarationType;

                    DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    DataTblobj.limit = params.count();
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        DataTblobj.sortColumn = orderBy.substring(1);
                        DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                    }
                    
                    k1AService.GetTableList(DataTblobj).then(function (res) {
                        
                        params.total(res.data.records);
                        $defer.resolve(res.data.data);
                    }, function (err) { })
                }
            });
    };
    $scope.GetTableData($scope.IsAdvSearch);

    $scope.refresh = function () {
        
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.BroadCastDeclaration = function (obj) {
        $window.parent.MainModuleFunction(obj, 'k1Adeclaration', 'k1A Declaration');
    };
}]);