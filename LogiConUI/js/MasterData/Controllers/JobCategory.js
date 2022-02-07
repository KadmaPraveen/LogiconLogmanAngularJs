angular.module('LogiCon').controller('JobCategoryCntrl', ['$scope', '$uibModal', 'JobCategoryService', 'growlService', '$location', 'NgTableParams',
    function ($scope, $uibModal, JobCategoryService, growlService, $location, NgTableParams) {
        
        $scope.AddJobCategory = function () {
            $location.path('/masterdata/jobcategory/add/NEW');
        };       

        var DataTblobj = {};
        $scope.GetTableData = function () {
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

                        JobCategoryService.GetTableList(DataTblobj).then(function (res) {
                            params.total(res.data.records);
                            $defer.resolve(res.data.data);
                        }, function (err) { })
                    }
                });
        };

        $scope.DeleteJobCategory = function (code) {            
            if (confirm('Are you sure, you want to delete \'' + code + '\' ?')) {

                JobCategoryService.DeleteJobCategory(code).then(function (d) {
                    growlService.growl('Deleted successfully', 'success');
                    $scope.GetTableData();
                }, function (err) { });
            }
        }

        $scope.GetTableData();
        
    }]);