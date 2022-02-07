angular.module('LogiCon').controller('k1ACntrl', ['$scope', '$uibModal', 'Utility', '$anchorScroll', '$location', 'k1AService', 'PortAreaService', 'limitToFilter', 'NgTableParams', '$filter', '$timeout', 'growlService', 'UtilityFunc', 'OrderEntryService', 'CustomDeclarantService', 'MerchantProfileService', 'AddressService', '$stateParams', '$state',
    function ($scope, $uibModal, Utility, $anchorScroll, $location, k1AService, PortAreaService, limitToFilter, NgTableParams, $filter, $timeout, growlService, UtilityFunc, OrderEntryService, CustomDeclarantService, MerchantProfileService, AddressService, $stateParams, $state) {
        var declarationNo = $stateParams.declarationNo;
        $scope.init = function () {
            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.timeFormat = UtilityFunc.TimeFormat();
            $scope.datetimeFormat = UtilityFunc.DateTimeFormat();
            $scope.defaultCurrency = UtilityFunc.DefaultCurrency();
            $scope.defaultCountry = UtilityFunc.DefaultCountry();
            $scope.BranchID = UtilityFunc.BranchID();
            $scope.transportMode = 1021;
            $scope.time = null;
            $scope.IsNew = true;
            $scope.IsDeclarationValidated = false;
            $scope.lookUpData = {};
            $scope.declarationOrderStatus = {};
            $scope.GetLookupData();
            $scope.dateFormat = UtilityFunc.DateFormat();
            $scope.isConventionalCargo = false;
            $scope.K1A = {
                declarationContainerK1A: new Array(),
                declarationHeaderK1A: {
                    DeclarationShipmentType: 25850,
                    BranchID: UtilityFunc.BranchID(),
                    DeclarationNo: null,
                    DeclarationDate: null,
                    DeclarationType: null,
                    K1RegistrationNo: null,
                    NatureOfTransaction: null,
                    OpenDate: moment(),
                    ExportDate: null,
                    OrderNo: null,
                    TransportMode: null,
                    hipmentType: null,
                    TransactionType: null,
                    Importer: null,
                    Exporter: null,
                    IsActive: null,
                    CreatedBy: null,
                    CreatedOn: null,
                    ModifiedBy: null,
                    ModifiedOn: null,
                    IsApproved: null,
                    ApprovedBy: null,
                    ApprovedOn: null,
                    IsPartial: null,
                    CustomStationCode: null,
                    ShippingAgent: null,
                    DeclarantID: null,
                    CargoClass: null,
                    CargoDescription: null,
                    CustomerReferenceNo: null,
                    ExtraCargoDescription: null,
                    MarksAndNos: null,
                   
                    ContractNo: null,
                    ContractDate: null,
                    DeliveryTerm: null,
                    OriginCountry: null,
                    DischargePort: null
                },
                declarationSectionK1A: {
                    BranchID: UtilityFunc.BranchID(),

                    DeclarationNo: null,
                    IsBuyerRegulation: false,
                    IsPriceInfluence: false,
                    IsRestrictionsImposed: false,
                    IsSalesPriceConsideration: false,
                    RestrictionsText: null,
                    IsRoyaltyOnGoods: false,
                    PaidAmount: null,
                    CurrencyCode: null,
                    ExchangeRate: null,
                    TotalA: null,
                    SalesCommission: null,
                    BuyerCommission: null,
                    BrokerageCost: null,
                    PackingCost: null,
                    MaterialCost: null,
                    UtilityCost: null,
                    ProductionCost: null,
                    EngineeringCost: null,
                    RoyalityCost: null,
                    LicenseFee: null,
                    ResaleCost: null,
                    PlaceOfImport: null,
                    FreightCost: null,
                    HandlingCost: null,
                    InsuranceCost: null,
                    TotalB: null,
                    AfterTrasportCost: null,
                    OtherCost: null,
                    DutyPaidAmount: null,
                    TotalC: null,
                    TotalValueDeclared: null,
                    CreatedBy: null,
                    CreatedOn: null,
                    ModifiedBy: null,
                    ModifiedOn: null,
                },
                declarationInvoiceK1A: {

                    BranchID: $scope.BranchID,
                    InvoiceCurrencyCode: 'MYR'
                },

            };
            $scope.showLoading = true;
            $scope.customresponses = {};
            $scope.customresponseheaderItem = {};
            if (declarationNo == 'NEW' || declarationNo == "") {
                $scope.K1A.declarationHeaderK1A.TransportMode = 1021;
                //  $scope.IsNew = false;
            }
            if (declarationNo != "NEW" && declarationNo != "") {
                $scope.IsNew = false;
            }
            else {
                $scope.IsNew = true;
            }
            if (!angular.isUndefined(declarationNo) && declarationNo != 'NEW' && declarationNo != "") {
                $scope.GetDeclaration(declarationNo);
                //$scope.IsNew = true;
            }
            $scope.K1A.declarationSectionK1A.CurrencyCode = 'MYR';

            /*Activity Objects*/
            $scope.Activity = {};
            $scope.Activities = new Array();
            /*Activity Objects*/


        };
        $scope.tempFlag = false;
        $scope.toggleFeedback = function () {
            $scope.tempFlag = !$scope.tempFlag;
            if ($scope.tempFlag) {

                jQuery("#feedback").animate({ right: "-0px" });
            }
            else
                jQuery("#feedback").animate({ right: "-210px" });
        }
        $scope.navigateTo = function (id) {
            $scope.toggleFeedback();
            $location.hash(id);
            $anchorScroll();

        };


        $scope.CustomerSelected = function (item, type, addresstype) {

            $scope.showLoading = true;
            var html = '';
            $scope.K1A.declarationHeaderK1A[type] = item.Value;
            $scope.K1A.declarationHeaderK1A[addresstype] = '';

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
                $scope.K1A.declarationHeaderK1A[addresstype] = html;
                $scope.showLoading = false;
            }, function (err) {
            });
        };

        $scope.GetLookupData = function () {
            k1AService.GetLookupData().then(function (d) {
                $scope.lookUpData = d.data;
                $scope.GetCurrencyValue($scope.K1A.declarationSectionK1A.CurrencyCode);
                $scope.CurrencyRateChanged();
            });
        };
        var conInfoIndex = -1;
        $scope.editConInfo = function (index) {

            conInfoIndex = index;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Declaration/Templates/K1A/container-info.html?v=' + Utility.Version,
                controller: 'AddEditContainerInfoCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            dc: (conInfoIndex == -1 ? {} : $scope.K1A.declarationContainerK1A[conInfoIndex]),
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
                    $scope.K1A.declarationContainerK1A[conInfoIndex] = res;
                    if ($scope.K1A.declarationHeaderK1A.DeclarationNo != null
                        && $scope.K1A.declarationHeaderK1A.DeclarationNo != undefined
                        && $scope.K1A.declarationHeaderK1A.DeclarationNo != "" && !$scope.K1A.declarationHeaderK1A.IsPartial) {
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
                    if ($scope.K1A.declarationHeaderK1A.DeclarationNo != null
                         && $scope.K1A.declarationHeaderK1A.DeclarationNo != undefined
                         && $scope.K1A.declarationHeaderK1A.DeclarationNo != "" && !$scope.K1A.declarationHeaderK1A.IsPartial) {
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
                    $scope.K1A.declarationContainerK1A.push(res);
                }
                conInfoIndex = -1;
                $scope.ngTblContainerInfo();
            }, function (err) {
                if (!angular.isUndefined(err.statusText))
                    growlService.growl(err.statusText, 'danger');
            });
        };

        $scope.ChangeTransportMode = function (TransportMode) {
            $scope.transportMode = TransportMode;
            if ($scope.K1A.TransportMode == 1020 || $scope.K1A.TransportMode == 1024 || $scope.K1A.TransportMode == 1025 || $scope.K1A.ShipmentType == 26533 || $scope.K1A.ShipmentType == 26531) {
                $scope.isConventionalCargo = true;
            }
            else
                $scope.isConventionalCargo = false;
        };
        $scope.changeShipmentType = function (ShipmentType) {

            if ($scope.K1A.declarationHeaderK1A.ShipmentType == 26533 || $scope.K1A.declarationHeaderK1A.ShipmentType == 26531 || $scope.K1A.declarationHeaderK1A.TransportMode == 1020 || $scope.K1A.declarationHeaderK1A.TransportMode == 1024 || $scope.K1A.declarationHeaderK1A.TransportMode == 1025) {
                $scope.isConventionalCargo = true;
            }
            else
                $scope.isConventionalCargo = false;
        };

        $scope.containerInfoIndex = -1;
        $scope.ngTblContainerInfo = function () {
            $scope.tblContainer = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.K1A.declarationContainerK1A == null ? $scope.K1A.declarationContainerK1A = new Array() : $scope.K1A.declarationContainerK1A.length,
                getData: function ($defer, params) {

                    var conData = params.sorting() ? $filter('orderBy')($scope.K1A.declarationContainerK1A, params.orderBy()) : $scope.K1A.declarationContainerK1A;
                    $defer.resolve(conData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.containerInfoIndex = (params.page() - 1) * params.count();
                }
            });
        }

        $scope.deleteContainer = function (index) {
            $scope.K1A.declarationContainerK1A.splice(index, 1);
            $scope.ngTblContainerInfo();
            if ($scope.K1A.declarationHeaderK1A.DeclarationNo != null
                         && $scope.K1A.declarationHeaderK1A.DeclarationNo != undefined
                         && $scope.K1A.declarationHeaderK1A.DeclarationNo != "" && !$scope.K1A.declarationHeaderK1A.IsPartial) {
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
        };

        $scope.CopyContainer = function (obj) {
            var copyCon = angular.copy(obj);
            if ($scope.K1A.declarationContainerK1A != null) {
                copyCon.ContainerNo = '';
                $scope.K1A.declarationContainerK1A.push(copyCon);
            }
            if ($scope.K1A.declarationHeaderK1A.DeclarationNo != null
                         && $scope.K1A.declarationHeaderK1A.DeclarationNo != undefined
                         && $scope.K1A.declarationHeaderK1A.DeclarationNo != "" && !$scope.K1A.declarationHeaderK1A.IsPartial) {
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
            k1AService.GenerateReportPDF($scope.BranchID, declarationNo, type);
        };

        $scope.Savek1ADeclarationPartial = function (K1A) {
            if ($scope.ValidatePartialSave() && $scope.CheckContainerNos(K1A)) {

                $scope.K1A.declarationHeaderK1A.IsPartial = $scope.K1A.declarationHeaderK1A.IsPartial == false ? $scope.K1A.declarationHeaderK1A.IsPartial : true;
                $scope.CurrencyRateChanged();

                if (($scope.K1A.declarationHeaderK1A.DeclarationNo == null || $scope.K1A.declarationHeaderK1A.DeclarationNo == undefined || $scope.K1A.declarationHeaderK1A.DeclarationNo == "") && $scope.K1A.declarationHeaderK1A.IsPartial) {
                    var obj = { ActivityCode: 1021 };
                    $scope.Activities.push(obj);
                }

                k1AService.Savek1ADeclaration(K1A).then(function (d) {
                    //if (d.data != "The ContainerNo field is required.") {
                    $scope.showLoading = false;

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

                    k1AService.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/

                    //$scope.K1A.declarationHeaderK1A.IsPartial = $scope.K1A.declarationHeaderK1A.IsPartial == false ? $scope.K1A.declarationHeaderK1A.IsPartial : true;
                    growlService.growl('Declaration ' + d.data.declarationNo + ' Saved Partially..', 'success');
                    $scope.K1A.declarationHeaderK1A.DeclarationNo = d.data.declarationNo;
                    //$scope.K1A.declarationHeaderK1A.OrderNo = d.data.orderNo;
                    //k1AService.GetDeclaration(d.data.declarationNo);
                    //$scope.IsDeclarationValidated = true;
                    //}
                    //else {
                    //    growlService.growl('The ContainerNo field is required...', 'danger');
                    //}
                }, function (err) { });
            }
        }
        //
        //$scope.GetDeclaration = function (declarationNo) {
        //    
        //    if (!angular.isUndefined(declarationNo) && declarationNo != 'NEW' && declarationNo != "") {
        //        
        //        k1AService.GetDeclaration(declarationNo).then(function (d) {

        //            $scope.K1A = d.data;
        //            if (!$scope.K1A.declarationHeaderK1A.IsPartial)
        //                $scope.IsDeclarationValidated = true;



        //            if (!angular.isUndefined($scope.K1A.declarationHeaderK1A.DeclarantID) && $scope.K1A.declarationHeaderK1A.DeclarantID != "") {
        //                $scope.K1A.declarationHeaderK1A.DeclarantIDText = $scope.K1A.declarationHeaderK1A.DeclarantIDText;
        //            }


        //            $scope.ngTblContainerInfo();

        //        }, function (err) { });
        //    }
        //}

        $scope.ValidatePartialSave = function () {

            if ($scope.K1A.declarationHeaderK1A.OpenDate == undefined || $scope.K1A.declarationHeaderK1A.OpenDate == '') {
                growlService.growl('please select Open Date', 'danger');
                return false;
            }
            else if ($scope.K1A.declarationHeaderK1A.ExportDate == undefined || $scope.K1A.declarationHeaderK1A.ExportDate == '') {
                growlService.growl('please select  Date  of Export', 'danger');
                return false;
            }
            else if ($scope.K1A.declarationHeaderK1A.K1RegistrationNo == undefined || $scope.K1A.declarationHeaderK1A.K1RegistrationNo == '') {
                growlService.growl('please enter K1RegistrationNo', 'danger');
                return false;
            }
            else if ($scope.K1A.declarationHeaderK1A.CustomerReferenceNo == undefined || $scope.K1A.declarationHeaderK1A.CustomerReferenceNo == '') {
                growlService.growl('please enter Reference No/Job No', 'danger');
                return false;
            }
            else if ($scope.K1A.declarationHeaderK1A.NatureOfTransaction == undefined || $scope.K1A.declarationHeaderK1A.NatureOfTransaction == '') {
                growlService.growl('please select Nature Of Transaction', 'danger');
                return false;
            }
            else if ($scope.K1A.declarationHeaderK1A.DeclarationShipmentType == undefined || $scope.K1A.declarationHeaderK1A.DeclarationShipmentType == '') {
                growlService.growl('please select Declaration Shipment Type', 'danger');
                return false;
            }
            else if ($scope.K1A.declarationHeaderK1A.ShipmentType == undefined || $scope.K1A.declarationHeaderK1A.ShipmentType == '') {
                growlService.growl('please select  Shipment Type', 'danger');
                return false;
            }
            else if ($scope.K1A.declarationHeaderK1A.TransactionType == undefined || $scope.K1A.declarationHeaderK1A.TransactionType == '') {
                growlService.growl('please select SMK TRANSACTION TYPE', 'danger');
                return false;
            }
            else
                return true;
        };

        $scope.CheckContainerNos = function (obj) {
            $scope.retVal = false;

            angular.forEach(obj.declarationContainerK1A, function (item, value) {
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

        $scope.isfrmk1AAValid = false;
        $scope.$watch('frmk1A.$valid', function (isValid) {
            $scope.isfrmk1AValid = isValid;
        });

        $scope.Savek1ADeclaration = function (K1A) {
            if ($scope.isfrmk1AValid && $scope.CheckContainerNos(K1A)) {
                $scope.showLoading = true;

                //if ($scope.isConventionalCargo) {
                //    $scope.k9.declarationContainerK9 = null;
                //}

                $scope.K1A.declarationHeaderK1A.IsPartial = false;

                if (($scope.K1A.declarationHeaderK1A.DeclarationNo == null ||
                               $scope.K1A.declarationHeaderK1A.DeclarationNo == undefined ||
                                        $scope.K1A.declarationHeaderK1A.DeclarationNo == "") &&
                                                !$scope.K1A.declarationHeaderK1A.IsPartial) {

                    var obj = { ActivityCode: 1021 };
                    $scope.Activities.push(obj);
                    var obj = { ActivityCode: 1022 };
                    $scope.Activities.push(obj);
                }
                else {
                   
                        var obj = { ActivityCode: 1022 };
                        $scope.Activities.push(obj);
                   
                }

                k1AService.Savek1ADeclaration(K1A).then(function (d) {
                    //if (d.data != "The ContainerNo field is required.") {
                    $scope.showLoading = false;

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

                    k1AService.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/

                    growlService.growl('Declaration Saved Successfully..', 'success');
                    $scope.K1A.declarationHeaderK1A.DeclarationNo = d.data.declarationNo;
                    $scope.K1A.declarationHeaderK1A.OrderNo = d.data.orderNo;
                    //k1AService.GetDeclaration(d.data.declarationNo);
                    if (d.data.orderNo && d.data.orderNo != null) {
                        $scope.IsDeclarationValidated = true;
                    }
                    //}
                    //else {
                    //    growlService.growl('The ContainerNo field is required..', 'danger');
                    //}
                }, function (err) { });


            } else {
                var error = $scope.frmk1A.$error;
                angular.forEach(error.required, function (field) {
                    if (field.$invalid) {
                        var fieldName = field.$name;
                    }
                });
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        }

        $scope.CustomDeclarantResults = function (declarantId) {
            return CustomDeclarantService.GetCustomDeclarantAutoComplete(declarantId).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) {
            });
        };
        $scope.CustomDeclarantSelected = function (obj) {

            $scope.K1A.declarationHeaderK1A.DeclarantName = obj.Name;
            $scope.K1A.declarationHeaderK1A.DeclarantDesignation = obj.Designation;
            $scope.K1A.declarationHeaderK1A.DeclarantNRIC = obj.NRIC;
            $scope.K1A.declarationHeaderK1A.DeclarantID = obj.ID;
        };

        //  $scope.Savek1ADeclaration(K1A);
       

        $scope.PortOperatorResults = function (text) {
            var operatortype = 26220;
            return OrderEntryService.operatorList(operatortype, text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.TerminalOperaterSelected = function (item) {

            $scope.K1A.declarationShipmentK1A.PortOperator = item.Value;
        };


        $scope.PortAutoComplete = function (text) {
            return PortAreaService.PortAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };
        $scope.GetK1Declaration = function () {

            k1AService.GetK1Declaration($scope.K1A.declarationHeaderK1A.K1RegistrationNo).then(function (d) {
                $scope.K1A = d.data;
                $scope.K1A.declarationSectionK1A.CurrencyCode = 'MYR';
                $scope.GetCurrencyValue("MYR");
                $scope.changeShipmentType($scope.K1A.declarationHeaderK1A.ShipmentType);
                if (d.data.declarationHeaderK1A != null) {
                    $scope.K1A.declarationHeaderK1A.K1RegistrationNo = d.data.declarationHeaderK1A.DeclarationNo;
                    delete $scope.K1A.declarationHeaderK1A.DeclarationNo;
                }
                $scope.ngTblContainerInfo();
                if (!angular.isUndefined($scope.K1A.declarationHeaderK1A) && $scope.K1A.declarationHeaderK1A != null) {


                    if ($scope.K1A.declarationHeaderK1A.ExportDate == null) {
                        $scope.K1A.declarationHeaderK1A.ExportDate = undefined;
                    }
                    else
                        $scope.K1A.declarationHeaderK1A.ExportDate = moment($scope.K1A.declarationHeaderK1A.ExportDate);
                }
                if (!angular.isUndefined($scope.K1A.declarationHeaderK1A) && $scope.K1A.declarationHeaderK1A != null) {


                    if ($scope.K1A.declarationHeaderK1A.OpenDate == null) {
                        $scope.K1A.declarationHeaderK1A.OpenDate = undefined;
                    }
                    else
                        $scope.K1A.declarationHeaderK1A.OpenDate = moment($scope.K1A.declarationHeaderK1A.OpenDate);
                }
                if (!angular.isUndefined($scope.K1A.declarationInvoiceK1A) && $scope.K1A.declarationInvoiceK1A != null) {


                    if ($scope.K1A.declarationInvoiceK1A.InvoiceDate == null) {
                        $scope.K1A.declarationInvoiceK1A.InvoiceDate = undefined;
                    }
                    else
                        $scope.K1A.declarationInvoiceK1A.InvoiceDate = moment($scope.K1A.declarationInvoiceK1A.InvoiceDate);
                }
                //   $scope.ngTblContainerInfo();
            }, function () { });
        }

        $scope.IsCloneBtnDisabled = false;
        $scope.CloneK1A = function (declarationNo) {

            k1AService.CloneDeclaration(declarationNo).then(function (d) {
                $scope.K1A = d.data.declaration;
                $scope.GetCurrencyValue($scope.K1A.declarationSectionK1A.CurrencyCode);
                //if (!angular.isUndefined($scope.k9.declarationHeaderK9.DeclarantID) && $scope.k9.declarationHeaderK9.DeclarantID != "") {
                //    $scope.k9.declarationHeaderK9.DeclarantIDText = $scope.k9.declarationHeaderK9.DeclarantID;

                //    if (!angular.isUndefined($scope.k9.declarationHeaderK9.DeclarantName) && $scope.k9.declarationHeaderK9.DeclarantName != "") {
                //        $scope.k9.declarationHeaderK9.DeclarantIDText += " - " + $scope.k9.declarationHeaderK9.DeclarantName;
                //    }

                //    if (!angular.isUndefined($scope.k9.declarationHeaderK9.DeclarantNRIC) && $scope.k9.declarationHeaderK9.DeclarantNRIC != "") {
                //        $scope.k9.declarationHeaderK9.DeclarantIDText += " - " + $scope.k9.declarationHeaderK9.DeclarantNRIC;
                //    }
                //}
                if (!angular.isUndefined($scope.K1A.declarationHeaderK1A.DeclarantID) && $scope.K1A.declarationHeaderK1A.DeclarantID != "") {
                    $scope.K1A.declarationHeaderK1A.DeclarantIDText = $scope.K1A.declarationHeaderK1A.DeclarantIDText;
                }
                $scope.validateDates();
                $scope.K1A.declarationHeaderK1A.IsPartial = true;
                $scope.IsCloneBtnDisabled = true;
                $scope.K1A.declarationHeaderK1A.DeclarationNo = null;
                //$scope.K1A.declarationHeaderK1A.K1RegistrationNo = null;
                $scope.K1A.declarationHeaderK1A.OrderNo = null;
                $scope.IsDeclarationValidated = false;
                $scope.ediresponse = {};
                $scope.customResponseDetails = {};
                $scope.ngTblContainerInfo();
                $scope.showLoading = false;
                $scope.IsNew = true;
                $scope.customresponses = null;
                $scope.active = 0;
                $scope.K1A.declarationHeaderK1A.OpenDate = moment();
                $scope.K1A.declarationHeaderK1A.ExportDate = moment();
            }, function (err) { });
        }

        $scope.GetDeclaration = function (declarationNo) {
            k1AService.GetDeclaration(declarationNo).then(function (d) {
                $scope.K1A = d.data;
                $scope.changeShipmentType($scope.K1A.declarationHeaderK1A.ShipmentType);
                $scope.GetLookupData();
                if (!$scope.K1A.declarationHeaderK1A.IsPartial)
                    $scope.IsDeclarationValidated = true;


                if (!angular.isUndefined($scope.K1A.declarationHeaderK1A.DeclarantID) && $scope.K1A.declarationHeaderK1A.DeclarantID != "" && $scope.K1A.declarationHeaderK1A.DeclarantID != null) {
                    $scope.K1A.declarationHeaderK1A.DeclarantIDText = $scope.K1A.declarationHeaderK1A.DeclarantIDText;
                }
                $scope.validateDates();
                $scope.GetDeclartionStatus(declarationNo);
                $scope.GetCustomResponse(declarationNo);
                $scope.ngTblContainerInfo();
                $scope.showLoading = false;
                $scope.IsNew = false;
                $scope.customresponses = null;
                $scope.active = 0;
            }, function (err) { });
        }

        $scope.GenerateFile = function (declarationNo) {
            $scope.btncustom = true;
            k1AService.GenerateFile(declarationNo).then(function (d) {
                /*Activity Save*/
                var arr = new Array();
                angular.forEach($scope.Activities, function (obj, i) {
                    debugger;
                    var obj = {
                        //LinkDocumentNo: d.data.orderNo,
                        TransactionNo: d.data.declarationNo,
                        ActivityCode: obj.ActivityCode
                    }
                    arr.push(obj);
                });

                k1AService.SaveActivityStatus(arr).then(function (test) {
                    debugger;
                    arr = new Array();
                    $scope.Activities = new Array();
                });
                /*Activity Save*/

                k1AService.GenerateFile(declarationNo).then(function (d) {
                    $scope.btncustom = false;
                    $scope.customresponses = d.data.customResponse;
                    $scope.ediresponse = d.data.ediResponse;
                    growlService.growl('Submitted to Customs successfully..!', 'success');

                    $timeout(function () {
                        $scope.active = 8;
                    }, 500);
                }, function (err) {

                });
            });
          
        }
        $scope.GetCustomResponse = function (declarationNo) {
            k1AService.GetCustomResponse(declarationNo).then(function (d) {
                $scope.customresponses = d.data.customResponse;
                $scope.ediresponse = d.data.ediResponse;
            }, function (err) { });
        };



        $scope.GenericMerchantResults = function (text, filter, type) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.MerchantSelected = function (item, type) {
            $scope.K1A.declarationHeaderK1A[type] = item.Value
        };
        $scope.PortSelected = function (item, type) {
            debugger;
            if (type == 'PlaceOfImport') {
                $scope.K1A.declarationSectionK1A.PlaceOfImportName = item.PortName;
                $scope.K1A.declarationSectionK1A[type] = item.PortCode;
            }
            else
                $scope.K1A.declarationHeaderK1A[type] = item.PortCode;

        };
        //$scope.PortSelected = function (item, type) {
        //    $scope.K1A.declarationShipmentK1A[type] = item.PortCode;
        //    if (type == 'PlaceOfImport') {
        //        $scope.K1A.DischargePortName = $scope.K1A.declarationShipmentK1A.PlaceOfImportName;
        //        $scope.K1A.declarationShipmentK1A['DischargePort'] = item.PortCode;
        //    }
        //};
        $scope.PortOperatorResults = function (text) {
            var operatortype = 26220;
            return OrderEntryService.operatorList(operatortype, text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };
        $scope.TerminalOperaterSelected = function (item) {
            $scope.K1A.declarationShipmentK1A.PortOperator = item.Value;
        };
        $scope.CustomDeclarantResults = function (declarantId) {
            return CustomDeclarantService.GetCustomDeclarantAutoComplete(declarantId).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.CustomDeclarantSelected = function (item) {
            $scope.K1A.DeclarantName = item.Name;
            $scope.K1A.DeclarantDesignation = item.Designation;
            $scope.K1A.DeclarantNRIC = item.NRIC;
            $scope.K1A.DeclarantID = item.ID;
        };

        $scope.CurrencyRateChanged = function () {
            var invoiceValue = parseFloat(angular.isUndefined($scope.K1A.declarationInvoiceK1A.InvoiceValue) || $scope.K1A.declarationInvoiceK1A.InvoiceValue == null ? 0 : $scope.K1A.declarationInvoiceK1A.InvoiceValue);
            var importRate = $filter('filter')($scope.lookUpData.currencyList, { Value: $scope.K1A.declarationInvoiceK1A.InvoiceCurrencyCode })[0].ImportRate;
            $scope.K1A.declarationInvoiceK1A.InvoiceLocalAmount = (invoiceValue * importRate).toFixed(2);
            $scope.K1A.declarationInvoiceK1A.CurrencyExRate = importRate;

        };


        /* Basic Calculation */

        $scope.GetCurrencyValue = function (currencyExRate) {
            $scope.K1A.declarationSectionK1A.ExchangeRate = $filter('filter')($scope.lookUpData.currencyList, { Text: currencyExRate })[0].ImportRate;
        }

        $scope.CalculateTotalA = function () {
            if ($scope.K1A.declarationSectionK1A.ExchangeRate == undefined || $scope.K1A.declarationSectionK1A.ExchangeRate == "" || $scope.K1A.declarationSectionK1A.ExchangeRate == null) {
                $scope.K1A.declarationSectionK1A.ExchangeRate = 0;
            }
            if ($scope.K1A.declarationSectionK1A.PaidAmount == undefined || $scope.K1A.declarationSectionK1A.PaidAmount == "" || $scope.K1A.declarationSectionK1A.PaidAmount == null) {
                $scope.K1A.declarationSectionK1A.PaidAmount = 0;
            }
            $scope.K1A.declarationSectionK1A.TotalA = $scope.K1A.declarationSectionK1A.ExchangeRate * $scope.K1A.declarationSectionK1A.PaidAmount;
        }

        $scope.CalculateTotalB = function () {
            if ($scope.K1A.declarationSectionK1A.FreightCost == undefined || $scope.K1A.declarationSectionK1A.FreightCost == "" || $scope.K1A.declarationSectionK1A.FreightCost == null) {
                $scope.K1A.declarationSectionK1A.FreightCost = 0;
            }
            if ($scope.K1A.declarationSectionK1A.HandlingCost == undefined || $scope.K1A.declarationSectionK1A.HandlingCost == "" || $scope.K1A.declarationSectionK1A.HandlingCost == null) {
                $scope.K1A.declarationSectionK1A.HandlingCost = 0;
            }
            if ($scope.K1A.declarationSectionK1A.InsuranceCost == undefined || $scope.K1A.declarationSectionK1A.InsuranceCost == "" || $scope.K1A.declarationSectionK1A.InsuranceCost == null) {
                $scope.K1A.declarationSectionK1A.InsuranceCost = 0;
            }
            $scope.K1A.declarationSectionK1A.TotalB = parseFloat($scope.K1A.declarationSectionK1A.FreightCost) + parseFloat($scope.K1A.declarationSectionK1A.HandlingCost) + parseFloat($scope.K1A.declarationSectionK1A.InsuranceCost);
        }
        $scope.CalculateTotalC = function () {
            if ($scope.K1A.declarationSectionK1A.AfterTrasportCost == undefined || $scope.K1A.declarationSectionK1A.AfterTrasportCost == "" || $scope.K1A.declarationSectionK1A.AfterTrasportCost == null) {
                $scope.K1A.declarationSectionK1A.AfterTrasportCost = 0;
            }
            if ($scope.K1A.declarationSectionK1A.DutyPaidAmount == undefined || $scope.K1A.declarationSectionK1A.DutyPaidAmount == "" || $scope.K1A.declarationSectionK1A.DutyPaidAmount == null) {
                $scope.K1A.declarationSectionK1A.DutyPaidAmount = 0;
            }
            if ($scope.K1A.declarationSectionK1A.OtherCost == undefined || $scope.K1A.declarationSectionK1A.OtherCost == "" || $scope.K1A.declarationSectionK1A.OtherCost == null) {
                $scope.K1A.declarationSectionK1A.OtherCost = 0;
            }

            $scope.K1A.declarationSectionK1A.TotalC = parseFloat($scope.K1A.declarationSectionK1A.AfterTrasportCost) + parseFloat($scope.K1A.declarationSectionK1A.OtherCost) + parseFloat($scope.K1A.declarationSectionK1A.DutyPaidAmount);
        }
        $scope.CalculateTotalD = function () {
            if ($scope.K1A.declarationSectionK1A.TotalA == undefined || $scope.K1A.declarationSectionK1A.TotalA == "" || $scope.K1A.declarationSectionK1A.TotalA == null) {
                $scope.K1A.declarationSectionK1A.TotalA = 0;
            }
            if ($scope.K1A.declarationSectionK1A.TotalB == undefined || $scope.K1A.declarationSectionK1A.TotalB == "" || $scope.K1A.declarationSectionK1A.TotalB == null) {
                $scope.K1A.declarationSectionK1A.TotalB = 0;
            }
            if ($scope.K1A.declarationSectionK1A.TotalC == undefined || $scope.K1A.declarationSectionK1A.TotalC == "" || $scope.K1A.declarationSectionK1A.TotalC == null) {
                $scope.K1A.declarationSectionK1A.TotalC = 0;
            }

            $scope.K1A.declarationSectionK1A.TotalValueDeclared = parseFloat($scope.K1A.declarationSectionK1A.TotalA) + parseFloat($scope.K1A.declarationSectionK1A.TotalB) + parseFloat($scope.K1A.declarationSectionK1A.TotalC);
        }
        $scope.IncoTermCalculation = function (IsFreightCurrency, IsInsuranceCurrency) {
            $scope.CurrencyRateChanged();
        }
        $scope.clear = function () {
            $state.go('k1Adeclaration', { 'declarationNo': '' }, { reload: true });
        };
        $scope.DisplayResponseData = function (obj) {
            k1AService.GetCustomResponseInfo(obj).then(function (d) {
                $scope.customresponseheaderItem = d.data;
                //$scope.customresponseheaderItem.RegistrationDate = d.data.customresponseheaderItem.RegistrationDate;
            }, function (err) { });
        };
        $scope.validateDates = function () {
            if (!angular.isUndefined($scope.K1A.declarationHeaderK1A) && $scope.K1A.declarationHeaderK1A != null) {


                if ($scope.K1A.declarationHeaderK1A.ExportDate == null) {
                    $scope.K1A.declarationHeaderK1A.ExportDate = undefined;
                }
                else
                    $scope.K1A.declarationHeaderK1A.ExportDate = moment($scope.K1A.declarationHeaderK1A.ExportDate);
            }
            if (!angular.isUndefined($scope.K1A.declarationHeaderK1A) && $scope.K1A.declarationHeaderK1A != null) {


                if ($scope.K1A.declarationHeaderK1A.OpenDate == null) {
                    $scope.K1A.declarationHeaderK1A.OpenDate = undefined;
                }
                else
                    $scope.K1A.declarationHeaderK1A.OpenDate = moment($scope.K1A.declarationHeaderK1A.OpenDate);
            }
            if (!angular.isUndefined($scope.K1A.declarationInvoiceK1A) && $scope.K1A.declarationInvoiceK1A != null) {


                if ($scope.K1A.declarationInvoiceK1A.InvoiceDate == null) {
                    $scope.K1A.declarationInvoiceK1A.InvoiceDate = undefined;
                }
                else
                    $scope.K1A.declarationInvoiceK1A.InvoiceDate = moment($scope.K1A.declarationInvoiceK1A.InvoiceDate);
            }
            //
            if (!angular.isUndefined($scope.K1A.declarationHeaderK1A) && $scope.K1A.declarationHeaderK1A != null) {


                if ($scope.K1A.declarationHeaderK1A.ContractDate == null) {
                    $scope.K1A.declarationHeaderK1A.ContractDate = undefined;
                }
                else
                    $scope.K1A.declarationHeaderK1A.ContractDate = moment($scope.K1A.declarationHeaderK1A.ContractDate);
            }
        }

        $scope.DeclineDeclaration = function (declarationno, orderno) {

            k1AService.DeclineDeclaration(declarationno, orderno).then(function (d) {

                growlService.growl('', 'success');
            });
        }

        $scope.GetDeclartionStatus = function (declarationNo) {

            k1AService.GetDeclartionStatus(declarationNo).then(function (d) {

                $scope.declarationOrderStatus = d.data;
            }, function (err) { });
        };

        $scope.ContainerFileUpload = function (e) {
            if (angular.isUndefined($scope.K1A.declarationContainerK1A))
                $scope.K1A.declarationContainerK1A = new Array();

            var file = document.getElementById('containerFile').files[0];

            UtilityFunc.GetExcelData(file, '1TradeK1Container').then(function (d) {
                angular.forEach(d, function (item, index) {
                    var Status = $filter('filter')($scope.lookUpData.containerStatusList, { Text: item.Status })[0].Value;
                    var ContainerType = $filter('filter')($scope.lookUpData.jobTypeList, { Text: item.ContainerType })[0].Value;
                    var SOC = !angular.isUndefined(item.SOCType) ? item.SOCType.toUpperCase() == 'YES' ? true : false : false;
                    var obj = {
                        ContainerNo: item.ContainerNo,
                        Type: item.Type,
                        Size: item.Size,
                        IsSOC: SOC,
                        EQDStatus: ContainerType,
                        ContainerStatus: Status
                    };

                    $scope.K1A.declarationContainerK1A.push(obj);
                });

                $timeout(function () {
                    $scope.ngTblContainerInfo();
                }, 500);
            }, function (err) { });
        }




        $scope.init();

    }]);

angular.module('LogiCon').controller('AddEditContainerInfoCntrl', ['$scope', '$uibModalInstance', 'dataObj', 'OrderEntryService', 'growlService', 'UtilityFunc', function ($scope, $uibModalInstance, dataObj, OrderEntryService, growlService, UtilityFunc) {
    $scope.dc = angular.copy(dataObj.dc);
    var type = $scope.dc.Type;
    $scope.dc.Type = type;
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

        }
        else
            growlService.growl('Please enter all mandatory fields', 'danger');

    };

    $scope.sizeChanged = function () {
        $scope.showLoading = true;
        OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
            $scope.showLoading = false;
        }, function () { })
    };
    $scope.SOCChecked = function () {

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
    if (!angular.isUndefined($scope.dc.Size) && $scope.dc.Size != null) {
        $scope.showLoading = true;
        OrderEntryService.GetSizeType($scope.dc.Size).then(function (d) {
            $scope.lookUpData.TypeList = d.data;
            $scope.showLoading = false;
        }, function () { })
    }

}]);