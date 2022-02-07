angular.module('LogiCon').controller('ProductMasterCntrl', ['$scope', 'ProductMasterService', 'MerchantProfileService', 'limitToFilter', 'growlService', 'Utility',
    function ($scope, ProductMasterService, MerchantProfileService, limitToFilter, growlService, Utility) {
    
    $scope.tabs = [
        { title: 'General', content: 'Js/MasterData/Templates/ProductMaster/general.html?v=' + Utility.Version, active: true, disabled: false },
        { title: 'Package Defination', content: 'Js/MasterData/Templates/ProductMaster/package-defination.html?v=' + Utility.Version, active: false, disabled: false }
    ];
   

    $scope.getLookUpData = function () {
        ProductMasterService.GetLookupData().then(function (d) {
           
            $scope.lookUpData = d.data;
        }, function (err) { });
    };


    $scope.truefalse = false;
    $scope.cancel = function () {
       
        $uibModalInstance.dismiss('cancel');
        $scope.isfrmAddContainerStatus = false;
    };
   

    $scope.isfrmProductMaster = false;
    $scope.$watch('frmProductMaster.$valid', function (isValid) {
        $scope.isfrmProductMaster = isValid;
    });



    $scope.AddProductMaster = function (productmaster) {      
        if ($scope.isfrmProductMaster) {
            ProductMasterService.SaveProductMaster(productmaster).then(function (d) {               
                $uibModalInstance.close();
                growlService.growl(d.data, 'success');
                $location.path('/MasterData/productmaster');
            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    }

    $scope.PrincipalCodeResults = function ($query) {       
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
           
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.PrinicipalSelected = function (item, type) {       
        if (type == 'PrincipalCode') {
            MerchantProfileService.GetMerchantProfile(item.Value).then(function (d) {                
                $scope.productmaster.PrincipalName = d.data.merchant.MerchantName;
            }, function (err) { });
        }
    };

    $scope.getLookUpData();
    $scope.enableDelete = true;

    $scope.GetProductMasterDetails = function ()
    {
       
        var productCode = $scope.productmaster.ProductCode;
        var principalCode = $scope.productmaster.PrincipalCode
        if (productCode != '' && principalCode)
        {
            ProductMasterService.GetProductMaster(productCode, principalCode).then(function (d) {               
                $scope.getLookUpData();
                $scope.productmaster = d.data;

                $scope.enableDelete = false;
            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
    }


    $scope.DeleteProductMasterDetails = function () {
        
        var productCode = $scope.productmaster.ProductCode;
        var principalCode = $scope.productmaster.PrincipalCode
        if (productCode != '' && principalCode) {
            if ($window.confirm('Are you sure, you want to delete \'' + productCode + '\' ?')) {
                ProductMasterService.DeleteProductMaster(productCode, principalCode).then(function (d) {
                    growlService.growl('Deleted successfully', 'success');
                    $scope.enableDelete = true;
                }, function (err) { growlService.growl(err.statusText, 'danger'); });
            }
        }
        else {
            alert("Please select Principal Code and Product Code");
        }
    }

}]);