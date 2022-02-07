angular.module('LogiCon').controller('k8Cntrl', ['$scope', 'k8Service', 'MerchantProfileService', 'VesselScheduleService', 'PortAreaService', 'CurrencyRateService', 'OrderEntryService', 'VesselMasterService', 'Utility', '$uibModal', 'limitToFilter', 'growlService', '$stateParams', '$timeout', '$state', 'AddressService', 'UtilityFunc', '$filter', 'CustomDeclarantService', 'NgTableParams', '$anchorScroll', '$location', '$q',
    function ($scope, k8Service, MerchantProfileService, VesselScheduleService, PortAreaService, CurrencyRateService, OrderEntryService, VesselMasterService, Utility, $uibModal, limitToFilter, growlService, $stateParams, $timeout, $state, AddressService, UtilityFunc, $filter, CustomDeclarantService, NgTableParams, $anchorScroll, $location, $q) {

        $scope.validateInputDecimal = function () {
            $timeout(function () {
                if ($scope.frmk8.InvoiceValuek8.$viewValue != null) {
                    $scope.frmk8.InvoiceValuek8.$$runValidators($scope.frmk8.InvoiceValuek8.$modalValue, $scope.frmk8.InvoiceValuek8.$viewValue, function () {
                        $scope.frmk8.InvoiceValuek8.$setViewValue($scope.frmk8.InvoiceValuek8.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk8.AmountReceived.$viewValue != null) {
                    $scope.frmk8.AmountReceived.$$runValidators($scope.frmk8.AmountReceived.$modalValue, $scope.frmk8.AmountReceived.$viewValue, function () {
                        $scope.frmk8.AmountReceived.$setViewValue($scope.frmk8.AmountReceived.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk8.GrossWeight.$viewValue != null) {
                    $scope.frmk8.GrossWeight.$$runValidators($scope.frmk8.GrossWeight.$modalValue, $scope.frmk8.GrossWeight.$viewValue, function () {
                        $scope.frmk8.GrossWeight.$setViewValue($scope.frmk8.GrossWeight.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk8.GrossVolume.$viewValue != null) {
                    $scope.frmk8.GrossVolume.$$runValidators($scope.frmk8.GrossVolume.$modalValue, $scope.frmk8.GrossVolume.$viewValue, function () {
                        $scope.frmk8.GrossVolume.$setViewValue($scope.frmk8.GrossVolume.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk8.PortAmountPercent.$viewValue != null) {
                    $scope.frmk8.PortAmountPercent.$$runValidators($scope.frmk8.PortAmountPercent.$modalValue, $scope.frmk8.PortAmountPercent.$viewValue, function () {
                        $scope.frmk8.PortAmountPercent.$setViewValue($scope.frmk8.PortAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk8.FreightAmountPercent.$viewValue != null) {
                    $scope.frmk8.FreightAmountPercent.$$runValidators($scope.frmk8.FreightAmountPercent.$modalValue, $scope.frmk8.FreightAmountPercent.$viewValue, function () {
                        $scope.frmk8.FreightAmountPercent.$setViewValue($scope.frmk8.FreightAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk8.InsuranceAmountPercent.$viewValue != null) {
                    $scope.frmk8.InsuranceAmountPercent.$$runValidators($scope.frmk8.InsuranceAmountPercent.$modalValue, $scope.frmk8.InsuranceAmountPercent.$viewValue, function () {
                        $scope.frmk8.InsuranceAmountPercent.$setViewValue($scope.frmk8.InsuranceAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk8.OthersAmountPercent.$viewValue != null) {
                    $scope.frmk8.OthersAmountPercent.$$runValidators($scope.frmk8.OthersAmountPercent.$modalValue, $scope.frmk8.OthersAmountPercent.$viewValue, function () {
                        $scope.frmk8.OthersAmountPercent.$setViewValue($scope.frmk8.OthersAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }

            }, 100);
        }
        $scope.tempFlag = false;
        $scope.toggleFeedback = function () {
            $scope.tempFlag = !$scope.tempFlag;
            if ($scope.tempFlag)
                jQuery("#feedback").animate({ right: "-0px" });
            else
                jQuery("#feedback").animate({ right: "-210px" });
        }

        $scope.navigateTo = function (id) {

            $scope.toggleFeedback();
            $location.hash(id);
            $anchorScroll();

        };

        var declarationNo = $stateParams.declarationNo;
        $scope.init = function () {

            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.timeFormat = UtilityFunc.TimeFormat();
            $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
            $scope.defaultCurrency = UtilityFunc.DefaultCurrency();
            $scope.defaultCountry = UtilityFunc.DefaultCountry();
            $scope.BranchID = UtilityFunc.BranchID();
            $scope.customresponses = {};
            $scope.declarationOrderStatus = {};
            $scope.ediResponse = {};
            $scope.customresponseheaderItem = {};
            $scope.IsCustomResponsesShow = false;
            $scope.transportMode = 1021;
            $scope.isConventionalCargo = false;
            $scope.IsNew = true;
            $scope.time = null;

            if (declarationNo != "NEW" && declarationNo != "") {
                $scope.IsNew = false;
            }
            else {
                $scope.IsNew = true;
            }


            $scope.isFrmK8Valid = false;
            $scope.isConventionalCargo = false;
            $scope.IsDeclarationValidated = false;
            $scope.k8 = {
              
                declarationHeaderK8: {
                    DeclarationShipmentType: 25850,
                    OpenDate: moment(),
                    BranchID: UtilityFunc.BranchID(),
                    DeclarationNo: null,
                    DeclarationDate: null,
                    DeclarationType: null,
                    DeclarationK8Type: null,
                    TransactionDate: null,
                    OrderNo: null,
                    TransportMode: null,
                    ShipmentType: null,
                    TransactionType: null,
                    Importer: null,
                    Exporter: null,
                    ExporterAddress1: null,
                    ExporterAddress2: null,
                    ExporterCity: null,
                    ExporterState: null,
                    ExporterCountry: null,
                    ExporterOrganizationType: null,
                    ExporterTelNo: null,
                    CustomStationCode: null,
                    ShippingAgent: null,
                    DeclarantID: null,
                    DeclarantName: null,
                    DeclarantDesignation: null,
                    DeclarantNRIC: null,
                    DeclarantAddress1: null,
                    DeclarantAddress2: null,
                    DeclarantAddressCity: null,
                    DeclarantAddressState: null,
                    DeclarantAddressCountry: null,
                    DeclarantAddressPostCode: null,
                    CargoClass: null,
                    CargoDescription: null,
                    CustomerReferenceNo: null,
                    ExtraCargoDescription: null,
                    MarksAndNos: null,
                   
                    IsActive: null,
                    CreatedBy: null,
                    CreatedOn: null,
                    ModifiedBy: null,
                    ModifiedOn: null,
                    IsApproved: null,
                    ApprovedBy: null,
                    ApprovedOn: null,
                    IsPartial: null,
                    UCNNo: null
                },

                declarationContainerK8: new Array(),
                declarationDocumentsK8: new Array(),
                declarationItemK8: new Array(),
                declarationSubItemK8: new Array(),
                declarationItemExportK8: new Array(),
                declarationShipmentK8: {
                    BranchID: UtilityFunc.BranchID(),
                    DeclarationNo: null,
                    ManifestNo: null,
                    VesselScheduleID: null,
                    SCNNo: null,
                    VesselID: null,
                    VesselName: null,
                    VoyageNo: null,
                    LoadingPort: null,
                    DischargePort: null,
                    TranshipmentPort: null,
                    PlaceOfImport: null,
                    PlaceOfExport: null,
                    PortOperator: null,
                    OceanBLNo: null,
                    HouseBLNo: null,
                    ScheduleDate: null,
                    WarehouseNo: null,
                    WagonNo: null,
                    VehicleNo1: null,
                    VehicleNo2: null,
                    FlightNo: null,
                    ARNNo: null,
                    MasterAWBNo: null,
                    HouseAWBNo: null,
                    AIRCOLoadNo: null,
                    JKNo: null,
                    DestinationPort: null,
                    CreatedBy: null,
                    CreatedOn: null,
                    K8Type: null,
                    MovementDate: null,
                    MovementType: null,
                    MovementFrom: null,
                    MovementTo: null,
                    WarehouseFrom: null,
                    WarehouseTo: null,
                    ModifiedBy: null,
                    ModifiedOn: null,
                    SpecialTreatmentType: null,
                    SpecialRef: null,
                    GSTPayableStatus: null

                },
                declarationInvoiceK8: {
                    FOBAmount: 0.00,
                    CIFAmount: 0.00,
                    EXWAmount: 0.00,
                    CNFAmount: 0.00,
                    CNIAmount: 0.00,
                    FreightAmount: 0.00,
                    InsuranceAmount: 0.00,
                    FreightAmountCurrencyCode: 'MYR',
                    FreightAmountExRate: 1.0000,
                    InsuranceAmountCurrencyCode: 'MYR',
                    InsuranceAmountExRate: 1.0000,
                    OthersAmountCurrencyCode: 'MYR',
                    OthersAmountExRate: 1.0000,
                    PortAmountCurrencyCode: 'MYR',
                    PortAmountExRate: 1.0000,
                    CIFCAmount: 0.00,
                    PortAmountPercent: null,
                    FreightAmountPercent: null,
                    InsuranceAmountPercent: null,
                    OthersAmountPercent: null,
                    FreightAmountValue: '',
                    InsuranceAmountValue: '',
                    IsFreightCurrency: false,
                    IsInsuranceCurrency: false,
                    InvoiceCurrencyCode: 'MYR',
                    UOMWeight: 'KGM',
                    UOMVolume: 'MTQ',
                    AmountReceivedCurrencyCode: 'MYR',
                    AmountReceivedExchangeRate: 1.0000
                    
                },
                declarationConveyanceK8: new Array()

            };

            $scope.k8.declarationHeaderK8.DeclarationK8Type = 1060;
            $scope.k8.declarationHeaderK8.TransactionType = 25503;
            /*  */
            var promiseArr = new Array();
            var lookupDataPromise = k8Service.GetLookupData();
            promiseArr.push(lookupDataPromise);

            if (!angular.isUndefined(declarationNo) && declarationNo != 'NEW' && declarationNo != "") {
                var declarationPromise = k8Service.GetDeclaration(declarationNo);
                promiseArr.push(declarationPromise);
            }

            $q.all(promiseArr).then(function (d) {
                $scope.lookupDataCallBack(d[0]);
                if (d.length == 2) {
                    $scope.GetDeclarationCallBack(d[1]);
                }
            }, function (err) {

            });

            $scope.Activity = {};
            $scope.Activities = new Array();
        }

        $scope.GetDeclarationCallBack = function (d) {
            $scope.k8 = d.data;
            $scope.changeShipmentType($scope.k8.declarationHeaderK8.ShipmentType);

            if (!$scope.k8.declarationHeaderK8.IsPartial)
                $scope.IsDeclarationValidated = true;

            if (!angular.isUndefined($scope.k8.declarationHeaderK8.DeclarantID) && $scope.k8.declarationHeaderK8.DeclarantID != "" && $scope.k8.declarationHeaderK8.DeclarantID != null) {
                $scope.k8.declarationHeaderK8.DeclarantIDText = $scope.k8.declarationHeaderK8.DeclarantIDText;
            }
            $scope.GetDeclartionStatus(declarationNo);

            $scope.IsCustomResponsesShow = true;
            $scope.GetCustomResponse(declarationNo);
            $scope.ngTblContainerInfo();
            $scope.ngTblItemInfo();
            $scope.ngTblDocuments();
            $scope.ngTblConveyances();
            $scope.validateDates();
            $scope.ChangeDeclarationType($scope.k8.declarationHeaderK8.DeclarationK8Type);
            $scope.validateInputDecimal();
        }

        $scope.lookupDataCallBack = function (d) {
            $scope.lookUpData = d.data;
            if (declarationNo == 'NEW' || declarationNo == "") {
                $scope.k8.declarationHeaderK8.TransportMode = 1021;
                $scope.k8.declarationInvoiceK8.PayCountry = $scope.defaultCountry;
                $scope.k8.declarationInvoiceK8.OthersAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k8.declarationInvoiceK8.LocalCurrencyCode = $scope.defaultCurrency;
                $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode = $scope.defaultCurrency;
                $scope.k8.declarationInvoiceK8.DestinationCountry = $scope.defaultCountry;
            };
            $scope.CurrencyRateChanged();
        };

        /*
        $scope.GetLookupData = function () {
            k8Service.GetLookupData().then(function (d) {
                $scope.lookUpData = d.data;
                if (declarationNo == 'NEW' || declarationNo == "") {
                    $scope.k8.declarationHeaderK8.TransportMode = 1021;
                    $scope.k8.declarationInvoiceK8.PayCountry = $scope.defaultCountry;
                    $scope.k8.declarationInvoiceK8.OthersAmountCurrencyCode = $scope.defaultCurrency;
                    $scope.k8.declarationInvoiceK8.LocalCurrencyCode = $scope.defaultCurrency;
                    $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode = $scope.defaultCurrency;
                    $scope.k8.declarationInvoiceK8.DestinationCountry = $scope.defaultCountry;
                };
                $scope.CurrencyRateChanged();
            }, function (err) {

            });
        };
        */
        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }

        $scope.LoadSMKCode = function (smkCode) {

            if (smkCode == 25502) {
                $scope.k8.declarationHeaderK8.DeclarationK8Type = 1061;
            }
            else if (smkCode == 25503) {
                $scope.k8.declarationHeaderK8.DeclarationK8Type = 1060;
            }
            else if (smkCode == 25508) {
                $scope.k8.declarationHeaderK8.DeclarationK8Type = 1063;
            }
        }

        $scope.ChangeSmkDeclaration = function (declartionType) {

            if (declartionType == 1061) {
                $scope.k8.declarationHeaderK8.TransactionType = 25502;
            }
            else if (declartionType == 1060) {
                $scope.k8.declarationHeaderK8.TransactionType = 25503;
            }
            else
                $scope.k8.declarationHeaderK8.TransactionType = 25508;

        }

        /* K8 Header*/
        $scope.ChangeDeclarationType = function (declartionType) {
            //   

            if (declartionType == 1061) {

                if ($scope.lookUpData != undefined)
                    $scope.currencyList = $scope.lookUpData.currencyExportList;



                $scope.k8.declarationShipmentK8.PlaceOfImportName = null;
                $scope.k8.declarationShipmentK8.PlaceOfImport = null;
                //$scope.k8.declarationShipmentK8.DischargePortName = null;
                //$scope.k8.declarationShipmentK8.DischargePort = null;
                $scope.k8.declarationItemK8 = null;
                if ($scope.k8.declarationItemExportK8 == null) {
                    $scope.k8.declarationItemExportK8 = new Array();
                }
                if ($scope.k8.declarationItemExportK8.length < 0)
                    $scope.k8.declarationItemExportK8 = new Array();

                $scope.CurrencyRateChanged();
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.PortAmountPercent, false, $scope.k8.declarationInvoiceK8.PortAmountCurrencyCode, 'PortAmountValue');
                $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.FreightAmountPercent, $scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.FreightAmountCurrencyCode, 'FreightAmountValue');
                $scope.Calculatepercentageamount();
                //  $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.InsuranceAmountPercent, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency, $scope.k8.declarationInvoiceK8.InsuranceAmountCurrencyCode, 'InsuranceAmountValue');
                // $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.InsuranceAmountPercent, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency, $scope.k8.declarationInvoiceK8.InsuranceAmountCurrencyCode, 'InsuranceAmountValue');
                $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.OthersAmountPercent, false, $scope.k8.declarationInvoiceK8.OthersAmountCurrencyCode, 'OthersAmountValue');
                $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);



                //ChargesInfoCurrencyRateChanged(k8.declarationInvoiceK8.FreightAmountPercent,k8.declarationInvoiceK8.IsFreightCurrency,k8.declarationInvoiceK8.FreightAmountCurrencyCode,'FreightAmountValue'); 
                //ChargesInfoCurrencyRateChanged(k8.declarationInvoiceK8.InsuranceAmountPercent,k8.declarationInvoiceK8.IsInsuranceCurrency,k8.declarationInvoiceK8.InsuranceAmountCurrencyCode,'InsuranceAmountValue');


                $scope.ngTblItemInfo();
            }
            else {
                if ($scope.lookUpData != undefined)
                    $scope.currencyList = $scope.lookUpData.currencyList;

                $scope.k8.declarationShipmentK8.PlaceOfExportName = null;
                $scope.k8.declarationShipmentK8.PlaceOfExport = null;
                //$scope.k8.declarationShipmentK8.DischargePortName = null;
                //$scope.k8.declarationShipmentK8.DischargePort = null;
                if ($scope.k8.declarationItemK8 == null) {
                    $scope.k8.declarationItemK8 = new Array();
                }
                if ($scope.k8.declarationItemK8.length < 0)
                    $scope.k8.declarationItemK8 = new Array();
                $scope.k8.declarationItemExportK8 = null;

                $scope.CurrencyRateChanged();
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.PortAmountPercent, false, $scope.k8.declarationInvoiceK8.PortAmountCurrencyCode, 'PortAmountValue');
                $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.FreightAmountPercent, $scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.FreightAmountCurrencyCode, 'FreightAmountValue');
                $scope.Calculatepercentageamount();
                //  $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.InsuranceAmountPercent, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency, $scope.k8.declarationInvoiceK8.InsuranceAmountCurrencyCode, 'InsuranceAmountValue');
                // $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.InsuranceAmountPercent, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency, $scope.k8.declarationInvoiceK8.InsuranceAmountCurrencyCode, 'InsuranceAmountValue');
                $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                $scope.ChargesInfoCurrencyRateChanged($scope.k8.declarationInvoiceK8.OthersAmountPercent, false, $scope.k8.declarationInvoiceK8.OthersAmountCurrencyCode, 'OthersAmountValue');
                $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);


                $scope.ngTblItemInfo();
            }
        }

        $scope.ChangeTransportMode = function (TransportMode) {
            $scope.transportMode = TransportMode;
            if ($scope.k8.declarationHeaderK8.TransportMode == 1020 || $scope.k8.declarationHeaderK8.TransportMode == 1024 || $scope.k8.declarationHeaderK8.TransportMode == 1025 || $scope.k8.declarationHeaderK8.ShipmentType == 26533 || $scope.k8.declarationHeaderK8.ShipmentType == 26531) {
                $scope.isConventionalCargo = true;
            }
            else
                $scope.isConventionalCargo = false;

            $scope.k8.declarationShipmentK8.VesselScheduleID = null;
            $scope.k8.declarationShipmentK8.VoyageNo = null;
            $scope.k8.declarationShipmentK8.SCNNo = null;
            $scope.k8.declarationShipmentK8.VesselID = null;
            $scope.k8.declarationShipmentK8.VesselName = null;
            $scope.k8.declarationShipmentK8.ScheduleDate = undefined;
            $scope.k8.declarationShipmentK8.ManifestNo = null;
            $scope.k8.declarationShipmentK8.OceanBLNo = null;
            $scope.k8.declarationShipmentK8.HouseBLNo = null;
            $scope.k8.declarationShipmentK8.WagonNo = null;
            $scope.k8.declarationShipmentK8.VehicleNo1 = null;
            $scope.k8.declarationShipmentK8.VehicleNo2 = null;
            $scope.k8.declarationShipmentK8.FlightNo = null;
            $scope.k8.declarationShipmentK8.ARNNo = null;
            $scope.k8.declarationShipmentK8.MasterAWBNo = null;
            $scope.k8.declarationShipmentK8.HouseAWBNo = null;
            $scope.k8.declarationShipmentK8.AIRCOLoadNo = null;
            $scope.k8.declarationShipmentK8.JKNo = null;
        };

        $scope.changeShipmentType = function (ShipmentType) {

            if ($scope.k8.declarationHeaderK8.ShipmentType == 26533 || $scope.k8.declarationHeaderK8.ShipmentType == 26531 || $scope.k8.declarationHeaderK8.TransportMode == 1020 || $scope.k8.declarationHeaderK8.TransportMode == 1024 || $scope.k8.declarationHeaderK8.TransportMode == 1025) {
                $scope.isConventionalCargo = true;
            }
            else
                $scope.isConventionalCargo = false;
        };


        $scope.PortAutoComplete = function (text) {
            return k8Service.PortAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.PortSelected = function (item, type) {

            $scope.k8.declarationShipmentK8[type] = item.PortCode;
            if (type == 'PlaceOfExport') {
                $scope.k8.declarationShipmentK8.LoadingPortName = $scope.k8.declarationShipmentK8.PlaceOfExportName;
                $scope.k8.declarationShipmentK8.LoadingPort = item.PortCode;
                delete $scope.k8.declarationShipmentK8.DischargePortName;
                delete $scope.k8.declarationShipmentK8.DischargePort;
            }
            else if (type == 'PlaceOfImport') {
                $scope.k8.declarationShipmentK8.DischargePortName = $scope.k8.declarationShipmentK8.PlaceOfImportName;
                $scope.k8.declarationShipmentK8.DischargePort = item.PortCode;
                delete $scope.k8.declarationShipmentK8.LoadingPortName;
                delete $scope.k8.declarationShipmentK8.LoadingPort;
            }
        };


        $scope.MovementAutoComplete = function (text) {

            return k8Service.MovementAutoComplete(text).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) { });
        }
        $scope.MovementSelected = function (item, type) {

            $scope.k8.declarationShipmentK8[type] = item.Code
        }

        $scope.WarehouseAutoComplete = function (text) {

            var CustomStationCode = $scope.k8.declarationHeaderK8.CustomStationCode;
            return k8Service.WarehouseAutoComplete(text, CustomStationCode).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) { });
        }
        $scope.WarehouseSelected = function (item, type) {

            $scope.k8.declarationShipmentK8[type] = item.WareHouseID;
            //$scope.k8.declarationShipmentK8.WarehouseFromName = item.Text;
        }

        $scope.CustomDeclarantResults = function (declarantId) {
            return CustomDeclarantService.GetCustomDeclarantAutoComplete(declarantId).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.CustomDeclarantSelected = function (obj) {

            //$scope.k8.declarationHeaderK8.DeclarantName = obj.Name;
            //$scope.k8.declarationHeaderK8.DeclarantDesignation = obj.Designation;
            //$scope.k8.declarationHeaderK8.DeclarantNRIC = obj.NRIC;
            $scope.k8.declarationHeaderK8.DeclarantID = obj.ID;
        };

        $scope.CustomerSelected = function (item, type, addresstype) {
            //$scope.showLoading = true;
            //var html = '';
            $scope.k8.declarationHeaderK8[type] = item.Value;
            $scope.k8.declarationHeaderK8[addresstype] = '';

            //$scope.BindAddress(item.Value, addresstype);
        };

        //$scope.BindAddress = function (agentCode, addresstype) {
        //    var html = '';
        //    AddressService.GetAddress(agentCode).then(function (d) {
        //        if (d.data != null) {
        //            if (!angular.isUndefined(d.data.Address1))
        //                html += d.data.Address1 + '<br/>';
        //            if (!angular.isUndefined(d.data.Address2))
        //                html += d.data.Address2 + '<br/>';
        //            if (!angular.isUndefined(d.data.Address3))
        //                html += d.data.Address3 + '<br/>';
        //            if (!angular.isUndefined(d.data.City))
        //                html += d.data.City + '<br/>';
        //            if (!angular.isUndefined(d.data.State))
        //                html += d.data.State + '<br/>';
        //            if (!angular.isUndefined(d.data.CountryCode))
        //                html += d.data.CountryCode + '<br/>';
        //            if (!angular.isUndefined(d.data.ZipCode))
        //                html += d.data.ZipCode;
        //        }
        //        $scope.k8.declarationHeaderK8[addresstype] = html.toUpperCase();
        //        $scope.showLoading = false;
        //    }, function (err) { });
        //};

        $scope.Savek8Declaration = function (k8) {

            if ($scope.isFrmK8Valid) {
                if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.ValidateMovement() && $scope.ValidateConveyance() && $scope.CheckSubItems(k8) && $scope.CheckContainerNos(k8)) {

                    //$scope.changeShipmentType($scope.k8.declarationHeaderK8.ShipmentType);

                    //Commented by Prasad, Handled in API
                    //if ($scope.isConventionalCargo) {
                    //    $scope.k8.declarationContainerK8 = null;
                    //}
                    $scope.k8.declarationHeaderK8.IsPartial = false;
                    if (($scope.k8.declarationHeaderK8.DeclarationNo == null || $scope.k8.declarationHeaderK8.DeclarationNo == undefined || $scope.k8.declarationHeaderK8.DeclarationNo == "") && !$scope.k8.declarationHeaderK8.IsPartial) {

                        var obj = { ActivityCode: 1021 };
                        $scope.Activities.push(obj);
                        var obj = { ActivityCode: 1022 };
                        $scope.Activities.push(obj);
                    }
                    else {
                        
                            var obj = { ActivityCode: 1022 };
                            $scope.Activities.push(obj);
                       
                    }
                    k8Service.Savek8Declaration(k8).then(function (d) {
                        /*Activity Save*/
                        var arr = new Array();
                        angular.forEach($scope.Activities, function (obj, i) {
                            debugger;
                            var obj = {
                                LinkDocumentNo: d.data.orderNo,
                                TransactionNo: d.data.declarationNo,
                                ActivityCode: obj.ActivityCode
                            }
                            arr.push(obj);
                        });

                        k8Service.SaveActivityStatus(arr).then(function (test) {
                            debugger;
                            arr = new Array();
                            $scope.Activities = new Array();
                        });
                        /*Activity Save*/

                        if (d.data != "The ContainerNo field is required.") {
                            growlService.growl('Declaration Saved Successfully..', 'success');
                            //declarationNo = d.data.declarationNo;
                            $scope.k8.declarationHeaderK8.DeclarationNo = d.data.declarationNo;
                            $scope.k8.declarationHeaderK8.OrderNo = d.data.orderNo;
                            // k8Service.GetDeclaration(d.data.declarationNo);
                            $scope.IsDeclarationValidated = true;

                        }
                        else {
                            growlService.growl('The ContainerNo field is required.', 'danger');
                        }
                    }, function (err) {

                    });
                }
            } else
                growlService.growl('Please enter all mandatory fields', 'danger');
        }


        /*
        $scope.GetDeclarationOnLoad = function (declarationNo) {

            k8Service.GetDeclaration(declarationNo).then(function (d) {
                
                $scope.k8 = d.data;
                $scope.changeShipmentType($scope.k8.declarationHeaderK8.ShipmentType);

                if (!$scope.k8.declarationHeaderK8.IsPartial)
                    $scope.IsDeclarationValidated = true;

                if (!angular.isUndefined($scope.k8.declarationHeaderK8.DeclarantID) && $scope.k8.declarationHeaderK8.DeclarantID != "" && $scope.k8.declarationHeaderK8.DeclarantID != null) {
                    $scope.k8.declarationHeaderK8.DeclarantIDText = $scope.k8.declarationHeaderK8.DeclarantIDText;
                }
                $scope.GetDeclartionStatus(declarationNo);

                $scope.IsCustomResponsesShow = true;
                $scope.GetCustomResponse(declarationNo);
                $scope.ngTblContainerInfo();
                $scope.ngTblItemInfo();
                $scope.ngTblDocuments();
                $scope.ngTblConveyances();
                $scope.validateDates();
                $scope.ChangeDeclarationType($scope.k8.declarationHeaderK8.DeclarationK8Type);
                $scope.validateInputDecimal();

            });
        }
        */
        $scope.ValidateContainer = function () {

            if (!$scope.isConventionalCargo) {
                if ($scope.k8.declarationContainerK8.length == 0) {
                    growlService.growl('Atleast one container is required', 'danger');
                    return false;
                }
                else
                    return true;
            }
            else
                return true;
        };

        $scope.$watch('frmk8.$valid', function (isValid) {
            $scope.isFrmK8Valid = isValid;
        });
        $scope.clear = function () {

            $state.go('k8declaration', { 'declarationNo': '' }, { reload: true });

        }

        $scope.Savek8DeclarationPartial = function (k8) {

            if ($scope.ValidatePartialSave() && $scope.ValidatePorts() && $scope.ValidateMovement() && $scope.CheckSubItems(k8) && $scope.CheckContainerNos(k8)) {

                //$scope.changeShipmentType(k8.declarationHeaderK8.ShipmentType);
                //if ($scope.isConventionalCargo) {
                //    $scope.k8.declarationContainerK8 = null;
                //}
                $scope.showLoading = true;
                $scope.k8.declarationHeaderK8.IsPartial = $scope.k8.declarationHeaderK8.IsPartial == false ? $scope.k8.declarationHeaderK8.IsPartial : true;
                if (($scope.k8.declarationHeaderK8.DeclarationNo == null || $scope.k8.declarationHeaderK8.DeclarationNo == undefined || $scope.k8.declarationHeaderK8.DeclarationNo == "") && $scope.k8.declarationHeaderK8.IsPartial) {
                    var obj = { ActivityCode: 1021 };
                    $scope.Activities.push(obj);
                }
                k8Service.Savek8Declaration(k8).then(function (d) {
                    /*Activity Save*/
                    var arr = new Array();
                    angular.forEach($scope.Activities, function (obj, i) {
                        debugger;
                        var obj = {
                            LinkDocumentNo: d.data.orderNo,
                            TransactionNo: d.data.declarationNo,
                            ActivityCode: obj.ActivityCode
                        }
                        arr.push(obj);
                    });

                    k8Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/

                    if (d.data != "The ContainerNo field is required.") {
                        $scope.showLoading = false;
                        //declarationNo = d.data.declarationNo;
                        $scope.k8.declarationHeaderK8.DeclarationNo = d.data.declarationNo;
                        $scope.k8.declarationHeaderK8.OrderNo = d.data.orderNo;
                        //k8Service.GetDeclaration(d.data.declarationNo);
                        growlService.growl('Declaration ' + d.data.declarationNo + ' Saved Partially..', 'success');
                    }
                    else {
                        growlService.growl('The ContainerNo field is required.', 'danger');
                    }

                }, function (err) {

                });
            }
        }
        $scope.ShipCallResults = function (text) {
            return VesselScheduleService.ShipCallNoSearch(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.ValidateItemEntry = function () {
            var itemLen = 0;

            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1061) {
                if ($scope.k8.declarationItemExportK8 == null) {
                    $scope.k8.declarationItemExportK8 = new Array();
                }
                itemLen = $scope.k8.declarationItemExportK8.length;
            }
            else {
                if ($scope.k8.declarationItemK8 == null) {
                    $scope.k8.declarationItemK8 = new Array();
                }
                itemLen = $scope.k8.declarationItemK8.length;
            }
            if (itemLen == 0) {
                growlService.growl('Atleast one item entry is required', 'danger');
                return false;
            }
            else
                return true;
        };
        /*Partial save*/

        $scope.ValidatePorts = function () {

            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1060 || $scope.k8.declarationHeaderK8.DeclarationK8Type == 1063) {
                if ($scope.k8.declarationShipmentK8 != undefined) {
                    if (($scope.k8.declarationShipmentK8.LoadingPort != undefined && $scope.k8.declarationShipmentK8.LoadingPort != '' && $scope.k8.declarationShipmentK8.DischargePort != undefined && $scope.k8.declarationShipmentK8.DischargePort != '') && $scope.k8.declarationShipmentK8.LoadingPort == $scope.k8.declarationShipmentK8.DischargePort) {
                        growlService.growl('PlaceOfImport and Loading Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k8.declarationShipmentK8.LoadingPort != undefined && $scope.k8.declarationShipmentK8.LoadingPort != '' && $scope.k8.declarationShipmentK8.TranshipmentPort != undefined && $scope.k8.declarationShipmentK8.TranshipmentPort != '') && $scope.k8.declarationShipmentK8.LoadingPort == $scope.k8.declarationShipmentK8.TranshipmentPort) {
                        growlService.growl('Loading Port and Transhipment Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k8.declarationShipmentK8.TranshipmentPort != undefined && $scope.k8.declarationShipmentK8.TranshipmentPort != '' && $scope.k8.declarationShipmentK8.DischargePort != undefined && $scope.k8.declarationShipmentK8.DischargePort != '') && $scope.k8.declarationShipmentK8.DischargePort == $scope.k8.declarationShipmentK8.TranshipmentPort) {
                        growlService.growl('Transhipment Port and Discharge Port can not be the same', 'danger');
                        return false;
                    }
                    else
                        return true;
                }
                else
                    return true;
            }
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1061) {

                if ($scope.k8.declarationShipmentK8 != undefined) {
                    if ($scope.k8.declarationShipmentK8.PlaceOfExport != undefined && $scope.k8.declarationShipmentK8.DischargePort != undefined && $scope.k8.declarationShipmentK8.PlaceOfExport == $scope.k8.declarationShipmentK8.DischargePort) {
                        growlService.growl('PlaceofExport and Discharge Port can not be the same', 'danger');
                        return false;
                    } else if (($scope.k8.declarationShipmentK8.LoadingPort != undefined && $scope.k8.declarationShipmentK8.TranshipmentPort != undefined) && $scope.k8.declarationShipmentK8.LoadingPort == $scope.k8.declarationShipmentK8.TranshipmentPort) {

                        growlService.growl('Loading Port and Transhipment Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k8.declarationShipmentK8.TranshipmentPort != undefined && $scope.k8.declarationShipmentK8.DischargePort != undefined) && $scope.k8.declarationShipmentK8.DischargePort == $scope.k8.declarationShipmentK8.TranshipmentPort) {
                        growlService.growl('Transhipment Port and Discharge Port can not be the same', 'danger');
                        return false;
                    }
                    else
                        return true;
                }
                else
                    return true;

            }

            else
                return true;
        };


        $scope.ValidatePartialSave = function () {

            if ($scope.k8.declarationHeaderK8.TransactionDate == undefined || $scope.k8.declarationHeaderK8.TransactionDate == '') {
                //growlService.growl('please select Export Date', 'danger');
                growlService.growl('please select  Transaction Date', 'danger');

                return false;
            }
            else if ($scope.k8.declarationHeaderK8.TransportMode == undefined || $scope.k8.declarationHeaderK8.TransportMode == '') {
                growlService.growl('please select Transport Mode', 'danger');
                return false;
            }
            else if ($scope.k8.declarationHeaderK8.ShipmentType == undefined || $scope.k8.declarationHeaderK8.ShipmentType == '') {
                growlService.growl('please select Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k8.declarationHeaderK8.CustomerReferenceNo == undefined || $scope.k8.declarationHeaderK8.CustomerReferenceNo == '') {
                growlService.growl('please enter Reference No/Job No', 'danger');
                return false;
            }
            else if ($scope.k8.declarationHeaderK8.DeclarationShipmentType == undefined || $scope.k8.declarationHeaderK8.DeclarationShipmentType == '') {
                growlService.growl('please select Declaration Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k8.declarationHeaderK8.TransactionType == undefined || $scope.k8.declarationHeaderK8.TransactionType == '') {
                growlService.growl('please select SMK Transaction Type', 'danger');
                return false;
            }
            else
                return true;
        };

        $scope.CheckSubItems = function (obj) {
            $scope.retVal = false;
            $scope.docVal = false;
            if (obj.declarationHeaderK8.DeclarationK8Type != 1061) {
                angular.forEach(obj.declarationItemK8, function (item, value) {
                    angular.forEach(item.declarationSubItemK8, function (subItem, subValue) {
                        if (subItem.ItemType == 'TE' || subItem.ItemType == 'PM') {
                            $scope.retVal = true;
                        }
                    });
                });
                angular.forEach(obj.declarationDocumentsK8, function (item, value) {
                    if (item.SupportingDocumentType == 25813) {
                        $scope.docVal = true;
                    }
                });
                if ($scope.retVal && !$scope.docVal) {
                    growlService.growl('911 - IMPORT LICENCE document is required', 'danger');
                    return false;
                }
            }
            else {
                angular.forEach(obj.declarationItemExportK8, function (item, value) {
                    angular.forEach(item.declarationSubItemK8, function (subItem, subValue) {
                        if (subItem.ItemType == 'TE' || subItem.ItemType == 'PM') {
                            $scope.retVal = true;
                        }
                    });
                });
                angular.forEach(obj.declarationDocumentsK8, function (item, value) {
                    if (item.SupportingDocumentType == 25819) {
                        $scope.docVal = true;
                    }
                });
                if ($scope.retVal && !$scope.docVal) {
                    growlService.growl('811 - EXPORT LICENCE document is required', 'danger');
                    return false;
                }
            }
            return true;
        }

        $scope.CheckContainerNos = function (obj) {
            $scope.retVal = false;

            angular.forEach(obj.declarationContainerK8, function (item, value) {
                if (item.ContainerNo == null || item.ContainerNo == '' || angular.isUndefined(item.ContainerNo)) {
                    $scope.retVal = true;
                }
            });
            if ($scope.retVal) {
                growlService.growl('Container No is required for all containers.', 'danger');
                return false;
            }
            return true;
        }

        $scope.ValidateMovement = function () {

            if ($scope.k8.declarationShipmentK8.WarehouseFrom != null && $scope.k8.declarationShipmentK8.WarehouseFrom != '' && $scope.k8.declarationShipmentK8.WarehouseTo != null && $scope.k8.declarationShipmentK8.WarehouseTo != '') {
                if ($scope.k8.declarationShipmentK8.WarehouseFrom == $scope.k8.declarationShipmentK8.WarehouseTo) {
                    growlService.growl('Warehouse From and Warehouse To can not be the same', 'danger');
                    return false;
                }
            }
            if ($scope.k8.declarationShipmentK8.MovementFrom != null && $scope.k8.declarationShipmentK8.MovementFrom != '' && $scope.k8.declarationShipmentK8.MovementTo != null && $scope.k8.declarationShipmentK8.MovementTo != '') {
                if ($scope.k8.declarationShipmentK8.MovementFrom == $scope.k8.declarationShipmentK8.MovementTo) {
                    growlService.growl('Movement From and Movement To can not be the same', 'danger');
                    return false;
                }
            }
            return true;
        }

        $scope.ValidateConveyance = function () {

            if ($scope.k8.declarationConveyanceK8.length == 0) {
                growlService.growl('Atleast one conveyance is required', 'danger');
                return false;
            }
            else
                return true;
        };

        /*Partial save*/

        /* K8 Header*/

        /* containers */


        //  $scope.Savek8Declaration();
        $scope.deleteContainer = function (index) {
            $scope.k8.declarationContainerK8.splice(index, 1);
            if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1026) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1026 };
                    $scope.Activities.push(obj);
                }
            }
            $scope.ngTblContainerInfo();
        };
        $scope.GenericMerchantResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.MerchantSelected = function (item, Type) {
            $scope.k8.declarationHeaderK8[Type] = item.Value
        };
        $scope.PortOperatorResults = function (text) {
            var operatortype = 26220;
            return OrderEntryService.operatorList(operatortype, text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };
        $scope.TerminalOperaterSelected = function (item) {
            $scope.k8.declarationShipmentK8.PortOperator = item.Value;
        };

        $scope.VesselNameResults2 = function (text) {
            return VesselScheduleService.VesselNameResults(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };
        $scope.VesselIdResults = function (text) {
            return VesselScheduleService.VesselIdResults(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };
        $scope.VoyageSelected = function (item) {
            $scope.k8.declarationShipmentK8.VoyageNo = item.VoyageNoInWard;
            $scope.k8.declarationShipmentK8.SCNNo = item.ShipCallNo;
            $scope.k8.declarationShipmentK8.VesselID = item.VesselID;
            $scope.k8.declarationShipmentK8.VesselName = item.VesselName;
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1061)
                $scope.k8.declarationShipmentK8.ScheduleDate = item.ETD;
            else
                $scope.k8.declarationShipmentK8.ScheduleDate = item.ETA;
            if (!angular.isUndefined($scope.k8.declarationShipmentK8) && $scope.k8.declarationShipmentK8 != null) {


                if ($scope.k8.declarationShipmentK8.ScheduleDate == null) {
                    $scope.k8.declarationShipmentK8.ScheduleDate = undefined;
                }
                else
                    $scope.k8.declarationShipmentK8.ScheduleDate = moment($scope.k8.declarationShipmentK8.ScheduleDate);

            }


        };

        $scope.VoyageNoInwardResults = function (text) {
            return VesselScheduleService.VoyageNoOutWardSearch(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        var containerIndex = -1;

        $scope.editConInfo = function (index) {
            containerIndex = index;

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k8/container-info.html?v=' + Utility.Version,
                size: 'lg',
                controller: 'AddOrEditK8Container',
                resolve: {
                    dataObj: function () {
                        return {
                            dc: (containerIndex == -1 ? {} : $scope.k8.declarationContainerK8[containerIndex]),
                            sizeList: $scope.lookUpData.sizeList,
                            jobTypeList: $scope.lookUpData.jobTypeList,
                            containerStatusList: $scope.lookUpData.containerStatusList
                        }
                    }
                }
            });

            modalInstance.result.then(function (res) {
                //  
                if (angular.isUndefined(res.Size))
                    res.Size = null;
                if (angular.isUndefined(res.EQDStatus))
                    res.EQDStatus = null;

                if (containerIndex != -1) {
                    $scope.k8.declarationContainerK8[containerIndex] = res;
                    if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1027) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1027 };
                            $scope.Activities.push(obj);
                        }
                    }
                }
                else {
                    $scope.k8.declarationContainerK8.push(res);
                    if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1025) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1025 };
                            $scope.Activities.push(obj);
                        }
                    }
                }


                containerIndex = -1;
                $scope.ngTblContainerInfo();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        }
        //tblK8Responses
        $scope.ngTblK8Responses = function () {
            $scope.tblK8Responses = new NgTableParams({
                page: 1,
                count: 50
            }, {
                getData: function ($defer, params) {
                    var conData = $scope.customresponses;
                    $defer.resolve(conData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        }

        $scope.K8ContainerIndex = -1;
        $scope.ngTblContainerInfo = function () {
            $scope.tblK8Container = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.k8.declarationContainerK8.length,
                getData: function ($defer, params) {
                    var conData = params.sorting() ? $filter('orderBy')($scope.k8.declarationContainerK8, params.orderBy()) : $scope.k8.declarationContainerK8;
                    $defer.resolve(conData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.containerInfoIndex = (params.page() - 1) * params.count();
                }
            });
        }

        /*Copy Container*/
        $scope.CopyContainer = function (container) {
            var copyCon = angular.copy(container);
            if ($scope.k8.declarationContainerK8 != null) {
                copyCon.ContainerNo = '';
                $scope.k8.declarationContainerK8.push(copyCon);
            }
            if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1025) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1025 };
                    $scope.Activities.push(obj);
                }
            }
            $scope.ngTblContainerInfo();
        }
        /*Copy Container*/

        /* containers */


        /* item entry */
        $scope.showAddBtn = true;

        var itemEntryIndex = -1;

        $scope.editItem = function (index) {

            itemEntryIndex = index;
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type != 1061) {

                if ($scope.k8.declarationItemK8 == null) {
                    $scope.k8.declarationItemK8 = new Array();
                }
                var _CIFC = 0.00;
                var _FOB = 0.00;
                var _EXW = 0.00;
                var _CIF = 0.00;
                var _CNF = 0.00;
                var _CNI = 0.00;
                var _Freight = 0.00;
                var _insurance = 0.00;

                if ($scope.k8.declarationInvoiceK8 != null) {

                    if ($scope.k8.declarationInvoiceK8.FreightAmountPercent)
                        _Freight = $scope.k8.declarationInvoiceK8.FreightAmountPercent;

                    if ($scope.k8.declarationInvoiceK8.InsuranceAmountPercent)
                        _insurance = $scope.k8.declarationInvoiceK8.InsuranceAmountPercent;

                }
                var _InvoiceCurrency = $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode;
                var _invoiceCurrencyRate = $filter('filter')($scope.lookUpData.currencyList, { Text: $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode })[0].ImportRate;

                var _isFreightCurrency = (angular.isUndefined($scope.k8.declarationInvoiceK8.IsFreightCurrency) ? false : $scope.k8.declarationInvoiceK8.IsFreightCurrency);
                var _isInsuranceCurrency = (angular.isUndefined($scope.k8.declarationInvoiceK8.IsInsuranceCurrency) ? false : $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                var _incoTerm = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.IncoTerm) ? 0 : $scope.k8.declarationInvoiceK8.IncoTerm);
                var _port = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.PortAmountPercent) ? 0 : $scope.k8.declarationInvoiceK8.PortAmountPercent);
                var _otherCharges = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.OthersAmountPercent) ? 0 : $scope.k8.declarationInvoiceK8.OthersAmountPercent);




                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'Js/Declaration/Templates/k8/item-entry.html?v=' + Utility.Version,
                    controller: 'k8ItemEntryCntrl',
                    windowClass: 'app-modal-window4',
                    resolve: {
                        dataObj: function () {
                            return {
                                itemEntry: (itemEntryIndex == -1 ? {} : $scope.k8.declarationItemK8[index]),
                                CIFC: _CIFC,
                                FOB: _FOB,
                                EXW: _EXW,
                                CIF: _CIF,
                                CNF: _CNF,
                                CNI: _CNI,
                                Freight: _Freight,
                                insurance: _insurance,
                                invoiceCurrency: _InvoiceCurrency,
                                invoiceCurrencyRate: _invoiceCurrencyRate,
                                isFreightCurrency: _isFreightCurrency,
                                isInsuranceCurrency: _isInsuranceCurrency,
                                incoTerm: _incoTerm,
                                port: _port,
                                otherCharges: _otherCharges
                            }
                        }
                    }
                });

                modalInstance.result.then(function (res) {

                    if (res.declarationSubItemK8 != undefined) {
                        $scope.k8.declarationSubItemK8 = $.map(res.declarationSubItemK8, function (el) {
                            return el
                        });
                    }
                    if (itemEntryIndex != -1) {
                        if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                            var flag = false;
                            angular.forEach($scope.Activities, function (item, index) {
                                if (item.ActivityCode == 1044) {
                                    flag = true;
                                }
                            });
                            if (flag == false) {
                                var obj = { ActivityCode: 1044 };
                                $scope.Activities.push(obj);
                            }
                        }
                        $scope.k8.declarationItemK8[itemEntryIndex] = res;
                    }

                    else {
                        if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                            var flag = false;
                            angular.forEach($scope.Activities, function (item, index) {
                                if (item.ActivityCode == 1028) {
                                    flag = true;
                                }
                            });
                            if (flag == false) {
                                var obj = { ActivityCode: 1028 };
                                $scope.Activities.push(obj);
                            }
                        }
                        $scope.k8.declarationItemK8.push(res);
                    }
                    $scope.ngTblItemInfo();
                    itemEntryIndex = -1;



                }, function (err) {
                    if (!angular.isUndefined(err.statusText))
                        growlService.growl(err.statusText, 'danger');
                });
            }
            else {
                if ($scope.k8.declarationItemExportK8 == null) {
                    $scope.k8.declarationItemExportK8 = new Array();
                }
                var _CIFC = 0.00;
                var _FOB = 0.00;
                var _EXW = 0.00;
                var _CIF = 0.00;
                var _CNF = 0.00;
                var _CNI = 0.00;
                var _Freight = 0.00;
                var _insurance = 0.00;

                if ($scope.k8.declarationInvoiceK8 != null) {

                    if ($scope.k8.declarationInvoiceK8.FreightAmountPercent)
                        _Freight = $scope.k8.declarationInvoiceK8.FreightAmountPercent;

                    if ($scope.k8.declarationInvoiceK8.InsuranceAmountPercent)
                        _insurance = $scope.k8.declarationInvoiceK8.InsuranceAmountPercent;

                }

                var _InvoiceCurrency = $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode;
                
                // var _invoiceCurrencyRate = $filter('filter')($scope.lookUpData.currencyList, { Text: $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode })[0].ExportRate;
                var _invoiceCurrencyRate = $filter('filter')($scope.lookUpData.currencyExportList, { Text: $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode })[0].ExportRate;

                var _isFreightCurrency = (angular.isUndefined($scope.k8.declarationInvoiceK8.IsFreightCurrency) ? false : $scope.k8.declarationInvoiceK8.IsFreightCurrency);
                var _isInsuranceCurrency = (angular.isUndefined($scope.k8.declarationInvoiceK8.IsInsuranceCurrency) ? false : $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
                var _incoTerm = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.IncoTerm) || $scope.k8.declarationInvoiceK8.IncoTerm == null ? 0 : $scope.k8.declarationInvoiceK8.IncoTerm);
                var _port = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.PortAmountPercent) || $scope.k8.declarationInvoiceK8.PortAmountPercent == null ? 0 : $scope.k8.declarationInvoiceK8.PortAmountPercent);
                var _otherCharges = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.OthersAmountPercent) || $scope.k8.declarationInvoiceK8.OthersAmountPercent == null ? 0 : $scope.k8.declarationInvoiceK8.OthersAmountPercent);

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'Js/Declaration/Templates/k8/item-entry-export.html?v=' + Utility.Version,
                    controller: 'k8ItemEntryExportCntrl',
                    windowClass: 'app-modal-window4',
                    resolve: {
                        dataObj: function () {
                            return {
                                itemEntryExport: (itemEntryIndex == -1 ? {} : $scope.k8.declarationItemExportK8[index]),
                                CIFC: _CIFC,
                                FOB: _FOB,
                                EXW: _EXW,
                                CIF: _CIF,
                                CNF: _CNF,
                                CNI: _CNI,
                                Freight: _Freight,
                                insurance: _insurance,
                                invoiceCurrency: _InvoiceCurrency,
                                invoiceCurrencyRate: _invoiceCurrencyRate,
                                isFreightCurrency: _isFreightCurrency,
                                isInsuranceCurrency: _isInsuranceCurrency,
                                incoTerm: _incoTerm,
                                port: _port,
                                otherCharges: _otherCharges,
                                DestinationCountry: $scope.k8.declarationInvoiceK8.DestinationCountry
                            }
                        }
                    }
                });

                modalInstance.result.then(function (res) {

                    if (res.declarationSubItemK8 != undefined) {
                        $scope.k8.declarationSubItemK8 = $.map(res.declarationSubItemK8, function (el) {
                            return el
                        });
                    }
                    if (itemEntryIndex != -1) {
                        if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                            var flag = false;
                            angular.forEach($scope.Activities, function (item, index) {
                                if (item.ActivityCode == 1044) {
                                    flag = true;
                                }
                            });
                            if (flag == false) {
                                var obj = { ActivityCode: 1044 };
                                $scope.Activities.push(obj);
                            }
                        }
                        $scope.k8.declarationItemExportK8[itemEntryIndex] = res;
                    }
                    else {
                        if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                            var flag = false;
                            angular.forEach($scope.Activities, function (item, index) {
                                if (item.ActivityCode == 1028) {
                                    flag = true;
                                }
                            });
                            if (flag == false) {
                                var obj = { ActivityCode: 1028 };
                                $scope.Activities.push(obj);
                            }
                        }
                        $scope.k8.declarationItemExportK8.push(res);
                    }
                    $scope.ngTblItemInfo();
                    itemEntryIndex = -1;

                }, function (err) {
                    if (!angular.isUndefined(err.statusText))
                        growlService.growl(err.statusText, 'danger');
                });
            }
        }
        $scope.K8ContainerIndex = -1;
        $scope.ngTblItemInfo = function () {

            var totalValue = 0;
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type != 1061) {
                totalValue = $scope.k8.declarationItemK8.length;
            }
            else
                totalValue = $scope.k8.declarationItemExportK8.length;
            $scope.tblK8ItemEntrie = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: totalValue,
                getData: function ($defer, params) {
                    var conData = new Array();

                    if ($scope.k8.declarationHeaderK8.DeclarationK8Type != 1061) {
                        conData = params.sorting() ? $filter('orderBy')($scope.k8.declarationItemK8, params.orderBy()) : $scope.k8.declarationItemK8;
                    }
                    else {
                        conData = params.sorting() ? $filter('orderBy')($scope.k8.declarationItemExportK8, params.orderBy()) : $scope.k8.declarationItemExportK8;
                    }

                    $defer.resolve(conData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.itemEntryIndex = (params.page() - 1) * params.count();
                }
            });
        };



        $scope.deleteItem = function (index) {
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type != 1061) {
                $scope.k8.declarationItemK8.splice(index, 1);
            } else
                $scope.k8.declarationItemExportK8.splice(index, 1);


            if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1029) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1029 };
                    $scope.Activities.push(obj);
                }
            }
            $scope.ngTblItemInfo();
        };
        /*Copy Item enrty*/
        $scope.CopyItemEntry = function (itemEntry) {

            var copyItem = angular.copy(itemEntry);
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1061) {
                //if ($scope.k8.declarationItemExportK8 != null) {
                $scope.k8.declarationItemExportK8.push(copyItem);
            }
            else if ($scope.k8.declarationItemK8 != null) {
                $scope.k8.declarationItemK8.push(copyItem);
            }
            if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1010) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1010 };
                    $scope.Activities.push(obj);
                }
            }
            $scope.ngTblItemInfo();
        }
        /*Copy Item enrty*/
        /* item entry */

        /* documents */

        $scope.deleteDocument = function (index) {

            $scope.k8.declarationDocumentsK8.splice(index, 1);
            if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                    var obj = { ActivityCode: 1031 };
                    $scope.Activities.push(obj);
            }
            $scope.ngTblDocuments();
        }
        var DocIndex = -1;
        $scope.editDocument = function (index) {
            if ($scope.k8.declarationDocumentsK8 == null)
                $scope.k8.declarationDocumentsK8 = new Array();
            DocIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k8/document.html?v=' + Utility.Version,
                controller: 'k8DocumentCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            Document: (DocIndex == -1 ? {} : $scope.k8.declarationDocumentsK8[index]),
                            docDateTypeList: $scope.lookUpData.docDateTypeList,
                            OGACodeList: $scope.lookUpData.OGACodeList,
                            customStationCodeList: $scope.lookUpData.smkList,
                            SupportingDocumentTypeList: $scope.lookUpData.SupportingDocumentTypeList,
                            declarationDocumentsK8: $scope.k8.declarationDocumentsK8,
                            countryList: $scope.lookUpData.countryList,
                            OGABranchlist: $scope.lookUpData.OGABranchlist
                        };
                    }
                }

            });
            modalInstance.result.then(function (res) {
                if (DocIndex != -1)
                    $scope.k8.declarationDocumentsK8[DocIndex] = res;
                else {
                    if ($scope.k8.declarationHeaderK8.DeclarationNo != null && $scope.k8.declarationHeaderK8.DeclarationNo != undefined && $scope.k8.declarationHeaderK8.DeclarationNo != "") {
                            var obj = { ActivityCode: 1030 };
                            $scope.Activities.push(obj);
                    }
                    $scope.k8.declarationDocumentsK8.push(res);
                }
                $scope.ngTblDocuments();
                DocIndex = -1;
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });

        }

        $scope.documentsIndex = -1;
        $scope.ngTblDocuments = function () {
            if ($scope.k8.declarationDocumentsK8 == null)
                $scope.k8.declarationDocumentsK8 = new Array();

            $scope.tblDocuments = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    ConveyanceType: 'asc'
                }
            }, {
                total: $scope.k8.declarationDocumentsK8.length,
                getData: function ($defer, params) {

                    var orderedData = params.sorting() ? $filter('orderBy')($scope.k8.declarationDocumentsK8, params.orderBy()) : $scope.k8.declarationDocumentsK8;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.documentsIndex = (params.page() - 1) * params.count();
                }
            })
        };
        /*Copy Document*/
        //$scope.CopyDocument = function (document) {
        //    var copyDoc = angular.copy(document);
        //    if ($scope.k8.declarationDocumentsK8 != null) {
        //        $scope.k8.declarationDocumentsK8.push(copyDoc);
        //    }
        //    $scope.ngTblDocuments();
        //}

        /* documents */

        /* CONVEYANCE */


        /* CONVEYANCE */


        $scope.conveyanceIndex = -1;
        $scope.ngTblConveyances = function () {
            if ($scope.k8.declarationConveyanceK8 == null)
                $scope.k8.declarationConveyanceK8 = new Array();

            $scope.tblConveyances = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.k8.declarationConveyanceK8.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.k8.declarationConveyanceK8, params.orderBy()) : $scope.k8.declarationConveyanceK8;
                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.conveyanceIndex = (params.page() - 1) * params.count();
                }
            })
        };

        var conveyanceIndex = -1;
        $scope.editConveyance = function (index) {
            if ($scope.k8.declarationConveyanceK8 == null)
                $scope.k8.declarationConveyanceK8 = new Array();

            conveyanceIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k8/conveyance.html?v=' + Utility.Version,
                controller: 'k8ConveyanceCntrl',
                size: 'md',
                resolve: {
                    dataObj: function () {
                        return {
                            Conveyance: (conveyanceIndex == -1 ? {} : $scope.k8.declarationConveyanceK8[conveyanceIndex]),
                            smkList: $scope.lookUpData.smkList,
                            conveyanceList: $scope.lookUpData.conveyanceList
                        };
                    }
                }
            });

            modalInstance.result.then(function (res) {

                if (conveyanceIndex != -1)
                    $scope.k8.declarationConveyanceK8[conveyanceIndex] = res;
                else {
                    $scope.k8.declarationConveyanceK8.push(res);
                }
                $scope.ngTblConveyances();
                conveyanceIndex = -1;
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };
        $scope.CopyConveyance = function (conveyance) {
            var copyConveyance = angular.copy(conveyance);
            if ($scope.k8.declarationConveyanceK8 != null)
                $scope.k8.declarationConveyanceK8.push(copyConveyance);

            $scope.ngTblConveyances();
        }


        /* CONVEYANCE */
        $scope.showLoading = false;
        $scope.deleteConveyance = function (index) {
            $scope.showLoading = true;
            $scope.k8.declarationConveyanceK8.splice(index, 1);
            $timeout(function () { $scope.showLoading = false; }, 500);
            $scope.con = {};

            $scope.ngTblConveyances();
        };
        $scope.CurrencyRateChanged = function () {

            var invoiceValue = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.InvoiceValue) || $scope.k8.declarationInvoiceK8.InvoiceValue == null ? 0 : $scope.k8.declarationInvoiceK8.InvoiceValue);
            var importRate = 0;
            debugger;
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1061) {
                $scope.currencyList = $scope.lookUpData.currencyExportList;
                importRate = $filter('filter')($scope.currencyList, { Value: $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode })[0].ExportRate;
            } else {
                $scope.currencyList = $scope.lookUpData.currencyList;
                importRate = $filter('filter')($scope.currencyList, { Value: $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode })[0].ImportRate;
            }

            $scope.k8.declarationInvoiceK8.InvoiceLocalAmount = (invoiceValue * importRate).toFixed(2);

            //$scope.k8.declarationInvoiceK8.FreightAmountCurrencyCode = $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode;
            //$scope.k8.declarationInvoiceK8.InsuranceAmountCurrencyCode = $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode;

            $scope.k8.declarationInvoiceK8.CurrencyExRate = importRate;
            //$scope.k8.declarationInvoiceK8.FreightAmountExRate = importRate.toFixed(4);
            //$scope.k8.declarationInvoiceK8.InsuranceAmountExRate = importRate.toFixed(4);

        };

        /*Clone*/
        $scope.CloneK8 = function (declarationNo) {

            k8Service.CloneDeclaration(declarationNo).then(function (d) {
                $scope.k8 = d.data.declaration;

                $scope.k8.declarationHeaderK8.IsPartial = true;
                $scope.k8.declarationHeaderK8.DeclarationNo = null;
                $scope.k8.declarationHeaderK8.OrderNo = null;
                $scope.IsDeclarationValidated = false;
                $scope.validateDates();
                $scope.ediResponse = null;
                $scope.customresponses = {};
                //$scope.ChangeDeclarationType($scope.k8.declarationHeaderK8.DeclarationK8Type);
                $scope.ngTblContainerInfo();
                $scope.ngTblItemInfo();
                $scope.ngTblDocuments();
                $scope.ngTblConveyances();
                $scope.validateInputDecimal();
                $scope.k8.declarationHeaderK8.OpenDate = moment();
                $scope.k8.declarationHeaderK8.TransactionDate = moment();
                $scope.IsNew = true;
            }, function (err) { });
        }

        $scope.IncoTermCalculation = function () {


            var invoiceValue = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.InvoiceLocalAmount) || $scope.k8.declarationInvoiceK8.InvoiceLocalAmount == null ? 0 : $scope.k8.declarationInvoiceK8.InvoiceLocalAmount);
            var incoTerm = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.IncoTerm) || $scope.k8.declarationInvoiceK8.IncoTerm == null ? 0 : $scope.k8.declarationInvoiceK8.IncoTerm);
            var freight = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.FreightAmountPercent) || $scope.k8.declarationInvoiceK8.FreightAmountPercent == null ? 0 : $scope.k8.declarationInvoiceK8.FreightAmountPercent);
            var insurance = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.InsuranceAmountPercent) || $scope.k8.declarationInvoiceK8.InsuranceAmountPercent == null ? 0 : $scope.k8.declarationInvoiceK8.InsuranceAmountPercent);
            var port = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.PortAmountPercent) || $scope.k8.declarationInvoiceK8.PortAmountPercent == null ? 0 : $scope.k8.declarationInvoiceK8.PortAmountPercent);
            var otherCharges = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.OthersAmountPercent) || $scope.k8.declarationInvoiceK8.OthersAmountPercent == null ? 0 : $scope.k8.declarationInvoiceK8.OthersAmountPercent);

            /* Vijay */

            var invoiceValue = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.InvoiceValue) || $scope.k8.declarationInvoiceK8.InvoiceValue == null ? 0 : $scope.k8.declarationInvoiceK8.InvoiceValue);
            var importRate = 0;

            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1061) {
                $scope.currencyList = $scope.lookUpData.currencyExportList;
                importRate = $filter('filter')($scope.currencyList, { Value: $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode })[0].ExportRate;
            } else {
                $scope.currencyList = $scope.lookUpData.currencyList;
                importRate = $filter('filter')($scope.currencyList, { Value: $scope.k8.declarationInvoiceK8.InvoiceCurrencyCode })[0].ImportRate;
            }

            $scope.k8.declarationInvoiceK8.InvoiceLocalAmount = (invoiceValue * importRate).toFixed(2);
            /* Vijay */
            if (incoTerm == 0)
                return;

            var obj = {
                incoTerm: incoTerm,
                freight: freight,
                insurance: insurance,
                port: port,
                otherCharges: otherCharges,
                invoiceValue: invoiceValue,
                FOB: $scope.k8.declarationInvoiceK8.FOBAmount,
                CIF: $scope.k8.declarationInvoiceK8.CIFAmount,
                EXW: $scope.k8.declarationInvoiceK8.EXWAmount,
                CNF: $scope.k8.declarationInvoiceK8.CNFAmount,
                CNI: $scope.k8.declarationInvoiceK8.CNIAmount,
                IsFreightCurrency: $scope.k8.declarationInvoiceK8.IsFreightCurrency,
                IsInsuranceCurrency: $scope.k8.declarationInvoiceK8.IsInsuranceCurrency
            };



            $scope.showLoading = true;
            k8Service.OutPutFOBCIF(obj).then(function (d) {
                $scope.k8.declarationInvoiceK8.FOBAmount = d.data.FOB;
                $scope.k8.declarationInvoiceK8.CIFAmount = d.data.CIF;
                $scope.k8.declarationInvoiceK8.EXWAmount = d.data.EXW;
                $scope.k8.declarationInvoiceK8.CNFAmount = d.data.CNF;
                $scope.k8.declarationInvoiceK8.CNIAmount = d.data.CNI;
                $scope.k8.declarationInvoiceK8.FreightAmount = d.data.freight;
                $scope.k8.declarationInvoiceK8.InsuranceAmount = d.data.insurance;
                $scope.k8.declarationInvoiceK8.CIFCAmount = d.data.CIFC;
                $scope.showLoading = false;
            }, function (err) { });
        };
        $scope.ChargesInfoCurrencyRateChanged = function (AmountPercent, IsPercent, CurrencyCode, AmountValue) {
            //
            //if (AmountPercent == null)
            //    return;


            var invoiceValue = parseFloat(angular.isUndefined($scope.k8.declarationInvoiceK8.InvoiceValue) || $scope.k8.declarationInvoiceK8.InvoiceValue == null ? 0 : $scope.k8.declarationInvoiceK8.InvoiceValue);
            var importRate = 0;
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1061) {
                importRate = $filter('filter')($scope.currencyList, { Value: CurrencyCode })[0].ExportRate;
            }
            else
                importRate = $filter('filter')($scope.currencyList, { Value: CurrencyCode })[0].ImportRate;

            if (IsPercent) {

                var value = (invoiceValue / 100) * parseFloat(AmountPercent);
                $scope.k8.declarationInvoiceK8[AmountValue] = (value * importRate).toFixed(2);
            }
            else {
                $scope.k8.declarationInvoiceK8[AmountValue] = (parseFloat(AmountPercent) * importRate).toFixed(2);
            }
            if (AmountValue == 'PortAmountValue') {
                $scope.k8.declarationInvoiceK8.PortAmountExRate = importRate;
            }
            if (AmountValue == 'FreightAmountValue') {
                $scope.k8.declarationInvoiceK8.FreightAmountExRate = importRate;
            }
            if (AmountValue == 'InsuranceAmountValue') {
                $scope.k8.declarationInvoiceK8.InsuranceAmountExRate = importRate;
            }
            if (AmountValue == 'OthersAmountValue') {
                $scope.k8.declarationInvoiceK8.OthersAmountExRate = importRate;
            }

        };

        $scope.IncoTermChanged = function () {

            //$scope.k8.declarationInvoiceK8.FreightAmountValue = $scope.k8.declarationInvoiceK8.InsuranceAmountValue = $scope.k8.declarationInvoiceK8.IncoTerm;
            var isFreightCurrency = (angular.isUndefined($scope.k8.declarationInvoiceK8.IsFreightCurrency) ? false : $scope.k8.declarationInvoiceK8.IsFreightCurrency);
            var isInsuranceCurrency = (angular.isUndefined($scope.k8.declarationInvoiceK8.IsInsuranceCurrency) ? false : $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
            $scope.IncoTermCalculation(isFreightCurrency, isInsuranceCurrency);
        };

        $scope.IsFreightCurrencyChecked = function (flag) {
            $scope.IncoTermCalculation(!flag, $scope.k8.declarationInvoiceK8.IsInsuranceCurrency);
        };

        $scope.IsInsuranceCurrencyChecked = function (flag) {
            $scope.IncoTermCalculation($scope.k8.declarationInvoiceK8.IsFreightCurrency, !flag);
        };
        $scope.Calculatepercentageamount = function () {

            if ($scope.k8.declarationInvoiceK8.IsFreightCurrency == true) {

                var Freight = parseFloat($scope.k8.declarationInvoiceK8.FreightAmountPercent);
                if (Freight > 100) {

                    growlService.growl('Freight Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k8.declarationInvoiceK8.FreightAmountPercent = '';
                    $scope.k8.declarationInvoiceK8.FreightAmountValue = 0;
                }

            }

            if ($scope.k8.declarationInvoiceK8.IsInsuranceCurrency == true) {
                var Insurance = parseFloat($scope.k8.declarationInvoiceK8.InsuranceAmountPercent);
                if (Insurance > 100) {

                    growlService.growl('Insurance Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k8.declarationInvoiceK8.InsuranceAmountPercent = '';
                    $scope.k8.declarationInvoiceK8.InsuranceAmountValue = 0;
                }
            }

        }

        $scope.CalulateAmountReceivedLocalValue = function () {

            var invoiceAmount = parseFloat($scope.k8.declarationInvoiceK8.AmountReceived);
            var exchangeRate = '';
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1061) {
                exchangeRate = $filter('filter')($scope.currencyList,
                    { Value: $scope.k8.declarationInvoiceK8.AmountReceivedCurrencyCode })[0].ExportRate;
            }
            else
                exchangeRate = $filter('filter')($scope.currencyList,
                    { Value: $scope.k8.declarationInvoiceK8.AmountReceivedCurrencyCode })[0].ImportRate;
            $scope.k8.declarationInvoiceK8.AmountReceivedExchangeRate = exchangeRate;
            if (!isNaN(invoiceAmount) && !isNaN(exchangeRate) && exchangeRate != 0) {
                $scope.k8.declarationInvoiceK8.AmountReceivedLocalValue = invoiceAmount * exchangeRate;
            }
            else {
                $scope.k8.declarationInvoiceK8.AmountReceivedLocalValue = $scope.k8.declarationInvoiceK8.AmountReceived;
            }
        };

        $scope.amountReceivedCurrencyChanged = function () {

            var exchangeRate = '';
            if ($scope.k8.declarationHeaderK8.DeclarationK8Type == 1061) {
                exchangeRate = $filter('filter')($scope.currencyList, { Value: $scope.k8.declarationInvoiceK8.AmountReceivedCurrencyCode })[0].ExportRate;
            }
            else
                exchangeRate = $filter('filter')($scope.currencyList, { Value: $scope.k8.declarationInvoiceK8.AmountReceivedCurrencyCode })[0].ImportRate;
            $scope.k8.declarationInvoiceK8.AmountReceivedExchangeRate = exchangeRate;
            $scope.k8.declarationInvoiceK8.AmountReceivedLocalValue = $scope.k8.declarationInvoiceK8.AmountReceived * exchangeRate;

        };


        $scope.init();

        $scope.GenerateReportPDF = function (type) {

            k8Service.GenerateReportPDF($scope.BranchID, $scope.k8.declarationHeaderK8.DeclarationNo, type);
        };

        $scope.GenerateReport = function (name, reportUrl, reportID) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Reports/Templates/Report.html?v=' + Utility.Version,
                controller: 'ReportCntrl',
                windowClass: 'app-modal-window2',
                resolve: {
                    reportObj: function () {
                        return {
                            reportId: reportID,
                            reportName: name,
                            branchID: $scope.BranchID,
                            declarationNo: declarationNo,
                            Url: reportUrl
                        }
                    }
                }
            });

            modalInstance.result.then(function (d) {

            }, function () {

            });
        };

        $scope.btncustom = false;
        $scope.GenerateFile = function (k8, declarationNo) {
            if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.ValidateMovement() && $scope.ValidateConveyance() && $scope.CheckSubItems(k8) && $scope.CheckContainerNos(k8)) {
                $scope.btncustom = true;
                k8Service.Savek8Declaration(k8).then(function (res) {
                    /*Activity Save*/
                    var arr = new Array();
                    angular.forEach($scope.Activities, function (obj, i) {
                        debugger;
                        var obj = {
                            //LinkDocumentNo: d.data.orderNo,
                            TransactionNo: res.data.declarationNo,
                            ActivityCode: obj.ActivityCode
                        }
                        arr.push(obj);
                    });

                    k8Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/
                    k8Service.GenerateFile(declarationNo).then(function (d) {
                        $scope.btncustom = false;
                        $scope.customresponses = d.data.customResponse;
                        $scope.ediResponse = d.data.ediResponse;
                        $scope.ammendantsResponse = d.data.ammendantsResponse;
                        $scope.dutyAmountlist = d.data.dutyAmountlist;
                        growlService.growl('Submitted to Customs successfully..!', 'success');

                        $scope.ngTblK8Responses();
                    }, function (err) { });

                }, function (err) { });

            }
        }

        $scope.GetCustomResponse = function (declarationNo) {
            k8Service.GetCustomResponse(declarationNo).then(function (d) {
                $scope.customresponses = d.data.customResponse;
                $scope.ediResponse = d.data.ediResponse;
                $scope.ammendantsResponse = d.data.ammendantsResponse;
                $scope.customresponseheaderItem = d.data.customresponseheaderItem;
                $scope.dutyAmountlist = d.data.dutyAmountlist;
                $scope.ngTblK8Responses();

            }, function (err) { });
        };
        $scope.DisplayResponseData = function (obj) {
            k8Service.GetCustomResponseInfo(obj).then(function (d) {
                //$scope.customresponseheaderItem = d.data.customresponseheaderItem;
                //$scope.customresponseDetails = d.data.customresponseDetails;
                $scope.customresponseheaderItem = d.data;
                //$scope.customresponseheaderItem.RegistrationDate = d.data.customresponseheaderItem.RegistrationDate;
            }, function (err) { });
        };

        $scope.validateDates = function () {
            if (!angular.isUndefined($scope.k8) && $scope.k8 != null) {

                if (!angular.isUndefined($scope.k8.declarationInvoiceK8) && $scope.k8.declarationInvoiceK8 != null) {


                    if ($scope.k8.declarationInvoiceK8.InvoiceDate == null) {
                        $scope.k8.declarationInvoiceK8.InvoiceDate = undefined;
                    }
                    else
                        $scope.k8.declarationInvoiceK8.InvoiceDate = moment($scope.k8.declarationInvoiceK8.InvoiceDate);
                }
                if (!angular.isUndefined($scope.k8.declarationHeaderK8) && $scope.k8.declarationHeaderK8 != null) {


                    if ($scope.k8.declarationHeaderK8.OpenDate == null) {
                        $scope.k8.declarationHeaderK8.OpenDate = undefined;
                    }
                    else
                        $scope.k8.declarationHeaderK8.OpenDate = moment($scope.k8.declarationHeaderK8.OpenDate);

                    if ($scope.k8.declarationHeaderK8.TransactionDate == null) {
                        $scope.k8.declarationHeaderK8.TransactionDate = undefined;
                    }
                    else
                        $scope.k8.declarationHeaderK8.TransactionDate = moment($scope.k8.declarationHeaderK8.TransactionDate);
                }


                if (!angular.isUndefined($scope.k8.declarationShipmentK8) && $scope.k8.declarationShipmentK8 != null) {


                    if ($scope.k8.declarationShipmentK8.ScheduleDate == null) {
                        $scope.k8.declarationShipmentK8.ScheduleDate = undefined;
                    }
                    else
                        $scope.k8.declarationShipmentK8.ScheduleDate = moment($scope.k8.declarationShipmentK8.ScheduleDate);

                    if ($scope.k8.declarationShipmentK8.MovementDate == null) {
                        $scope.k8.declarationShipmentK8.MovementDate = undefined;
                    }
                    else
                        $scope.k8.declarationShipmentK8.MovementDate = moment($scope.k8.declarationShipmentK8.MovementDate);

                }
                if (!angular.isUndefined($scope.k8.declarationDocumentsK8) && $scope.k8.declarationDocumentsK8 != null) {
                    if ($scope.k8.declarationDocumentsK8.DocDate == null) {
                        $scope.k8.declarationDocumentsK8.DocDate = undefined;
                    }
                    else
                        $scope.k8.declarationDocumentsK8[index].DocDate = moment($scope.k8.declarationDocumentsK8[index].DocDate);
                }
            }
        }

        $scope.ContainerFileUpload = function (e) {
            if (angular.isUndefined($scope.k8.declarationContainerK8))
                $scope.k8.declarationContainerK8 = new Array();

            var file = document.getElementById('containerFile').files[0];

            UtilityFunc.GetExcelData(file, '1TradeK8Container').then(function (d) {
                angular.forEach(d, function (item, index) {

                    var Status = $filter('filter')($scope.lookUpData.containerStatusList, { Text: item.Status })[0].Value;
                    var Type1 = $filter('filter')($scope.lookUpData.jobTypeList, { Text: item.ContainerType })[0].Value;
                    var SOC = !angular.isUndefined(item.SOCType) ? item.SOCType.toUpperCase() == 'YES' ? true : false : false;

                    var obj = {

                        //ContainerStatus,EQDStatus,Type,Size,IsSOC,ContainerNo(UI)
                        //Type,Size,ContainerNo,SOCType (YES/NO),Status,Type
                        ContainerNo: item.ContainerNo,
                        Type: item.Type,
                        Size: item.Size,
                        IsSOC: SOC,
                        ContainerStatus: Status,
                        EQDStatus: Type1
                    };
                    $scope.k8.declarationContainerK8.push(obj);
                });

                $timeout(function () {
                    $scope.ngTblContainerInfo();
                }, 500);
            }, function (err) { });
        }



        $scope.CargoFileUpload = function (e) {
            if (angular.isUndefined($scope.k8.declarationItemK8))
                $scope.k8.declarationItemK8 = new Array();

            var file = document.getElementById('cargoFile').files[0];

            UtilityFunc.GetExcelData(file, '1TradeK8Cargo').then(function (d) {

                angular.forEach(d, function (item, index) {

                    var obj = {
                        ProductCode: item.Product,
                        OriginCountryCode: item.CountryofFinalDestination,
                        HSCode: item.HSCode,
                        StatisticalQty: item.StatisticalQty,
                        DeclaredQty: item.DeclaredQty,
                        DeclaredUOM: item.DeclaredUOM,
                        ItemAmount: item.ItemAmount,
                        ItemDescription1: item.ItemDescription,
                        ExtraItemDescription: item.ExtraItemDescription,
                        DutyRateExemption: item.DutyRateExemption,
                        SpecificRateExemption: item.SpecificRateExemption
                    };
                    $scope.k8.declarationItemK8.push(obj);
                });

                $timeout(function () {
                    $scope.ngTblItemInfo();
                }, 500);
            }, function (err) { });
        }

        $scope.DeclineDeclaration = function (declarationno, orderno) {

            k8Service.DeclineDeclaration(declarationno, orderno).then(function (d) {

                growlService.growl('', 'success');
            });
        }

        $scope.GetDeclartionStatus = function (declarationNo) {

            k8Service.GetDeclartionStatus(declarationNo).then(function (d) {

                $scope.declarationOrderStatus = d.data;
            }, function (err) { });
        };
        //k8.declarationHeaderK8.OpenDate
        //k8.declarationHeaderK8.TransactionDate
    }]);