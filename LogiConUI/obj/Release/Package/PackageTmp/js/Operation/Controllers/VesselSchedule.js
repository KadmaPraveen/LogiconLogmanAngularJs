angular.module('LogiCon').controller('VesselScheduleController', ['$scope', '$uibModal', 'alert', 'VesselScheduleService', 'Utility', 'UtilityFunc', 'CountryService', function ($scope, $uibModal, alert, VesselScheduleService, Utility, UtilityFunc, CountryService) {
    
    $scope.dateFormat = UtilityFunc.DateFormat();
    $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
    $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();
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

        // 



        modalInstance.result.then(function () {
            var dt = moment(vm.viewDate).format('MM-01-YYYY');
            var m = vm.calendarView;
            $scope.GetVesselScheduleListByDate(dt);
            // $scope.GetCountriesList();
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });


    };

    $scope.getPortList = function (countryId) {
        //   
        VesselScheduleService.GetPortList(countryId).then(function (d) {
            //  
            $scope.portList = d.data;
        }, function (err) {
            //
        });
    }
    $scope.getPortList('MY');
    CountryService.GetCountriesList().then(function (d) {
        $scope.countryList = d.data;

    }, function () { });


    $scope.getVesselSchedules = function (portCode) {
        // 
        VesselScheduleService.GetVesselSchedulesByPort(portCode).then(function (d) {
            for (var i = 0; i < d.data.length; i++) {
                
                d.data[i].startsAt = new Date(d.data[i].startsAt);
                d.data[i].endsAt = new Date(d.data[i].endsAt);
                d.data[i].type = 'info';
            }
            // 
            vm.events = d.data;
        });
    }

    /* calendar events */
    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    vm.viewChangeEnabled = false;
    /*
    vm.events = [
      {
          title: 'An event',
          type: 'warning',
          startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
          endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
          draggable: false,
          resizable: false
      }, 
      {
          title: '<i class="fa fa-asterisk" aria-hidden="true"></i><span class="text-primary">Another event</span>, with a <i>html</i> title',
          type: 'info',
          startsAt: moment().subtract(1, 'day').toDate(),
          endsAt: moment().add(5, 'days').toDate(),
          draggable: true,
          resizable: true
      }, {
          title: 'This is a really long event title that occurs on every year',
          type: 'important',
          startsAt: moment().startOf('day').add(7, 'hours').toDate(),
          endsAt: moment().startOf('day').add(19, 'hours').toDate(),
          recursOn: 'year',
          draggable: true,
          resizable: true
      }
    ];
    */
    vm.isCellOpen = false;

    vm.eventClicked = function (event) {
        
        //console.log('click');
        //alert.show('Clicked', event);
        $scope.addSchedule(event.vesselScheduleID);
    };

    vm.eventEdited = function (event) {
        
        // 
        //console.log('Edited');
        //alert.show('Edited', event);
        $scope.addSchedule(event.vesselScheduleID);
    };

    vm.eventDeleted = function (event) {
        
        //console.log('Edited');
        //alert.show('Edited', event);
        $scope.addSchedule();
    };

    vm.eventTimesChanged = function (event) {
        
        //console.log('Edited');
        //alert.show('Edited', event);
        $scope.addSchedule();
    };



    vm.toggle = function ($event, field, event) {
        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    vm.DoubleClick = function (event) {
        //
        $scope.addSchedule();
    }
    $scope.getVesselScheduleAdvanceSearch = function (Search) {
        
        VesselScheduleService.GetTableData(Search).then(function (d) {
            vm.events = new Array();
            for (var i = 0; i < d.data.data.length; i++) {
                // 
                d.data.data[i].startsAt = new Date(d.data.data[i].startsAt);
                d.data.data[i].endsAt = new Date(d.data.data[i].endsAt);
                d.data.data[i].type = 'info';

                vm.events.push(d.data.data[i]);
            }
            
            
            //vm.events = d.data;

            //$scope.vesselData = res.data;
            //console.log($scope.vesselData);
        }, function (err) {
            console.log(err);
        });
    }
    vm.MonthChanged = function () {
        
        if ($scope.vm.PortCode == undefined) {
            var dt = moment(vm.viewDate).format('MM-01-YYYY');
            var m = vm.calendarView;
            $scope.GetVesselScheduleListByDate(dt);
        }
        else {
            $scope.getVesselSchedules($scope.vm.PortCode);
        }
    };

    vm.viewChangeClicked = function (nextView) {
        if (nextView != 'month') {
            return false;
        }
    };
    /* calendar events */



    $scope.GetVesselScheduleListByDate = function (dt) {
        //console.log(dt);
        //console.log(moment(dt).format('MM-01-YYYY'));
        VesselScheduleService.GetVesselScheduleList(dt).then(function (d) {
            
            for (var i = 0; i < d.data.length; i++) {
                // 
                d.data[i].startsAt = new Date(d.data[i].startsAt);
                d.data[i].endsAt = new Date(d.data[i].endsAt);
                d.data[i].type = 'info';
            }
            
            vm.events = d.data;
        }, function () { });
    };
    
    //var dt = new Date();
    var dt = moment(vm.viewDate).format('MM-01-YYYY');
    $scope.GetVesselScheduleListByDate(dt);
}]);




app.factory('alert', function ($uibModal) {

    function show(action, event) {
        return $uibModal.open({
            templateUrl: 'Js/Operation/VesselSchedule/Templates/vessel-schedule.html?v=' + Utility.Version,
            controller: 'addEditVesselScheduleCntrl'
        });
    }

    return {
        show: show
    };

});





//http://mattlewis92.github.io/angular-bootstrap-calendar/#?example=cell-is-open