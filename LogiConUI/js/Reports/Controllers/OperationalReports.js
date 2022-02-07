angular.module('LogiCon').controller('OperationalReportsCntrl', ['$scope', 'OperationalService', 'limitToFilter', 'Utility', '$http', '$uibModal', 'UtilityFunc', 'growlService',
    function ($scope, OperationalService, limitToFilter, Utility, $http, $uibModal, UtilityFunc, growlService) {
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.branchID = UtilityFunc.BranchID();
        $scope.ope = {};
        
        $scope.ope.DateFrom = UtilityFunc.FirstDateOfMonth();
        $scope.ope.DateTo = moment();

        $scope.isSelected = false;
        $scope.selectedreportID = '';
        $scope.selectedreportName = '';
        $scope.selectedreportUrl = '';

        $scope.showSelected = function (node) {
            $scope.isSelected = true;
            $scope.selectedreportID = node.id;
            $scope.selectedreportName = node.label;
            $scope.selectedreportUrl = node.url;
        };

        $scope.isFrmReportValid = false;
        $scope.$watch('frmReport.$valid', function (isValid) {
            $scope.isFrmReportValid = isValid;
        });

        $scope.clear = function () {
            $scope.ope.DateFrom = UtilityFunc.FirstDateOfMonth();
            $scope.ope.DateTo = moment();
        };

        var array = new Array();

        var obj1 = {
            'label': 'Declaration Transaction Listing',
            'id': 'DeclarationTransactionListing',
            'url': 'DNeX.DeclarationTransactionListing',
            'i': 1
        };

        array.push(obj1);

        var obj2 = {
            'label': 'Order Entry Report',
            'id': 'OrderEntryReport',
            'url': 'DNeX.OrderEntryReport',
            'i': 2
        };

        array.push(obj2);
        var obj3 = {
            'label': 'Declaration Form Listing',
            'id': 'DeclarationFormListing',
            'url': 'DNeX.DeclarationFormListing',
            'i': 3
        };

        array.push(obj3);

        $scope.treedata = array;
        //$scope.treedata = new Array();
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

        $scope.GenerateReport = function (obj) {            
            if ($scope.isFrmReportValid) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'Js/Reports/Templates/Report.html?v=' + Utility.Version,
                    controller: 'ReportCntrl',
                    size: 'lg',
                    resolve: {
                        reportObj: function () {
                            return {
                                reportId: 'ViewReport',
                                reportName: $scope.selectedreportName,
                                branchID: $scope.branchID,
                                dateFrom: moment(obj.DateFrom).format('MM/DD/YYYY'),
                                dateTo: moment(obj.DateTo).format('MM/DD/YYYY'),
                                Url: $scope.selectedreportUrl
                            }
                        }
                    }
                });

                modalInstance.result.then(function (d) {

                }, function () {

                });
            }
            else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };

    }]);