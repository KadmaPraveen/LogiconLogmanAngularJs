angular.module('LogiCon').controller('AddEditPUDOMasterCntrl', ['$scope', '$uibModalInstance', 'pudomaster', 'PUDOMasterService', 'growlService',
    function ($scope, $uibModalInstance, pudomaster, PUDOMasterService, growlService) {
   
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $scope.isfrmAddPUDOMaster = false;
    };

    $scope.isfrmAddPUDOMaster = false;
    $scope.$watch('frmAddPUDOMaster.$valid', function (isValid) {
        
        $scope.isfrmAddPUDOMaster = isValid;
    });


    $scope.GetPUDOCodes = function (BookingTypeId) {
       
        var bookingTypeDesc = $.grep($scope.bookingtypeList, function (BookingType) {
           
            return BookingType.Value == BookingTypeId;
        })[0].Text;
       
        PUDOMasterService.GetPUDOModeList(bookingTypeDesc).then(function (d) {            
            $scope.pudomodeList = d.data;
        });
    };

    $scope.GetMovementCodes = function (orderType) {
              
        PUDOMasterService.GetMovementCodeList(orderType).then(function (d) {
            $scope.movementcodeList = d.data;
        });
    };
    
    $scope.AddPUDOMaster = function (pudomaster) {
        
        if ($scope.isfrmAddPUDOMaster) {
          
            PUDOMasterService.SavePUDOMaster(pudomaster).then(function (d) {
                $uibModalInstance.close();
                growlService.growl(d.data, 'success');

            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
        else {
            
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };

    if (pudomaster != -1) {
        
        PUDOMasterService.GetPUDOMaster(pudomaster).then(function (d) {
            
            $scope.pudomodeList = $scope.GetPUDOCodes(pudomaster.JobType);
            $scope.movementcodeList = $scope.GetMovementCodes(pudomaster.OrderType);
            $scope.pudomaster = d.data;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });

    }

    PUDOMasterService.GetBookingTypeList().then(function (d) {
        $scope.bookingtypeList = d.data;
    });

    //PUDOMasterService.GetPUDOModeList().then(function (d) {
    //    
    //    $scope.pudomodeList = d.data;
    //});

    PUDOMasterService.GetOrderTypeList().then(function (d) {
        
        $scope.ordertypeList = d.data;
    });


    //$scope.ordertypeList = [
    //{ Value: "2001", Text: "1" },
    // { Value: "2002", Text: "2" },
    //];

    //$scope.movementcodeList = [
    //{ Value: "9001", Text: "1" },
    // { Value: "9002", Text: "2" },
    //];

    //PUDOMasterService.GetOrderTypeList().then(function (d) {
    //    
    //    $scope.ordertypeList = d.data;
    //});

    //PUDOMasterService.GetMovementCodeList().then(function (d) {
    //    $scope.movementcodeList = d.data;
    //});

/*
    if (pudomaster != -1) {
        PUDOMasterService.GetPUDOMaster(pudomaster).then(function (d) {
            $scope.pudomaster = d.data;
        }, function (err) { growl.error(err.statusText, {}); });

    }*/

}]);