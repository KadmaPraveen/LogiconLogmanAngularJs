angular.module('LogiCon').controller('CostSheetListCntrl', ['$scope', 'CostSheetService', '$stateParams', 'Utility', 'limitToFilter', 'UtilityFunc', 'growlService','$window','NgTableParams',
    function ($scope, CostSheetService, $stateParams, Utility, limitToFilter, UtilityFunc, growlService, $window, NgTableParams) {
        var DataTblobj = {};

        $scope.GetTableData = function (issearch) {
            debugger;
            $scope.ngTblData = new NgTableParams({
                page: 0,
                count: 10,
                sorting: {
                    CreatedOn: 'desc'
                }
            }, {
                counts: [10, 20, 30],
                getData: function ($defer, params) {
                    DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    DataTblobj.limit = params.count();
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        DataTblobj.sortColumn = orderBy.substring(1);
                        DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                    }
                    debugger;
                    CostSheetService.GetTableData(DataTblobj).then(function (res) {
                        debugger;
                        console.log(res.data.records + "" + res.data.data);
                        params.total(res.data.records);
                        $defer.resolve(res.data.data);
                    }, function (err) { });
                }
            });
        }
        
        $scope.GetTableData(true);
        $scope.refresh = function () {
            $state.transitionTo($state.current, $stateParams)({
                reload: true,
                inherit: false,
                notify:true,
            });
        }
    
        $scope.BroadCastCostSheet = function (obj) {
            debugger;
            $window.parent.MainModuleFunction(obj, 'costsheetListorderno', 'cost sheet');
        };

      

    }]);


