angular.module('LogiCon').controller('addEditJobCategoryCntrl', ['$scope', 'JobCategoryService', 'ProcessMasterService', 'growlService', '$location', '$stateParams', '$uibModal', '$filter', '$q', 'Utility', 'CompanyService', '$state','$window',
    function ($scope, JobCategoryService, ProcessMasterService, growlService, $location, $stateParams, $uibModal, $filter, $q, Utility, CompanyService, $state, $window) {
        $scope.cancel = function () {
           
            $uibModalInstance.dismiss('cancel');
        };
        $scope.isNew = true;
        $scope.isfrmAddJobCategory = false;
        $scope.$watch('frmAddJobCategory.$valid', function (isValid) {
            $scope.isfrmAddJobCategory = isValid;
        });

        $scope.truefalse = false;

        $scope.AddJobCategory = function (jc) {
            
           
            if ($scope.isfrmAddJobCategory) {
                $scope.jc.JobCategoryMovements = $scope.JobCategoryMovements;
                if ($scope.jc.JobCategoryMovements!=undefined && $scope.jc.JobCategoryMovements.length > 0) {
                $scope.jc.JobCategoryRulesList = new Array();
                angular.forEach($scope.selected, function (item, index) {                    
                    var obj = {
                        RuleType: item.ruleType,
                        RuleDescription: item.ruleTypeDesc
                    };

                    $scope.jc.JobCategoryRulesList.push(obj);
                });
                $scope.jc.IsActive = true;
                JobCategoryService.SaveJobCategory($scope.jc).then(function (d) {
                    
                    growlService.growl(d.data, 'success');
                    // $scope.value = true;
                    $scope.isNew = false;
                    $state.go('addjobcategory', {});
                    //$location.path('/masterdata/jobcategory');
                }, function (err) {
                    growlService.growl(err.statusText, 'danger');
                })
                }
                else
                    growlService.growl('PLEASE SELECT ATLEAST ONE MODULE..', 'danger');
            
            }
            else {
                growlService.growl('Please enter all mandatory fields..', 'danger');
            }
            
        };
        //http://demo.dotnetawesome.com/multiselect-dropdown-with-checkbox-in-angularjs
        //http://stackoverflow.com/questions/24357288/how-to-convert-dash-case-to-camelcase-in-angularjs
        //http://stackoverflow.com/questions/24039226/angularjs-format-text-return-from-json-to-title-case


        $scope.toCamelCase = function (str) {
            
            if (str == 'CFS')
                return str;
            else if (str == 'TRANSPORTER') {
                str = 'TRANSPORT';
                return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
            } else if (str == '1STATS') {
                str = 'MYSTATS';
                return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
            }
            else
                return str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase();
        }
        $scope.jc = {};
        $scope.jc.IsFreight = false;
        $scope.jc.IsTrader = false;
        $scope.jc.IsHaulage = false;
        $scope.jc.IsWarehouse = false;
        $scope.jc.IsMystats = false;
        $scope.jc.IsDeclaration = false;
        $scope.jc.IsAgent = false;
        $scope.jc.IsDepot = false;
        $scope.jc.IsTransport = false;
        $scope.jc.IsManifest = false;
        $scope.jc.IsCFS = false;
        $scope.jc.IsPort = false;

        $scope.transportTypeChanged = function () {            
            if (jobCategoryCode == 'NEW') {
                $scope.jc.IsFreight = false;
                $scope.jc.IsTrader = false;
                $scope.jc.IsHaulage = false;
                $scope.jc.IsWarehouse = false;
                $scope.jc.IsMystats = false;
                $scope.jc.IsDeclaration = false;
                $scope.jc.IsAgent = false;
                $scope.jc.IsDepot = false;
                $scope.jc.IsTransport = false;
                $scope.jc.IsManifest = false;
                $scope.jc.IsCFS = false;
                $scope.jc.IsPort = false;
                $scope.jc.IsSales = false;
                $scope.jc.IsBilling = false;
                $scope.moduleList = null;
            }
        };

        $scope.moduleSelectionWrapper = function (module, type, transportMode, isSelected) {
            
            var isAddedtoList = false;
            if ($scope.JobCategoryMovements != null) {
                for (var i = 0; i < $scope.JobCategoryMovements.length; i++) {
                    if ($scope.JobCategoryMovements[i].Module == module)
                        isAddedtoList = true;
                }
            }

            if (isAddedtoList) {
                var r = $window.confirm('Your movements related to this module will be removed, proceed ?');
                if (r) {
                    var arr = $filter('filter')($scope.JobCategoryMovements, { Module: module });

                    for (var i = 0; i < arr.length; i++) {
                        
                        var index = $scope.JobCategoryMovements.indexOf(arr[i]);
                        $scope.JobCategoryMovements.splice(index, 1);
                    }
                    
                } else
                    return;
            } 

            $scope.module(module, type, transportMode);
            $scope.IsAtleastOneModuleSelected(isSelected);

        };

        $scope.module = function (module, type, transportMode) {
            var type1 = 'Is' + $scope.toCamelCase(type);
            ProcessMasterService.getProcessMasterListByModule(module, transportMode).then(function (d) {
                var status = $scope.jc[type1];
                if (status) {
                    if ($scope.moduleList != null) {
                        $scope.moduleList.push.apply($scope.moduleList, d.data);
                    }
                    else {
                        $scope.moduleList = d.data;
                    }
                }
                else {
                    if ($scope.moduleList != null && $scope.moduleList.length > 0) {
                        var tempArr = new Array();
                        var itemsCount = $scope.moduleList.length;
                        for (var j = 0; j < itemsCount; j++) {

                            if (parseInt(module) == $scope.moduleList[j].Module) {
                                tempArr.push(j);
                            }
                        }
                        $scope.moduleList = $.grep($scope.moduleList, function (n, i) {
                            return $.inArray(i, tempArr) == -1;
                        });
                    }
                }

            }, function (err) {
                //growlService.growl('', 'danger');
            });
        };

        $scope.IsAtleastOneModuleSelected = function (isSelected) {            
            $scope.jc.IsModuleSelected = false;
            if (isSelected) {
                $scope.jc.IsModuleSelected = true;
                return;
            }

            angular.forEach($scope.SubscriptionmodulesList, function (item, key) {                
                var isSelected = $scope.jc['Is' + $scope.toCamelCase(item.Text)];                
                if (isSelected) {
                    $scope.jc.IsModuleSelected = isSelected;                    
                }
            });
        };

        $scope.addMovementItem = function () {            
            var selCode = $scope.selectedMovementItem;
            var isAddedtoList = false;
            if ($scope.JobCategoryMovements != null) {
                for (var i = 0; i < $scope.JobCategoryMovements.length; i++) {
                    if ($scope.JobCategoryMovements[i].MovementCode == selCode)
                        isAddedtoList = true;
                }
            }

            for (var i = 0; i < $scope.moduleList.length; i++) {
                if ($scope.moduleList[i].Value == selCode) {
                    if ($scope.JobCategoryMovements != null) {
                        var obj = {
                            SeqNo: ($scope.JobCategoryMovements.length + 1),
                            MovementCode: $scope.moduleList[i].Value,
                            Code: $scope.jc.Code,
                            Module: $scope.selectedModuleItem
                        };
                        if (!isAddedtoList) {
                            $scope.JobCategoryMovements.push(obj);
                        }
                    }
                    else {                        
                        var obj = {
                            SeqNo: 1,
                            MovementCode: $scope.moduleList[i].Value,
                            Code: $scope.jc.Code,
                            Module: $scope.selectedModuleItem
                        };

                        $scope.JobCategoryMovements = new Array();
                        $scope.JobCategoryMovements.push(obj);
                    }

                    break;
                }
            }

            $scope.selectedMovementItem = null;
        };

        $scope.removeMovementItem = function (code) {
            /*
            
            var tempArr = new Array();
            tempArr.push(SeqNo - 1);
            $scope.JobCategoryMovements = $.grep($scope.JobCategoryMovements, function (n, i) {
                return $.inArray(i, tempArr) == -1;
            });*/
            JobCategoryService.RemoveMovementItem($scope.JobCategoryMovements, code).then(
                function (d) {
                    $scope.JobCategoryMovements = d.data;
                },
                function (err) { growlService.growl(err.statusText, 'danger'); });
        };

        $scope.backClick = function () {
            $state.go('jobcategory', {});
            // $location.path('/masterdata/jobcategory');
        };


        
        $scope.editMovementItem = function (mvtCode) {
            
            $scope.selectedModuleItem = $filter('filter')($scope.moduleList, { Value: mvtCode })[0].Module;
          
            var module = $scope.selectedModuleItem;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/MasterData/Templates/JobCategory/add-charges.html?v=' + Utility.Version,
                controller: 'EditChargesCntrl',
                size: 'lg',
                resolve: {
                    DTOObj: {
                        module: module,
                        mvtCode: mvtCode,
                        jobCategoryCode: $scope.jc.Code,
                        chargesList: $scope.jc.JobCategoryChargesList,
                        vasList: $scope.jc.JobCategoryChargesVASList
                    }
                }
            });

            modalInstance.result.then(function (obj) {
                $scope.jc.JobCategoryChargesList = obj.chargesList;
                $scope.jc.JobCategoryChargesVASList = obj.vasList;
            }, function (err) {

            });
        };
        
        $scope.GetLookupData = function () {
            
            JobCategoryService.getLookupData().then(function (d) {
             
                $scope.lookupData = d.data;
            }, function () { });
        };
        
        var jobCategoryCode = $stateParams.code;
        if (jobCategoryCode != 'NEW' && jobCategoryCode != '') {
            /*
            JobCategoryService.getJobCategoryItem(jobCategoryCode).then(function (d) {            
                $scope.jc = d.data.jobCategory;
                $scope.JobCategoryMovements = d.data.jobCategory.JobCategoryMovements;
                $scope.moduleList = d.data.process;           
    
                angular.forEach(d.data.jobCategory.JobCategoryRulesList, function (item, index) {
                    var obj = {
                        ruleType: item.RuleType,
                        ruleTypeDesc: item.RuleDescription
                    };
                    $scope.selected.push(obj);
                });            
            }, function (err) { growl.error(err.statusText, {}); }); */

            $scope.truefalse = true;
            $scope.isNew = false;
            var jobCategoryPromise = JobCategoryService.getJobCategoryItem(jobCategoryCode);
            var lookupDataPromise = JobCategoryService.getLookupData();
            $q.all([jobCategoryPromise, lookupDataPromise]).then(function (d) {
                $scope.jc = d[0].data.jobCategory;
                $scope.JobCategoryMovements = d[0].data.jobCategory.JobCategoryMovements;
                $scope.moduleList = d[0].data.process;

                angular.forEach(d[0].data.jobCategory.JobCategoryRulesList, function (item, index) {
                    var obj = {
                        ruleType: item.RuleType,
                        ruleTypeDesc: item.RuleDescription
                    };
                    $scope.selected.push(obj);
                });
                $scope.lookupData = d[1].data;

                $scope.IsAtleastOneModuleSelected();
            }, function (err) { });
        } else {
            $scope.GetLookupData();
        }
        
        $scope.isjobcategoryExists = function (Code) {
            
            if (Code != '') {
                JobCategoryService.getJobCategoryItem(Code).then(function (d) {
                    
                    if (d.data != null) {

                        growlService.growl('Job Category Code already exists', 'warning');
                        $scope.jc.Code = '';
                    }

                }, function () { });
            }
        };


        /* tree checkbox start */
        $scope.items = [1, 2, 3, 4, 5];
        $scope.selected = new Array();
        $scope.toggle = function (item, list) {
            var tempItem = $filter('filter')(list, { ruleType: item.ruleType, ruleTypeDesc: item.ruleTypeDesc });
            if (tempItem.length > 0) {

                var idx = list.indexOf(tempItem[0]);
                if (idx > -1) {
                    list.splice(idx, 1);
                }
            }
            else {
                list.push(item);
            }
        };

        CompanyService.GetCompanySubscription().then(function (d) {
            $scope.SubscriptionmodulesList = d.data;
        }, function (err) { growlService.growl(err.statusText, 'danger'); });

        $scope.exists = function (item, list) {
            var tempItem = $filter('filter')(list, { ruleType: item.ruleType, ruleTypeDesc: item.ruleTypeDesc });
            return tempItem.length > 0;
        };

        $scope.isIndeterminate = function (jobCategoryRuleType) {
            var tempSelectedJobCategory = $filter('filter')($scope.selected, { ruleType: jobCategoryRuleType });
            var tempJobCategory = $filter('filter')($scope.lookupData.jobCategoryRuleDTOList, { jobCategoryRuleType: jobCategoryRuleType })[0];

            return (tempSelectedJobCategory.length !== 0 &&
                tempSelectedJobCategory.length !== tempJobCategory.ruleTypeList.length);
        };

        $scope.isChecked = function (jobCategoryRuleType) {
            var tempSelectedJobCategory = $filter('filter')($scope.selected, { ruleType: jobCategoryRuleType });
            var tempJobCategory = $filter('filter')($scope.lookupData.jobCategoryRuleDTOList, { jobCategoryRuleType: jobCategoryRuleType })[0];

            return tempSelectedJobCategory.length === tempJobCategory.ruleTypeList.length
        };

        $scope.toggleAll = function (jobCategoryRuleType) {

            var tempJobCategory = $filter('filter')($scope.lookupData.jobCategoryRuleDTOList, { jobCategoryRuleType: jobCategoryRuleType })[0];
            var tempSelectedJobCategory = $filter('filter')($scope.selected, { ruleType: jobCategoryRuleType });

            if (tempSelectedJobCategory.length === tempJobCategory.ruleTypeList.length) {
                for (var i = 0; i < tempSelectedJobCategory.length; i++) {
                    var idx = $scope.selected.indexOf(tempSelectedJobCategory[i]);
                    if (idx > -1) {
                        $scope.selected.splice(idx, 1);
                    }
                }
            } else if (tempSelectedJobCategory.length === 0 || tempSelectedJobCategory.length > 0) {
                for (var i = 0; i < tempJobCategory.ruleTypeList.length; i++) {
                    var idx = $scope.selected.indexOf(tempJobCategory.ruleTypeList[i]);
                    if (idx == -1) {
                        $scope.selected.push(tempJobCategory.ruleTypeList[i])
                    }
                }
            }
        };

        $scope.selectedMovementItem = '';
        $scope.movementTypeChange = function (selectedMovement) {
            $scope.selectedMovementItem = selectedMovement;
            $scope.selectedModuleItem = $filter('filter')($scope.moduleList, { Value: selectedMovement })[0].Module;
        };
        
        $scope.validatePercentage = function () {
            
            if ($scope.jc.ChargePercent > 100)
            {
                growlService.growl('Haulage charge code percentage cannot be gratherthan 100', 'danger');
                $scope.jc.ChargePercent = '';
            }
        };


        //ref url: https://material.angularjs.org/latest/demo/checkbox
        /* tree checkbox end */
    }]);
