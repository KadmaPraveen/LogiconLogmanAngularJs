angular.module('LogiCon').controller('AddEditCommodityCodeCntrl', ['$scope', '$uibModalInstance', 'commodityCode', 'CommodityCodeService', 'growlService',
    function ($scope, $uibModalInstance, commodityCode, CommodityCodeService, growlService) {
   
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $scope.isfrmAddCommodityCode = false;
    };

    $scope.isfrmAddCommodityCode = false;
    $scope.$watch('frmAddCommodityCode.$valid', function (isValid) {
        $scope.isfrmAddCommodityCode = isValid;
    });

    $scope.AddCommodityCode = function (cmc) {
       
        if ($scope.isfrmAddCommodityCode) {
            CommodityCodeService.SaveCommodityCode(cmc).then(function (d) {
                $uibModalInstance.close();
                growlService.growl(d.data, 'success');

            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };
    $scope.truefalse = false;

    if (commodityCode != -1) {
       
        CommodityCodeService.GetCommodityByCode(commodityCode).then(function (d) {
            $scope.truefalse = true;
            $scope.commoditycodeList = d.data;
        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        })
    }

}]);