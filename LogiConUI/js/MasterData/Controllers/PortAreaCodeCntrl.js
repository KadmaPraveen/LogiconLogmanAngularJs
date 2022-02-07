angular.module('LogiCon').controller('PortAreaCodeCntrl', ['$scope', '$uibModal', 'CountryService', 'PortAreaService', 'limitToFilter', '$window', 'Utility', function ($scope, $uibModal, CountryService, PortAreaService, limitToFilter, $window, Utility) {
    $scope.currentPage = 1;
    $scope.limit = 10;

    $scope.portareaEdit = function (portCode) {
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/PortAreaCode/edit-portarea.html?v=' + Utility.Version,
            controller: 'EditPortAreaCntrl',
            size: 'md',
            resolve: {
                dataObj: function () {
                    return {
                        portCode: portCode,
                        CountryCode: $scope.pa.CountryCode
                    };
                }
            }
        });

        modalInstance.result.then(function (result) {
            if (result) {
                var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
                $scope.GetPortAreaList($scope.pa.CountryCode, skip, $scope.limit);
            }
        });
    };

    $scope.CountryResults = function (text) {        
        return CountryService.SearchCountries(text).then(function (d) {            
            return limitToFilter(d.data, 15);
        }, function (err) { });        
    };

    $scope.PortResults = function (text) {
        PortAreaService.GetPortListByCountryPortName($scope.pa.CountryCode, text).then(function (d) {            
            $scope.pa.portAreaList = d.data.portAreaList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { });
    };

    $scope.GetPortAreaList = function (countryCode, skip, limit) {
        PortAreaService.portByCountryCode(countryCode, skip, limit).then(function (d) {            
            $scope.pa.portAreaList = d.data.portAreaList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { });
    }

    $scope.CountrySelected = function (item, type) {
        $scope.pa[type] = item.Value;
        $scope.GetPortAreaList(item.Value, 0, $scope.limit);
    };

    $scope.PortSelected = function (item) {
        PortAreaService.portByPortCode(item.PortCode).then(function (d) {
            var arr = new Array();
            arr.push(d.data);
            $scope.pa.portAreaList = arr;
            $scope.totalItems = 1;
        }, function (err) {

        });
    };

    $scope.getData = function () {
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        $scope.GetPortAreaList($scope.pa.CountryCode, skip, $scope.limit);
    };

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.portareaDelete = function (portCode)
    {        
        if ($window.confirm('Are you sure, you want to delete \'' + portCode + '\' ?')) {
            PortAreaService.DeletePortArea(portCode).then(function (d) {
                $scope.GetDriverList($scope.skip, $scope.limit);
            }, function (err) { });
        }
    }

}]);

