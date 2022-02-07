angular.module('LogiCon').controller('ProcessMasterController', ['$scope', '$uibModal', 'growlService', 'Utility', 'ProcessMasterService','NgTableParams',
    function ($scope, $uibModal, growlService, Utility, ProcessMasterService, NgTableParams) {
    $scope.currentPage = 1;
    $scope.limit = 10;

    ProcessMasterService.getLookupData().then(function (d) {        
        $scope.lookupData = d.data;
    }, function (err) {
        growlService.growl(err.statusText, 'danger');
    });

    $scope.AddProcessMaster = function (Code) {        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/ProcessMaster/add-process-master.html?v=' + Utility.Version,
            controller: 'AddProcessMasterCntrl',
            size: 'lg',
            resolve: {
                pmCode: function () {
                    return Code;
                }
            }
        });

        modalInstance.result.then(function (pm) {            
            $scope.ProcessList();
        }, function (err) {
            //growlService.growl(err.statusText, 'danger');
        });
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
                    ProcessMasterService.GetTableList(DataTblobj).then(function (res) {                        
                        params.total(res.data.records);
                        $defer.resolve(res.data.data);
                    }, function (err) { })
                }
            });
    };    

    $scope.DeleteProcessMaster = function (code) {              
        if (confirm('Are you sure, you want to delete \'' + code + '\' ?')) {            
            ProcessMasterService.DeleteProcessMaster(code).then(function (d) {
                growlService.growl('Deleted successfully', 'success');
                $scope.GetTableData();
            }, function (err) { });
        }
    }    
    
    $scope.GetTableData();

    //$scope.IsDeleted = function (pm) {
       
    //    return pm.IsActive == false ? 'deleted' : 'ok';
    //}

         
}]);



