angular.module('LogiCon').controller('LookupConfigController', ['$scope', function ($scope) {
    //$scope.treedata = createSubTree(3, 4, "");

    var ParentArr = new Array();
    

    var childrenArr = new Array();
    childrenArr.push({
        'label': 'Container Grade',
        'id': 'CG01',
        'i': 1
    }, {
        'label': 'Container Status',
        'id': 'CS01',
        'i': 2
    }, {
        'label': 'Capacity Slot',
        'id': 'CS38',
        'i': 38
    }, {
        'label': 'Cargo Handling',
        'id': 'CH39',
        'i': 39
    }, {
        'label': 'Cargo Type',
        'id': 'CT40',
        'i': 40
    }, {
        'label': 'Cargo Group',
        'id': 'CG41',
        'i': 41
    }, {
        'label': 'Commodity Code',
        'id': 'CC42',
        'i': 42
    }, {
        'label': 'Country Code',
        'id': 'CC03',
        'i': 3
    }, {
        'label': 'Damage Code',
        'id': 'DC04',
        'i': 4
    }, {
        'label': 'Delivery Time Window',
        'id': 'DTW05',
        'i': 5
    }, {
        'label': 'Department',
        'id': 'DE06',
        'i': 6
    }, {
        'label': 'Designation',
        'id': 'DE07',
        'i': 7
    }, {
        'label': 'Driver Shift Group',
        'id': 'DSG08',
        'i': 8
    }, {
        'label': 'Driver Shift Master',
        'id': 'DSM09',
        'i': 9
    }, {
        'label': 'Driver Type',
        'id': 'DT10',
        'i': 10
    }, {
        'label': 'Equipment Master',
        'id': 'EM11',
        'i': 11
    }, {
        'label': 'Equipment Type Size',
        'id': 'ETS12',
        'i': 12
    }, {
        'label': 'Event Type',
        'id': 'ET13',
        'i': 13
    }, {
        'label': 'Expiry Code',
        'id': 'EC14',
        'i': 14
    }, {
        'label': 'GST Tariff',
        'id': 'GT15',
        'i': 15
    }, {
        'label': 'Hold Status Code',
        'id': 'HSC16',
        'i': 16
    }, {
        'label': 'IMO Code',
        'id': 'IC17',
        'i': 17
    }, {
        'label': 'Merchant Category',
        'id': 'MC18',
        'i': 18
    }, {
        'label': 'Operator',
        'id': 'OP19',
        'i': 19
    }, {
        'label': 'Pallet Supplier',
        'id': 'PS20',
        'i': 20
    }, {
        'label': 'Picking Station',
        'id': 'PS21',
        'i': 21
    }, {
        'label': 'Post Code',
        'id': 'PC22',
        'i': 22
    }, {
        'label': 'Product Category',
        'id': 'PC23',
        'i': 23
    }, {
        'label': 'Rail Restriction',
        'id': 'RR24',
        'i': 24
    }, {
        'label': 'Reason Code',
        'id': 'RC25',
        'i': 25
    }, {
        'label': 'Section',
        'id': 'SE26',
        'i': 26
    }, {
        'label': 'Sorting / Receiving Bay',
        'id': 'SRB27',
        'i': 27
    }, {
        'label': 'Special Handling',
        'id': 'SH28',
        'i': 28
    }, {
        'label': 'Stock Room',
        'id': 'SR29',
        'i': 29
    }, {
        'label': 'Trailer Type',
        'id': 'TT30',
        'i': 30
    }, {
        'label': 'Transport Type',
        'id': 'TT31',
        'i': 31
    }, {
        'label': 'Truck Type',
        'id': 'TT32',
        'i': 32
    }, {
        'label': 'Unit Of measurement',
        'id': 'UM33',
        'i': 33
    }, {
        'label': 'User Group',
        'id': 'UG34',
        'i': 34
    }, {
        'label': 'Vessel Master',
        'id': 'VM35',
        'i': 35
    }, {
        'label': 'Wagon Class',
        'id': 'WC36',
        'i': 36
    }, {
        'label': 'Wagon Master',
        'id': 'WM37',
        'i': 37
    });

    ParentArr.push({
        'label': 'Common Tables',
        'id': 'CT01',
        'i': 1,
        'children': childrenArr
    });    

    $scope.treedata = ParentArr;
    $scope.expandedNodes = [$scope.treedata[0]];

    $scope.showSelected = function (sel) {
        $scope.selectedNode = sel;
    };
}]);