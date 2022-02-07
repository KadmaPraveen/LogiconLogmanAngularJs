angular.module('LogiCon').controller('addEditVesselScheduleCntrl', ['$scope', '$uibModalInstance', 'VesselScheduleService', 'vesselScheduleID', 'Utility', 'limitToFilter', '$http', 'PortAreaService', '$filter', 'UtilityFunc', 'growlService',
    function ($scope, $uibModalInstance, VesselScheduleService, vesselScheduleID, Utility, limitToFilter, $http, PortAreaService, $filter, UtilityFunc, growlService) {
        
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.dateTimeFormat12 = UtilityFunc.DateTimeFormat12();
        //$scope.showLoading = false;
        $scope.isEdit = false;
        $scope.isChangeTerminal = false;
        $scope.isCallNewPort = false;
        $scope.isfrmVesselScheduleValid = false;
        $scope.$watch('frmVesselSchedule.$valid', function (isValid) {
            $scope.isfrmVesselScheduleValid = isValid;
        });

        $scope.vs = {};
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };



        $scope.formats = ['dd/MM/yyyy'];
        $scope.format = $scope.formats[0];

        $scope.popup = {};

        $scope.open = function (type) {
            $scope.popup[type] = true;
        };

        $scope.ValidatePorts = function () {
            
            if ($scope.vs.LoadingPortName == $scope.vs.DischargePortName) {
                $scope.vs.DischargePortName = "";
                    growlService.growl('Loading Port and Discharge Port can not be the same', 'danger');
                    return false;
                }
            else if ($scope.vs.LoadingPortName == $scope.vs.DestinationPortName) {
                $scope.vs.DestinationPortName = "";
                    growlService.growl('Loading Port and Destination Port can not be the same', 'danger');
                    return false;
                }
                else
                    return true;
        };



        $scope.SaveVesselSchedule = function (vs) {
            
            if ($scope.isfrmVesselScheduleValid) {
                VesselScheduleService.SaveVesselSchedule(vs).then(function (d) {
                    growlService.growl('Vessel Schedule saved successfully', 'success');
                    $uibModalInstance.close();
                }, function () { });
            }
        };
        
        if (vesselScheduleID != -1) {
            $scope.isEdit = true;
            VesselScheduleService.GetVesselSchedule(vesselScheduleID).then(function (d) {
                
                $scope.vs = d.data;
                if (!angular.isUndefined($scope.vs) && $scope.vs != null) {
                    
                    if ($scope.vs.ETA == null || angular.isUndefined($scope.vs.ETA)) {
                        $scope.vs.ETA = undefined;
                    }
                    else
                        $scope.vs.ETA = moment($scope.vs.ETA);

                    if ($scope.vs.ETD == null || angular.isUndefined($scope.vs.ETD)) {
                        $scope.vs.ETD = undefined;
                    }
                    else
                        $scope.vs.ETD = moment($scope.vs.ETD);


                    if ($scope.vs.ActualETA == null || angular.isUndefined($scope.vs.ActualETA)) {
                        $scope.vs.ActualETA = undefined;
                    }
                    else
                        $scope.vs.ActualETA = moment($scope.vs.ActualETA);


                    if ($scope.vs.ActualETD == null || angular.isUndefined($scope.vs.ActualETD)) {
                        $scope.vs.ActualETD = undefined;
                    }
                    else
                        $scope.vs.ActualETD = moment($scope.vs.ActualETD);


                    if ($scope.vs.ImpAvaliableDate == null || angular.isUndefined($scope.vs.ImpAvaliableDate)) {
                        $scope.vs.ImpAvaliableDate = undefined;
                    }
                    else
                        $scope.vs.ImpAvaliableDate = moment($scope.vs.ImpAvaliableDate);


                    if ($scope.vs.ImportStorageStartDate == null || angular.isUndefined($scope.vs.ImportStorageStartDate)) {
                        $scope.vs.ImportStorageStartDate = undefined;
                    }
                    else
                        $scope.vs.ImportStorageStartDate = moment($scope.vs.ImportStorageStartDate);


                    if ($scope.vs.ExpAvailableDate == null || angular.isUndefined($scope.vs.ExpAvailableDate)) {
                        $scope.vs.ExpAvailableDate = undefined;
                    }
                    else
                        $scope.vs.ExpAvailableDate = moment($scope.vs.ExpAvailableDate);


                    if ($scope.vs.ClosingDate == null || angular.isUndefined($scope.vs.ClosingDate)) {
                        $scope.vs.ClosingDate = undefined;
                    }
                    else
                        $scope.vs.ClosingDate = moment($scope.vs.ClosingDate);


                    if ($scope.vs.YardCutOffDate == null || angular.isUndefined($scope.vs.YardCutOffDate)) {
                        $scope.vs.YardCutOffDate = undefined;
                    }
                    else
                        $scope.vs.YardCutOffDate = moment($scope.vs.YardCutOffDate);


                    if ($scope.vs.YardCutOffDateRF == null || angular.isUndefined($scope.vs.YardCutOffDateRF)) {
                        $scope.vs.YardCutOffDateRF = undefined;
                    }
                    else
                        $scope.vs.YardCutOffDateRF = moment($scope.vs.YardCutOffDateRF);


                    if ($scope.vs.ClosingDateRF == null || angular.isUndefined($scope.vs.ClosingDateRF)) {
                        $scope.vs.ClosingDateRF = undefined;
                    }
                    else
                        $scope.vs.ClosingDateRF = moment($scope.vs.ClosingDateRF);
                }

            }, function () { });

        }
        $scope.VesselIDResults = function (text) {
            //$scope.showLoading = true;
            return $http.get(Utility.ServiceUrl + '/master/Vessel/search/vesselID/' + text).then(function (response) {
                
                //$scope.showLoading = false;
                return limitToFilter(response.data, 15);
            });
        };

        $scope.VesselNameResults = function (text) {
            return $http.get(Utility.ServiceUrl + '/master/Vessel/search/vesselName/' + text).then(function (response) {
                
                return limitToFilter(response.data, 15);
            });
        };

        $scope.portResults = function (text) {
            return PortAreaService.PortAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.PortSelected = function (item, type) {
            $scope.vs[type] = item.PortCode;
        };

        /*
        $scope.dischargePortResults = function (text) {
            return $http.get(Utility.ServiceUrl + '/master/Vessel/search/vesselName/' + text).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
    
        $scope.destinationPortResults = function (text) {
            return $http.get(Utility.ServiceUrl + '/master/Vessel/search/vesselName/' + text).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
        */
        $scope.vesselIDClick = function (item) {
            $scope.vs.VesselName = item.Text;
        };

        $scope.vesselNameClick = function (obj) {
            
            $scope.vs.VesselID = obj.Value;
        };

        $scope.changeTerminal = function () {
            $scope.isChangeTerminal = true;
        };

        //VesselScheduleService.GetTerminalList().then(function (d) {
        //    

        //    $scope.vesselClassList = d.data.terminalList;
        //}, function (err) {
        //    
        //});

        //vs.Terminal=(vesselClassList | filter : {Text: vs.TerminalText })[0].Text.toString()
        //$scope.terminalChange = function () {

        //    var obj = $filter('filter')($scope.vesselClassList, { Text: $scope.vs.TerminalText })[0];
        //    $scope.vs.Terminal = obj.Value.toString();

        //};
        $scope.PortOperatorResults = function (text) {
            
            var operatortype = 26220;
            return VesselScheduleService.operatorList(operatortype, text).then(function (d) {
                
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.TerminalOperaterSelected = function (item) {
            
            $scope.vs.Terminal = item.Value;
        };


            $scope.validateDate = function (fieldLabel, modalName, modalValue) {
                
                if (modalValue != undefined) {
                  
                    var avldate = $scope.vs.ImpAvaliableDate;
                    var impstdate = $scope.vs.ImportStorageStartDate;
                   
                   
                    if (modalValue > etdDate) {
                        return true;
                    }
                    //if(depdate>=etdDate)
                    //{
                    //    return true;
                    //}
                    else {
                        //$scope.vs.ETD = "";
                        growlService.growl(fieldLabel + 'date should be more than ETD Date', 'danger');
                        return false;
                    }
                   
                }
            }

          
            $scope.validateDates = function (fieldLabel, modalName, modalValue) {
                
                if (modalValue != undefined) {
                    var etaDate = $scope.vs.ETA;
                    var etdDate = $scope.vs.ETD;
                    var depdate = $scope.vs.ActualETD;
                    var impstdate = $scope.vs.ImportStorageStartDate;
                    var avldate=$scope.vs.ImpAvaliableDate;
                  
                    if (modalValue > etaDate) {
                        return true;
                    }

                        if (ActualETA != undefined) {
                            if (ActualETA <= etdDate && ActualETA >= etaDate) {
                                return true;
                            }

                            else {
                               // $scope.vs.ETA = "";
                                 // $scope.vs.ActualETA = "";
                                $scope.vs.ETD = "";
                                growlService.growl('ETD date should be more than ETA date', 'danger');
                                return false;
                            }
                        }
                       


                        else {
                            // $scope.validateDate(fieldLabel, modalName, modalValue);
                            // $scope.vs.ETA = "";
                          
                            growlService.growl('ATA date should be more than ETA date', 'danger');
                            return false;
                        }


                    }
                
                
               
            }
            $scope.valid = function (fieldLabel, modalName, modalValue) {
                var impstdate = $scope.vs.ImportStorageStartDate;
                var avldate = $scope.vs.ImpAvaliableDate;
                if (impstdate != undefined) {
                    if (impstdate >= avldate) {
                        return true;
                    }
                    else {
                        $scope.vs.ImportStorageStartDate = "";
                        growlService.growl('Import storage date should be more than Import available date', 'danger');
                    }
                }
            };
            $scope.valids = function (fieldLabel, modalName, modalValue) {
                var ExpAvailableDate = $scope.vs.ExpAvailableDate;
                var ActualETD = $scope.vs.ActualETD;
                if (ExpAvailableDate != undefined) {
                    if (ExpAvailableDate < ActualETD||ExpAvailableDate <= ActualETD) {
                        return true;
                    }
                    else {
                        $scope.vs.ExpAvailableDate = "";
                        growlService.growl('Export storage date should be Less than ETD date', 'danger');
                    }
                }
            };
            $scope.validation = function (fieldLabel, modalName, modalValue) {
                
                var YardCutOff = $scope.vs.YardCutOffDate;
                var ClosingDate = $scope.vs.ClosingDate;
                if (YardCutOff != undefined) {
                    if (YardCutOff < ClosingDate||YardCutOff <= ClosingDate) {
                        return true;
                    }
                    else {
                        $scope.vs.YardCutOffDate = "";
                        growlService.growl('YardCutOff date  should be Less than Closing date', 'danger');
                    }
                }
            };
            $scope.validations = function (fieldLabel, modalName, modalValue) {
                var YardCutOffRF = $scope.vs.YardCutOffDateRF;
                var YardCutOff = $scope.vs.YardCutOffDate;
                if (YardCutOffRF != undefined) {
                    if (YardCutOffRF < YardCutOff||YardCutOffRF <= YardCutOff) {
                        return true;
                    }
                    else {
                        $scope.vs.YardCutOffDateRF = "";
                        growlService.growl('YardCutOffRF date  should be Less than YardCutOff date', 'danger');
                    }
                }
            };
            $scope.validate = function (fieldLabel, modalName, modalValue) {
                var ClosingDateRF = $scope.vs.ClosingDateRF;
                var ETD = $scope.vs.ETD;
                var ActualDepature = $scope.vs.ActualETD;
                if (ClosingDateRF != undefined) {
                    if (ClosingDateRF < ETD || ClosingDateRF <=ETD) {
                        return true;
                    }
                    else {
                        $scope.vs.ClosingDateRF = "";
                        growlService.growl('ClosingdateRF  should be Less than ETD  date', 'danger');
                    }
                }
            };
            $scope.validating = function (fieldLabel, modalName, modalValue) {
                
                var ClosingDate = $scope.vs.ClosingDate;
                var ETD = $scope.vs.ETD;
              //  var ActualDepature = $scope.vs.ActualETD;
                if (ClosingDate != undefined) {
                    if (ClosingDate < ETD||ClosingDate <= ETD) {
                        return true;
                    }
                    else {
                        $scope.vs.ClosingDate = "";
                        growlService.growl('Closingdate should be Less than ETD date', 'danger');
                    }
                }
            };

            $scope.validatings = function (fieldLabel, modalName, modalValue) {
                
                var ActualArrival = $scope.vs.ActualETA;
                var etaDate = $scope.vs.ETA;
               // var ActualDepature = $scope.vs.ActualETD;
                if (modalValue != undefined) {
                    if (modalValue > etaDate || modalValue >= etaDate) {
                        return true;
                    }
                    else {
                        $scope.vs.ActualETA = "";
                        growlService.growl('ATA date should be more than ETA date', 'danger');
                    }
                }
            };

            $scope.validatigs = function (fieldLabel, modalName, modalValue) {
                
                var etdDate = $scope.vs.ETD;
                var depdate = $scope.vs.ActualETD;
                // var ActualDepature = $scope.vs.ActualETD;
                if (depdate != undefined) {
                    if (depdate > etdDate || depdate >= etdDate) {
                        return true;
                    }
                    else {
                        $scope.vs.ActualETD = "";
                        growlService.growl('ATD date should be more than ETA date', 'danger');
                    }
                }
            };
            $scope.validatigss = function (fieldLabel, modalName, modalValue) {
                
                var Impavailabledate = $scope.vs.ImpAvaliableDate;
                var ActualArrival = $scope.vs.ActualETA;
                // var ActualDepature = $scope.vs.ActualETD;
                if (Impavailabledate != undefined) {
                    if (Impavailabledate > ActualArrival || Impavailabledate >= ActualArrival) {
                        return true;
                    }
                    else {
                        $scope.vs.ImpAvaliableDate = "";
                        growlService.growl('Import available date should be more than ATA date', 'danger');
                    }
                }
            };

    }]);

