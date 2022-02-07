angular.module('LogiCon').controller('k9Cntrl', ['$scope', 'k9Service', 'MerchantProfileService', 'VesselScheduleService', 'PortAreaService', 'CurrencyRateService', 'OrderEntryService', 'VesselMasterService', 'Utility', '$uibModal', 'limitToFilter', 'growlService', '$stateParams', '$timeout', '$location', 'AddressService', 'UtilityFunc', '$filter', 'CustomDeclarantService', '$state', 'NgTableParams', '$anchorScroll',
    function ($scope, k9Service, MerchantProfileService, VesselScheduleService, PortAreaService, CurrencyRateService, OrderEntryService, VesselMasterService, Utility, $uibModal, limitToFilter, growlService, $stateParams, $timeout, $location, AddressService, UtilityFunc, $filter, CustomDeclarantService, $state, NgTableParams, $anchorScroll) {
        $scope.validateInputDecimal = function () {
            $timeout(function () {
                if ($scope.frmk9.GrossWeight.$viewValue != null) {
                    $scope.frmk9.GrossWeight.$$runValidators($scope.frmk9.GrossWeight.$modalValue, $scope.frmk9.GrossWeight.$viewValue, function () {
                        $scope.frmk9.GrossWeight.$setViewValue($scope.frmk9.GrossWeight.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk9.GrossVolume.$viewValue != null) {
                    $scope.frmk9.GrossVolume.$$runValidators($scope.frmk9.GrossVolume.$modalValue, $scope.frmk9.GrossVolume.$viewValue, function () {
                        $scope.frmk9.GrossVolume.$setViewValue($scope.frmk9.GrossVolume.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk9.InvoiceValuek9.$viewValue != null) {
                    $scope.frmk9.InvoiceValuek9.$$runValidators($scope.frmk9.InvoiceValuek9.$modalValue, $scope.frmk9.InvoiceValuek9.$viewValue, function () {
                        $scope.frmk9.InvoiceValuek9.$setViewValue($scope.frmk9.InvoiceValuek9.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk9.PortAmountPercent.$viewValue != null) {
                    $scope.frmk9.PortAmountPercent.$$runValidators($scope.frmk9.PortAmountPercent.$modalValue, $scope.frmk9.PortAmountPercent.$viewValue, function () {
                        $scope.frmk9.PortAmountPercent.$setViewValue($scope.frmk9.PortAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk9.FreightAmountPercent.$viewValue != null) {
                    $scope.frmk9.FreightAmountPercent.$$runValidators($scope.frmk9.FreightAmountPercent.$modalValue, $scope.frmk9.FreightAmountPercent.$viewValue, function () {
                        $scope.frmk9.FreightAmountPercent.$setViewValue($scope.frmk9.FreightAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk9.InsuranceAmountPercent.$viewValue != null) {
                    $scope.frmk9.InsuranceAmountPercent.$$runValidators($scope.frmk9.InsuranceAmountPercent.$modalValue, $scope.frmk9.InsuranceAmountPercent.$viewValue, function () {
                        $scope.frmk9.InsuranceAmountPercent.$setViewValue($scope.frmk9.InsuranceAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk9.OthersAmountPercent.$viewValue != null) {
                    $scope.frmk9.OthersAmountPercent.$$runValidators($scope.frmk9.OthersAmountPercent.$modalValue, $scope.frmk9.OthersAmountPercent.$viewValue, function () {
                        $scope.frmk9.OthersAmountPercent.$setViewValue($scope.frmk9.OthersAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
            }, 500);
        }
        var declarationNo = $stateParams.declarationNo;
        $scope.init = function () {

            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.timeFormat = UtilityFunc.TimeFormat();
            $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
            $scope.defaultCurrency = UtilityFunc.DefaultCurrency();
            $scope.defaultCountry = UtilityFunc.DefaultCountry();
            $scope.BranchID = UtilityFunc.BranchID();
            $scope.transportMode = 1021;
            $scope.IsNew = true;
            $scope.ic = {};//Invoice Cargo
            $scope.sd = {};//Shipment Details
            $scope.ex = {};//Excemption
            $scope.con = {};//Container Info
            $scope.doc = {};//Documents
            $scope.cl = {};//Clause
            $scope.ie = {};//item entry
            $scope.ies = {};//item entry subitem
            $scope.tempFlag = false;
            $scope.dc = {};//declaration container
            $scope.customresponses = {};
            $scope.declarationOrderStatus = {};
            $scope.ediresponse = {};
            $scope.customresponseheaderItem = {};
            $scope.isEditDoc = false;
            $scope.isConventionalCargo = false;
            $scope.isEditClause = false;
            $scope.IsDeclarationValidated = false;
            $scope.btncustom = false;
            $scope.time = null;
            if (declarationNo != "NEW" && declarationNo != "") {
                $scope.IsNew = false;
            }
            else {
                $scope.IsNew = true;
            }


            $scope.k9 = {
                declarationHeaderK9: {
                    DeclarationShipmentType: 25850,
                    OpenDate: moment(),
                    BranchID: UtilityFunc.BranchID(),
                    DeclarationNo: null,
                    DeclarationDate: null,
                    DeclarationType: null,
                    ImportDate: null,
                    OrderNo: null,
                    TransportMode: null,
                    ShipmentType: null,
                    TransactionType: null,
                    Importer: null,
                    Exporter: null,
                    SMKCode: null,
                    CustomStationCode: null,
                    ShippingAgent: null,
                    DeclarantID: null,
                    WareHouseCode: null,
                    WareHouseInfo: null,
                    WareHouseDepositNo: null,
                    WareHouseDepositDate: moment(),
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
                    ImporterName: null,
                    ExporterName: null,
                    DeclarantIDText: null,
                    ShippingAgentName: null
                },
                declarationContainerK9: new Array(),
                declarationDocumentsK9: new Array(),
                declarationClauseK9: {
                    BranchID: UtilityFunc.BranchID(),
                    DeclarationNo: null,
                    ItemNo: 1,
                    ClauseCode: null,
                    ClauseText: null,
                    CreatedBy: null,
                    CreatedOn: null,
                    ModifiedBy: null,
                    ModifiedOn: null
                },
                declarationItemK9: new Array(),
                declarationSubItemK9: new Array(),
                declarationInvoiceK9: {
                    BranchID: UtilityFunc.BranchID(),
                    IsFreightCurrency: false,
                    IsInsuranceCurrency: false,
                    FOBAmount: 0.00,
                    CIFAmount: 0.00,
                    EXWAmount: 0.00,
                    CNFAmount: 0.00,
                    CNIAmount: 0.00,
                    FreightAmount: 0.00,
                    InsuranceAmount: 0.00,
                    PortAmountCurrencyCode: 'MYR',
                    PortAmountExRate: 1.0000,
                    FreightAmountExRate: 1.0000,
                    InsuranceAmountExRate: 1.0000,
                    OthersAmountExRate: 1.0000,
                    CIFCAmount: 0.00,
                    PortAmountPercent: null,
                    FreightAmountPercent: null,
                    InsuranceAmountPercent: null,
                    OthersAmountPercent: null,
                    FreightAmountValue: '',
                    InsuranceAmountValue: '',
                    UOMWeight: 'KGM',
                    UOMVolume: 'MTQ',
                    InvoiceCurrencyCode: 'MYR'
                },

                declarationShipmentK9: {
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
                    PortOperator: null,
                    OceanBLNo: null,
                    HouseBLNo: null,
                    ETADate: null,
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
                    ModifiedBy: null,
                    ModifiedOn: null,
                    PlaceOfImportName: null,
                    LoadingPortName: null,
                    DischargePortName: null,
                    TranshipmentPortName: null,
                    DestinationPortName: null,
                    PortOperatorName: null
                },
                declarationExcemptionK9: {}
            };

            $scope.GetLookupData();
            if (!angular.isUndefined(declarationNo) && declarationNo != 'NEW' && declarationNo != "") {

                $scope.GetDeclaration(declarationNo);
            }
            $scope.Activity = {};
            $scope.Activities = new Array();
        }

        $scope.ChangeTransportMode = function (TransportMode) {
            $scope.transportMode = TransportMode;
            if ($scope.k9.declarationHeaderK9.TransportMode == 1020 || $scope.k9.declarationHeaderK9.TransportMode == 1024 || $scope.k9.declarationHeaderK9.TransportMode == 1025 || $scope.k9.declarationHeaderK9.ShipmentType == 26533 || $scope.k9.declarationHeaderK9.ShipmentType == 26531) {
                $scope.isConventionalCargo = true;
            }
            else
                $scope.isConventionalCargo = false;

            $scope.k9.declarationShipmentK9.VesselScheduleID = null;
            $scope.k9.declarationShipmentK9.VoyageNo = null;
            $scope.k9.declarationShipmentK9.SCNNo = null;
            $scope.k9.declarationShipmentK9.VesselID = null;
            $scope.k9.declarationShipmentK9.VesselName = null;
            $scope.k9.declarationShipmentK9.ETADate = undefined;
            $scope.k9.declarationShipmentK9.ManifestNo = null;
            $scope.k9.declarationShipmentK9.OceanBLNo = null;
            $scope.k9.declarationShipmentK9.HouseBLNo = null;
            $scope.k9.declarationShipmentK9.WagonNo = null;
            $scope.k9.declarationShipmentK9.VehicleNo1 = null;
            $scope.k9.declarationShipmentK9.VehicleNo2 = null;
            $scope.k9.declarationShipmentK9.FlightNo = null;
            $scope.k9.declarationShipmentK9.ARNNo = null;
            $scope.k9.declarationShipmentK9.MasterAWBNo = null;
            $scope.k9.declarationShipmentK9.HouseAWBNo = null;
            $scope.k9.declarationShipmentK9.AIRCOLoadNo = null;
            $scope.k9.declarationShipmentK9.JKNo = null;
        };

        $scope.changeShipmentType = function (ShipmentType) {
            if ($scope.k9.declarationHeaderK9.ShipmentType == 26533 || $scope.k9.declarationHeaderK9.ShipmentType == 26531 || $scope.k9.declarationHeaderK9.TransportMode == 1020 || $scope.k9.declarationHeaderK9.TransportMode == 1024 || $scope.k9.declarationHeaderK9.TransportMode == 1025) {
                $scope.isConventionalCargo = true;
            }
            else
                $scope.isConventionalCargo = false;
        };

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

        $scope.VoyageNoInwardResults = function (text) {
            return VesselScheduleService.VoyageNoInWardSearch(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.VoyageSelected = function (item) {
            $scope.k9.declarationShipmentK9.VoyageNo = item.VoyageNoInWard;
            $scope.k9.declarationShipmentK9.SCNNo = item.ShipCallNo;
            $scope.k9.declarationShipmentK9.VesselID = item.VesselID;
            $scope.k9.declarationShipmentK9.VesselName = item.VesselName;
            $scope.k9.declarationShipmentK9.ETADate = item.ETA;
            if (!angular.isUndefined($scope.k9.declarationShipmentK9) && $scope.k9.declarationShipmentK9 != null) {


                if ($scope.k9.declarationShipmentK9.ETADate == null) {
                    $scope.k9.declarationShipmentK9.ETADate = undefined;
                }
                else
                    $scope.k9.declarationShipmentK9.ETADate = moment($scope.k9.declarationShipmentK9.ETADate);
            }
        };

        $scope.VesselIdResults = function (text) {
            return VesselScheduleService.VesselIdResults(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.VesselNameResults2 = function (text) {
            return VesselScheduleService.VesselNameResults(text).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.clear = function () {
            $state.go('k9declaration', { 'declarationNo': '' }, { reload: true });
        };


        $scope.showLoading = true;
        $scope.showAddBtn = true;
        /*Report*/
        $scope.GenerateReportPDF = function (type) {
            k9Service.GenerateReportPDF($scope.BranchID, declarationNo, type);
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

        $scope.GetLookupData = function () {

            k9Service.GetLookupData().then(function (d) {

                $scope.lookUpData = d.data;
                if (declarationNo == 'NEW' || declarationNo == "") {
                    $scope.k9.declarationHeaderK9.TransportMode = 1021;

                    $scope.k9.declarationInvoiceK9.LocalCurrencyCode = $scope.defaultCurrency;
                    $scope.k9.declarationInvoiceK9.PortAmountCurrencyCode = $scope.defaultCurrency;
                    $scope.k9.declarationInvoiceK9.FreightAmountCurrencyCode = $scope.defaultCurrency;
                    $scope.k9.declarationInvoiceK9.InsuranceAmountCurrencyCode = $scope.defaultCurrency;
                    $scope.k9.declarationInvoiceK9.OthersAmountCurrencyCode = $scope.defaultCurrency;
                    $scope.k9.declarationInvoiceK9.PayCountry = $scope.defaultCountry;
                }
                if (!angular.isUndefined($scope.k9.declarationHeaderK9) && $scope.k9.declarationHeaderK9 != null) {
                    if ($scope.k9.declarationHeaderK9.OpenDate == null) {
                        $scope.k9.declarationHeaderK9.OpenDate = undefined;
                    }
                    else
                        $scope.k9.declarationHeaderK9.OpenDate = moment($scope.k9.declarationHeaderK9.OpenDate);
                }
                if ($scope.k9.declarationHeaderK9 != null) {
                    var transactionTypeCodeObj = $filter('filter')($scope.lookUpData.K9ATransactionTypeList, { Value: $scope.k9.declarationHeaderK9.TransactionType })[0];
                    if (transactionTypeCodeObj != null)
                        $scope.k9.TransactionTypeCode = $filter('filter')($scope.lookUpData.K9ATransactionTypeList, { Value: $scope.k9.declarationHeaderK9.TransactionType })[0].Code;
                    $scope.showLoading = false;
                }
                $scope.CurrencyRateChanged();
            }, function (err) { });
        }

        $scope.CurrencyRateChanged = function () {

            var invoiceValue = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.InvoiceValue) || $scope.k9.declarationInvoiceK9.InvoiceValue == null ? 0 : $scope.k9.declarationInvoiceK9.InvoiceValue);
            var importRate = $filter('filter')($scope.lookUpData.currencyList, { Value: $scope.k9.declarationInvoiceK9.InvoiceCurrencyCode })[0].ImportRate;
            $scope.k9.declarationInvoiceK9.InvoiceLocalAmount = (invoiceValue * importRate).toFixed(2);

            //$scope.k9.declarationInvoiceK9.FreightAmountCurrencyCode = $scope.k9.declarationInvoiceK9.InvoiceCurrencyCode;
            //$scope.k9.declarationInvoiceK9.InsuranceAmountCurrencyCode = $scope.k9.declarationInvoiceK9.InvoiceCurrencyCode;

            $scope.k9.declarationInvoiceK9.CurrencyExRate = importRate.toFixed(4);
            //$scope.k9.declarationInvoiceK9.FreightAmountExRate = importRate.toFixed(4);
            //$scope.k9.declarationInvoiceK9.InsuranceAmountExRate = importRate.toFixed(4);
        };

        $scope.ChargesInfoCurrencyRateChanged = function (AmountPercent, IsPercent, CurrencyCode, AmountValue) {

            var invoiceValue = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.InvoiceValue) ? 0 : $scope.k9.declarationInvoiceK9.InvoiceValue);
            var importRate = $filter('filter')($scope.lookUpData.currencyList, { Value: CurrencyCode })[0].ImportRate;
            if (IsPercent) {
                var value = (invoiceValue / 100) * parseFloat(AmountPercent);
                $scope.k9.declarationInvoiceK9[AmountValue] = (value * importRate).toFixed(2);
            }
            else {
                $scope.k9.declarationInvoiceK9[AmountValue] = (parseFloat(AmountPercent) * importRate).toFixed(2);
            }
            if (AmountValue == 'PortAmountValue') {
                $scope.k9.declarationInvoiceK9.PortAmountExRate = importRate.toFixed(4);
            }
            if (AmountValue == 'FreightAmountValue') {
                $scope.k9.declarationInvoiceK9.FreightAmountExRate = importRate.toFixed(4);
            }
            if (AmountValue == 'InsuranceAmountValue') {
                $scope.k9.declarationInvoiceK9.InsuranceAmountExRate = importRate.toFixed(4);
            }
            if (AmountValue == 'OthersAmountValue') {
                $scope.k9.declarationInvoiceK9.OthersAmountExRate = importRate.toFixed(4);
            }

        };

        $scope.GetDeclaration = function (declarationNo) {
            if (!angular.isUndefined(declarationNo) && declarationNo != 'NEW' && declarationNo != "") {

                k9Service.GetDeclaration(declarationNo).then(function (d) {

                    $scope.k9 = d.data;
                    if (!$scope.k9.declarationHeaderK9.IsPartial)
                        $scope.IsDeclarationValidated = true;


                    if (!angular.isUndefined($scope.k9.declarationHeaderK9.DeclarantID) && $scope.k9.declarationHeaderK9.DeclarantID != "" && $scope.k9.declarationHeaderK9.DeclarantID != null) {
                        $scope.k9.declarationHeaderK9.DeclarantIDText = $scope.k9.declarationHeaderK9.DeclarantIDText;
                    }
                    $scope.GetDeclartionStatus(declarationNo);
                    $scope.validateDates();
                    $scope.GetCustomResponse(declarationNo);
                    $scope.ngTblDocs();
                    $scope.ngTblClause();
                    $scope.ngTblItemEntry();
                    $scope.ngTblContainerInfo();
                    $scope.validateInputDecimal();

                    // $scope.CurrencyRateChanged();
                    $scope.changeShipmentType($scope.k9.declarationHeaderK9.ShipmentType);

                }, function (err) { });
            }
        }
        /*clone  */

        $scope.IsCloneBtnDisabled = false;
        $scope.Clonek9 = function (declarationNo) {

            k9Service.CloneDeclaration(declarationNo).then(function (d) {
                $scope.k9 = d.data.declaration;
                if (!angular.isUndefined($scope.k9.declarationHeaderK9.DeclarantID) && $scope.k9.declarationHeaderK9.DeclarantID != "" && $scope.k9.declarationHeaderK9.DeclarantID != null) {
                    $scope.k9.declarationHeaderK9.DeclarantIDText = $scope.k9.declarationHeaderK9.DeclarantIDText;
                }

                $scope.k9.declarationHeaderK9.IsPartial = true;

                $scope.IsCloneBtnDisabled = true;
                $scope.k9.declarationHeaderK9.DeclarationNo = null;
                $scope.k9.declarationHeaderK9.OrderNo = null;
                $scope.IsDeclarationValidated = false;
                $scope.ediresponse = null;
                $scope.customResponseDetails = {};
                $scope.validateDates();
                $scope.ngTblDocs();
                $scope.ngTblClause();
                $scope.ngTblItemEntry();
                $scope.ngTblContainerInfo();
                $scope.showLoading = false;
                $scope.IsNew = true;
                $scope.customresponses = null;
                $scope.active = 0;
                $scope.validateInputDecimal();
                $scope.k9.declarationHeaderK9.OpenDate = moment();
                $scope.k9.declarationHeaderK9.ImportDate = moment();
            }, function (err) { });
        }


        $scope.PortOperatorResults = function (text) {
            var operatortype = 26220;
            return OrderEntryService.operatorList(operatortype, text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.TerminalOperaterSelected = function (item) {

            $scope.k9.declarationShipmentK9.PortOperator = item.Value;
        };

        $scope.PayCountryChanged = function (item, type) {
            $scope.k9.declarationInvoiceK9[type] = item.text;
        };

        $scope.GenericMerchantResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.GenericMerchantResults = function (text, filter, type) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                if (d.data.length == 0)
                    $scope.k9[type] = '';
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.ShipCallResults = function (text) {
            return VesselScheduleService.ShipCallNoSearch(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.VoyageNoInwardResults = function (text) {
            return VesselScheduleService.VoyageNoInWardSearch(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.ShipCallNoSelect = function (item) {
            $scope.k9.declarationShipmentK9.VoyageNo = item.VoyageNoInWard;
            $scope.k9.declarationShipmentK9.VesselID = item.VesselID;
            $scope.k9.declarationShipmentK9.VesselName = '';
            $scope.k9.declarationShipmentK9.ETADate = item.ETA;
        };

        $scope.VoyageNoInwardSelect = function (item) {
            $scope.k9.declarationShipmentK9.SCNNo = item.ShipCallNo;
            $scope.k9.declarationShipmentK9.VesselID = item.VesselID;
            $scope.k9.declarationShipmentK9.VesselName = '';
            $scope.k9.declarationShipmentK9.ETADate = item.ETA;
        };

        //$scope.LoadSMKCode = function (TransType) {
        //    
        //    var obj = $filter('filter')($scope.lookUpData.K9ATransactionTypeList, { Value: TransType })[0];
        //    $scope.K9.TransactionTypeDescription = obj.Text;
        //    $scope.K9.TransactionTypeCode = obj.Code;
        //};

        $scope.MerchantSelected = function (item, Type) {

            $scope.k9.declarationHeaderK9[Type] = item.Value
        };

        $scope.PortAutoComplete = function (text) {
            return PortAreaService.PortAutoComplete(text).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.PortSelected = function (item, type) {
            $scope.k9.declarationShipmentK9[type] = item.PortCode;
            // $scope.k9.declarationShipmentK9[type] = item.PortCode;
            if (type == 'PlaceOfImport') {
                $scope.k9.declarationShipmentK9.DischargePortName = $scope.k9.declarationShipmentK9.PlaceOfImportName;
                $scope.k9.declarationShipmentK9['DischargePort'] = item.PortCode;
            }
        };

        $scope.exRateChanged = function (currencyCode, field) {
            $scope.showLoading = true;
            CurrencyRateService.GetExRate($scope.k9.declarationInvoiceK9[currencyCode]).then(function (d) {
                $scope.k9.declarationInvoiceK9[field] = d.data;
                $scope.showLoading = false;
            }, function (err) {
            });
        };

        $scope.CustomDeclarantResults = function (declarantId) {
            return CustomDeclarantService.GetCustomDeclarantAutoComplete(declarantId).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) {
            });
        };

        $scope.CustomDeclarantSelected = function (obj) {

            $scope.k9.declarationHeaderK9.DeclarantName = obj.Name;
            $scope.k9.declarationHeaderK9.DeclarantDesignation = obj.Designation;
            $scope.k9.declarationHeaderK9.DeclarantNRIC = obj.NRIC;
            $scope.k9.declarationHeaderK9.DeclarantID = obj.ID;
        };
        $scope.WarehouseAutoComplete = function (text) {
            //
            //var CustomStationCode = $scope.k8.declarationHeaderK8.CustomStationCode;
            return k9Service.WarehouseAutoComplete(text).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) { });
        }

        $scope.WarehouseRocAutoComplete = function (text) {

            return k9Service.WarehouseRocAutoComplete(text).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) { });
        }

        $scope.WarehouseSelected = function (item) {

            $scope.k9.declarationHeaderK9.WarehouseLicenseNo = item.LicenseNo.split('-')[0];
            $scope.k9.declarationHeaderK9.WareHouseCode = item.WarehouseROCNo;
            $scope.k9.declarationHeaderK9.WarehouseFromName = item.WarehouseName.split('-')[0];
            $scope.k9.declarationHeaderK9.WarehouseAddress = item.WarehouseAddress;
            $scope.k9.declarationHeaderK9.WareHouseInfo = item.WareHouseID;
        }
        $scope.TransactionType = function (item, field) {

            $scope.k9[field] = item.Code;
        };

        $scope.sizeChanged = function () {
            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
                $scope.showLoading = false;
            }, function () {
            })
        };

        $scope.AddDeclarationContainer = function () {
            $scope.k9.declarationContainerK9.push($scope.dc);
            $scope.dc = {}

        };


        /*shipment details*/
        $scope.VesselNameResults = function (text) {
            return VesselMasterService.GetVesselByVesselName(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) {
            });
        };

        $scope.vesselNameClick = function (obj) {
            $scope.k9.declarationShipmentK9.VesselID = obj.Value;
        };

        $scope.MerchantSelected2 = function (item, Type) {
            $scope.k9.declarationShipmentK9[Type] = item.Value
        };

        $scope.editContainer = function (index) {
            $scope.showLoading = true;
            $scope.dc = $scope.k9.declarationContainerK9[index];
            $scope.sizeChanged();
            $timeout(function () {
                $scope.showLoading = false;
            }, 500);
        };

        $scope.deleteContainer = function (index) {
            $scope.k9.declarationContainerK9.splice(index, 1);
            if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
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

        $scope.AddDeclarationDocuments = function (doc) {
            if ($scope.isEditDoc) {
                $scope.k9.declarationDocumentsK9[documentIndex] = $scope.doc;
            } else {
                $scope.k9.declarationDocumentsK9.push($scope.doc);
            }
            $scope.doc = {};
            $scope.isEditDoc = false;
            documentIndex = -1;
        };

        var DocIndex = -1;
        $scope.editDocument = function (index) {
            DocIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k9/document.html?v=' + Utility.Version,
                controller: 'k9DocumentCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            Document: (DocIndex == -1 ? {} : $scope.k9.declarationDocumentsK9[index]),
                            docDateTypeList: $scope.lookUpData.docDateTypeList,
                            OGACodeList: $scope.lookUpData.OGACodeList,
                            customStationCodeList: $scope.lookUpData.smkList,
                            SupportingDocumentTypeList: $scope.lookUpData.SupportingDocumentTypeList,
                            declarationDocumentsK9: $scope.k9.declarationDocumentsK9,
                            countryList: $scope.lookUpData.countryList,
                            OGABranchlist: $scope.lookUpData.OGABranchlist
                        };
                    }
                }
            });

            modalInstance.result.then(function (res) {

                if (DocIndex != -1) {
                   
                    $scope.k9.declarationDocumentsK9[DocIndex] = res;
                }

                else {
                    if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
                            var obj = { ActivityCode: 1030 };
                            $scope.Activities.push(obj);
                    }
                    $scope.k9.declarationDocumentsK9.push(res);
                }

                DocIndex = -1;
                $scope.ngTblDocs();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };

        $scope.DocIndex = -1;
        $scope.ngTblDocs = function () {
            $scope.tableSortings = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.k9.declarationDocumentsK9.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.k9.declarationDocumentsK9, params.orderBy()) : $scope.k9.declarationDocumentsK9;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.DocIndex = (params.page() - 1) * params.count();
                }
            })
        };

        $scope.deleteDocument = function (index) {
            $scope.showLoading = true;
            $scope.k9.declarationDocumentsK9.splice(index, 1);
            if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
                    var obj = { ActivityCode: 1031 };
                    $scope.Activities.push(obj);
            }
            $timeout(function () {
                $scope.showLoading = false;
            }, 500);
            $scope.doc = {};
            $scope.ngTblDocs();
        };

        $scope.AddDeclarationClause = function () {
            if ($scope.isEditClause) {
                $scope.k9.declarationClauseK9[clauseIndex] = $scope.cl;
            } else {
                $scope.k9.declarationClauseK9.push($scope.cl);
            }

            $scope.cl = {};
            $scope.isEditClause = false;
            clauseIndex = -1;
        };

        $scope.deleteClause = function (index) {
            $scope.showLoading = true;
            $scope.k9.declarationClauseK9.splice(index, 1);
            $timeout(function () {
                $scope.showLoading = false;
            }, 500);
            $scope.cl = {
            };
        };

        var clauseIndex = -1;
        $scope.editClause = function (index) {
            clauseIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k9/clause.html?v=' + Utility.Version,
                controller: 'k9ClauseCntrl',
                size: 'md',
                resolve: {
                    dataObj: function () {
                        return {
                            Clause: (clauseIndex == -1 ? {} : $scope.k9.declarationClauseK9[index]),
                            clauseTypeList: $scope.lookUpData.clauseTypeList
                        };
                    }
                }
            });

            modalInstance.result.then(function (res) {
                if (clauseIndex != -1)
                    $scope.k9.declarationClauseK9[clauseIndex] = res;
                else
                    $scope.k9.declarationClauseK9.push(res);

                clauseIndex = -1;
                $scope.ngTblClause();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };

        $scope.clauseIndex = -1;
        $scope.ngTblClause = function () {
            $scope.tableSortingss = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.k9.declarationClauseK9.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.k9.declarationClauseK9, params.orderBy()) : $scope.k9.declarationClauseK9;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.clauseIndex = (params.page() - 1) * params.count();
                }
            })
        };

        var itemEntryIndex = -1;
        $scope.editItem = function (index) {

            var _CIFC = 0.00;
            var _FOB = 0.00;
            var _EXW = 0.00;
            var _CIF = 0.00;
            var _CNF = 0.00;
            var _CNI = 0.00;
            var _Freight = 0.00;
            var _insurance = 0.00;

            if ($scope.k9.declarationInvoiceK9 != null) {
                if ($scope.k9.declarationInvoiceK9.FreightAmountPercent)
                    _Freight = $scope.k9.declarationInvoiceK9.FreightAmountPercent;

                if ($scope.k9.declarationInvoiceK9.InsuranceAmountPercent)
                    _insurance = $scope.k9.declarationInvoiceK9.InsuranceAmountPercent;

            }

            var _InvoiceCurrency = $scope.k9.declarationInvoiceK9.InvoiceCurrencyCode;
            var _invoiceCurrencyRate = $filter('filter')($scope.lookUpData.currencyList, { Text: $scope.k9.declarationInvoiceK9.InvoiceCurrencyCode })[0].ImportRate;

            var _isFreightCurrency = (angular.isUndefined($scope.k9.declarationInvoiceK9.IsFreightCurrency) ? false : $scope.k9.declarationInvoiceK9.IsFreightCurrency);
            var _isInsuranceCurrency = (angular.isUndefined($scope.k9.declarationInvoiceK9.IsInsuranceCurrency) ? false : $scope.k9.declarationInvoiceK9.IsInsuranceCurrency);
            var _incoTerm = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.IncoTerm) ? 0 : $scope.k9.declarationInvoiceK9.IncoTerm);
            var _port = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.PortAmountPercent) ? 0 : $scope.k9.declarationInvoiceK9.PortAmountPercent);
            var _otherCharges = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.OthersAmountPercent) ? 0 : $scope.k9.declarationInvoiceK9.OthersAmountPercent)
            itemEntryIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k9/item-entry.html?v=' + Utility.Version,
                controller: 'k9ItemEntryCntrl',
                windowClass: 'app-modal-window4',
                resolve: {
                    dataObj: function () {
                        return {
                            itemEntry: (itemEntryIndex == -1 ? {} : $scope.k9.declarationItemK9[index]),
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
                            itemEntryIndex: itemEntryIndex,
                            declarationItemK9Count: ($scope.k9.declarationItemK9 == null ? 0 : $scope.k9.declarationItemK9.length)
                        }
                    }
                }
            });

            modalInstance.result.then(function (res) {

                if (itemEntryIndex != -1) {
                    if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
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
                    $scope.k9.declarationItemK9[itemEntryIndex] = res;
                }

                else {
                    $scope.k9.declarationItemK9.push(res);
                    if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
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
                }

                if (res.declarationSubItemK9 != undefined) {
                    $scope.k9.declarationSubItemK9 = $.map(res.declarationSubItemK9, function (el) {
                        return el
                    });


                    //angular.forEach($scope.k9.declarationSubItems, function (item, val) {
                    //    $scope.k9.declarationSubItemK9.push($scope.k9.declarationSubItems[val]);
                    //});


                    // if (itemEntryIndex != -1) {
                    //angular.forEach($scope.k9.declarationSubItemK9, function (item, val) {
                    //    
                    //    $scope.k9.declarationSubItemK9[val].ItemNo = index + 1;
                    //});
                    //}
                    //else
                    //    angular.forEach($scope.k9.declarationSubItemK9, function (item, val) {
                    //        
                    //        if ($scope.k9.declarationItemK9.ItemNo == null || $scope.k9.declarationItemK9.ItemNo != undefined)
                    //            $scope.k9.declarationSubItemK9[val].ItemNo = 1;
                    //        else
                    //            $scope.k9.declarationSubItemK9[val].ItemNo = $scope.k9.declarationItemK9[val].ItemNo + 1;
                    //    });
                }

                //if (itemEntryIndex != -1)
                //    $scope.k9.declarationSubItemK9[itemEntryIndex].ItemNo = itemEntryIndex + 1;

                itemEntryIndex = -1;
                $scope.ngTblItemEntry();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };

        $scope.itemEntryIndex = -1;
        $scope.ngTblItemEntry = function () {
            $scope.tableSorting = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.k9.declarationItemK9.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.k9.declarationItemK9, params.orderBy()) : $scope.k9.declarationItemK9;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.itemEntryIndex = (params.page() - 1) * params.count();
                }
            })
        };
        $scope.deleteItem = function (index) {

            angular.forEach($scope.k9.declarationSubItemK9, function (item, val) {

                $scope.k9.declarationSubItemK9[val].ItemNo = $scope.k9.declarationSubItemK9[val].ItemNo - 1;
            });
            $scope.k9.declarationItemK9.splice(index, 1);

            if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
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
            $scope.ngTblItemEntry();
        };

        $scope.CopyItemEntry = function (obj) {
            var copyItemEntry = angular.copy(obj);
            if ($scope.k9.declarationItemK9 != null) {
                $scope.k9.declarationItemK9.push(copyItemEntry);
            }
            if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
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
            $scope.ngTblItemEntry();
        }

        $scope.GenerateFile = function (k9, declarationNo) {
            if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.CheckSubItems(k9) && $scope.CheckContainerNos(k9)) {

                $scope.btncustom = true;
                k9Service.Savek9Declaration(k9).then(function (res) {
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

                    k9Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/
                    k9Service.GenerateFile(declarationNo).then(function (d) {

                        $scope.btncustom = false;
                        $scope.customresponses = d.data.customResponse;
                        $scope.ediresponse = d.data.ediResponse;
                        $scope.ammendantsResponse = d.data.ammendantsResponse;
                        $scope.dutyAmountlist = d.data.dutyAmountlist;
                        growlService.growl('Submitted to Customs successfully..!', 'success');

                        $timeout(function () {
                            $scope.active = 8;
                        }, 500);
                    }, function (err) { });
                }, function (err) { });

            }
        };

        $scope.GetCustomResponse = function (declarationNo) {
            k9Service.GetCustomResponse(declarationNo).then(function (d) {
                $scope.customresponses = d.data.customResponse;
                $scope.ediresponse = d.data.ediResponse;
                $scope.ammendantsResponse = d.data.ammendantsResponse;
                $scope.customresponseheaderItem = d.data.customresponseheaderItem;
                $scope.dutyAmountlist = d.data.dutyAmountlist;
            }, function (err) { });
        };

        $scope.DisplayResponseData = function (obj) {
            k9Service.GetCustomResponseInfo(obj).then(function (d) {
                $scope.customresponseheaderItem = d.data;
               // $scope.customresponseheaderItem.RegistrationDate = d.data.customresponseheaderItem.RegistrationDate;
            }, function (err) { });
        };

        $scope.back = function () {
            $state.go('k9Inquiry', {
            });
        };


        $scope.isFrmk9Valid = false;
        $scope.$watch('frmk9.$valid', function (isValid) {
            $scope.isFrmk9Valid = isValid;
        });

        $scope.ValidatePorts = function () {
            if ($scope.k9.declarationHeaderK9.TransportMode == 1021) {
                if ($scope.k9.declarationShipmentK9 != undefined) {
                    if (($scope.k9.declarationShipmentK9.LoadingPort != undefined && $scope.k9.declarationShipmentK9.LoadingPort != '' && $scope.k9.declarationShipmentK9.DischargePort != undefined && $scope.k9.declarationShipmentK9.DischargePort != '') && $scope.k9.declarationShipmentK9.LoadingPort == $scope.k9.declarationShipmentK9.DischargePort) {
                        growlService.growl('Loading Port and Discharge Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k9.declarationShipmentK9.LoadingPort != undefined && $scope.k9.declarationShipmentK9.LoadingPort != '' && $scope.k9.declarationShipmentK9.TranshipmentPort != undefined && $scope.k9.declarationShipmentK9.TranshipmentPort != '') && $scope.k9.declarationShipmentK9.LoadingPort == $scope.k9.declarationShipmentK9.TranshipmentPort) {
                        growlService.growl('Loading Port and Transhipment Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k9.declarationShipmentK9.TranshipmentPort != undefined && $scope.k9.declarationShipmentK9.TranshipmentPort != '' && $scope.k9.declarationShipmentK9.DischargePort != undefined && $scope.k9.declarationShipmentK9.DischargePort != '') && $scope.k9.declarationShipmentK9.DischargePort == $scope.k9.declarationShipmentK9.TranshipmentPort) {
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
        $scope.ValidateContainer = function () {

            if (!$scope.isConventionalCargo) {
                if ($scope.k9.declarationContainerK9.length == 0) {
                    growlService.growl('Atleast one container is required', 'danger');
                    return false;
                }
                else
                    return true;
            }
            else
                return true;
        };

        $scope.ValidateItemEntry = function () {
            if ($scope.k9.declarationItemK9.length == 0) {
                growlService.growl('Atleast one item entry is required', 'danger');
                return false;
            }
            else
                return true;
        };

        $scope.ValidatePartialSave = function () {

            if ($scope.k9.declarationHeaderK9.ImportDate == undefined || $scope.k9.declarationHeaderK9.ImportDate == '') {
                growlService.growl('please select Declaration Date', 'danger');
                return false;
            }
            else if ($scope.k9.declarationHeaderK9.TransportMode == undefined || $scope.k9.declarationHeaderK9.TransportMode == '') {
                growlService.growl('please select Transport Mode', 'danger');
                return false;
            }
            else if ($scope.k9.declarationHeaderK9.ShipmentType == undefined || $scope.k9.declarationHeaderK9.ShipmentType == '') {
                growlService.growl('please select Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k9.declarationHeaderK9.CustomerReferenceNo == undefined || $scope.k9.declarationHeaderK9.CustomerReferenceNo == '') {
                growlService.growl('please enter Reference No/Job No', 'danger');
                return false;
            }
            else if ($scope.k9.declarationHeaderK9.DeclarationShipmentType == undefined || $scope.k9.declarationHeaderK9.DeclarationShipmentType == '') {
                growlService.growl('please select Declaration Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k9.declarationHeaderK9.TransactionType == undefined || $scope.k9.declarationHeaderK9.TransactionType == '') {
                growlService.growl('please select SMK Transaction Type', 'danger');
                return false;
            }
            else
                return true;
        };

        $scope.CheckSubItems = function (obj) {
            $scope.retVal = false;
            $scope.docVal = false;
            angular.forEach(obj.declarationItemK9, function (item, value) {
                angular.forEach(item.declarationSubItemK9, function (subItem, subValue) {
                    if (subItem.ItemType == 'TE' || subItem.ItemType == 'PM') {
                        $scope.retVal = true;
                    }
                });
            });
            angular.forEach(obj.declarationDocumentsK9, function (item, value) {
                if (item.SupportingDocumentType == 25813) {
                    $scope.docVal = true;
                }
            });
            if ($scope.retVal && !$scope.docVal) {
                growlService.growl('911 - IMPORT LICENCE document is required', 'danger');
                return false;
            }
            return true;
        }

        $scope.CheckContainerNos = function (obj) {
            $scope.retVal = false;

            angular.forEach(obj.declarationContainerK9, function (item, value) {
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

        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }


        $scope.Savek9Declaration = function (k9) {

            if ($scope.isFrmk9Valid) {
                $scope.changeShipmentType($scope.k9.declarationHeaderK9.ShipmentType);
                if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.CheckSubItems(k9) && $scope.CheckContainerNos(k9)) {

                    $scope.showLoading = true;

                    //if ($scope.isConventionalCargo) {
                    //    $scope.k9.declarationContainerK9 = null;
                    //}
                    $scope.k9.declarationHeaderK9.IsPartial = false;


                    $scope.k9.declarationHeaderK9.IsPartial = $scope.k9.declarationHeaderK9.IsPartial == false ? $scope.k9.declarationHeaderK9.IsPartial : true;
                    if (($scope.k9.declarationHeaderK9.DeclarationNo == null ||
                               $scope.k9.declarationHeaderK9.DeclarationNo == undefined ||
                                        $scope.k9.declarationHeaderK9.DeclarationNo == "") &&
                                                !$scope.k9.declarationHeaderK9.IsPartial) {

                        var obj = { ActivityCode: 1021 };
                        $scope.Activities.push(obj);
                        var obj = { ActivityCode: 1022 };
                        $scope.Activities.push(obj);
                    }
                    else {
                       
                            var obj = { ActivityCode: 1022 };
                            $scope.Activities.push(obj);
                        
                    }
                    debugger;
                    k9Service.Savek9Declaration(k9).then(function (d) {
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

                        k9Service.SaveActivityStatus(arr).then(function (test) {
                            debugger;
                            arr = new Array();
                            $scope.Activities = new Array();
                        });
                        /*Activity Save*/
                        if (d.data != "The ContainerNo field is required.") {
                            $scope.showLoading = false;
                            growlService.growl('Declaration Saved Successfully..', 'success');
                            $scope.k9.declarationHeaderK9.DeclarationNo = d.data.declarationNo;
                            $scope.k9.declarationHeaderK9.OrderNo = d.data.orderNo;
                            //k9Service.GetDeclaration(d.data.declarationNo);
                            $scope.IsDeclarationValidated = true;

                        }
                        else {
                            growlService.growl('The ContainerNo field is required..', 'danger');
                        }
                    }, function (err) {


                    });
                }
            } else {
                var error = $scope.frmk9.$error;
                angular.forEach(error.required, function (field) {
                    if (field.$invalid) {
                        var fieldName = field.$name;
                    }
                });
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        }
        $scope.Savek9DeclarationPartial = function (k9) {
            $scope.changeShipmentType($scope.k9.declarationHeaderK9.ShipmentType);
            if ($scope.ValidatePartialSave() && $scope.ValidatePorts() && $scope.CheckSubItems(k9) && $scope.CheckContainerNos(k9)) {

                $scope.showLoading = true;

                //if ($scope.isConventionalCargo) {
                //    $scope.k9.declarationContainerK9 = null;
                //}
                $scope.k9.declarationHeaderK9.IsPartial = $scope.k9.declarationHeaderK9.IsPartial == false ? $scope.k9.declarationHeaderK9.IsPartial : true;
                if (($scope.k9.declarationHeaderK9.DeclarationNo == null || $scope.k9.declarationHeaderK9.DeclarationNo == undefined || $scope.k9.declarationHeaderK9.DeclarationNo == "") && $scope.k9.declarationHeaderK9.IsPartial) {
                    var obj = { ActivityCode: 1021 };
                    $scope.Activities.push(obj);
                }
                k9Service.Savek9Declaration(k9).then(function (d) {
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

                    k9Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/
                    if (d.data != "The ContainerNo field is required.") {
                        $scope.showLoading = false;
                        growlService.growl('Declaration ' + d.data.declarationNo + ' Saved Partially..', 'success');
                        $scope.k9.declarationHeaderK9.DeclarationNo = d.data.declarationNo;
                        $scope.k9.declarationHeaderK9.OrderNo = d.data.orderNo;
                        //k9Service.GetDeclaration($scope.k9.declarationHeaderK9.DeclarationNo);
                    }
                    else {
                        growlService.growl('The ContainerNo field is required...', 'danger');
                    }

                }, function (err) { });
            }
        };


        $scope.CustomerSelected = function (item, type, addresstype) {

            $scope.showLoading = true;
            var html = '';
            $scope.k9.declarationHeaderK9[type] = item.Value;
            $scope.k9.declarationHeaderK9[addresstype] = '';

            $scope.BindAddress(item.Value, addresstype);
        };

        $scope.ClaimantNameSelected = function (item) {

            $scope.k9.declarationExcemptionK9.ClaimantID = item.ID;
            $scope.k9.declarationExcemptionK9.ClaimantName = item.Name;
            $scope.k9.declarationExcemptionK9.ClaimantCompany = item.CompanyName;
            $scope.k9.declarationExcemptionK9.ClaimantNRIC = item.NRIC;
            $scope.k9.declarationExcemptionK9.ClaimantDesignation = item.Designation;
            $scope.k9.declarationExcemptionK9.ClaimantStatus = item.Status;
        }


        $scope.ClaimantNameResults = function (text) {
            return k9Service.ClaimantNameResults(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) {
            })
        }

        $scope.ValidateClaimantDetails = function () {

            if ($scope.k9.declarationExcemptionK9.ClaimantName == null || angular.isUndefined($scope.k9.declarationExcemptionK9.ClaimantName)) {

                $scope.k9.declarationExcemptionK9.ClaimantID = null;
                $scope.k9.declarationExcemptionK9.ClaimantCompany = null;
                $scope.k9.declarationExcemptionK9.ClaimantNRIC = null;
                $scope.k9.declarationExcemptionK9.ClaimantDesignation = null;
                $scope.k9.declarationExcemptionK9.ClaimantStatus = null;
            }
        }

        $scope.BindAddress = function (agentCode, addresstype) {
            var html = '';
            AddressService.GetAddress(agentCode).then(function (d) {
                if (d.data != null) {
                    if (!angular.isUndefined(d.data.Address1))
                        html += d.data.Address1 + '<br/>';
                    if (!angular.isUndefined(d.data.Address2))
                        html += d.data.Address2 + '<br/>';
                    if (!angular.isUndefined(d.data.Address3))
                        html += d.data.Address3 + '<br/>';
                    if (!angular.isUndefined(d.data.City))
                        html += d.data.City + '<br/>';
                    if (!angular.isUndefined(d.data.State))
                        html += d.data.State + '<br/>';
                    if (!angular.isUndefined(d.data.CountryCode))
                        html += d.data.CountryCode + '<br/>';
                    if (!angular.isUndefined(d.data.ZipCode))
                        html += d.data.ZipCode;
                }
                $scope.k9.declarationHeaderK9[addresstype] = html;
                $scope.showLoading = false;
            }, function (err) {
            });
        };

        var conInfoIndex = -1;
        $scope.editConInfo = function (index) {
            conInfoIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k9/container-info.html?v=' + Utility.Version,
                controller: 'AddEditContainerInfoCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            dc: (conInfoIndex == -1 ? {} : $scope.k9.declarationContainerK9[conInfoIndex]),
                            sizeList: $scope.lookUpData.sizeList,
                            jobTypeList: $scope.lookUpData.jobTypeList,
                            containerStatusList: $scope.lookUpData.containerStatusList
                        };
                    }
                }
            });

            modalInstance.result.then(function (res) {
                if (angular.isUndefined(res.Size))
                    res.Size = null;
                if (angular.isUndefined(res.EQDStatus))
                    res.EQDStatus = null;

                if (conInfoIndex != -1) {
                    if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
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
                    $scope.k9.declarationContainerK9[conInfoIndex] = res;
                }

                else {
                    if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
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
                    $scope.k9.declarationContainerK9.push(res);
                }


                conInfoIndex = -1;
                $scope.ngTblContainerInfo();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };

        $scope.K9ContainerIndex = -1;
        $scope.ngTblContainerInfo = function () {
            $scope.tblK9Container = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.k9.declarationContainerK9.length,
                getData: function ($defer, params) {
                    var conData = params.sorting() ? $filter('orderBy')($scope.k9.declarationContainerK9, params.orderBy()) : $scope.k9.declarationContainerK9;
                    $defer.resolve(conData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.K9ContainerIndex = (params.page() - 1) * params.count();
                }
            });
        }

        $scope.changeExemptionType = function () {

            if ($scope.k9.declarationExcemptionK9.TreasuryExcemptionType != 10307 || $scope.k9.declarationExcemptionK9.TreasuryExcemptionType != 10308 || $scope.k9.declarationExcemptionK9.TreasuryExcemptionType != 10309) {
                $scope.k9.declarationExcemptionK9.ExcemptionDate = null
            }
            if ($scope.k9.declarationExcemptionK9.TreasuryExcemptionType != 10301 || $scope.k9.declarationExcemptionK9.TreasuryExcemptionType != 10302 || $scope.k9.declarationExcemptionK9.TreasuryExcemptionType != 10303 || $scope.k9.declarationExcemptionK9.TreasuryExcemptionType != 10304) {
                $scope.k9.declarationExcemptionK9.Country = null
            }
        }
        $scope.IncoTermChanged = function () {
            //$scope.k9.declarationInvoiceK9.FreightAmountValue = $scope.k9.declarationInvoiceK9.InsuranceAmountValue = $scope.k9.declarationInvoiceK9.IncoTerm;
            var isFreightCurrency = (angular.isUndefined($scope.k9.declarationInvoiceK9.IsFreightCurrency) ? false : $scope.k9.declarationInvoiceK9.IsFreightCurrency);
            var isInsuranceCurrency = (angular.isUndefined($scope.k9.declarationInvoiceK9.IsInsuranceCurrency) ? false : $scope.k9.declarationInvoiceK9.IsInsuranceCurrency);
            $scope.IncoTermCalculation(isFreightCurrency, isInsuranceCurrency);
        };

        //$scope.IsFreightCurrencyChecked = function (flag) {
        //    $scope.IncoTermCalculation(!flag, $scope.k9.declarationInvoiceK9.IsInsuranceCurrency);
        //};

        //$scope.IsInsuranceCurrencyChecked = function (flag) {
        //    $scope.IncoTermCalculation($scope.k9.declarationInvoiceK9.IsFreightCurrency, !flag);
        //};

        $scope.IncoTermCalculation = function (IsFreightCurrency, IsInsuranceCurrency) {

            var incoTerm = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.IncoTerm) ? 0 : $scope.k9.declarationInvoiceK9.IncoTerm);
            var freight = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.FreightAmountPercent) ? 0 : $scope.k9.declarationInvoiceK9.FreightAmountPercent);
            var insurance = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.InsuranceAmountPercent) ? 0 : $scope.k9.declarationInvoiceK9.InsuranceAmountPercent);
            var port = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.PortAmountPercent) ? 0 : $scope.k9.declarationInvoiceK9.PortAmountPercent);
            var otherCharges = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.OthersAmountPercent) ? 0 : $scope.k9.declarationInvoiceK9.OthersAmountPercent);
            var invoiceValue = parseFloat(angular.isUndefined($scope.k9.declarationInvoiceK9.InvoiceLocalAmount) ? 0 : $scope.k9.declarationInvoiceK9.InvoiceLocalAmount);

            $scope.CurrencyRateChanged();
            if (incoTerm == 0)
                return;

            var obj = {
                incoTerm: incoTerm,
                freight: freight,
                insurance: insurance,
                port: port,
                otherCharges: otherCharges,
                invoiceValue: invoiceValue,
                FOB: $scope.k9.declarationInvoiceK9.FOBAmount,
                CIF: $scope.k9.declarationInvoiceK9.CIFAmount,
                EXW: $scope.k9.declarationInvoiceK9.EXWAmount,
                CNF: $scope.k9.declarationInvoiceK9.CNFAmount,
                CNI: $scope.k9.declarationInvoiceK9.CNIAmount,
                IsFreightCurrency: IsFreightCurrency,
                IsInsuranceCurrency: IsInsuranceCurrency
            };

            $scope.showLoading = true;
            k9Service.OutPutFOBCIF(obj).then(function (d) {
                $scope.k9.declarationInvoiceK9.FOBAmount = d.data.FOB.toFixed(2);
                $scope.k9.declarationInvoiceK9.CIFAmount = d.data.CIF.toFixed(2);
                $scope.k9.declarationInvoiceK9.EXWAmount = d.data.EXW.toFixed(2);
                $scope.k9.declarationInvoiceK9.CNFAmount = d.data.CNF.toFixed(2);
                $scope.k9.declarationInvoiceK9.CNIAmount = d.data.CNI.toFixed(2);
                $scope.k9.declarationInvoiceK9.FreightAmount = d.data.freight.toFixed(2);
                $scope.k9.declarationInvoiceK9.InsuranceAmount = d.data.insurance.toFixed(2);
                $scope.k9.declarationInvoiceK9.CIFCAmount = d.data.CIFC.toFixed(2);
                $scope.showLoading = false;
            }, function (err) {

            });
        };
        $scope.Calculatepercentageamount = function () {
            if ($scope.k9.declarationInvoiceK9.IsFreightCurrency == true) {

                var Freight = parseFloat($scope.k9.declarationInvoiceK9.FreightAmountPercent);
                if (Freight > 100) {

                    growlService.growl('Freight Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k9.declarationInvoiceK9.FreightAmountPercent = '';
                    $scope.k9.declarationInvoiceK9.FreightAmountValue = 0;
                }

            }

            if ($scope.k9.declarationInvoiceK9.IsInsuranceCurrency == true) {
                var Insurance = parseFloat($scope.k9.declarationInvoiceK9.InsuranceAmountPercent);
                if (Insurance > 100) {

                    growlService.growl('Insurance Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k9.declarationInvoiceK9.InsuranceAmountPercent = '';
                    $scope.k9.declarationInvoiceK9.InsuranceAmountValue = 0;
                }
            }

        }

        $scope.CopyContainer = function (obj) {
            var copyCon = angular.copy(obj);
            if ($scope.k9.declarationContainerK9 != null) {
                copyCon.ContainerNo = '';
                $scope.k9.declarationContainerK9.push(copyCon);
            }
            if ($scope.k9.declarationHeaderK9.DeclarationNo != null && $scope.k9.declarationHeaderK9.DeclarationNo != undefined && $scope.k9.declarationHeaderK9.DeclarationNo != "") {
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
        $scope.validateDates = function () {
            if (!angular.isUndefined($scope.k9.declarationHeaderK9) && $scope.k9.declarationHeaderK9 != null) {
                if ($scope.k9.declarationHeaderK9.OpenDate == null) {
                    $scope.k9.declarationHeaderK9.OpenDate = undefined;
                }
                else
                    $scope.k9.declarationHeaderK9.OpenDate = moment($scope.k9.declarationHeaderK9.OpenDate);
            }
            if (!angular.isUndefined($scope.k9.declarationHeaderK9) && $scope.k9.declarationHeaderK9 != null) {
                if ($scope.k9.declarationHeaderK9.ImportDate == null) {
                    $scope.k9.declarationHeaderK9.ImportDate = undefined;
                }
                else
                    $scope.k9.declarationHeaderK9.ImportDate = moment($scope.k9.declarationHeaderK9.ImportDate);
            }
            if (!angular.isUndefined($scope.k9.declarationShipmentK9) && $scope.k9.declarationShipmentK9 != null) {


                if ($scope.k9.declarationShipmentK9.ETADate == null) {
                    $scope.k9.declarationShipmentK9.ETADate = undefined;
                }
                else
                    $scope.k9.declarationShipmentK9.ETADate = moment($scope.k9.declarationShipmentK9.ETADate);
            }

            if (!angular.isUndefined($scope.k9.declarationHeaderK9) && $scope.k9.declarationHeaderK9 != null) {


                if ($scope.k9.declarationHeaderK9.WareHouseDepositDate == null) {
                    $scope.k9.declarationHeaderK9.WareHouseDepositDate = undefined;
                }
                else
                    $scope.k9.declarationHeaderK9.WareHouseDepositDate = moment($scope.k9.declarationHeaderK9.WareHouseDepositDate);
            }

            if (!angular.isUndefined($scope.k9.declarationInvoiceK9) && $scope.k9.declarationInvoiceK9 != null) {


                if ($scope.k9.declarationInvoiceK9.InvoiceDate == null) {
                    $scope.k9.declarationInvoiceK9.InvoiceDate = undefined;
                }
                else
                    $scope.k9.declarationInvoiceK9.InvoiceDate = moment($scope.k9.declarationInvoiceK9.InvoiceDate);
            }
            if (!angular.isUndefined($scope.k9.declarationExcemptionK9) && $scope.k9.declarationExcemptionK9 != null) {
                if ($scope.k9.declarationExcemptionK9.SalesTaxRegistrationDate == null) {
                    $scope.k9.declarationExcemptionK9.SalesTaxRegistrationDate = undefined;
                }
                else
                    $scope.k9.declarationExcemptionK9.SalesTaxRegistrationDate = moment($scope.k9.declarationExcemptionK9.SalesTaxRegistrationDate);
            }
            if ($scope.k9.declarationExcemptionK9.ExcemptionDate == null) {
                $scope.k9.declarationExcemptionK9.ExcemptionDate = undefined;
            }
            else
                $scope.k9.declarationExcemptionK9.ExcemptionDate = moment($scope.k9.declarationExcemptionK9.ExcemptionDate);
        }

        $scope.validateClause = function () {

            if ($scope.k9.declarationClauseK9.ClauseCode == '') {
                $scope.k9.declarationClauseK9.ClauseText = '';
            }

        }
        //$scope.validateInputDecimal = function () {
        //    document.getElementById('GrossWeight').focus();
        //    document.getElementById('InvoiceValuek9').focus();
        //    document.getElementById('GrossVolume').focus();
        //    document.getElementById('AmountReceived').focus();
        //$location.hash('iFrameMain');
        //$anchorScroll();

        $scope.DeclineDeclaration = function (declarationno, orderno) {

            k9Service.DeclineDeclaration(declarationno, orderno).then(function (d) {

                growlService.growl('', 'success');
            });
        }


        $scope.GetDeclartionStatus = function (declarationNo) {

            k9Service.GetDeclartionStatus(declarationNo).then(function (d) {

                $scope.declarationOrderStatus = d.data;
            }, function (err) { });
        };

        $scope.ContainerFileUpload = function (e) {
            if (angular.isUndefined($scope.k9.declarationContainerK9))
                $scope.k9.declarationContainerK9 = new Array();

            var file = document.getElementById('containerFile').files[0];

            UtilityFunc.GetExcelData(file, '1TradeK1Container').then(function (d) {
                angular.forEach(d, function (item, index) {

                    var Status = $filter('filter')($scope.lookUpData.containerStatusList, { Text: item.Status })[0].Value;
                    var Type = $filter('filter')($scope.lookUpData.jobTypeList, { Text: item.ContainerType })[0].Value;
                    var SOC = !angular.isUndefined(item.SOCType) ? item.SOCType.toUpperCase() == 'YES' ? true : false : false;
                    var obj = {
                        ContainerNo: item.ContainerNo,
                        Size: item.Size,
                        Type: item.Type,
                        IsSOC: SOC,
                        ContainerStatus: Status,
                        EQDStatus: Type
                    };

                    $scope.k9.declarationContainerK9.push(obj);
                });

                $timeout(function () {
                    $scope.ngTblContainerInfo();
                }, 500);
            }, function (err) { });
        }

        $scope.CargoFileUpload = function (e) {
            if (angular.isUndefined($scope.k9.declarationItemK9))
                $scope.k9.declarationItemK9 = new Array();

            var file = document.getElementById('cargoFile').files[0];

            UtilityFunc.GetExcelData(file, '1TradeK1Cargo').then(function (d) {

                angular.forEach(d, function (item, index) {
                    //var countryListCode = $filter('filter')($scope.lookUpData.countryList, { Value: item.CountryofFinalDestination })[0].Text;

                    var obj = {
                        ProductCode: item.Product,
                        OriginCountryCode: item.CountryOfOrigin,
                        HSCode: item.HSCode,
                        StatisticalQty: item.StatisticalQty,
                        DeclaredQty: item.DeclaredQty,
                        DeclaredUOM: item.DeclaredUOM,
                        ItemAmount: item.ItemAmount,
                        ItemDescription1: item.ItemDescription,
                        ItemDescription2: item.ExtraItemDescription,
                        ImportDutyExemptionRatePercent: item.DutyRateExemption,
                        ImportDutySpecificExemptionRatePercent: item.SpecificRateExemption,
                        ImportGSTExemptionPercent: item.GSTRateExemotion,
                        ImportExciseRate: item.ExerciseDutyRateExemption
                    };
                    $scope.k9.declarationItemK9.push(obj);
                });

                $timeout(function () {
                    $scope.ngTblItemEntry();
                }, 500);
            }, function (err) { });
        }



        $scope.init();
    }]);
