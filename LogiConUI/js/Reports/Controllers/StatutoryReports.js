angular.module('LogiCon').controller('StatutoryReportsCntrl', ['$scope', 'limitToFilter', 'Utility', '$http', '$uibModal', 'UtilityFunc', 'growlService',
    function ($scope, limitToFilter, Utility, $http, $uibModal, UtilityFunc, growlService) {
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
            'label': 'GST03 Return',
            'id': 'GST03Return',
            'url': 'DNex.GST03Return',
            'i': 1
        };

        array.push(obj1);

        var obj2 = {
            'label': 'M1 Report (Raw Material Movement Report)',
            'id': 'M1Report',
            'url': 'DNex.M1Report',
            'i': 2
        };

        array.push(obj2);
        var obj3 = {
            'label': 'M2 Report (Finished Goods Movement Report)',
            'id': 'M2Report',
            'url': 'DNex.M2Report',
            'i': 3
        };

        array.push(obj3);
        var obj4 = {
            'label': 'Scrap/Waste Movement Report',
            'id': 'ScrapWasteMovementReport',
            'url': 'DNex.Scrap_WasteMovementReport',
            'i': 4
        };

        array.push(obj4);
        var obj5 = {
            'label': 'Waived Duty and Taxes Report',
            'id': 'WaivedDutyAndTaxesReport',
            'url': 'DNex.WaivedDutyNTaxesReport',
            'i': 5
        };

        array.push(obj5);
        var obj6 = {
            'label': 'Export Price Survey Report – XP1',
            'id': 'ExportPriceSurveyReportXP1',
            'url': 'DNex.ExportPriceSurveyReport.XP1',
            'i': 6
        };

        array.push(obj6);
        var obj7 = {
            'label': 'Import Price Survey – MP1',
            'id': 'ImportPriceSurveyMP1',
            'url': 'DNex.ImportPriceSurvey.MP1',
            'i': 7
        };

        array.push(obj7);
        var obj8 = {
            'label': 'Delivery Verification Statement – Form 6',
            'id': 'DeliveryVerificationStatementForm6',
            'url': 'DNex.DeliveryVerificationStatement.Form6',
            'i': 8
        };

        array.push(obj8);
        var obj9 = {
            'label': 'Repair and Return Movement Report',
            'id': 'RepairAndReturnMovementReport',
            'url': 'DNex.RepairandReturnMovementReport',
            'i': 9
        };

        array.push(obj9);
        var obj10 = {
            'label': 'GST Relief Order Movement Report',
            'id': 'GSTReliefOrderMovementReport',
            'url': 'DNex.GSTReliefOrderMovementReport',
            'i': 10
        };

        array.push(obj10);
        var obj11 = {
            'label': 'ATS Movement Report',
            'id': 'ATSMovementReport',
            'url': 'DNex.ATSMovementReport',
            'i': 11
        };

        array.push(obj11);

        var obj12 = {
            'label': 'Precursor Audit Report',
            'id': 'PrecursorAuditReport',
            'url': 'DNex.PrecursorAuditReport',
            'i': 12
        };

        array.push(obj12);

        var obj13 = {
            'label': 'M4 LMW Report',
            'id': 'M4LMWReport',
            'url': 'DNex.M4LMWReport',
            'i': 13
        };

        array.push(obj13);

        var obj14 = {
            'label': 'Finance Report',
            'id': 'FinanceReport',
            'url': 'DNex.FinanceReport',
            'i': 14
        };

        array.push(obj14);

        $scope.treedata = array;

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