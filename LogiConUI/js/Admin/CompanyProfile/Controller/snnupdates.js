app.controller('SsnController', ['$scope', '$uibModal', 'Utility', 'SnnService', 'UtilityFunc', function ($scope, $uibModal, Utility, SnnService, UtilityFunc) {

    $scope.DateFormat = UtilityFunc.DateFormat();
    $scope.cancel = function () {
        $uibModal.dismiss('cancel');
    };
    $scope.IsSnnFormValid = false;
    $scope.$watch('frmSnn.$valid', function (isValid) {
        $scope.IsSnnFormValid = isValid;
    });

    $scope.SaveSnn = function (snn) {
        debugger;
        if ($scope.IsSnnFormValid) {
            SnnService.savesnnupdate(snn).then(function (res) {
                debugger;
            }, function (err) {
                debugger;
            });
        }
    }
    var addSnnUpdate = -1;
    $scope.AddSnnUpdate = function (inx) {
        addSnnUpdate = inx;
        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Admin/CompanyProfile/Templates/addsnn.html?v=' + Utility.Version,
            size: 'md',
            controller: 'SsnController'

        });
    }
}]);