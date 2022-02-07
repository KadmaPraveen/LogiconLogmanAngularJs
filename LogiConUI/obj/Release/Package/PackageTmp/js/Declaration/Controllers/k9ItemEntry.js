angular.module('LogiCon').controller('k9ItemEntryCntrl', ['$scope', '$uibModalInstance', 'HSCodeService', 'ItemEntryService', 'limitToFilter', '$filter', 'dataObj', 'growlService', 'UtilityFunc', 'k9Service','$timeout',
    function ($scope, $uibModalInstance, HSCodeService, ItemEntryService, limitToFilter, $filter, dataObj, growlService, UtilityFunc, k9Service, $timeout) {

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
                if ($scope.frmItemEntry.PackageBalanceQty.$viewValue != null) {
                    $scope.frmItemEntry.PackageBalanceQty.$$runValidators($scope.frmItemEntry.PackageBalanceQty.$modalValue, $scope.frmItemEntry.PackageBalanceQty.$viewValue, function () {
                        $scope.frmItemEntry.PackageBalanceQty.$setViewValue($scope.frmItemEntry.PackageBalanceQty.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmItemEntry.PackageQty.$viewValue != null) {
                    $scope.frmItemEntry.PackageQty.$$runValidators($scope.frmItemEntry.PackageQty.$modalValue, $scope.frmItemEntry.PackageQty.$viewValue, function () {
                        $scope.frmItemEntry.PackageQty.$setViewValue($scope.frmItemEntry.PackageQty.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
            }, 100);
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
                LotNo: null,
                Location: null,
                ImportDutyMethod: null,
                ImportDutyRate: null,
                ImportDutyRateAmount: null,
                ImportDutySpecificRate: null,
                ImportDutySpecificRateAmount: null,
                ImportGST: null,
                ImportGSTAmount: null,
                ImportExciseMethod: null,
                ImportExciseRate: null,
                ImportExciseRateAmount: null,
                ImportExciseSpecificRate: null,
                ImportExciseSpecificAmount: null,
                SalesTaxMethod: null,
                SalesTaxTariffCode: null,
                SalesTaxPercentage: null,
                SalesTaxExcemption: null,
                SalesTaxSpecific: null,
                SalesTaxSpecificExcemption: null,
                AntiDumpingMethod: null,
                AntiDumpingTariffCode: null,
                AntiDumpingPercentage: null,
                AntiDumpingExcemption: null,
                AntiDumpingSpecific: null,
                AntiDumpingSpecificExcemption: null,
                AlcoholMethod: null,
                ProofOfSpirit: null,
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
                TotalDutyPayable: null,
                TotalGSTPayable: null,
                ECCNNo: null,
                ItemWeight: null,
                UnitCurrency: null,
                UnitCurrencyExchangeRate: null,
                FOBValue: null,
                CIFValue: null,
                EXWValue: null,
                CNFValue: null,
                CNIValue: null,
                FreightValue: null,
                InsuranceValue: null,
                CIFCValue: null,
                ImportDutyExemptionRatePercent: null,
                ImportDutyExemptionRate: null,
                ImportDutyExemptionRateAmount: null,
                ImportDutyExemptionAmount: null,
                ImportDutySpecificExemptionRatePercent: null,
                ImportDutySpecificExemptionRate: null,
                ImportDutySpecificExemptionRateAmount: null,
                ImportDutySpecificExemptionAmount: null,
                ImportGSTExemptionPercent: null,
                ImportGSTExemptionRate: null,
                ImportGSTExemptionRateAmount: null,
                ImportGSTExemptionAmount: null,
                ImportExciseExemptionRatePercent: null,
                ImportExciseExemptionRate: null,
                ImportExciseExemptionRateAmount: null,
                ImportExciseExemptionAmount: null,
                ImportExciseExemptionSpecificRatePercent: null,
                ImportExciseExemptionSpecificRate: null,
                ImportExciseExemptionSpecificRateAmount: null,
                ImportExciseExemptionSpecificAmount: null,
                declarationSubItemK9: new Array(),
                //subitemEntryIndex: null
                
            };

            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.subItems = new Array();

        }
        $scope.init();

        $scope.ie = angular.copy(dataObj.itemEntry);
        $scope.subItems = $scope.ie.declarationSubItemK9;
        //$scope.ie.itemDetails = dataObj.itemDetails;

        if (!angular.isUndefined($scope.ie) && $scope.ie != null) {
            if ($scope.ie.UsedVehicleRegistrationDate == null) {
                $scope.ie.UsedVehicleRegistrationDate = undefined;
            }
            else
                $scope.ie.UsedVehicleRegistrationDate = moment($scope.ie.UsedVehicleRegistrationDate);
        }

        $scope.itemEntryIndex = dataObj.itemEntryIndex;
        $scope.declarationItemK9Count = dataObj.declarationItemK9Count;
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
        $scope.ie.OriginCountryCode = 'MY';

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

        $scope.defaultCountry = UtilityFunc.DefaultCountry();
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

            k9Service.OutPutFOBCIF(obj).then(function (d) {
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

        if ($scope.ie.ImportDutyMethod == '0')
            $scope.ie.ImportDutyMethodText = '0 - NO DUTY';
        else if ($scope.ie.ImportDutyMethod == '1') {
            $scope.ie.ImportDutyMethodText = '1 - DUTY BY AD VALOREM';
        } else if ($scope.ie.ImportDutyMethod == '2') {
            $scope.ie.ImportDutyMethodText = '2 - DUTY BY SPECIFIC';
        } else if ($scope.ie.ImportDutyMethod == '3') {
            $scope.ie.ImportDutyMethodText = '3 - DUTY BY WHICH EVER IS HIGHER';
        } else if ($scope.ie.ImportDutyMethod == '4') {
            $scope.ie.ImportDutyMethodText = '4 - DUTY BY BOTH';
        } else if ($scope.ie.ImportDutyMethod == '5') {
            $scope.ie.ImportDutyMethodText = '5 - DUTY BY QUOTA';
        } else if ($scope.ie.ImportDutyMethod == '6') {
            $scope.ie.ImportDutyMethodText = '6 - DUTY BY VOLUME PER LITER';
        }

        if ($scope.ie.ImportExciseMethod == '0') {
            $scope.ie.ImportExciseMethodText = '0 - NO DUTY';
        }
        else if ($scope.ie.ImportExciseMethod == '1') {
            $scope.ie.ImportExciseMethodText = '1 - DUTY BY AD VALOREM';
        } else if ($scope.ie.ImportExciseMethod == '2') {
            $scope.ie.ImportExciseMethodText = '2 - DUTY BY SPECIFIC';
        } else if ($scope.ie.ImportExciseMethod == '3') {
            $scope.ie.ImportExciseMethodText = '3 - DUTY BY WHICH EVER IS HIGHER';
        } else if ($scope.ie.ImportExciseMethod == '4') {
            $scope.ie.ImportExciseMethodText = '4 - DUTY BY BOTH';
        } else if ($scope.ie.ImportExciseMethod == '5') {
            $scope.ie.ImportExciseMethodText = '5 - DUTY BY QUOTA';
        } else if ($scope.ie.ImportExciseMethod == '6') {
            $scope.ie.ImportExciseMethodText = '6 - DUTY BY VOLUME PER LITER';
        }


        $scope.showLoading = true;
        $scope.ie.UnitCurrency = dataObj.invoiceCurrency;
        $scope.ie.UnitCurrencyExchangeRate = dataObj.invoiceCurrencyRate;

        $scope.importRate = 1.0000;

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
            $scope.ie.PackageUOM = obj.UOMCode;


            $scope.ie.ImportDutyMethod = obj.ImportDutyMethod;
            $scope.ie.ImportDutyRate = obj.ImportDutyRate;
            $scope.ie.ImportDutySpecificRate = obj.ImportDutySpecificRate;

            $scope.ie.ImportExciseMethod = obj.ImportExciseDutyMethod;
            $scope.ie.ImportExciseRate = obj.ImportExciseDutyRate;
            $scope.ie.ImportExciseSpecificRate = obj.ImportExciseSpecificRate;
            $scope.ie.ImportGST = obj.GST;
            $scope.ie.IsVehicle = obj.IsVehicle;

            $scope.IsASEAN = $filter('filter')(ASEANArray, $scope.ie.OriginCountryCode).length > 0;
            if ($scope.IsASEAN)
                $scope.ie.OldPDKAHTN = obj.OldPDK;
            else
                $scope.ie.OldPDKAHTN = obj.OldPDK;

            if ($scope.ie.ImportDutyMethod == '0')
                $scope.ie.ImportDutyMethodText = '0 - NO DUTY';
            else if ($scope.ie.ImportDutyMethod == '1') {
                $scope.ie.ImportDutyMethodText = '1 - DUTY BY AD VALOREM';
            } else if ($scope.ie.ImportDutyMethod == '2') {
                $scope.ie.ImportDutyMethodText = '2 - DUTY BY SPECIFIC';
            } else if ($scope.ie.ImportDutyMethod == '3') {
                $scope.ie.ImportDutyMethodText = '3 - DUTY BY WHICH EVER IS HIGHER';
            } else if ($scope.ie.ImportDutyMethod == '4') {
                $scope.ie.ImportDutyMethodText = '4 - DUTY BY BOTH';
            } else if ($scope.ie.ImportDutyMethod == '5') {
                $scope.ie.ImportDutyMethodText = '5 - DUTY BY QUOTA';
            } else if ($scope.ie.ImportDutyMethod == '6') {
                $scope.ie.ImportDutyMethodText = '6 - DUTY BY VOLUME PER LITER';
            }

            if ($scope.ie.ImportExciseMethod == '0') {
                $scope.ie.ImportExciseMethodText = '0 - NO DUTY';
            } else if ($scope.ie.ImportExciseMethod == '1') {
                $scope.ie.ImportExciseMethodText = '1 - DUTY BY AD VALOREM';
            } else if ($scope.ie.ImportExciseMethod == '2') {
                $scope.ie.ImportExciseMethodText = '2 - DUTY BY SPECIFIC';
            } else if ($scope.ie.ImportExciseMethod == '3') {
                $scope.ie.ImportExciseMethodText = '3 - DUTY BY WHICH EVER IS HIGHER';
            } else if ($scope.ie.ImportExciseMethod == '4') {
                $scope.ie.ImportExciseMethodText = '4 - DUTY BY BOTH';
            } else if ($scope.ie.ImportExciseMethod == '5') {
                $scope.ie.ImportExciseMethodText = '5 - DUTY BY QUOTA';
            } else if ($scope.ie.ImportExciseMethod == '6') {
                $scope.ie.ImportExciseMethodText = '6 - DUTY BY VOLUME PER LITER';
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
            
            return HSCodeService.AutoComplete(text).then(function (res) {
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

        $scope.ItemTypeResults = function (text) {
            
            return k9Service.AutoCompleteItemType(text).then(function (res) {
                return limitToFilter(res.data, 15);
            }, function (err) {
            });
        }

        //$scope.BindItemCode = function (item,val) {
        //    
        //    $scope.ie.declarationSubItemK9[val].ItemCode = item.split('-')[0];
        //}


        if ($scope.ie.HSCode != null && $scope.ie.HSCode != undefined)
            $scope.HSCodeResults($scope.ie.HSCode);
        

      
        $scope.GetLookupData = function () {
            
            ItemEntryService.GetLookupData().then(function (d) {
                
                $scope.lookUpData = d.data;
                if ($scope.ie.HSCode != undefined)
                    
                $scope.ie.HSCodeDescription = $filter('filter')($scope.lookUpData.hsCodeList, { Value: $scope.ie.HSCode })[0].Text;

                if (dataObj.itemEntry.OriginCountryCode == null)
                    $scope.ie.OriginCountryCode = $scope.defaultCountry;

                $scope.importRate = $filter('filter')($scope.lookUpData.currencyList, { Value: dataObj.invoiceCurrency })[0].ImportRate;
                $scope.showLoading = false;
            }, function (err) { });
        };

        $scope.GetTotalDutyPayableWithOutExemptions = function () {
            var itemAmount = $scope.ie.ItemAmount;
            var declaredQty = $scope.ie.DeclaredQty;
            $scope.ie.UnitLocalAmount = ((itemAmount / declaredQty) * $scope.importRate).toFixed(2);
            $scope.ie.TotalUnitLocalAmount = (itemAmount * dataObj.invoiceCurrencyRate).toFixed(2);

            $scope.ie.ImportDutyRateAmount = (($scope.ie.TotalUnitLocalAmount * $scope.ie.ImportDutyRate) / 100).toFixed(2);
            $scope.ie.ImportGSTAmount = (($scope.ie.TotalUnitLocalAmount * $scope.ie.ImportGST) / 100).toFixed(2);
            $scope.ie.ImportDutySpecificRateAmount = ($scope.ie.DeclaredQty * $scope.ie.ImportDutySpecificRate).toFixed(2);

            $scope.ie.TotalGSTPayable = $scope.ie.ImportGSTAmount;
            if ($scope.ie.ImportDutyMethodText == '1 - DUTY BY AD VALOREM') {
                $scope.ie.TotalDutyPayable = $scope.ie.ImportDutyRateAmount;
                $scope.ie.ImportDutyMethodText = '1 - DUTY BY AD VALOREM';
            } else if ($scope.ie.ImportDutyMethodText == '2 - DUTY BY SPECIFIC') {
                $scope.ie.TotalDutyPayable = $scope.ie.ImportDutySpecificRateAmount;
                $scope.ie.ImportDutyMethodText = '2 - DUTY BY SPECIFIC';
            } else if ($scope.ie.ImportDutyMethodText == '3 - DUTY BY WHICH EVER IS HIGHER') {
                if ($scope.ie.ImportDutyRateAmount > $scope.ie.ImportDutySpecificRateAmount)
                    $scope.ie.TotalDutyPayable = $scope.ie.ImportDutyRateAmount;
                else
                    $scope.ie.TotalDutyPayable = $scope.ie.ImportDutySpecificRateAmount;

                $scope.ie.ImportDutyMethodText = '3 - DUTY BY WHICH EVER IS HIGHER';
            } else if ($scope.ie.ImportDutyMethodText == '4 - DUTY BY BOTH') {
                $scope.ie.TotalDutyPayable = (parseFloat($scope.ie.ImportDutyRateAmount) + parseFloat($scope.ie.ImportDutySpecificRateAmount)).toFixed(2);

                $scope.ie.ImportDutyMethodText = '4 - DUTY BY BOTH';
            }

            $scope.ie.ImportExciseRateAmount = (($scope.ie.TotalUnitLocalAmount * $scope.ie.ImportExciseRate) / 100).toFixed(2);
            $scope.ie.ImportExciseSpecificAmount = ($scope.ie.DeclaredQty * $scope.ie.ImportExciseSpecificRate).toFixed(2);


            if ($scope.ie.ImportExciseMethodText == '1 - DUTY BY AD VALOREM') {
                $scope.ie.TotalDutyPayable = (parseFloat($scope.ie.TotalDutyPayable) + parseFloat($scope.ie.ImportExciseRateAmount));
                $scope.ie.ImportExciseMethodText = '1 - DUTY BY AD VALOREM';
            } else if ($scope.ie.ImportExciseMethodText == '2 - DUTY BY SPECIFIC') {
                $scope.ie.TotalDutyPayable = parseFloat($scope.ie.TotalDutyPayable) + parseFloat($scope.ie.ImportExciseSpecificAmount);
                $scope.ie.ImportExciseMethodText = '2 - DUTY BY SPECIFIC';
            } else if ($scope.ie.ImportExciseMethodText == '3 - DUTY BY WHICH EVER IS HIGHER') {
                if ($scope.ie.ImportExciseRateAmount > $scope.ie.ImportExciseSpecificAmount)
                    $scope.ie.TotalDutyPayable = parseFloat($scope.ie.TotalDutyPayable) + parseFloat($scope.ie.ImportExciseRateAmount);
                else
                    $scope.ie.TotalDutyPayable = parseFloat($scope.ie.TotalDutyPayable) + parseFloat($scope.ie.ImportExciseRateAmount);

                $scope.ie.ImportExciseMethodText = '3 - DUTY BY WHICH EVER IS HIGHER';
            } else if ($scope.ie.ImportExciseMethodText == '4 - DUTY BY BOTH') {
                $scope.ie.TotalDutyPayable = (parseFloat($scope.ie.TotalDutyPayable) + parseFloat($scope.ie.ImportExciseRateAmount) + parseFloat($scope.ie.ImportExciseSpecificAmount)).toFixed(2);
                $scope.ie.ImportExciseMethodText = '4 - DUTY BY BOTH';
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


        $scope.IsFrmItemEntryValid = false;
        $scope.$watch('frmItemEntry.$valid', function (isValid) {
            $scope.IsFrmItemEntryValid = isValid;
        });

        $scope.SaveItemEntry = function (ie) {
            
            console.log(JSON.stringify(ie));
            if ($scope.IsFrmItemEntryValid) {
                if ($scope.declarationItemK9Count > 0) {
                    if ($scope.itemEntryIndex != -1) {
                        $scope.ie.subitemEntryIndex = $scope.itemEntryIndex + 1;
                    }
                    else {
                        $scope.ie.subitemEntryIndex = $scope.declarationItemK9Count + 1;
                    }
                }
                else {
                    $scope.ie.subitemEntryIndex = 1;
                }
                $scope.ie.declarationSubItemK9 = new Array();
                //declarationSubItemK9, subItems
                angular.forEach($scope.subItems, function (item, val) {
                    
                    //$scope.ie.declarationSubItemK9[val].ItemNo = $scope.ie.subitemEntryIndex;
                    $scope.ie.declarationSubItemK9.push({
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

        $scope.IsImportDutyTariffCodeDisable = false;
        $scope.ImportDutyMethodChange = function () {
            if ($scope.ie.ImportDutyMethod == 25900) {
                $scope.ie.ImportDutyTariffCode = 25930;
                $scope.IsImportDutyTariffCodeDisable = true;
                $scope.ImportDutyCalculation();
            } else {
                $scope.IsImportDutyTariffCodeDisable = false;
            }

        };

        $scope.IsGSTDutyTariffCodeDisable = false;
        $scope.GSTDutyMethodChange = function () {
            if ($scope.ie.GSTMethod == 25900) {
                $scope.ie.GSTTariffCode = 25930;
                $scope.IsGSTDutyTariffCodeDisable = true;
                $scope.ImportDutyCalculation();
            } else {
                $scope.IsGSTDutyTariffCodeDisable = false;
            }
        };

        $scope.IsExciseDutyTariffCodeDisable = false;
        $scope.ExciseDutyMethodChange = function () {
            if ($scope.ie.ExciseDutyMethod == 25900) {
                $scope.ie.ExciseDutyTariffCode = 25930;
                $scope.IsExciseDutyTariffCodeDisable = true;
                $scope.ImportDutyCalculation();
            } else {
                $scope.IsExciseDutyTariffCodeDisable = false;
            }
        };

        $scope.GetLookupData();
        $scope.IncoTermCalcuation();

        $scope.ImportDutyExemptionValidation = function (type) {
            var importDutyMethod = $scope.ie.ImportDutyMethod;
            var returnVal = false;
            if (type == 'IMPORT_DUTY_RATE') {
                if (importDutyMethod == '1' || importDutyMethod == '3' || importDutyMethod == '4')
                    returnVal = false;
                else
                    returnVal = true;
            } else if (type == 'IMPORT_DUTY_RATE_SPECIFIC') {
                if (importDutyMethod == '2' || importDutyMethod == '3' || importDutyMethod == '4')
                    returnVal = false;
                else
                    returnVal = true;
            }

            return returnVal;
        };

        $scope.ImportExciseDutyExemptionValidation = function (type) {
            var importExciseDutyMethod = $scope.ie.ImportExciseMethod;
            var returnVal = false;
            if (type == 'IMPORT_EXCISE_DUTY_RATE') {
                if (importExciseDutyMethod == '1' || importExciseDutyMethod == '3' || importExciseDutyMethod == '4')
                    returnVal = false;
                else
                    returnVal = true;

            } else if (type == 'IMPORT_EXCISE_DUTY_RATE_SPECIFIC') {
                if (importExciseDutyMethod == '2' || importExciseDutyMethod == '3' || importExciseDutyMethod == '4')
                    returnVal = false;
                else
                    returnVal = true;
            }

            return returnVal;
        };
        
        $scope.calculateGstPercentage = function () {
            
            if ($scope.ie.ImportGSTExemptionPercent > 100) {
                growlService.growl('Gst Rate Percentage Cannot be gratherthan 100', 'danger');
                $scope.ie.ImportGSTExemptionPercent = '';
            }
        }


        $scope.CalculateExciseDutyExemptions = function () {
            
            //if ($scope.ie.ImportGSTExemptionPercent <= 100)
            //{
            $scope.ie.TotalDutyPayable = $scope.GetTotalDutyPayableWithOutExemptions();
            if (!angular.isUndefined($scope.ie.ImportDutyExemptionRatePercent)) {
                var ImportDutyRate = $scope.ie.ImportDutyRate;
                var ImportDutyExemptionRatePercent = $scope.ie.ImportDutyExemptionRatePercent;
                $scope.ie.ImportDutyExemptionRate = (ImportDutyExemptionRatePercent * ImportDutyRate) / 100;
                $scope.ie.ImportDutyExemptionRateAmount = (($scope.ie.TotalUnitLocalAmount * $scope.ie.ImportDutyExemptionRate) / 100).toFixed(2);
                $scope.ie.ImportDutyExemptionAmount = $scope.ie.ImportDutyRateAmount - $scope.ie.ImportDutyExemptionRateAmount;

                //$scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportDutyExemptionRateAmount;
            }

            if (!angular.isUndefined($scope.ie.ImportDutySpecificExemptionRatePercent)) {
                var ImportDutySpecificRate = $scope.ie.ImportDutySpecificRate;
                var ImportDutySpecificExemptionRatePercent = $scope.ie.ImportDutySpecificExemptionRatePercent;
                $scope.ie.ImportDutySpecificExemptionRate = (ImportDutySpecificExemptionRatePercent * ImportDutySpecificRate) / 100;
                $scope.ie.ImportDutySpecificExemptionRateAmount = ($scope.ie.DeclaredQty * $scope.ie.ImportDutySpecificExemptionRate).toFixed(2);
                $scope.ie.ImportDutySpecificExemptionAmount = $scope.ie.ImportDutySpecificRateAmount - $scope.ie.ImportDutySpecificExemptionRateAmount;

                //$scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportDutySpecificExemptionRateAmount;
            }

            if (!angular.isUndefined($scope.ie.ImportGSTExemptionPercent)) {
                var ImportGST = $scope.ie.ImportGST;
                var ImportGSTExemptionPercent = $scope.ie.ImportGSTExemptionPercent;
                $scope.ie.ImportGSTExemptionRate = ((ImportGST * ImportGSTExemptionPercent) / 100).toFixed(2);
                $scope.ie.ImportGSTExemptionRateAmount = (($scope.ie.TotalUnitLocalAmount * $scope.ie.ImportGSTExemptionRate) / 100).toFixed(2);
                $scope.ie.ImportGSTExemptionAmount = $scope.ie.ImportGSTAmount - $scope.ie.ImportGSTExemptionRateAmount;

                $scope.ie.TotalGSTPayable = $scope.ie.TotalGSTPayable - $scope.ie.ImportGSTExemptionRateAmount;
            }

            if (!angular.isUndefined($scope.ie.ImportExciseExemptionRatePercent)) {
                var ImportExciseRate = $scope.ie.ImportExciseRate;
                var ImportExciseExemptionRatePercent = $scope.ie.ImportExciseExemptionRatePercent;
                $scope.ie.ImportExciseExemptionRate = (ImportExciseExemptionRatePercent * ImportExciseRate) / 100;
                $scope.ie.ImportExciseExemptionRateAmount = (($scope.ie.TotalUnitLocalAmount * $scope.ie.ImportExciseExemptionRate) / 100).toFixed(2);
                $scope.ie.ImportExciseExemptionAmount = $scope.ie.ImportExciseRateAmount - $scope.ie.ImportExciseExemptionRateAmount;

                //$scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportExciseExemptionRateAmount;
            }

            if (!angular.isUndefined($scope.ie.ImportExciseExemptionSpecificRatePercent)) {
                var ImportExciseSpecificRate = $scope.ie.ImportExciseSpecificRate;
                var ImportExciseExemptionSpecificRatePercent = $scope.ie.ImportExciseExemptionSpecificRatePercent;
                $scope.ie.ImportExciseExemptionSpecificRate = (ImportExciseExemptionSpecificRatePercent * ImportExciseSpecificRate) / 100;
                $scope.ie.ImportExciseExemptionSpecificRateAmount = (($scope.ie.TotalUnitLocalAmount * $scope.ie.ImportExciseExemptionSpecificRate) / 100).toFixed(2);
                $scope.ie.ImportExciseExemptionSpecificAmount = $scope.ie.ImportExciseSpecificAmount - $scope.ie.ImportExciseExemptionSpecificRateAmount;

                //$scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportExciseExemptionSpecificRateAmount;
            }

            //importDutyMethod
            //importExciseDutyMethod
            if ($scope.ie.ImportDutyMethod == '1' && !angular.isUndefined($scope.ie.ImportDutyExemptionRatePercent))
                $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportDutyExemptionRateAmount;
            else if ($scope.ie.ImportDutyMethod == '2' && !angular.isUndefined($scope.ie.ImportDutySpecificExemptionRatePercent))
                $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportDutySpecificExemptionRateAmount;
            else if ($scope.ie.ImportDutyMethod == '3' && (!angular.isUndefined($scope.ie.ImportDutyExemptionRatePercent)) && !angular.isUndefined($scope.ie.ImportDutySpecificExemptionRatePercent)) {
                if ($scope.ie.ImportDutyExemptionRateAmount > $scope.ie.ImportDutySpecificExemptionRateAmount)
                    $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportDutyExemptionRateAmount;
                else if ($scope.ie.ImportDutyExemptionRateAmount < $scope.ie.ImportDutySpecificExemptionRateAmount)
                    $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportDutySpecificExemptionRateAmount;
            } else if ($scope.ie.ImportDutyMethod == '4' && (!angular.isUndefined($scope.ie.ImportDutyExemptionRatePercent)) && !angular.isUndefined($scope.ie.ImportDutySpecificExemptionRatePercent))
                $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - (parseFloat($scope.ie.ImportDutyExemptionRateAmount) + parseFloat($scope.ie.ImportDutySpecificExemptionRateAmount));


            if ($scope.ie.ImportExciseMethod == '1' && !angular.isUndefined($scope.ie.ImportExciseExemptionRatePercent))
                $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportExciseExemptionRateAmount;
            else if ($scope.ie.ImportExciseMethod == '2' && !angular.isUndefined($scope.ie.ImportExciseExemptionSpecificRatePercent))
                $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportExciseExemptionSpecificRateAmount;
            else if ($scope.ie.ImportExciseMethod == '3' && (!angular.isUndefined($scope.ie.ImportExciseExemptionRatePercent) && !angular.isUndefined($scope.ie.ImportExciseExemptionSpecificRatePercent))) {
                if ($scope.ie.ImportExciseExemptionRateAmount > $scope.ie.ImportExciseExemptionSpecificRateAmount)
                    $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportExciseExemptionRateAmount;
                else if ($scope.ie.ImportExciseExemptionRateAmount < $scope.ie.ImportExciseExemptionSpecificRateAmount)
                    $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - $scope.ie.ImportExciseExemptionSpecificRateAmount;
            } else if ($scope.ie.ImportExciseMethod == '4' && (!angular.isUndefined($scope.ie.ImportExciseExemptionRatePercent) && !angular.isUndefined($scope.ie.ImportExciseExemptionSpecificRatePercent)))
                $scope.ie.TotalDutyPayable = $scope.ie.TotalDutyPayable - (parseFloat($scope.ie.ImportExciseExemptionRateAmount) + parseFloat($scope.ie.ImportExciseExemptionSpecificRateAmount));
        };

                //}
        $scope.validateInputDecimal();
    }]);