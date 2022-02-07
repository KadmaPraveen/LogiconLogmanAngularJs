angular.module('LogiCon').controller('ContainerRequestCntrl', ['$scope', '$uibModal', 'Utility', 'MerchantProfileService', 'VesselScheduleService', 'limitToFilter', 'UtilityFunc', 'growlService', 'ContainerRequestService', 'VesselMasterService', '$stateParams', 'NgTableParams', '$filter', '$window', '$state',
    function ($scope, $uibModal, Utility, MerchantProfileService, VesselScheduleService, limitToFilter, UtilityFunc, growlService, ContainerRequestService, VesselMasterService, $stateParams, NgTableParams, $filter, $window, $state) {

        $scope.init = function () {

            $scope.DateFormat = UtilityFunc.DateFormat();
            $scope.TimeFormat = UtilityFunc.TimeFormat();
            $scope.DateTimeFormat = UtilityFunc.DateTimeFormat();
            $scope.branchID = UtilityFunc.BranchID();
            $scope.IsNew = true;

            $scope.cr = {
                containerHeader: {
                    RequestNo: null,
                    HaulierCode: null,
                    HaulierName: null,
                    JobType: null,
                    PickupFrom: null,
                    DropOffCode: null,
                    RequestDate: new Date(),
                    RequestBy: null,
                    OrderNo: null,
                    Remark: null,
                    ROTNo: null,
                    BillToCode: null,
                    BillToName: null,
                    IsBillable: null,
                    IsCancel: null,
                    CancelBy: null,
                    CancelOn: null,
                    IsApproved: null,
                    ApprovedBy: null,
                    ApprovedOn: null,
                    CreatedBy: null,
                    CreatedOn: null,
                    ModifiedBy: null,
                    ModifiedOn: null,
                    Consignee: null,
                    ConsigneeName: null
                },
                containerDetails: new Array()
            };
            $scope.GetLookUpData();
            $scope.Activity = {};
            $scope.Activities = new Array();
        };

        $scope.GetLookUpData = function () {
            ContainerRequestService.GetLookUpData().then(function (d) {
                debugger;
                $scope.lookUpData = d.data;
            }, function (err) {

            });
        }
        debugger;
        if (sessionStorage.getItem("SSNCONREQUESTOBJ") != "undefined") {
            $scope.conRequestObj = JSON.parse(sessionStorage.getItem("SSNCONREQUESTOBJ"));
            if ($scope.conRequestObj != undefined) {
                debugger;
                ContainerRequestService.GetContainerRequestFromOe($scope.conRequestObj).then(function (d) {
                    $scope.cr = d.data.ContainerRequest;
                    $scope.ngTblContainerInfo();
                    sessionStorage.removeItem("SSNCONREQUESTOBJ");
                }, function (err) {
                });

            }
        }


        $scope.CopyContainer = function (item) {
            var copy = angular.copy(item)
            if ($scope.cr.containerDetails != null)
                $scope.cr.containerDetails.push(copy);
            $scope.ngTblContainerInfo();
        }
        var conIndex = -1;
        $scope.AddContainerRequest = function (index) {
            debugger;
            conIndex = index;
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Freight/Templates/ContainerRequest/add-container-request.html?v=' + Utility.Version,
                controller: 'addContainerRequestCntrl',
                windowClass: 'app-modal-window2',
                resolve: {
                    dataObj: function () {
                        return {
                            dc: (conIndex == -1 ? {} : $scope.cr.containerDetails[conIndex]),
                            sizeList: $scope.lookUpData.sizeList,
                            trailerTypeList: $scope.lookUpData.trailerTypeList,
                            emptyDehireList: $scope.lookUpData.emptyDehireList,
                            shipmentTypeList: $scope.lookUpData.shipmentTypeList
                        }
                    }
                }
            });

            $scope.modalInstance.result.then(function (res) {
                debugger;
                if (conIndex != -1) {
                    var flag = false;
                    angular.forEach($scope.Activities, function (item, index) {
                        if (item.ActivityCode == 1047) {
                            flag = true;
                        }
                    });
                    if (flag == false) {
                        var obj = { ActivityCode: 1047 };
                        $scope.Activities.push(obj);
                    }
                    $scope.cr.containerDetails[conIndex] = res;
                }

                else {

                    $scope.cr.containerDetails.push(res);

                }


                $scope.ngTblContainerInfo();
            }, function () {

            });
        };

        $scope.formatDate = function (date) {
            if (date != null)
                return moment(date).format(UtilityFunc.DateFormat());
            else
                return null;
        }

        $scope.containerInfoIndex = -1;

        $scope.ngTblContainerInfo = function () {
            if ($scope.cr.containerDetails == null || $scope.cr.containerDetails == undefined)
                $scope.cr.containerDetails = new Array();
            $scope.tblContainerInfo = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.cr.containerDetails.length,
                getData: function ($defer, params) {
                    var orderedData = params.sorting() ? $filter('orderBy')($scope.cr.containerDetails, params.orderBy()) : $scope.cr.containerDetails;

                    $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    $scope.containerInfoIndex = (params.page() - 1) * params.count();
                }
            });
        }

        $scope.deleteContainer = function (index) {

            $scope.cr.containerDetails.splice(index, 1);
            $scope.ngTblContainerInfo();
        }

        $scope.GenericMerchantResults = function (text, filter) {
            return MerchantProfileService.SearchMerchantResults(text, filter).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.MerchantSelected = function (merchantObject, Type) {
            $scope.cr[Type] = merchantObject.Value;
        };
        $scope.vesselName = {};

        $scope.VesselCodeLoadingResults = function ($query) {

            return VesselMasterService.GetVesselByVesselName($query).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.CustomerSelected = function (item, type) {
            $scope.cr.containerHeader[type] = item.Value;
        };
        $scope.isFromValid = false;
        $scope.$watch('frmContainerRequest.$valid', function (isValid) {
            $scope.isFromValid = isValid;
        });

        $scope.SaveConRequest = function (conObj) {
            if ($scope.isFromValid) {
                var obj = { ActivityCode: 1045 };
                $scope.Activities.push(obj);
                debugger;
                ContainerRequestService.SaveConRequest(conObj).then(function (d) {
                    /*Activity Save*/
                    var arr = new Array();
                    angular.forEach($scope.Activities, function (obj, i) {
                        debugger;
                        var obj = {
                            LinkDocumentNo: d.data.OrderNo,
                            TransactionNo: d.data.RequestNo,
                            ActivityCode: obj.ActivityCode
                        }
                        arr.push(obj);
                    });

                    ContainerRequestService.SaveActivityStatus(arr).then(function (test) {
                        debugger;
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/
                    $scope.IsNew = false;
                    $scope.cr.containerHeader.RequestNo = d.data.RequestNo;
                    growlService.growl('Successfully saved', 'success');

                    $state.go('containerrequest', {
                        requestNo: $scope.cr.containerHeader.RequestNo
                    });
                }, function (err) {

                });
            }
            else {
                growlService.growl('Please enter all mandatory fields', 'danger');
            }
        }


        $scope.init();
        /*Edit*/

        $scope.requestNo = $stateParams.requestNo;
        $scope.reportUrl = Utility.ReportPath + '/GetROTReport?Url=DNeX.ROT&branchID=' + $scope.branchID + '&requestNo=' + $scope.requestNo;
        debugger;
        if ($scope.requestNo != null && $scope.requestNo != "NEW") {
            $scope.IsNew = false;
            ContainerRequestService.GetContainerRequest($scope.requestNo).then(function (d) {
                debugger;
                $scope.cr = d.data;
                if (!angular.isUndefined($scope.cr) && $scope.cr != null) {
                    if (!angular.isUndefined($scope.cr.containerHeader.ETADate) && $scope.cr.containerHeader.ETADate != null) {
                        if ($scope.cr.containerHeader.ETADate == null)
                            $scope.cr.containerHeader.ETADate = undefined;
                        else
                            $scope.cr.containerHeader.ETADate = moment($scope.cr.containerHeader.ETADate);
                    }
                    if (!angular.isUndefined($scope.cr.containerHeader.RequestDate) && $scope.cr.containerHeader.RequestDate != null) {
                        if ($scope.cr.containerHeader.RequestDate == null)
                            $scope.cr.containerHeader.RequestDate = undefined;
                        else
                            $scope.cr.containerHeader.RequestDate = moment($scope.cr.containerHeader.RequestDate);
                    }
                }
                $scope.ngTblContainerInfo();
            }, function (err) {

            });

        }

        $scope.DelteContainerRequest = function () {
            if ($window.confirm('Are you sure, you want to delete')) {
                var requestNo = $scope.cr.containerHeader.RequestNo;
                ContainerRequestService.DeleteConRequest(requestNo).then(function (d) {
                    $scope.cr = {
                        containerHeader: {},
                        containerDetails: new Array()
                    };
                    $scope.ngTblContainerInfo();
                    growlService.growl("Deleted Successfully", "success");
                }, function (err) {
                    growlService.growl("Internal server error", "danger");
                });
            }
        }


    }]);