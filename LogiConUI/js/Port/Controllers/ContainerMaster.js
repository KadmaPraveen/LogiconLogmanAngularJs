angular.module('LogiCon').controller('ContainerMasterCntrl', ['$scope', 'ContainerMasterService', 'OrderEntryService', 'MerchantProfileService', 'growlService', 'limitToFilter', function ($scope, ContainerMasterService, OrderEntryService, MerchantProfileService, growlService, limitToFilter) {


    $scope.containermaster = {

        ContainerStatusUpdates: new Array()
    }


    $scope.getLookupData = function () {
        ContainerMasterService.getLookupData().then(function (d) {
            $scope.lookUpData = d.data;
        }, function (err) {

        });
    };



    $scope.sizeChanged = function () {
        OrderEntryService.GetSizeType($scope.containermaster.Size).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
        }, function () { })
    };

    $scope.AgentResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {

            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.CustomerSelected2 = function (item, type) {

        if (type == 'AgentCode') {
            MerchantProfileService.GetMerchantProfile(item.Value).then(function (d) {

                $scope.containermaster.OwnerCode = d.data.merchant.OwnerCode;

            }, function (err) { });
        }
    };



    $scope.PortResults = function ($query) {

        if ($query != '') {
            return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer', { cache: true }).then(function (response) {
                return response.data;
            });
        }
        else {
            return [];
        }
    }




    //test


    $scope.TextBoxChanged = function () {
        $scope.TextBoxStatus = $scope.containermaster.ContainerNo;
        if ($scope.ContainerNo != '') {
            $scope.getLookupData();
            ContainerMasterService.GetContainerMaster($scope.containermaster.ContainerNo).then(function (d) {
                $scope.containermaster = d.data;
                $scope.sizeChanged();
                
                //$scope.ContainerFixPorts = d.data.ContainerFixPorts;
                $scope.ContainerFixPorts = {};

                for (var i = 0; i < d.data.ContainerFixPorts.length; i++) {
                    var obj = {
                        Text: d.data.ContainerFixPorts[i].PortName,
                        Value: d.data.ContainerFixPorts[i].PortCode
                    };
                }

                $scope.ContainerFixPorts.push(obj);

                $scope.ContainerStausUpdates = d.data.ContainerStatusUpdates;
                
            }, function (err) { });
        }
    };

    $scope.DeleteContainerMaster = function () {
        if ($scope.ContainerNo != '') {
            ContainerMasterService.DeleteContainerMaster($scope.containermaster.ContainerNo).then(function (d) {

            }, function (err) { });
        }
    }

    $scope.ContainerFixPorts = new Array();


    $scope.AddContainerInfoDetails = function (containermaster) {
        

        var fixportResults = $scope.ContainerFixPorts;
        containermaster.ContainerFixPorts = new Array();

        for (var i = 0; i < fixportResults.length; i++) {
            var obj = {

                PortCode: fixportResults[i].Value,
                PortName: fixportResults[i].Text,

            };
            $scope.containermaster.ContainerFixPorts.push(obj);

        }

        
        ContainerMasterService.SaveContainerStatus(containermaster).then(function (d) {
            $location.path('/tms/containermaster');


            growlService.growl('Success', 'success');
        }, function (err) { });
    }


    $scope.AddContainerFixPort = function () {
        
        var fixportResults = $scope.ContainerFixPorts;
        
        containermaster.ContainerFixPorts = new Array();

        for (var i = 0; i < fixportResults.length; i++) {
            var obj = {
                ContainerNo:$scope.containermaster.ContainerNo,
                PortCode: fixportResults[i].Value,
                PortName: fixportResults[i].Text

            };

            ContainerMasterService.SaveContainerPortFix(obj).then(function (d) {
                
                growlService.growl('Success', 'success');
            }, function (err) { });
        }
    }


    $scope.AddContainerFixPort = function () {
        
        var fixportResults = $scope.ContainerFixPorts;

        containermaster.ContainerFixPorts = new Array();

        for (var i = 0; i < fixportResults.length; i++) {
            var obj = {
                ContainerNo: $scope.containermaster.ContainerNo,
                PortCode: fixportResults[i].Value,
                PortName: fixportResults[i].Text
            };

            ContainerMasterService.SaveContainerPortFix(obj).then(function (d) {
                
                growlService.growl('Success', 'success');
            }, function (err) { });
        }
    }


    $scope.UpdateContainerStatus = function () {
        
        
        var ContainerStatusUpdates = $scope.containermaster.ContainerStatusUpdates;   

        for (var i = 0; i < ContainerStatusUpdates.length; i++) {
            var obj = {
                ContainerNo: $scope.containermaster.ContainerNo,
                ApprovalDateTime: ContainerStatusUpdates[i].ApprovalDateTime,
                StartDateTime: ContainerStatusUpdates[i].StartDateTime,
                EndDateTime: ContainerStatusUpdates[i].EndDateTime,
                ContainerStatus: ContainerStatusUpdates[i].ContainerStatus
            };

            ContainerMasterService.ContainerStatusUpdates(obj).then(function (d) {
                
                growlService.growl('Success', 'success');
            }, function (err) { });
        }
    }



    $scope.getLookupData();

    //$scope.containermaster.ContainerStausUpdates = new Array();

    $scope.AddContainerStatusDetails = function (containerstatus) {
        
        //containermaster.ContainerStausUpdates = new Array();

        var obj = {
            ApprovalDateTime: containerstatus.ApprovalDateTime,
            StartDateTime: containerstatus.StartDateTime,
            EndDateTime: containerstatus.EndDateTime,
            ContainerStatus: containerstatus.ContainerStatus
        }
        $scope.containermaster.ContainerStatusUpdates.push(obj);

        $scope.containerstatus = {}
    }
}]);

/*
$scope.containerMaster = {
 ownercode: '',
 list: {},
 lst2: {}
};
*/