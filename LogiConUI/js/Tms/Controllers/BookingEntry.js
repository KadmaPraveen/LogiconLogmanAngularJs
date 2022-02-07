angular.module('LogiCon').controller('BookingEntryCntrl', ['$scope', '$uibModal', 'BookingEntryService', 'MerchantProfileService', 'JobCategoryChargesService', 'VesselMasterService', 'VesselScheduleService', 'limitToFilter', '$stateParams', 'growlService', '$filter', 'UtilityFunc', 'Utility', 'PortAreaService',
    function ($scope, $uibModal, BookingEntryService, MerchantProfileService, JobCategoryChargesService, VesselMasterService, VesselScheduleService, limitToFilter, $stateParams, growlService, $filter, UtilityFunc, Utility, PortAreaService) {


        $scope.currentPage = 1;
        $scope.limit = 10;
        $scope.showLoading = true;
        
        $scope.bookingHeader = {
            BookingContainerList: new Array(),
            TransportType: 1021
        };
        $scope.tabs = [
            { title: 'General Info', content: 'Js/Tms/Templates/BookingEntry/generalinfo.html?v=' + Utility.Version, active: true, disabled: false, tooltip: '' },
            { title: 'Container Details', content: 'Js/Tms/Templates/BookingEntry/containerdetails.html?v=' + Utility.Version, active: false, disabled: true, tooltip: 'Please select booking type to enable the tab' }
        ];
        $scope.IsfrmBookingEntryValid = false;
        $scope.MovementList = new Array();
        $scope.ChargeVasList = new Array();

        $scope.$watch('frmBookingEntry.$valid', function (valid) {
            $scope.IsfrmBookingEntryValid = valid;
        });


        $scope.AddContainerDetails = function (index) {
            var t = (index == -1 ? $scope.bookingHeader.BookingContainerList[index] : { index: -1 });
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Tms/Templates/BookingEntry/addcontainerdetails.html?v=' + Utility.Version,
                controller: 'BookingContainerInfoCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            lookUpData: $scope.lookUpData,
                            bookingContainer: (index != -1 ? $scope.bookingHeader.BookingContainerList[index] : { index: -1 })
                        }
                    }
                }
            });

            modalInstance.result.then(function (bc) {
                var containerKey = '';
                if (bc.index == -1) {
                    bc.ContainerKey = GetPaddingNo($scope.bookingHeader.BookingContainerList.length + 1);
                    if (typeof ($scope.bookingHeader.BookingContainerList) != 'undefined') {
                        bc.index = $scope.bookingHeader.BookingContainerList.length;
                        $scope.bookingHeader.BookingContainerList.push(bc);
                    }
                    else {
                        $scope.bookingHeader.BookingContainerList = new Array();
                        bc.index = 0;
                        $scope.bookingHeader.BookingContainerList.push(bc);
                    }

                    $scope.tblSearch = { ContainerKey: bc.ContainerKey };

                    JobCategoryChargesService.MovementsByJobCategoryCode($scope.bookingHeader.OrderType, bc.ContainerKey, bc.PickupDropOffMode).then(function (d) {
                        if ($scope.MovementList.length > 0)
                            $scope.MovementList = $scope.MovementList.concat(d.data.bookingMovementsList);
                        else
                            $scope.MovementList = d.data.bookingMovementsList;
                    }, function (err) { });
                }
                else {                    
                    $scope.bookingHeader.BookingContainerList[bc.index] = bc;

                    JobCategoryChargesService.MovementsByJobCategoryCode($scope.bookingHeader.OrderType, bc.ContainerKey, bc.PickupDropOffMode).then(function (d) {
                        if ($scope.MovementList.length > 0) {

                            $scope.MovementList = UtilityFunc.removeArrayElementByKey($scope.MovementList, 'ContainerKey', bc.ContainerKey);
                            $scope.MovementList = $scope.MovementList.concat(d.data.bookingMovementsList);
                        }
                        else
                            $scope.MovementList = d.data.bookingMovementsList;
                    }, function (err) { });
                }

            }, function () {

            });
        };

        function GetPaddingNo(num) {
            var str = "" + num
            var pad = "000"
            var result = pad.substring(0, pad.length - str.length) + str

            return result;
        }

        $scope.AddVASCharges = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Tms/Templates/BookingEntry/addvascharges.html?v=' + Utility.Version,
                controller: 'VASChargesCntrl',
                  size: 'lg',
                resolve: {
                    DTOObj: {
                        orderType: $scope.bookingHeader.OrderType,
                        containerKey: $scope.tblSearch.ContainerKey
                    }
                }
            });

            modalInstance.result.then(function (bc) {
                if ($scope.ChargeVasList.length > 0) {
                    /*
                    var prevContainerVasCharges = $filter('filter')($scope.ChargeVasList, { ContainerKey: bc.ContainerKey });
    
                    angular.forEach(prevContainerVasCharges, function (obj, key) {
                        var index = $scope.ChargeVasList.indexOf(obj);
                        $scope.ChargeVasList.splice(index, 1);
                    });
                    $scope.ChargeVasList = $scope.ChargeVasList.concat(bc);*/
                    $scope.ChargeVasList = UtilityFunc.removeArrayElementByKey($scope.ChargeVasList, 'ContainerKey', bc.ContainerKey)
                }
                else
                    $scope.ChargeVasList = bc;
            }, function (err) {

            });
        };

        $scope.lookUp = function () {
            BookingEntryService.getLookupData().then(function (d) {                
                $scope.lookUpData = d.data;
                $scope.showLoading = false;
            }, function (err) { });
        };

        $scope.bookingTypeChange = function () {
            BookingEntryService.getOrderTypeData($scope.bookingHeader.BookingType)
                .then(function (d) {
                    $scope.lookUpData.orderTypeList = d.data.orderTypeList;
                    $scope.lookUpData.puModeList = d.data.puModeList;
                    $scope.tabs[1].disabled = false;
                    $scope.tabs[1].tooltip = '';
                }, function (err) { });
        };

        /*
        $scope.MerchantResults = function ($query) {
            return MerchantProfileService.SearchMerchantResults($query, 'billingCustomer').then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.ForwarderResults = function ($query) {
            return MerchantProfileService.SearchMerchantResults($query, 'freightForwarder').then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.CustomerResults = function ($query) {
            return MerchantProfileService.SearchMerchantResults($query, 'ShipperConsignee').then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };*/

        $scope.GenericMerchantResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.portResults = function (text) {
            return PortAreaService.PortAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.PortSelected = function (item, type) {
            $scope.bookingHeader[type] = item.PortCode;
        };

        $scope.VesselCodeLoadingResults = function ($query) {
            
            return VesselMasterService.GetVesselByVesselName($query).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.VoyageSearchSelect = function (item) {
            
            $scope.bookingHeader.YardCutOffDry = $scope.bookingHeader.CFSCutOffDry = item.YardCutOffDate;
            $scope.bookingHeader.YardCutOffReefer = $scope.bookingHeader.CFSCutOffReefer = item.YardCutOffDateRF;
            $scope.bookingHeader.PortCutOff = item.ClosingDate;
            $scope.bookingHeader.PortCutOffReefer = item.ClosingDateRF;
            $scope.bookingHeader.ETA = item.ETA;
            $scope.bookingHeader.ETD = item.ETD;
            //console.log(JSON.stringify(item));
        };

        $scope.VoyageLoadingResults = function ($query) {
            var obj = {
                VesselID: $scope.bookingHeader.VesselID,
                AgentCode: $scope.bookingHeader.AgentCode,
                JobType: $scope.bookingHeader.BookingType,
                VoyageNo: $query
            }

            return VesselScheduleService.VoyageSearch(obj).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.CustomerSelected = function (item, type) {
            $scope.bookingHeader[type] = item.Value;
        };

        $scope.SaveBookingEntry = function (bookingHeader) {
            if ($scope.IsfrmBookingEntryValid) {
                BookingEntryService.SaveBookingHeader(bookingHeader)
                    .then(function (d) {
                        
                    }, function (err) { })
            }
        };



        $scope.getData = function (skip, take) {
            BookingEntryService.getBookingHeaderList(skip, take).then(function (d) {
                $scope.bookingHeaderList = d.data.bookingHeaderList;
                $scope.totalItems = d.data.totalItems;
            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        };

        $scope.pageChanged = function () {
            var skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
            $scope.getData(skip, $scope.limit);
        };

        $scope.PortResults = function ($query) {
            return BookingEntryService.SearchPorts($query).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.OnBlur = function (name, id) {
            
            if (typeof $scope.bookingHeader[name] == 'undefined' || $scope.bookingHeader[name] == null || $scope.bookingHeader[name] == '') {
                
                $scope.bookingHeader[id] = null;
            }
        }

        $scope.containerDetailRowClick = function (containerKey) {
            $scope.tblSearch = { ContainerKey: containerKey };
        };

        $scope.transportTypeChanged = function () {
            
        };

        var orderno = $stateParams.orderNo;

        if (typeof orderno != 'undefined') {
            $scope.lookUp();
            if (orderno != 'NEW') {
                BookingEntryService.getBookingHeader(orderno).then(function (d) {
                    $scope.bookingHeader = d.data;
                    if ($scope.bookingHeader.BookingType != null) {
                        $scope.bookingTypeChange();
                    }
                }, function (err) { });
            }
        }
        else {
            $scope.getData(0, $scope.limit);
        }
    }]);