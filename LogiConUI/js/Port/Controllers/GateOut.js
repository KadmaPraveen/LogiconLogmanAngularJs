angular.module('LogiCon').controller('GateOutCntrl', ['$scope', 'GateInService', 'OrderEntryService', 'MerchantProfileService', 'limitToFilter', 'growlService', 'CountryService', 'BookingEntryService', 'VesselMasterService', '$window', 'UtilityFunc',
    function ($scope, GateInService, OrderEntryService, MerchantProfileService, limitToFilter, growlService, CountryService, BookingEntryService, VesselMasterService, $window, UtilityFunc) {

        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();

        $scope.gi = {
            TransactionDate: moment(),
            TruckMovementDetails: [],
            ContainerMovementDetails: []
        };
        /*Activity OBjects*/
        $scope.Activity = {};
        $scope.Activities = new Array();
        /*Activity OBjects*/

        $scope.IsAddBtnDetailDisabled = false;
        $scope.IsSizeDisabled = false;
        $scope.btnText = 'Add';
        $scope.CurrentYear = parseInt(moment().format('YYYY'));
        $scope.tmdl = {
            TripType: 1511
        };
        $scope.cmdl = {
            Height: 1351,
            EFIndicator: 1041,
            BookingType: 1061,
            Material: 1330,
            YearBuilt: $scope.CurrentYear,
            ContainerStatus: 'SOUND'
        };

        $scope.getLookupData = function () {
            $scope.showLoading = true;
            GateInService.getLookupData().then(function (d) {
                $scope.showLoading = false;
                $scope.lookUpData = d.data;
            }, function (err) {

            });
        };

        $scope.GenericMerchantResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.CustomerSelected = function (item, type) {
            $scope.gi[type] = item.Value;
        };

        $scope.BookingBLNoResults = function (text) {
            return BookingEntryService.BookingBLAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.BookingBLNoSelected = function (item) {

            $scope.cmdl.BookingType = item.BookingType;
            $scope.cmdl.VesselID = item.VesselID;
            $scope.cmdl.VesselName = item.VesselName;
            $scope.cmdl.VoyageNo = item.VoyageNo;
            $scope.cmdl.ShipCallNo = item.ShipCallNo;
            $scope.cmdl.AgentName = item.ShippingAgentName;
            $scope.cmdl.AgentCode = item.ShippingAgent;
            $scope.cmdl.CustomerName = item.CustomerName;
            $scope.cmdl.CustomerCode = item.CustomerCode;
            $scope.cmdl.OrderType = item.OrderType;
            $scope.cmdl.OrderNo = item.OrderNo;

            $scope.tmdl.OrderNo = item.OrderNo;


            VesselMasterService.GetVesselMasterById(item.VesselID).then(function (d) {
                $scope.cmdl.CallSignNo = d.data.CallSignNo;
            }, function (err) { });
        };

        $scope.ValidateContainerFooters = function (Size) {
            var totalFooterSize = 0;
            angular.forEach($scope.gi.ContainerMovementDetails, function (item, key) {
                totalFooterSize += parseInt(item.Size);
            });
            totalFooterSize += parseInt(Size);

            if (totalFooterSize > 45) {
                $scope.cmdl.Size = null;
                $window.alert('Only 20 footer is allowed');
                return;
            }
        };

        $scope.sizeChanged = function (Size) {
            $scope.ValidateContainerFooters(Size);

            OrderEntryService.GetSizeType(Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
            }, function () { })
        };

        $scope.TypeChange = function (Type) {
            if (Type == 'RF')
                $scope.cmdl.Material = 1331;
        };

        $scope.ContainerNoResults = function (text) {
            return BookingEntryService.ContainerDetailAutoCompleteByContainerNo({ OrderNo: $scope.cmdl.OrderNo, ContainerNo: text }).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.ContainerSelected = function (item) {
            $scope.showLoading = true;


            $scope.ValidateContainerFooters(item.Size);

            $scope.cmdl.Size = item.Size;
            $scope.cmdl.ContainerGrade = item.ContainerGrade;
            $scope.cmdl.Temperature = item.Temperature;
            $scope.cmdl.TemperatureType = item.TempratureType;
            $scope.cmdl.Vent = item.Vent;
            $scope.cmdl.VentType = item.VentType;
            $scope.cmdl.SealNo1 = item.SealNo1;
            $scope.cmdl.SealNo2 = item.SealNo2;
            $scope.cmdl.Remarks = item.Remarks;

            $scope.tmdl.ContainerKey = item.ContainerKey;

            OrderEntryService.GetSizeType(item.Size).then(function (d) {
                $scope.lookUpData.TypeList = d.data;
                $scope.cmdl.Type = item.Type;

                $scope.TypeChange($scope.cmdl.Type);
            }, function () { })

            $scope.showLoading = false;
        };

        $scope.IsfrmGateInValid = false;
        $scope.$watch('frmGateIn.$valid', function (valid) {
            $scope.IsfrmGateInValid = valid;
        });

        $scope.SaveGateIn = function () {
            debugger;


            if ($scope.IsfrmGateInValid && $scope.gi.TruckMovementDetails.length > 0) {
                if ($scope.gi.TransactionNo == null || $scope.gi.TransactionNo == undefined
                       || $scope.gi.TransactionNo == "") {

                    var obj = { ActivityCode: 1039 };
                    $scope.Activities.push(obj);

                }
                GateInService.SaveGateIn($scope.gi).then(function (d) {

                    /*Activity Save*/
                    var arr = new Array();
                    angular.forEach($scope.Activities, function (obj, i) {
                        debugger;
                        var obj = {
                            LinkDocumentNo: d.data.TransactionNo,
                            TransactionNo: d.data.TransactionNo,
                            ActivityCode: obj.ActivityCode
                        }
                        arr.push(obj);
                    });

                    GateInService.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/
                    growlService.growl('Success', 'success');
                }, function (err) { });
            } else {
                if ($scope.gi.TruckMovementDetails.length <= 0) {
                    growlService.growl('Please add atleast one detail item', 'danger');
                }
                else
                    growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };

        $scope.IsfrmGateInDetailValid = false;
        $scope.$watch('frmGateInDetail.$valid', function (valid) {
            $scope.IsfrmGateInDetailValid = valid;
        });

        var currentIndex = -1;
        $scope.SaveGateInDetail = function () {
            if ($scope.IsfrmGateInDetailValid) {
                if (currentIndex == -1) {
                    $scope.tmdl.DateIn = $scope.gi.TransactionDate;
                    $scope.tmdl.Size = $scope.cmdl.Size;
                    $scope.tmdl.Type = $scope.cmdl.Type;

                    $scope.gi.TruckMovementDetails.push($scope.tmdl);
                    $scope.gi.ContainerMovementDetails.push($scope.cmdl);
                } else {
                    $scope.gi.TruckMovementDetails[currentIndex] = $scope.tmdl;
                    $scope.gi.ContainerMovementDetails[currentIndex] = $scope.cmdl;
                }

                var totalFooterSize = 0;
                angular.forEach($scope.gi.ContainerMovementDetails, function (item, key) {
                    totalFooterSize += parseInt(item.Size);
                });

                if (totalFooterSize == 20) {
                    var r = $window.confirm('Do you want to add another 20 footer container ?');
                    if (r) {
                        $scope.cmdl = {};
                        $scope.cmdl = {
                            Height: 1351,
                            EFIndicator: 1041,
                            BookingType: 1061,
                            Material: 1330,
                            YearBuilt: $scope.CurrentYear,
                            ContainerStatus: 'SOUND',
                            MovementType: 1501
                        };
                    } else {
                        $scope.tmdl = {
                            TripType: 1511
                        };
                        $scope.cmdl = { MovementType: 1501 };
                    }
                } else if (totalFooterSize == 40 || totalFooterSize == 45) {
                    $scope.IsAddBtnDetailDisabled = true;
                   
                    $scope.cmdl = { MovementType: 1501 };
                    $scope.tmdl = {
                        TripType: 1511
                    };
                }

                $scope.submittedDetail = false;
            } else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
            currentIndex = -1;
            $scope.btnText = 'Add';
            $scope.IsSizeDisabled = false;
        };

        $scope.EditGateInDetail = function (inx) {
            currentIndex = inx;
            $scope.tmdl = $scope.gi.TruckMovementDetails[inx];
            $scope.cmdl = $scope.gi.ContainerMovementDetails[inx];

            $scope.btnText = 'Update';
            $scope.IsAddBtnDetailDisabled = false;

            $scope.IsSizeDisabled = true;
        };

        $scope.DeleteGateInDetail = function (inx) {
            if (inx != -1) {
                $scope.gi.ContainerMovementDetails.splice(inx, 1);
                $scope.gi.TruckMovementDetails.splice(inx, 1);
            }

            $scope.cmdl = {
                Height: 1351,
                EFIndicator: 1041,
                BookingType: 1061,
                Material: 1330,
                YearBuilt: $scope.CurrentYear,
                ContainerStatus: 'SOUND',
                MovementType: 1501
            };

            $scope.tmdl = {
                TripType: 1511
            };
            $scope.IsAddBtnDetailDisabled = false;
            $scope.btnText = 'Add';
        };

        $scope.getLookupData();

        /* save merchant popover start */
        $scope.isFrmMerchant = false;
        $scope.$watch('Cntrl.frmMerchant.$valid', function (isValid) {
            $scope.isFrmMerchant = isValid;
        });
        $scope.mp = {};
        $scope.SaveMerchant = function (mp) {
            if ($scope.isFrmMerchant) {
                $scope.mp.AddressList = new Array();
                if (!angular.isUndefined(mp.address))
                    $scope.mp.AddressList.push(mp.address);

                MerchantProfileService.SaveMerchantProfile(mp).then(function (d) {
                    $scope.showLoading = false;
                    if (d.data) {
                        $scope.mp = {};
                        $scope.gi.isHaulier = false;
                        growlService.growl(d.data, 'success');
                    }
                }, function (err) {
                    growlService.growl(err.statusText, 'danger');
                });
            } else {
                growlService.growl('please entry all mandatory fields', 'danger');
            }
        };

        $scope.countryResults = function (text) {
            return CountryService.SearchCountries(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.countrySelect = function (item) {
            $scope.mp.address.CountryCode = item.Value;
        };
        /* save merchant popover end */

    }]);
