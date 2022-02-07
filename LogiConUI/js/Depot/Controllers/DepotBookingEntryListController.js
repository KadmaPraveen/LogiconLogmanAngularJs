angular.module('LogiCon').controller('DepotBookingEntryListCntrl', ['$scope', '$q', 'UtilityFunc', '$state', '$stateParams', 'NgTableParams', '$window', 'DepotBookingService',
    function ($scope, $q, UtilityFunc, $state, $stateParams, NgTableParams, $window, DepotBookingService) {
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.Search = {};
    $scope.dateFormat = UtilityFunc.DateFormat();
    $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
    $scope.dataGridNorecords = UtilityFunc.DataGridNorecords();

    $scope.Search.DateFrom = UtilityFunc.FirstDateOfMonth(); //new Date(d.getFullYear(), d.getMonth(), 1);
    $scope.Search.DateTo = moment();
    $scope.refresh = function () {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }

    $scope.IsAdvSearch = false;
    $scope.i = {};


    $scope.dateFormat = UtilityFunc.DateFormat();
    $scope.i.dateFrom = UtilityFunc.FirstDateOfMonth(); //new Date(d.getFullYear(), d.getMonth(), 1);
    $scope.i.dateTo = moment();

    $scope.isFrmSearchValid = true;

    var obj = {};


    $scope.SearchBookingEntries = function (IsAdvSearch) {

        $scope.ngTblData = new NgTableParams({
            page: 0,
            count: 10,
            sorting: {
                CreatedOn: 'desc'
            }
        }, {
            counts: [10, 20, 30],
            getData: function ($defer, params) {

                obj.BranchID = null;
                obj.orderNo = $scope.i.OrderNo == undefined ? '' : $scope.i.OrderNo;
                obj.VoyageNo = $scope.i.VoyageNo == undefined ? '' : $scope.i.VoyageNo;
                if (IsAdvSearch) {
                    obj.DateFrom = $scope.i.dateFrom == undefined ? null : $scope.i.dateFrom;
                    obj.DateTo = $scope.i.dateTo == undefined ? null : $scope.i.dateTo;
                }
                else {
                    obj.DateFrom = null;
                    obj.DateTo = null;
                }

                obj.bookingNo = $scope.i.BookingNo == undefined ? '' : $scope.i.BookingNo;
                obj.CustomerName = $scope.i.CustomerName == undefined ? '' : $scope.i.CustomerName;
                obj.vesselName = $scope.i.VesselName == undefined ? null : $scope.i.VesselName;
                obj.IsDefault = $scope.i.IsDefault == undefined ? null : $scope.i.IsDefault;
                obj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                obj.limit = params.count();
                if (params.sorting()) {
                    var orderBy = params.orderBy()[0];

                    obj.sortColumn = orderBy.substring(1);
                    obj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                }

                if ($scope.isFrmSearchValid) {
                    DepotBookingService.GetTableData(obj).then(function (res) {
                        debugger;
                        params.total(res.data.records);
                        $defer.resolve(res.data.data);
                    }, function (err) { });
                }
            }
        });
    };
    $scope.BroadCastDeclaration = function (obj) {
        $window.parent.MainModuleFunction(obj, 'depotbookingentry', 'depot bookingentry');
    };


    $scope.SearchBookingEntries($scope.IsAdvSearch);
}]);