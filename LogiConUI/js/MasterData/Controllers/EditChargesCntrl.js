angular.module('LogiCon').controller('EditChargesCntrl', ['$scope', '$uibModalInstance', 'JobCategoryChargesService', 'DTOObj', '$filter', function ($scope, $uibModalInstance, JobCategoryChargesService, DTOObj, $filter) {
    
    if (DTOObj.chargesList != null && (typeof DTOObj.chargesList != 'undefined' && DTOObj.chargesList.length > 0))
        $scope.chargesList = DTOObj.chargesList;
    else
        $scope.chargesList = new Array();

    if (DTOObj.vasList != null && (typeof DTOObj.vasList != 'undefined' && DTOObj.vasList.length > 0))
        $scope.vasList = DTOObj.vasList;
    else
        $scope.vasList = new Array();

    $scope.charges = {};
    $scope.vas = {};
    $scope.DTOObj = DTOObj;
    $scope.buttonText = 'Add';
    $scope.buttonvasText = 'Add';
    JobCategoryChargesService.ChargesLookup(DTOObj.module).then(function (d) {
        $scope.lookUpData = d.data;
    }, function (err) { })


    $scope.addCharges = function (charges) {
        charges.JobCategoryCode = DTOObj.jobCategoryCode;
        charges.MovementCode = DTOObj.mvtCode;
        charges.Module = DTOObj.module;

        if ($scope.buttonText != 'Update')
            $scope.chargesList.push(charges);

        $scope.charges = {};
        $scope.buttonText = 'Add';
    };

    $scope.addvas = function (vas) {
        debugger
        vas.JobCategoryCode = DTOObj.jobCategoryCode;
        vas.MovementCode = DTOObj.mvtCode;

        if ($scope.buttonvasText != 'Update')
            $scope.vasList.push(vas);

        $scope.vas = {};
        $scope.buttonvasText = 'Add';
    };

    $scope.editCharges = function (chargeCodeObj) {
        $scope.buttonText = 'Update';
        $scope.charges = chargeCodeObj;//$filter('filter')($scope.chargesList, { ChargeCode: chargeCode })[0];
        
    };

    $scope.editvas = function (vasObj) {
        $scope.buttonvasText = 'Update';
        $scope.vas = vasObj;//$filter('filter')($scope.chargesList, { ChargeCode: chargeCode })[0];
        
    };

    $scope.cancel = function () {
        
        $uibModalInstance.dismiss('cancel');
    };

    $scope.SaveCharges = function () {
        
        $uibModalInstance.close({
            chargesList: $scope.chargesList,
            vasList: $scope.vasList
        });
    };
}]);