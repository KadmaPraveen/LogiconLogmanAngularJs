angular.module('LogiCon').controller('DeclarantController', ['$scope', 'DeclarantService', 'UserProfileService', '$stateParams', 'growlService', '$state', function ($scope, DeclarantService, UserProfileService, $stateParams, growlService, $state) {

    $scope.isFrmOrderEntryValid = false;
    $scope.IsNew = true;
    $scope.$watch('frmDeclarant.$valid', function (isValid) {
        $scope.isFrmOrderEntryValid = isValid;
    });

    $scope.SaveDeclarant = function (obj) {
        if ($scope.isFrmOrderEntryValid) {
            DeclarantService.saveDeclarant(obj).then(function (d) {
                growlService.growl(d.data, 'success');
                $state.go('DeclarantList', {});
            }, function (err) {
                
            });
        }
        else {
            growlService.growl('please enter all mandatory fields', 'danger');
        }

    }
    UserProfileService.getLookupData().then(function (d) {
        $scope.branchList = d.data.branchList;
    }, function (err) {

    });
    var declarantNo = $stateParams.declarantno;
    if (!angular.isUndefined(declarantNo)) {
        DeclarantService.getDeclarant(declarantNo).then(function (d) {
         
            $scope.IsNew = false;
            $scope.declarant = d.data;
        }, function (err) { });
    }


    $scope.checkDeclarant = function (declarantId) {

        DeclarantService.getDeclarant(declarantId).then(function (d) {
           
            if (d.data!=null){
                $scope.declarant = d.data;
                growlService.growl('Declarant already exist','danger');
            }
            else
            {
                delete $scope.declarant.Name;
                delete $scope.declarant.Designation;
                delete $scope.declarant.NRIC;
            }
        }, function (err) {
           
        });
    }

}]);