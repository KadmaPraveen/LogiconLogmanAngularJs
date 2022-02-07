angular.module('LogiCon').controller('AddEditk1ClauseCntrl', ['$scope', '$uibModalInstance', 'limitToFilter', '$filter', 'dataObj', 'growlService',
function ($scope, $uibModalInstance, limitToFilter, $filter, dataObj, growlService) {
   
    $scope.lookUpData = {
        clauseTypeList : dataObj.clauseTypeList
    };
    $scope.cl = dataObj.Clause;
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