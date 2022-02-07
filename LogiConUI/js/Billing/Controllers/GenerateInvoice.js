angular.module('LogiCon').controller('GenerateInvoiceCntrl', ['$scope', '$uibModal', 'CustomerInvoiceService', '$stateParams', 'DataTransferService', '$location', 'Utility', 'limitToFilter', '$http', 'UtilityFunc', 'PaymentService', 'growlService', 'StatementService',
    function ($scope, $uibModal, CustomerInvoiceService, $stateParams, DataTransferService, $location, Utility, limitToFilter, $http, UtilityFunc, PaymentService, growlService, StatementService) {
        $scope.showLoading = true;
        $scope.gi = {};
        var statementNo = $stateParams.statementno;
        if (!angular.isUndefined(statementNo)) {
            StatementService.GetStatement(statementNo).then(function (d) {
                console.log(JSON.stringify(d.data));
                $scope.gi = d.data;
                $scope.showLoading = false;
            }, function (err) { });
        }

        CustomerInvoiceService.GetLookupData().then(function (d) {
            $scope.lookupData = d.data;            
            $scope.showLoading = false;
        }, function (err) { });


        $scope.GeneratePayment = function (branchId, statementNo) {
            $scope.showLoading = true;
            PaymentService.GeneratePayment(branchId, statementNo).then(function (d) {
                $scope.showLoading = false;
                $location.path('/billing/generatereceipt/' + d.data + '/' + statementNo);
            }, function (err) {
                growlService.growl(err.data.ExceptionMessage, 'danger');
            });
        };
        

        $scope.DeleteStatement = function (branchId, statementNo) {
            $scope.showLoading = true;
            StatementService.DeleteStatement(branchId, statementNo).then(function (d) {
                $scope.showLoading = false;
                growlService.growl('Deleted Successfully', 'success');
                $location.path('/owner')
            }, function (err) { });
        };

        $scope.ApproveStatement = function (branchId, statementNo) {
            $scope.showLoading = true;
            StatementService.ApproveStatement(branchId, statementNo).then(function (d) {
                $scope.showLoading = false;
                growlService.growl('Approved Successfully', 'success');
                $scope.gi.IsApproved = true;
            }, function (err) { });
        };
}]);
