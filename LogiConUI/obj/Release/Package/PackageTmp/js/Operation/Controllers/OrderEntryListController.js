angular.module('LogiCon').controller('OrderEntryListCntrl', ['$scope', 'OrderEntryListService', '$stateParams', 'UtilityFunc', '$state', 'NgTableParams','$rootScope','$location','$window',
    function ($scope, OrderEntryListService, $stateParams, UtilityFunc, $state, NgTableParams, $rootScope, $location, $window) {
        $scope.IsAdvSearch = false;
        $scope.Search = {};
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.Search.DateFrom = UtilityFunc.FirstDateOfMonth(); //new Date(d.getFullYear(), d.getMonth(), 1);
        $scope.Search.DateTo = moment();

        $scope.isFrmSearchValid = false;
        $scope.$watch('oelCntrl.frmSearch.$valid', function (isValid) {
            $scope.isFrmSearchValid = isValid;
        });

        $scope.refresh = function () {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }

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
                        
                        DataTblobj.BranchID = $stateParams.branchID == undefined ? '' : $stateParams.branchID;
                        DataTblobj.OrderNo = $scope.Search.OrderNo == undefined ? '' : $scope.Search.OrderNo;
                        DataTblobj.Voyageno = $scope.Search.VoyageNo == undefined ? '' : $scope.Search.VoyageNo;
                        DataTblobj.ManifestNo = $scope.Search.ManifestNo == undefined ? '' : $scope.Search.ManifestNo;
                        DataTblobj.FreightForwarder = $scope.Search.FreightForwarder == undefined ? '' : $scope.Search.FreightForwarder;
                        DataTblobj.ForwardingAgent = $scope.Search.ForwardingAgent == undefined ? '' : $scope.Search.ForwardingAgent;
                        if (IsAdvSearch) {
                            DataTblobj.DateFrom = $scope.Search.DateFrom == undefined ? null : $scope.Search.DateFrom;
                            DataTblobj.DateTo = $scope.Search.DateTo == undefined ? null : $scope.Search.DateTo;
                        }
                        else {
                            DataTblobj.DateFrom = null;
                            DataTblobj.DateTo = null;
                        }

                        DataTblobj.HouseBLNo = $scope.Search.HouseBLNo == undefined ? '' : $scope.Search.HouseBLNo;
                        DataTblobj.ShipperName = $scope.Search.Shipper == undefined ? '' : $scope.Search.Shipper;
                        DataTblobj.ConsigneeName = $scope.Search.Consignee == undefined ? '' : $scope.Search.Consignee;
                        DataTblobj.VesselName = $scope.Search.vesselName == undefined ? '' : $scope.Search.vesselName;
                        DataTblobj.Customer = $scope.Search.Customer == undefined ? '' : $scope.Search.Customer;
                        
                        DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                        DataTblobj.limit = params.count();
                        if (params.sorting()) {
                            var orderBy = params.orderBy()[0];

                            DataTblobj.sortColumn = orderBy.substring(1);
                            DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                        }
                        OrderEntryListService.GetTableList(DataTblobj).then(function (res) {
                            
                            params.total(res.data.records);
                            $defer.resolve(res.data.data);
                        }, function (err) { })
                    }
                });
        };

        $scope.BroadCastOrder = function (obj) {
            $window.parent.MainModuleFunction(obj, 'orderentry', 'Order Entry');            
        };
       
        $scope.GetTableData($scope.IsAdvSearch);       
        
    }]);