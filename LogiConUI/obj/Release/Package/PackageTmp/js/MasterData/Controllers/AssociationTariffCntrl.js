angular.module('LogiCon').controller('AssociationTarrifCntrl', ['$scope', 'TariffService', '$uibModal', 'Utility', '$location', '$stateParams', 'growlService', 'UtilityFunc',
    function ($scope, TariffService, $uibModal, Utility, $location, $stateParams, growlService, UtilityFunc) {

        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();

        $scope.ErrorMsg = false;
        $scope.isFrmAssociationTariffValid = false;
        $scope.$watch('frmAssociationTariff.$valid', function (isValid) {
            $scope.isFrmAssociationTariffValid = isValid;
        });
        $scope.th = {
            tariffDetails: new Array(),
            QuotationNo: ''
        };

        $scope.isNew = false;
        var tariffno = ($stateParams.tariffno == undefined || $stateParams.tariffno == '' ? 'NEW' : $stateParams.tariffno);
        if (tariffno == 'NEW' || tariffno == '')
            $scope.isNew = true;
        else
            $scope.isNew = false;

        $scope.GetLookupData = function () {
            $scope.showLoading = true;
            TariffService.GetLookupData().then(function (d) {
                
                $scope.showLoading = false;
                $scope.LookupData = d.data;
            }, function (err) { });
        };



        $scope.GetStandardTariff = function () {
            TariffService.GetTariff(UtilityFunc.StandardQuotationkey()).then(function (d) {
                
                if (d.data != null) {
                    $scope.th = d.data;

                    if ($scope.th.ExpiryDate == null)
                        $scope.th.ExpiryDate = undefined;
                }
            }, function (err) { });
        };



        var tariffDetailIndex = -1;
        $scope.AddDetail = function (inx) {
            tariffDetailIndex = inx;            
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/MasterData/Templates/AssociationTariff/tariff-detail.html?v=' + Utility.Version,
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

        $scope.SaveAssociationTariff = function (th) {
            if ($scope.isFrmAssociationTariffValid && $scope.th.tariffDetails != null && $scope.th.tariffDetails.length > 0) {
                TariffService.SaveTariff(th).then(function (d) {
                    $scope.th = d.data;
                    growlService.growl('Tariff Saved Successfully', 'success');
                }, function (err) {                    
                    growlService.growl('A QUOTATION ALREADY EXISTS WITH THIS DATE RANGE', 'danger')
                    });
            } else {
                if ($scope.isFrmAssociationTariffValid)
                    growlService.growl('Please enter all mandatory fields', 'danger');
                else if ($scope.th.tariffDetails.length == 0)
                    growlService.growl('Please enter atleast one detail', 'danger');
            }
        };

        $scope.DeleteDetail = function (inx) {
            $scope.th.tariffDetails.splice(inx, 1);
        };

        $scope.addAssociationTariff = function (QuotationNo) {
            if (QuotationNo != 'NEW' && QuotationNo != '')
                $location.path('/MasterData/Associationtariff/' + QuotationNo);
            else
                $location.path('/MasterData/Associationtariff/NEW');
        };

        
        if (angular.isUndefined(tariffno) || tariffno == "NEW" || tariffno == '') {
            TariffService.GetList(26101).then(function (d) {
                $scope.tariffList = d.data;
            }, function (err) { });
        } else {
            if (tariffno != 'NEW' && tariffno != '') {
                TariffService.GetTariff(tariffno).then(function (d) {
                    $scope.th = d.data;
                }, function (err) { });
            } else {
                $scope.th = {
                    QuotationNo: ''
                };
            }
        }

        $scope.GetLookupData(tariffno);
    }]);
