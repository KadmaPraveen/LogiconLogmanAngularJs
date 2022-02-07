angular.module('LogiCon').controller('BookingInquiryCntrl', ['$scope', 'MerchantProfileService', 'BookingInquiryService', 'limitToFilter', function ($scope, MerchantProfileService, BookingInquiryService, limitToFilter) {
    $scope.bi = {};
    $scope.AgentResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.MerchantResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.ForeignAgentsResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'liner').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });        
    };

    $scope.getLookupData = function () {
        BookingInquiryService.GetLookupData().then(function (d) {
            $scope.lookUpData = d.data;
        }, function (err) { });
    };

    $scope.getLookupData();
}]);