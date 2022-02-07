angular.module('LogiCon').controller('IMOCodeCntrl', ['$scope', '$uibModal', 'IMOCodeService', '$window', 'growlService', 'Utility',
    function ($scope, $uibModal, IMOCodeService, $window, growlService, Utility) {
    $scope.truefalse = false;
    $scope.IMOCodeList = function (skip, take) {
        IMOCodeService.GetIMOCodeList(skip, take).then(function (d) {
            $scope.imoCodeList = d.data.imoCodeList;
            $scope.totalItems = d.data.totalItems;
        }, function (err) { });
    };

    $scope.AddIMOCode = function (code) {
        
        if (code == 'NEW')
            $scope.truefalse = false;
        else
            $scope.truefalse = true;

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/IMOCode/add-imocode.html?v=' + Utility.Version,
            controller: 'EditIMOCodeCntrl',
            size: 'md',
            resolve: {
                imoCode: function () {
                    return code;
                }
            }
        });

        modalInstance.result.then(function () {
            $scope.IMOCodeList($scope.skip, $scope.limit);
        }, function (err) {
            //growlService.growl(err.statusText, 'danger');
        });
    };

    $scope.DeleteIMOCode = function (code) {
        var result = $window.confirm('Are you sure, do want to delete? \'' + code + '\'');
        if (result) {
            IMOCodeService.DeleteIMOCode(code).then(function (d) {
                growlService.growl('Deleted successfully', 'success');
                $scope.IMOCodeList($scope.skip, $scope.limit);
            }, function (err) { });
        }
    };

    $scope.getData = function () {
        $scope.skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
        $scope.IMOCodeList($scope.skip, $scope.limit);
    };

    $scope.pageChanged = function () {
        $scope.getData();
    };

    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.skip = 0;
    $scope.IMOCodeList($scope.skip, $scope.limit);
}]);