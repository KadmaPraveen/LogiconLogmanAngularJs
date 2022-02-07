angular.module('LogiCon').controller('CrInquiryCntrl', ['$scope', '$state', '$stateParams', 'NgTableParams', 'ContainerRequestService', 'UtilityFunc', '$window',
    function ($scope, $state, $stateParams, NgTableParams, ContainerRequestService, UtilityFunc, $window) {
        $scope.IsAdvSearch = false;
        $scope.i = {};

        debugger;
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.i.dateFrom = UtilityFunc.FirstDateOfMonth();
        $scope.i.dateTo = moment();

        $scope.refresh = function () {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }
        var DataTblobj = {};

        $scope.GetTableData = function (IsAdvSearch) {
            debugger;
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
                        DataTblobj.requestNo = $scope.i.requestNo == undefined ? '' : $scope.i.requestNo;
                        DataTblobj.ConsigneeName = $scope.i.ConsigneeName == undefined ? '' : $scope.i.ConsigneeName;
                        DataTblobj.HaulierName = $scope.i.HaulierName == undefined ? '' : $scope.i.HaulierName;
                        DataTblobj.ShippingAgentName = $scope.i.ShippingAgentName == undefined ? '' : $scope.i.ShippingAgentName;
                        if (IsAdvSearch) {
                            DataTblobj.DateFrom = $scope.i.dateFrom == undefined ? null : $scope.i.dateFrom;
                            DataTblobj.DateTo = $scope.i.dateTo == undefined ? null : $scope.i.dateTo;
                        }
                        else {
                            DataTblobj.DateFrom = null;
                            DataTblobj.DateTo = null;
                        }
                        DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                        DataTblobj.limit = params.count();
                        if (params.sorting()) {
                            var orderBy = params.orderBy()[0];

                            DataTblobj.sortColumn = orderBy.substring(1);
                            DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                        }
                        ContainerRequestService.GetTableList(DataTblobj).then(function (res) {
                            debugger;
                            params.total(res.data.records);
                            $defer.resolve(res.data.data);
                        }, function (err) {
                            debugger;
                        })
                    }
                });
        };

   


        $scope.BroadCastDeclaration = function (obj) {
            $window.parent.MainModuleFunction(obj, 'containerrequest', 'Container Request');
        };
        $scope.GetTableData($scope.IsAdvSearch);
    }]);