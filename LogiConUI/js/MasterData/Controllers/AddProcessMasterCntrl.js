angular.module('LogiCon').controller('AddProcessMasterCntrl', ['$scope', '$uibModalInstance', 'pmCode', 'ProcessMasterService', 'growlService', 'CompanyService',
    function ($scope, $uibModalInstance, pmCode, ProcessMasterService, growlService, CompanyService) {
        $scope.isNew = true;
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.IsProcessMasterExists = function (Code) {
            
            if (Code != '') {
                ProcessMasterService.GetProcess(Code).then(function (d) {
                    
                    if (d.data != null) {
                        growlService.growl('Process Master Code already exists', 'warning');
                        $scope.pm.Code = '';
                    }
                }, function () { });
            }
        };

        $scope.AddProcessMaster = function (pm) {
            if ($scope.isfrmAddProcessMaster) {
                ProcessMasterService.SaveProcess(pm).then(function (d) {
                    $uibModalInstance.close();
                    growlService.growl(d.data, 'success');
                }, function (err) { growlService.growl(err.statusText, 'danger'); });
            }
            else {
                growlService.growl('Please enter all mandatory fields..', 'danger');
            }
        };
        //pm.ModuleTypeDescription = (lookupData.moduleList | filter : { Value: pm.Module })[0].Text
        $scope.isfrmAddProcessMaster = false;
        $scope.$watch('frmAddProcessMaster.$valid', function (isValid) {
            $scope.isfrmAddProcessMaster = isValid;
        });

        ProcessMasterService.getLookupData().then(function (d) {
            $scope.lookupData = d.data;
        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });

        $scope.isProcessType = true;
        $scope.isPickupFrom = true;
        $scope.isDeliveryTo = true;
        $scope.isEmptyFull = true;
        $scope.isMovementIndicator = true;
        $scope.isTransportMode = true;
        $scope.isFreightMode = true;
        $scope.isRequiredPlanning = true;
        $scope.isRequiredStaging = true;

        $scope.ValidateProcessType = function (module, processType) {
            if (module == 4054 || module == 4057) {
                $scope.isRequiredStaging = true;
                $scope.isRequiredPlanning = true;
                $scope.pm.IsPlanningRequired = false;
                $scope.pm.IsStagingRequired = false;
                if (processType == 1013 || processType == 1011)
                    $scope.isRequiredStaging = false;
                if (processType == 1013)
                    $scope.isRequiredPlanning = false;
            }
        };

        $scope.ValidateModule = function (module) {
            $scope.isProcessType = true;
            $scope.isPickupFrom = true;
            $scope.isDeliveryTo = true;
            $scope.isEmptyFull = true;
            $scope.isMovementIndicator = true;
            $scope.isTransportMode = true;
            $scope.isFreightMode = true;
            $scope.isRequiredPlanning = true;
            $scope.isRequiredStaging = true;

            $scope.pm.ProcessType = undefined;
            $scope.pm.TransportMode = undefined;
            $scope.pm.PickupFrom = undefined;
            $scope.pm.FreightMode = undefined;
            $scope.pm.DeliveryTo = undefined;
            $scope.pm.IsPlanningRequired = false;
            $scope.pm.EFIndicator = undefined;
            $scope.pm.IsStagingRequired = false;
            $scope.pm.MovementIndicator = undefined;

            //FREIGHT
            if (module == 4058) {
                $scope.isProcessType = false;
                $scope.isPickupFrom = false;
                $scope.isDeliveryTo = false;
                $scope.isEmptyFull = false;
                $scope.isMovementIndicator = false;
                $scope.isTransportMode = true;
                $scope.isFreightMode = true;
                $scope.isRequiredPlanning = true;
                $scope.isRequiredStaging = false;
            }
            //HAULAGE OR TRANSPORT
            else if (module == 4054 || module == 4057) {
                $scope.isProcessType = true;
                $scope.isPickupFrom = true;
                $scope.isDeliveryTo = true;
                $scope.isEmptyFull = false;
                $scope.isMovementIndicator = false;
                $scope.isTransportMode = true;
                $scope.isFreightMode = true;
                $scope.isRequiredPlanning = true;
                $scope.isRequiredStaging = true;
            }
            //WAREHOUSE OR CFS
            else if (module == 4056 || module == 9151) {
                $scope.isProcessType = false;
                $scope.isPickupFrom = false;
                $scope.isDeliveryTo = false;
                $scope.isEmptyFull = false;
                $scope.isMovementIndicator = true;
                $scope.isTransportMode = false;
                $scope.isFreightMode = false;
                $scope.isRequiredPlanning = true;
                $scope.isRequiredStaging = false;
            }
            //PORT OR DEPOT
            else if (module == 4055 || module == 9153) {
                $scope.isProcessType = false;
                $scope.isPickupFrom = false;
                $scope.isDeliveryTo = false;
                $scope.isEmptyFull = true;
                $scope.isMovementIndicator = true;
                /*New changes : Maruthi*/
                $scope.isTransportMode = true;
                $scope.isFreightMode = true;
                /*End*/
                $scope.isRequiredPlanning = true;
                $scope.isRequiredStaging = false;
            }
            //MANIFEST OR 1STATS OR BILLING OR SALES OR DECLARATION
            else if (module == 4059 || module == 9150 || module == 9155 || module == 9154 || module == 9152) {
                $scope.isProcessType = false;
                $scope.isPickupFrom = false;
                $scope.isDeliveryTo = false;
                $scope.isEmptyFull = false;
                $scope.isMovementIndicator = false;
                $scope.isTransportMode = false;
                $scope.isFreightMode = false;
                $scope.isRequiredPlanning = false;
                $scope.isRequiredStaging = false;
                growlService.growl('invalid Module', 'danger');
            }

        };
        
        if (pmCode != -1) {
            ProcessMasterService.GetProcess(pmCode).then(function (d) {
                $scope.isNew = false;
                $scope.ValidateModule(d.data.Module);
                if (d.data.ProcessType != 0)
                    $scope.ValidateProcessType(d.data.Module, d.data.ProcessType);
                $scope.pm = d.data;
            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
    }]);