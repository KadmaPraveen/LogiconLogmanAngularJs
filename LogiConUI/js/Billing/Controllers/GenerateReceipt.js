angular.module('LogiCon').controller('GenerateReceiptCntrl', ['$scope', '$uibModal', '$stateParams', 'PaymentService', 'CustomerInvoiceService', 'growlService', '$timeout', '$location', function ($scope, $uibModal, $stateParams, PaymentService, CustomerInvoiceService, growlService, $timeout, $location) {
    var paymentNo = $stateParams.paymentno;
    var statementNo = $stateParams.statementno;
    $scope.showLoading = true;
    $scope.gi = {};
    if (!angular.isUndefined(paymentNo) && !angular.isUndefined(statementNo)) {
        PaymentService.GetPayment(paymentNo, statementNo).then(function (d) {
            $scope.showLoading = false;
            $scope.gi = d.data;
            console.log(JSON.stringify(d.data));
        }, function (err) { });
    }

    $scope.ApprovePayment = function (branchId, statementNo, paymentNo) {
        $scope.showLoading = true;
        PaymentService.ApprovePayment(branchId, paymentNo, statementNo).then(function (d) {
            $scope.showLoading = false;
            $timeout(function () {
                $location.path('/operation/subscriberslist');
            }, 500);
            growlService.growl('Payment Approved Successfully', 'success');
        }, function (err) { });
    };

    $scope.DeletePayment = function (branchId, statementNo, paymentNo) {
        $scope.showLoading = true;
        PaymentService.DeletePayment(branchId, paymentNo, statementNo).then(function (d) {
            $scope.showLoading = false;
            growlService.growl('Payment Deleted Successfully', 'success');
        }, function (err) { });
    };    

    

    CustomerInvoiceService.GetLookupData().then(function (d) {
        $scope.lookupData = d.data;
        $scope.showLoading = false;
    }, function (err) { });
}]);
