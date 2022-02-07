angular.module('LogiCon').controller('VesselProfileCntrl', ['$scope', 'VesselProfileService', 'growlService', '$stateParams', '$q', '$location', '$uibModal', 'Utility', '$state','$window','NgTableParams',
    function ($scope, VesselProfileService, growlService, $stateParams, $q, $location, $uibModal, Utility, $state, $window, NgTableParams) {
    $scope.vp = {};
    $scope.showLoading = true;
    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.IsAdvSearch = false;
    $scope.Search = {};
    $scope.IsNew = false;
    $scope.isFrmVesselProfileValid = false;
    $scope.$watch('frmVesselProfile.$valid', function (isValid) {
        $scope.isFrmVesselProfileValid = isValid;
    });


    $scope.addSchedule = function (vesselScheduleID) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Operation/Templates/VesselSchedule/vessel-schedule.html?v=' + Utility.Version,
            controller: 'addEditVesselScheduleCntrl',
            //size: 'lg',
            windowClass: 'app-modal-window2',
            resolve: {
                vesselScheduleID: function () {
                    return vesselScheduleID;
                }
            }
        });

        modalInstance.result.then(function () {
            var dt = moment(vm.viewDate).format('MM-01-YYYY');
            var m = vm.calendarView;
            $scope.GetVesselScheduleListByDate(dt);
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.SaveVesselProfile = function (vp) {
        $scope.showLoading = true;
        if ($scope.isFrmVesselProfileValid) {
            VesselProfileService.SaveVesselProfile(vp).then(function (d) {

                $scope.showLoading = false;
                growlService.growl('Saved Successfully..', 'success');

            }, function (err) { });
        } else {
            growlService.growl('Please enter all mandatory fields', 'danger');
            $scope.showLoading = false;
        }
    };
    $scope.lookUpData = function () {
        VesselProfileService.lookUpData().then(function (d) {
            $scope.lookUpData = d.data;
            $scope.showLoading = false;
        }, function (err) { });
    };
    VesselProfileService.lookUpData().then(function (d) {
        $scope.lookUpData = d.data;
        $scope.showLoading = false;
    });

    //$scope.GetVessel = function (vesselID) {
    //    VesselProfileService.GetVessel(vesselID).then(function (d) {
    //        $scope.vp = d.data.vessel;
    //        $scope.vs = d.data.vesselScheduleList;            
    //    }, function (err) { });
    //};
    $scope.GetVesselList = function (skip, limit) {
        VesselProfileService.GetVesselList(skip, limit).then(function (d) {
            $scope.vpList = d.data.vesselList;
            $scope.totalItems = d.data.totalItems;

            $scope.showLoading = false;
        }, function (err) { });
    };
  

    $scope.DeleteVessel = function (vesselID,VesselName) {
        if ($window.confirm('Are you sure, you want to delete \'' + VesselName + '\' ?')) {
            VesselProfileService.DeleteVessel(vesselID).then(function (d) {
                if (d.data) {
                    growlService.growl('Vessel Deleted Successfully', 'success');
                    $state.go('vesselprofilelist', {});
                }
            }, function (err) { });
        }
    };

    $scope.AddVessel = function (vesselID) {
        $location.path('/operation/manifest/vesselprofile/' + vesselID);
    };

    $scope.back = function () {
        $state.go('vesselprofilelist', {});
       // $location.path('/operation/manifest/vesselprofilelist')
    };
    
    var DataTblobj = {};
    $scope.GetTableData = function (IsAdvSearch) {
        $scope.ngTblData = new NgTableParams({
            page: 0,
            count: 10,
            sorting: {
                CreatedOn: 'desc'
            }
        },
            {
                counts: [10, 20, 30],
                getData: function ($defer, params) {
                    DataTblobj.VesselID = $scope.Search.VesselID == undefined ? null : $scope.Search.VesselID;
                    DataTblobj.VesselName = $scope.Search.VesselName == undefined ? null : $scope.Search.VesselName;
                    DataTblobj.VesselType = $scope.Search.VesselType == undefined ? null : $scope.Search.VesselType;
                    DataTblobj.CallSignNo = $scope.Search.CallSignNo == undefined ? null : $scope.Search.CallSignNo;
                    DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    DataTblobj.limit = params.count();
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        DataTblobj.sortColumn = orderBy.substring(1);
                        DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                    }
                    VesselProfileService.GetTableData(DataTblobj).then(function (d) {
                                params.total(d.data.records);
                                $defer.resolve(d.data.data);
                            }, function (err) { });
                }
            });
    };    
    
    var vesselID = $stateParams.vesselID;
    if (!angular.isUndefined(vesselID)) {
        
        if (vesselID != 'NEW' && vesselID != '') {
            var lookUpPromise = VesselProfileService.lookUpData();
            var vesselPromise = VesselProfileService.GetVessel(vesselID);

            $q.all([lookUpPromise, vesselPromise]).then(function (d) {
                
                $scope.lookUpData = d[0].data;
                $scope.vp = d[1].data.vessel;
                $scope.Cntrl.vs = d[1].data.vesselScheduleList;
                $scope.showLoading = false;
            }, function () { });
        } else {
            $scope.IsNew = true;
            $scope.lookUpData();
        }
    } else {
        $scope.IsNew = true;        
    }

    $scope.GetTableData();
}]);