angular.module('LogiCon').controller('WHCustomerInvoiceCntrl', ['$scope', 'Utility', function ($scope, Utility) {
    $scope.tabs = [
        { title: 'General Info', content: 'Js/Billing/Templates/WHCustomerInvoice/generalinfo.html?v=' + Utility.Version, active: true, disabled: false },
        { title: 'Charge Details', content: 'Js/Billing/Templates/WHCustomerInvoice/chargedetails.html?v=' + Utility.Version, active: false, disabled: false }
    ];
}]);