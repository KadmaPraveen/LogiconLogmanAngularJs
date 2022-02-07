angular.module('LogiCon').controller('k3Cntrl', ['$scope', 'k3Service', 'MerchantProfileService', 'VesselScheduleService', 'PortAreaService', 'CurrencyRateService', 'OrderEntryService', 'VesselMasterService', 'Utility', '$uibModal', 'limitToFilter', 'growlService', '$stateParams', '$timeout', '$location', 'AddressService', 'UtilityFunc', '$filter', '$anchorScroll', 'DeclarantService', 'CustomDeclarantService', '$state', 'NgTableParams',
    function ($scope, k3Service, MerchantProfileService, VesselScheduleService, PortAreaService, CurrencyRateService, OrderEntryService, VesselMasterService, Utility, $uibModal, limitToFilter, growlService, $stateParams, $timeout, $location, AddressService, UtilityFunc, $filter, $anchorScroll, DeclarantService, CustomDeclarantService, $state, NgTableParams) {

        $scope.validateInputDecimal = function () {
            $timeout(function () {
                if ($scope.frmk3.GrossWeight.$viewValue != null) {
                    $scope.frmk3.GrossWeight.$$runValidators($scope.frmk3.GrossWeight.$modalValue, $scope.frmk3.GrossWeight.$viewValue, function () {
                        $scope.frmk3.GrossWeight.$setViewValue($scope.frmk3.GrossWeight.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk3.GrossVolume.$viewValue != null) {
                    $scope.frmk3.GrossVolume.$$runValidators($scope.frmk3.GrossVolume.$modalValue, $scope.frmk3.GrossVolume.$viewValue, function () {
                        $scope.frmk3.GrossVolume.$setViewValue($scope.frmk3.GrossVolume.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk3.InvoiceValuek3.$viewValue != null) {
                    $scope.frmk3.InvoiceValuek3.$$runValidators($scope.frmk3.InvoiceValuek3.$modalValue, $scope.frmk3.InvoiceValuek3.$viewValue, function () {
                        $scope.frmk3.InvoiceValuek3.$setViewValue($scope.frmk3.InvoiceValuek3.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk3.HeaderK3Amount.$viewValue != null) {
                    $scope.frmk3.HeaderK3Amount.$$runValidators($scope.frmk3.HeaderK3Amount.$modalValue, $scope.frmk3.HeaderK3Amount.$viewValue, function () {
                        $scope.frmk3.HeaderK3Amount.$setViewValue($scope.frmk3.HeaderK3Amount.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk3.PortAmountPercent.$viewValue != null) {
                    $scope.frmk3.PortAmountPercent.$$runValidators($scope.frmk3.PortAmountPercent.$modalValue, $scope.frmk3.PortAmountPercent.$viewValue, function () {
                        $scope.frmk3.PortAmountPercent.$setViewValue($scope.frmk3.PortAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk3.FreightAmountPercent.$viewValue != null) {
                    $scope.frmk3.FreightAmountPercent.$$runValidators($scope.frmk3.FreightAmountPercent.$modalValue, $scope.frmk3.FreightAmountPercent.$viewValue, function () {
                        $scope.frmk3.FreightAmountPercent.$setViewValue($scope.frmk3.FreightAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk3.InsuranceAmountPercent.$viewValue != null) {
                    $scope.frmk3.InsuranceAmountPercent.$$runValidators($scope.frmk3.InsuranceAmountPercent.$modalValue, $scope.frmk3.InsuranceAmountPercent.$viewValue, function () {
                        $scope.frmk3.InsuranceAmountPercent.$setViewValue($scope.frmk3.InsuranceAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk3.OthersAmountPercent.$viewValue != null) {
                    $scope.frmk3.OthersAmountPercent.$$runValidators($scope.frmk3.OthersAmountPercent.$modalValue, $scope.frmk3.OthersAmountPercent.$viewValue, function () {
                        $scope.frmk3.OthersAmountPercent.$setViewValue($scope.frmk3.OthersAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
            }, 500);
        }
        var declarationNo = $stateParams.declarationNo;

        $scope.init = function () {

            $scope.time = null;
            $scope.ic = {};//Invoice Cargo
            $scope.sd = {};//Shipment Details
            $scope.ex = {};//Excemptions
            $scope.con = {};//Container Info
            $scope.doc = {};//Documents
            $scope.cl = {};//Clause
            $scope.ie = {};//item entry
            $scope.ies = {};//item entry subitem
            $scope.dc = {};
            $scope.IsNew = true;
            $scope.ediResponse = {};
            $scope.declarationOrderStatus = {};
            $scope.IsCustomResponsesShow = false;
            if (declarationNo != "NEW" && declarationNo != "") {
                $scope.IsNew = false;
            }
            else {
                $scope.IsNew = true;

            };//declaration container

            $scope.k3 = {
                declarationHeaderK3: {
                    DeclarationShipmentType : 25850,
                    OpenDate: moment()
                },
                declarationShipmentK3: {},
                declarationContainerK3: new Array(),
                declarationDocumentsK3: new Array(),
                declarationClauses: new Array(),
                declarationItemK3: new Array(),
                declarationInvoiceK3: {
                    InvoiceNo: null,
                    InvoiceDate: null,
                    InvoiceValue: null,
                    InvoiceCurrencyCode: 'MYR',
                    LocalCurrencyCode: null,
                    CurrencyExRate: 1.0000,
                    IncoTerm: null,
                    PayCountry: 'MY',
                    PortAmountPercent: null,
                    PortAmountCurrencyCode: 'MYR',
                    PortAmountExRate: 1.0000,
                    PortAmountValue: null,
                    FreightAmountPercent: null,
                    FreightAmountCurrencyCode: 'MYR',
                    FreightAmountExRate: 1.0000,
                    FreightAmountValue: null,
                    FreightIncoTerm: null,
                    InsuranceAmountPercent: null,
                    InsuranceAmountCurrencyCode: 'MYR',
                    InsuranceAmountExRate: 1.0000,
                    InsuranceAmountValue: null,
                    InsuranceIncoTerm: null,
                    OthersAmountPercent: null,
                    OthersAmountCurrencyCode: 'MYR',
                    OthersAmountExRate: 1.0000,
                    OthersAmountValue: null,
                    CargoClassCode: null,
                    CargoDescription1: null,
                    CargoDescription2: null,
                    PackageQty: null,
                    PackingTypeCode: null,
                    PackingMaterialCode: null,
                    GrossWeight: null,
                    UOMWeight: null,
                    GrossVolume: null,
                    UOMVolume: null,
                    Status: null,
                    FOBAmount: 0.00,
                    CIFAmount: 0.00,
                    EXWAmount: 0.00,
                    CNFAmount: 0.00,
                    CNIAmount: 0.00,
                    FreightAmount: 0.00,
                    InsuranceAmount: 0.00,
                    CIFCAmount: 0.00,
                    InvoiceLocalAmount: null,
                    UOMWeight: 'KGM',
                    UOMVolume: 'MTQ',
                    IsFreightCurrency: false,
                    IsInsuranceCurrency: false
                }

            };

            $scope.k3.declarationHeaderK3.TransportMode = 1021;
            $scope.IsDeclarationValidated = false;
            // $scope.IsNew = true;
            $scope.showLoading = true;
            $scope.showAddBtn = true;
            $scope.isConventionalCargo = false;
            $scope.customresponses = {};
            $scope.ediResponse = {};
            $scope.customresponseheaderItem = {};


            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.timeFormat = UtilityFunc.TimeFormat();
            $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
            $scope.defaultCurrency = UtilityFunc.DefaultCurrency();
            $scope.defaultCountry = UtilityFunc.DefaultCountry();
            $scope.BranchID = UtilityFunc.BranchID();

            $scope.lookUpData = {};
            $scope.GetLookUpdata();

            if (!angular.isUndefined(declarationNo) && declarationNo != 'NEW' && declarationNo != "") {
                $scope.GetDeclaration(declarationNo);
            }
            if (declarationNo == 'NEW' || declarationNo == "") {
                $scope.k3.TransportMode = 1021;
                $scope.k3.declarationInvoiceK3.LocalCurrencyCode = $scope.defaultCurrency;
                $scope.k3.declarationInvoiceK3.PortAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k3.declarationInvoiceK3.FreightAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k3.declarationInvoiceK3.InsuranceAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k3.declarationInvoiceK3.OthersAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k3.declarationInvoiceK3.PayCountry = $scope.defaultCountry;
            }
            $scope.Activity = {};
            $scope.Activities = new Array();
        };
        var isNew = false;
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
        $scope.GetDeclaration = function (declarationNo) {
            k3Service.GetDeclaration(declarationNo).then(function (d) {
                $scope.k3 = d.data;
                $scope.changeShipmentType($scope.k3.declarationHeaderK3.ShipmentType);

                if (!$scope.k3.declarationHeaderK3.IsPartial)
                    $scope.IsDeclarationValidated = true;

                if (!angular.isUndefined($scope.k3.declarationHeaderK3.DeclarantID) && $scope.k3.declarationHeaderK3.DeclarantID != "" && $scope.k3.declarationHeaderK3.DeclarantID != null) {
                    $scope.k3.declarationHeaderK3.DeclarantIDText = $scope.k3.declarationHeaderK3.DeclarantIDText;
                }

                $scope.IsCustomResponsesShow = true;
                $scope.GetDeclartionStatus(declarationNo);
                $scope.GetCustomResponse(declarationNo);
                $scope.BindAddress(d.data.declarationHeaderK3.ShippingAgent, 'ShippingAgentAddress');
                $scope.Cntrl.activityList = d.data.activityList;

                $scope.ngTblItemInfo();
                $scope.ngTblContainerInfo();
                $scope.ngTblDocumentsInfo();

                $scope.validateDates();
                $scope.validateInputDecimal();


            });

        }
        $scope.ChangeTransportMode = function (TransportMode) {
            $scope.transportMode = TransportMode;
            if ($scope.k3.declarationHeaderK3.TransportMode == 1020 || $scope.k3.declarationHeaderK3.TransportMode == 1024 || $scope.k3.declarationHeaderK3.TransportMode == 1025 || $scope.k3.declarationHeaderK3.ShipmentType == 26533 || $scope.k3.declarationHeaderK3.ShipmentType == 26531) {
                $scope.isConventionalCargo = true;
            }
            else
                $scope.isConventionalCargo = false;

            $scope.k3.declarationShipmentK3.VesselScheduleID = null;
            $scope.k3.declarationShipmentK3.VoyageNo = null;
            $scope.k3.declarationShipmentK3.SCNNo = null;
            $scope.k3.declarationShipmentK3.VesselID = null;
            $scope.k3.declarationShipmentK3.VesselName = null;
            $scope.k3.declarationShipmentK3.ETADate = undefined;
            $scope.k3.declarationShipmentK3.ManifestNo = null;
            $scope.k3.declarationShipmentK3.OceanBLNo = null;
            $scope.k3.declarationShipmentK3.HouseBLNo = null;
            $scope.k3.declarationShipmentK3.FlightNo = null;
            $scope.k3.declarationShipmentK3.ARNNo = null;
            $scope.k3.declarationShipmentK3.MasterAWBNo = null;
            $scope.k3.declarationShipmentK3.HouseAWBNo = null;
            $scope.k3.declarationShipmentK3.AIRCOLoadNo = null;

        };

        $scope.GetLookUpdata = function () {
            k3Service.GetLookupData().then(function (d) {

                $scope.lookUpData = d.data;
                $scope.showLoading = false;
            }, function (err) { });
        };

        //$scope.LoadSMKCode = function (TransType) {
        //    var obj = $filter('filter')($scope.lookUpData.K3ATransactionTypeList, { Value: TransType })[0];
        //    //$scope.k2.TransactionTypeCode = $filter('filter')($scope.lookUpData.K2ATransactionTypeList, { Value: $scope.k2.TransType })[0].Text;
        //    $scope.k3.TransactionTypeDescription = obj.Text;
        //    $scope.k3.TransactionTypeCode = obj.Code;
        //};
        $scope.PayCountryChanged = function (item, type) {
            $scope.k3.declarationInvoice[type] = item.text;
        };

        $scope.PortOperatorResults = function (text) {
            var operatortype = 26220;
            return OrderEntryService.operatorList(operatortype, text).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) { });
        };
        $scope.TerminalOperaterSelected = function (item) {

            $scope.k3.declarationShipmentK3.PortOperator = item.Value;
        };



        $scope.GenericMerchantResults = function (text, filter) {

            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.MerchantSelected = function (item, Type) {
            $scope.k3.declarationHeaderK3[Type] = item.Value;
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
        $scope.formatDate = function (date) {
            return moment(date).format(UtilityFunc.DateFormat());
        }
        //$scope.ShipCallNoSelect = function (item) {
        //    $scope.k3.declarationShipment.VoyageNo = item.VoyageNoInWard;
        //    $scope.k3.declarationShipment.VesselID = item.VesselID;
        //    $scope.k3.declarationShipment.VesselName = '';
        //    $scope.k3.declarationShipment.ETADate = item.ETA;
        //};

        //$scope.VoyageNoInwardSelect = function (item) {
        //    $scope.k3.declarationShipment.SCNNo = item.ShipCallNo;
        //    $scope.k3.declarationShipment.VesselID = item.VesselID;
        //    $scope.k3.declarationShipment.VesselName = '';
        //    $scope.k3.declarationShipment.ETADate = item.ETA;
        //};

        $scope.PortAutoComplete = function (text) {
            return PortAreaService.PortAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.PortSelected = function (item, type) {

            $scope.k3.declarationHeaderK3[type] = item.PortCode;
            $scope.k3.declarationShipmentK3[type] = item.PortCode;

            if (type == 'PlaceOfImport') {
                $scope.k3.declarationShipmentK3.DischargePortName = $scope.k3.declarationShipmentK3.PlaceOfImportName;
                $scope.k3.declarationShipmentK3['DischargePort'] = item.PortCode;
            }
        };


        $scope.exRateChanged = function (currencyCode, field) {
            $scope.showLoading = true;
            CurrencyRateService.GetExRate($scope.k3.declarationInvoice[currencyCode]).then(function (d) {
                $scope.k3.declarationInvoice[field] = d.data;
                $scope.showLoading = false;
            }, function (err) { });
        };

        $scope.TransactionType = function (item, field) {

            $scope.k3[field] = item.Code;
        };

        $scope.sizeChanged = function () {
            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
                $scope.showLoading = false;
            }, function () { })
        };

        $scope.AddDeclarationContainer = function () {
            $scope.k3.declarationContainerK3.push($scope.dc);
            $scope.dc = {};
        };
        //$scope.back = function () {
        //    
        //    $state.go('k3inquiry', {}, {});
        //};

        /*shipment details*/
        $scope.VesselNameResults = function (text) {
            return VesselMasterService.GetVesselByVesselName(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.vesselNameClick = function (obj) {
            $scope.k3.declarationShipment.VesselID = obj.Value;
        };

        $scope.MerchantSelected2 = function (item, Type) {
            $scope.k3.declarationShipment[Type] = item.Value
        };

        $scope.editContainer = function (index) {
            $scope.showLoading = true;
            $scope.dc = $scope.k3.declarationContainerK3[index];
            $scope.sizeChanged();
            $timeout(function () { $scope.showLoading = false; }, 500);
        };

        $scope.deleteContainer = function (index) {
            $scope.k3.declarationContainerK3.splice(index, 1);
        };

        $scope.AddDeclarationDocuments = function (doc) {
            if ($scope.isEditDoc) {
                $scope.k3.declarationDocumentsK3[documentIndex] = $scope.doc;
            } else {
                $scope.k3.declarationDocumentsK3.push($scope.doc);
            }
            $scope.doc = {};
            $scope.isEditDoc = false;
            documentIndex = -1;
        };

        $scope.isEditDoc = false;
        //var documentIndex = -1;
        //$scope.editDocument = function (index) {
        //    documentIndex = index;
        //    $scope.isEditDoc = true;
        //    $scope.showLoading = true;
        //    $scope.doc = $scope.k3.declarationDocuments[index];
        //    if ($scope.doc.DocDate == null)
        //        $scope.doc.DocDate = undefined;
        //    $timeout(function () { $scope.showLoading = false; }, 500);
        //};

        var DocIndex = -1;
        $scope.editDocument = function (index) {
            DocIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k3/document.html?v=' + Utility.Version,
                controller: 'k3DocumentCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            Document: (DocIndex == -1 ? {} : $scope.k3.declarationDocumentsK3[index]),
                            docDateTypeList: $scope.lookUpData.docDateTypeList,
                            OGACodeList: $scope.lookUpData.OGACodeList,
                            customStationCodeList: $scope.lookUpData.smkList,
                            SupportingDocumentTypeList: $scope.lookUpData.SupportingDocumentTypeList,
                            declarationDocumentsK3: $scope.k3.declarationDocumentsK3,
                            countryList: $scope.lookUpData.countryList,
                            OGABranchlist: $scope.lookUpData.OGABranchlist
                        };
                    }
                }
            });

            modalInstance.result.then(function (res) {

                if (DocIndex != -1)
                    $scope.k3.declarationDocumentsK3[DocIndex] = res;
                else {
                    $scope.k3.declarationDocumentsK3.push(res);
                    if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {
                            var obj = { ActivityCode: 1030 };
                            $scope.Activities.push(obj);
                    }
                }

                DocIndex = -1;
                $scope.ngTblDocumentsInfo();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };


        $scope.deleteDocument = function (index) {
            $scope.showLoading = true;
            $scope.k3.declarationDocumentsK3.splice(index, 1);
            if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {
                    var obj = { ActivityCode: 1031 };
                    $scope.Activities.push(obj);
            }
            $timeout(function () { $scope.showLoading = false; }, 500);
            $scope.doc = {};
            $scope.ngTblDocumentsInfo();
        };

        $scope.AddDeclarationClause = function () {
            if ($scope.isEditClause) {
                $scope.k3.declarationClauses[clauseIndex] = $scope.cl;
            } else {
                $scope.k3.declarationClauses.push($scope.cl);
            }

            $scope.cl = {};
            $scope.isEditClause = false;
            clauseIndex = -1;
        };

        $scope.isEditClause = false;
        //var clauseIndex = -1;
        //$scope.editClause = function (index) {
        //    $scope.isEditClause = true;
        //    clauseIndex = index;
        //    $scope.showLoading = true;
        //    $scope.cl = $scope.k3.declarationClauses[index];
        //    $timeout(function () { $scope.showLoading = false; }, 500);
        //};

        $scope.deleteClause = function (index) {
            $scope.showLoading = true;
            $scope.k3.declarationClauses.splice(index, 1);
            $timeout(function () { $scope.showLoading = false; }, 500);
            $scope.cl = {};
        };

        var clauseIndex = -1;
        $scope.editClause = function (index) {
            clauseIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k3/clause.html?v=' + Utility.Version,
                controller: 'k3ClauseCntrl',
                size: 'md',
                resolve: {
                    dataObj: function () {
                        return {
                            Clause: (clauseIndex == -1 ? {} : $scope.k3.declarationClauses[index]),
                            clauseTypeList: $scope.lookUpData.clauseTypeList
                        };
                    }
                }
            });

            modalInstance.result.then(function (res) {
                if (clauseIndex != -1)
                    $scope.k3.declarationClauses[clauseIndex] = res;
                else
                    $scope.k3.declarationClauses.push(res);

                clauseIndex = -1;
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
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

            if ($scope.k3.declarationInvoiceK3 != null) {

                if ($scope.k3.declarationInvoiceK3.FreightAmountPercent)
                    _Freight = $scope.k3.declarationInvoiceK3.FreightAmountPercent;

                if ($scope.k3.declarationInvoiceK3.InsuranceAmountPercent)
                    _insurance = $scope.k3.declarationInvoiceK3.InsuranceAmountPercent;

            }

            var _InvoiceCurrency = $scope.k3.declarationInvoiceK3.InvoiceCurrencyCode;
            var _invoiceCurrencyRate = $filter('filter')($scope.lookUpData.currencyList, { Text: $scope.k3.declarationInvoiceK3.InvoiceCurrencyCode })[0].ImportRate;

            var _isFreightCurrency = (angular.isUndefined($scope.k3.declarationInvoiceK3.IsFreightCurrency) ? false : $scope.k3.declarationInvoiceK3.IsFreightCurrency);
            var _isInsuranceCurrency = (angular.isUndefined($scope.k3.declarationInvoiceK3.IsInsuranceCurrency) ? false : $scope.k3.declarationInvoiceK3.IsInsuranceCurrency);
            var _incoTerm = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.IncoTerm) || $scope.k3.declarationInvoiceK3.IncoTerm == null ? 0 : $scope.k3.declarationInvoiceK3.IncoTerm);
            var _port = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.PortAmountPercent) || $scope.k3.declarationInvoiceK3.PortAmountPercent == null ? 0 : $scope.k3.declarationInvoiceK3.PortAmountPercent);
            var _otherCharges = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.OthersAmountPercent) || $scope.k3.declarationInvoiceK3.OthersAmountPercent == null ? 0 : $scope.k3.declarationInvoiceK3.OthersAmountPercent);

            itemEntryIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k3/item-entry.html?v=' + Utility.Version,
                controller: 'k3ItemEntry',
                windowClass: 'app-modal-window4',
                resolve: {
                    dataObj: function () {
                        return {
                            itemEntry: (itemEntryIndex == -1 ? {} : $scope.k3.declarationItemK3[index]),
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
                if (res.declarationSubItemK3 != undefined) {
                    $scope.k3.declarationSubItemK3 = $.map(res.declarationSubItemK3, function (el) {
                        return el
                    });
                }
                if (itemEntryIndex != -1){
                    $scope.k3.declarationItemK3[itemEntryIndex] = res;
                    if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {
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
                }
                else {
                    if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {
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
                    $scope.k3.declarationItemK3.push(res);
                }

                itemEntryIndex = -1;
                $scope.ngTblItemInfo();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };

        $scope.deleteItem = function (index) {
            $scope.k3.declarationItemK3.splice(index, 1);
            $scope.ngTblItemInfo();
            if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {
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
        };

        $scope.CopyItemEntry = function (obj) {

            debugger;
            var copyItemEntry = angular.copy(obj);
            if ($scope.k3.declarationItemK3 != null) {
                $scope.k3.declarationItemK3.push(copyItemEntry);
            }
            if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {

                debugger;
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
            $scope.ngTblItemInfo();
        }
        /*
        $scope.OpenModal = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k3/item-entry.html?v=' + Utility.Version,
                controller: 'AddEditItemEntryCntrl',
                windowClass: 'app-modal-window3',
                resolve: {
                    itemEntry: function () {
                        return {};
                    }
                }
            });
    
            modalInstance.result.then(function (res) {
                $scope.k3. declarationItemK3s.push(res);
            }, function (err) {
                growl.error(err.statusText, {});
            });
        };
        */
        //$scope.GetLookUpdata();

        //$scope.GenerateFile = function (declarationNo) {
        //    $scope.btncustom = true;
        //    k3Service.GenerateFile(declarationNo).then(function (d) {
        //        $scope.btncustom = false;
        //        var modalInstance = $uibModal.open({
        //            animation: true,
        //            templateUrl: 'Js/Declaration/Templates/k3/download-file.html?v=' + Utility.Version,
        //            controller: 'AddDownLoadCntrl',
        //            size: 'lg',
        //            resolve: {
        //                fileName: function () {
        //                    return d.data.fileName;
        //                    
        //                }
        //            }
        //        });

        //        modalInstance.result.then(function () {

        //        }, function (err) {

        //        });
        //    }, function (err) {
        //        growlService.growl(err, 'danger');
        //    });
        //};
        $scope.btncustom = false;
        $scope.GenerateFile = function (k3, declarationNo) {
            if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.CheckSubItems(k3) && $scope.CheckContainerNos(k3)) {
                $scope.btncustom = true;
                k3Service.Savek3Declaration(k3).then(function (res) {
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

                    k3Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/
                    k3Service.GenerateFile(declarationNo).then(function (d) {
                        $scope.btncustom = false;
                        $scope.customresponses = d.data.customResponse;
                        $scope.ediResponse = d.data.ediResponse;
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
        $scope.back = function () {
            $location.path('/declaration/k3inquiry');
        };

        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }

        $scope.isFrmk3Valid = false;
        $scope.$watch('frmk3.$valid', function (isValid) {
            $scope.isFrmk3Valid = isValid;
        });

        $scope.VoyageSelected = function (item) {
            $scope.k3.declarationShipmentK3.VoyageNo = item.VoyageNoInWard;
            $scope.k3.declarationShipmentK3.SCNNo = item.ShipCallNo;
            $scope.k3.declarationShipmentK3.VesselID = item.VesselID;
            $scope.k3.declarationShipmentK3.VesselName = item.VesselName;
            $scope.k3.declarationShipmentK3.ETADate = item.ETA;
            if (!angular.isUndefined($scope.k3.declarationShipmentK3) && $scope.k3.declarationShipmentK3 != null) {

                if ($scope.k3.declarationShipmentK3.ETADate == null) {
                    $scope.k3.declarationShipmentK3.ETADate = undefined;
                }
                else
                    $scope.k3.declarationShipmentK3.ETADate = moment($scope.k3.declarationShipmentK3.ETADate);
            }

        };

        $scope.Savek3Declaration = function (k3) {

            //var temp1 = $scope.frmk3.GrossWeight.$modalValue;
            //$scope.k3.declarationInvoiceK3.GrossWeight = $scope.frmk3.GrossWeight.$viewValue.replace(/[^\d|\-+|\.+]/g, '');
            ////$scope.frmk3.GrossWeight.$modalValue = $scope.frmk3.GrossWeight.$viewValue.replace(/[^\d|\-+|\.+]/g, '');
            //$scope.k3.declarationInvoiceK3.GrossWeight.$setViewValue($scope.frmk3.GrossWeight.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
            //$scope.k3.declarationInvoiceK3.GrossWeight.$render();


            if ($scope.isFrmk3Valid) {
                $scope.changeShipmentType($scope.k3.declarationHeaderK3.ShipmentType);
                if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.CheckSubItems(k3) && $scope.CheckContainerNos(k3)) {

                    $scope.showLoading = true;
                    //if ($scope.isConventionalCargo) {
                    //    
                    //    $scope.k3.declarationContainerK3 = null;
                    //}

                    $scope.k3.declarationHeaderK3.IsPartial = false;

                    if (($scope.k3.declarationHeaderK3.DeclarationNo == null ||
                               $scope.k3.declarationHeaderK3.DeclarationNo == undefined ||
                                        $scope.k3.declarationHeaderK3.DeclarationNo == "") &&
                                                !$scope.k3.declarationHeaderK3.IsPartial) {

                        var obj = { ActivityCode: 1021 };
                        $scope.Activities.push(obj);
                        var obj = { ActivityCode: 1022 };
                        $scope.Activities.push(obj);
                    }
                    else {
                        
                            var obj = { ActivityCode: 1022 };
                            $scope.Activities.push(obj);
                       
                    }
                    k3Service.Savek3Declaration(k3).then(function (d) {
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

                        k3Service.SaveActivityStatus(arr).then(function (test) {
                            debugger;
                            arr = new Array();
                            $scope.Activities = new Array();
                        });
                        /*Activity Save*/
                        if (d.data != "The ContainerNo field is required.") {
                            $scope.showLoading = false;

                            growlService.growl('Declaration Saved Successfully..', 'success');

                            $scope.k3.declarationHeaderK3.DeclarationNo = d.data.declarationNo;
                            $scope.k3.declarationHeaderK3.OrderNo = d.data.orderNo;
                            //k3Service.GetDeclaration($scope.k3.declarationHeaderK3.DeclarationNo);
                            $scope.IsDeclarationValidated = true;


                        }
                        else {
                            growlService.growl('The ContainerNo field is required...', 'danger');
                        }
                    }, function (err) { });
                }
            } else {
                var error = $scope.frmk3.$error;
                angular.forEach(error.required, function (field) {
                    if (field.$invalid) {
                        var fieldName = field.$name;
                    }
                });
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };


        $scope.ValidateContainer = function () {

            if (!$scope.isConventionalCargo) {
                if ($scope.k3.declarationContainerK3.length == 0) {

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

            if ($scope.k3.declarationItemK3.length == 0) {
                growlService.growl('Atleast one item entry is required', 'danger');
                return false;
            }
            else
                return true;
        };
        $scope.changeShipmentType = function (ShipmentType) {

            if ($scope.k3.declarationHeaderK3.ShipmentType == 26533 || $scope.k3.declarationHeaderK3.ShipmentType == 26531 || $scope.k3.declarationHeaderK3.TransportMode == 1020 || $scope.k3.declarationHeaderK3.TransportMode == 1024 || $scope.k3.declarationHeaderK3.TransportMode == 1025) {
                $scope.isConventionalCargo = true;
            }
            else
                $scope.isConventionalCargo = false;
        };
        $scope.Savek3DeclarationPartial = function (k3) {

            $scope.changeShipmentType($scope.k3.declarationHeaderK3.ShipmentType);
            if ($scope.ValidatePartialSave() && $scope.ValidatePorts() && $scope.CheckSubItems(k3) && $scope.CheckContainerNos(k3)) {

                $scope.showLoading = true;

                //if ($scope.isConventionalCargo) {
                //    $scope.k3.declarationContainerK3 = null;
                //}

                //  $scope.k3.IsPartial = $scope.k3.IsPartial == false ? $scope.k3.IsPartial : true;
                //$scope.k3.declarationHeaderK3.IsPartial = false;
                $scope.k3.declarationHeaderK3.IsPartial = $scope.k3.declarationHeaderK3.IsPartial == false ? $scope.k3.declarationHeaderK3.IsPartial : true;
                debugger;
                if (($scope.k3.declarationHeaderK3.DeclarationNo == null || $scope.k3.declarationHeaderK3.DeclarationNo == undefined
                    || $scope.k3.declarationHeaderK3.DeclarationNo == "") && $scope.k3.declarationHeaderK3.IsPartial) {
                    var obj = { ActivityCode: 1021 };
                    $scope.Activities.push(obj);
                }
                k3Service.Savek3Declaration($scope.k3).then(function (d) {
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

                    k3Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/
                    if (d.data != "The ContainerNo field is required.") {
                        $scope.showLoading = false;
                        growlService.growl('Declaration ' + d.data.declarationNo + ' Saved Partially..', 'success');

                        $scope.k3.declarationHeaderK3.DeclarationNo = d.data.declarationNo;
                        $scope.k3.declarationHeaderK3.OrderNo = d.data.orderNo;
                        // $scope.IsDeclarationValidated = true;
                    }
                    else {
                        growlService.growl('The ContainerNo field is required...', 'danger');
                    }

                    //k3Service.GetDeclaration($scope.k3.declarationHeaderK3.DeclarationNo);
                }, function (err) { });
            }
        };
        $scope.ValidatePartialSave = function () {
            if ($scope.k3.declarationHeaderK3.ImportDate == undefined || $scope.k3.declarationHeaderK3.ImportDate == '') {
                growlService.growl('please select Dispatch Date', 'danger');
                return false;
            }
            else if ($scope.k3.declarationHeaderK3.TransportMode == undefined || $scope.k3.declarationHeaderK3.TransportMode == '') {
                growlService.growl('please select Transport Mode', 'danger');
                return false;
            }
            else if ($scope.k3.declarationHeaderK3.ShipmentType == undefined || $scope.k3.declarationHeaderK3.ShipmentType == '') {
                growlService.growl('please select Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k3.declarationHeaderK3.CustomerReferenceNo == undefined || $scope.k3.declarationHeaderK3.CustomerReferenceNo == '') {
                growlService.growl('please enter Reference No/Job No', 'danger');
                return false;
            }
            else if ($scope.k3.declarationHeaderK3.DeclarationShipmentType == undefined || $scope.k3.declarationHeaderK3.DeclarationShipmentType == '') {
                growlService.growl('please select Declaration Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k3.declarationHeaderK3.TransactionType == undefined || $scope.k3.declarationHeaderK3.TransactionType == '') {
                growlService.growl('please select SMK Transaction Type', 'danger');
                return false;
            }
            else
                return true;
        };
        $scope.ValidatePorts = function () {
            if ($scope.k3.declarationHeaderK3.TransportMode == 1021) {
                if ($scope.k3.declarationShipmentK3 != undefined) {
                    if (($scope.k3.declarationShipmentK3.LoadingPort != undefined && $scope.k3.declarationShipmentK3.LoadingPort != '' && $scope.k3.declarationShipmentK3.DischargePort != undefined && $scope.k3.declarationShipmentK3.DischargePort != '') && $scope.k3.declarationShipmentK3.LoadingPort == $scope.k3.declarationShipmentK3.DischargePort) {
                        growlService.growl('Loading Port and Discharge Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k3.declarationShipmentK3.LoadingPort != undefined && $scope.k3.declarationShipmentK3.LoadingPort != '' && $scope.k3.declarationShipmentK3.TranshipmentPort != undefined && $scope.k3.declarationShipmentK3.TranshipmentPort != '') && $scope.k3.declarationShipmentK3.LoadingPort == $scope.k3.declarationShipmentK3.TranshipmentPort) {
                        growlService.growl('Loading Port and Transhipment Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k3.declarationShipmentK3.TranshipmentPort != undefined && $scope.k3.declarationShipmentK3.TranshipmentPort != '' && $scope.k3.declarationShipmentK3.DischargePort != undefined && $scope.k3.declarationShipmentK3.DischargePort != '') && $scope.k3.declarationShipmentK3.DischargePort == $scope.k3.declarationShipmentK3.TranshipmentPort) {
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

        $scope.CheckSubItems = function (obj) {
            $scope.retVal = false;
            $scope.docVal = false;
            angular.forEach(obj.declarationItemK3, function (item, value) {
                angular.forEach(item.declarationSubItemK3, function (subItem, subValue) {
                    if (subItem.ItemType == 'TE' || subItem.ItemType == 'PM') {
                        $scope.retVal = true;
                    }
                });
            });
            angular.forEach(obj.declarationDocumentsK3, function (item, value) {
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

        $scope.CheckSubItems = function (obj) {
            $scope.retVal = false;
            $scope.docVal = false;

            if (obj.declarationHeaderK3.DeclarationK3Type == 26752) {
                angular.forEach(obj.declarationItemK3, function (item, value) {
                    angular.forEach(item.declarationSubItemK3, function (subItem, subValue) {
                        if (subItem.ItemType == 'TE' || subItem.ItemType == 'PM') {
                            $scope.retVal = true;
                        }
                    });
                });
                angular.forEach(obj.declarationDocumentsK3, function (item, value) {
                    if (item.SupportingDocumentType == 25813) {
                        $scope.docVal = true;
                    }
                });
                if ($scope.retVal && !$scope.docVal) {
                    growlService.growl('911 - IMPORT LICENCE document is required', 'danger');
                    return false;
                }
            }
            else if (obj.declarationHeaderK3.DeclarationK3Type == 26751) {
                angular.forEach(obj.declarationItemK3, function (item, value) {
                    angular.forEach(item.declarationSubItemK3, function (subItem, subValue) {
                        if (subItem.ItemType == 'TE' || subItem.ItemType == 'PM') {
                            $scope.retVal = true;
                        }
                    });
                });
                angular.forEach(obj.declarationDocumentsK3, function (item, value) {
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

            angular.forEach(obj.declarationContainerK3, function (item, value) {
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


        $scope.CustomerSelected = function (item, type, addresstype) {
            $scope.showLoading = true;
            var html = '';
            $scope.k3.declarationHeaderK3[type] = item.Value;
            $scope.k3.declarationHeaderK3[addresstype] = '';

            $scope.BindAddress(item.Value, addresstype);
        };


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
                $scope.k3.declarationHeaderK3[addresstype] = html;
                $scope.showLoading = false;
            }, function (err) { });
        };


        var conInfoIndex = -1;
        $scope.editConInfo = function (index) {
            conInfoIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k3/container-info.html?v=' + Utility.Version,
                controller: 'AddEditContainerInfoCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            dc: (conInfoIndex == -1 ? {} : $scope.k3.declarationContainerK3[conInfoIndex]),
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
                    debugger;
                    $scope.k3.declarationContainerK3[conInfoIndex] = res;
                    if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {
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
                    $scope.k3.declarationContainerK3[conInfoIndex] = res;
                }
                else {
                    if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {
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
                    $scope.k3.declarationContainerK3.push(res);
                }

                conInfoIndex = -1;
                $scope.ngTblContainerInfo();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };

        $scope.K3ContainerIndex = -1;
        $scope.ngTblContainerInfo = function () {
            $scope.tblK3Container = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.k3.declarationContainerK3.length,
                getData: function ($defer, params) {
                    var conData = params.sorting() ? $filter('orderBy')($scope.k3.declarationContainerK3, params.orderBy()) : $scope.k3.declarationContainerK3;
                    $defer.resolve(conData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.K3ContainerIndex = (params.page() - 1) * params.count();
                }
            });
        }

        var k3DocumentIndex = -1;
        $scope.ngTblDocumentsInfo = function () {
            $scope.tblK3Documents = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.k3.declarationDocumentsK3.length,
                getData: function ($defer, params) {

                    var docData = params.sorting() ? $filter('orderBy')($scope.k3.declarationDocumentsK3, params.orderBy()) : $scope.k3.declarationDocumentsK3;
                    $defer.resolve(docData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.k3DocumentIndex = (params.page() - 1) * params.count();
                }
            });
        }
        var k3ItemIndex = -1;
        $scope.ngTblItemInfo = function () {

            $scope.tblK3Items = new NgTableParams({

                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {

                total: $scope.k3.declarationItemK3.length,
                getData: function ($defer, params) {
                    debugger;
                    var itemData = params.sorting() ? $filter('orderBy')($scope.k3.declarationItemK3, params.orderBy()) : $scope.k3.declarationItemK3;
                    $defer.resolve(itemData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.k3ItemIndex = (params.page() - 1) * params.count();
                }
            });
        }

        /*invoice details and charges info section */
        $scope.IncoTermCalculation = function (IsFreightCurrency, IsInsuranceCurrency) {
            var incoTerm = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.IncoTerm) || $scope.k3.declarationInvoiceK3.IncoTerm == null ? 0 : $scope.k3.declarationInvoiceK3.IncoTerm);
            var freight = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.FreightAmountPercent) || $scope.k3.declarationInvoiceK3.FreightAmountPercent == null ? 0 : $scope.k3.declarationInvoiceK3.FreightAmountPercent);
            var insurance = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.InsuranceAmountPercent) || $scope.k3.declarationInvoiceK3.InsuranceAmountPercent == null ? 0 : $scope.k3.declarationInvoiceK3.InsuranceAmountPercent);
            var port = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.PortAmountPercent) || $scope.k3.declarationInvoiceK3.PortAmountPercent == null ? 0 : $scope.k3.declarationInvoiceK3.PortAmountPercent);
            var otherCharges = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.OthersAmountPercent) || $scope.k3.declarationInvoiceK3.OthersAmountPercent == null ? 0 : $scope.k3.declarationInvoiceK3.OthersAmountPercent);
            var invoiceValue = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.InvoiceLocalAmount) || $scope.k3.declarationInvoiceK3.InvoiceLocalAmount == null ? 0 : $scope.k3.declarationInvoiceK3.InvoiceLocalAmount);

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
                FOB: $scope.k3.declarationInvoiceK3.FOBAmount,
                CIF: $scope.k3.declarationInvoiceK3.CIFAmount,
                EXW: $scope.k3.declarationInvoiceK3.EXWAmount,
                CNF: $scope.k3.declarationInvoiceK3.CNFAmount,
                CNI: $scope.k3.declarationInvoiceK3.CNIAmount,
                IsFreightCurrency: IsFreightCurrency,
                IsInsuranceCurrency: IsInsuranceCurrency
            };


            $scope.showLoading = true;
            k3Service.OutPutFOBCIF(obj).then(function (d) {
                $scope.k3.declarationInvoiceK3.FOBAmount = d.data.FOB.toFixed(2);
                $scope.k3.declarationInvoiceK3.CIFAmount = d.data.CIF.toFixed(2);
                $scope.k3.declarationInvoiceK3.EXWAmount = d.data.EXW.toFixed(2);
                $scope.k3.declarationInvoiceK3.CNFAmount = d.data.CNF.toFixed(2);
                $scope.k3.declarationInvoiceK3.CNIAmount = d.data.CNI.toFixed(2);
                $scope.k3.declarationInvoiceK3.FreightAmount = d.data.freight.toFixed(2);
                $scope.k3.declarationInvoiceK3.InsuranceAmount = d.data.insurance.toFixed(2);
                $scope.k3.declarationInvoiceK3.CIFCAmount = d.data.CIFC.toFixed(2);
                $scope.showLoading = false;
            }, function (err) {

            });
        };
        $scope.GetCustomResponse = function (declarationNo) {

            k3Service.GetCustomResponse(declarationNo).then(function (d) {

                $scope.customresponses = d.data.customResponse;
                //$scope.Ediresult = d.data.Ediresult;
                $scope.ediResponse = d.data.ediResponse;
                $scope.ammendantsResponse = d.data.ammendantsResponse;
                $scope.customresponseheaderItem = d.data.customresponseheaderItem;
                $scope.dutyAmountlist = d.data.dutyAmountlist;
                // console.log($scope.customresponses);
                //console.log($scope.Ediresult);
                //$scope.k2.MarksAndNos = $filter('htmlToPlaintext')($scope.k2.MarksAndNos);
            }, function (err) { });
        };

        $scope.DisplayResponseData = function (obj) {
            k3Service.GetCustomResponseInfo(obj).then(function (d) {
                $scope.customresponseheaderItem = d.data;
               // $scope.customresponseheaderItem.RegistrationDate = d.data.customresponseheaderItem.RegistrationDate;
            }, function (err) { });
        };
        $scope.CurrencyRateChanged = function () {

            var invoiceValue = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.InvoiceValue) || $scope.k3.declarationInvoiceK3.InvoiceValue == null ? 0 : $scope.k3.declarationInvoiceK3.InvoiceValue);
            var importRate = $filter('filter')($scope.lookUpData.currencyList, { Value: $scope.k3.declarationInvoiceK3.InvoiceCurrencyCode })[0].ImportRate;
            $scope.k3.declarationInvoiceK3.InvoiceLocalAmount = (invoiceValue * importRate).toFixed(2);

            //$scope.k3.declarationInvoiceK3.FreightAmountCurrencyCode = $scope.k3.declarationInvoiceK3.InvoiceCurrencyCode;
            //$scope.k3.declarationInvoiceK3.InsuranceAmountCurrencyCode = $scope.k3.declarationInvoiceK3.InvoiceCurrencyCode;

            $scope.k3.declarationInvoiceK3.CurrencyExRate = importRate.toFixed(4);
            //$scope.k3.declarationInvoiceK3.FreightAmountExRate = importRate.toFixed(4);
            //$scope.k3.declarationInvoiceK3.InsuranceAmountExRate = importRate.toFixed(4);

        };

        $scope.ChargesInfoCurrencyRateChanged = function (AmountPercent, IsPercent, CurrencyCode, AmountValue) {

            var invoiceValue = parseFloat(angular.isUndefined($scope.k3.declarationInvoiceK3.InvoiceValue) || $scope.k3.declarationInvoiceK3.InvoiceValue == null ? 0 : $scope.k3.declarationInvoiceK3.InvoiceValue);
            var importRate = $filter('filter')($scope.lookUpData.currencyList, { Value: CurrencyCode })[0].ImportRate;
            if (IsPercent) {
                var value = (invoiceValue / 100) * parseFloat(AmountPercent);
                $scope.k3.declarationInvoiceK3[AmountValue] = (value * importRate).toFixed(2);
            }
            else {
                $scope.k3.declarationInvoiceK3[AmountValue] = (parseFloat(AmountPercent) * importRate).toFixed(2);
            }
            if (AmountValue == 'PortAmountValue') {
                $scope.k3.declarationInvoiceK3.PortAmountExRate = importRate.toFixed(4);
            }
            if (AmountValue == 'FreightAmountValue') {
                $scope.k3.declarationInvoiceK3.FreightAmountExRate = importRate.toFixed(4);
            }
            if (AmountValue == 'InsuranceAmountValue') {
                $scope.k3.declarationInvoiceK3.InsuranceAmountExRate = importRate.toFixed(4);
            }
            if (AmountValue == 'OthersAmountValue') {
                $scope.k3.declarationInvoiceK3.OthersAmountExRate = importRate.toFixed(4);
            }

        };

        $scope.IncoTermChanged = function () {
            //$scope.k3.declarationInvoiceK3.FreightAmountValue = $scope.k3.declarationInvoiceK3.InsuranceAmountValue = $scope.k3.declarationInvoiceK3.IncoTerm;
            var isFreightCurrency = (angular.isUndefined($scope.k3.declarationInvoiceK3.IsFreightCurrency) ? false : $scope.k3.declarationInvoiceK3.IsFreightCurrency);
            var isInsuranceCurrency = (angular.isUndefined($scope.k3.declarationInvoiceK3.IsInsuranceCurrency) ? false : $scope.k3.declarationInvoiceK3.IsInsuranceCurrency);
            $scope.IncoTermCalculation(isFreightCurrency, isInsuranceCurrency);
        };

        //$scope.IsFreightCurrencyChecked = function (flag) {
        //    $scope.IncoTermCalculation(!flag, $scope.k3.declarationInvoiceK3.IsInsuranceCurrency);
        //};

        //$scope.IsInsuranceCurrencyChecked = function (flag) {
        //    $scope.IncoTermCalculation($scope.k3.declarationInvoiceK3.IsFreightCurrency, !flag);
        //};

        $scope.Calculatepercentageamount = function () {

            if ($scope.k3.declarationInvoiceK3.IsFreightCurrency == true) {

                var Freight = parseFloat($scope.k3.declarationInvoiceK3.FreightAmountPercent);
                if (Freight > 100) {

                    growlService.growl('Freight Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k3.declarationInvoiceK3.FreightAmountPercent = '';
                    $scope.k3.declarationInvoiceK3.FreightAmountValue = 0;
                }

            }

            if ($scope.k3.declarationInvoiceK3.IsInsuranceCurrency == true) {
                var Insurance = parseFloat($scope.k3.declarationInvoiceK3.InsuranceAmountPercent);
                if (Insurance > 100) {

                    growlService.growl('Insurance Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k3.declarationInvoiceK3.InsuranceAmountPercent = '';
                    $scope.k3.declarationInvoiceK3.InsuranceAmountValue = 0;
                }
            }

        }
        /*invoice details and charges info section */
        $scope.CustomDeclarantResults = function (declarantId) {
            return CustomDeclarantService.GetCustomDeclarantAutoComplete(declarantId).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.CustomDeclarantSelected = function (obj) {

            $scope.k3.declarationHeaderK3.DeclarantName = obj.Name;
            $scope.k3.declarationHeaderK3.DeclarantDesignation = obj.Designation;
            $scope.k3.declarationHeaderK3.DeclarantNRIC = obj.NRIC;
            $scope.k3.declarationHeaderK3.DeclarantID = obj.ID;
        };

        $scope.CopyContainer = function (obj) {
            debugger;
            var copyCon = angular.copy(obj);
            if ($scope.k3.declarationContainerK3 != null) {
                copyCon.ContainerNo = null;
                $scope.k3.declarationContainerK3.push(copyCon);

            }
            if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {
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
        $scope.deleteContainer = function (index) {
            debugger;
            $scope.k3.declarationContainerK3.splice(index, 1);
            if ($scope.k3.declarationHeaderK3.DeclarationNo != null && $scope.k3.declarationHeaderK3.DeclarationNo != undefined && $scope.k3.declarationHeaderK3.DeclarationNo != "") {
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

        $scope.validateDates = function () {
            if (!angular.isUndefined($scope.k3) && $scope.k3 != null) {
                if (!angular.isUndefined($scope.k3.declarationInvoiceK3) && $scope.k3.declarationInvoiceK3 != null) {
                    if ($scope.k3.declarationInvoiceK3.InvoiceDate == null) {
                        $scope.k3.declarationInvoiceK3.InvoiceDate = undefined;
                    }
                    else
                        $scope.k3.declarationInvoiceK3.InvoiceDate = moment($scope.k3.declarationInvoiceK3.InvoiceDate);
                }
                if (!angular.isUndefined($scope.k3.declarationHeaderK3) && $scope.k3.declarationHeaderK3 != null) {
                    if ($scope.k3.declarationHeaderK3.OpenDate == null) {
                        $scope.k3.declarationHeaderK3.OpenDate = undefined;
                    }
                    else
                        $scope.k3.declarationHeaderK3.OpenDate = moment($scope.k3.declarationHeaderK3.OpenDate);
                }
                if (!angular.isUndefined($scope.k3.declarationHeaderK3) && $scope.k3.declarationHeaderK3 != null) {
                    if ($scope.k3.declarationHeaderK3.ImportDate == null) {
                        $scope.k3.declarationHeaderK3.ImportDate = undefined;
                    }
                    else
                        $scope.k3.declarationHeaderK3.ImportDate = moment($scope.k3.declarationHeaderK3.ImportDate);
                }
                if (!angular.isUndefined($scope.k3.declarationShipmentK3) && $scope.k3.declarationShipmentK3 != null) {

                    if ($scope.k3.declarationShipmentK3.ETADate == null) {
                        $scope.k3.declarationShipmentK3.ETADate = undefined;
                    }
                    else
                        $scope.k3.declarationShipmentK3.ETADate = moment($scope.k3.declarationShipmentK3.ETADate);
                }
                if (!angular.isUndefined($scope.k3.declarationDocumentsK3) && $scope.k3.declarationDocumentsK3 != null) {
                    if ($scope.k3.declarationDocumentsK3.DocDate == null) {
                        $scope.k3.declarationDocumentsK3.DocDate = undefined;
                    }
                    else
                        $scope.k3.declarationDocumentsK3[index].DocDate = moment($scope.k3.declarationDocumentsK3[index].DocDate).format('YYYY-MM-DD');
                }
                //k3.declarationHeaderK3.SecurityYear

            }
        }


        $scope.init();

        $scope.GenerateReportPDF = function (type) {

            k3Service.GenerateReportPDF($scope.BranchID, declarationNo, type);
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

        $scope.IsCloneBtnDisabled = false;
        $scope.Clonek3 = function (declarationNo) {

            k3Service.CloneDeclaration(declarationNo).then(function (d) {
                $scope.k3 = d.data.declaration;
                if (!angular.isUndefined($scope.k3.declarationHeaderK3.DeclarantID) && $scope.k3.declarationHeaderK3.DeclarantID != "" && $scope.k3.declarationHeaderK3.DeclarantID != null) {
                    $scope.k3.declarationHeaderK3.DeclarantIDText = $scope.k3.declarationHeaderK3.DeclarantIDText;
                }
                $scope.k3.declarationHeaderK3.IsPartial = true;

                $scope.IsCloneBtnDisabled = true;
                $scope.k3.declarationHeaderK3.DeclarationNo = null;
                $scope.k3.declarationHeaderK3.OrderNo = null;
                $scope.IsDeclarationValidated = false;
                $scope.validateDates();

                $scope.customResponseDetails = {};
                $scope.ngTblItemInfo();
                $scope.ngTblContainerInfo();
                $scope.ngTblDocumentsInfo();
                $scope.showLoading = false;
                $scope.IsNew = true;
                $scope.customresponses = null;
                $scope.ediResponse = null;
                $scope.active = 0;
                $scope.validateInputDecimal();
                $scope.k3.declarationHeaderK3.OpenDate = moment();
                $scope.k3.declarationHeaderK3.ImportDate = moment();


                //k3Header
                //InvoiceValue

            }, function (err) { });

        }


        $scope.clear = function () {
            $state.go('k3declaration', { 'declarationNo': '' }, { reload: true });
        };

        $scope.DeclineDeclaration = function (declarationno, orderno) {

            k3Service.DeclineDeclaration(declarationno, orderno).then(function (d) {

                growlService.growl('', 'success');
            });
        }
        $scope.GetDeclartionStatus = function (declarationNo) {

            k3Service.GetDeclartionStatus(declarationNo).then(function (d) {

                $scope.declarationOrderStatus = d.data;
            }, function (err) { });
        };

        $scope.ContainerFileUpload = function (e) {
            if (angular.isUndefined($scope.k3.declarationContainerK3))
                $scope.k3.declarationContainerK3 = new Array();

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

                    $scope.k3.declarationContainerK3.push(obj);
                });

                $timeout(function () {
                    $scope.ngTblContainerInfo();
                }, 500);
            }, function (err) { });
        }
        $scope.CargoFileUpload = function (e) {
            if (angular.isUndefined($scope.k3.declarationItemK3))
                $scope.k3.declarationItemK3 = new Array();

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
                        //ExportDutyExemptionRatePercent: item.DutyRateExemption,
                        //ExportDutySpecificExemptionRatePercent: item.SpecificRateExemption
                        //dff:item.GSTRateExemotion,
                        //sdsf:item.ExerciseDutyRateExemption
                    };
                    $scope.k3.declarationItemK3.push(obj);
                });

                $timeout(function () {
                    $scope.ngTblItemInfo();
                }, 500);
            }, function (err) { });
        }

    }]);

