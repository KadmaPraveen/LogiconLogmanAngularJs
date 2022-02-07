
angular.module('LogiCon').controller('addEditAddressCntrl', ['$scope', '$uibModalInstance', 'CountryService', 'growlService', 'addressObj', 'limitToFilter', '$http', 'CountryService',
    function ($scope, $uibModalInstance, CountryService, growlService, addressObj, limitToFilter, $http, CountryService) {
        
      

      
        $scope.address =angular.copy(addressObj);
       
       
        if ($scope.address.AddressId != -1) {
            CountryService.GetCountry($scope.address.CountryCode).then(function (res) {                
                $scope.address.CountryName = res.data.CountryName;
            }, function (err) { });
        }


        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
        
        //CountryService.GetCountriesList().then(function (d) {
        //    $scope.CountriesList = d.data;
        //}, function () { });

        $scope.countryResults = function (text) {
            return CountryService.SearchCountries(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.countrySelect = function (item) {
            $scope.address.CountryCode = item.Value;
        };

        $scope.isfrmAddressValid = false;
        $scope.$watch('frmAddress.$valid', function (isValid) {
            $scope.isfrmAddressValid = isValid;
        });

        $scope.AddAddress = function (address) {
            
            if ($scope.isfrmAddressValid) {
                $uibModalInstance.close(address);
            }
            else {
                growlService.growl('Please enter all mandatory fields..', 'danger');
            }
        };


    }]);

//testing