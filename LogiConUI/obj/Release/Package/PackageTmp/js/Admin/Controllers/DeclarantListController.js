angular.module('LogiCon').controller('DeclarantListController', ['$scope', 'DeclarantService', '$location', '$state', 'growlService', 'NgTableParams', '$filter', function ($scope, DeclarantService, $location, $state, growlService, NgTableParams, $filter) {

    $scope.GetDeclarantList = function () {

        DeclarantService.GetDeclarantList().then(function (d) {
            $scope.declarantList = d.data;
            $scope.ngTblDeclarant();
        }, function (err) { });
    }
    $scope.DeleteDeclarant = function (declarantId) {
        DeclarantService.deleteDeclarant(declarantId).then(function (d) {
            growlService.growl('DELETED SUCCESSFULLY', 'danger');
            $scope.GetDeclarantList();
        }, function (err) {
           
        });
    }
    //$scope.GetDeclarantList();


    /*Table rows*/

    $scope._declarantIndex = -1;
    var DataTblobj = {};
    $scope.ngTblDeclarant = function () {
       
        $scope.tblDeclarant = new NgTableParams({
            page: 0,
            count: 10,
            sorting: {
                name: 'desc'
            }
        }, {
            counts: [10, 20, 30],
            getData: function ($defer, params) {

               
                DataTblobj.BranchID = null;
                DataTblobj.ID = $scope.ID == undefined ? null : $scope.ID;
                DataTblobj.Name = $scope.Name == undefined ? null : $scope.Name;
                DataTblobj.Designation = $scope.Designation == undefined ? null : $scope.Designation;

                DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                DataTblobj.limit = params.count();
                if (params.sorting()) {
                    var orderBy = params.orderBy()[0];

                    DataTblobj.sortColumn = orderBy.substring(1);
                    DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                }
                DeclarantService.GetDeclarantDatatable(DataTblobj).then(function (res) {
                   
                    params.total(res.data.records);
                    $defer.resolve(res.data.data);
                }, function (err) { });

            }
        })
    };

    $scope.ngTblDeclarant();


}]);