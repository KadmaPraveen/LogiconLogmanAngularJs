angular.module('LogiCon').controller('k1Cntrl', ['$scope', 'k1Service', 'MerchantProfileService', 'VesselScheduleService', 'PortAreaService', 'CurrencyRateService', 'OrderEntryService', 'VesselMasterService', 'Utility', '$uibModal', 'limitToFilter', 'growlService', '$stateParams', '$timeout', '$state', 'AddressService', 'UtilityFunc', '$filter', 'CustomDeclarantService', 'NgTableParams', '$anchorScroll', '$location', '$window',
    function ($scope, k1Service, MerchantProfileService, VesselScheduleService, PortAreaService, CurrencyRateService, OrderEntryService, VesselMasterService, Utility, $uibModal, limitToFilter, growlService, $stateParams, $timeout, $state, AddressService, UtilityFunc, $filter, CustomDeclarantService, NgTableParams, $anchorScroll, $location, $window) {
        /**/
        $scope.validateInputDecimal = function () {
            $timeout(function () {
                if ($scope.frmk1.InvoiceValue.$viewValue != null) {
                    $scope.frmk1.InvoiceValue.$$runValidators($scope.frmk1.InvoiceValue.$modalValue, $scope.frmk1.InvoiceValue.$viewValue, function () {
                        $scope.frmk1.InvoiceValue.$setViewValue($scope.frmk1.InvoiceValue.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk1.GrossWeight.$viewValue != null) {
                    $scope.frmk1.GrossWeight.$$runValidators($scope.frmk1.GrossWeight.$modalValue, $scope.frmk1.GrossWeight.$viewValue, function () {
                        $scope.frmk1.GrossWeight.$setViewValue($scope.frmk1.GrossWeight.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk1.GrossVolume.$viewValue != null) {
                    $scope.frmk1.GrossVolume.$$runValidators($scope.frmk1.GrossVolume.$modalValue, $scope.frmk1.GrossVolume.$viewValue, function () {
                        $scope.frmk1.GrossVolume.$setViewValue($scope.frmk1.GrossVolume.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk1.PortAmountPercent.$viewValue != null) {
                    $scope.frmk1.PortAmountPercent.$$runValidators($scope.frmk1.PortAmountPercent.$modalValue, $scope.frmk1.PortAmountPercent.$viewValue, function () {
                        $scope.frmk1.PortAmountPercent.$setViewValue($scope.frmk1.PortAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk1.FreightAmountPercent.$viewValue != null) {
                    $scope.frmk1.FreightAmountPercent.$$runValidators($scope.frmk1.FreightAmountPercent.$modalValue, $scope.frmk1.FreightAmountPercent.$viewValue, function () {
                        $scope.frmk1.FreightAmountPercent.$setViewValue($scope.frmk1.FreightAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk1.InsuranceAmountPercent.$viewValue != null) {
                    $scope.frmk1.InsuranceAmountPercent.$$runValidators($scope.frmk1.InsuranceAmountPercent.$modalValue, $scope.frmk1.InsuranceAmountPercent.$viewValue, function () {
                        $scope.frmk1.InsuranceAmountPercent.$setViewValue($scope.frmk1.InsuranceAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk1.OthersAmountPercent.$viewValue != null) {
                    $scope.frmk1.OthersAmountPercent.$$runValidators($scope.frmk1.OthersAmountPercent.$modalValue, $scope.frmk1.OthersAmountPercent.$viewValue, function () {
                        $scope.frmk1.OthersAmountPercent.$setViewValue($scope.frmk1.OthersAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }

            }, 100);
        }

        var declarationNo = $stateParams.declarationNo;
        $scope.init = function () {

            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.timeFormat = UtilityFunc.TimeFormat();
            $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
            $scope.defaultCurrency = UtilityFunc.DefaultCurrency();
            $scope.defaultCountry = UtilityFunc.DefaultCountry();
            $scope.branchID = UtilityFunc.BranchID();
            $scope.customresponses = {};
            $scope.ediresponse = {};
            $scope.customresponseheaderItem = {};
            $scope.IsCustomResponsesShow = false;
            $scope.transportMode = 1021;
            $scope.time = null;
           
            $scope.isConventionalCargo = false;
            $scope.isFromOrderEntry = false;
            $scope.isDeclined = false;
            $scope.IsNew = true;
            $scope.showLoading = true;
            $scope.IsDeclarationValidated = false;
            //$scope.validateInputDecimal();
            $scope.validateClause = function () {

                if ($scope.k1.declarationClauses.ClauseCode == '') {
                    $scope.k1.declarationClauses.ClauseText = '';
                }
            }


            if (declarationNo != "NEW" && declarationNo != "") {
                $scope.IsNew = false;
            }
            else {
                $scope.IsNew = true;
            }
            $scope.declarationOrderStatus = {};

            $scope.k1 = {
                DeclarationShipmentType: 25850,
                OpenDate: moment(),
                declarationContainers: new Array(),
                declarationDocuments: new Array(),
                //declarationClauses: new Array(),
                declarationClauses: {},
                declarationItems: new Array(),
                declarationInvoice: {
                    IsFreightCurrency: false,
                    IsInsuranceCurrency: false,
                    FOBAmount: 0.00,
                    CIFAmount: 0.00,
                    EXWAmount: 0.00,
                    CNFAmount: 0.00,
                    CNIAmount: 0.00,
                    FreightAmount: 0.00,
                    InsuranceAmount: 0.00,
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
                }
            };

            $scope.ic = {};//Invoice Cargo
            $scope.sd = {};//Shipment Details
            $scope.ex = {};//Excemptions
            $scope.con = {};//Container Info
            $scope.doc = {};//Documents
            $scope.cl = {};//Clause
            $scope.ie = {};//item entry
            $scope.ies = {};//item entry subitem

            $scope.dc = {};//declaration container
            if (declarationNo == 'NEW' || declarationNo == "") {
                $scope.k1.TransportMode = 1021;
                $scope.k1.declarationInvoice.LocalCurrencyCode = $scope.defaultCurrency;
                $scope.k1.declarationInvoice.PortAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k1.declarationInvoice.FreightAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k1.declarationInvoice.InsuranceAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k1.declarationInvoice.OthersAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k1.declarationInvoice.PayCountry = $scope.defaultCountry;
            }
            $scope.GetLookUpdata();
            if (!angular.isUndefined(declarationNo) && declarationNo != 'NEW' && declarationNo != "") {
                $scope.GetDeclaration(declarationNo);
            }
            $scope.Activity = {};
            $scope.Activities = new Array();
        };

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
            debugger;
            k1Service.GetDeclaration(declarationNo).then(function (d) {
                debugger;
                $scope.k1 = d.data.declaration;
                $scope.k1.declarationShipment.PlaceOfImportName = $scope.k1.declarationShipment.PlaceOfImport + '-' + $scope.k1.declarationShipment.PlaceOfImportName;
                $scope.k1.DischargePortName = $scope.k1.declarationShipment.PlaceOfImportName;
                $scope.changeShipmentType($scope.k1.ShipmentType);
                if (!$scope.k1.IsPartial)
                    $scope.IsDeclarationValidated = true;

                //if (!angular.isUndefined($scope.k1.DeclarantID) && $scope.k1.DeclarantID != null && $scope.k1.DeclarantID != '') {
                //    $scope.k1.DeclarantIDText = $scope.k1.DeclarantID + " - " + $scope.k1.DeclarantName + " - " + $scope.k1.DeclarantNRIC;
                //}

                if (!angular.isUndefined($scope.k1.DeclarantID) && $scope.k1.DeclarantID != "" && $scope.k1.DeclarantID != null) {
                    $scope.k1.DeclarantIDText = $scope.k1.DeclarantID;

                    if (!angular.isUndefined($scope.k1.DeclarantName) && $scope.k1.DeclarantName != "" && $scope.k1.DeclarantName != null) {
                        $scope.k1.DeclarantIDText += " - " + $scope.k1.DeclarantName;
                    }

                    if (!angular.isUndefined($scope.k1.DeclarantNRIC) && $scope.k1.DeclarantNRIC != "" && $scope.k1.DeclarantNRIC != null) {
                        $scope.k1.DeclarantIDText += " - " + $scope.k1.DeclarantNRIC;
                    }
                }
                $scope.IsCustomResponsesShow = true;

                $scope.GetCustomResponse(declarationNo);
                if (!angular.isUndefined($scope.k1.OrderNo) && $scope.k1.OrderNo != null && $scope.k1.OrderNo != '')
                    $scope.GetDeclarationStatus(declarationNo, $scope.k1.OrderNo);
                $scope.BindAddress(d.data.declaration.ShippingAgent, 'ShippingAgentAddress');
                $scope.Cntrl.activityList = d.data.activityList;
                $scope.ngTblItemEntry();
                $scope.ngTblContainerInfo();
                $scope.ngTblDocuments();
                $scope.validateDates();
                $scope.validateInputDecimal();
                //   $scope.GenearateK1FromK8();
                $scope.GetSubmitToCustomsVisibility();
            }, function (err) { });
        };

        $scope.GetSubmitToCustomsVisibility = function () {
            OrderEntryService.SubmitToCustomsVisibility($scope.k1.DeclarationNo, 9101).then(function (d) {
                $scope.k1.SubmitToCustomsVisiblity = d.data;
            }, function (err) { });
        };

        $scope.SubmitToCustomsValidation = function () {
            if (!angular.isUndefined($scope.k1) && !angular.isUndefined($scope.k1.SubmitToCustomsVisiblity) && !angular.isUndefined($scope.k1.SubmitToCustomsVisiblity.IsApproveDeclaration) && $scope.k1.SubmitToCustomsVisiblity.IsApproveDeclaration) {
                return $scope.k1.SubmitToCustomsVisiblity.IsApproved;
            } else
                return true;
        };

        $scope.GetDeclarationStatus = function (declarationNo, orderNo) {

            k1Service.GetDeclarationStatus(declarationNo, orderNo).then(function (d) {
                $scope.isDeclined = false;
                $scope.IsCloneBtnDisabled = false;
                if (d.data != null) {
                    $scope.declarationOrderStatus = d.data;
                    $scope.isFromOrderEntry = true;
                    if ($scope.declarationOrderStatus.Status == "Declaration Declined") {
                        $scope.isDeclined = true;
                        $scope.IsCloneBtnDisabled = true;
                    }
                    else
                        $scope.isDeclined = false;
                }
            }, function (err) {
            });
        }
        $scope.itemEntryIndex = -1;
        $scope.ngTblItemEntry = function () {
            if ($scope.k1.declarationItems == null)
                $scope.k1.declarationItems = new Array();
            $scope.tableSorting = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                    total: $scope.k1.declarationItems.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.k1.declarationItems, params.orderBy()) : $scope.k1.declarationItems;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope.itemEntryIndex = (params.page() - 1) * params.count();
                    }
                })
        };

        $scope.containerInfoIndex = -1;
        $scope.ngTblContainerInfo = function () {

            if ($scope.k1.declarationContainers == null)
                $scope.k1.declarationContainers = new Array();
            $scope.tblContainerInfo = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                    total: $scope.k1.declarationContainers.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.k1.declarationContainers, params.orderBy()) : $scope.k1.declarationContainers;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope.containerInfoIndex = (params.page() - 1) * params.count();
                    }
                });

        };

        $scope.documentsIndex = -1;
        $scope.ngTblDocuments = function () {
            if ($scope.k1.declarationDocuments == null)
                $scope.k1.declarationDocuments = new Array();
            $scope.tblDocuments = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'


                }
            }, {
                    total: $scope.k1.declarationDocuments.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.k1.declarationDocuments, params.orderBy()) : $scope.k1.declarationDocuments;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope.documentsIndex = (params.page() - 1) * params.count();
                    }
                })
        };

        $scope.currentPage = 1;
        $scope.limit = 10;

        $scope.tableData = {};
        $scope.GetTableData = function (skip, limit) {
            $scope.tableData = $scope.k1.declarationItems.slice(skip, skip + limit);
            $scope.totalItems = $scope.k1.declarationItems.length;
        };

        $scope.pageChanged = function () {
            $scope.skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
            $scope.GetTableData($scope.skip, $scope.limit);
        };

        $scope.LoadSMKCode = function (TransType) {
            var obj = $filter('filter')($scope.lookUpData.K1ATransactionTypeList, { Value: TransType })[0];
            //$scope.k2.TransactionTypeCode = $filter('filter')($scope.lookUpData.K2ATransactionTypeList, { Value: $scope.k2.TransType })[0].Text;
            $scope.k1.TransactionTypeDescription = obj.Text;
            $scope.k1.TransactionTypeCode = obj.Code;
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

        $scope.GetLookUpdata = function () {
            k1Service.GetLookupData().then(function (d) {
                $scope.lookUpData = d.data;


                var transactionTypeCodeObj = $filter('filter')($scope.lookUpData.K1ATransactionTypeList, { Value: $scope.k1.TransactionType })[0];
                if (transactionTypeCodeObj != null)
                    $scope.k1.TransactionTypeCode = $filter('filter')($scope.lookUpData.K1ATransactionTypeList, { Value: $scope.k1.TransactionType })[0].Code;

                $scope.CurrencyRateChanged();
                $scope.showLoading = false;
            }, function (err) { });
        };

        //OrderEntryService.GetTerminalList().then(function (d) {
        //    $scope.terminalList = d.data.terminalList;
        //}, function (err) { });

        $scope.PortOperatorResults = function (text) {
            var operatortype = 26220;
            return OrderEntryService.operatorList(operatortype, text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };
        $scope.TerminalOperaterSelected = function (item) {

            $scope.k1.declarationShipment.PortOperator = item.Value;
        };

        $scope.PayCountryChanged = function (item, type) {
            $scope.k1.declarationInvoice[type] = item.text;
        };

        $scope.GenericMerchantResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.ChangeTransportMode = function (TransportMode) {

            $scope.transportMode = TransportMode;
            if ($scope.k1.TransportMode == 1020 || $scope.k1.TransportMode == 1024 || $scope.k1.TransportMode == 1025 || $scope.k1.ShipmentType == 26533 || $scope.k1.ShipmentType == 26531) {
                $scope.isConventionalCargo = true;
                $scope.k1.declarationContainers = null;
            }
            else {

                $scope.isConventionalCargo = false;
                if (angular.isUndefined($scope.k1.declarationContainers))
                    $scope.k1.declarationContainers = new Array();
            }
            $scope.k1.declarationShipment.VesselScheduleID = null;
            $scope.k1.declarationShipment.VoyageNo = null;
            $scope.k1.declarationShipment.SCNNo = null;
            $scope.k1.declarationShipment.VesselID = null;
            $scope.k1.declarationShipment.VesselName = null;
            $scope.k1.declarationShipment.ETADate = undefined;
            $scope.k1.declarationShipment.ManifestNo = null;
            $scope.k1.declarationShipment.OceanBLNo = null;
            $scope.k1.declarationShipment.HouseBLNo = null;
            $scope.k1.declarationShipment.WagonNo = null;
            $scope.k1.declarationShipment.VehicleNo1 = null;
            $scope.k1.declarationShipment.VehicleNo2 = null;
            $scope.k1.declarationShipment.FlightNo = null;
            $scope.k1.declarationShipment.ARNNo = null;
            $scope.k1.declarationShipment.MasterAWBNo = null;
            $scope.k1.declarationShipment.HouseAWBNo = null;
            $scope.k1.declarationShipment.AIRCOLoadNo = null;
            $scope.k1.declarationShipment.JKNo = null;
        };

        $scope.changeShipmentType = function (ShipmentType) {

            if ($scope.k1.ShipmentType == 26533 || $scope.k1.ShipmentType == 26531 || $scope.k1.TransportMode == 1020 || $scope.k1.TransportMode == 1024 || $scope.k1.TransportMode == 1025) {
                $scope.isConventionalCargo = true;
                $scope.k1.declarationContainers = null;
            }
            else {

                $scope.isConventionalCargo = false;
                if (angular.isUndefined($scope.k1.declarationContainers))
                    $scope.k1.declarationContainers = new Array();
            }
        };

        $scope.GenericMerchantResults = function (text, filter, type) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                if (d.data.length == 0)
                    $scope.k1[type] = '';
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

        $scope.ClaimantNameResults = function (text) {
            return k1Service.ClaimantNameResults(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) {
            })
        }

        $scope.ValidateClaimantDetails = function () {
            if ($scope.k1.declarationExcemption.ClaimantName == null || angular.isUndefined($scope.k1.declarationExcemption.ClaimantName)) {
                $scope.k1.declarationExcemption.ClaimantID = null;
                $scope.k1.declarationExcemption.ClaimantCompany = null;
                $scope.k1.declarationExcemption.ClaimantNRIC = null;
                $scope.k1.declarationExcemption.ClaimantDesignation = null;
                $scope.k1.declarationExcemption.ClaimantStatus = null
            }
        }

        $scope.ClaimantNameSelected = function (item) {
            $scope.k1.declarationExcemption.ClaimantID = item.ID;
            $scope.k1.declarationExcemption.ClaimantCompany = item.CompanyName;
            $scope.k1.declarationExcemption.ClaimantNRIC = item.NRIC;
            $scope.k1.declarationExcemption.ClaimantDesignation = item.Designation;
            $scope.k1.declarationExcemption.ClaimantStatus = item.Status;
        }

        $scope.VoyageSelected = function (item) {
            $scope.k1.declarationShipment.VesselScheduleID = item.VesselScheduleID;
            $scope.k1.declarationShipment.VoyageNo = item.VoyageNoInWard;
            $scope.k1.declarationShipment.SCNNo = item.ShipCallNo;
            $scope.k1.declarationShipment.VesselID = item.VesselID;
            $scope.k1.declarationShipment.VesselName = item.VesselName;
            $scope.k1.declarationShipment.ETADate = item.ETA;
            if (!angular.isUndefined($scope.k1.declarationShipment) && $scope.k1.declarationShipment != null) {

                if ($scope.k1.declarationShipment.ETADate == null) {
                    $scope.k1.declarationShipment.ETADate = undefined;
                }
                else
                    $scope.k1.declarationShipment.ETADate = moment($scope.k1.declarationShipment.ETADate);
            }
        };

        $scope.MerchantSelected = function (item, Type) {
            $scope.k1[Type] = item.Value
        };

        $scope.PortAutoComplete = function (text) {
            return PortAreaService.PortAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.PortSelected = function (item, type) {
            debugger;
            $scope.k1.declarationShipment[type] = item.PortCode;
            if (type == 'PlaceOfImport') {
                $scope.k1.DischargePortName = $scope.k1.declarationShipment.PlaceOfImportName;
                $scope.k1.declarationShipment['DischargePort'] = item.PortCode;
            }
        };

        $scope.exRateChanged = function (currencyCode, field) {
            $scope.showLoading = true;
            CurrencyRateService.GetExRate($scope.k1.declarationInvoice[currencyCode]).then(function (d) {
                $scope.k1.declarationInvoice[field] = d.data;
                $scope.showLoading = false;
            }, function (err) { });
        };

        $scope.TransactionType = function (item, field) {
            $scope.k1[field] = item.Code;
        };

        $scope.sizeChanged = function () {
            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
                $scope.showLoading = false;
            }, function () { })
        };

        $scope.AddDeclarationContainer = function () {
            $scope.k1.declarationContainers.push($scope.dc);
            $scope.dc = {};
        };





        /*shipment details*/
        $scope.VesselNameResults = function (text) {
            return VesselMasterService.GetVesselByVesselName(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.vesselNameClick = function (obj) {
            $scope.k1.declarationShipment.VesselID = obj.Value;
        };

        $scope.MerchantSelected2 = function (item, Type) {
            $scope.k1.declarationShipment[Type] = item.Value
        };

        $scope.editContainer = function (index) {
            $scope.showLoading = true;
            $scope.dc = $scope.k1.declarationContainers[index];
            $scope.sizeChanged();
            $timeout(function () { $scope.showLoading = false; }, 500);
        };

        $scope.deleteContainer = function (index) {
            $scope.k1.declarationContainers.splice(index, 1);
            if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
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
                $scope.k1.declarationDocuments[documentIndex] = $scope.doc;
            } else {
                $scope.k1.declarationDocuments.push($scope.doc);
            }
            $scope.doc = {};
            $scope.isEditDoc = false;
            documentIndex = -1;
        };

        $scope.isEditDoc = false;

        var DocIndex = -1;
        $scope.editDocument = function (index) {
            if ($scope.k1.declarationDocuments == null)
                $scope.k1.declarationDocuments = new Array();
            DocIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k1/document.html?v=' + Utility.Version,
                controller: 'AddEditk1DocumentCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            Document: (DocIndex == -1 ? {} : $scope.k1.declarationDocuments[index]),
                            docDateTypeList: $scope.lookUpData.docDateTypeList,
                            OGACodeList: $scope.lookUpData.OGACodeList,
                            customStationCodeList: $scope.lookUpData.smkList,
                            supportingDocumentTypeList: $scope.lookUpData.SupportingDocumentTypeList,
                            declarationDocuments: $scope.k1.declarationDocuments,
                            countryList: $scope.lookUpData.countryList,
                            OGABranchlist: $scope.lookUpData.OGABranchlist
                        };
                    }
                }
            });

            modalInstance.result.then(function (res) {

                if (DocIndex != -1)
                    $scope.k1.declarationDocuments[DocIndex] = res;
                else {
                    if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
                        var obj = { ActivityCode: 1030 };
                        $scope.Activities.push(obj);
                    }
                    $scope.k1.declarationDocuments.push(res);
                }
                $scope.ngTblDocuments();
                DocIndex = -1;
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };


        $scope.deleteDocument = function (index) {
            $scope.showLoading = true;
            $scope.k1.declarationDocuments.splice(index, 1);
            if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
                var obj = { ActivityCode: 1031 };
                $scope.Activities.push(obj);
            }
            $timeout(function () { $scope.showLoading = false; }, 500);
            $scope.doc = {};

            $scope.ngTblDocuments();
        };

        $scope.AddDeclarationClause = function () {
            if ($scope.isEditClause) {
                $scope.k1.declarationClauses[clauseIndex] = $scope.cl;
            } else {
                $scope.k1.declarationClauses.push($scope.cl);
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
        //    $scope.cl = $scope.k1.declarationClauses[index];
        //    $timeout(function () { $scope.showLoading = false; }, 500);
        //};

        $scope.deleteClause = function (index) {
            $scope.showLoading = true;
            $scope.k1.declarationClauses.splice(index, 1);
            $timeout(function () { $scope.showLoading = false; }, 500);
            $scope.cl = {};
        };

        var clauseIndex = -1;
        $scope.editClause = function (index) {
            clauseIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k1/clause.html?v=' + Utility.Version,
                controller: 'AddEditk1ClauseCntrl',
                size: 'md',
                resolve: {
                    dataObj: function () {
                        return {
                            Clause: (clauseIndex == -1 ? {} : $scope.k1.declarationClauses[index]),
                            clauseTypeList: $scope.lookUpData.clauseTypeList
                        };
                    }
                }
            });

            modalInstance.result.then(function (res) {
                if (clauseIndex != -1)
                    $scope.k1.declarationClauses[clauseIndex] = res;
                else
                    $scope.k1.declarationClauses.push(res);

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

            if ($scope.k1.declarationInvoice != null) {
                //if ($scope.k1.declarationItem.CIFCAmount)
                //    _CIFC = $scope.k1.declarationItem.CIFCAmount;//k1.declarationInvoice.PortAmountPercent

                //if ($scope.k1.declarationInvoice.FOBAmount)
                //    _FOB = $scope.k1.declarationInvoice.FOBAmount;

                //if ($scope.k1.declarationInvoice.CIFAmount)
                //    _CIF = $scope.k1.declarationInvoice.CIFAmount;

                //if ($scope.k1.declarationInvoice.EXWAmount)
                //    _EXW = $scope.k1.declarationInvoice.EXWAmount;

                //if ($scope.k1.declarationInvoice.CNFAmount)
                //    _CNF = $scope.k1.declarationInvoice.CNFAmount;

                //if ($scope.k1.declarationInvoice.CNIAmount)
                //    _CNI = $scope.k1.declarationInvoice.CNIAmount;

                if ($scope.k1.declarationInvoice.FreightAmountPercent)
                    _Freight = $scope.k1.declarationInvoice.FreightAmountPercent;

                if ($scope.k1.declarationInvoice.InsuranceAmountPercent)
                    _insurance = $scope.k1.declarationInvoice.InsuranceAmountPercent;

            }

            //if ($scope.k1.declarationInvoice != null && $scope.k1.declarationInvoice.CIFCAmount)
            //    _CIFC = $scope.k1.declarationInvoice.CIFCAmount;

            var _InvoiceCurrency = $scope.k1.declarationInvoice.InvoiceCurrencyCode;
            var _invoiceCurrencyRate = $filter('filter')($scope.lookUpData.currencyList, { Text: $scope.k1.declarationInvoice.InvoiceCurrencyCode })[0].ImportRate;

            var _isFreightCurrency = (angular.isUndefined($scope.k1.declarationInvoice.IsFreightCurrency) ? false : $scope.k1.declarationInvoice.IsFreightCurrency);
            var _isInsuranceCurrency = (angular.isUndefined($scope.k1.declarationInvoice.IsInsuranceCurrency) ? false : $scope.k1.declarationInvoice.IsInsuranceCurrency);
            var _incoTerm = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.IncoTerm) || $scope.k1.declarationInvoice.IncoTerm == null ? 0 : $scope.k1.declarationInvoice.IncoTerm);
            var _port = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.PortAmountPercent) || $scope.k1.declarationInvoice.PortAmountPercent == null ? 0 : $scope.k1.declarationInvoice.PortAmountPercent);
            var _otherCharges = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.OthersAmountPercent) || $scope.k1.declarationInvoice.OthersAmountPercent == null ? 0 : $scope.k1.declarationInvoice.OthersAmountPercent);

            itemEntryIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k1/item-entry.html?v=' + Utility.Version,
                controller: 'AddEditItemEntryCntrl',
                windowClass: 'app-modal-window4',
                resolve: {
                    dataObj: function () {
                        return {
                            itemEntry: (itemEntryIndex == -1 ? {} : $scope.k1.declarationItems[index]),
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

                if (res.declarationsubItems != undefined) {
                    res.declarationsubItems = $.map(res.declarationsubItems, function (el) { return el });
                }

                if (itemEntryIndex != -1) {
                    if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
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
                    $scope.k1.declarationItems[itemEntryIndex] = res;
                }
                else {
                    if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
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
                    $scope.k1.declarationItems.push(res);
                }


                itemEntryIndex = -1;

                $scope.ngTblItemEntry();

            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };

        $scope.deleteItem = function (index) {
            $scope.k1.declarationItems.splice(index, 1);
            if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
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
            if ($scope.k1.declarationItems != null) {
                $scope.k1.declarationItems.push(copyItemEntry);
            }
            if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
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

        $scope.active = 0;

        $scope.btncustom = false;
        $scope.GenerateFile = function (k1) {
            if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.CheckSubItems(k1) && $scope.CheckContainerNos(k1)) {
                $scope.btncustom = true;
                k1.ApprovedOn = moment();
                k1Service.GenerateFile(k1).then(function (d) {
                    /*Activity Save*/
                    var arr = new Array();
                    angular.forEach($scope.Activities, function (obj, i) {
                        debugger;
                        var obj = {
                            // LinkDocumentNo: d.data.orderNo,
                            TransactionNo: k1.DeclarationNo,
                            ActivityCode: obj.ActivityCode
                        }
                        arr.push(obj);
                    });

                    k1Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/

                    $scope.btncustom = false;
                    $scope.customresponses = d.data.customResponse;
                    $scope.ediresponse = d.data.ediResponse;
                    $scope.ammendantsResponse = d.data.ammendantsResponse;
                    $scope.dutyAmountlist = d.data.dutyAmountlist;
                    growlService.growl('Submitted to Customs successfully..!', 'success');
                    //   $scope.validateInputDecimal();
                    $timeout(function () {
                        $scope.active = 8;
                    }, 500);
                }, function (err) { });
            }
        };

        $scope.back = function () {
            $state.go('k1inquiry', {});
        };

        $scope.clear = function () {

            $state.go('k1declaration', { 'declarationNo': '' }, { reload: true });
        };

        $scope.refersh = function () {
            $location.path('/declaration/k1inquiry');
            $route.reload();
        }

        $scope.isFrmK1Valid = false;
        $scope.$watch('frmk1.$valid', function (isValid) {
            $scope.isFrmK1Valid = isValid;
        });

        $scope.ValidatePorts = function () {
            if ($scope.k1.TransportMode == 1021) {
                if ($scope.k1.declarationShipment != undefined) {
                    if (($scope.k1.declarationShipment.LoadingPort != undefined && $scope.k1.declarationShipment.LoadingPort != '' && $scope.k1.declarationShipment.DischargePort != undefined && $scope.k1.declarationShipment.DischargePort != '') && $scope.k1.declarationShipment.LoadingPort == $scope.k1.declarationShipment.DischargePort) {
                        growlService.growl('Loading Port and Discharge Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k1.declarationShipment.LoadingPort != undefined && $scope.k1.declarationShipment.LoadingPort != '' && $scope.k1.declarationShipment.TranshipmentPort != undefined && $scope.k1.declarationShipment.TranshipmentPort != '') && $scope.k1.declarationShipment.LoadingPort == $scope.k1.declarationShipment.TranshipmentPort) {
                        growlService.growl('Loading Port and Transhipment Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k1.declarationShipment.TranshipmentPort != undefined && $scope.k1.declarationShipment.TranshipmentPort != '' && $scope.k1.declarationShipment.DischargePort != undefined && $scope.k1.declarationShipment.DischargePort != '') && $scope.k1.declarationShipment.DischargePort == $scope.k1.declarationShipment.TranshipmentPort) {
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
                if ($scope.k1.declarationContainers.length == 0) {
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

            if ($scope.k1.declarationItems.length == 0) {
                growlService.growl('Atleast one item entry is required', 'danger');
                return false;
            }
            else
                return true;
        };

        $scope.ValidatePartialSave = function () {
            if ($scope.k1.ImportDate == undefined || $scope.k1.ImportDate == '') {
                growlService.growl('please select Import Date', 'danger');
                return false;
            }
            else if ($scope.k1.TransportMode == undefined || $scope.k1.TransportMode == '') {
                growlService.growl('please select Transport Mode', 'danger');
                return false;
            }
            else if ($scope.k1.ShipmentType == undefined || $scope.k1.ShipmentType == '') {
                growlService.growl('please select Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k1.CustomerReferenceNo == undefined || $scope.k1.CustomerReferenceNo == '') {
                growlService.growl('please enter Reference No/Job No', 'danger');
                return false;
            }
            else if ($scope.k1.DeclarationShipmentType == undefined || $scope.k1.DeclarationShipmentType == '') {
                growlService.growl('please select Declaration Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k1.TransactionType == undefined || $scope.k1.TransactionType == '') {
                growlService.growl('please select SMK Transaction Type', 'danger');
                return false;
            }
            else
                return true;
        };

        $scope.Savek1Declaration = function (k1) {

            if ($scope.isFrmK1Valid) {

                $scope.changeShipmentType($scope.k1.ShipmentType);
                if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.CheckSubItems(k1) && $scope.CheckContainerNos(k1)) {

                    $scope.showLoading = true;

                    //Commented by Prasad, Handled in API
                    //if ($scope.isConventionalCargo) {
                    //    $scope.k1.declarationContainers = null;
                    //}

                    $scope.k1.IsPartial = false;
                    if (($scope.k1.DeclarationNo == null || $scope.k1.DeclarationNo == undefined || $scope.k1.DeclarationNo == "") && !$scope.k1.IsPartial) {

                        var obj = { ActivityCode: 1021 };
                        $scope.Activities.push(obj);
                        var obj = { ActivityCode: 1022 };
                        $scope.Activities.push(obj);
                    }
                    else {

                        var obj = { ActivityCode: 1022 };
                        $scope.Activities.push(obj);

                    }
                    k1Service.Savek1Declaration(k1).then(function (d) {
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

                        k1Service.SaveActivityStatus(arr).then(function (test) {
                            debugger;
                            arr = new Array();
                            $scope.Activities = new Array();
                        });
                        /*Activity Save*/
                        if (d.data != "The ContainerNo field is required.") {
                            $scope.showLoading = false;

                            growlService.growl('Declaration Saved Successfully..', 'success');

                            $scope.k1.DeclarationNo = d.data.declarationNo;
                            $scope.k1.OrderNo = d.data.orderNo;
                            //k1Service.GetDeclaration($scope.k1.DeclarationNo);
                            $state.go('k1declaration', { 'declarationNo': d.data.declarationNo });
                            $scope.IsDeclarationValidated = true;
                        }
                        else {
                            growlService.growl('The ContainerNo field is required...', 'danger');
                        }
                    }, function (err) { });
                }
            } else {
                var error = $scope.frmk1.$error;
                angular.forEach(error.required, function (field) {
                    if (field.$invalid) {
                        var fieldName = field.$name;
                    }
                });
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };

        $scope.CheckContainerNos = function (obj) {
            $scope.retVal = false;
            angular.forEach(obj.declarationContainers, function (item, value) {
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

        $scope.CheckSubItems = function (obj) {
            $scope.retVal = false;
            $scope.docVal = false;
            angular.forEach(obj.declarationItems, function (item, value) {
                angular.forEach(item.declarationsubItems, function (subItem, subValue) {
                    if (subItem.ItemType == 'TE' || subItem.ItemType == 'PM') {
                        $scope.retVal = true;
                    }
                });
            });
            angular.forEach(obj.declarationDocuments, function (item, value) {
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

        $scope.Savek1DeclarationPartial = function (k1) {

            // var res = $scope.CheckSubItems(k1);

            $scope.changeShipmentType($scope.k1.ShipmentType);
            if ($scope.ValidatePartialSave() && $scope.ValidatePorts() && $scope.CheckSubItems(k1) && $scope.CheckContainerNos(k1)) {

                $scope.showLoading = true;

                //if ($scope.isConventionalCargo) {
                //    $scope.k1.declarationContainers = null;
                //}

                $scope.k1.IsPartial = $scope.k1.IsPartial == false ? $scope.k1.IsPartial : true;
                debugger;
                if (($scope.k1.DeclarationNo == null || $scope.k1.DeclarationNo == undefined || $scope.k1.DeclarationNo == "") && $scope.k1.IsPartial) {
                    var obj = { ActivityCode: 1021 };
                    $scope.Activities.push(obj);
                }
                k1Service.Savek1Declaration($scope.k1).then(function (d) {
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

                    k1Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/
                    if (d.data != "The ContainerNo field is required.") {
                        $scope.showLoading = false;
                        growlService.growl('Declaration ' + d.data.declarationNo + ' Saved Partially..', 'success');

                        $scope.k1.DeclarationNo = d.data.declarationNo;
                        $scope.k1.OrderNo = d.data.orderNo;

                        k1Service.GetDeclaration($scope.k1.DeclarationNo);
                    }
                    else {
                        growlService.growl('The ContainerNo field is required...', 'danger');
                    }
                }, function (err) { });
            }
        };

        $scope.DeclineDeclaration = function (declarationNo, orderNo) {
            if ($window.confirm('Are you sure, you want to decline')) {
                k1Service.DeclineDeclaration(declarationNo, orderNo).then(function (d) {
                    growlService.growl('Declaration Declined', 'success');
                }, function (err) {

                });
            }
        }

        $scope.CustomerSelected = function (item, type, addresstype) {
            $scope.showLoading = true;
            var html = '';
            $scope.k1[type] = item.Value;
            $scope.k1[addresstype] = '';

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
                $scope.k1[addresstype] = html.toUpperCase();
                $scope.showLoading = false;
            }, function (err) { });
        };

        var conInfoIndex = -1;
        $scope.editConInfo = function (index) {
            conInfoIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k1/container-info.html?v=' + Utility.Version,
                controller: 'AddEditContainerInfoCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            dc: (conInfoIndex == -1 ? {} : $scope.k1.declarationContainers[conInfoIndex]),
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
                if ($scope.k1.declarationContainers == null)
                    $scope.k1.declarationContainers = new Array();

                if (conInfoIndex != -1) {
                    $scope.k1.declarationContainers[conInfoIndex] = res;
                    if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
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
                    $scope.k1.declarationContainers.push(res);
                    if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
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

                conInfoIndex = -1;

                $scope.ngTblContainerInfo();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };
        $scope.CopyContainer = function (obj) {
            var copyCon = angular.copy(obj);
            if ($scope.k1.declarationContainers != null) {
                copyCon.ContainerNo = '';
                $scope.k1.declarationContainers.push(copyCon);
            }
            if ($scope.k1.DeclarationNo != null && $scope.k1.DeclarationNo != undefined && $scope.k1.DeclarationNo != "") {
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

        $scope.GenerateReportPDF = function (type) {
            k1Service.GenerateReportPDF($scope.branchID, declarationNo, type);
        };

        $scope.changeExemptionType = function () {

            if ($scope.k1.declarationExcemption.TreasuryExcemptionType != 10307 || $scope.k1.declarationExcemption.TreasuryExcemptionType != 10308 || $scope.k1.declarationExcemption.TreasuryExcemptionType != 10309) {
                $scope.k1.declarationExcemption.ExcemptionDate = null
            }
            if ($scope.k1.declarationExcemption.TreasuryExcemptionType != 10301 || $scope.k1.declarationExcemption.TreasuryExcemptionType != 10302 || $scope.k1.declarationExcemption.TreasuryExcemptionType != 10303 || $scope.k1.declarationExcemption.TreasuryExcemptionType != 10304) {
                $scope.k1.declarationExcemption.Country = null
            }
        }

        $scope.CurrencyRateChanged = function () {

            var invoiceValue = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.InvoiceValue) || $scope.k1.declarationInvoice.InvoiceValue == null ? 0 : $scope.k1.declarationInvoice.InvoiceValue);
            var importRate = $filter('filter')($scope.lookUpData.currencyList, { Value: $scope.k1.declarationInvoice.InvoiceCurrencyCode })[0].ImportRate;
            $scope.k1.declarationInvoice.InvoiceLocalAmount = (invoiceValue * importRate).toFixed(2);


            //$scope.k1.declarationInvoice.FreightAmountCurrencyCode = $scope.k1.declarationInvoice.InvoiceCurrencyCode;
            //$scope.k1.declarationInvoice.InsuranceAmountCurrencyCode = $scope.k1.declarationInvoice.InvoiceCurrencyCode;
            /*
            commented by vijay
            */
            $scope.k1.declarationInvoice.CurrencyExRate = importRate.toFixed(4);
            //$scope.k1.declarationInvoice.FreightAmountExRate = importRate.toFixed(4);
            //$scope.k1.declarationInvoice.InsuranceAmountExRate = importRate.toFixed(4);

        };

        $scope.ChargesInfoCurrencyRateChanged = function (AmountPercent, IsPercent, CurrencyCode, AmountValue) {


            var invoiceValue = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.InvoiceValue) || $scope.k1.declarationInvoice.InvoiceValue == null ? 0 : $scope.k1.declarationInvoice.InvoiceValue);
            var importRate = $filter('filter')($scope.lookUpData.currencyList, { Value: CurrencyCode })[0].ImportRate;
            if (IsPercent) {
                var value = (invoiceValue / 100) * parseFloat(AmountPercent);
                $scope.k1.declarationInvoice[AmountValue] = (value * importRate).toFixed(2);
            }
            else {
                $scope.k1.declarationInvoice[AmountValue] = (parseFloat(AmountPercent) * importRate).toFixed(2);
            }
            if (AmountValue == 'PortAmountValue') {
                $scope.k1.declarationInvoice.PortAmountExRate = importRate.toFixed(4);
            }
            if (AmountValue == 'FreightAmountValue') {
                $scope.k1.declarationInvoice.FreightAmountExRate = importRate.toFixed(4);
            }
            if (AmountValue == 'InsuranceAmountValue') {
                $scope.k1.declarationInvoice.InsuranceAmountExRate = importRate.toFixed(4);
            }
            if (AmountValue == 'OthersAmountValue') {
                $scope.k1.declarationInvoice.OthersAmountExRate = importRate.toFixed(4);
            }

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
                            branchID: $scope.branchID,
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

        $scope.IncoTermChanged = function () {
            //$scope.k1.declarationInvoice.FreightAmountValue = $scope.k1.declarationInvoice.InsuranceAmountValue = $scope.k1.declarationInvoice.IncoTerm;
            var isFreightCurrency = (angular.isUndefined($scope.k1.declarationInvoice.IsFreightCurrency) ? false : $scope.k1.declarationInvoice.IsFreightCurrency);
            var isInsuranceCurrency = (angular.isUndefined($scope.k1.declarationInvoice.IsInsuranceCurrency) ? false : $scope.k1.declarationInvoice.IsInsuranceCurrency);
            $scope.IncoTermCalculation(isFreightCurrency, isInsuranceCurrency);
        };

        //$scope.IsFreightCurrencyChecked = function (flag) {
        //    $scope.IncoTermCalculation(!flag, $scope.k1.declarationInvoice.IsInsuranceCurrency);
        //};

        //$scope.IsInsuranceCurrencyChecked = function (flag) {
        //    $scope.IncoTermCalculation($scope.k1.declarationInvoice.IsFreightCurrency, !flag);
        //};
        $scope.IncoTermCalculation = function (IsFreightCurrency, IsInsuranceCurrency) {
            var incoTerm = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.IncoTerm) || $scope.k1.declarationInvoice.IncoTerm == null ? 0 : $scope.k1.declarationInvoice.IncoTerm);
            var freight = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.FreightAmountPercent) || $scope.k1.declarationInvoice.FreightAmountPercent == null ? 0 : $scope.k1.declarationInvoice.FreightAmountPercent);
            var insurance = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.InsuranceAmountPercent) || $scope.k1.declarationInvoice.InsuranceAmountPercent == null ? 0 : $scope.k1.declarationInvoice.InsuranceAmountPercent);
            var port = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.PortAmountPercent) || $scope.k1.declarationInvoice.PortAmountPercent == null ? 0 : $scope.k1.declarationInvoice.PortAmountPercent);
            var otherCharges = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.OthersAmountPercent) || $scope.k1.declarationInvoice.OthersAmountPercent == null ? 0 : $scope.k1.declarationInvoice.OthersAmountPercent);
            var invoiceValue = parseFloat(angular.isUndefined($scope.k1.declarationInvoice.InvoiceLocalAmount) || $scope.k1.declarationInvoice.InvoiceLocalAmount == null ? 0 : $scope.k1.declarationInvoice.InvoiceLocalAmount);

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
                FOB: $scope.k1.declarationInvoice.FOBAmount,
                CIF: $scope.k1.declarationInvoice.CIFAmount,
                EXW: $scope.k1.declarationInvoice.EXWAmount,
                CNF: $scope.k1.declarationInvoice.CNFAmount,
                CNI: $scope.k1.declarationInvoice.CNIAmount,
                IsFreightCurrency: IsFreightCurrency,
                IsInsuranceCurrency: IsInsuranceCurrency
            };


            $scope.showLoading = true;
            k1Service.OutPutFOBCIF(obj).then(function (d) {
                $scope.k1.declarationInvoice.FOBAmount = d.data.FOB.toFixed(2);
                $scope.k1.declarationInvoice.CIFAmount = d.data.CIF.toFixed(2);
                $scope.k1.declarationInvoice.EXWAmount = d.data.EXW.toFixed(2);
                $scope.k1.declarationInvoice.CNFAmount = d.data.CNF.toFixed(2);
                $scope.k1.declarationInvoice.CNIAmount = d.data.CNI.toFixed(2);
                $scope.k1.declarationInvoice.FreightAmount = d.data.freight.toFixed(2);
                $scope.k1.declarationInvoice.InsuranceAmount = d.data.insurance.toFixed(2);
                $scope.k1.declarationInvoice.CIFCAmount = d.data.CIFC.toFixed(2);
                $scope.showLoading = false;
            }, function (err) {

            });
        };

        $scope.GetCustomResponse = function (declarationNo) {

            k1Service.GetCustomResponse(declarationNo).then(function (d) {

                $scope.customresponses = d.data.customResponse;
                $scope.ediresponse = d.data.ediResponse;
                $scope.ammendantsResponse = d.data.ammendantsResponse;
                $scope.customresponseheaderItem = d.data.customresponseheaderItem;
                $scope.dutyAmountlist = d.data.dutyAmountlist;
            }, function (err) { });
        };
        $scope.DisplayResponseData = function (obj) {
            k1Service.GetCustomResponseInfo(obj).then(function (d) {
                //if (d.data.RegistrationNo != null && d.data.RegistrationNo != '')
                //    d.data.RegistrationDate = moment(d.data.RegistrationDate).format(UtilityFunc.DateFormat());
                $scope.customresponseheaderItem = d.data;
                
            }, function (err) { });
        };

        $scope.IsCloneBtnDisabled = false;
        $scope.CloneK1 = function (declarationNo) {
            $scope.showLoading = true;
            k1Service.CloneDeclaration(declarationNo).then(function (d) {

                $scope.IsCloneBtnDisabled = true;
                $scope.isDeclined = false;
                $scope.isFromOrderEntry = false;
                $scope.declarationOrderStatus = null;
                $scope.k1 = d.data.declaration;
                $scope.k1.DeclarationNo = null;
                $scope.k1.OpenDate = moment();
                $scope.k1.ImportDate = moment();


                if (!angular.isUndefined($scope.k1.DeclarantID) && $scope.k1.DeclarantID != "" && $scope.k1.DeclarantID != null) {
                    $scope.k1.DeclarantIDText = $scope.k1.DeclarantID;

                    if (!angular.isUndefined($scope.k1.DeclarantName) && $scope.k1.DeclarantName != "" && $scope.k1.DeclarantName != null) {
                        $scope.k1.DeclarantIDText += " - " + $scope.k1.DeclarantName;
                    }

                    if (!angular.isUndefined($scope.k1.DeclarantNRIC) && $scope.k1.DeclarantNRIC != "" && $scope.k1.DeclarantNRIC != null) {
                        $scope.k1.DeclarantIDText += " - " + $scope.k1.DeclarantNRIC;
                    }
                }
                $scope.showLoading = false;
                $scope.IsNew = true;
                $scope.customresponses = null;
                $scope.active = 0;
                $scope.IsDeclarationValidated = false;
                $scope.k1.IsPartial = true;
                $scope.ediresponse = null;
                $scope.validateDates();
                $scope.validateInputDecimal();
            }, function (err) { });
        };

        $scope.CustomDeclarantResults = function (declarantId) {
            return CustomDeclarantService.GetCustomDeclarantAutoComplete(declarantId).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.CustomDeclarantSelected = function (obj) {

            $scope.k1.DeclarantName = obj.Name;
            $scope.k1.DeclarantDesignation = obj.Designation;
            $scope.k1.DeclarantNRIC = obj.NRIC;
            $scope.k1.DeclarantID = obj.ID;
        };

        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }


        $scope.Calculatepercentageamount = function () {

            if ($scope.k1.declarationInvoice.IsFreightCurrency == true) {

                var Freight = parseFloat($scope.k1.declarationInvoice.FreightAmountPercent);
                if (Freight > 100) {

                    growlService.growl('Freight Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k1.declarationInvoice.FreightAmountPercent = '';
                    $scope.k1.declarationInvoice.FreightAmountValue = 0;
                }

            }

            if ($scope.k1.declarationInvoice.IsInsuranceCurrency == true) {
                var Insurance = parseFloat($scope.k1.declarationInvoice.InsuranceAmountPercent);
                if (Insurance > 100) {

                    growlService.growl('Insurance Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k1.declarationInvoice.InsuranceAmountPercent = '';
                    $scope.k1.declarationInvoice.InsuranceAmountValue = 0;
                }
            }

        }

        $scope.ContainerFileUpload = function (e) {
            if (angular.isUndefined($scope.k1.declarationContainers))
                $scope.k1.declarationContainers = new Array();
            debugger;
            var file = document.getElementById('containerFile').files[0];

            UtilityFunc.GetExcelData(file, '1TradeK1Container').then(function (d) {
                if (d.length == 0) {
                    growlService.growl('Excel file Upload failed', 'danger');
                } else {
                    angular.forEach(d, function (item, index) {
                        debugger;
                        var Status = $filter('filter')($scope.lookUpData.containerStatusList, { Text: item.Status })[0].Value;
                        var ContainerType = $filter('filter')($scope.lookUpData.jobTypeList, { Text: item.ContainerType })[0].Value;
                        var SOC = item.SOCType.toUpperCase() == 'YES' ? true : false;
                        var obj = {

                            //ContainerNo,IsSOC,Size,Type,EQDStatus,ContainerStatus
                            ContainerNo: item.ContainerNo,
                            Type: item.Type,
                            Size: item.Size,
                            IsSOC: SOC,
                            EQDStatus: ContainerType,
                            ContainerStatus: Status
                        };

                        $scope.k1.declarationContainers.push(obj);
                    });

                    $timeout(function () {
                        $scope.ngTblContainerInfo();
                        growlService.growl('Excel file Uploaded Successfully', 'success');
                    }, 500);
                }
                }, function (err) {
                
                });
            }
            
        $scope.CargoFileUpload = function (e) {
            if (angular.isUndefined($scope.k1.declarationItems))
                $scope.k1.declarationItems = new Array();
            var file = document.getElementById('cargoFile').files[0];

            UtilityFunc.GetExcelData(file, '1TradeK1Cargo').then(function (d) {
                if (d.length == 0) {
                    growlService.growl('Excel file Upload failed', 'danger');
                } else {
                    angular.forEach(d, function (item, index) {
                        var obj = {
                            //ProductCode: item.Product,
                            //HSCode: item.HSCode,
                            //DeclaredQty: item.DeclaredQty,
                            //StatisticalQty: item.StatisticalQty,
                            //DeclaredUOM: item.DeclaredUOM,
                            //ItemAmount: item.ItemAmount,
                            //ItemDescription1: item.ItemDescription,
                            //OriginCountryCode: item.CountryOfOrigin
                            ProductCode: item.Product,
                            OriginCountryCode: item.CountryOfOrigin,
                            HSCode: item.HSCode,
                            StatisticalQty: item.StatisticalQty,
                            DeclaredQty: item.DeclaredQty,
                            StatisticalUOM: item.DeclaredUOM,
                            DeclaredUOM: item.DeclaredUOM,
                            ItemAmount: item.ItemAmount,
                            ItemDescription1: item.ItemDescription,
                            ItemDescription2: item.ExtraItemDescription,
                            ExportDutyExemptionRatePercent: item.DutyRateExemption,
                            ExportDutySpecificExemptionRatePercent: item.SpecificRateExemption
                        };
                        $scope.k1.declarationItems.push(obj);
                    });
                    $timeout(function () {
                        $scope.ngTblItemEntry();
                        growlService.growl('Excel file Uploaded Successfully', 'success');
                    }, 500);
                }
            }, function (err) {
       
            });
        }
        /*Generate K1 from K8*/
        $scope.GenearateK1FromK8 = function () {
            var declarationNo = $scope.k1.K8DeclarationNo;
            if (declarationNo != null && declarationNo != "") {
                k1Service.GenearateK1FromK8(declarationNo).then(function (d) {
                    $scope.k1 = d.data.k1;
                    debugger;
                    if (!angular.isUndefined($scope.k1.DeclarantID) && $scope.k1.DeclarantID != "" && $scope.k1.DeclarantID != null) {
                        $scope.k1.DeclarantIDText = $scope.k1.DeclarantID;

                        if (!angular.isUndefined($scope.k1.DeclarantName) && $scope.k1.DeclarantName != "" && $scope.k1.DeclarantName != null) {
                            $scope.k1.DeclarantIDText += " - " + $scope.k1.DeclarantName;
                        }

                        if (!angular.isUndefined($scope.k1.DeclarantNRIC) && $scope.k1.DeclarantNRIC != "" && $scope.k1.DeclarantNRIC != null) {
                            $scope.k1.DeclarantIDText += " - " + $scope.k1.DeclarantNRIC;
                        }
                    }
                    $scope.ngTblItemEntry();
                    $scope.ngTblContainerInfo();
                    $scope.ngTblDocuments();
                    $scope.k1.TransactionType = '25040';
                    $scope.k1.DeclarationNo = null;
                    $scope.k1.K8DeclarationNo = declarationNo;
                    $scope.validateInputDecimal();
                    $scope.validateDates();
                    // $state.go('k1declaration', { 'declarationNo': d.data.declarationNo });
                }, function (err) {

                });
            }
        }

        $scope.validateDates = function () {

            if (!angular.isUndefined($scope.k1) && $scope.k1 != null) {
                if (!angular.isUndefined($scope.k1.declarationExcemption) && $scope.k1.declarationExcemption != null) {
                    if ($scope.k1.declarationExcemption.SalesTaxRegistrationDate == null) {
                        $scope.k1.declarationExcemption.SalesTaxRegistrationDate = undefined;
                    }
                    else
                        $scope.k1.declarationExcemption.SalesTaxRegistrationDate = moment($scope.k1.declarationExcemption.SalesTaxRegistrationDate);
                    if ($scope.k1.declarationExcemption.ExcemptionDate == null) {
                        $scope.k1.declarationExcemption.ExcemptionDate = undefined;
                    }
                    else
                        $scope.k1.declarationExcemption.ExcemptionDate = moment($scope.k1.declarationExcemption.ExcemptionDate);
                    //k1.declarationExcemption.ExcemptionDate
                }
                if (!angular.isUndefined($scope.k1.declarationInvoice) && $scope.k1.declarationInvoice != null) {
                    if ($scope.k1.declarationInvoice.InvoiceDate == null) {
                        $scope.k1.declarationInvoice.InvoiceDate = undefined;
                    }
                    else
                        $scope.k1.declarationInvoice.InvoiceDate = moment($scope.k1.declarationInvoice.InvoiceDate);
                }
                if (!angular.isUndefined($scope.k1.OpenDate) && $scope.k1.OpenDate != null) {
                    $scope.k1.OpenDate = moment($scope.k1.OpenDate);
                }
                else
                    $scope.k1.OpenDate = undefined;

                if (!angular.isUndefined($scope.k1.ImportDate) && $scope.k1.ImportDate != null) {
                    $scope.k1.ImportDate = moment($scope.k1.ImportDate);
                }
                else
                    $scope.k1.ImportDate = undefined;

                if (!angular.isUndefined($scope.k1.declarationShipment) && $scope.k1.declarationShipment != null) {

                    if ($scope.k1.declarationShipment.ETADate == null) {
                        $scope.k1.declarationShipment.ETADate = undefined;
                    }
                    else
                        $scope.k1.declarationShipment.ETADate = moment($scope.k1.declarationShipment.ETADate);
                }
                if (!angular.isUndefined($scope.k1.declarationDocuments) && $scope.k1.declarationDocuments != null) {
                    if ($scope.k1.declarationDocuments.DocDateType == null) {
                        $scope.k1.declarationDocuments.DocDateType = undefined;
                    }
                }

                if (!angular.isUndefined($scope.k1.declarationDocuments) && $scope.k1.declarationDocuments != null) {
                    angular.forEach($scope.k1.declarationDocuments, function (item, index) {
                        if ($scope.k1.declarationDocuments[index].DocDate == null) {
                            $scope.k1.declarationDocuments[index].DocDate = undefined;
                        }
                        else
                            $scope.k1.declarationDocuments[index].DocDate = moment($scope.k1.declarationDocuments[index].DocDate);
                    });

                }
            }

        }

        /* end*/

        $scope.init();
    }]);

angular.module('LogiCon').controller('AddEditContainerInfoCntrl', ['$scope', '$uibModalInstance', 'OrderEntryService', 'dataObj', 'growlService', 'k1Service', '$window', 'UtilityFunc', function ($scope, $uibModalInstance, OrderEntryService, dataObj, growlService, k1Service, $window, UtilityFunc) {

    $scope.SOCChecked = function () {
        $scope.frmContainerInfo.ContainerNo.$$runValidators($scope.frmContainerInfo.ContainerNo.$modalValue, $scope.frmContainerInfo.ContainerNo.$viewValue, function () {
            $scope.dc.ContainerNo = $scope.frmContainerInfo.ContainerNo.$viewValue;
        });
    };
    $scope.ISO6346Check = function (con) {
        if (!con || con == "" || con.length != 11) { return false; }
        con = con.toUpperCase();
        var re = /^[A-Z]{4}\d{7}/;
        if (re.test(con)) {
            var sum = 0;
            for (i = 0; i < 10; i++) {
                var n = con.substr(i, 1);
                if (i < 4) {
                    n = "0123456789A?BCDEFGHIJK?LMNOPQRSTU?VWXYZ".indexOf(con.substr(i, 1));
                }
                n *= Math.pow(2, i); //2的i次方
                sum += n;
            }
            if (con.substr(0, 4) == "HLCU") {
                sum -= 2;
            }
            sum %= 11;
            sum %= 10; //余数为10的取0
            return sum == con.substr(10);
        } else {
            return false; //不匹配正则表达式   
        }
    };

    $scope.ValidateContainerBlur = function (con) {

        var isValid = $scope.ISO6346Check(con);
        $scope.IsContainerValid = isValid;
        /*
        if (!isValid) {
            swal({
                title: "Are you sure?",
                text: "Is this container is SOC TYPE!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes",
                cancelButtonText: "No",
                closeOnConfirm: false,
                closeOnCancel: false
            }, function (isConfirm) {
                if (isConfirm) {
                    swal("DONE", "", "success");
                    $scope.dc.IsSOC = true;
                } else {
                    swal("Cancelled", "", "error");
                    $scope.dc.IsSOC = isValid;
                }
            });
        }
        */

        return isValid;
    };

    $scope.ValidateContainerPattern = (function () {
        return {
            test: function (con) {
                if ($scope.dc.IsSOC)
                    return true;
                var isValid = $scope.ISO6346Check(con);
                $scope.IsContainerValid = isValid;
                return isValid;
            }
        };
    })();

    $scope.checkContainerType = function () {
        if (!$scope.IsContainerValid && !$scope.dc.IsSOC) {
            var r = $window.confirm('Is container of SOC Type ?');
            if (r) {
                $scope.dc.IsSOC = true;
            } else {
                $scope.dc.IsSOC = false;
            }
        }
    };

    $scope.dc = angular.copy(dataObj.dc);

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.lookUpData = {
        sizeList: dataObj.sizeList,
        jobTypeList: UtilityFunc.removeArrayElementByKey(dataObj.jobTypeList, 'Value', 1062),
        containerStatusList: dataObj.containerStatusList

    };

    $scope.isFrmContainerInfoValid = false;
    $scope.$watch('frmContainerInfo.$valid', function (isValid) {
        $scope.isFrmContainerInfoValid = isValid;
    });
    $scope.SaveContainerInfo = function (dc) {
        if ($scope.isFrmContainerInfoValid) {
            $uibModalInstance.close(dc);
        } else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    };

    $scope.sizeChanged = function () {
        $scope.showLoading = true;
        OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
            $scope.showLoading = false;
        }, function () { })
    };

    $scope.refreshCustomResponses = function () {

    };

    if (!angular.isUndefined($scope.dc.Size) && $scope.dc.Size != null) {
        $scope.showLoading = true;
        OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
            $scope.showLoading = false;
        }, function () { })
    }

    //$scope.uploadFiles = function (e) {
    //    
    //    if (angular.isUndefined($scope.k1.declarationContainers))
    //        $scope.k1.declarationContainers = new Array();
    //    var files = document.getElementById('k1ContainerFile').files;
    //    var i, f;
    //    
    //    //Loop through files
    //    for (i = 0, f = files[i]; i != files.length; ++i) {
    //        var reader = new FileReader();
    //        var name = f.name;
    //        reader.onload = function (e) {
    //            var data = e.target.result;
    //            var result;
    //            var workbook = XLSX.read(data, { type: 'binary' });
    //            
    //            var ContainerList = XLSX.utils.sheet_to_json(workbook.Sheets['JobContainer']);

    //            var isFileValid = true;
    //            angular.forEach(ContainerList, function (item, index) {
    //                
    //                var obj = {
    //                    ContainerNo: item.ContainerNo,
    //                    EQDStatus: item.Status,
    //                    Type:item.Type
    //                    //Qty: item.DeclaredQuantity,
    //                    //UOM:item.UOM,
    //                    //Volume: item.GrossVolume,
    //                   // GrossWeight: item.CargoWeight
    //                };
    //                $scope.k1.declarationContainers.push(obj);
    //            });
    //            
    //            $timeout(function () {
    //                $scope.ngTblContainerInfo();
    //            }, 500);
    //        };
    //        
    //        reader.readAsArrayBuffer(f);
    //    }

    //}

}]);

