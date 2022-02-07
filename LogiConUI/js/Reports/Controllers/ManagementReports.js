angular.module('LogiCon').controller('ManagementReportsCntrl', ['$scope', 'OperationalService', 'limitToFilter', 'Utility', '$http', function ($scope, OperationalService, limitToFilter, Utility, $http) {
    var array = new Array();

    var obj1 = {
        'label': 'Account Management Report',
        'id': 'Account Management Report',
        'i': 1
    };

    array.push(obj1);

    var obj2 = {
        'label': 'Cost By Cost Center',
        'id': 'Cost By Cost Center',
        'i': 2
    };

    array.push(obj2);
    var obj3 = {
        'label': 'Customer Ranking',
        'id': 'Customer Ranking',
        'i': 3
    };

    array.push(obj3);
    var obj4 = {
        'label': 'Order Profitability',
        'id': 'Order Profitability',
        'i': 4
    };

    array.push(obj4);
    var obj5 = {
        'label': 'Revenue Analysis',
        'id': 'Revenue Analysis',
        'i': 5
    };

    array.push(obj5);
    var obj6 = {
        'label': 'Revenue By Charge Code',
        'id': 'Revenue By Charge Code',
        'i': 6
    };

    array.push(obj6);
    var obj7 = {
        'label': 'Revenue By Cost Center',
        'id': 'Revenue By Cost Center',
        'i': 7
    };

    array.push(obj7);
    var obj8 = {
        'label': 'Revenue By G/L Code',
        'id': 'Revenue By G/L Code',
        'i': 8
    };

    array.push(obj8);
    var obj9 = {
        'label': 'Volume Analysis',
        'id': 'Volume Analysis',
        'i': 9
    };
    array.push(obj9);   

    $scope.treedata = array;

    OperationalService.GetLookupData().then(function (d) {
        $scope.lookupData = d.data;
    }, function (err) { });

    $scope.CustomerResults = function (text) {
        return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + text + '/ShipperConsignee').then(function (response) {
            return limitToFilter(response.data, 15);
        });
    };

    $scope.VesselNameResults = function (text) {
        return $http.get(Utility.ServiceUrl + '/master/Vessel/search/vesselName/' + text).then(function (response) {
            return limitToFilter(response.data, 15);
        });
    };
}]);