angular.module('LogiCon').controller('TariffDetailCntrl', ['$scope', '$uibModalInstance', 'dataObj', '$filter', 'UtilityFunc', 'growlService', function ($scope, $uibModalInstance, dataObj, $filter, UtilityFunc, growlService) {
    
    $scope.IsModule = false;
    $scope.IsTransaction = false;
    $scope.IsDisableModuleSelection = false;
    var tempArray = new Array();

    debugger;
    angular.copy(dataObj.lookUpData.moduleList, tempArray);
   
    if (angular.isUndefined(dataObj.tariffDetail.Module)) {
        angular.forEach(dataObj.tariffDetailArray, function (item, key) {
            var obj = $filter('filter')(tempArray, { Value: item.Module })[0];
            if (!angular.isUndefined(obj)) {
                tempArray = UtilityFunc.removeArrayElementByKey(tempArray, 'Value', obj.Value);
            }
        });
    } else {
        $scope.IsDisableModuleSelection = true;
    }

    $scope.tariffDetail =angular.copy(dataObj.tariffDetail);
    $scope.appendLable = $scope.tariffDetail.TariffModeDescription;
    if ($scope.tariffDetail.TariffMode == 26150)
        $scope.IsModule = true;
    else
        $scope.IsModule = false;

    if ($scope.tariffDetail.TariffMode == 26151)
        $scope.IsTransaction = true;
    else
        $scope.IsTransaction = false;
    
    $scope.LookupData = {
        moduleList: tempArray,
        associationList: dataObj.lookUpData.associationList,
        tariffModeList: dataObj.lookUpData.tariffModeList,
        transDiscountType: dataObj.lookUpData.transDiscountType

    }; 
    $scope.isFrmTariffDetailValid = false;
    $scope.$watch('frmTariffDetail.$valid', function (isValid) {
        
        $scope.isFrmTariffDetailValid = isValid;
    });
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.SlabToBlur = function () {
        var slabFrom = parseInt($scope.tariffDetail.SlabFrom);
        var slabTo = parseInt($scope.tariffDetail.SlabTo);

        if (slabFrom >= slabTo || isNaN(slabTo)) {
            $scope.ErrorMsg = true;
            $scope.tariffDetail.SlabTo = null;            
        }
        else {
            $scope.ErrorMsg = false;
        }
    };

    $scope.SaveTariffDetail = function (tariffDetail) {
        debugger;
               //$scope.submitted = true;
               if ($scope.isFrmTariffDetailValid) {
                   //TariffService.SaveTariff(tariffDetail).then(function (d) {
                       $uibModalInstance.close(tariffDetail);
                   //})
                }
    };

    
    $scope.TariffModeChange = function () {
        //
        $scope.tariffDetail.TariffModeDescription = $filter('filter')($scope.LookupData.tariffModeList, { Value: $scope.tariffDetail.TariffMode })[0].Text;
        $scope.appendLable = $scope.tariffDetail.TariffModeDescription;
        if ($scope.tariffDetail.TariffMode == 26150)
            $scope.IsModule = true;
        else
            $scope.IsModule = false;

        if($scope.tariffDetail.TariffMode == 26151)
            $scope.IsTransaction = true;
        else
            $scope.IsTransaction = false;
        
    };
    //jh
    $scope.ValidatePercentage = function () {
       
        if ($scope.tariffDetail.Percentage > 100) {
            $scope.tariffDetail.Percentage = '';
            growlService.growl('Discount Percentage Rate cannot exceed 100', 'danger');
        }
    };
    $scope.ValidateTariffRate = function () {
       
        if ($scope.tariffDetail.Percentage > 100) {
            $scope.tariffDetail.Percentage = '';
            growlService.growl('Tariff Rate cannot exceed 100', 'danger');
        }
    };

}]);