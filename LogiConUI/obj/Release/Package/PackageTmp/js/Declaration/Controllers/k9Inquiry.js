angular.module('LogiCon').controller('k9InquiryCntrl', ['$scope', 'k9Service', 'UtilityFunc', '$state', '$stateParams', 'NgTableParams', '$window',
    function ($scope, k9Service, UtilityFunc, $state, $stateParams, NgTableParams, $window) {
    $scope.i = {};
    $scope.currentPage = 1;
    $scope.limit = 10;

    $scope.dateFormat = UtilityFunc.DateFormat();
    $scope.dataGridNorecords = UtilityFunc.DataGridNorecords();
    $scope.i.dateFrom = UtilityFunc.FirstDateOfMonth(); //new Date(d.getFullYear(), d.getMonth(), 1);
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
                    DataTblobj.orderNo = $scope.i.orderNo == undefined ? '' : $scope.i.orderNo;
                    DataTblobj.DeclarationNo = $scope.i.declarationNo == undefined ? '' : $scope.i.declarationNo;
                    DataTblobj.ManifestNo = $scope.i.manifestNo == undefined ? '' : $scope.i.manifestNo;
                    DataTblobj.OceanBLNo = $scope.i.oceanBLNo == undefined ? '' : $scope.i.oceanBLNo;
                    if (IsAdvSearch) {
                        DataTblobj.DateFrom = $scope.i.dateFrom == undefined ? null : $scope.i.dateFrom;
                        DataTblobj.DateTo = $scope.i.dateTo == undefined ? null : $scope.i.dateTo;
                    }
                    else {
                        DataTblobj.DateFrom = null;
                        DataTblobj.DateTo = null;
                    }

                    DataTblobj.HouseBLNo = $scope.i.houseBLNo == undefined ? '' : $scope.i.houseBLNo;
                    DataTblobj.VoyageNo = $scope.i.voyageNo == undefined ? '' : $scope.i.voyageNo;
                    DataTblobj.DeclarationType = $scope.i.declarationType == undefined ? '' : $scope.i.declarationType;

                    DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    DataTblobj.limit = params.count();
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        DataTblobj.sortColumn = orderBy.substring(1);
                        DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                    }

                    k9Service.GetTableList(DataTblobj).then(function (res) {
                        
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
        $window.parent.MainModuleFunction(obj, 'k9declaration', 'k9 Declaration');
    };
}]);