
angular.module('LogiCon').controller('BookingEntryCntrl', ['$scope', '$uibModal', 'BookingEntryService', 'MerchantProfileService', 'JobCategoryChargesService', 'VesselMasterService', 'VesselScheduleService', 'limitToFilter', '$stateParams', 'growlService', '$filter', 'UtilityFunc', 'Utility', 'PortAreaService', '$state', '$location', '$window',
    function ($scope, $uibModal, BookingEntryService, MerchantProfileService, JobCategoryChargesService, VesselMasterService, VesselScheduleService, limitToFilter, $stateParams, growlService, $filter, UtilityFunc, Utility, PortAreaService, $state, $location, $window) {

        var defaultCurrency = UtilityFunc.DefaultCurrency();
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();

        $scope.currentPage = 1;
        $scope.limit = 10;
        $scope.showLoading = true;
        $scope.dtmax = new Date();
        $scope.bookingHeader = {
            BookingContainers: new Array(),

            TransportType: 1021,
            OrderDate: moment()
        };

        /*Activity OBjects*/
        $scope.Activity = {};
        $scope.Activities = new Array();
        /*Activity OBjects*/

        $scope.tabs = [

            { title: 'General Info', content: 'Js/Port/Templates/BookingEntry/generalinfo.html?v=' + Utility.Version, active: true, disabled: false, tooltip: '' },
            { title: 'Container Details', content: 'Js/Port/Templates/BookingEntry/containerdetails.html?v=' + Utility.Version, active: false, disabled: true, tooltip: 'Please select booking type to enable the tab' }
        ];
        $scope.IsfrmBookingEntryValid = false;
        $scope.bookingHeader.BookingMovements = new Array();
        $scope.ChargeVasList = new Array();

        $scope.$watch('frmBookingEntry.$valid', function (valid) {
            $scope.IsfrmBookingEntryValid = valid;
        });

        $scope.back = function () {
            // $location.path('/Port/bookingentrylist');
            $state.go('bookingentrylist', {});
        };


        //$scope.clear = function () {
        //    //$route.reload('/port/bookingentry/NEW');
        //    $state.transitionTo($state.current, $stateParams, {
        //        reload: true,
        //        inherit: false,
        //        notify: true
        //    });
        //};

        $scope.clear = function () {
            $state.go('bookingentry', { 'orderNo': '' }, { reload: true });
        };
        $scope.AddContainerDetails = function (index) {

            var t = (index == -1 ? $scope.bookingHeader.BookingContainers[index] : { index: -1 });
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Port/Templates/BookingEntry/addcontainerdetails.html?v=' + Utility.Version,
                controller: 'BookingContainerInfoCntrl',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            lookUpData: $scope.lookUpData,
                            bookingContainer: (index != -1 ? $scope.bookingHeader.BookingContainers[index] : { index: -1 })
                        }
                    }
                }
            });

            modalInstance.result.then(function (bc) {
                
                var ContainerKey = '';
                if (bc.index == -1) {
                    bc.ContainerKey = GetPaddingNo($scope.bookingHeader.BookingContainers.length + 1);
                    if (typeof ($scope.bookingHeader.BookingContainers) != 'undefined') {
                        bc.index = $scope.bookingHeader.BookingContainers.length;
                        $scope.bookingHeader.BookingContainers.push(bc);
                    }
                    else {
                        $scope.bookingHeader.BookingContainers = new Array();
                        bc.index = 0;
                        $scope.bookingHeader.BookingContainers.push(bc);
                    }

                    $scope.tblSearch = { ContainerKey: bc.ContainerKey };

                    JobCategoryChargesService.MovementsByCategoryCode($scope.bookingHeader.OrderType, bc.ContainerKey).then(function (d) {
                        
                        if ($scope.bookingHeader.BookingMovements.length > 0)

                            $scope.bookingHeader.BookingMovements = $scope.bookingHeader.BookingMovements.concat(d.data);
                        else
                            $scope.bookingHeader.BookingMovements = d.data;
                    }, function (err) { });

                    if ($scope.bookingHeader.OrderNo != null && $scope.bookingHeader.OrderNo != undefined && $scope.bookingHeader.OrderNo != "") {
                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1035) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1035 };
                            $scope.Activities.push(obj);
                        }
                    }

                }
                else {
                    $scope.bookingHeader.BookingContainers[bc.index] = bc;
                    JobCategoryChargesService.MovementsByCategoryCode($scope.bookingHeader.OrderType, bc.ContainerKey).then(function (d) {
                        if ($scope.bookingHeader.BookingMovements.length > 0) {

                            $scope.bookingHeader.BookingMovements = UtilityFunc.removeArrayElementByKey($scope.bookingHeader.BookingMovements, 'ContainerKey', bc.ContainerKey);
                            $scope.bookingHeader.BookingMovements = $scope.bookingHeader.BookingMovements.concat(d.data);
                        }
                        else
                            $scope.bookingHeader.BookingMovements = d.data;
                    }, function (err) { });

                    if ($scope.bookingHeader.OrderNo != null && $scope.bookingHeader.OrderNo != undefined && $scope.bookingHeader.OrderNo != "") {
                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1042) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1042 };
                            $scope.Activities.push(obj);
                        }
                    }
                }

            }, function (err) {
            });
        };

        $scope.FormatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }


        function GetPaddingNo(num) {
            
            var str = "" + num
            var pad = "000"
            var result = pad.substring(0, pad.length - str.length) + str

            return result;
        }

        $scope.lookUp = function () {

            BookingEntryService.getLookupData().then(function (d) {

                $scope.lookUpData = d.data;
                $scope.showLoading = false;
                $scope.bookingTypeChange();
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

            $scope.bookingHeader.VesselScheduleID = item.VesselScheduleID;
            $scope.bookingHeader.PortCutOffDry = item.ClosingDate;
            $scope.bookingHeader.PortCutOffReefer = item.ClosingDateRF;
            $scope.bookingHeader.ETA = item.ETA;
            $scope.bookingHeader.ETD = item.ETD;
            $scope.bookingHeader.ShipCallNo = item.ShipCallNo;
            $scope.bookingHeader.CallSignNo = item.CallSignNo;
            if ($scope.bookingHeader.BookingType == 1061) {
                $scope.bookingHeader.VoyageNo = item.VoyageNoOutWard;
            }
            else {
                $scope.bookingHeader.VoyageNo = item.VoyageNoInWard;
            }
            //console.log(JSON.stringify(item));
        };
        $scope.ValidateTheVesselDetails = function () {
            if ($scope.bookingHeader.VoyageNo == null && angular.isUndefined($scope.bookingHeader.VoyageNo)) {
                $scope.bookingHeader.VesselScheduleID = null;
                $scope.bookingHeader.PortCutOffDry = null;
                $scope.bookingHeader.PortCutOffReefer = null;
                $scope.bookingHeader.ETA = null;
                $scope.bookingHeader.ETD = null;
                $scope.bookingHeader.ShipCallNo = null;
                $scope.bookingHeader.CallSignNo = null;
            }
        }

        $scope.VoyageLoadingResults = function ($query) {
            var obj = {
                VesselID: $scope.bookingHeader.VesselID,
                AgentCode: $scope.bookingHeader.AgentCode,
                JobType: $scope.bookingHeader.BookingType,
                VoyageNo: $query
            }

            return VesselScheduleService.VoyageSearchByObj(obj).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) {
                // alert(err.statusText);
            });
        };

        $scope.CustomerSelected = function (item, type) {
            $scope.bookingHeader[type] = item.Value;
        };

        $scope.PortSelected = function (item, type) {
            $scope.bookingHeader[type] = item.PortCode;
        };

        $scope.ValidateContainers=function()
        {
            if ($scope.bookingHeader.BookingContainers.length == 0) {
                growlService.growl('Atleast one container is required', 'danger');
                return false;
            }
            else
                return true;
        }
        $scope.ValidatePorts = function () {
            if ($scope.bookingHeader.TransportType == 1021) {
                if ($scope.bookingHeader.LoadingPort == $scope.bookingHeader.DischargePort) {
                    growlService.growl('Loading Port and Discharge Port can not be the same', 'danger');
                    return false;
                }
                else if ($scope.bookingHeader.LoadingPort == $scope.bookingHeader.DestinationPort) {
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

            if ($scope.IsfrmBookingEntryValid) {
                //$scope.showLoading = true;
                if ($scope.ValidatePorts() && $scope.ValidateContainers()) {
                    if ($scope.bookingHeader.OrderNo == null || $scope.bookingHeader.OrderNo == undefined
                        || $scope.bookingHeader.OrderNo == "") {

                        var obj = { ActivityCode: 1032 };
                        $scope.Activities.push(obj);
                        var obj = { ActivityCode: 1033 };
                        $scope.Activities.push(obj);
                    }
                    else {
                        var obj = { ActivityCode: 1033 };
                        $scope.Activities.push(obj);
                    }

                    BookingEntryService.SaveBookingHeader(bookingHeader).then(function (d) {
                        debugger;
                        /*Activity Save*/
                        var arr = new Array();
                        angular.forEach($scope.Activities, function (obj, i) {
                            
                            var obj = {
                                LinkDocumentNo: d.data.OrderNo,
                                TransactionNo: d.data.OrderNo,
                                ActivityCode: obj.ActivityCode
                            }
                            arr.push(obj);
                        });

                        BookingEntryService.SaveActivityStatus(arr).then(function (test) {
                            
                            arr = new Array();
                            $scope.Activities = new Array();
                        });
                        /*Activity Save*/
                        debugger;
                        growlService.growl('Booking Entry Saved Successfully', 'success');
                        //$route.reload('Port/bookingentry/NEW');

                        $state.go('bookingentry', {'orderNo':d.data.OrderNo});
                       

                    }, function (err) { })
                }
            }
            else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        };

        $scope.DeleteBookingEntry = function () {

            if ($window.confirm('Are you sure, you want to delete \'' + $scope.bookingHeader.OrderNo + '\' ?')) {
                BookingEntryService.deleteBookingEntry($scope.bookingHeader.OrderNo).then(function (d) {
                    if (d.data) {

                        growlService.growl('Booking Entry Deleted Successfully', 'success');
                        // $location.path('/Port/bookingentrylist');
                        $state.go('bookingentrylist', {});
                    }
                });
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
            // $scope.bookingHeader.TransportType=== 1022;
        };

        var orderno = $stateParams.orderNo;

       // $scope.IsNew = false;
        $scope.lookUpData = {};
        $scope.lookUp();
        if (typeof orderno != 'undefined' && orderno != '' && orderno != 'NEW') {
            BookingEntryService.getBookingHeader(orderno).then(function (d) {
                $scope.IsNew = false;
                $scope.bookingHeader = d.data.bookingHeader;

                $scope.lookUpData.orderTypeList = d.data.orderTypeList;
                $scope.lookUpData.puModeList = d.data.puModeList;
                $scope.bookingHeader.OrderType = $scope.bookingHeader.OrderType;
                if (!angular.isUndefined($scope.bookingHeader.BookingContainers) && $scope.bookingHeader.BookingContainers != null && $scope.bookingHeader.BookingContainers.length > 0) {
                    $scope.containerDetailRowClick($scope.bookingHeader.BookingContainers[0].ContainerKey);
                }

                if (!angular.isUndefined($scope.bookingHeader.OrderDate) && $scope.bookingHeader.OrderDate != null) {
                    if ($scope.bookingHeader.OrderDate == null) {
                        $scope.bookingHeader.OrderDate = undefined;
                    }
                    else
                        $scope.bookingHeader.OrderDate = moment($scope.bookingHeader.ETA);
                }
                if (!angular.isUndefined($scope.bookingHeader.ETA) && $scope.bookingHeader.ETA != null) {
                    if ($scope.bookingHeader.ETA == null) {
                        $scope.bookingHeader.ETA = undefined;
                    }
                    else
                        $scope.bookingHeader.ETA = moment($scope.bookingHeader.ETA);
                }
                if (!angular.isUndefined($scope.bookingHeader.ETD) && $scope.bookingHeader.ETD != null) {
                    if ($scope.bookingHeader.ETD == null) {
                        $scope.bookingHeader.ETD = undefined;
                    }
                    else
                        $scope.bookingHeader.ETD = moment($scope.bookingHeader.ETD);
                }
                //
                if (!angular.isUndefined($scope.bookingHeader.PortCutOffDry) && $scope.bookingHeader.PortCutOffDry != null) {
                    if ($scope.bookingHeader.PortCutOffDry == null) {
                        $scope.bookingHeader.PortCutOffDry = undefined;
                    }
                    else
                        $scope.bookingHeader.PortCutOffDry = moment($scope.bookingHeader.PortCutOffDry);
                }
                if (!angular.isUndefined($scope.bookingHeader.PortCutOffReefer) && $scope.bookingHeader.PortCutOffReefer != null) {
                    if ($scope.bookingHeader.PortCutOffReefer == null) {
                        $scope.bookingHeader.PortCutOffReefer = undefined;
                    }
                    else
                        $scope.bookingHeader.PortCutOffReefer = moment($scope.bookingHeader.PortCutOffReefer);
                }

                if ($scope.bookingHeader.BookingType != null) {

                    BookingEntryService.getOrderTypeData($scope.bookingHeader.BookingType).then(function (d) {
                        //
                        $scope.lookUpData.orderTypeList = d.data.orderTypeList;
                        $scope.lookUpData.puModeList = d.data.puModeList;

                        $scope.tabs[1].disabled = false;
                        $scope.tabs[1].tooltip = '';

                    }, function (err) { });
                    $scope.tabs[1].disabled = false;
                    $scope.tabs[1].tooltip = '';
                }
            }, function (err) { });
        }
        else {
            $scope.IsNew = true;
            // $scope.getData(0, $scope.limit);
        }
    }]);