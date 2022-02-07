angular.module('LogiCon').controller('CUSREPInquiryCntrl', ['$scope', 'CUSREPInquiryService', 'VesselMasterService', 'limitToFilter', 'PortAreaService', function ($scope, CUSREPInquiryService, VesselMasterService, limitToFilter, PortAreaService) {
    $scope.i = {};
    $scope.VesselNameResults = function (text) {
        return VesselMasterService.GetVesselByVesselName(text).then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.portResults = function (text) {
        return PortAreaService.PortAutoComplete(text).then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.vesselNameClick = function (obj) {
        $scope.i.VesselID = obj.Value;
    };

    $scope.PortSelected = function (item, type) {
        $scope.i[type] = item.PortCode;
    };

    $scope.Search = function () {
        CUSREPInquiryService.CUSREPInquiry($scope.i).then(function (d) {
            
        }, function (err) { });
    };
}]);