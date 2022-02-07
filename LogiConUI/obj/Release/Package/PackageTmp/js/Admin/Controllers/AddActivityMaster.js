angular.module('LogiCon').controller('AddActivityMasterctrl', ['$scope', '$uibModalInstance', 'dataObj', 'ActivityService', 'UtilityFunc', 'growlService',
    function ($scope, $uibModalInstance, dataObj, ActivityService, UtilityFunc, growlService) {
        
    $scope.init = function () {       

        $scope.a = {    
            ActivityCode: 0,
            CompanyID: UtilityFunc.CompanyID(),
            ModuleId: dataObj.moduleId,            
            Description: '',
            JobType: 0,            
            TrackingType: 0,
            TrackingMode: 0,
            IsSystemActivity: false,
            ExpLeadTime: 0,
            ImpLeadTime: 0,
            LocalLeadTime: 0,
            IsEDI: false,
        };

        $scope.IsFrmActivityValid = false;
        $scope.$watch('frmActivity.$valid', function (isValid) {
            $scope.IsFrmActivityValid = isValid;
        });

        $scope.GetLookupData();
        
        if (dataObj.actCode != -1)
            $scope.GetActivityData(dataObj.actCode, $scope.a.ModuleId);
    };

    $scope.GetLookupData = function () {
        ActivityService.GetLookUpData().then(function (d) {
            debugger;
            $scope.lookUpData = d.data;
        }, function (err) { });
    };

    $scope.GetActivityData = function (actCode, moduleId) {
        ActivityService.GetActivity(actCode, moduleId).then(function (d) {
            $scope.a = d.data;
        }, function (err) { });
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.SaveActivity = function (a) {        
        if ($scope.IsFrmActivityValid) {
            
            ActivityService.saveActivity(a).then(function (d) {
                growlService.growl('Saved Successfully..', 'success');
                $uibModalInstance.close();
            }, function (err) { });
        } else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }        
    };

    $scope.init();
}]);