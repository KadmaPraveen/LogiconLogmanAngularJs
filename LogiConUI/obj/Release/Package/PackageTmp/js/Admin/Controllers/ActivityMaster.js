angular.module('LogiCon').controller('ActivityMaster', ['$scope', '$uibModal', 'Utility', 'ActivityService','UtilityFunc',
    function ($scope, $uibModal, Utility, ActivityService, UtilityFunc) {
        var temp = UtilityFunc.IsDefaultBranch();
        $scope.init = function () {
            //$scope.GetActivityList();
            $scope.GetModules();
        };

        $scope.GetActivityList = function (module) {
            ActivityService.GetAll(module).then(function (d) {
                $scope.data = d.data;
            }, function (err) { });
        };

        $scope.GetModules = function () {
            ActivityService.GetModules().then(function (d) {
                $scope.modules = d.data;
            }, function (err) { });
        };

        $scope.AddActivityMasterIndex = function (actCode) {
            
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Admin/Views/ActivityMaster/AddActivityMaster.html?v=' + Utility.Version,
                controller: 'AddActivityMasterctrl',
                windowClass: 'app-modal-window3',
                resolve: {
                    dataObj: function () {
                        return {
                            actCode: actCode,
                            moduleId: $scope.Module
                        }
                    }
                }
            });
            modalInstance.result.then(function (res) {
                $scope.GetActivityList($scope.Module);
            });
        }

        $scope.moduleSelected = function (module) {
            $scope.GetActivityList(module);
        };

        $scope.init();

    }]);

