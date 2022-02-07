angular.module('LogiCon').controller('AddOrderEntryTransport', ['$scope', '$uibModalInstance', 'OrderEntryService', 'dataObj', 'growlService', 'UtilityFunc',
    function ($scope, $uibModalInstance, OrderEntryService, dataObj, growlService, UtilityFunc) {
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.tra = angular.copy(dataObj.transItem);
        $scope.IsWebOrder = dataObj.iswebOrder;
        if ($scope.tra.RequiredDate != null && $scope.tra.RequiredDate != undefined)
            $scope.tra.RequiredDate = moment($scope.tra.RequiredDate);

        $scope.isFrmTransportValid = false;
        $scope.$watch('frmTransport.$valid', function (isValid) {
            $scope.isFrmTransportValid = isValid;
        });

        OrderEntryService.GetTransportLookupData().then(function (d) {
            
            $scope.lookupData = d.data;
        }, function (err) { });

        //$scope.sizeTransportChanged = function () {
        //    OrderEntryService.GetSizeType($scope.tra.Size).then(function (d) {            
        //        $scope.lookupData.TypeList = d.data;
        //    }, function () { })
        //};

        $scope.SaveTransport = function (tra) {
            if ($scope.isFrmTransportValid) {
                $uibModalInstance.close(tra);
            } else {
                growlService.growl('please enter all mandatory fields', 'danger');
            }
        };

        
    }]);