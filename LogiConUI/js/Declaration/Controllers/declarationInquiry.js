angular.module('LogiCon').controller('DeclarationInquiryCtrl', ['$scope', 'UtilityFunc', function ($scope, UtilityFunc) {
    $scope.init = function () {
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.timeFormat = UtilityFunc.TimeFormat();
        $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
        $scope.isAdvSearch = false;
    }
    $scope.refresh = function () {
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    }
    $scope.DataTblObj = {};
    $scope.GetTableData = function (isAdvSearch) {
        $scope.ngTblData = new ngTableParams({
            page:0,
            count:10,
            sorted:{
               createdOn:'desc'
            },
            counts:[10,20,30],
            getData:function($defer,params){
                // DataTblObj.OrderNo = $scope.i.orderNo == undefined ? '' : $scope.i.orderNo;

                if (isAdvSearch) {
                    DataTblObj.dateFrom = $scope.i.dateFrom == undefined ? '' : $scope.i.dateFrom;
                    DataTblObj.dateTo = $scope.i.dateTo == undefined ? '' : $scope.i.dateTo;
                } else
                {
                    DataTblObj.dateFrom = null;
                    DataTblObj.dateTo = null;
                }
                DataTblObj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                DataTblObj.limit = params.count();
                if(params.sorting()){
                    var orderBy = params.orderBy()[0];
                    DataTblObj.sortColumn = orderBy.substring(1);
                    DataTblObj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                }
                //call the service
            }
        })
    }
    $scope.init();
}]);