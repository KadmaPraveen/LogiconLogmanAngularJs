angular.module('LogiCon').controller('CommodityCodeCntrl', ['$scope', 'CommodityCodeService', '$uibModal', '$window', '$stateParams', 'growlService', 'Utility',
    function ($scope, CommodityCodeService, $uibModal, $window, growlService, $stateParams, Utility) {

  
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.AddCommodityCode = function (Code) {
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/CommodityCode/add-commodity-code.html?v=' + Utility.Version,
            controller: 'AddEditCommodityCodeCntrl',
            size: 'md',
            resolve: {
                commodityCode: function () {
                    return Code;
                }
            }
        });

        modalInstance.result.then(function (cmc) {
            //$scope.getData();
            $scope.GetList();
        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });
    };


    $scope.GetList = function () {
       
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        CommodityCodeService.GetCommodityCodeList(skip, $scope.limit).then(function (d) {
           
            $scope.commoditycodeList = d.data.commoditycodeList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.pageChanged = function () {
        $scope.GetList();
    };

    $scope.getData = function (skip, take) {
        
        CommodityCodeService.GetCommodityCodeList(skip, take).then(function (d) {
           
            $scope.commoditycodeList = d.data.commoditycodeList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
    };

    $scope.getData(0, $scope.limit);


    $scope.DeleteCommodityCode = function (commodityCode) {
        if ($window.confirm('Are you sure, you want to delete \'' + commodityCode + '\' ?')) {
            CommodityCodeService.DeleteCommodityCode(commodityCode).then(function (d) {
                growlService.growl('Deleted successfully.', 'success');
                $scope.getData();
            }, function (err) { });
        }
    };


}]);


