angular.module('LogiCon').controller('EditCountryCntrl', ['$scope', '$uibModalInstance', 'CountryCode', 'CountryService', function ($scope, $uibModalInstance, CountryCode, CountryService) {
    if (CountryCode != 'NEW') {
        CountryService.GetCountry(CountryCode).then(function (d) {
            $scope.country = d.data;
        }, function () { });
    }

    $scope.SaveCountry = function (country) {
        CountryService.SaveCountry(country).then(function (d) {
            $uibModalInstance.close();
        }, function () { });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);