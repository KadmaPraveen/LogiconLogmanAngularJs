angular.module('LogiCon').controller('ClaimantController', ['$scope', 'ClaimantService', 'UserProfileService', '$location', '$state', 'growlService', 'NgTableParams', '$filter', '$stateParams',
    function ($scope, ClaimantService,UserProfileService, $location, $state, growlService, NgTableParams, $filter ,$stateParams ) {

        $scope.isFrmClaimantValid = false;
        $scope.IsNew = true;

        $scope.$watch('frmClaimant.$valid', function (isValid) {
            $scope.isFrmClaimantValid = isValid;
        });
        

        $scope.SaveClaimant = function (claimant) {
            if ($scope.isFrmClaimantValid) {
                ClaimantService.saveClaimant(claimant).then(function (d) {
                    
                    growlService.growl(d.data, 'success');
                    $state.go('ClaimantList', {});
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

        var ClaimantID = $stateParams.ClaimantID;
        if (!angular.isUndefined(ClaimantID) && ClaimantID != 'NEW') {
            ClaimantService.getClaimant(ClaimantID).then(function (d) {

                $scope.IsNew = false;
                $scope.claimant = d.data;
            }, function (err) { });
        }

        $scope.checkClaimant = function (ClaimantID) {
            ClaimantService.getClaimant(ClaimantID).then(function (d) {
                if (d.data != null) {
                    $scope.claimant = d.data;
                    growlService.growl('Claimant already exist', 'danger');
                }
                else {
                    delete $scope.claimant.Name;
                    delete $scope.claimant.Designation;
                    delete $scope.claimant.NRIC;
                }
            }, function (err) {

            });
        }

    }]);