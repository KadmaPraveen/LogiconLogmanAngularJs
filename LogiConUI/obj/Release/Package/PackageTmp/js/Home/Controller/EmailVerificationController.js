angular.module('LogiConMain').controller('EmailVerificationCntrl', ['$scope', '$stateParams', '$location', 'VerificationService', 'growlService', '$timeout', function ($scope, $stateParams, $location, VerificationService, growlService, $timeout) {
    
    $scope.showAnimation = false;
    $scope.Failed = false;
    $scope.showLoading = true;
    if (angular.isUndefined($stateParams.uniqueid)) {
        $scope.showLoading = false;
        growlService.growl('This link is expired.', 'warning');

        $timeout(function () {
            //$location.path('/login')
            location.href = 'default.html';
        }, 10000);
    } else {
        var uniqueid = $stateParams.uniqueid;
        VerificationService.EmailVerification(uniqueid).then(function (d) {
            $scope.showLoading = false;
            $scope.showAnimation = true;
            growlService.growl('Your email has verified.', 'success');

            $timeout(function () {
                //$location.path('/login')
                location.href = 'default.html';
            }, 10000);
        }, function (err) {
            
            $scope.showLoading = false;
            $scope.Failed = true;
            growlService.growl('EMAIL ALREADY VERIFIED OR INVALID EMAILTOKEN', 'danger');

            $timeout(function () {
                //$location.path('/login')
                location.href = 'default.html';
            }, 10000);
        });        
    }
}]);