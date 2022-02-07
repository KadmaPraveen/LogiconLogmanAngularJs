angular.module('LogiCon').controller('CountryCntrl', ['$scope', 'CountryService', '$uibModal', 'Utility', function ($scope, CountryService, $uibModal, Utility) {
    $scope.GetCountryList = function (skip, take) {
        CountryService.GetCountryList(skip, take).then(function (d) {            
            $scope.countryList = d.data.countryList;
            $scope.totalItems = d.data.totalItems;
        }, function () { });
    };

    $scope.getData = function () {
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        $scope.GetCountryList(skip, $scope.limit);
    };

    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.GetCountryList(0, $scope.limit);

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.EditCountry = function (countryCode) {
       
        if (countryCode == 'NEW')
            $scope.truefalse = false;
        else
            $scope.truefalse = true;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/country/add-country.html?v=' + Utility.Version,
            controller: 'EditCountryCntrl',
            size: 'md',
            resolve: {
                CountryCode: function () {
                    return countryCode;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.getData();
        }, function () {
            
        });
    };

    $scope.DeleteCountry = function (countryCode) {
        CountryService.DeleteCountry(countryCode).then(function (d) {
            $scope.getData();
        }, function () { });
    };
}]);



