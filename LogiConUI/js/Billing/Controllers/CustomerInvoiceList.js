angular.module('LogiCon').controller('CustomerInvoiceListCntrl', ['$scope', '$uibModal', 'CustomerInvoiceService', '$stateParams', 'DataTransferService', '$location', 'Utility', 'limitToFilter', '$http', 'UtilityFunc', '$state', 'NgTableParams', '$window','MerchantProfileService',
    function ($scope, $uibModal, CustomerInvoiceService, $stateParams, DataTransferService, $location, Utility, limitToFilter, $http, UtilityFunc, $state, NgTableParams, $window, MerchantProfileService) {
        $scope.IsAdvSearch = false;
        $scope.i = {};
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.i.dateFrom = UtilityFunc.FirstDateOfMonth(); //new Date(d.getFullYear(), d.getMonth(), 1);
        $scope.i.dateTo = moment();
        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }
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
                        DataTblobj.InvoiceNo = $scope.i.InvoiceNo == undefined ? '' : $scope.i.InvoiceNo;
                        DataTblobj.InvoiceDate = $scope.i.InvoiceDate == undefined ? null : $scope.i.InvoiceDate;
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
                            DataTblobj.InvoiceType = 1190;
                        }
                        debugger;
                        CustomerInvoiceService.GetTableList(DataTblobj).then(function (res) {
                            debugger;
                            params.total(res.data.records);
                            $defer.resolve(res.data.data);
                        }, function (err) { })
                    }
                });
        };

        $scope.BroadCastInvoice = function (obj) {
            debugger;
            $window.parent.MainModuleFunction(obj, 'customerinvoiced', 'customer Invoice');
        };

        $scope.GetTableData($scope.IsAdvSearch);
        debugger;
        //$scope.DeleteCustomerInvoice = function () {
        //    debugger;
        //    UtilityFunc.removeArrayElementByKey(Invoiceno, 'Index', index);
        //    $scope.GetTableData($scope.IsAdvSearch);
        //};
       
    }]);