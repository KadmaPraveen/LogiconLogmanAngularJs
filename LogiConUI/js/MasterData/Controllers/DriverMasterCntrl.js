angular.module('LogiCon').controller('DriverMasterCntrl', ['$scope', 'DriverMasterService', 'MerchantProfileService', 'CountryService', 'limitToFilter', '$stateParams', '$window', '$location',
    function ($scope, DriverMasterService, MerchantProfileService, CountryService, limitToFilter, $stateParams, $window, $location) {
    $scope.d = {};
    $scope.GetLookupData = function () {
        DriverMasterService.GetLookUpData().then(function (d) {            
            $scope.lookUpData = d.data;
        }, function (err) { });
    };

    $scope.VendorResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'vendor').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.isFrmValid = false;
    $scope.$watch('frmDriver.$valid', function (isValid) {
        $scope.isFrmValid = isValid;
    });

    $scope.SaveDriver = function (d) {
        if ($scope.isFrmValid) {
            DriverMasterService.SaveDriver(d).then(function (d) {
                
            }, function (err) { });
        }
    };

    $scope.GetDriverList = function (skip, take) {
        DriverMasterService.GetDriverList(skip, take).then(function (d) {            
            $scope.driverList = d.data.list;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { });
    };

    $scope.CustomerSelected2 = function (item, type) {
        $scope.d[type] = item.Value;        
    };

    $scope.getData = function () {
        $scope.skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));        
        $scope.GetDriverList(skip, $scope.limit);
    };

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.AddDriverMaster = function (driverID) {
        if (driverID != 'NEW' && driverID != '')
            $scope.truefalse = true;
            else
            $scope.truefalse = false;

        $location.path('drivermaster/' + driverID);
    };


    //$scope.clearpage = fuction()
    //{
    //           
    //}

   
    $scope.DeleteDriver = function (driverID) {
        if ($window.confirm('Are you sure, you want to delete \'' + driverID + '\' ?')) {
            DriverMasterService.DeleteDriver(driverID).then(function (d) {
                $scope.GetDriverList($scope.skip, $scope.limit);
            }, function (err) { });
        }
    };

    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.skip = 0;

    var driverId = $stateParams.driverId;
    if (typeof driverId != 'undefined') {
        if (driverId != 'NEW' && driverId != '') {
            DriverMasterService.GetDriver(driverId).then(function (d) {
                $scope.d = d.data;
            }, function (err) { });
        }
        $scope.GetLookupData();

        CountryService.GetCountriesList().then(function (d) {
            $scope.CountriesList = d.data;
        }, function (err) { });
        
    } else {
        $scope.GetDriverList($scope.skip, $scope.limit);        
    }

    
}]);