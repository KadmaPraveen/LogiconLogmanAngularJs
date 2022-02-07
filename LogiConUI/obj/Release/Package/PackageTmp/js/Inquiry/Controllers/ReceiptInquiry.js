angular.module('LogiCon').controller('ReceiptInquiryCntrl', ['$scope', 'PendingBillingService', 'CompanyService', 'limitToFilter', 'growlService', function ($scope, PendingBillingService, CompanyService, limitToFilter, growlService) {
    $scope.showLoading = true;
    $scope.pb = {};
    PendingBillingService.GetLookupData().then(function (d) {
        $scope.showLoading = false;
        $scope.lookupData = d.data;
    }, function () { });

    $scope.CompanyResults = function (text) {
        return CompanyService.SearchCompany(text).then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.CompanySelected = function (obj, type) {
        $scope.pb[type] = obj.Value;
    };

    $scope.isFrmBillingPendingIsValid = false;
    $scope.$watch('frmSearchPendingBilling.$valid', function (isValid) {
        $scope.isFrmBillingPendingIsValid = isValid;
    });
    $scope.SearchPendingBilling = function (pb) {
        console.log(JSON.stringify(pb));
        if ($scope.isFrmBillingPendingIsValid) {
            PendingBillingService.SearchPendingBilling(pb).then(function (d) {
                
            }, function () { });
        } else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    };
}]);