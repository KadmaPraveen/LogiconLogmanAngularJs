angular.module('LogiCon').controller('GSTRateCntrl', ['$scope', 'GstRateService', '$uibModal', '$window', 'growlService', '$stateParams', 'Utility',
    function ($scope, GstRateService, $uibModal, $window, growlService, $stateParams, Utility) {
        $scope.currentPage = 1;
        $scope.limit = 10;
        $scope.AddGSTRateMaster = function (Code) {

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/MasterData/Templates/GSTRate/add-gstrate-master.html?v=' + Utility.Version,
                controller: 'AddEditGSTRateCntrl',
                size: 'md',
                resolve: {
                    gstCode: function () {
                        return Code;
                    }
                }
            });

            modalInstance.result.then(function (gst) {
                //$scope.getData();
                $scope.GstList();
            }, function (err) {
               // growlService.growl(err.statusText, 'danger');
            });
        };


        $scope.GstList = function () {
            var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
            GstRateService.GetGSTRateList(skip, $scope.limit).then(function (d) {
                $scope.gstList = d.data.gstList;
                $scope.totalItems = d.data.totalItems;
            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        };

        $scope.pageChanged = function () {
            $scope.GstList();
        };

        $scope.getData = function (skip, take) {
            GstRateService.GetGSTRateList(skip, take).then(function (d) {
                $scope.gstList = d.data.gstList;
                $scope.totalItems = d.data.totalItems;
            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        };

        $scope.getData(0, $scope.limit);


        $scope.DeleteGSTRateCode = function (gstCode) {
            if ($window.confirm('Are you sure, you want to delete \'' + gstCode + '\' ?')) {
                GstRateService.DeleteGSTRateCode(gstCode).then(function (d) {
                    growlService.growl('Deleted successfully', 'success');
                    //$scope.getData();
                }, function (err) { });
            }
        };


    }]);


