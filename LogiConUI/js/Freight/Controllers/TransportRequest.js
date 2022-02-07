angular.module('LogiCon').controller('TransportRequestCntrl', ['$scope', 'RequestOfTransportService', 'OrderEntryService', 'Utility', 'UtilityFunc',
    function ($scope, RequestOfTransportService, OrderEntryService, Utility, UtilityFunc) {


        $scope.branchID = 1007001//UtilityFunc.BranchID();
        $scope.requestNo = 'FRIHQ170900018';//'FRIHQ170900018';
        $scope.reportUrl = Utility.ReportPath + '/GetROTReport?Url=DNeX.ROT&branchID=' + $scope.branchID + '&requestNo=' + $scope.requestNo ;


        /*Feed Back code Starts here*/

        $scope.tempFlag = false;
        $scope.toggleFeedback = function () {
            $scope.tempFlag = !$scope.tempFlag;
            if ($scope.tempFlag)
                jQuery("#feedback").animate({ right: "-0px" });
            else
                jQuery("#feedback").animate({ right: "-210px" });
        }

        $scope.navigateTo = function (id) {
            $scope.toggleFeedback();
            $location.hash(id);
            $anchorScroll();

        }
        /*Ends here*/

        $scope.tr = {
            HaulierCode: null,
            HaulierCodeDescription: null,
            TranshipmentPortCode: null,
            TranshipmentPortCodeDescription: null
        };

        $scope.GetLookupData = function () {
            RequestOfTransportService.GetLookupData().then(function (d) {
                $scope.lookup = d.data;
            }, function (err) { });
        };

        $scope.sizeChanged = function () {
            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.tr.transportSize).then(function (d) {
                $scope.showLoading = false;
                $scope.lookup.TypeList = d.data;
            }, function () { })
        };

        $scope.GetLookupData();
    }]);