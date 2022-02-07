angular.module('LogiCon').controller('k8InquiryCntrl', ['$scope', 'k8Service', 'UtilityFunc', '$state', '$stateParams', 'NgTableParams','$window',
    function ($scope, k8Service, UtilityFunc, $state, $stateParams, NgTableParams, $window) {

        $scope.init = function () {
            $scope.i = {};

            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.i.dateFrom = UtilityFunc.FirstDateOfMonth();
            $scope.i.dateTo = moment();

            $scope.GetTableData($scope.IsAdvSearch);
        };


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

                        k8Service.GetTableList(DataTblobj).then(function (res) {
                            params.total(res.data.records);
                            $defer.resolve(res.data.data);
                        }, function (err) { })
                    }
                });
        };
        

        $scope.refresh = function () {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }

        $scope.BroadCastDeclaration = function (obj) {
            $window.parent.MainModuleFunction(obj, 'k8declaration', 'k8 Declaration');
        };

        $scope.init();
    }]);