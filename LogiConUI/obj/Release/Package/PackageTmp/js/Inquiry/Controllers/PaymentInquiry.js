angular.module('LogiCon').controller('PaymentInquiryCntrl', ['$scope', 'PendingBillingService', 'CompanyService', 'limitToFilter', 'growlService', 'UtilityFunc',
    function ($scope, PendingBillingService, CompanyService, limitToFilter, growlService, UtilityFunc) {
    $scope.showLoading = true;
    $scope.pb = {};

    $scope.dateFormat = UtilityFunc.DateFormat();
    $scope.dataGridNorecords = UtilityFunc.DataGridNorecords();
    $scope.pb.ToDate = moment();
    $scope.pb.FromDate = UtilityFunc.FirstDateOfMonth();

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


    $scope.filterSelected = function (obj) {
        
        if ($scope.pb.type=="Ageing") {

        }
    };

    $scope.isFrmBillingPendingIsValid = false;
    $scope.$watch('frmSearch.$valid', function (isValid) {
        $scope.isFrmBillingPendingIsValid = isValid;
    });
    $scope.SearchPendingBilling = function (pb) {
        
        //console.log(JSON.stringify(pb));
        if ($scope.isFrmBillingPendingIsValid) {
            PendingBillingService.SearchPendingBilling(pb).then(function (d) {

            }, function () { });
        } else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    };
}]);