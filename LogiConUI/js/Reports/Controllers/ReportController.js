angular.module('LogiCon').controller('ReportCntrl', ['$scope', 'reportObj', 'Utility', '$uibModalInstance', function ($scope, reportObj, Utility, $uibModalInstance) {


    
    if (!angular.isUndefined(reportObj.declarationNo))
    {
        $scope.reportPath = Utility.ReportPath
           + '/' + reportObj.reportId + '/?branchID=' + reportObj.branchID
           + '&declarationNo=' + reportObj.declarationNo
           + '&Url=' + reportObj.Url;
        $scope.reportName = reportObj.reportName;
    }
    else
    {
        $scope.reportPath = Utility.ReportPath
            + '/' + reportObj.reportId + '/?branchID=' + reportObj.branchID
            + '&dateFrom=' + reportObj.dateFrom
            + '&dateTo=' + reportObj.dateTo
            + '&Url=' + reportObj.Url;
        $scope.reportName = reportObj.reportName;
    }
    


    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };
}]);