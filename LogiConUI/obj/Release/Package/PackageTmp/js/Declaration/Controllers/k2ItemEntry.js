angular.module('LogiCon').controller('AddEditk2ItemEntryCntrl', ['$scope', '$uibModalInstance', 'ItemEntryService', 'limitToFilter', '$filter', 'dataObj', 'growlService', 'UtilityFunc', 'HSCodeService', 'k2Service','$timeout',
function ($scope, $uibModalInstance, ItemEntryService, limitToFilter, $filter, dataObj, growlService, UtilityFunc, HSCodeService, k2Service,$timeout) {
        $scope.validateInputDecimal = function () {
            $timeout(function () {
                if ($scope.frmk2ItemEntry.StatisticalQty.$viewValue != null) {
                    $scope.frmk2ItemEntry.StatisticalQty.$$runValidators($scope.frmk2ItemEntry.StatisticalQty.$modalValue, $scope.frmk2ItemEntry.StatisticalQty.$viewValue, function () {
                        $scope.frmk2ItemEntry.StatisticalQty.$setViewValue($scope.frmk2ItemEntry.StatisticalQty.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk2ItemEntry.DeclaredQty.$viewValue != null) {
                    $scope.frmk2ItemEntry.DeclaredQty.$$runValidators($scope.frmk2ItemEntry.DeclaredQty.$modalValue, $scope.frmk2ItemEntry.DeclaredQty.$viewValue, function () {
                        $scope.frmk2ItemEntry.DeclaredQty.$setViewValue($scope.frmk2ItemEntry.DeclaredQty.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk2ItemEntry.ItemAmount.$viewValue != null) {
                    $scope.frmk2ItemEntry.ItemAmount.$$runValidators($scope.frmk2ItemEntry.ItemAmount.$modalValue, $scope.frmk2ItemEntry.ItemAmount.$viewValue, function () {
                        $scope.frmk2ItemEntry.ItemAmount.$setViewValue($scope.frmk2ItemEntry.ItemAmount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
            }, 500);
        }
        $scope.declarationSubItemK2 = new Array();
        $scope.subItems = new Array();

        $scope.defaultCountry = UtilityFunc.DefaultCountry();
        $scope.dateFormat = UtilityFunc.DateFormat();

        $scope.ie = angular.copy(dataObj.itemEntry);
        $scope.subItems = $scope.ie.declarationSubItemK2;
        $scope.ie.OriginCountryCode = dataObj.itemEntry.OriginCountryCode;

        if (!angular.isUndefined($scope.ie) && $scope.ie != null) {
            if ($scope.ie.UsedVehicleRegistrationDate == null) {
                $scope.ie.UsedVehicleRegistrationDate = undefined;
            }
            else
                $scope.ie.UsedVehicleRegistrationDate = moment($scope.ie.UsedVehicleRegistrationDate);
        }

        
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

            k2Service.OutPutFOBCIF(obj).then(function (d) {
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

        if ($scope.ie.ExportDutyMethod == '0')
            $scope.ie.ExportDutyMethodText = '0 - NO DUTY';
        else if ($scope.ie.ExportDutyMethod == '1') {
            $scope.ie.ExportDutyMethodText = '1 - DUTY BY AD VALOREM';
        } else if ($scope.ie.ExportDutyMethod == '2') {
            $scope.ie.ExportDutyMethodText = '2 - DUTY BY SPECIFIC';
        } else if ($scope.ie.ExportDutyMethod == '3') {
            $scope.ie.ExportDutyMethodText = '3 - DUTY BY WHICH EVER IS HIGHER';
        } else if ($scope.ie.ExportDutyMethod == '4') {
            $scope.ie.ExportDutyMethodText = '4 - DUTY BY BOTH';
        } else if ($scope.ie.ExportDutyMethod == '5') {
            $scope.ie.ExportDutyMethodText = '5 - DUTY BY QUOTA';
        } else if ($scope.ie.ExportDutyMethod == '6') {
            $scope.ie.ExportDutyMethodText = '6 - DUTY BY VOLUME PER LITER';
        }

        $scope.showLoading = true;
        $scope.ie.UnitCurrency = dataObj.invoiceCurrency;
        $scope.ie.UnitCurrencyExchangeRate = dataObj.invoiceCurrencyRate;

        $scope.importRate = 1.0000;
        $scope.HSCodeChange = function (obj) {
            $scope.ie.ExportDutyExemptionRatePercent = 0;
            $scope.ie.ExportDutyExemptionRate = 0;
            $scope.ie.ExportDutyExemptionRateAmount = 0;
            $scope.ie.ExportDutyExemptionAmount = 0;

            $scope.ie.ExportDutySpecificExemptionRatePercent = undefined;
            $scope.ie.ExportDutySpecificExemptionRate = null;
            $scope.ie.ExportDutySpecificExemptionRateAmount = '';
            $scope.ie.ExportDutySpecificExemptionAmount = 0;
            $scope.ie.TotalDutyPayable = 0;

            $scope.ie.ExportDutyRate = 0;
            $scope.ie.ExportDutyRateAmount = 0;
            $scope.ie.ExportDutySpecificRate = 0;
            $scope.ie.ExportDutySpecificRateAmount = 0;

            $scope.ie.UnitLocalAmount = 0;
            $scope.ie.TotalUnitLocalAmount = 0;


            $scope.ie.HSCode = obj.Value;
            if (obj.Text.indexOf('PETROLEUM') >= 0) {
                $scope.showPetrolPnl = true;
            } else {
                $scope.showPetrolPnl = false;
            }

            $scope.ie.HSCodeDescription = obj.Description;
            $scope.ie.StatisticalUOM = obj.UOMCode;
            $scope.ie.DeclaredUOM = obj.UOMCode;


            $scope.ie.ExportDutyMethod = obj.ExportDutyMethod;
            $scope.ie.ExportDutyRate = obj.ExportDutyRate;
            $scope.ie.ExportDutySpecificRate = obj.ExportDutySpecificRate;

            $scope.ie.IsVehicle = obj.IsVehicle;

            var ASEANArray = ['LA', 'VN', 'TH', 'MY', 'SG', 'BN', 'ID', 'PH', 'MM', 'KH'];
            $scope.IsASEAN = $filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0;
            if ($scope.IsASEAN)
                $scope.ie.OldPDKAHTN = $scope.ie.OldAHTN;
            else
                $scope.ie.OldPDKAHTN = $scope.ie.OldPDK;
            $scope.IsASEAN = false;

            $scope.IsASEAN = $filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0;
            if ($scope.IsASEAN)
                $scope.ie.OldPDKAHTN = obj.OldAHTN;
            else
                $scope.ie.OldPDKAHTN = obj.OldPDK;

            if ($scope.ie.ExportDutyMethod == '0')
                $scope.ie.ExportDutyMethodText = '0 - NO DUTY';
            else if ($scope.ie.ExportDutyMethod == '1') {
                $scope.ie.ExportDutyMethodText = '1 - DUTY BY AD VALOREM';
            } else if ($scope.ie.ExportDutyMethod == '2') {
                $scope.ie.ExportDutyMethodText = '2 - DUTY BY SPECIFIC';
            } else if ($scope.ie.ExportDutyMethod == '3') {
                $scope.ie.ExportDutyMethodText = '3 - DUTY BY WHICH EVER IS HIGHER';
            } else if ($scope.ie.ExportDutyMethod == '4') {
                $scope.ie.ExportDutyMethodText = '4 - DUTY BY BOTH';
            } else if ($scope.ie.ExportDutyMethod == '5') {
                $scope.ie.ExportDutyMethodText = '5 - DUTY BY QUOTA';
            } else if ($scope.ie.ExportDutyMethod == '6') {
                $scope.ie.ExportDutyMethodText = '6 - DUTY BY VOLUME PER LITER';
            }

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
            return HSCodeService.AutoCompletek2Export(text).then(function (res) {
                var ASEANArray = ['LA', 'VN', 'TH', 'MY', 'SG', 'BN', 'ID', 'PH', 'MM', 'KH'];
                $scope.IsASEAN = $filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0;
                if ($scope.IsASEAN)
                    $scope.ie.OldPDKAHTN = res.data["0"].OldAHTN;
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
                if ($scope.ie.HSCode != undefined)
                    $scope.ie.HSCodeDescription = $filter('filter')($scope.lookUpData.hsCodeList, { Value: $scope.ie.HSCode })[0].Text;
                if (dataObj.itemEntry.OriginCountryCode == null)
                    $scope.ie.OriginCountryCode = $scope.defaultCountry;

                $scope.exportRate = $filter('filter')($scope.lookUpData.currencyList, { Value: dataObj.invoiceCurrency })[0].ExportRate;
                $scope.showLoading = false;
            }, function (err) { });
        };

        $scope.GetTotalDutyPayableWithOutExemptions = function () {
            var itemAmount = $scope.ie.ItemAmount;
            var declaredQty = $scope.ie.DeclaredQty;
            $scope.ie.UnitLocalAmount = ((itemAmount / declaredQty) * $scope.importRate).toFixed(2);
            $scope.ie.TotalUnitLocalAmount = (itemAmount * dataObj.invoiceCurrencyRate).toFixed(2);

            $scope.ie.ExportDutyRateAmount = (($scope.ie.TotalUnitLocalAmount * $scope.ie.ExportDutyRate) / 100).toFixed(2);
            $scope.ie.ExportDutySpecificRateAmount = ($scope.ie.DeclaredQty * $scope.ie.ExportDutySpecificRate).toFixed(2);

            if ($scope.ie.ExportDutyMethodText == '1 - DUTY BY AD VALOREM') {
                $scope.ie.TotalDutyPayable = $scope.ie.ExportDutyRateAmount;
            } else if ($scope.ie.ExportDutyMethodText == '2 - DUTY BY SPECIFIC') {
                $scope.ie.TotalDutyPayable = $scope.ie.ExportDutySpecificRateAmount;
            } else if ($scope.ie.ExportDutyMethodText == '3 - DUTY BY WHICH EVER IS HIGHER') {
                if ($scope.ie.ExportDutyRateAmount > $scope.ie.ExportDutySpecificRateAmount)
                    $scope.ie.TotalDutyPayable = $scope.ie.ExportDutyRateAmount;
                else
                    $scope.ie.TotalDutyPayable = $scope.ie.ExportDutySpecificRateAmount;

            } else if ($scope.ie.ExportDutyMethodText == '4 - DUTY BY BOTH') {
                $scope.ie.TotalDutyPayable = (parseFloat($scope.ie.ExportDutyRateAmount) + parseFloat($scope.ie.ExportDutySpecificRateAmount)).toFixed(2);

            }

            return $scope.ie.TotalDutyPayable;
        };

        $scope.CurrencyRateChanged = function () {

            if ($scope.ie.ItemAmount > 0 && $scope.ie.DeclaredQty > 0) {
                $scope.ie.TotalDutyPayable = $scope.GetTotalDutyPayableWithOutExemptions();
                $scope.IncoTermCalcuation();
                $scope.CalculateExciseDutyExemptions();
            }
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.showPetrolPnl = false;

        $scope.IsFrmk2ItemEntryValid = false;
        $scope.$watch('frmk2ItemEntry.$valid', function (isValid) {
            $scope.IsFrmk2ItemEntryValid = isValid;
        });

        $scope.Savek2ItemEntry = function (ie) {

            if ($scope.IsFrmk2ItemEntryValid) {
                $scope.ie.declarationSubItemK2 = new Array();
                angular.forEach($scope.subItems, function (item, val) {
                    $scope.ie.declarationSubItemK2.push({
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

        $scope.GetLookupData();
        $scope.IncoTermCalcuation();

        $scope.ExportDutyExemptionValidation = function (type) {
            var exportDutyMethod = $scope.ie.ExportDutyMethod;
            var returnVal = false;
            if (type == 'EXPORT_DUTY_RATE') {
                if (exportDutyMethod == '1' || exportDutyMethod == '3' || exportDutyMethod == '4')
                    returnVal = false;
                else
                    returnVal = true;
            } else if (type == 'EXPORT_DUTY_RATE_SPECIFIC') {
                if (exportDutyMethod == '2' || exportDutyMethod == '3' || exportDutyMethod == '4')
                    returnVal = false;
                else
                    returnVal = true;
            }

            return returnVal;
        };

        $scope.CalculateExciseDutyExemptions = function () {

            $scope.ie.TotalDutyPayable = $scope.GetTotalDutyPayableWithOutExemptions();
            if (!angular.isUndefined($scope.ie.ExportDutyExemptionRatePercent)) {
                var ExportDutyRate = $scope.ie.ExportDutyRate;
                var ExportDutyExemptionRatePercent = $scope.ie.ExportDutyExemptionRatePercent;
                $scope.ie.ExportDutyExemptionRate = (ExportDutyExemptionRatePercent * ExportDutyRate) / 100;
                $scope.ie.ExportDutyExemptionRateAmount = (($scope.ie.TotalUnitLocalAmount * $scope.ie.ExportDutyExemptionRate) / 100).toFixed(2);
                $scope.ie.ExportDutyExemptionAmount = $scope.ie.ExportDutyRateAmount - $scope.ie.ExportDutyExemptionRateAmount;

                //$scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ExportDutyExemptionRateAmount;
            }

            if (!angular.isUndefined($scope.ie.ExportDutySpecificExemptionRatePercent)) {
                var ExportDutySpecificRate = $scope.ie.ExportDutySpecificRate;
                var ExportDutySpecificExemptionRatePercent = $scope.ie.ExportDutySpecificExemptionRatePercent;
                $scope.ie.ExportDutySpecificExemptionRate = (ExportDutySpecificExemptionRatePercent * ExportDutySpecificRate) / 100;
                $scope.ie.ExportDutySpecificExemptionRateAmount = ($scope.ie.DeclaredQty * $scope.ie.ExportDutySpecificExemptionRate).toFixed(2);
                $scope.ie.ExportDutySpecificExemptionAmount = $scope.ie.ExportDutySpecificRateAmount - $scope.ie.ExportDutySpecificExemptionRateAmount;

                //$scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ExportDutySpecificExemptionRateAmount;
            }



            //ExportDutyMethod
            //ExportExciseDutyMethod
            if ($scope.ie.ExportDutyMethod == '1' && !angular.isUndefined($scope.ie.ExportDutyExemptionRatePercent))
                $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ExportDutyExemptionRateAmount;
            else if ($scope.ie.ExportDutyMethod == '2' && !angular.isUndefined($scope.ie.ExportDutySpecificExemptionRatePercent))
                $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ExportDutySpecificExemptionRateAmount;
            else if ($scope.ie.ExportDutyMethod == '3' && (!angular.isUndefined($scope.ie.ExportDutyExemptionRatePercent)) && !angular.isUndefined($scope.ie.ExportDutySpecificExemptionRatePercent)) {
                if ($scope.ie.ExportDutyExemptionRateAmount > $scope.ie.ExportDutySpecificExemptionRateAmount)
                    $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ExportDutyExemptionRateAmount;
                else if ($scope.ie.ExportDutyExemptionRateAmount < $scope.ie.ExportDutySpecificExemptionRateAmount)
                    $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ExportDutySpecificExemptionRateAmount;
            } else if ($scope.ie.ExportDutyMethod == '4' && (!angular.isUndefined($scope.ie.ExportDutyExemptionRatePercent)) && !angular.isUndefined($scope.ie.ExportDutySpecificExemptionRatePercent))
                $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - (parseFloat($scope.ie.ExportDutyExemptionRateAmount) + parseFloat($scope.ie.ExportDutySpecificExemptionRateAmount));



        };
        //$scope.IsExportDutyTariffCodeDisable = false;
        //$scope.ExportDutyMethodChange = function () {
        //    if ($scope.ie.ExportDutyMethod == 25900) {
        //        $scope.ie.ExportDutyTariffCode = 25930;
        //        $scope.IsExportDutyTariffCodeDisable = true;
        //        $scope.ExportDutyCalculation();
        //    } else {
        //        $scope.IsExportDutyTariffCodeDisable = false;
        //    }

        //};

        //$scope.ie.ExportDutyAmount = 0.00;
        //$scope.ie.ExportDutySpecificAmount = 0.00;

        //$scope.ie.TotalPayableAmount = 0.00;
        //$scope.ExportDutyCalculation = function () {
        //    var obj = {
        //        OriginCountryCode: $scope.ie.OriginCountryCode,
        //        HSCode: $scope.ie.HSCode,
        //        CIFC: dataObj.CIFC,
        //        DeclaredQty: $scope.ie.DeclaredQty,
        //        DeclaredUOM: $scope.ie.DeclaredUOM,
        //        StatisticalQty: $scope.ie.StatisticalQty,
        //        StatisticalUOM: $scope.ie.StatisticalUOM,
        //        ExportDutyMethod: $scope.ie.ExportDutyMethod,
        //        ExportDutyTariffCode: $scope.ie.ExportDutyTariffCode,
        //        ExportDutyPercentage: $scope.ie.ExportDutyPercentage,
        //        ExportDutySpecific: $scope.ie.ExportDutySpecific,
        //        ExportDutyExcemption: $scope.ie.ExportDutyExcemption,
        //        ExportDutySpecificExcemption: $scope.ie.ExportDutySpecificExcemption,

        //    };

        //    ItemEntryService.ExportDutyCalculation(obj).then(function (d) {            
        //        $scope.ie.ImportDutyAmount = d.data.ImportDutyAmount;
        //        $scope.ie.ImportDutySpecificAmount = d.data.ImportDutySpecificAmount;
        //        $scope.ie.ExciseDutyAmount = d.data.ExciseDutyAmount;
        //        $scope.ie.ExciseDutySpecificAmount = d.data.ExciseDutySpecificAmount;
        //        $scope.ie.GSTDutyAmount = d.data.GSTDutyAmount;
        //        $scope.ie.GSTDutySpecificAmount = d.data.GSTDutySpecificAmount;
        //        $scope.ie.TotalPayableAmount = d.data.TotalPayableAmount;

        //    }, function (err) { });
        //};

        $scope.validateInputDecimal();
        $scope.CurrencyRateChanged();
    }]);
