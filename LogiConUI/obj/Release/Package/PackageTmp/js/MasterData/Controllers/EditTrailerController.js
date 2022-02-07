angular.module('LogiCon').controller('EditTrailerController', ['$scope', '$uibModalInstance', 'limitToFilter', 'MerchantProfileService', 'TrailerMasterService', 'trailerID', function ($scope, $uibModalInstance, limitToFilter, MerchantProfileService, TrailerMasterService, trailerID) {
    $scope.truefalse = false;
    if (trailerID != 'NEW') {
        TrailerMasterService.GetTrailer(trailerID).then(function (d) {
            $scope.t = d.data;
            $scope.truefalse = true;
        }, function (err) { });
    }

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.VendorResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'vendor').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.CustomerSelected2 = function (item, type) {
        $scope.t[type] = item.Value;
    };

    $scope.GetLookupData = function () {
        TrailerMasterService.GetLookUpData().then(function (d) {            
            $scope.lookUpData = d.data;
        }, function (err) { });
    };

    $scope.isFrmTrailerValid = false;
    $scope.$watch('frmTrailer.$valid', function (isValid) {
        $scope.isFrmTrailerValid = isValid;
    });

    $scope.SaveTrailer = function (trailer) {
        if ($scope.isFrmTrailerValid) {
            TrailerMasterService.SaveTrailer(trailer).then(function (d) {
                $uibModalInstance.close();
            }, function (err) { });
        } else {

        }
    };

    $scope.GetLookupData();
}]);