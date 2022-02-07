angular.module('LogiCon').controller('VendorQuotationlistCntrl', ['$scope', '$uibModal', 'CustomerQuotationService', 'growlService', 'UtilityFunc', '$state', 'NgTableParams', '$window',
    function ($scope, $uibModal, CustomerQuotationService,growlService, UtilityFunc, $state, NgTableParams, $window) {

        //$scope.VendorQuotationlist = function () {
        //    debugger;
        //    CustomerQuotationService.getCustomerQuotationListByType(3862).then(function (d) {
        //        $scope.quotationlist = d.data;
        //    }, function () { });
        //};


        $scope.BroadCastDeclaration = function (obj) {
            $window.parent.MainModuleFunction(obj, 'vendorquotation', 'vendor quotation');
        };

        var DataTblobj = {};
        $scope.GetTableData = function () {
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
                        DataTblobj.quotationtype = 3862;
                        DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                        DataTblobj.limit = params.count();
                        if (params.sorting()) {
                            var orderBy = params.orderBy()[0];

                            DataTblobj.sortColumn = orderBy.substring(1);
                            DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                        }

                        CustomerQuotationService.GetTableList(DataTblobj).then(function (res) {
                            params.total(res.data.records);
                            $defer.resolve(res.data.data);
                        }, function (err) { })
                    }
                });
        };
        $scope.GetTableData();

        //$scope.VendorQuotationlist();
    }]);