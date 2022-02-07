angular.module('LogiCon').controller('k3ItemEntry', ['$scope', '$uibModalInstance', 'HSCodeService', 'ItemEntryService', 'limitToFilter', '$filter', 'dataObj', 'growlService', 'UtilityFunc', 'k3Service', '$timeout',
    function ($scope, $uibModalInstance, HSCodeService, ItemEntryService, limitToFilter, $filter, dataObj, growlService, UtilityFunc, k3Service, $timeout) {
        $scope.validateInputDecimal = function () {
            $timeout(function () {
                if ($scope.frmItemEntry.StatisticalQty.$viewValue != null) {
                    $scope.frmItemEntry.StatisticalQty.$$runValidators($scope.frmItemEntry.StatisticalQty.$modalValue, $scope.frmItemEntry.StatisticalQty.$viewValue, function () {
                $scope.frmItemEntry.StatisticalQty.$setViewValue($scope.frmItemEntry.StatisticalQty.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
            });
            }
                if ($scope.frmItemEntry.DeclaredQty.$viewValue != null) {
                    $scope.frmItemEntry.DeclaredQty.$$runValidators($scope.frmItemEntry.DeclaredQty.$modalValue, $scope.frmItemEntry.DeclaredQty.$viewValue, function () {
                        $scope.frmItemEntry.DeclaredQty.$setViewValue($scope.frmItemEntry.DeclaredQty.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
            });
                }
                if ($scope.frmItemEntry.ItemAmount.$viewValue != null) {
                    $scope.frmItemEntry.ItemAmount.$$runValidators($scope.frmItemEntry.ItemAmount.$modalValue, $scope.frmItemEntry.ItemAmount.$viewValue, function () {
                        $scope.frmItemEntry.ItemAmount.$setViewValue($scope.frmItemEntry.ItemAmount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
               }
            }, 500);
        }
        $scope.init = function () {
            $scope.ie = {
                BranchID: null,
                DeclarationNo: null,
                ItemNo: null,
                OrderNo: null,
                ContainerKey: null,
                CargoKey: null,
                ProductCode: null,
                ProductDescription: null,
                HSCode: null,
                OriginCountryCode: null,
                StatisticalQty: null,
                StatisticalUOM: null,
                DeclaredQty: null,
                DeclaredUOM: null,
                ItemAmount: null,
                ItemDescription1: null,
                ItemDescription2: null,
                VehicleType: null,
                VehicleBrand: null,
                VehicleModel: null,
                VehicleEngineNo: null,
                VehicleChassisNo: null,
                VehicleCC: null,
                VehicleYear: null,
                UsedVehicleRegistrationDate: null,
                UnitLocalAmount: null,
                TotalUnitLocalAmount: null,
                ECCNNo: null,
                LotNo: null,
                Location: null,
                declarationSubItemK3: new Array()
            };
            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.subItems = new Array();


            $scope.defaultCountry = UtilityFunc.DefaultCountry();
            //$scope.GetLookupData();
            //$scope.IncoTermCalcuation();
            //$scope.frmk3.GrossVolume.$$runValidators($scope.frmk3.GrossVolume.$modalValue, $scope.frmk3.GrossVolume.$viewValue, function () {
            //    $scope.k3.declarationInvoiceK3.GrossVolume = $scope.frmk3.GrossVolume.$viewValue;
            //});

        };
        $scope.init();

        $scope.ie = angular.copy(dataObj.itemEntry);
        //$scope.validateInputDecimal();
        $scope.subItems = $scope.ie.declarationSubItemK3;

        if (!angular.isUndefined($scope.ie) && $scope.ie != null) {
            if ($scope.ie.UsedVehicleRegistrationDate == null) {
                $scope.ie.UsedVehicleRegistrationDate = undefined;
            }
            else
                $scope.ie.UsedVehicleRegistrationDate = moment($scope.ie.UsedVehicleRegistrationDate);
        }

        var OldPDKAHTN = $scope.ie.HSCode;
        $scope.CIFC = dataObj.CIFC;
        $scope.FOB = dataObj.FOB;
        $scope.EXW = dataObj.EXW;
        $scope.CIF = dataObj.CIF;
        $scope.CNF = dataObj.CNF;
        $scope.CNI = dataObj.CNI;
        $scope.Freight = dataObj.Freight;
        $scope.insurance = dataObj.insurance;
        $scope.isFreightCurrency = dataObj.isFreightCurrency;
        $scope.isInsuranceCurrency = dataObj.isInsuranceCurrency;
        $scope.incoTerm = dataObj.incoTerm;
        $scope.port = dataObj.port;
        $scope.otherCharges = dataObj.otherCharges;

        $scope.showLoading = true;
        $scope.ie.UnitCurrency = dataObj.invoiceCurrency;
        $scope.ie.UnitCurrencyExchangeRate = dataObj.invoiceCurrencyRate;

        $scope.importRate = 1.0000;
        //$scope.validateInputDecimal();
        //if (!angular.isUndefined($scope.ie.HSCode)) {
        //    $scope.GetHSCodeHeaderObjectByTariffCode($scope.ie.HSCode);
        //}

        var ASEANArray = ['LA', 'VN', 'TH', 'MY', 'SG', 'BN', 'ID', 'PH', 'MM', 'KH'];
        $scope.IsASEAN = $filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0;
        if ($scope.IsASEAN)
            $scope.ie.OldPDKAHTN = $scope.ie.OldAHTN;
        else
            $scope.ie.OldPDKAHTN = $scope.ie.OldPDK;

        $scope.IsASEAN = false;
        $scope.IsOther = false;

        $scope.OriginCountryChange = function () {
            $scope.IsASEAN = $filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0;
            $scope.IsOther = !$scope.IsASEAN;
        };


        $scope.hsCodeValidation = function (type) {
            if (angular.isUndefined($scope.ie.OriginCountryCode) || $scope.ie.OriginCountryCode == '')
                return true;
            else if (type == 'ASEAN') {
                return !($filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0);

            } else if (type == 'OTHER') {
                return $filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0;
            }
        };
        $scope.IncoTermCalcuation = function () {

            var obj = {
                incoTerm: $scope.incoTerm,
                freight: $scope.Freight,
                insurance: $scope.insurance,
                port: $scope.port,
                otherCharges: $scope.otherCharges,
                invoiceValue: $scope.ie.TotalUnitLocalAmount,
                FOB: $scope.FOB,
                CIF: $scope.CIF,
                EXW: $scope.EXW,
                CNF: $scope.CNF,
                CNI: $scope.CNI,
                IsFreightCurrency: $scope.isFreightCurrency,
                IsInsuranceCurrency: $scope.isInsuranceCurrency
            };

            k3Service.OutPutFOBCIF(obj).then(function (d) {
                $scope.ie.FOBValue = d.data.FOB.toFixed(2);
                $scope.ie.CIFValue = d.data.CIF.toFixed(2);
                $scope.ie.EXWValue = d.data.EXW.toFixed(2);
                $scope.ie.CNFValue = d.data.CNF.toFixed(2);
                $scope.ie.CNIValue = d.data.CNI.toFixed(2);
                $scope.ie.FreightValue = d.data.freight.toFixed(2);
                $scope.ie.InsuranceValue = d.data.insurance.toFixed(2);
                $scope.ie.CIFCValue = d.data.CIFC.toFixed(2);
                $scope.showLoading = false;
            }, function (err) {

            });
        };

        $scope.HSCodeChange = function (obj) {
            $scope.ie.HSCode = obj.Value;
            if (obj.Text.indexOf('PETROLEUM') >= 0) {
                $scope.showPetrolPnl = true;
            } else {
                $scope.showPetrolPnl = false;
            }

            $scope.ie.HSCodeDescription = obj.Description;
            $scope.ie.StatisticalUOM = obj.UOMCode;
            $scope.ie.DeclaredUOM = obj.UOMCode;


            $scope.ie.ImportDutyMethod = obj.ImportDutyMethod;


            $scope.ie.ImportExciseMethod = obj.ImportExciseDutyMethod;

            $scope.ie.IsVehicle = obj.IsVehicle;

            $scope.IsASEAN = $filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0;
            if ($scope.IsASEAN)
                $scope.ie.OldPDKAHTN = obj.OldPDK;
            else
                $scope.ie.OldPDKAHTN = obj.OldPDK;

            $scope.GetHSCodeHeaderObject(obj.HeaderCode);
            $scope.CurrencyRateChanged();

        };

        $scope.GetHSCodeHeaderObject = function (headerCode) {
            HSCodeService.GetHSCodeHeader(headerCode).then(function (d) {
                $scope.ie.Description = d.data.HeadingDescription;
            }, function () { });
        };

        $scope.GetHSCodeHeaderObjectByTariffCode = function (tariffCode) {
            HSCodeService.GetHSCodeHeaderByTariffCode(tariffCode).then(function (d) {
                $scope.ie.Description = d.data.HeadingDescription;
            }, function () { });
        };
        if (!angular.isUndefined($scope.ie.HSCode)) {
            $scope.GetHSCodeHeaderObjectByTariffCode($scope.ie.HSCode);
        }

        $scope.HSCodeResults = function (text) {
            return HSCodeService.AutoComplete(text).then(function (res) {
                var ASEANArray = ['LA', 'VN', 'TH', 'MY', 'SG', 'BN', 'ID', 'PH', 'MM', 'KH'];
                $scope.IsASEAN = $filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0;
                if ($scope.IsASEAN)
                    $scope.ie.OldPDKAHTN = res.data["0"].OldPDK;
                else

                    $scope.ie.OldPDKAHTN = res.data["0"].OldPDK;

                $scope.ie.HSCodeDescription = res.data["0"].Description;
                $scope.ie.IsVehicle = res.data["0"].IsVehicle;
                if (!$scope.ie.IsVehicle) {
                    delete $scope.ie.VehicleType;
                    delete $scope.ie.VehicleBrand;
                    delete $scope.ie.VehicleModel;
                    delete $scope.ie.VehicleEngineNo;
                    delete $scope.ie.VehicleChassisNo;
                    delete $scope.ie.VehicleCC;
                    delete $scope.ie.VehicleYear;
                    delete $scope.ie.UsedVehicleRegistrationDate;
                }
                return limitToFilter(res.data, 15);
            }, function (err) { });
        };
        if ($scope.ie.HSCode != null && $scope.ie.HSCode != undefined)
            $scope.HSCodeResults($scope.ie.HSCode);
        $scope.GetLookupData = function () {

            ItemEntryService.GetLookupData().then(function (d) {

                $scope.lookUpData = d.data;
                //$scope.ie.IsVehicle = false;
                var OldPDKAHTN = $scope.ie.HSCode;
                $scope.ie.OldPDKAHTN = OldPDKAHTN;
                if ($scope.ie.IsVehicle) {
                    // $scope.ie.IsVehicle = obj.IsVehicle;
                }
                if ($scope.ie.HSCode != undefined)
                    $scope.ie.HSCodeDescription = $filter('filter')($scope.lookUpData.hsCodeList, { Value: $scope.ie.HSCode })[0].Text;
                if (dataObj.itemEntry.OriginCountryCode == null)
                    $scope.ie.OriginCountryCode = $scope.defaultCountry;

                $scope.importRate = $filter('filter')($scope.lookUpData.currencyList, { Value: dataObj.invoiceCurrency })[0].ImportRate;
                $scope.showLoading = false;
            }, function (err) { });
        };

        $scope.GetLookupData();

        $scope.GetTotalDutyPayableWithOutExemptions = function () {
            var itemAmount = $scope.ie.ItemAmount;
            var declaredQty = $scope.ie.DeclaredQty;
            $scope.ie.UnitLocalAmount = ((itemAmount / declaredQty) * $scope.importRate).toFixed(2);
            $scope.ie.TotalUnitLocalAmount = (itemAmount * dataObj.invoiceCurrencyRate).toFixed(2);


        };

        $scope.CurrencyRateChanged = function () {
            if ($scope.ie.ItemAmount > 0 && $scope.ie.DeclaredQty > 0) {
                $scope.ie.TotalDutyPayable = $scope.GetTotalDutyPayableWithOutExemptions();
                $scope.IncoTermCalcuation();
                // $scope.CalculateExciseDutyExemptions();
            }
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showPetrolPnl = false;


        $scope.IsFrmItemEntryValid = false;
        $scope.$watch('frmItemEntry.$valid', function (isValid) {
            $scope.IsFrmItemEntryValid = isValid;
        });

        $scope.SaveItemEntry = function (ie) {
            console.log(JSON.stringify(ie));
            if ($scope.IsFrmItemEntryValid) {
                //$scope.validateInputDecimal();
                $scope.ie.declarationSubItemK3 = new Array();
                angular.forEach($scope.subItems, function (item, val) {
                    $scope.ie.declarationSubItemK3.push({
                        ItemNo: val,
                        ItemType: item.ItemType,
                        ItemCode: item.ItemCode
                    });
                });
                $uibModalInstance.close(ie);
            }
            else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };

        $scope.validateInputDecimal();
    }]);