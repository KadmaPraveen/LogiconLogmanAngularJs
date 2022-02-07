angular.module('LogiCon').controller('StandardQuotationListCntrl', ['$scope', '$uibModal', 'CustomerQuotationService', 'UtilityFunc', 'growlService', '$window', '$stateParams', 'NgTableParams',
    function ($scope, $uibModal, CustomerQuotationService, UtilityFunc, growlService, $window, $stateParams, NgTableParams) {

        //$scope.StandardQuotationList = function () {
        //    CustomerQuotationService.getCustomerQuotationListByType(3860).then(function (d) {
        //        $scope.quotationlist = d.data;
        //    }, function () { });
        //};

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
                        DataTblobj.quotationtype = 3860;
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

        $scope.BroadCastDeclaration = function (obj) {
            $window.parent.MainModuleFunction(obj, 'standardquotation', 'standard quotation');
        };

        
    }]);