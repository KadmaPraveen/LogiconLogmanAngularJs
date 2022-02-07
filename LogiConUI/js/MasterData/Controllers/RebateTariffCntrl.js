angular.module('LogiCon').controller('RebateTarrifCntrl', ['$scope', 'TariffService', '$uibModal', 'Utility', '$stateParams', '$location', 'growlService', 'UtilityFunc',
    function ($scope, TariffService, $uibModal, Utility, $stateParams, $location, growlService, UtilityFunc) {

        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();

        $scope.ErrorMsg = false;
        $scope.isFrmRebateTariffValid = false;
        $scope.$watch('frmRebateTariff.$valid', function (isValid) {
            $scope.isFrmRebateTariffValid = isValid;
        });
        $scope.th = {
            tariffDetails: new Array()
        };
        $scope.GetLookupData = function () {
            TariffService.GetLookupData().then(function (d) {
                $scope.LookupData = d.data;
            }, function (err) { });
        };

        var tariffDetailIndex = -1;
        $scope.AddDetail = function (inx) {
            tariffDetailIndex = inx;
            //
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/MasterData/Templates/RebateTariff/tariff-detail.html?v=' + Utility.Version,
                size: 'md',
                controller: 'TariffDetailCntrl',
                resolve: {
                    dataObj: function () {
                        return {
                            tariffDetail: (tariffDetailIndex == -1 ? {} : $scope.th.tariffDetails[tariffDetailIndex]),
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

        $scope.SaveRebateTariff = function (th) {
            if ($scope.isFrmRebateTariffValid && $scope.th.tariffDetails.length > 0) {
                TariffService.SaveTariff(th).then(function (d) {
                    growlService.growl('Tariff Saved Successfully', 'success');
                }, function () { });
            } else {
                if ($scope.isFrmRebateTariffValid)
                    growlService.growl('Please enter all mandatory fields', 'danger');
                else if ($scope.th.tariffDetails.length == 0)
                    growlService.growl('Please enter atleast one detail', 'danger');
            }
        };

        $scope.DeleteDetail = function (inx) {
            $scope.th.tariffDetails.splice(inx, 1);
        };

        $scope.addDiscountTariff = function (QuotationNo) {
            if (QuotationNo != 'NEW')
                $location.path('/MasterData/rebatetariff/' + QuotationNo);
            else
                $location.path('/MasterData/rebatetariff/NEW');
        };

        var tariffno = $stateParams.tariffno;
        if (angular.isUndefined(tariffno)) {
            TariffService.GetList(26101).then(function (d) {
                $scope.tariffList = d.data;
            }, function (err) { });
        } else {
            if (tariffno != 'NEW') {
                TariffService.GetTariff(tariffno).then(function (d) {
                    $scope.th = d.data;
                }, function (err) { });
            } else {
                $scope.th = {
                    QuotationNo: ''
                };
            }
        }

        $scope.GetLookupData();
    }]);