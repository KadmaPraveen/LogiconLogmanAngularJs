angular.module('LogiCon').controller('StandardTarrifCntrl', ['$scope', 'TariffService', '$uibModal', 'Utility', 'UtilityFunc', 'growlService',
    function ($scope, TariffService, $uibModal, Utility, UtilityFunc, growlService) {

    $scope.dateFormat = UtilityFunc.DateFormat();
    $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
    $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();

    $scope.ErrorMsg = false;
    $scope.isFrmDiscountTariffValid = false;
    $scope.$watch('frmDiscountTariff.$valid', function (isValid) {
        $scope.isFrmDiscountTariffValid = isValid;
    });
    $scope.th = {
        tariffDetails: new Array(),
        QuotationNo: UtilityFunc.StandardQuotationkey()
    };    
    $scope.GetLookupData = function () {
        TariffService.GetLookupData().then(function (d) {
            $scope.LookupData = d.data;
        }, function (err) { });
    };
    
    $scope.GetStandardTariff = function () {
        TariffService.GetTariff(UtilityFunc.StandardQuotationkey()).then(function (d) {
            
            if (d.data != null) {
                $scope.th = d.data;

                //if ($scope.th.ExpiryDate == null)
                //    $scope.th.ExpiryDate = undefined;

                if (!angular.isUndefined($scope.th.EffectiveDate) && $scope.th.EffectiveDate != null) {
                    
                    if ($scope.th.EffectiveDate == null) {
                        $scope.th.EffectiveDate = undefined;
                    }
                    else
                        $scope.th.EffectiveDate = moment($scope.th.EffectiveDate);
                }
                if (!angular.isUndefined($scope.th.ExpiryDate) && $scope.th.ExpiryDate != null) {
                    
                    if ($scope.th.ExpiryDate == null) {
                        $scope.th.ExpiryDate = undefined;
                    }
                    else
                        $scope.th.ExpiryDate = moment($scope.th.ExpiryDate);
                }
            }
        }, function (err) { });
    };

    var tariffDetailIndex = -1;
    $scope.AddDetail = function (inx) {
        tariffDetailIndex = inx;        
        $scope.modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/MasterData/Templates/StandardTariff/tariff-detail.html?v=' + Utility.Version,
            size: 'md',
            controller: 'TariffDetailCntrl',
            resolve: {
                dataObj: function () {
                    return {
                        
                        tariffDetail: (tariffDetailIndex == -1 ? {} : $scope.th.tariffDetails[tariffDetailIndex]),
                        tariffDetailArray: $scope.th.tariffDetails,
                        lookUpData: $scope.LookupData
                        
                    };
                }
            }
        });

        $scope.modalInstance.result.then(function (tariffDetail) {
            if (tariffDetailIndex != -1) {
                $scope.th.tariffDetails[tariffDetailIndex] = tariffDetail;
            }
            else {
                if ($scope.th.tariffDetails != null) {
                    $scope.th.tariffDetails.push(tariffDetail);
                }
                else {
                    $scope.th.tariffDetails = new Array();
                    $scope.th.tariffDetails.push(tariffDetail);
                }
            }
        }, function () {

        });
    };

    $scope.SaveDiscountTariff = function (th) {
        
        if ($scope.isFrmDiscountTariffValid && $scope.th.tariffDetails.length > 0) {
            TariffService.SaveTariff(th).then(function (d) {
                growlService.growl('Standard Rate Profile Saved Successfully', 'success');
            }, function () { });
        } else {
            if ($scope.th.tariffDetails.length == 0)
                growlService.growl('Please enter atleast one detail object', 'danger');
            else
                growlService.growl('Please enter all mandatory elements', 'danger');
        }
    };

    $scope.DeleteDetail = function (inx) {
        $scope.th.tariffDetails.splice(inx, 1);
    };



    $scope.GetLookupData();
    $scope.GetStandardTariff();
}]);