angular.module('LogiCon').controller('Categoryctrl', ['$scope', 'NgTableParams', 'categoryService', 'Utility', '$stateParams', function ($scope, NgTableParams, categoryService, Utility, $stateParams) {

    $scope.init = function () {        
        $scope.GetTableData();
    };
    
    $scope.GetTableData = function () {
        $scope.ngTblData = new NgTableParams({
            page: 1,
            count: 10,
        }, {
            getData: function ($defer, params) {
                var offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                var limit = params.count();
                categoryService.GetTableList(offset, limit).then(function (res) {
                    params.total(res.data.SNNCategoryList);
                    $scope.Image = Utility.BaseUrl + 'UploadImages/SNN/Category';
                    $defer.resolve(res.data.SNNCategoryList);
                }, function (err) { })
            }
        });
    }
    
    $scope.init();
}])