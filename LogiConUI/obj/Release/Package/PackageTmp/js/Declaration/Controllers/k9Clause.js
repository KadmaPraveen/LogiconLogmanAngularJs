angular.module('LogiCon').controller('k9ClauseCntrl', ['$scope', '$uibModalInstance', 'limitToFilter', '$filter', 'dataObj', 'growlService',
function ($scope, $uibModalInstance, limitToFilter, $filter, dataObj, growlService) {
    
    //$scope.ie = {
    //    declarationsubItems: new Array()
    //};
    $scope.lookUpData = {
        clauseTypeList : dataObj.clauseTypeList
    };
    $scope.cl =angular.copy(dataObj.Clause);
    $scope.showLoading = true;   

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    

    $scope.IsFrmClauseValid = false;
    $scope.$watch('frmClause.$valid', function (isValid) {
        $scope.IsFrmClauseValid = isValid;
    });

    $scope.SaveClause = function (cl) {
        if ($scope.IsFrmClauseValid) {
            $uibModalInstance.close(cl);
        }
        else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    };

    $scope.showLoading = false;
}]);