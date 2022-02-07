angular.module('LogiCon').controller('HomeController', ['$scope', 'Utility', 'limitToFilter', '$http', 'VesselScheduleService', 'OrderEntryService', '$timeout', 'UtilityFunc', 'PortAreaService',
    function ($scope, Utility, limitToFilter, $http, VesselScheduleService, OrderEntryService, $timeout, UtilityFunc, PortAreaService) {
        $scope.vs = {};
        $scope.header = {
            OrderNoHeader: true
        };
        $scope.weborders = {
            filter: 'containerNo'
        };

        $scope.companyType = UtilityFunc.CompanyType();

        $scope.tabs = [
            { title: 'Dashboard', content: 'Js/Home/Templates/dashboard.html?v=' + Utility.Version, active: true, disabled: false, visible: true },
            { title: 'Vessel Schedule', content: 'Js/Home/Templates/vesselschedule.html?v=' + Utility.Version, active: false, disabled: false, visible: true },
            { title: 'Web Orders', content: 'Js/Home/Templates/weborders.html?v=' + Utility.Version, active: false, disabled: false, visible: $scope.companyType == 'AGENT' ? true : false }
        ];

        $scope.portResults = function (text) {
            return PortAreaService.PortAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.PortSelected = function (item, type) {
            $scope.vs[type] = item.PortCode;
        };



        $scope.Search = function (vs, take) {
            VesselScheduleService.SearchVesselSchedule(vs, take).then(function (d) {
                $scope.results = d.data;
            }, function () { });
        };

        $scope.Search({}, 10);

        if (UtilityFunc.CompanyType() == 'AGENT') {
            OrderEntryService.GetWebOrdersForAgent().then(function (d) {
                $scope.webOrders = d.data;
            }, function (err) { });
        }

        $scope.addContainerTab = function (orderNo) {
            var obj = { title: orderNo, content: 'Js/Operation/Views/OrderEntry/orderentry.html?v=' + Utility.Version, active: true, disabled: false, isRemove: true };
            $scope.tabs.push(obj);
        };

        $scope.headerDblClick = function (type) {
            $scope.header[type] = !$scope.header[type]
        };

        $scope.GetOrderCount = function () {
            VesselScheduleService.GetOrderCount().then(function (d) {
                $scope.orderCount = d.data.OrderCount;
                $scope.turnAroundTime = d.data.BookingCount;
                $scope.bookingCount = d.data.TurnAoundTime;
            }, function (err) { });

        };

        $scope.GetOrderCount();

        $scope.HSCodePortOfLoading = function () {
            $scope.series = new Array();
            $scope.showLoading = true;
            VesselScheduleService.GetHSCodePortOfLoading().then(function (d) {
                $timeout(function () {
                    Highcharts.setOptions({
                        colors: ['#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
                    });
                    var html = '';
                    angular.forEach(d.data, function (item, key) {
                        html += ' <tr><td>' + item.PortOfLoading + '</td><td>' + item.HSCodeCount + '</td></tr>';
                    });
                    $('#HSCodedatatableBody').html(html);

                    Highcharts.chart($('#HSCodePortOfLoading')[0], {
                        data: {
                            table: 'HSCodedatatable'
                        },
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Port Of Loading'
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
                }, 500);
                $scope.showLoading = false;
            }, function (err) { });

        };

        $scope.PortReport = function () {
            PortAreaService.PortReport().then(function (d) {
                
                $timeout(function () {
                    Highcharts.setOptions({
                        colors: ['#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
                    });
                    var html = '';
                    angular.forEach(d.data.portOfLoading, function (item, key) {
                        html += ' <tr><td>' + item.Port + '</td><td>' + item.PortCount + '</td></tr>';
                    });
                    $('#PortOfLoadingBody').html(html);
                    Highcharts.chart($('#PortOfLoading')[0], {
                        data: {
                            table: 'PortOfLoadingTable'
                        },
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Port Of Loading'
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
                }, 500);               


                Highcharts.setOptions({
                    colors: ['#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
                });
                $timeout(function () {
                    Highcharts.setOptions({
                        colors: ['#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
                    });
                    var html2 = '';
                    angular.forEach(d.data.portOfDischarge, function (item, key) {
                        html2 += ' <tr><td>' + item.Port + '</td><td>' + item.PortCount + '</td></tr>';
                    });
                    $('#PortOfDischargeBody').html(html2);
                    Highcharts.chart($('#PortOfDischarge')[0], {
                        data: {
                            table: 'PortOfDischargeTable'
                        },
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Port Of Discharge'
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
                }, 500);

                $scope.showLoading = false;
            }, function (err) { });
        };

        $scope.GenerateReport = function () {
            $scope.showLoading = true;
            VesselScheduleService.GetDeclarationByDate({
                fromDate: '',
                toDate: ''
            }).then(function (d) {
                
                $timeout(function () {
                    Highcharts.setOptions({
                        colors: ['#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
                    });
                    var html = '';
                    html += ' <tr><td>K1</td><td>' + d.data[0].K1Count + '</td></tr>';            //<td>' + d.data[0].K2Count + '</td>
                    html += ' <tr><td>K2</td><td>' + d.data[0].K2Count + '</td></tr>';
                    html += ' <tr><td>K3</td><td>' + d.data[0].K3Count + '</td></tr>';
                    html += ' <tr><td>K8</td><td>' + d.data[0].K8Count + '</td></tr>';
                    html += ' <tr><td>K9</td><td>' + d.data[0].K9Count + '</td></tr>';
                    html += ' <tr><td>K1A</td><td>' + d.data[0].K1aCount + '</td></tr>';

                    $('#tableID').html(html);
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
                }, 500);



            }, function (err) {

            });
        };

        //var hsCodePortLoadingPromise = $scope.HSCodePortOfLoading();
        //var jobTypeByDatePromise = $scope.JobTypeByDate();

        //$scope.HSCodePortOfLoading();
        $scope.PortReport();
        $scope.GenerateReport();
    }]);
