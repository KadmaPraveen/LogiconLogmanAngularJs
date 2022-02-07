angular.module('LogiCon').controller('k2Cntrl', ['$scope', 'k2Service', 'MerchantProfileService', 'VesselScheduleService', 'PortAreaService', 'CurrencyRateService', 'OrderEntryService', 'VesselMasterService', 'Utility', '$uibModal', 'limitToFilter', 'growlService', '$stateParams', '$timeout', '$state', 'AddressService', 'UtilityFunc', '$filter', 'CustomDeclarantService', 'NgTableParams', '$anchorScroll', '$location', '$window', 'OrderEntryService',
    function ($scope, k2Service, MerchantProfileService, VesselScheduleService, PortAreaService, CurrencyRateService, OrderEntryService, VesselMasterService, Utility, $uibModal, limitToFilter, growlService, $stateParams, $timeout, $state, AddressService, UtilityFunc, $filter, CustomDeclarantService, NgTableParams, $anchorScroll, $location, $window, OrderEntryService) {
        $scope.validateInputDecimal = function () {
            $timeout(function () {
                if ($scope.frmk2.InvoiceValue.$viewValue != null) {
                    $scope.frmk2.InvoiceValue.$$runValidators($scope.frmk2.InvoiceValue.$modalValue, $scope.frmk2.InvoiceValue.$viewValue, function () {
                        $scope.frmk2.InvoiceValue.$setViewValue($scope.frmk2.InvoiceValue.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk2.AmountReceived.$viewValue != null) {
                    $scope.frmk2.AmountReceived.$$runValidators($scope.frmk2.AmountReceived.$modalValue, $scope.frmk2.AmountReceived.$viewValue, function () {
                        $scope.frmk2.AmountReceived.$setViewValue($scope.frmk2.AmountReceived.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk2.GrossWeight.$viewValue != null) {
                    $scope.frmk2.GrossWeight.$$runValidators($scope.frmk2.GrossWeight.$modalValue, $scope.frmk2.GrossWeight.$viewValue, function () {
                        $scope.frmk2.GrossWeight.$setViewValue($scope.frmk2.GrossWeight.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk2.GrossVolume.$viewValue != null) {
                    $scope.frmk2.GrossVolume.$$runValidators($scope.frmk2.GrossVolume.$modalValue, $scope.frmk2.GrossVolume.$viewValue, function () {
                        $scope.frmk2.GrossVolume.$setViewValue($scope.frmk2.GrossVolume.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk2.PortAmountPercent.$viewValue != null) {
                    $scope.frmk2.PortAmountPercent.$$runValidators($scope.frmk2.PortAmountPercent.$modalValue, $scope.frmk2.PortAmountPercent.$viewValue, function () {
                        $scope.frmk2.PortAmountPercent.$setViewValue($scope.frmk2.PortAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk2.FreightAmountPercent.$viewValue != null) {
                    $scope.frmk2.FreightAmountPercent.$$runValidators($scope.frmk2.FreightAmountPercent.$modalValue, $scope.frmk2.FreightAmountPercent.$viewValue, function () {
                        $scope.frmk2.FreightAmountPercent.$setViewValue($scope.frmk2.FreightAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk2.InsuranceAmountPercent.$viewValue != null) {
                    $scope.frmk2.InsuranceAmountPercent.$$runValidators($scope.frmk2.InsuranceAmountPercent.$modalValue, $scope.frmk2.InsuranceAmountPercent.$viewValue, function () {
                        $scope.frmk2.InsuranceAmountPercent.$setViewValue($scope.frmk2.InsuranceAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
                    });
                }
                if ($scope.frmk2.OthersAmountPercent.$viewValue != null) {
                    $scope.frmk2.OthersAmountPercent.$$runValidators($scope.frmk2.OthersAmountPercent.$modalValue, $scope.frmk2.OthersAmountPercent.$viewValue, function () {
                        $scope.frmk2.OthersAmountPercent.$setViewValue($scope.frmk2.OthersAmountPercent.$viewValue.replace(/[^\d|\-+|\.+]/g, ''));
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

        $scope.Validatetheitem = function () {

            if ($scope.k2.declarationClausesK2.ClauseCode == '') {
                $scope.k2.declarationClausesK2.ClauseText = '';
            }
        }

        var declarationNo = $stateParams.declarationNo;
        $scope.init = function () {
            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.timeFormat = UtilityFunc.TimeFormat();
            $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
            $scope.defaultCurrency = UtilityFunc.DefaultCurrency();
            $scope.defaultCountry = UtilityFunc.DefaultCountry();
            $scope.declarationOrderStatus = {};
            $scope.k2 = {
                DeclarationShipmentType: 25850,
                OpenDate: moment(),
                declarationContainersK2: new Array(),
                declarationDocumentsK2: new Array(),
                declarationClausesK2: {},
                declarationItemsK2: new Array(),
                declarationInvoiceK2: {
                    IsFreightCurrency: false,
                    IsInsuranceCurrency: false,
                    FOBAmount: 0.00,
                    CIFAmount: 0.00,
                    EXWAmount: 0.00,
                    CNFAmount: 0.00,
                    CNIAmount: 0.00,
                    FreightAmount: 0.00,
                    InsuranceAmount: 0.00,
                    OtherAmount: 0.00,
                    PortAmount: 0.00,
                    CurrencyExRate: 1.0000,
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
                    UOMWeight: 'KGM',
                    UOMVolume: 'MTQ',
                    InvoiceCurrencyCode: 'MYR',
                    AmountReceivedCurrencyCode: 'MYR',
                    AmountReceivedExchangeRate: 1.0000
                },
                declarationShipmentK2: {},
                declarationExcemptionK2: {}
            };

            if (declarationNo == 'NEW' || declarationNo == "") {
                $scope.k2.TransportMode = 1021;
                $scope.k2.declarationInvoiceK2.LocalCurrencyCode = $scope.defaultCurrency;
                //$scope.k2.declarationInvoiceK2.PortAmountCurrencyCode = $scope.defaultCurrency;
                //$scope.k2.declarationInvoiceK2.FreightAmountCurrencyCode = $scope.defaultCurrency;
                //$scope.k2.declarationInvoiceK2.InsuranceAmountCurrencyCode = $scope.defaultCurrency;
                //$scope.k2.declarationInvoiceK2.OthersAmountCurrencyCode = $scope.defaultCurrency;
                $scope.k2.declarationInvoiceK2.PayCountry = $scope.defaultCountry;
                $scope.k2.declarationShipmentK2.OriginCountry = $scope.defaultCountry;
                $scope.k2.declarationInvoiceK2.DestinationCountry = $scope.defaultCountry;
                $scope.k2.declarationInvoiceK2.GoodsReceiveCountry = $scope.defaultCountry;
            }

            $scope.isConventionalCargo = false;
            $scope.branchID = UtilityFunc.BranchID();
            $scope.customresponses = {};
            $scope.ediResponse = {};
            $scope.customresponseheaderItem = {};
            //$scope.IsCustomResponsesShow = false;
            $scope.transportMode = 1021;
            $scope.time = null;
            $scope.isFromOrderEntry = false;
            $scope.isDeclined = false;
            $scope.IsNew = true;
            $scope.showLoading = true;
            $scope.IsDeclarationValidated = false;

            if (declarationNo != "NEW" && declarationNo != "") {
                $scope.IsNew = false;
            }
            else {
                $scope.IsNew = true;
            }



            $scope.ic = {};//Invoice Cargo
            $scope.sd = {};//Shipment Details
            $scope.ex = {};//Excemptions
            $scope.con = {};//Container Info
            $scope.doc = {};//Documents
            $scope.cl = {};//Clause
            $scope.ie = {};//item entry
            $scope.ies = {};//item entry subitem

            $scope.dc = {};//declaration container
            $scope.GetLookUpdata();
            if (!angular.isUndefined(declarationNo) && declarationNo != 'NEW' && declarationNo != "") {
                $scope.GetDeclaration(declarationNo);
            }
            $scope.k8declarationNo = null;
            $scope.Activity = {};
            $scope.Activities = new Array();
        };

        $scope.GetDeclaration = function (declarationNo) {
            k2Service.GetDeclaration(declarationNo).then(function (d) {
                $scope.k2 = d.data.declaration;
                $scope.changeShipmentType($scope.k2.ShipmentType);

                if (!$scope.k2.IsPartial)
                    $scope.IsDeclarationValidated = true;

                //if (!angular.isUndefined($scope.k2.DeclarantID) && $scope.k2.DeclarantID != null && $scope.k2.DeclarantID != '') {
                //    $scope.k2.DeclarantIDText = $scope.k2.DeclarantID + " - " + $scope.k2.DeclarantName + " - " + $scope.k2.DeclarantNRIC;
                //}
                if (!angular.isUndefined($scope.k2.DeclarantID) && $scope.k2.DeclarantID != "" && $scope.k2.DeclarantID != null) {
                    $scope.k2.DeclarantIDText = $scope.k2.DeclarantID;

                    if (!angular.isUndefined($scope.k2.DeclarantName) && $scope.k2.DeclarantName != "" && $scope.k2.DeclarantName != null) {
                        $scope.k2.DeclarantIDText += " - " + $scope.k2.DeclarantName;
                    }

                    if (!angular.isUndefined($scope.k2.DeclarantNRIC) && $scope.k2.DeclarantNRIC != "" && $scope.k2.DeclarantNRIC != null) {
                        $scope.k2.DeclarantIDText += " - " + $scope.k2.DeclarantNRIC;
                    }
                }

                if (!angular.isUndefined($scope.k2) && $scope.k2 != null) {
                    if (!angular.isUndefined($scope.k2.declarationExcemptionK2) && $scope.k2.declarationExcemptionK2 != null) {
                        if ($scope.k2.declarationExcemptionK2.SalesTaxRegistrationDate == null) {
                            $scope.k2.declarationExcemptionK2.SalesTaxRegistrationDate = undefined;
                        }
                        else
                            $scope.k2.declarationExcemptionK2.SalesTaxRegistratonDate = moment($scope.k2.declarationExcemptionK2.SalesTaxRegistratonDate);
                    }
                    if (!angular.isUndefined($scope.k2.declarationInvoiceK2) && $scope.k2.declarationInvoiceK2 != null) {
                        if ($scope.k2.declarationInvoiceK2.InvoiceDate == null) {
                            $scope.k2.declarationInvoiceK2.InvoiceDate = undefined;
                        }
                        else
                            $scope.k2.declarationInvoiceK2.InvoiceDate = moment($scope.k2.declarationInvoiceK2.InvoiceDate);
                    }
                    if (!angular.isUndefined($scope.k2.OpenDate) && $scope.k2.OpenDate != null) {
                        $scope.k2.OpenDate = moment($scope.k2.OpenDate);
                    } else
                        $scope.k2.OpenDate = undefined;

                    if (!angular.isUndefined($scope.k2.ExportDate) && $scope.k2.ExportDate != null) {
                        $scope.k2.ExportDate = moment($scope.k2.ExportDate);
                    }
                    else
                        $scope.k2.ExportDate = undefined;

                    if (!angular.isUndefined($scope.k2.declarationShipmentK2) && $scope.k2.declarationShipmentK2 != null) {
                        if ($scope.k2.declarationShipmentK2.ETADate == null) {
                            $scope.k2.declarationShipmentK2.ETADate = undefined;
                        }
                        else
                            $scope.k2.declarationShipmentK2.ETADate = moment($scope.k2.declarationShipmentK2.ETADate);
                    }

                    if (!angular.isUndefined($scope.k2.declarationDocumentsK2) && $scope.k2.declarationDocumentsK2 != null) {
                        angular.forEach($scope.k2.declarationDocumentsK2, function (item, index) {
                            if ($scope.k2.declarationDocumentsK2[index].DocDate == null) {
                                $scope.k2.declarationDocumentsK2[index].DocDate = undefined;
                            }
                            else
                                $scope.k2.declarationDocumentsK2[index].DocDate = moment($scope.k2.declarationDocumentsK2[index].DocDate);
                        });

                    }
                }
                //$scope.IsCustomResponsesShow = true;
                $scope.GetCustomResponse(declarationNo);
                if (!angular.isUndefined($scope.k2.OrderNo) && $scope.k2.OrderNo != null && $scope.k2.OrderNo != '')
                    $scope.GetDeclarationStatus(declarationNo, $scope.k2.OrderNo);

                $scope.BindAddress(d.data.declaration.ShippingAgent, 'ShippingAgentAddress');
                $scope.Cntrl.activityList = d.data.activityList

                $scope.ngTblItemEntry();
                $scope.ngTblContainerInfo();
                $scope.ngTblDocuments();
                $scope.validateDates();
                $scope.validateInputDecimal();

                $scope.GetSubmitToCustomsVisibility();
            }, function (err) { });
        };

        $scope.GetSubmitToCustomsVisibility = function () {
            OrderEntryService.SubmitToCustomsVisibility($scope.k2.DeclarationNo, 9102).then(function (d) {
                $scope.k2.SubmitToCustomsVisiblity = d.data;
            }, function (err) { });
        };

        $scope.SubmitToCustomsValidation = function () {
            if (!angular.isUndefined($scope.k2) && !angular.isUndefined($scope.k2.SubmitToCustomsVisiblity) && !angular.isUndefined($scope.k2.SubmitToCustomsVisiblity.IsApproveDeclaration) && $scope.k2.SubmitToCustomsVisiblity.IsApproveDeclaration) {
                return $scope.k2.SubmitToCustomsVisiblity.IsApproved;
            } else
                return true;
        };

        $scope.GetDeclarationStatus = function (declarationNo, orderNo) {
            k2Service.GetDeclarationStatus(declarationNo, orderNo).then(function (d) {
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
            if ($scope.k2.declarationItemsK2 == null)
                $scope.k2.declarationItemsK2 = new Array();
            $scope.tableSorting = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                    total: $scope.k2.declarationItemsK2.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.k2.declarationItemsK2, params.orderBy()) : $scope.k2.declarationItemsK2;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope.itemEntryIndex = (params.page() - 1) * params.count();
                    }
                })
        };

        $scope.containerInfoIndex = -1;
        $scope.ngTblContainerInfo = function () {
            if ($scope.k2.declarationContainersK2 == null)
                $scope.k2.declarationContainersK2 = new Array();
            $scope.tblContainerInfo = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                    total: $scope.k2.declarationContainersK2.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.k2.declarationContainersK2, params.orderBy()) : $scope.k2.declarationContainersK2;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope.containerInfoIndex = (params.page() - 1) * params.count();
                    }
                });

        };

        $scope.documentsIndex = -1;
        $scope.ngTblDocuments = function () {
            if ($scope.k2.declarationDocumentsK2 == null)
                $scope.k2.declarationDocumentsK2 = new Array();
            $scope.tblDocuments = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                    total: $scope.k2.declarationDocumentsK2.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.k2.declarationDocumentsK2, params.orderBy()) : $scope.k2.declarationDocumentsK2;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope.documentsIndex = (params.page() - 1) * params.count();
                    }
                })
        };






        $scope.GetLookUpdata = function () {
            k2Service.GetLookupData().then(function (d) {
                $scope.lookUpData = d.data;


                var transactionTypeCodeObj = $filter('filter')($scope.lookUpData.K2ATransactionTypeList, { Value: $scope.k2.TransactionType })[0];
                if (transactionTypeCodeObj != null)
                    $scope.k2.TransactionTypeCode = $filter('filter')($scope.lookUpData.K2ATransactionTypeList, { Value: $scope.k2.TransactionType })[0].Code;

                $scope.showLoading = false;
            }, function (err) { });
        };

        //OrderEntryService.GetTerminalList().then(function (d) {
        //    $scope.terminalList = d.data.terminalList;
        //}, function (err) { });

        //$scope.k2.TransportMode = 1021;
        $scope.PayCountryChanged = function (item, type) {
            $scope.k2.declarationInvoiceK2[type] = item.text;
        };

        $scope.GenericMerchantResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.ChangeTransportMode = function (TransportMode) {
            $scope.transportMode = TransportMode;
            if ($scope.k2.TransportMode == 1020 || $scope.k2.TransportMode == 1024 || $scope.k2.TransportMode == 1025 || $scope.k2.ShipmentType == 26533 || $scope.k2.ShipmentType == 26531) {
                $scope.isConventionalCargo = true;
                $scope.k2.declarationContainers = null;
            }
            else {
                $scope.isConventionalCargo = false;
                if (angular.isUndefined($scope.k2.declarationContainers))
                    $scope.k2.declarationContainers = new Array();
            }

            $scope.k2.declarationShipmentK2.VesselScheduleID = null;
            $scope.k2.declarationShipmentK2.VoyageNo = null;
            $scope.k2.declarationShipmentK2.SCNNo = null;
            $scope.k2.declarationShipmentK2.VesselID = null;
            $scope.k2.declarationShipmentK2.VesselName = null;
            $scope.k2.declarationShipmentK2.ETADate = undefined;
            $scope.k2.declarationShipmentK2.ManifestNo = null;
            $scope.k2.declarationShipmentK2.OceanBLNo = null;
            $scope.k2.declarationShipmentK2.HouseBLNo = null;
            $scope.k2.declarationShipmentK2.WagonNo = null;
            $scope.k2.declarationShipmentK2.VehicleNo1 = null;
            $scope.k2.declarationShipmentK2.VehicleNo2 = null;
            $scope.k2.declarationShipmentK2.FlightNo = null;
            $scope.k2.declarationShipmentK2.ARNNo = null;
            $scope.k2.declarationShipmentK2.MasterAWBNo = null;
            $scope.k2.declarationShipmentK2.HouseAWBNo = null;
            $scope.k2.declarationShipmentK2.AIRCOLoadNo = null;
            $scope.k2.declarationShipmentK2.JKNo = null;
        };

        $scope.changeShipmentType = function (ShipmentType) {

            if ($scope.k2.ShipmentType == 26533 || $scope.k2.ShipmentType == 26531 || $scope.k2.TransportMode == 1020 || $scope.k2.TransportMode == 1024 || $scope.k2.TransportMode == 1025) {
                $scope.isConventionalCargo = true;
                $scope.k2.declarationContainers = null;
            }
            else {
                $scope.isConventionalCargo = false;
                if (angular.isUndefined($scope.k2.declarationContainers))
                    $scope.k2.declarationContainers = new Array();
            }
        };

        $scope.ClaimantNameResults = function (text) {
            return k2Service.ClaimantNameResults(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) {
            })
        }

        $scope.ValidateClaimantDetails = function () {
            if ($scope.k2.declarationExcemptionK2.ClaimantName == null || angular.isUndefined($scope.k2.declarationExcemptionK2.ClaimantName)) {
                $scope.k2.declarationExcemptionK2.ClaimantID = null;
                $scope.k2.declarationExcemptionK2.ClaimantCompany = null;
                $scope.k2.declarationExcemptionK2.ClaimantNRIC = null;
                $scope.k2.declarationExcemptionK2.ClaimantDesignation = null;
                $scope.k2.declarationExcemptionK2.ClaimantStatus = null;
            }
        }

        $scope.ClaimantNameSelected = function (item) {
            $scope.k2.declarationExcemptionK2.ClaimantID = item.ID;
            $scope.k2.declarationExcemptionK2.ClaimantCompany = item.CompanyName;
            $scope.k2.declarationExcemptionK2.ClaimantNRIC = item.NRIC;
            $scope.k2.declarationExcemptionK2.ClaimantDesignation = item.Designation;
            $scope.k2.declarationExcemptionK2.ClaimantStatus = item.Status;
        }

        $scope.GenericMerchantResults = function (text, filter, type) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                if (d.data.length == 0)
                    $scope.k2[type] = '';
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.ShipCallResults = function (text) {
            return VesselScheduleService.ShipCallNoSearch(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.VoyageNoOutwardResults = function (text) {
            return VesselScheduleService.VoyageNoOutWardSearch(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.VoyageSelected = function (item) {
            $scope.k2.declarationShipmentK2.VesselScheduleID = item.VesselScheduleID;
            $scope.k2.declarationShipmentK2.VoyageNo = item.VoyageNoOutWard;
            $scope.k2.declarationShipmentK2.SCNNo = item.ShipCallNo;
            $scope.k2.declarationShipmentK2.VesselID = item.VesselID;
            $scope.k2.declarationShipmentK2.VesselName = item.VesselName;
            $scope.k2.declarationShipmentK2.ETADate = item.ETD;
            if (!angular.isUndefined($scope.k2.declarationShipmentK2) && $scope.k2.declarationShipmentK2 != null) {
                if ($scope.k2.declarationShipmentK2.ETADate == null) {
                    $scope.k2.declarationShipmentK2.ETADate = undefined;
                }
                else
                    $scope.k2.declarationShipmentK2.ETADate = moment($scope.k2.declarationShipmentK2.ETADate);
            }
        };

        $scope.MerchantSelected = function (item, Type) {
            $scope.k2[Type] = item.Value
        };

        $scope.PortAutoComplete = function (text) {
            return PortAreaService.PortAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.PortSelected = function (item, type) {
            $scope.k2.declarationShipmentK2[type] = item.PortCode;
            if (type == 'PlaceOfExport') {
                $scope.k2.LoadingPortName = $scope.k2.declarationShipmentK2.PlaceOfExportName;
                $scope.k2.declarationShipmentK2['LoadingPort'] = item.PortCode;
            }
        };

        $scope.PortOperatorResults = function (text) {
            var operatortype = 26220;
            return OrderEntryService.operatorList(operatortype, text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.TerminalOperaterSelected = function (item) {
            $scope.k2.declarationShipmentK2.PortOperator = item.Value;
        };


        $scope.amountReceivedCurrencyChanged = function () {
            var exchangeRate = $filter('filter')($scope.lookUpData.currencyList, { Value: $scope.k2.declarationInvoiceK2.AmountReceivedCurrencyCode })[0].ExportRate;
            $scope.k2.declarationInvoiceK2.AmountReceivedExchangeRate = exchangeRate;
            $scope.k2.declarationInvoiceK2.AmountReceivedLocalValue = $scope.k2.declarationInvoiceK2.AmountReceived * exchangeRate;

        };

        $scope.CustomDeclarantResults = function (declarantId) {
            return CustomDeclarantService.GetCustomDeclarantAutoComplete(declarantId).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };


        $scope.CustomDeclarantSelected = function (obj) {
            $scope.k2.DeclarantName = obj.Name;
            $scope.k2.DeclarantDesignation = obj.Designation;
            $scope.k2.DeclarantNRIC = obj.NRIC;
            $scope.k2.DeclarantID = obj.ID;
        };

        $scope.exRateChanged = function (currencyCode, field) {
            $scope.showLoading = true;
            CurrencyRateService.GetExRate($scope.k2.declarationInvoiceK2[currencyCode]).then(function (d) {
                $scope.k2.declarationInvoiceK2[field] = d.data;
                $scope.showLoading = false;
            }, function (err) { });
        };

        $scope.TransactionType = function (item, field) {
            $scope.k2[field] = item.Code;
        };

        $scope.sizeChanged = function () {
            $scope.showLoading = true;
            OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
                $scope.showLoading = false;
            }, function () { })
        };

        $scope.AddDeclarationContainer = function () {
            $scope.k2.declarationContainersK2.push($scope.dc);
            $scope.dc = {};
        };


        /*shipment details*/
        $scope.VesselNameResults = function (text) {
            return VesselMasterService.GetVesselByVesselName(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.VesselNameResults3 = function (text) {
            return VesselScheduleService.VesselNameResults(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.VesselIdResults = function (text) {
            return VesselScheduleService.VesselIdResults(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };


        $scope.vesselNameClick = function (obj) {
            $scope.k2.declarationShipmentK2.VesselID = obj.Value;
        };

        $scope.MerchantSelected2 = function (item, Type) {
            $scope.k2.declarationShipmentK2[Type] = item.Value
        };

        $scope.editContainer = function (index) {
            $scope.showLoading = true;
            $scope.dc = $scope.k2.declarationContainersK2[index];
            $scope.sizeChanged();
            $timeout(function () { $scope.showLoading = false; }, 500);
        };

        $scope.deleteContainer = function (index) {
            $scope.k2.declarationContainersK2.splice(index, 1);
            if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
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

        $scope.AdddeclarationDocumentsK2 = function () {
            if ($scope.isEditDoc) {
                $scope.k2.declarationDocumentsK2[documentIndex] = $scope.doc;
            } else {
                $scope.k2.declarationDocumentsK2.push($scope.doc);
            }
            $scope.doc = {};
            $scope.isEditDoc = false;
            documentIndex = -1;
        };
        /*
        $scope.isEditDoc = false;
        var documentIndex = -1;        
        $scope.editDocument = function (index) {
            documentIndex = index;
            $scope.isEditDoc = true;
            $scope.showLoading = true;
            $scope.doc = $scope.k2.declarationDocumentsK2[index];
            $timeout(function () { $scope.showLoading = false; }, 500);
        };*/

        $scope.deleteDocument = function (index) {
            $scope.showLoading = true;
            $scope.k2.declarationDocumentsK2.splice(index, 1);
            if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
                var obj = { ActivityCode: 1031 };
                $scope.Activities.push(obj);
            }
            $timeout(function () { $scope.showLoading = false; }, 500);
            $scope.doc = {};

            $scope.ngTblDocuments();
        };

        $scope.AddDeclarationClause = function () {
            if ($scope.isEditClause) {
                $scope.k2.declarationClausesK2[clauseIndex] = $scope.cl;
            } else {
                $scope.k2.declarationClausesK2.push($scope.cl);
            }

            $scope.cl = {};
            $scope.isEditClause = false;
            clauseIndex = -1;
        };

        $scope.isEditClause = false;
        var clauseIndex = -1;
        $scope.editClause = function (index) {
            $scope.isEditClause = true;
            clauseIndex = index;
            $scope.showLoading = true;
            $scope.cl = $scope.k2.declarationClausesK2[index];
            $timeout(function () { $scope.showLoading = false; }, 500);
        };

        $scope.deleteClause = function (index) {
            $scope.showLoading = true;
            $scope.k2.declarationClausesK2.splice(index, 1);
            $timeout(function () { $scope.showLoading = false; }, 500);
            $scope.cl = {};
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

            if ($scope.k2.declarationInvoiceK2 != null) {

                if ($scope.k2.declarationInvoiceK2.FreightAmountPercent)
                    _Freight = $scope.k2.declarationInvoiceK2.FreightAmountPercent;

                if ($scope.k2.declarationInvoiceK2.InsuranceAmountPercent)
                    _insurance = $scope.k2.declarationInvoiceK2.InsuranceAmountPercent;

            }

            var _InvoiceCurrency = $scope.k2.declarationInvoiceK2.InvoiceCurrencyCode;
            var _invoiceCurrencyRate = $filter('filter')($scope.lookUpData.currencyList, { Text: $scope.k2.declarationInvoiceK2.InvoiceCurrencyCode })[0].ExportRate;

            var _isFreightCurrency = (angular.isUndefined($scope.k2.declarationInvoiceK2.IsFreightCurrency) ? false : $scope.k2.declarationInvoiceK2.IsFreightCurrency);
            var _isInsuranceCurrency = (angular.isUndefined($scope.k2.declarationInvoiceK2.IsInsuranceCurrency) ? false : $scope.k2.declarationInvoiceK2.IsInsuranceCurrency);
            var _incoTerm = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.IncoTerm) || $scope.k2.declarationInvoiceK2.IncoTerm == null ? 0 : $scope.k2.declarationInvoiceK2.IncoTerm);
            var _port = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.PortAmountPercent) || $scope.k2.declarationInvoiceK2.PortAmountPercent == null ? 0 : $scope.k2.declarationInvoiceK2.PortAmountPercent);
            var _otherCharges = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.OthersAmountPercent) || $scope.k2.declarationInvoiceK2.OthersAmountPercent == null ? 0 : $scope.k2.declarationInvoiceK2.OthersAmountPercent);

            itemEntryIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k2/item-entry.html?v=' + Utility.Version,
                controller: 'AddEditk2ItemEntryCntrl',
                windowClass: 'app-modal-window4',
                resolve: {
                    dataObj: function () {
                        return {
                            itemEntry: (itemEntryIndex == -1 ? {} : $scope.k2.declarationItemsK2[index]),
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
                            DestinationCountry: $scope.k2.declarationInvoiceK2.DestinationCountry
                        }
                    }
                }
            });

            modalInstance.result.then(function (res) {

                if (res.declarationSubItemK2 != undefined) {
                    res.declarationSubItemK2 = $.map(res.declarationSubItemK2, function (el) { return el });
                }

                if (itemEntryIndex != -1) {
                    if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
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
                    $scope.k2.declarationItemsK2[itemEntryIndex] = res;
                }
                else {
                    if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
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
                    $scope.k2.declarationItemsK2.push(res);
                }

                itemEntryIndex = -1;

                $scope.ngTblItemEntry();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };

        $scope.CopyItemEntry = function (obj) {
            var copyItemEntry = angular.copy(obj);
            if ($scope.k2.declarationItemsK2 != null) {
                $scope.k2.declarationItemsK2.push(copyItemEntry);
            }
            if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
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

        $scope.deleteItem = function (index) {
            $scope.k2.declarationItemsK2.splice(index, 1);
            if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
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



        $scope.btncustom = false;
        $scope.GenerateFile = function (k2) {
            if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.CheckSubItems(k2) && $scope.CheckContainerNos(k2)) {
                $scope.btncustom = true;
                k2.ApprovedOn = moment();
                k2Service.GenerateFile(k2).then(function (d) {
                    $scope.btncustom = false;

                    /*Activity Save*/
                    var arr = new Array();
                    angular.forEach($scope.Activities, function (obj, i) {
                        debugger;
                        var obj = {
                            //LinkDocumentNo: d.data.orderNo,
                            TransactionNo: k2.DeclarationNo,
                            ActivityCode: obj.ActivityCode
                        }
                        arr.push(obj);
                    });

                    k2Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/

                    $scope.customresponses = d.data.customResponse;
                    $scope.ediResponse = d.data.ediResponse;
                    $scope.ammendantsResponse = d.data.ammendantsResponse;
                    $scope.dutyAmountlist = d.data.dutyAmountlist;
                    growlService.growl('Submitted to Customs successfully..!', 'success');

                    $timeout(function () {
                        $scope.active = 8;
                    }, 500);
                }, function (err) { });
            }
        };
        $scope.clear = function () {
            //$state.transitionTo($state.current, $stateParams, {
            //    reload: true,
            //    inherit: false,
            //    notify: true
            //});
            //// $route.reload('/declaration/k2declaration/NEW');
            $state.go('k2declaration', { 'declarationNo': '' }, { reload: true });
        };

        $scope.back = function () {
            //$location.path('/declaration/k2inquiry');
            $state.go('k2inquiry', {});
        };

        $scope.isFrmK2Valid = false;
        $scope.$watch('frmk2.$valid', function (isValid) {
            $scope.isFrmK2Valid = isValid;
        });

        $scope.ValidatePorts = function () {
            if ($scope.k2.TransportMode == 1021) {
                if ($scope.k2.declarationShipmentK2 != undefined) {
                    if (($scope.k2.declarationShipmentK2.LoadingPort != undefined && $scope.k2.declarationShipmentK2.LoadingPort != '' && $scope.k2.declarationShipmentK2.DischargePort != undefined && $scope.k2.declarationShipmentK2.DischargePort != '') && $scope.k2.declarationShipmentK2.LoadingPort == $scope.k2.declarationShipmentK2.DischargePort) {
                        growlService.growl('Loading Port and Discharge Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k2.declarationShipmentK2.LoadingPort != undefined && $scope.k2.declarationShipmentK2.LoadingPort != '' && $scope.k2.declarationShipmentK2.TranshipmentPort != undefined && $scope.k2.declarationShipmentK2.TranshipmentPort != '') && $scope.k2.declarationShipmentK2.LoadingPort == $scope.k2.declarationShipmentK2.TranshipmentPort) {
                        growlService.growl('Loading Port and Transhipment Port can not be the same', 'danger');
                        return false;
                    }
                    else if (($scope.k2.declarationShipmentK2.TranshipmentPort != undefined && $scope.k2.declarationShipmentK2.TranshipmentPort != '' && $scope.k2.declarationShipmentK2.DischargePort != undefined && $scope.k2.declarationShipmentK2.DischargePort != '') && $scope.k2.declarationShipmentK2.DischargePort == $scope.k2.declarationShipmentK2.TranshipmentPort) {
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
                if ($scope.k2.declarationContainersK2.length == 0) {
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
            if ($scope.k2.declarationItemsK2.length == 0) {
                growlService.growl('Atleast one item entry is required', 'danger');
                return false;
            }
            else
                return true;
        };

        $scope.ValidatePartialSave = function () {
            if ($scope.k2.ExportDate == undefined || $scope.k2.ExportDate == '') {
                growlService.growl('please select Export Date', 'danger');
                return false;
            }
            else if ($scope.k2.TransportMode == undefined || $scope.k2.TransportMode == '') {
                growlService.growl('please select Transport Mode', 'danger');
                return false;
            }
            else if ($scope.k2.ShipmentType == undefined || $scope.k2.ShipmentType == '') {
                growlService.growl('please select Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k2.CustomerReferenceNo == undefined || $scope.k2.CustomerReferenceNo == '') {
                growlService.growl('please enter Reference No/Job No', 'danger');
                return false;
            }
            else if ($scope.k2.DeclarationShipmentType == undefined || $scope.k2.DeclarationShipmentType == '') {
                growlService.growl('please select Declaration Shipment Type', 'danger');
                return false;
            }
            else if ($scope.k2.TransactionType == undefined || $scope.k2.TransactionType == '') {
                growlService.growl('please select SMK Transaction Type', 'danger');
                return false;
            }
            else
                return true;
        };

        $scope.CheckContainerNos = function (obj) {
            $scope.retVal = false;
            angular.forEach(obj.declarationContainersK2, function (item, value) {
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
            angular.forEach(obj.declarationItemsK2, function (item, value) {
                angular.forEach(item.declarationSubItemK2, function (subItem, subValue) {
                    if (subItem.ItemType == 'TE' || subItem.ItemType == 'PM') {
                        $scope.retVal = true;
                    }
                });
            });
            angular.forEach(obj.declarationDocumentsK2, function (item, value) {
                if (item.SupportingDocumentType == 25819) {
                    $scope.docVal = true;
                }
            });
            if ($scope.retVal && !$scope.docVal) {
                growlService.growl('811 - EXPORT LICENCE document is required', 'danger');
                return false;
            }
            return true;
        }
        $scope.Savek2Declaration = function (k2) {
            if ($scope.isFrmK2Valid) {
                $scope.changeShipmentType($scope.k2.ShipmentType);
                if ($scope.ValidatePorts() && $scope.ValidateContainer() && $scope.ValidateItemEntry() && $scope.CheckSubItems(k2) && $scope.CheckContainerNos(k2)) {
                    $scope.showLoading = true;

                    //Commented by Prasad, Handled in API
                    //if ($scope.isConventionalCargo) {
                    //    $scope.k2.declarationContainersK2 = null;
                    //}
                    $scope.k2.IsPartial = false;
                    if (($scope.k2.DeclarationNo == null || $scope.k2.DeclarationNo == undefined || $scope.k2.DeclarationNo == "") && !$scope.k2.IsPartial) {

                        var obj = { ActivityCode: 1021 };
                        $scope.Activities.push(obj);
                        var obj = { ActivityCode: 1022 };
                        $scope.Activities.push(obj);
                    }
                    else {

                        var obj = { ActivityCode: 1022 };
                        $scope.Activities.push(obj);

                    }
                    k2Service.Savek2Declaration(k2).then(function (d) {

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

                        k2Service.SaveActivityStatus(arr).then(function (test) {
                            debugger;
                            arr = new Array();
                            $scope.Activities = new Array();
                        });
                        /*Activity Save*/
                        if (d.data != "The ContainerNo field is required.") {
                            $scope.showLoading = false;
                            growlService.growl('Declaration Saved Successfully..', 'success');
                            $scope.k2.DeclarationNo = d.data.declarationNo;
                            $scope.k2.OrderNo = d.data.orderNo;
                            //k2Service.GetDeclaration($scope.k2.DeclarationNo);
                            $state.go('k2declaration', { 'declarationNo': d.data.declarationNo });
                            $scope.IsDeclarationValidated = true;
                        }
                        else {
                            growlService.growl('The ContainerNo field is required...', 'danger');
                        }
                    }, function (err) { });
                }
            } else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };

        $scope.Savek2DeclarationPartial = function (k2) {
            $scope.changeShipmentType($scope.k2.ShipmentType);
            if ($scope.ValidatePartialSave() && $scope.ValidatePorts() && $scope.CheckSubItems(k2) && $scope.CheckContainerNos(k2)) {
                $scope.showLoading = true;

                //if ($scope.isConventionalCargo) {
                //    $scope.k2.declarationContainersK2 = null;
                //}

                $scope.k2.IsPartial = $scope.k2.IsPartial == false ? $scope.k2.IsPartial : true;
                if (($scope.k2.DeclarationNo == null || $scope.k2.DeclarationNo == undefined || $scope.k2.DeclarationNo == "") && $scope.k2.IsPartial) {
                    var obj = { ActivityCode: 1021 };
                    $scope.Activities.push(obj);
                }
                k2Service.Savek2Declaration(k2).then(function (d) {

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

                    k2Service.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/
                    if (d.data != "The ContainerNo field is required.") {
                        $scope.showLoading = false;
                        growlService.growl('Declaration ' + d.data.declarationNo + ' Saved Partially..', 'success');

                        $scope.k2.DeclarationNo = d.data.declarationNo;
                        $scope.k2.OrderNo = d.data.orderNo;
                        //k2Service.GetDeclaration($scope.k2.DeclarationNo);
                    }
                    else {
                        growlService.growl('The ContainerNo field is required...', 'danger');
                    }
                }, function (err) { });
            }
        };

        $scope.DeclineDeclaration = function (declarationNo, orderNo) {
            if ($window.confirm('Are you sure, you want to decline')) {
                k2Service.DeclineDeclaration(declarationNo, orderNo).then(function (d) {
                    growlService.growl('Declaration Declined', 'success');
                }, function (err) {

                });
            }
        }

        $scope.CustomerSelected = function (item, type, addresstype) {
            $scope.showLoading = true;
            var html = '';
            $scope.k2[type] = item.Value;
            $scope.k2[addresstype] = '';

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

                $scope.k2[addresstype] = html.toUpperCase();
                $scope.showLoading = false;
            }, function (err) { });
        };

        var DocIndex = -1;
        $scope.editDocument = function (index) {
            if ($scope.k2.declarationDocuments == null)
                $scope.k2.declarationDocuments = new Array();
            DocIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k2/document.html?v=' + Utility.Version,
                controller: 'AddEditk2DocumentCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            Document: (DocIndex == -1 ? {} : $scope.k2.declarationDocumentsK2[index]),
                            docDateTypeList: $scope.lookUpData.docDateTypeList,
                            OGACodeList: $scope.lookUpData.OGACodeList,
                            customStationCodeList: $scope.lookUpData.smkList,
                            supportingDocumentTypeList: $scope.lookUpData.SupportingDocumentTypeList,
                            declarationDocumentsK2: $scope.k2.declarationDocumentsK2,
                            OGABranchlist: $scope.lookUpData.OGABranchlist,
                            countryList: $scope.lookUpData.countryList
                        };
                    }
                }
            });
            debugger;
            modalInstance.result.then(function (res) {
                if (DocIndex != -1)
                    $scope.k2.declarationDocumentsK2[DocIndex] = res;
                else {
                    debugger;
                    if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
                        var obj = { ActivityCode: 1030 };
                        $scope.Activities.push(obj);
                    }
                    $scope.k2.declarationDocumentsK2.push(res);
                }


                DocIndex = -1;
                $scope.ngTblDocuments();
            }, function (err) {
                if (!angular.isUndefined(err.statusText)) {
                    growlService.growl(err.statusText, 'danger');
                }
            });

        };

        var conInfoIndex = -1;
        $scope.editConInfo = function (index) {
            conInfoIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k2/container-info.html?v=' + Utility.Version,
                controller: 'AddEditk2ContainerInfoCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            dc: (conInfoIndex == -1 ? {} : $scope.k2.declarationContainersK2[conInfoIndex]),
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

                if ($scope.k2.declarationContainers == null)
                    $scope.k2.declarationContainers = new Array();

                if (conInfoIndex != -1) {
                    $scope.k2.declarationContainersK2[conInfoIndex] = res;
                    if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
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
                    $scope.k2.declarationContainersK2.push(res);
                    if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
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
                if (!angular.isUndefined(err.statusText)) {
                    growlService.growl(err.statusText, 'danger');
                }
            });
        };

        $scope.CopyContainer = function (obj) {
            var copyCon = angular.copy(obj);
            if ($scope.k2.declarationContainersK2 != null) {
                copyCon.ContainerNo = '';

                $scope.k2.declarationContainersK2.push(copyCon);
            }
            if ($scope.k2.DeclarationNo != null && $scope.k2.DeclarationNo != undefined && $scope.k2.DeclarationNo != "") {
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

        var clauseIndex = -1;
        $scope.editClause = function (index) {
            clauseIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/k2/clause.html?v=' + Utility.Version,
                controller: 'AddEditk2ClauseCntrl',
                size: 'md',
                resolve: {
                    dataObj: function () {
                        return {
                            Clause: (clauseIndex == -1 ? {} : $scope.k2.declarationClausesK2[index]),
                            clauseTypeList: $scope.lookUpData.clauseTypeList
                        };
                    }
                }
            });

            modalInstance.result.then(function (res) {
                if (clauseIndex != -1)
                    $scope.k2.declarationClausesK2[clauseIndex] = res;
                else
                    $scope.k2.declarationClausesK2.push(res);

                clauseIndex = -1;
            }, function (err) {
                if (!angular.isUndefined(err.statusText)) {
                    growlService.growl(err.statusText, 'danger');
                }
            });
        };

        $scope.LoadSMKCode = function (TransType) {

            var obj = $filter('filter')($scope.lookUpData.K2ATransactionTypeList, { Value: TransType })[0];
            //$scope.k2.TransactionTypeCode = $filter('filter')($scope.lookUpData.K2ATransactionTypeList, { Value: $scope.k2.TransType })[0].Text;
            $scope.k2.TransactionTypeDescription = obj.Text;
            $scope.k2.TransactionTypeCode = obj.Code;
        };

        //$scope.exRateChangedAndInvoiceValue = function (currencyCode, field) {
        //    $scope.showLoading = true;
        //    CurrencyRateService.GetExRate($scope.k2.declarationInvoiceK2[currencyCode]).then(function (d) {
        //        $scope.k2.declarationInvoiceK2[field] = d.data;
        //        $scope.CalulateLocalCurrencyValue();
        //        $scope.showLoading = false;
        //    }, function (err) { });
        //};

        //$scope.exRateChangedAndAmountReceivedLocalValue = function (currencyCode, field) {
        //    $scope.showLoading = true;
        //    CurrencyRateService.GetExRate($scope.k2.declarationInvoiceK2[currencyCode]).then(function (d) {
        //        $scope.k2.declarationInvoiceK2[field] = d.data;
        //        $scope.CalulateAmountReceivedLocalValue();
        //        $scope.showLoading = false;
        //    }, function (err) { });
        //};

        //$scope.CalulateLocalCurrencyValue = function () {
        //    var invoiceAmount = parseFloat($scope.k2.declarationInvoiceK2.InvoiceValue);
        //    var exchangeRate = parseFloat($scope.k2.declarationInvoiceK2.ExchangeRate);

        //    if (!isNaN(invoiceAmount) && !isNaN(exchangeRate) && exchangeRate != 0) {
        //        $scope.k2.declarationInvoiceK2.LocalCurrencyValue = invoiceAmount * exchangeRate;
        //    }
        //    else {
        //        $scope.k2.declarationInvoiceK2.LocalCurrencyValue = $scope.k2.declarationInvoiceK2.InvoiceValue;
        //    }
        //};

        $scope.CalulateAmountReceivedLocalValue = function () {


            //if ($scope.k2.declarationInvoiceK2.AmountReceived == undefined)
            //    $scope.k2.declarationInvoiceK2.AmountReceived = $scope.k2.declarationInvoiceK2.InvoiceValue;

            var invoiceAmount = parseFloat($scope.k2.declarationInvoiceK2.AmountReceived);
            var exchangeRate = $filter('filter')($scope.lookUpData.currencyList, { Value: $scope.k2.declarationInvoiceK2.AmountReceivedCurrencyCode })[0].ExportRate;
            $scope.k2.declarationInvoiceK2.AmountReceivedExchangeRate = exchangeRate;

            if (!isNaN(invoiceAmount) && !isNaN(exchangeRate) && exchangeRate != 0) {
                $scope.k2.declarationInvoiceK2.AmountReceivedLocalValue = invoiceAmount * exchangeRate;
            }
            else {
                $scope.k2.declarationInvoiceK2.AmountReceivedLocalValue = $scope.k2.declarationInvoiceK2.AmountReceived;
            }
        };

        $scope.GenerateReportPDF = function (type) {
            k2Service.GenerateReportPDF($scope.branchID, declarationNo, type);
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
            //$scope.k2.declarationInvoiceK2.FreightAmountValue = $scope.k2.declarationInvoiceK2.InsuranceAmountValue = $scope.k2.declarationInvoiceK2.IncoTerm;
            $scope.IncoTermCalculation();
        };

        $scope.IncoTermCalculation = function (IsFreightCurrency, IsInsuranceCurrency) {
            var incoTerm = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.IncoTerm) || $scope.k2.declarationInvoiceK2.IncoTerm == null ? 0 : $scope.k2.declarationInvoiceK2.IncoTerm);
            var freight = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.FreightAmountPercent) || $scope.k2.declarationInvoiceK2.FreightAmountPercent == null ? 0 : $scope.k2.declarationInvoiceK2.FreightAmountPercent);
            var insurance = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.InsuranceAmountPercent) || $scope.k2.declarationInvoiceK2.InsuranceAmountPercent == null ? 0 : $scope.k2.declarationInvoiceK2.InsuranceAmountPercent);
            var port = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.PortAmountPercent) || $scope.k2.declarationInvoiceK2.PortAmountPercent == null ? 0 : $scope.k2.declarationInvoiceK2.PortAmountPercent);
            var otherCharges = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.OthersAmountPercent) || $scope.k2.declarationInvoiceK2.OthersAmountPercent == null ? 0 : $scope.k2.declarationInvoiceK2.OthersAmountPercent);
            var invoiceValue = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.InvoiceLocalAmount) || $scope.k2.declarationInvoiceK2.InvoiceLocalAmount == null ? 0 : $scope.k2.declarationInvoiceK2.InvoiceLocalAmount);
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
                FOB: $scope.k2.declarationInvoiceK2.FOBAmount,
                CIF: $scope.k2.declarationInvoiceK2.CIFAmount,
                EXW: $scope.k2.declarationInvoiceK2.EXWAmount,
                CNF: $scope.k2.declarationInvoiceK2.CNFAmount,
                CNI: $scope.k2.declarationInvoiceK2.CNIAmount,
                IsFreightCurrency: IsFreightCurrency,
                IsInsuranceCurrency: IsInsuranceCurrency
            };



            $scope.showLoading = true;
            k2Service.OutPutFOBCIF(obj).then(function (d) {
                $scope.k2.declarationInvoiceK2.FOBAmount = d.data.FOB;
                $scope.k2.declarationInvoiceK2.CIFAmount = d.data.CIF;
                $scope.k2.declarationInvoiceK2.EXWAmount = d.data.EXW;
                $scope.k2.declarationInvoiceK2.CNFAmount = d.data.CNF;
                $scope.k2.declarationInvoiceK2.CNIAmount = d.data.CNI;
                $scope.k2.declarationInvoiceK2.FreightAmount = d.data.freight;
                $scope.k2.declarationInvoiceK2.InsuranceAmount = d.data.insurance;
                $scope.k2.declarationInvoiceK2.CIFCAmount = d.data.CIFC;
                $scope.showLoading = false;
            }, function (err) { });
        };



        $scope.GetCustomResponse = function (declarationNo) {
            k2Service.GetCustomResponse(declarationNo).then(function (d) {

                $scope.customresponses = d.data.customResponse;
                $scope.ediResponse = d.data.ediResponse;
                $scope.ammendantsResponse = d.data.ammendantsResponse;
                $scope.customresponseheaderItem = d.data.customresponseheaderItem;
                $scope.dutyAmountlist = d.data.dutyAmountlist;
                //$scope.k2.MarksAndNos = $filter('htmlToPlaintext')($scope.k2.MarksAndNos);
            }, function (err) { });
        };

        $scope.DisplayResponseData = function (obj) {
            k2Service.GetCustomResponseInfo(obj).then(function (d) {
                $scope.customresponseheaderItem = d.data;
            }, function (err) { });
        };

        $scope.CloneK2 = function (declarationNo) {
            $scope.showLoading = true;
            k2Service.CloneDeclaration(declarationNo).then(function (d) {
                $scope.IsCloneBtnDisabled = true;
                $scope.k2 = d.data.declaration;
                $scope.k2.DeclarationNo = null;
                $scope.isDeclined = false;
                $scope.isFromOrderEntry = false;
                $scope.declarationOrderStatus = null;
                $scope.IsDeclarationValidated = false;
                $scope.validateDates();
                $scope.validateInputDecimal();
                $scope.k2.OpenDate = moment();
                $scope.k2.ExportDate = moment();

                //if (!angular.isUndefined($scope.k2.DeclarantID) && $scope.k2.DeclarantID != null && $scope.k2.DeclarantID != '') {
                //    $scope.k2.DeclarantIDText = $scope.k2.DeclarantID + " - " + $scope.k2.DeclarantName + " - " + $scope.k2.DeclarantNRIC;
                //}
                if (!angular.isUndefined($scope.k2.DeclarantID) && $scope.k2.DeclarantID != "" && $scope.k2.DeclarantID != null) {
                    $scope.k2.DeclarantIDText = $scope.k2.DeclarantID;

                    if (!angular.isUndefined($scope.k2.DeclarantName) && $scope.k2.DeclarantName != "" && $scope.k2.DeclarantName != null) {
                        $scope.k2.DeclarantIDText += " - " + $scope.k2.DeclarantName;
                    }

                    if (!angular.isUndefined($scope.k2.DeclarantNRIC) && $scope.k2.DeclarantNRIC != "" && $scope.k2.DeclarantNRIC != null) {
                        $scope.k2.DeclarantIDText += " - " + $scope.k2.DeclarantNRIC;
                    }
                }
                //if ($scope.k2.DeclarantID != "" && $scope.k2.DeclarantName != "" && $scope.k2.DeclarantNRIC != "")
                //    $scope.k2.DeclarantIDText = $scope.k2.DeclarantID + " - " + $scope.k2.DeclarantName + " - " + $scope.k2.DeclarantNRIC;
                $scope.showLoading = false;
                $scope.IsNew = true;
                $scope.customresponses = null;
                $scope.active = 0;
                $scope.ediResponse = null;

                $scope.k2.IsPartial = true;
            }, function (err) { });
        };

        $scope.CurrencyRateChanged = function () {
            var invoiceValue = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.InvoiceValue) || $scope.k2.declarationInvoiceK2.InvoiceValue == null ? 0 : $scope.k2.declarationInvoiceK2.InvoiceValue);
            var exportRate = $filter('filter')($scope.lookUpData.currencyList, { Value: $scope.k2.declarationInvoiceK2.InvoiceCurrencyCode })[0].ExportRate;
            $scope.k2.declarationInvoiceK2.InvoiceLocalAmount = (invoiceValue * exportRate).toFixed(2);

            /*
            $scope.k2.declarationInvoiceK2.FreightAmountCurrencyCode = $scope.k2.declarationInvoiceK2.InvoiceCurrencyCode;
            $scope.k2.declarationInvoiceK2.InsuranceAmountCurrencyCode = $scope.k2.declarationInvoiceK2.InvoiceCurrencyCode;
            commented by vijay
            */

            $scope.k2.declarationInvoiceK2.CurrencyExRate = exportRate.toFixed(4);
            //$scope.k2.declarationInvoiceK2.FreightAmountExRate = exportRate.toFixed(4);
            //$scope.k2.declarationInvoiceK2.InsuranceAmountExRate = exportRate.toFixed(4);
        };

        $scope.ChargesInfoCurrencyRateChanged = function (AmountPercent, IsPercent, CurrencyCode, AmountValue) {
            var invoiceValue = parseFloat(angular.isUndefined($scope.k2.declarationInvoiceK2.InvoiceValue) || $scope.k2.declarationInvoiceK2.InvoiceValue == null ? 0 : $scope.k2.declarationInvoiceK2.InvoiceValue);
            var exportRate = $filter('filter')($scope.lookUpData.currencyList, { Value: CurrencyCode })[0].ExportRate;
            if (IsPercent) {
                var value = (invoiceValue / 100) * parseFloat(AmountPercent);
                $scope.k2.declarationInvoiceK2[AmountValue] = (value * exportRate).toFixed(2);
            }
            else {
                $scope.k2.declarationInvoiceK2[AmountValue] = (parseFloat(AmountPercent) * exportRate).toFixed(2);
            }
            if (AmountValue == 'PortAmountValue') {
                $scope.k2.declarationInvoiceK2.PortAmountExRate = exportRate.toFixed(4);
            }
            if (AmountValue == 'FreightAmountValue') {

                $scope.k2.declarationInvoiceK2.FreightAmountExRate = exportRate.toFixed(4);
            }
            if (AmountValue == 'InsuranceAmountValue') {

                $scope.k2.declarationInvoiceK2.InsuranceAmountExRate = exportRate.toFixed(4);
            }
            if (AmountValue == 'OthersAmountValue') {
                $scope.k2.declarationInvoiceK2.OthersAmountExRate = exportRate.toFixed(4);
            }
        };
        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }

        $scope.Calculatepercentageamount = function () {

            if ($scope.k2.declarationInvoiceK2.IsFreightCurrency == true) {

                var Freight = parseFloat($scope.k2.declarationInvoiceK2.FreightAmountPercent);
                if (Freight > 100) {

                    growlService.growl('Freight Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k2.declarationInvoiceK2.FreightAmountPercent = '';
                    $scope.k2.declarationInvoiceK2.FreightAmountValue = 0;
                }

            }

            if ($scope.k2.declarationInvoiceK2.IsInsuranceCurrency == true) {
                var Insurance = parseFloat($scope.k2.declarationInvoiceK2.InsuranceAmountPercent);
                if (Insurance > 100) {

                    growlService.growl('Insurance Amount Percent percentage cannot be gratherthan 100', 'danger')
                    $scope.k2.declarationInvoiceK2.InsuranceAmountPercent = '';
                    $scope.k2.declarationInvoiceK2.InsuranceAmountValue = 0;
                }
            }

        }
        $scope.ContainerFileUpload = function (e) {
            if (angular.isUndefined($scope.k2.declarationContainersK2))
                $scope.k2.declarationContainersK2 = new Array();
            
            var file = document.getElementById('containerFile').files[0];
            debugger;
            UtilityFunc.GetExcelData(file, '1TradeK1Container').then(function (d) {
                if (d.length == 0) {
                    growlService.growl('Excel file Upload failed', 'danger');
                } else {
                    debugger;
                    angular.forEach(d, function (item, index) {
                        debugger;
                        var Status = $filter('filter')($scope.lookUpData.containerStatusList, { Text: item.Status })[0].Value;
                        var Type1 = $filter('filter')($scope.lookUpData.jobTypeList, { Text: item.ContainerType })[0].Value;
                        var SOC = !angular.isUndefined(item.SOCType) ? item.SOCType.toUpperCase() == 'YES' ? true : false : false;

                        var obj = {
                            ContainerNo: item.ContainerNo,
                            Size: item.Size,
                            Type: item.Type,
                            IsSOC: SOC,
                            ContainerStatus: Status,
                            EQDStatus: Type1
                        };
                        $scope.k2.declarationContainersK2.push(obj);
                    });
                    $timeout(function () {
                        $scope.ngTblContainerInfo();
                        growlService.growl('Excel file Uploaded Successfully', 'success');

                    }, 500);
                }
            }, function (err) {
                s
            });
        }



        $scope.CargoFileUpload = function (e) {
            if (angular.isUndefined($scope.k2.declarationItemsK2))
                $scope.k2.declarationItemsK2 = new Array();

            var file = document.getElementById('cargoFile').files[0];
            debugger;
            UtilityFunc.GetExcelData(file, '1TradeK1Cargo').then(function (d) {
                debugger;
                if (d.length == 0) {
                    growlService.growl('Excel file Upload failed', 'danger');
                } else {
                    angular.forEach(d, function (item, index) {
                        //   var countryListCode = $filter('filter')($scope.lookUpData.countryList, { Value: item.CountryofFinalDestination })[0].Text;
                        var obj = {
                            ProductCode: item.Product,
                            OriginCountryCode: item.CountryOfOrigin,
                            // OriginCountryCode: !angular.isUndefined(item.CountryofFinalDestination) ? item.CountryofFinalDestination.toUpperCase() : '',
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
                        $scope.k2.declarationItemsK2.push(obj);
                    });

                    $timeout(function () {
                        $scope.ngTblItemEntry();
                        growlService.growl('Excel file Uploaded Successfully', 'success');
                    }, 500);
                }
            }, function (err) {
                
            });
        }

        /*Generate K2 from K8*/

        $scope.GenearateK2FromK8 = function () {

            var declarationNo = $scope.k8declarationNo;
            if (declarationNo != null && declarationNo != "") {
                k2Service.GenearateK2FromK8(declarationNo).then(function (d) {

                    $scope.k2 = d.data.k2;
                    $scope.k2.TransactionType = '25103';
                    $scope.k2.DeclarationNo = null;
                    // $state.go('k2declaration', { 'declarationNo': d.data.declarationNo });
                }, function (err) {

                });
            }
        }

        $scope.validateDates = function () {
            if (!angular.isUndefined($scope.k2) && $scope.k2 != null) {
                if (!angular.isUndefined($scope.k2.declarationExcemptionK2) && $scope.k2.declarationExcemptionK2 != null) {
                    if ($scope.k2.declarationExcemptionK2.SalesTaxRegistrationDate == null) {
                        $scope.k2.declarationExcemptionK2.SalesTaxRegistrationDate = undefined;
                    }
                    else
                        $scope.k2.declarationExcemptionK2.SalesTaxRegistratonDate = moment($scope.k2.declarationExcemptionK2.SalesTaxRegistratonDate);
                    if ($scope.k2.declarationExcemptionK2.ExcemptionDate == null) {
                        $scope.k2.declarationExcemptionK2.ExcemptionDate = undefined;
                    }
                    else
                        $scope.k2.declarationExcemptionK2.ExcemptionDate = moment($scope.k2.declarationExcemptionK2.ExcemptionDate);
                }
                if (!angular.isUndefined($scope.k2.declarationInvoiceK2) && $scope.k2.declarationInvoiceK2 != null) {
                    if ($scope.k2.declarationInvoiceK2.InvoiceDate == null) {
                        $scope.k2.declarationInvoiceK2.InvoiceDate = undefined;
                    }
                    else
                        $scope.k2.declarationInvoiceK2.InvoiceDate = moment($scope.k2.declarationInvoiceK2.InvoiceDate);
                }
                if (!angular.isUndefined($scope.k2.OpenDate) && $scope.k2.OpenDate != null) {
                    $scope.k2.OpenDate = moment($scope.k2.OpenDate);
                }
                else
                    $scope.k2.OpenDate = undefined;

                if (!angular.isUndefined($scope.k2.ExportDate) && $scope.k2.ExportDate != null) {
                    $scope.k2.ExportDate = moment($scope.k2.ExportDate);
                }
                else
                    $scope.k2.ExportDate = undefined;

                if (!angular.isUndefined($scope.k2.declarationShipmentK2) && $scope.k2.declarationShipmentK2 != null) {
                    if ($scope.k2.declarationShipmentK2.ETADate == null) {
                        $scope.k2.declarationShipmentK2.ETADate = undefined;
                    }
                    else
                        $scope.k2.declarationShipmentK2.ETADate = moment($scope.k2.declarationShipmentK2.ETADate);
                }

                if (!angular.isUndefined($scope.k2.declarationDocumentsK2) && $scope.k2.declarationDocumentsK2 != null) {
                    angular.forEach($scope.k2.declarationDocumentsK2, function (item, index) {
                        if ($scope.k2.declarationDocumentsK2[index].DocDate == null) {
                            $scope.k2.declarationDocumentsK2[index].DocDate = undefined;
                        }
                        else
                            $scope.k2.declarationDocumentsK2[index].DocDate = moment($scope.k2.declarationDocumentsK2[index].DocDate);
                    });

                }
            }

        }
        $scope.onExcemptionChange = function () {
            if ($scope.k2.declarationExcemptionK2.GeneralExcemptionType != 10307 || $scope.k2.declarationExcemptionK2.GeneralExcemptionType != 10308 || $scope.k2.declarationExcemptionK2.GeneralExcemptionType != 10309) {
                $scope.k2.declarationExcemptionK2.ExcemptionDate = null;
            }
            if ($scope.k2.declarationExcemptionK2.GeneralExcemptionType != 10301 || $scope.k2.declarationExcemptionK2.GeneralExcemptionType != 10302 || $scope.k2.declarationExcemptionK2.GeneralExcemptionType != 10303 || $scope.k2.declarationExcemptionK2.GeneralExcemptionType != 10304) {
                $scope.k2.declarationExcemptionK2.Country = null;
            }
        }

        /*End*/
        $scope.init();
    }]);


angular.module('LogiCon').controller('AddEditk2ContainerInfoCntrl', ['$scope', '$uibModalInstance', 'OrderEntryService', 'dataObj', 'growlService', '$window', 'UtilityFunc', function ($scope, $uibModalInstance, OrderEntryService, dataObj, growlService, $window, UtilityFunc) {
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
    $scope.SOCK2Checked = function () {

        $scope.frmContainerInfo.ContainerNo.$$runValidators($scope.frmContainerInfo.ContainerNo.$modalValue, $scope.frmContainerInfo.ContainerNo.$viewValue, function () {
            $scope.dc.ContainerNo = $scope.frmContainerInfo.ContainerNo.$viewValue;
        });
    }
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

    $scope.sizeChanged = function () {
        $scope.showLoading = true;
        OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
            $scope.showLoading = false;
        }, function () { })
    };

    if (!angular.isUndefined($scope.dc.Size)) {
        $scope.showLoading = true;
        OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
            $scope.showLoading = false;
        }, function () { })
    }
}]);