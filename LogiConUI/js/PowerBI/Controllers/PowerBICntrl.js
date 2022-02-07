angular.module('LogiCon').controller('PowerBICntrl', ['$scope', 'Utility', 'VisualReportsService', function ($scope, PowerBIService, Utility, VisualReportsService) {
    //$scope.reportPath = Utility.ReportPath + '/PowerBIReport?reportId=4447c46a-c496-4631-8851-ff5fc4c090bf';
    //37aa972b-a3ec-457b-8925-ba391662caba
    //2053d5f9-5cd3-4518-9aa4-59f7bbd6d7dc

    $scope.HSCodePortOfLoading = function () {
        $scope.showLoading = true;
        VisualReportsService.GetHSCodePortOfLoading().then(function (d) {
            
            $scope.showLoading = false;
        }, function (err) { });
    };
}]);

app.service('PowerBIService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {

}]);

app.controller('VisualReportsCntrl', ['$scope', 'Utility', 'VisualReportsService', '$q', function ($scope, Utility, VisualReportsService, $q) {

    Highcharts.setOptions({
        colors: ['#4F81BD', '#C73840', '#C0504D', '#088A4B']
    });
    $scope.report = {
        fromDate: moment(),
        toDate: moment()
    };
    $scope.HSCodePortOfLoading = function () {
        $scope.series = new Array();
        $scope.showLoading = true;
        VisualReportsService.GetHSCodePortOfLoading().then(function (d) {

            
            $('#HSCodePortOfLoading').highcharts(d.data)
            $scope.showLoading = false;
        }, function (err) { });

    };

    $scope.GenerateReport = function () {

        $scope.showLoading = true;
        VisualReportsService.GetJobTypeByDate({
            fromDate: moment($scope.report.fromDate).format('YYYY-MM-DD'),
            toDate: moment($scope.report.toDate).format('YYYY-MM-DD')
        }).then(function (d) {
            Highcharts.chart($('#JobTypeByDate')[0], {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'JOB TYPE BY DATE'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} '
                        }
                    }
                },
                series: [{
                    data: d.data
                }]
            });
            $scope.showLoading = false;
        }, function (err) {
            $scope.showLoading = false;
        });

        VisualReportsService.GetDeclarationByDate({
            fromDate: moment($scope.report.fromDate).format('YYYY-MM-DD'),
            toDate: moment($scope.report.toDate).format('YYYY-MM-DD')
        }).then(function (d) {
            
            var html = '';
            html += ' <tr><td>K1 DECLARATIONS</td><td>' + d.data[0].K1Count + '</td></tr>';            //<td>' + d.data[0].K2Count + '</td>
            html += ' <tr><td>K2 DECLARATIONS</td><td>' + d.data[0].K2Count + '</td></tr>';
            
            $('#tableID').html(html);
            //$scope.k1Count = d.data[0].K1Count;
            //$scope.k2Count = d.data[0].K2Count;
            //$scope.htmlText = html;

            Highcharts.chart($('#Declaration')[0], {
                data: {
                    table: 'datatable'
                },
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'DECLARATIONS'
                },
                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: 'Count'
                    }
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.point.y + ' ' + this.point.name.toUpperCase();
                    }
                }
            });

           

        }, function (err) {

        });
    };

    //var hsCodePortLoadingPromise = $scope.HSCodePortOfLoading();
    //var jobTypeByDatePromise = $scope.JobTypeByDate();

    $scope.HSCodePortOfLoading();
}]);

app.service('VisualReportsService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.GetHSCodePortOfLoading = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Reports/VisualReports/hscodeportofloading').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetJobTypeByDate = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Reports/VisualReports/JobTypeByDate', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDeclarationByDate = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Reports/VisualReports/declaration', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);