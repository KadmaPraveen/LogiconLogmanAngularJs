angular.module('LogiCon').controller('OrderTypeCntrl', ['$scope', '$uibModal', '$timeout', 'OrderTypeService', 'Utility', function ($scope, $uibModal, $timeout, OrderTypeService, Utility) {
    $scope.showLoading = false;
    $scope.AddMovementRules = function (id) {        
        var Mvmt;
        if (id == -1) {
            Mvmt = {
                movementCode: '',
                IsAllowDamageCon: false,
                IsCheckMaxWeight: false,
                IsCheckSealNum: false,
                IsSkipEDI: false
            };
        }
        else {

        }

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Tms/Templates/OrderType/movementrules.html?v=' + Utility.Version,
            controller: 'MovementRulesCntrl',
            size: 'md',
            resolve: {
                MovementRulesData: function () {
                    return {
                        movementListICD: $scope.lookUpVm.movementListICD,
                        Mvmt: Mvmt
                    }
                }
            }
        });

        modalInstance.result.then(function (Mvmt) {
            
        }, function () {
            
        });
    };

    $scope.AddCharges = function () {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Tms/Templates/OrderType/charges.html?v=' + Utility.Version,
            controller: 'ChargesCntrl',
            size: 'md',
            resolve: {
                ChargesModalData: function () {
                    return {
                        chargeCodeList: $scope.lookUpVm.chargeCodeList,
                        paymentTermList: $scope.lookUpVm.paymentTermList,
                        billingToList: $scope.lookUpVm.billingToList
                    }
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    $scope.AddVASCharges = function () {
        
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Tms/Templates/OrderType/vascharges.html?v=' + Utility.Version,
            controller: 'Tms.VASChargesCntrl',
            size: 'md',
            resolve: {
                VASChargesData: function () {                    
                    return {
                        chargeCodeList: $scope.lookUpVm.chargeCodeList,
                        paymentTermList: $scope.lookUpVm.paymentTermList,
                        billingToList: $scope.lookUpVm.billingToList
                    }
                }
            }
        });

        modalInstance.result.then(function () {

        }, function () {

        });
    };

    OrderTypeService.OrderTypeList().then(function (d) {        
        $scope.OrderTypeList = d.data;        
    }, function (err) {

    });

    $scope.OrderTypeDetails = function (OrderTypeCode) {
        $scope.showLoading = true;
        OrderTypeService.OrderTypeItemDetails(OrderTypeCode).then(function (d) {
            $scope.lookUpVm = d.data.lookUpVm;
            $scope.orderType = d.data.orderType;
            
            $timeout(function () {
                $scope.showLoading = false;
            }, 1000);
            
        }, function () { });
    };
}]);

angular.module('LogiCon').controller('MovementRulesCntrl', ['$scope', '$uibModalInstance', 'MovementRulesData', function ($scope, $uibModalInstance, MovementRulesData) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.movementListICD = MovementRulesData.movementListICD;
    $scope.Mvmt = MovementRulesData.Mvmt;
    
    $scope.SaveMvmt = function (Mvmt) {
        $uibModalInstance.close(Mvmt);
    };
}]);

angular.module('LogiCon').controller('ChargesCntrl', ['$scope', '$uibModalInstance', 'ChargesModalData', function ($scope, $uibModalInstance, ChargesModalData) {
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.ChargesModalData = ChargesModalData;
}]);

angular.module('LogiCon').controller('Tms.VASChargesCntrl', ['$scope', '$uibModalInstance', 'VASChargesData', function ($scope, $uibModalInstance, VASChargesData) {
    
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.VASChargesData = VASChargesData;
}]);

app.service('OrderTypeService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.OrderTypeList = function (userId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/ordertype/list').then(function (res) {            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.OrderTypeItemDetails = function (Code) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/ordertype/lookup/' + Code).then(function (res) {            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);