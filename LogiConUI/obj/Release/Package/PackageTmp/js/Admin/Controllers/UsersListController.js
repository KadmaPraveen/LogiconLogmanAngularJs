
angular.module('LogiCon').controller('UsersListCntrl', ['$scope', 'UserProfileService', 'NgTableParams', function ($scope, UserProfileService, NgTableParams) {
    $scope.showLoading = true;
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.IsAdvSearch = false;
    $scope.Search = {};
   
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
                    DataTblobj.EmailID = $scope.Search.EmailID == undefined ? null : $scope.Search.EmailID;
                    DataTblobj.Name = $scope.Search.Name == undefined ? null : $scope.Search.Name;
                    DataTblobj.Designation = $scope.Search.Designation == undefined ? null : $scope.Search.Designation;
                    DataTblobj.UserType = $scope.Search.UserType == undefined ? null : $scope.Search.UserType;
                    DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    DataTblobj.limit = params.count();
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        DataTblobj.sortColumn = orderBy.substring(1);
                        DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                    }
                 
                    UserProfileService.GetTableData(DataTblobj).then(function (d) {
                      
                        params.total(d.data.records);
                        $defer.resolve(d.data.data);
                    }, function (err) { });
                }
            });
    };
    
    UserProfileService.getLookupData().then(function (d) {
       
        $scope.lookUpData = d.data;
        $scope.showLoading = false;
        }, function (err) { });
    
   
    $scope.GetTableData();

}]);