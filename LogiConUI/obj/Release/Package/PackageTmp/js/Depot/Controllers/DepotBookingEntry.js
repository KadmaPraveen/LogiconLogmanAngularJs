angular.module('LogiCon').controller('DepotBookingEntryCntrl',
    ['$scope', '$uibModal', 'UtilityFunc', 'Utility', 'DepotBookingService', 'VesselMasterService', 'VesselScheduleService', 'limitToFilter', 'MerchantProfileService', 'PortAreaService', 'JobCategoryChargesService', '$stateParams', 'growlService', '$state', '$window', 'NgTableParams', '$filter',
function ($scope, $uibModal, UtilityFunc, Utility, DepotBookingService, VesselMasterService, VesselScheduleService, limitToFilter, MerchantProfileService, PortAreaService, JobCategoryChargesService, $stateParams, growlService, $state, $window, NgTableParams, $filter) {


    $scope.LookUp = function () {

        DepotBookingService.GetLookUpData().then(function (d) {

            $scope.lookUpData = d.data;
            $scope.bookingTypeChange();
        });
    }
    $scope.init = function () {
        var defaultCurrency = UtilityFunc.DefaultCurrency();
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();

        $scope.IsNew = true;
        $scope.currentPage = 1;
        $scope.limit = 10;
        $scope.showLoading = true;
        $scope.dtmax = new Date();
        $scope.bookingEntry = {
            bookingHeader: {
                BranchID: null,
                OrderNo: null,
                BookingNo: null,
                BLNo: null,
                OrderDate: moment(),
                BookingType: null,
                TransportType: 1021,
                OrderType: null,
                CustomerCode: null,
                CustomerName: null,
                ForwarderCode: null,
                ForwarderName: null,
                ShippingAgent: null,
                ShippingAgentName: null,
                OwnerCode: null,
                LoadingPort: null,
                DischargePort: null,
                DestinationPort: null,
                VesselScheduleID: null,
                VesselID: null,
                VesselName: null,
                VoyageNo: null,
                ShipCallNo: null,
                Wharf: null,
                IsAllowLateGate: null,
                ETA: null,
                ETD: null,
                PortCutOffDry: null,
                PortCutOffReefer: null,
                FlightNo: null,
                ARNNo: null,
                VehicleNo1: null,
                VehicleNo2: null,
                WagonNo: null,
                JKNo: null,
                TotalQty: null,
                UOM: null,
                TotalVolume: null,
                TotalWeight: null,
                Commodity: null,
                MarksNos: null,
                SpecialInstructions: null,
                Remarks: null,
                IsEDI: null,
                IsCancel: null,
                IsBillable: null,
                IsPrinted: null,
                EDIDateTime: null,
                CancelDateTime: null,
                CreatedBy: null,
                CreatedOn: null,
                ModifiedBy: null,
                ModifiedOn: null,
                RelationBranchID: null
            },
            bookingContainers: new Array(),
            bookingMovements: new Array()
        };
        $scope.LookUp();
    }


    $scope.bookingTypeChange = function () {
        DepotBookingService.getOrderTypeData($scope.bookingEntry.bookingHeader.BookingType)
           .then(function (d) {
               $scope.lookUpData.orderTypeList = d.data.orderTypeList;
               $scope.lookUpData.puModeList = d.data.puModeList;


           }, function (err) { });
    };

    $scope.VesselCodeLoadingResults = function ($query) {

        return VesselMasterService.GetVesselByVesselName($query).then(function (d) {

            return limitToFilter(d.data, 15);
        });
    }

    $scope.VoyageLoadingResults = function ($query) {
        var obj = {
            VesselID: $scope.bookingEntry.bookingHeader.VesselID,
            AgentCode: $scope.bookingEntry.bookingHeader.AgentCode,
            JobType: $scope.bookingEntry.bookingHeader.BookingType,
            VoyageNo: $query
        }
        return VesselScheduleService.VoyageSearchByObj(obj).then(function (d) {
            return limitToFilter(d.data, 15);
        });
    }

    $scope.VoyageSearchSelect = function (item) {
        $scope.bookingEntry.bookingHeader.VesselScheduleID = item.VesselScheduleID
        $scope.bookingEntry.bookingHeader.VesselID = item.VesselID;
        $scope.bookingEntry.bookingHeader.PortCutOffDry = item.ClosingDate;
        $scope.bookingEntry.bookingHeader.PortCutOffReefer = item.ClosingDateRF;
        $scope.bookingEntry.bookingHeader.ETA = item.ETA;
        $scope.bookingEntry.bookingHeader.ETD = item.ETD;
        $scope.bookingEntry.bookingHeader.ShipCallNo = item.ShipCallNo;
        $scope.bookingEntry.bookingHeader.CallSignNo = item.CallSignNo;
        if ($scope.bookingEntry.bookingHeader.BookingType == 1061) {
            $scope.bookingEntry.bookingHeader.VoyageNo = item.VoyageNoOutWard;
        }
        else {
            $scope.bookingEntry.bookingHeader.VoyageNo = item.VoyageNoInWard;
        }
        //console.log(JSON.stringify(item));
    };

    $scope.ValidateTheVesselDetails = function () {

        if ($scope.bookingEntry.bookingHeader.VoyageNo == null && angular.isUndefined($scope.bookingEntry.bookingHeader.VoyageNo)) {
            $scope.bookingEntry.bookingHeader.VesselScheduleID = null;
            $scope.bookingEntry.bookingHeader.VesselID = null;
            $scope.bookingEntry.bookingHeader.PortCutOffDry = null;
            $scope.bookingEntry.bookingHeader.PortCutOffReefer = null;
            $scope.bookingEntry.bookingHeader.ETA = null;
            $scope.bookingEntry.bookingHeader.ETD = null;
            $scope.bookingEntry.bookingHeader.ShipCallNo = null;
            $scope.bookingEntry.bookingHeader.CallSignNo = null;
        }
    }
    $scope.GenericMerchantResults = function (text, filter) {
        return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };

    $scope.PortResults = function (text) {
        return PortAreaService.PortAutoComplete(text).then(function (d) {
            return limitToFilter(d.data, 15);
        }, function (err) { });
    };
    $scope.CustomerSelected = function (item, type) {
        $scope.bookingEntry.bookingHeader[type] = item.Value;
    };

    $scope.PortSelected = function (item, type) {

        $scope.bookingEntry.bookingHeader[type] = item.PortCode;
    };
    $scope.back = function () {
        $state.go('depotbookingentrylist', {});
    };


    //$scope.clear = function () {
    //    $state.transitionTo($state.current, $stateParams, {
    //        reload: true,
    //        inherit: false,
    //        notify: true
    //    });
    //};
    $scope.clear = function () {
        $state.go('depotbookingentry', { 'orderNo': '' }, { reload: true });
    };

    var conInfo = -1;
    $scope.AddContainerDetails = function (index) {
        conInfo = index;
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Depot/Templates/BookingEntry/addcontainerdetails.html?v=' + Utility.Version,
            controller: 'DepotBookingContainerInfoCntrl',
            size: 'lg',
            resolve: {
                dataObj: function () {
                    return {
                        lookUpData: $scope.lookUpData,
                        bookingContainer: (conInfo == -1 ? { conInfo: -1 } : $scope.bookingEntry.bookingContainers[conInfo])

                    }
                }
            }
        });
        modalInstance.result.then(function (bc) {

            var ContainerKey = '';
            if (conInfo == -1) {
                bc.ContainerKey = GetPaddingNo($scope.bookingEntry.bookingContainers.length + 1);
                if (typeof ($scope.bookingEntry.bookingContainers) != 'undefined') {
                    conInfo = $scope.bookingEntry.bookingContainers.length;
                    $scope.bookingEntry.bookingContainers.push(bc);
                }
                else {
                    $scope.bookingEntry.bookingContainers = new Array();
                    conInfo = 0;
                    $scope.bookingEntry.bookingContainers.push(bc);
                }

                $scope.tblSearch = { ContainerKey: bc.ContainerKey };
                JobCategoryChargesService.MovementsByCategoryCode($scope.bookingEntry.bookingHeader.OrderType, bc.ContainerKey).then(function (d) {

                    if ($scope.bookingEntry.bookingMovements != null && $scope.bookingEntry.bookingMovements.length > 0)

                        $scope.bookingEntry.bookingMovements = $scope.bookingEntry.bookingMovements.concat(d.data);
                    else
                        $scope.bookingEntry.bookingMovements = d.data;
                }, function (err) { });
            }
            else {
                $scope.bookingEntry.bookingContainers[conInfo] = bc;

                JobCategoryChargesService.MovementsByCategoryCode($scope.bookingEntry.bookingHeader.OrderType, bc.ContainerKey).then(function (d) {

                    if ($scope.bookingEntry.bookingMovements != null && $scope.bookingEntry.bookingMovements.length > 0) {

                        $scope.bookingEntry.bookingMovements = UtilityFunc.removeArrayElementByKey($scope.bookingEntry.bookingMovements, 'ContainerKey', bc.ContainerKey);
                        $scope.bookingEntry.bookingMovements = $scope.bookingEntry.bookingMovements.concat(d.data);
                    }
                    else
                        $scope.bookingEntry.bookingMovements = d.data;
                }, function (err) { });
            }
            $scope.ngTblContainerInfo();
        }, function (err) {
        });
        function GetPaddingNo(num) {
            debugger;
            var str = "" + num
            var pad = "000"
            var result = pad.substring(0, pad.length - str.length) + str

            return result;
        }
    }
    //
    $scope.containerInfoIndex = -1;
    $scope.ngTblContainerInfo = function () {
        
        if ($scope.bookingEntry.bookingContainers == null)
            $scope.bookingEntry.bookingContainers = new Array();
        $scope.tblContainerInfo = new NgTableParams({
            page: 1,
            count: 10,
            sorting: {
                name: 'asc'
            }
        }, {
            total: $scope.bookingEntry.bookingContainers.length,
            getData: function ($defer, params) {
              
                var orderedData = params.sorting() ? $filter('orderBy')($scope.bookingEntry.bookingContainers, params.orderBy()) : $scope.bookingEntry.bookingContainers;
                $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                $scope.containerInfoIndex = (params.page() - 1) * params.count();
            }
        });

    };
    //
    $scope.IsfrmBookingEntryValid = false;
    $scope.$watch('frmBookingEntry.$valid', function (valid) {
        $scope.IsfrmBookingEntryValid = valid;
    });
    $scope.ValidateContainers=function()
    {
        if ($scope.bookingEntry.bookingContainers.length == 0) {
            growlService.growl('Atleast one container is required', 'danger')
            return false;
        }
        else
            return true;
     }
    $scope.ValidatePorts = function () {
        if ($scope.bookingEntry.bookingHeader.TransportType == 1021) {
            if ($scope.bookingEntry.bookingHeader.LoadingPort == $scope.bookingEntry.bookingHeader.DischargePort) {
                growlService.growl('Loading Port and Discharge Port can not be the same', 'danger');
                return false;
            }
            else if ($scope.bookingEntry.bookingHeader.LoadingPort == $scope.bookingEntry.bookingHeader.DestinationPort) {
                growlService.growl('Loading Port and Destination Port can not be the same', 'danger');
                return false;
            }
            else
                return true;
        }
        else
            return true;
    };
    $scope.SaveBookingEntry = function (bookingHeader) {
        if ($scope.IsfrmBookingEntryValid ) {
            if ($scope.ValidatePorts() && $scope.ValidateContainers()) {
                DepotBookingService.SaveBookingEntry(bookingHeader).then(function (d) {
                    growlService.growl("Successfully Saved...", 'success');

                    $state.go('depotbookingentry', { 'orderNo': d.data.OrderNo });
                    
                }, function (err) {
                    debugger;
                });
            }
        }
        else {
            growlService.growl('Please enter all mandatory fields', 'danger');
        }
    }

    /*Edit Booking Entry*/

    var orderno = $stateParams.orderNo;
   
    if (orderno != null && orderno != undefined) {
        DepotBookingService.GetBookingEntry(orderno).then(function (d) {

            $scope.IsNew = false;
            $scope.bookingEntry = d.data;
            if (!angular.isUndefined($scope.bookingEntry.bookingContainers) && $scope.bookingEntry.bookingContainers != null && $scope.bookingEntry.bookingContainers.length > 0) {
                $scope.containerDetailRowClick($scope.bookingEntry.bookingContainers[0].ContainerKey);
            }
            if (!angular.isUndefined($scope.bookingEntry.bookingHeader.OrderDate) && $scope.bookingEntry.bookingHeader.OrderDate != null) {
                if ($scope.bookingEntry.bookingHeader.OrderDate == null) {
                    $scope.bookingEntry.bookingHeader.OrderDate = undefined;
                }
                else
                    $scope.bookingEntry.bookingHeader.OrderDate = moment($scope.bookingEntry.bookingHeader.OrderDate);
            }
            if (!angular.isUndefined($scope.bookingEntry.bookingHeader.ETA) && $scope.bookingEntry.bookingHeader.ETA != null) {
                if ($scope.bookingEntry.bookingHeader.ETA == null) {
                    $scope.bookingEntry.bookingHeader.ETA = undefined;
                }
                else
                    $scope.bookingEntry.bookingHeader.ETA = moment($scope.bookingEntry.bookingHeader.ETA);
            }
            if (!angular.isUndefined($scope.bookingEntry.bookingHeader.ETD) && $scope.bookingEntry.bookingHeader.ETD != null) {
                if ($scope.bookingEntry.bookingHeader.ETD == null) {
                    $scope.bookingEntry.bookingHeader.ETD = undefined;
                }
                else
                    $scope.bookingEntry.bookingHeader.ETD = moment($scope.bookingEntry.bookingHeader.ETD);
            }
            //
            if (!angular.isUndefined($scope.bookingEntry.bookingHeader.PortCutOffDry) && $scope.bookingEntry.bookingHeader.PortCutOffDry != null) {
                if ($scope.bookingEntry.bookingHeader.PortCutOffDry == null) {
                    $scope.bookingEntry.bookingHeader.PortCutOffDry = undefined;
                }
                else
                    $scope.bookingEntry.bookingHeader.PortCutOffDry = moment($scope.bookingEntry.bookingHeader.PortCutOffDry);
            }
            if (!angular.isUndefined($scope.bookingEntry.bookingHeader.PortCutOffReefer) && $scope.bookingEntry.bookingHeader.PortCutOffReefer != null) {
                if ($scope.bookingEntry.bookingHeader.PortCutOffReefer == null) {
                    $scope.bookingEntry.bookingHeader.PortCutOffReefer = undefined;
                }
                else
                    $scope.bookingEntry.bookingHeader.PortCutOffReefer = moment($scope.bookingEntry.bookingHeader.PortCutOffReefer);
            }
            $scope.ngTblContainerInfo();
        }, function (err) {

        });
    }
    $scope.formatDate = function (date) {
        if (date != null)
            return moment(date).format(UtilityFunc.DateFormat());
        else
            return null;
    }

    $scope.containerDetailRowClick = function (containerKey) {
        
        $scope.tblSearch = { ContainerKey: containerKey };
    };

    $scope.DeleteBookingEntry = function () {

        if ($window.confirm('Are you sure, you want to delete \'' + $scope.bookingEntry.bookingHeader.OrderNo + '\' ?')) {
            DepotBookingService.deleteBookingEntry($scope.bookingEntry.bookingHeader.OrderNo).then(function (d) {
                if (d.data) {

                    growlService.growl('Booking Entry Deleted Successfully', 'success');
                    // $location.path('/Port/bookingentrylist');
                    $state.go('depotbookingentrylist', {});
                }
            });
        }
    };
    $scope.init();
}]);