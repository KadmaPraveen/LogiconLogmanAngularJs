angular.module('LogiCon').controller('GateInCntrl', ['$scope', 'GateInService', 'OrderEntryService', 'MerchantProfileService', 'limitToFilter', 'growlService',
    function ($scope, GateInService, OrderEntryService, MerchantProfileService, limitToFilter, growlService) {
    $scope.gi = {
        TruckMovementDetailList: [],        
    };

    $scope.imagesList = new Array();

    $scope.tmdl = {
        containermovementItem: {}
    };
    $scope.containerMovement = {};
    $scope.getLookupData = function () {
        GateInService.getLookupData().then(function (d) {            
            $scope.lookUpData = d.data;
        }, function (err) {

        });
    };

    $scope.HaulierResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'Transporter').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.AgentResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.MerchantResults = function ($query) {
        return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.CustomerSelected = function (item, type) {
        $scope.gi[type] = item.Value;
    };

    $scope.CustomerSelected2 = function (item, type) {
        $scope.tmdl.containermovementItem[type] = item.Value;

        if (type == 'AgentCode') {
            MerchantProfileService.GetMerchantProfile(item.Value).then(function (d) {
                $scope.tmdl.containermovementItem.OwnerCode = d.data.merchant.OwnerCode;
                
            }, function (err) { });
        }
    };

    $scope.sizeChanged = function () {
        OrderEntryService.GetSizeType($scope.tmdl.containermovementItem.Size).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
        }, function () { })
    };

    $scope.Status1OnChange = function () {
        $scope.tmdl.containermovementItem.ContainerStatus2 = $scope.tmdl.containermovementItem.ContainerLockStatus = $scope.tmdl.containermovementItem.ContainerStatus1;
    };

    $scope.DamageResults = function ($query) {        
        return GateInService.getDamageData($query).then(function (d) {           
            return d.data.damageList;
        }, function (err) { });
    };

    $scope.IsfrmGateInValid = false;
    $scope.$watch('frmGateIn.$valid', function (valid) {
        $scope.IsfrmGateInValid = valid;
    });

    $scope.SaveGateIn = function () {        
        if ($scope.IsfrmGateInValid && $scope.gi.TruckMovementDetailList.length > 0) {
            GateInService.SaveGateIn($scope.gi).then(function (d) {
                growlService.growl('Success', 'success');
            }, function (err) { });
        } else {
            if ($scope.gi.TruckMovementDetailList.length <= 0) {
                growlService.growl('Please add atleast one detail item', 'danger');
            }
            else 
                growlService.growl('Please enter all mandatory fields', 'danger');
        }        
    };

    $scope.IsfrmGateInDetailValid = false;
    $scope.$watch('frmGateInDetail.$valid', function (valid) {
        $scope.IsfrmGateInDetailValid = valid;
    });

    $scope.GetImage = function (tripType) {
        var imgTag = '';
        if (tripType == 1511)
            imgTag = '<img height="80" class="img-circle fa-flip-horizontal" src="../../../../images/open_2_ton_selected.png" />';
        else if (tripType == 1512)
            imgTag = '<img height="80" class="img-circle" src="../../../../images/closed_2_ton_selected.png" />';
        else if (tripType == 1513)
            imgTag = '<img height="80" class="img-circle fa-flip-horizontal" src="../../../../images/open_2_ton_selected.png" />';
        else if (tripType == 1514)
            imgTag = '<img height="80" class="img-circle" src="../../../../images/closed_2_ton_selected.png" />';

        return imgTag;
    };

    var currentIndex = -1;
    $scope.AddGateInDetail = function () {        
        if ($scope.IsfrmGateInDetailValid) {
            if (currentIndex == -1) {
                $scope.tmdl.TransctionKey = $scope.gi.TruckMovementDetailList.length;
                /**/
                $scope.tmdl.Size = $scope.tmdl.containermovementItem.Size;
                $scope.tmdl.Type = $scope.tmdl.containermovementItem.Type;
                $scope.tmdl.MovementCode = $scope.tmdl.containermovementItem.MovementCode;
                $scope.tmdl.EFIndicator = $scope.tmdl.containermovementItem.EFIndicator;
                /**/
                if ($scope.tmdl.TripType != 1512) {
                    $scope.tmdl.containermovementItem = {};
                }
                $scope.gi.TruckMovementDetailList.push($scope.tmdl);
                $scope.imagesList.push({
                    image: $scope.GetImage($scope.tmdl.TripType),
                    tripType: $scope.tmdl.TripType,
                    index: $scope.tmdl.TransctionKey
                });
            }
            else {
                $scope.gi.TruckMovementDetailList[index] = $scope.tmdl;
            }
            $scope.submittedDetail = false;
            $scope.tmdl = {};
            currentIndex = -1;
        } else {            
            growlService.growl('Please enter all mandatory fields', 'danger');
        }        
    };

    $scope.RemoveGateInDetail = function () {        
        if (currentIndex != -1) {
            $scope.gi.TruckMovementDetailList.splice(currentIndex, 1);
            $scope.imagesList.splice(currentIndex, 1);
            currentIndex = -1;
            $scope.tmdl = {};            
        }
    };

    $scope.ClearGateInDetail = function () {
        $scope.tmdl = {};
        currentIndex = -1;
    };

    $scope.TripChanged = function () {
        
    };

    $scope.GetTruckMovementDetail = function (index) {
        
        currentIndex = index;
        $scope.tmdl = $scope.gi.TruckMovementDetailList[index];
    };

    $scope.GateInTransLoadingResults = function ($query) {        
        return GateInService.SearchGateInTrans($query).then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.GateInTransSelected = function (obj) {
        $scope.search = obj.TransactionNo;
        GateInService.GetGateInTrans(obj.TransactionNo).then(function (d) {            
            $scope.gi = d.data;
            $scope.imagesList = new Array();
            for (var i = 0; i < $scope.gi.TruckMovementDetailList.length; i++) {
                $scope.imagesList.push({
                    image: $scope.GetImage($scope.gi.TruckMovementDetailList[i].TripType),
                    tripType: $scope.gi.TruckMovementDetailList[i].TripType,
                    index: i
                });
            }
        }, function (err) { });
    };

    $scope.checkValidation = function () {
        if ($scope.tmdl.TripType == '1512')
            return true;
        else
            return false;
    };
        

    $scope.$watch('tmdl.containermovementItem.bookingBLNo', function (newVal, oldVal) {
        //
    })

    $scope.getLookupData();

    }]);

/*
Size, Type, MovementCode, EFIndicator
*/