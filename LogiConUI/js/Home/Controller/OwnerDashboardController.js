angular.module('LogiCon').controller('ownerDashboardCntrl', ['$scope', 'OwnerService', 'growlService', function ($scope, OwnerService, growlService) {
    
    
    $scope.widgetData = {};
    function add(a, b) {
        return a + b;
    }
    $scope.DashBoardInfo = function () {
        OwnerService.DashBoardInfo().then(function (d) {
            var pieArray = new Array();
            pieArray.push({ name: 'Users', y: d.data.userArr.reduce(add, 0) });
            pieArray.push({ name: 'Companies', y: d.data.companyArr.reduce(add, 0) });
            pieArray.push({ name: 'Registration', y: d.data.registrationArr.reduce(add, 0) });
            pieArray.push({ name: 'Pending Approval', y: d.data.pendingApprovalArr.reduce(add, 0) });
            pieArray.push({ name: 'Rejected', y: d.data.rejectedApprovalArr.reduce(add, 0) });
            $scope.widgetData = d.data.widgetData;
            Highcharts.setOptions({
                colors: ['#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
            });

            Highcharts.chart('container1', {
                title: {
                    text: 'Users and Company Stats',
                    x: -20 //center
                },                
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Count'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ''
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Users',
                    data: d.data.userArr
                }, {
                    name: 'Companies',
                    data: d.data.companyArr
                }]
            });

            Highcharts.chart('container2', {
                title: {
                    text: 'Registration Status Stats',
                    x: -20 //center
                },                
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                },
                yAxis: {
                    title: {
                        text: 'Count'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: ''
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    borderWidth: 0
                },
                series: [{
                    name: 'Registration',
                    data: d.data.registrationArr
                }, {
                    name: 'Pending Approval',
                    data: d.data.pendingApprovalArr
                }, {
                    name: 'Rejected',
                    data: d.data.rejectedApprovalArr
                }]
            });

            Highcharts.chart('container3', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Registered User Info'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b> '
                        }
                    }
                },
                series: [{
                    data: pieArray
                }]
            });
        }, function (err) { });
    };

    $scope.DashBoardInfo();
    /*


    {
                    name: d.data.pendingApprovalArr,
                    data: [7, 4]
                }, {
                    name: 'Rejected',
                    data: d.data.rejectedApprovalArr
                }
    $scope.currentPage = 1;
    $scope.limit = 10;

    var promise1 = RegisteredCompanyService.GetRegisteredCompanies(null, 0);
    var promise2 = RegistrationService.GetLookUpdata();
    $scope.showLoading = true;
    $q.all([promise1, promise2]).then(function (d) {
        
        $scope.showLoading = false;

        $scope.companies = d[0].data.registeredCompanies;
        $scope.totalItems = d[0].data.totalItems;
        $scope.lookUpData = d[1].data;        
    }, function (err) { });

    $scope.viewInfo = function (companyID) {
        $location.path('/company/' + companyID);
    };

    $scope.viewInfo2 = function (companyID) {
        $location.path('/map');
    };

    $scope.getData = function () {
        var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        RegisteredCompanyService.GetRegisteredCompanies($scope.filter, skip).then(function (d) {
            $scope.companies = d.data.registeredCompanies;
            $scope.totalItems = d.data.totalItems;

            $scope.showLoading = false;
        }, function (err) { });
    };

    $scope.filterChanged = function () {
        $scope.showLoading = true;
        $scope.getData();
    };

    $scope.pageChanged = function () {
        $scope.showLoading = true;
        $scope.getData();
    };
    */

    
}]);



//class ownerDashboardCntrl {
    
//    constructor(OwnerService) {
//        
//        this.widgetData = {};        
//        this.DashBoardInfo(OwnerService);
//    }   

//    add(a, b) {
//        return a + b;
//    }

//    DashBoardInfo(OwnerService) {
        
//        OwnerService.DashBoardInfo().then(function (d) {
//            var pieArray = new Array();
//            
//            pieArray.push({ name: 'Users', y: d.data.userArr.reduce(this.add, 0) });
//            pieArray.push({ name: 'Companies', y: d.data.companyArr.reduce(this.add, 0) });
//            pieArray.push({ name: 'Registration', y: d.data.registrationArr.reduce(this.add, 0) });
//            pieArray.push({ name: 'Pending Approval', y: d.data.pendingApprovalArr.reduce(this.add, 0) });
//            pieArray.push({ name: 'Rejected', y: d.data.rejectedApprovalArr.reduce(this.add, 0) });
//            this.widgetData = d.data.widgetData;

//            
//            Highcharts.setOptions({
//                colors: ['#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
//            });

//            Highcharts.chart('container1', {
//                title: {
//                    text: 'Users and Company Stats',
//                    x: -20 //center
//                },
//                xAxis: {
//                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//                },
//                yAxis: {
//                    title: {
//                        text: 'Count'
//                    },
//                    plotLines: [{
//                        value: 0,
//                        width: 1,
//                        color: '#808080'
//                    }]
//                },
//                tooltip: {
//                    valueSuffix: ''
//                },
//                legend: {
//                    layout: 'vertical',
//                    align: 'right',
//                    verticalAlign: 'middle',
//                    borderWidth: 0
//                },
//                series: [{
//                    name: 'Users',
//                    data: d.data.userArr
//                }, {
//                    name: 'Companies',
//                    data: d.data.companyArr
//                }]
//            });

//            Highcharts.chart('container2', {
//                title: {
//                    text: 'Registration Status Stats',
//                    x: -20 //center
//                },
//                xAxis: {
//                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//                },
//                yAxis: {
//                    title: {
//                        text: 'Count'
//                    },
//                    plotLines: [{
//                        value: 0,
//                        width: 1,
//                        color: '#808080'
//                    }]
//                },
//                tooltip: {
//                    valueSuffix: ''
//                },
//                legend: {
//                    layout: 'vertical',
//                    align: 'right',
//                    verticalAlign: 'middle',
//                    borderWidth: 0
//                },
//                series: [{
//                    name: 'Registration',
//                    data: d.data.registrationArr
//                }, {
//                    name: 'Pending Approval',
//                    data: d.data.pendingApprovalArr
//                }, {
//                    name: 'Rejected',
//                    data: d.data.rejectedApprovalArr
//                }]
//            });

//            Highcharts.chart('container3', {
//                chart: {
//                    type: 'pie'
//                },
//                title: {
//                    text: 'Registered User Info'
//                },
//                plotOptions: {
//                    pie: {
//                        allowPointSelect: true,
//                        cursor: 'pointer',
//                        dataLabels: {
//                            enabled: true,
//                            format: '<b>{point.name}</b> '
//                        }
//                    }
//                },
//                series: [{
//                    data: pieArray
//                }]
//            });
//        }, function (err) { });
//    }
//}

//angular.module('LogiCon').controller('ownerDashboardCntrl', ownerDashboardCntrl);