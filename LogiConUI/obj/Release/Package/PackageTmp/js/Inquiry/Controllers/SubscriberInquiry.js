angular.module('LogiCon').controller('SubscriberInquiryCntrl', ['$scope', 'PendingBillingService', 'CompanyService', 'limitToFilter', 'growlService', '$location', 'UtilityFunc',
    function ($scope, PendingBillingService, CompanyService, limitToFilter, growlService, $location, UtilityFunc) {
        $scope.pb = {};
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dataGridNorecords = UtilityFunc.DataGridNorecords();
        $scope.pb.ToDate = moment();
        $scope.pb.FromDate = UtilityFunc.FirstDateOfMonth();
        
        $scope.showLoading = true;
        $scope.showSubscriber = false;
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
            //if ($scope.isFrmBillingPendingIsValid) {
                PendingBillingService.SearchPendingBilling(pb).then(function (d) {
                    
                    if (d.data.length > 0) {
                        $scope.showSubscriber = true;
                    }
                    else
                        $scope.showSubscriber = false;
                    $scope.subscriberList = d.data;
                }, function () { });
            //} else {
            //    growlService.growl('Please enter all mandatory fields', 'danger');
            //}
        };
        $scope.viewInfo = function (companyID) {
            $location.path('/operation/subscribers/' + companyID);
        };
    }]);