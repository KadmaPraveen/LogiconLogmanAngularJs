angular.module('LogiCon').controller('OrderEntryController', ['$scope', '$uibModal', 'OrderEntryService', 'Utility', 'limitToFilter', '$http', '$stateParams', 'growlService', 'UtilityFunc', '$window', 'AddressService', 'PortAreaService', '$timeout', '$location', 'CountryService', 'VesselScheduleService', 'JobCategoryService', 'MerchantProfileService', '$state', '$filter', 'NgTableParams', 'JobCategoryChargesService', '$anchorScroll', 'k1Service', 'k2Service',
    function ($scope, $uibModal, OrderEntryService, Utility, limitToFilter, $http, $stateParams, growlService, UtilityFunc, $window, AddressService, PortAreaService, $timeout, $location, CountryService, VesselScheduleService, JobCategoryService, MerchantProfileService, $state, $filter, NgTableParams, JobCategoryChargesService, $anchorScroll, k1Service, k2Service) {


        $scope.tempFlag = false;
        $scope.toggleFeedback = function () {
            $scope.tempFlag = !$scope.tempFlag;
            if ($scope.tempFlag)
                jQuery("#feedback").animate({ right: "-0px" });
            else
                jQuery("#feedback").animate({ right: "-210px" });
        }

        $scope.navigateTo = function (id) {
            $scope.toggleFeedback();
            $location.hash(id);
            $anchorScroll();

        };

        var defaultCurrency = UtilityFunc.DefaultCurrency();
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.dateTimeFormat = UtilityFunc.DateTimeFormat();
        $scope.branchID = UtilityFunc.BranchID();
        $scope.isForwardingAgent = false;
        $scope.isShippingAgent = false;
        $scope.isOriginAgent = false;
        $scope.showLoading = true;
        $scope.isFrmOrderEntryValid = false;
        $scope.IsNew = false;
        $scope.IsClone = false;

        $scope.isConsignorChecked = true;
        $scope.isConsigneeChecked = true;
        $scope.isConventionalCargo = false;

        $scope.conGradeTypeList = new Array();
        $scope.docList = '';
        $scope.UUIDInfo = {};
        $scope.$watch('frmOrderEntry.$valid', function (isValid) {
            $scope.isFrmOrderEntryValid = isValid;
        });
        $scope.oe = {
            orderContainerList: new Array(),
            orderCargoList: new Array(),
            orderText: {},
            InvoiceCurrency: defaultCurrency,
            CargoCurrencyCode: defaultCurrency,
            ExchangeRate: (1.0000).toFixed(4)
        };
        $scope.declarationOrderStatus = {};
        $scope.summary = {};
        $scope.showDeclaration = false;
        $scope.oe.CustomerAddress = '';
        $scope.isContainerChanged = false;
        var d = new Date();
        //$scope.ContainerlookupData = {};
        var month = d.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        };
        $scope.Activity = {};
        $scope.Activities = new Array();


        $scope.oe.OrderDate = moment();
        $scope.tabs = [
            { title: 'General', content: 'Js/Operation/Templates/OrderEntry/general.html?v=' + Utility.Version, active: true, disabled: false, visible: true, eInsurance: false },
            { title: 'Transport', content: 'Js/Operation/Templates/OrderEntry/transport.html?v=' + Utility.Version, active: false, disabled: false, visible: false, eInsurance: false },
            { title: 'Container', content: 'Js/Operation/Templates/OrderEntry/container.html?v=' + Utility.Version, active: false, disabled: false, visible: false, eInsurance: false },
            { title: 'Cargo', content: 'Js/Operation/Templates/OrderEntry/cargo.html?v=' + Utility.Version, active: false, disabled: true, visible: true, eInsurance: false },
            //{ title: 'Marks & Numbers', content: 'Js/Operation/Templates/OrderEntry/marks.html?v=' + Utility.Version, active: false, disabled: false, visible: true, eInsurance: false },
            { title: 'Services', content: 'Js/Operation/Templates/OrderEntry/services.html?v=' + Utility.Version, active: false, disabled: false, visible: false, eInsurance: false },
            { title: 'Order Activity', content: 'Js/Operation/Templates/OrderEntry/orderactivity.html?v=' + Utility.Version, active: false, disabled: false, visible: false, eInsurance: false },
            { title: 'e Insurance', content: 'Js/Operation/Templates/OrderEntry/e-insurance.html?v=' + Utility.Version, active: false, disabled: false, visible: false, eInsurance: false },
            { title: 'Documents', content: 'Js/Operation/Templates/OrderEntry/documents.html?v=' + Utility.Version, active: false, disabled: false, visible: true, eInsurance: false }
        ];


        $scope.companyType = UtilityFunc.CompanyType();
        function GetPaddingNo(num) {
            var str = "" + num
            var pad = "000"
            var result = pad.substring(0, pad.length - str.length) + str

            return result;
        }
        $scope.oe.selectedConMovements = {};
        $scope.ProcessMovements = function (ContainerKey) {
            var orderTruckMovement = {};
            var defContainerKey = ContainerKey;
            angular.forEach(jobCategoryMovementsArr, function (item, index) {
                orderTruckMovement = {
                    ContainerKey: ContainerKey + '-' + item.MovementCode,
                    MovementCode: item.MovementCode,
                    MovementSeqNo: item.SeqNo
                };
                if (!angular.isUndefined($scope.oe.orderTruckMovementList)) {
                    $scope.oe.orderTruckMovementList.push(orderTruckMovement);
                    //$scope.oe.selectedConMovements = $filter('filter')($scope.oe.orderTruckMovementList, { ContainerKey: orderTruckMovement.ContainerKey });
                }
                else {
                    $scope.oe.orderTruckMovementList = new Array();
                    $scope.oe.orderTruckMovementList.push(orderTruckMovement);

                }
            });
            $scope.oe.selectedConMovements = $filter('filter')($scope.oe.orderTruckMovementList, { ContainerKey: defContainerKey });
        };

        $scope.GetContainerKey = function () {
            var _conKey = 0;
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                var tempKey = 0;
                var tempKey = parseFloat(item.ContainerKey.split('-')[1]);
                if (tempKey > _conKey)
                    _conKey = tempKey;
            });

            var paddingNo = GetPaddingNo(_conKey + 1);
            if (!angular.isUndefined($scope.oe.OrderNo) && $scope.oe.OrderNo != '') {
                return $scope.oe.OrderNo + '-' + paddingNo;
            } else
                return '-' + paddingNo;
        };


        /*Container code*/
        var containerIndex = -1;
        $scope.AddContainer = function (index) {
            containerIndex = index;
            $scope.isContainerChanged = true;
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Operation/Templates/OrderEntry/add-container.html?v=' + Utility.Version,
                size: 'lg',
                controller: 'AddOrderEntryContainer',
                resolve: {
                    dataObj: function () {
                        return {
                            containerItem: (containerIndex == -1 ? {} : $scope.oe.orderContainerList[containerIndex]),
                            JobType: $scope.oe.JobType,
                            iswebOrder: $scope.IsWebOrder
                        };
                    }
                }
            });

            $scope.modalInstance.result.then(function (con) {
                if (containerIndex != -1) {
                    $scope.oe.orderContainerList[containerIndex] = con;
                    if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {
                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1009) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1009 };
                            //$scope.Activity.ActivityCode = 1009;
                            $scope.Activities.push(obj);
                        }
                    }
                }
                else {
                    con.ContainerKey = $scope.GetContainerKey();
                    if ($scope.oe.orderContainerList != null) {
                        $scope.oe.orderContainerList.push(con);
                    }
                    else {
                        $scope.oe.orderContainerList = new Array();
                        $scope.oe.orderContainerList.push(con);
                    }
                    if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1007) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1007 };
                            // $scope.Activity.ActivityCode = 1007;
                            $scope.Activities.push(obj);
                        }
                    }
                    $scope.ProcessMovements(con.ContainerKey);
                }
                $scope.generate(true, false);
                $scope.ngTblContainer();

            }, function () {

            });
        };

        $scope.CopyContainer = function (obj) {
            var copyCon = angular.copy(obj);
            $scope.isContainerChanged = true;
            if ($scope.oe.orderContainerList != null) {

                copyCon.ContainerKey = $scope.GetContainerKey();
                $scope.ProcessMovements(copyCon.ContainerKey);
                copyCon.ContainerNo = '';
                copyCon.HaulageStatus = false;
                $scope.oe.orderContainerList.push(copyCon);
                if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                    var flag = false;
                    angular.forEach($scope.Activities, function (item, index) {
                        if (item.ActivityCode == 1007) {
                            flag = true;
                        }
                    });
                    if (flag == false) {
                        var obj = { ActivityCode: 1007 };
                        // $scope.Activity.ActivityCode = 1007;
                        $scope.Activities.push(obj);
                    }
                }
            }

            $scope.generate(true, false);

            $scope.ngTblContainer();
        }

        $scope._containerIndex = -1;
        $scope.ngTblContainer = function () {
            if ($scope.oe.orderContainerList == null)
                $scope.oe.orderContainerList = new Array();
            $scope.tblContainer = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    CreatedOn: 'desc'
                }
            }, {
                    total: $scope.oe.orderContainerList.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.oe.orderContainerList, params.orderBy()) : $scope.oe.orderContainerList;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope._containerIndex = (params.page() - 1) * params.count();
                    }
                })
        };

        $scope.DeleteContainer = function (index, ContainerNo, containerKey) {
            if (!$scope.oe.IsPartial && ContainerNo != '') {
                if ($window.confirm('Are you sure, you want to delete \'' + ContainerNo + '\' ?')) {
                    OrderEntryService.CheckContainerStatus($scope.oe.OrderNo, ContainerNo, containerKey).then(function (d) {
                        if (d.data == 'Done') {
                            $scope.deleteContainer(index, ContainerNo, containerKey);
                            $state.go('orderentry', {
                                orderno: $scope.oe.OrderNo,
                                IsWeb: false,
                                branchId: $scope.oe.BranchID,
                                orderOwner: null
                            });
                        }
                        else
                            growlService.growl(d.data, 'danger');
                    }, function (err) {

                    });
                }
            }
            else {
                $scope.deleteContainer(index, ContainerNo, containerKey);
            }
        }

        $scope.deleteContainer = function (index, ContainerNo, containerKey) {
            $scope.isContainerChanged = true;
            var _ContainerKey = $scope.oe.orderContainerList[index].ContainerKey;
            //var movements = $filter('filter')($scope.oe.JobCategoryMovements, { ContainerKey: _ContainerKey});

            $scope.oe.orderContainerList = UtilityFunc.removeArrayElementByKey($scope.oe.orderContainerList, 'ContainerKey', containerKey);
            $scope.oe.orderTruckMovementList = UtilityFunc.removeArrayElementByKey($scope.oe.orderTruckMovementList, 'ContainerKey', containerKey);

            if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1008) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1008 };
                    //$scope.Activity.ActivityCode = 1008;
                    $scope.Activities.push(obj);
                }
            }
            $scope.oe.selectedConMovements = new Array();
            $scope.ngTblContainer();
        }

        $scope.getTruckMovementByValue = function (ContainerKey, index) {

            $scope.oe.selectedConMovements = $filter('filter')($scope.oe.orderTruckMovementList, { ContainerKey: ContainerKey });
            $scope.SelectedContainerIndex = index;
        }

        $scope.getDefaultRowForTruckMovement = function (ContainerKey, index) {
            if (index == 0) {
                $scope.oe.selectedConMovements = $filter('filter')($scope.oe.orderTruckMovementList, { ContainerKey: ContainerKey });
                $scope.SelectedContainerIndex = 0;
            }
        }
        $scope.CloneConatiner = function () {
            var tempArray = new Array();
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                if (item.chk) {
                    tempArray.push(index);
                }
            });

            angular.forEach(tempArray, function (item, index) {
                var tempObj = {};
                angular.copy($scope.oe.orderContainerList[item], tempObj);
                $scope.oe.orderContainerList.push(tempObj);
            });

            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                item.Index = index;
                item.chk = false;
            });

        };

        $scope.RemoveContainers = function () {
            var tempArray = new Array();
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                if (item.chk) {
                    tempArray.push(index);
                }
            });

            angular.forEach(tempArray, function (item, index) {
                $scope.oe.orderContainerList = UtilityFunc.removeArrayElementByKey($scope.oe.orderContainerList, 'Index', item);
            });

            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                item.Index = index;
                item.chk = false;
            });

        };
        $scope.hdrChkContainer = false;
        $scope.toggleChksContainer = function () {
            $scope.hdrChkContainer = !$scope.hdrChkContainer;
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                item.chk = $scope.hdrChkContainer;
            });
        };
        $scope.itemEntryIndex = -1;
        $scope.ngTblItemEntry = function () {
            if ($scope.oe.declarationItems == null)
                $scope.oe.declarationItems = new Array();
            $scope.tableSorting = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    CreatedOn: 'desc'
                }
            }, {
                    total: $scope.oe.declarationItems.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.oe.declarationItems, params.orderBy()) : $scope.oe.declarationItems;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope.itemEntryIndex = (params.page() - 1) * params.count();
                    }
                })
        };

        $scope.transportInfoIndex = -1;
        $scope.ngTblTransportInfo = function () {
            if ($scope.oe.orderContainerList == null)
                $scope.oe.orderContainerList = new Array();
            $scope.tblTransportInfo = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    CreatedOn: 'desc'
                }
            }, {
                    total: $scope.oe.orderContainerList.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.oe.orderContainerList, params.orderBy()) : $scope.oe.orderContainerList;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope.transportInfoIndex = (params.page() - 1) * params.count();
                    }
                });

        };

        $scope.documentsIndex = -1;
        $scope.ngTblDocuments = function () {
            if ($scope.k1.declarationDocuments == null)
                $scope.k1.declarationDocuments = new Array();
            $scope.tblDocuments = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    CreatedOn: 'desc'
                }
            }, {
                    total: $scope.k1.declarationDocuments.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.k1.declarationDocuments, params.orderBy()) : $scope.k1.declarationDocuments;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope.documentsIndex = (params.page() - 1) * params.count();
                    }
                })
        };

        $scope.currentPage = 1;
        $scope.limit = 10;

        $scope.tableData = {};
        $scope.GetTableData = function (skip, limit) {
            $scope.tableData = $scope.k1.declarationItems.slice(skip, skip + limit);
            $scope.totalItems = $scope.k1.declarationItems.length;
        };

        $scope.pageChanged = function () {
            $scope.skip = $scope.currentPage == 1 ? 0 : ($scope.limit * ($scope.currentPage - 1));
            $scope.GetTableData($scope.skip, $scope.limit);
        };


        $scope.AddContainers = function () {
            var tempArray = new Array();

            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                if (item.chk) {
                    tempArray.push(index);
                }
            });

            if (tempArray.length > 1) {
                growlService.growl('please select one container to proceed', 'danger');

            } else {
                var count = parseInt($window.prompt('Please enter the count ?'));
                for (var i = 0; i < count; i++) {
                    var tempObj = {};
                    angular.copy($scope.oe.orderContainerList[tempArray[0]], tempObj);
                    $scope.oe.orderContainerList.push(tempObj);
                }
            }

            $scope.ngTblContainer();
        };

        $scope.ContainerRowClick = function (index) {
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                item.activeCls = false;
            });
            $scope.oe.orderContainerList[index].activeCls = true;
        };

        $scope.UpdateContainers = function () {
            var tempArray = new Array();
            var selectedIndex = -1;
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                if (item.activeCls) {
                    selectedIndex = index;
                }

                if (item.chk) {
                    tempArray.push(index);
                }
            });
            angular.forEach(tempArray, function (item, index) {
                $scope.oe.orderContainerList[item].SpecialHandling = $scope.oe.orderContainerList[selectedIndex].SpecialHandling;
                $scope.oe.orderContainerList[item].ContainerGrade = $scope.oe.orderContainerList[selectedIndex].ContainerGrade;
                $scope.oe.orderContainerList[item].SealNo = $scope.oe.orderContainerList[selectedIndex].SealNo;
                $scope.oe.orderContainerList[item].Temprature = $scope.oe.orderContainerList[selectedIndex].Temprature;
                $scope.oe.orderContainerList[item].TemperatureMode = $scope.oe.orderContainerList[selectedIndex].TemperatureMode;
                $scope.oe.orderContainerList[item].TrailerType = $scope.oe.orderContainerList[selectedIndex].TrailerType;
                $scope.oe.orderContainerList[item].TrailerTypeDescription = $scope.oe.orderContainerList[selectedIndex].TrailerTypeDescription;
                $scope.oe.orderContainerList[item].GrossWeight = $scope.oe.orderContainerList[selectedIndex].GrossWeight;
                $scope.oe.orderContainerList[item].CargoType = $scope.oe.orderContainerList[selectedIndex].CargoType;
                $scope.oe.orderContainerList[item].CargoTypeDescription = $scope.oe.orderContainerList[selectedIndex].CargoTypeDescription;

                $scope.oe.orderContainerList[item].IMOCode = $scope.oe.orderContainerList[selectedIndex].IMOCode;
                $scope.oe.orderContainerList[item].UNNo = $scope.oe.orderContainerList[selectedIndex].UNNo;
                $scope.oe.orderContainerList[item].CargoHandling = $scope.oe.orderContainerList[selectedIndex].CargoHandling;
                $scope.oe.orderContainerList[item].RequiredDate = $scope.oe.orderContainerList[selectedIndex].RequiredDate;
                $scope.oe.orderContainerList[item].DehireDate = $scope.oe.orderContainerList[selectedIndex].DehireDate;
                $scope.oe.orderContainerList[item].ContainerRef = $scope.oe.orderContainerList[selectedIndex].ContainerRef;
                $scope.oe.orderContainerList[item].Remarks = $scope.oe.orderContainerList[selectedIndex].Remarks;
                $scope.oe.orderContainerList[item].Dimension = $scope.oe.orderContainerList[selectedIndex].Dimension;

                $scope.oe.orderContainerList[item].chk = false;
            });

            $scope.oe.orderContainerList[selectedIndex].activeCls = false;
        };

        $scope.ClearSelection = function () {
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                item.chk = false;
                item.activeCls = false;
            });
        };
        /*Container code*/
        /*transport code*/
        var transIndex = -1;
        $scope.AddTransport = function (index) {
            transIndex = index;
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Operation/Templates/OrderEntry/add-transport.html?v=' + Utility.Version,
                controller: 'AddOrderEntryTransport',
                size: 'lg',
                resolve: {
                    dataObj: function () {
                        return {
                            transItem: (transIndex == -1 ? {} : $scope.oe.orderContainerList[transIndex]),
                            iswebOrder: $scope.IsWebOrder
                        };
                    }
                }
            });

            $scope.modalInstance.result.then(function (trans) {

                if (transIndex != -1) {

                    if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1009) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1009 };
                            //$scope.Activity.ActivityCode = 1009;
                            $scope.Activities.push(obj);
                        }
                    }

                    $scope.oe.orderContainerList[transIndex] = trans;

                }
                else {

                    if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1007) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1007 };
                            // $scope.Activity.ActivityCode = 1007;
                            $scope.Activities.push(obj);
                        }
                    }

                    trans.ContainerKey = $scope.GetContainerKey();
                    if ($scope.oe.orderContainerList != null) {
                        $scope.oe.orderContainerList.push(trans);
                    }
                    else {
                        $scope.oe.orderContainerList = new Array();
                        $scope.oe.orderContainerList.push(trans);
                    }
                    $scope.ProcessMovements(trans.ContainerKey);
                }
                $scope.ngTblTransportInfo();

            }, function () {

            });
        };

        $scope.CopyTransport = function (obj) {
            var CopyTransport = angular.copy(obj);
            if ($scope.oe.orderContainerList != null) {
                CopyTransport.ContainerNo = '';
                $scope.oe.orderContainerList.push(CopyTransport);
            }
            if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1007) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1007 };
                    //$scope.Activity.ActivityCode = 1007;
                    $scope.Activities.push(obj);
                }
            }
            CopyTransport.ContainerKey = $scope.GetContainerKey();
            $scope.ProcessMovements(CopyTransport.ContainerKey);
            // $scope.generate(true, false);

            $scope.ngTblTransportInfo();
        }



        $scope.DeleteTransport = function (index, ContainerKey) {

            if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1008) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1008 };
                    //  $scope.Activity.ActivityCode = 1008;
                    $scope.Activities.push(obj);
                }
            }
            $scope.oe.orderContainerList = UtilityFunc.removeArrayElementByKey($scope.oe.orderContainerList, 'Index', index);
            $scope.oe.orderTruckMovementList = UtilityFunc.removeArrayElementByKey($scope.oe.orderTruckMovementList, 'ContainerKey', ContainerKey);
            $scope.oe.selectedConMovements = new Array();
            $scope.ngTblTransportInfo();


        }

        $scope.CloneTransport = function () {
            var tempArray = new Array();
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                if (item.chk) {
                    tempArray.push(index);
                }
            });

            angular.forEach(tempArray, function (item, index) {
                var tempObj = {};
                angular.copy($scope.oe.orderContainerList[item], tempObj);
                $scope.oe.orderContainerList.push(tempObj);
            });

            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                item.Index = index;
                item.chk = false;
            });

        };

        $scope.RemoveTransport = function () {
            var tempArray = new Array();
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                if (item.chk) {
                    tempArray.push(index);
                }
            });

            angular.forEach(tempArray, function (item, index) {
                $scope.oe.orderContainerList = UtilityFunc.removeArrayElementByKey($scope.oe.orderContainerList, 'Index', item);
            });

            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                item.Index = index;
                item.chk = false;
            });

        };
        $scope.hdrChkTransport = false;
        $scope.toggleChksTransport = function () {
            $scope.hdrChkTransport = !$scope.hdrChkTransport;
            angular.forEach($scope.oe.orderContainerList, function (item, index) {
                item.chk = $scope.hdrChkTransport;
            });
        };
        /*Transport code*/
        /* Cargo Code */

        var cargoIndex = -1;
        $scope.AddCargo = function (index) {

            cargoIndex = index;
            $scope.modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/Operation/Templates/OrderEntry/add-cargo.html?v=' + Utility.Version,
                windowClass: 'app-modal-window2',
                controller: 'AddOrderEntryCargo',
                resolve: {
                    dataObj: function () {
                        return {
                            FreightMode: $scope.TempFreightMode,
                            TransportType: $scope.oe.TransportType,
                            List: $scope.oe.orderContainerList,
                            uomList: $scope.lookupData.uomList,
                            stockRoomList: $scope.lookupData.stockRoomList,
                            currencyList: $scope.lookupData.currencyList,
                            countryList: $scope.lookupData.countryList,
                            packageTypeList: $scope.lookupData.packageTypeList,
                            cargoItem: (cargoIndex == -1 ? {} : $scope.oe.orderCargoList[cargoIndex]),
                            transportType: $scope.oe.TransportType,
                            iswebOrder: $scope.IsWebOrder
                        };
                    }
                }
            });

            $scope.modalInstance.result.then(function (cargo) {
                if (cargoIndex != -1) {
                    $scope.oe.orderCargoList[cargoIndex] = cargo;
                    if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {
                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1012) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1012 };
                            //$scope.Activity.ActivityCode = 1012;
                            $scope.Activities.push(obj);
                        }
                    }
                }
                else {
                    if ($scope.oe.orderCargoList != null) {
                        $scope.oe.orderCargoList.push(cargo);
                    }
                    else {
                        $scope.oe.orderCargoList = new Array();
                        $scope.oe.orderCargoList.push(cargo);
                    }
                    if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                        var flag = false;
                        angular.forEach($scope.Activities, function (item, index) {
                            if (item.ActivityCode == 1010) {
                                flag = true;
                            }
                        });
                        if (flag == false) {
                            var obj = { ActivityCode: 1010 };
                            //$scope.Activity.ActivityCode = 1010;
                            $scope.Activities.push(obj);
                        }
                    }
                }
                $scope.generate(false, true);
                $scope.ngTblCargo();
            }, function () {

            });
        };

        $scope._cargoIndex = -1;
        $scope.ngTblCargo = function () {
            if ($scope.oe.orderCargoList == null)
                $scope.oe.orderCargoList = new Array();
            $scope.tblCargo = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    CreatedOn: 'desc'
                }
            }, {
                    total: $scope.oe.orderCargoList.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.oe.orderCargoList, params.orderBy()) : $scope.oe.orderCargoList;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        $scope._cargoIndex = (params.page() - 1) * params.count();
                    }
                })
        };
        $scope.CopyItemEntry = function (obj) {
            var copyItemEntry = angular.copy(obj);
            if ($scope.oe.orderCargoList != null) {
                copyItemEntry.ContainerNo = '';
                $scope.oe.orderCargoList.push(copyItemEntry);
            }
            if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1010) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1010 };
                    //$scope.Activity.ActivityCode = 1010;
                    $scope.Activities.push(obj);
                }
            }
            $scope.ngTblCargo();
        }
        $scope.DeleteCargo = function (index) {
            $scope.oe.orderCargoList = UtilityFunc.removeArrayElementByKey($scope.oe.orderCargoList, 'Index', index);
            $scope.ngTblCargo();
            if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {
                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1011) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1011 };
                    //$scope.Activity.ActivityCode = 1011;
                    $scope.Activities.push(obj);
                }
            }
        };

        $scope.CloneCargo = function () {
            var tempArray = new Array();
            angular.forEach($scope.oe.orderCargoList, function (item, index) {
                if (item.chk) {
                    tempArray.push(index);
                }
            });

            angular.forEach(tempArray, function (item, index) {
                var tempObj = {};
                angular.copy($scope.oe.orderCargoList[item], tempObj);
                $scope.oe.orderCargoList.push(tempObj);
            });

            angular.forEach($scope.oe.orderCargoList, function (item, index) {
                item.Index = index;
                item.chk = false;
            });
        };

        $scope.RemoveCargo = function () {
            var tempArray = new Array();
            angular.forEach($scope.oe.orderCargoList, function (item, index) {
                if (item.chk) {
                    tempArray.push(index);
                }
            });

            angular.forEach(tempArray, function (item, index) {
                $scope.oe.orderCargoList = UtilityFunc.removeArrayElementByKey($scope.oe.orderCargoList, 'Index', item);
            });

            angular.forEach($scope.oe.orderCargoList, function (item, index) {
                item.Index = index;
                item.chk = false;
            });
        };
        $scope.hdrChkCargo = false;
        $scope.toggleChksCargo = function () {
            $scope.hdrChkCargo = !$scope.hdrChkCargo;
            angular.forEach($scope.oe.orderCargoList, function (item, index) {
                item.chk = $scope.hdrChkCargo;
            });
        };
        /* Cargo Code */
        $scope.cancel = function () {
            $scope.modalInstance.dismiss();
        };

        $scope.doSomething = function () {
            console.log("Do Something");
        };

        $scope.imagesArr = new Array();

        $scope.ValidatePorts = function () {
            if ($scope.oe.TransportType == 1021) {
                if ($scope.oe.PortOfLoading != undefined && $scope.oe.PortOfDischarge != undefined && $scope.oe.PortOfLoading != '' && $scope.oe.PortOfDischarge != '' && $scope.oe.PortOfLoading == $scope.oe.PortOfDischarge) {
                    growlService.growl('Loading Port and Discharge Port can not be the same', 'danger');
                    return false;
                }
                else if ($scope.oe.PortOfLoading != undefined && $scope.oe.TranshipmentPort != undefined && $scope.oe.PortOfLoading != '' && $scope.oe.TranshipmentPort != '' && $scope.oe.PortOfLoading == $scope.oe.TranshipmentPort) {
                    growlService.growl('Loading Port and Transhipment Port can not be the same', 'danger');
                    return false;
                }
                else if ($scope.oe.PortOfDischarge != undefined && $scope.oe.TranshipmentPort != undefined && $scope.oe.PortOfDischarge != '' && $scope.oe.TranshipmentPort != '' && $scope.oe.PortOfDischarge == $scope.oe.TranshipmentPort) {
                    growlService.growl('Transhipment Port and Discharge Port can not be the same', 'danger');
                    return false;
                }
                else
                    return true;
            }
            else
                return true;
        };
        $scope.ValidatePartialSave = function () {
            if ($scope.oe.TransportType == undefined || $scope.oe.TransportType == '') {
                growlService.growl('please select Transport Type', 'danger');
                return false;
            }
            else if ($scope.oe.ShipmentType == undefined || $scope.oe.ShipmentType == '') {
                growlService.growl('please select Shipment Type', 'danger');
                return false;
            }
            else if ($scope.oe.JobType == undefined || $scope.oe.JobType == '') {
                growlService.growl('please select Job Type', 'danger');
                return false;
            }
            else if ($scope.oe.OrderCategory == undefined || $scope.oe.OrderCategory == '') {
                growlService.growl('please select Order Category', 'danger');
                return false;
            }
            else if ($scope.oe.CustomerName == undefined || $scope.oe.CustomerName == '') {
                growlService.growl('please select Customer', 'danger');
                return false;
            }
            else
                return true;
        };

        $scope.SaveOrderEntry = function (oe) {
            $scope.submitted = true;
            if ($scope.isFrmOrderEntryValid) {
                if ($scope.ValidatePorts()) {
                    var data = new FormData();
                    for (var i in $scope.files) {
                        data.append("uploadedFile", $scope.files[i]);
                    }
                    $scope.changeShipmentType($scope.oe.ShipmentType);
                    if ($scope.isConventionalCargo) {
                        $scope.oe.orderContainerList = null;
                    }
                    $scope.oe.IsPartial = false;
                    if (($scope.oe.OrderNo == null || $scope.oe.OrderNo == undefined || $scope.oe.OrderNo == "") && !$scope.oe.IsPartial) {

                        var obj = { ActivityCode: 1000 };
                        // $scope.Activity.ActivityCode = 1000;
                        $scope.Activities.push(obj);
                        var obj = { ActivityCode: 1001 };
                        $scope.Activities.push(obj);
                    }
                    else {

                        var obj = { ActivityCode: 1001 };
                        //$scope.Activity.ActivityCode = 1001;
                        $scope.Activities.push(obj);

                    }
                    $scope.oe.FreightForwarderName = '';
                    OrderEntryService.SaveOrderEntry(oe).then(function (d) {
                        $scope.showLoading = true;
                        $scope.oe.OrderNo = d.data.OrderNo;
                        $scope.oe.BranchID = d.data.BranchID;
                        
                        /*Activity Save*/
                        var arr = new Array();
                        angular.forEach($scope.Activities, function (obj, i) {
                            var obj = {
                                LinkDocumentNo: $scope.oe.OrderNo,
                                TransactionNo: $scope.oe.OrderNo,
                                ActivityCode: obj.ActivityCode
                            }
                            arr.push(obj);
                        });

                        OrderEntryService.SaveActivityStatus(arr).then(function (test) {
                            arr = new Array();
                            $scope.Activities = new Array();
                        });
                        /*Activity Save*/
                        
                        OrderEntryService.uploadFiles(data, $scope.oe.OrderNo, $scope.oe.BranchID).then(function (d) {
                            $scope.showLoading = false;
                            growlService.growl('Order Saved Successfully', 'success');
                            $scope.files = [];
                            var data = new FormData();

                            /* vijay */
                            var tBranchID = $scope.oe.BranchID;
                            if (angular.isUndefined($scope.oe.BranchID) || $scope.oe.BranchID == null || $scope.oe.BranchID == '') {
                                tBranchID = UtilityFunc.BranchID();
                            } 
                            /* vijay */

                            $state.go('orderentry', {
                                orderno: $scope.oe.OrderNo,
                                IsWeb: false,
                                branchId: tBranchID,
                                orderOwner: null
                            });
                            //$scope.orderNoSelected({ Value: $scope.oe.OrderNo });
                        }, function (err) { });
                    }, function (err) { });
                }
            } else {
                growlService.growl('please enter all mandatory fields', 'danger');

            }
        };

        $scope.SaveOrderEntryPartial = function (oe) {
            if ($scope.ValidatePartialSave() && $scope.ValidatePorts()) {
                var data = new FormData();
                for (var i in $scope.files) {
                    data.append("uploadedFile", $scope.files[i]);
                }
                $scope.oe.IsPartial = $scope.oe.IsPartial == false ? $scope.oe.IsPartial : true;
                if (($scope.oe.OrderNo == null || $scope.oe.OrderNo == undefined || $scope.oe.OrderNo == "") && $scope.oe.IsPartial) {
                    //$scope.Activity.ActivityCode = 1000;
                    var obj = { ActivityCode: 1000 };
                    $scope.Activities.push(obj);
                }

                OrderEntryService.SaveOrderEntry(oe).then(function (d) {
                    $scope.showLoading = true;
                    $scope.oe.OrderNo = d.data.OrderNo;
                    $scope.oe.BranchID = d.data.BranchID;

                    /*Activity Save*/
                    var arr = new Array();
                    angular.forEach($scope.Activities, function (obj, i) {
                        var obj = {
                            LinkDocumentNo: $scope.oe.OrderNo,
                            TransactionNo: $scope.oe.OrderNo,
                            ActivityCode: obj.ActivityCode
                        }
                        arr.push(obj);
                    });

                    OrderEntryService.SaveActivityStatus(arr).then(function (test) {
                        arr = new Array();
                        $scope.Activities = new Array();
                    });
                    /*Activity Save*/

                    OrderEntryService.uploadFiles(data, $scope.oe.OrderNo, $scope.oe.BranchID).then(function (d) {
                        $scope.showLoading = false;
                        growlService.growl('Order ' + $scope.oe.OrderNo + ' Saved Partially', 'success');
                        $scope.files = [];
                        var data = new FormData();

                        /* vijay */
                        var tBranchID = $scope.oe.BranchID;
                        if (angular.isUndefined($scope.oe.BranchID) || $scope.oe.BranchID == null || $scope.oe.BranchID == '') {
                            tBranchID = UtilityFunc.BranchID();
                        } 
                        /* vijay */

                        $state.go('orderentry', {
                            orderno: $scope.oe.OrderNo,
                            IsWeb: false,
                            branchId: tBranchID,
                            orderOwner: null
                        });

                        // $scope.orderNoSelected({ Value: $scope.oe.OrderNo });
                        //$state.go('orderentry', {
                        //    orderno: $scope.oe.OrderNo
                        //});
                    }, function (err) { });
                }, function (err) { });
            }
        };

        $scope.DeleteOrderEntry = function () {

            if ($window.confirm('Are you sure, you want to delete \'' + $scope.oe.OrderNo + '\' ?')) {
                OrderEntryService.deleteOrderEntry($scope.oe.OrderNo).then(function (d) {
                    if (d.data) {
                        growlService.growl('Order Deleted Successfully', 'success');

                        $state.go('orderentrylist', {});
                    }
                });
            }
        };



        $scope.PortOperatorResults = function (text) {
            var operatortype = 26220;
            return OrderEntryService.operatorList(operatortype, text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };
        $scope.TerminalOperaterSelected = function (item) {
            debugger;
            $scope.oe.PortOperator = item.Value;
        };

        $scope.back = function () {
            $state.go('orderentrylist', {});
        };

        $scope.clear = function () {

            $state.go('orderentry', { 'orderno': '' }, {reload:true});
        };


        /* dt pic config */
        $scope.popup = {
            OrderDate: false
        };

        $scope.open = function (type) {
            $scope.popup[type] = true;
        };
        /* dt pic */

        OrderEntryService.GetLookupData().then(function (d) {
            $scope.showLoading = false;
            $scope.lookupData = d.data;
        }, function (err) { });

        //OrderEntryService.GetTerminalList().then(function (d) {
        //    $scope.terminalList = d.data.terminalList;
        //}, function (err) { });

        $scope.mychecked = function (name, type, addresstype, ROCNo, addressID, name1, type1, addresstype1, ROCNo1, addressID1) {


            if (type == 'ConsigneeCode') {
                if ($scope.oe.ConsigneeChk) {
                    if ($scope.oe.CustomerCode != undefined && $scope.oe.ShipperCode != undefined && $scope.oe.CustomerCode != '' && $scope.oe.ShipperCode != '' && $scope.oe.CustomerCode == $scope.oe.ShipperCode) {
                        if (confirm("Are you sure?\nDo you want to clear the same information in Consignor section!")) {
                            $scope.isConsigneeChecked = true;
                            $scope.oe[name] = $scope.oe.CustomerName;
                            $scope.oe[type] = $scope.oe.CustomerCode;
                            $scope.oe[addresstype] = $scope.oe.CustomerAddress;
                            $scope.oe[ROCNo] = $scope.oe.CustomerROCNo;
                            $scope.oe[addressID] = $scope.oe.CustomerAddressID;

                            if ($scope.oe[name1] == $scope.oe.CustomerName && $scope.oe[addresstype1] == $scope.oe.CustomerAddress) {
                                $scope.oe[name1] = '';
                                $scope.oe[type1] = '';
                                $scope.oe[addresstype1] = '';
                                $scope.oe[ROCNo1] = '';
                                $scope.oe[addressID1] = '';
                            }
                        }
                    }
                    else {
                        $scope.isConsigneeChecked = true;
                        $scope.oe[name] = $scope.oe.CustomerName;
                        $scope.oe[type] = $scope.oe.CustomerCode;
                        $scope.oe[addresstype] = $scope.oe.CustomerAddress;
                        $scope.oe[ROCNo] = $scope.oe.CustomerROCNo;
                        $scope.oe[addressID] = $scope.oe.CustomerAddressID;

                        if ($scope.oe[name1] == $scope.oe.CustomerName && $scope.oe[addresstype1] == $scope.oe.CustomerAddress) {
                            $scope.oe[name1] = '';
                            $scope.oe[type1] = '';
                            $scope.oe[addresstype1] = '';
                            $scope.oe[ROCNo1] = '';
                            $scope.oe[addressID1] = '';
                        }
                    }
                }
                else {

                    $scope.isConsigneeChecked = false;
                    $scope.oe[name] = '';
                    $scope.oe[type] = '';
                    $scope.oe[addresstype] = '';
                    $scope.oe[ROCNo] = '';
                    $scope.oe[addressID] = '';

                }
            }
            else if (type == 'ShipperCode') {
                if ($scope.oe.ShipperChk) {
                    if ($scope.oe.CustomerCode != undefined && $scope.oe.ConsigneeCode != undefined && $scope.oe.CustomerCode != '' && $scope.oe.ConsigneeCode != '' && $scope.oe.CustomerCode == $scope.oe.ConsigneeCode) {
                        if (confirm("Are you sure?\nDo you want to clear the same information in Consignee section!")) {
                            //&& confirm("Are you sure?\nDo you want to clear the same information in Consignee section!")) {
                            $scope.isConsignorChecked = true;
                            $scope.oe[name] = $scope.oe.CustomerName;
                            $scope.oe[type] = $scope.oe.CustomerCode;
                            $scope.oe[addresstype] = $scope.oe.CustomerAddress;
                            $scope.oe[ROCNo] = $scope.oe.CustomerROCNo;
                            $scope.oe[addressID] = $scope.oe.CustomerAddressID;

                            if ($scope.oe[name1] == $scope.oe.CustomerName && $scope.oe[addresstype1] == $scope.oe.CustomerAddress) {
                                $scope.oe[name1] = '';
                                $scope.oe[type1] = '';
                                $scope.oe[addresstype1] = '';
                                $scope.oe[ROCNo1] = '';
                                $scope.oe[addressID1] = '';
                            }
                        }
                    }
                    else {
                        $scope.isConsignorChecked = true;
                        $scope.oe[name] = $scope.oe.CustomerName;
                        $scope.oe[type] = $scope.oe.CustomerCode;
                        $scope.oe[addresstype] = $scope.oe.CustomerAddress;
                        $scope.oe[ROCNo] = $scope.oe.CustomerROCNo;
                        $scope.oe[addressID] = $scope.oe.CustomerAddressID;

                        if ($scope.oe[name1] == $scope.oe.CustomerName && $scope.oe[addresstype1] == $scope.oe.CustomerAddress) {
                            $scope.oe[name1] = '';
                            $scope.oe[type1] = '';
                            $scope.oe[addresstype1] = '';
                            $scope.oe[ROCNo1] = '';
                            $scope.oe[addressID1] = '';
                        }
                    }
                }
                else {
                    $scope.isConsignorChecked = false;
                    $scope.oe[name] = '';
                    $scope.oe[type] = '';
                    $scope.oe[addresstype] = '';
                    $scope.oe[ROCNo] = '';
                    $scope.oe[addressID] = '';
                }
            }
        };

        $scope.GenericMerchantResults = function (text, filter, addresstype) {
            return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + text + '/' + filter).then(function (response) {

                if (response.data.length == 0)
                    $scope.oe[addresstype] = '';
                return limitToFilter(response.data, 15);
            });
        };

        $scope.OrderResults = function (text) {
            return OrderEntryService.SearchOrder(text).then(function (res) {
                return limitToFilter(res.data, 15);
            }, function (err) { });
        };

        $scope.ShipCallResults = function (text) {
            return VesselScheduleService.ShipCallNoSearch(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };
        $scope.ShipCallNoSelect = function (item) {
            $scope.k1.declarationShipment.VoyageNo = item.VoyageNoInWard;
            $scope.k1.declarationShipment.VesselID = item.VesselID;
            $scope.k1.declarationShipment.VesselName = item.VesselName;
            $scope.k1.declarationShipment.ETADate = item.ETA;
        };


        $scope.VoyageResults = function (text) {
            if ($scope.oe.JobType == 1060 || $scope.oe.JobType == 1061) {
                return VesselScheduleService.VoyageSearch(text, $scope.oe.JobType).then(function (d) {

                    return limitToFilter(d.data, 15);
                }, function (err) { });
            } else {
                return limitToFilter({}, 15);
            }

        };

        $scope.VoyageSelected = function (obj) {
            debugger;
            if ($scope.oe.JobType == 1060) {
                if (obj.ImpAvaliableDate != null || !angular.isUndefined(obj.ImpAvaliableDate)) {
                    $scope.oe.YardCutOffTime = moment(obj.ImpAvaliableDate);
                }
                else
                    $scope.oe.YardCutOffTime = undefined;

                // $scope.oe.YardCutOffTime = obj.ImpAvaliableDate;
                $scope.oe.Voyageno = obj.VoyageNoInWard;
            } else if ($scope.oe.JobType == 1061) {
                if (obj.ExpAvailableDate != null || !angular.isUndefined(obj.ExpAvailableDate)) {
                    $scope.oe.YardCutOffTime = moment(obj.ExpAvailableDate);
                }
                else
                    $scope.oe.YardCutOffTime = undefined;

                //$scope.oe.YardCutOffTime = obj.ExpAvailableDate;
                $scope.oe.Voyageno = obj.VoyageNoOutWard;
            }
            if (obj.ETA != null || !angular.isUndefined(obj.ETA)) {
                $scope.oe.ETA = moment(obj.ETA);
            }
            else
                $scope.oe.ETA = undefined;
            //$scope.oe.ETA = obj.ETA;
            if (obj.ETD != null || !angular.isUndefined(obj.ETD)) {
                $scope.oe.ETD = moment(obj.ETD);
            }
            else
                $scope.oe.ETD = undefined;

            // $scope.oe.ETD = obj.ETD;
            $scope.oe.VesselName = obj.VesselName;
            $scope.oe.SCNNo = obj.ShipCallNo;
            $scope.oe.VesselID = obj.VesselID;
            $scope.oe.CallSignNo = obj.CallSignNo;

        };

        //$scope.orderNoSelected = function (item) {
        //    $scope.showLoading = true;
        //    OrderEntryService.GetOrderEntryByNo(item.Value, $scope.branchID).then(function (d) {

        //        $scope.IsNew = false;
        //        $scope.IsClone = false;
        //        $scope.showLoading = false;
        //        $scope.oe = d.data.orderEntry;
        //        $scope.summary = d.data.declarationSummary;

        //        $scope.BindAddress(d.data, 'Customer');
        //        $scope.BindAddress(d.data, 'NotifyParty');
        //        $scope.BindAddress(d.data, 'Consignee');
        //        $scope.BindAddress(d.data, 'Shipper');
        //        $scope.BindAddress(d.data, 'FwdAgent');
        //        $scope.BindAddress(d.data, 'ShippingAgent');
        //        $scope.BindAddress(d.data, 'FreightForwarder');
        //        $scope.BindAddress(d.data, 'OverseasAgent');

        //        $scope.jobTypeChanged($scope.oe.JobType);
        //        $scope.orderCategoryChanged();


        //        ////$scope.tabs[6].visible = true;
        //        //$scope.tabs[7].visible = true;

        //        if (!angular.isUndefined($scope.oe)) {
        //            if ($scope.oe.ETA == null) {
        //                $scope.oe.ETA = undefined;
        //            }
        //            if ($scope.oe.ETD == null) {
        //                $scope.oe.ETD = undefined;
        //            }
        //            if ($scope.oe.YardCutOffTime == null) {
        //                $scope.oe.YardCutOffTime = undefined;
        //            }

        //            if ($scope.oe.SalesOrderDate == null) {
        //                $scope.oe.SalesOrderDate = undefined;
        //            }

        //            $scope.ngTblContainer();
        //            $scope.ngTblCargo();
        //        }
        //    }, function (err) { });
        //};

        $scope.clearAddress = function () {
            debugger;
            if ($scope.oe.FreightForwarderName == null) {
                delete $scope.oe.FregihtForwarderCode;
                $scope.oe.FreightForwarderAddress = "";
            }
            if ($scope.oe.OverseasAgentName == null) {
                delete $scope.oe.OverseasAgentCode;
                $scope.oe.OverseasAgentAddress = "";
            }
            if ($scope.oe.ShippingAgentName == null) {
                delete $scope.oe.ShippingAgent;
                $scope.oe.ShippingAgentAddress = "";
            }
            if ($scope.oe.ForwardingAgentName == null) {
                delete $scope.oe.FwdAgent;
                $scope.oe.FwdAgentAddress = "";
            }
            if ($scope.oe.ShipperName == null) {
                delete $scope.oe.ShipperCode;
                $scope.oe.ShipperAddress = "";
            }
            if ($scope.oe.ConsigneeName == null) {
                delete $scope.oe.ConsigneeCode;
                $scope.oe.ConsigneeAddress = "";
            }
            if ($scope.oe.NotifyPartyName == null) {
                delete $scope.oe.NotifyParty;
                $scope.oe.NotifyPartyAddress = "";
            }
            if ($scope.oe.CustomerName == null) {
                delete $scope.oe.CustomerCode;
                $scope.oe.CustomerAddress = "";
            }
        }


        $scope.CustomerSelected = function (item, type, addresstype, ROCNo, addressID) {
            $scope.oe.addAddress = true;
            $scope.showLoading = true;
            $scope.oe[type] = item.Value;
            var html = '';
            $scope.oe[addresstype] = '';
            $scope.oe[ROCNo] = item.RegNo;
            if (type == 'FwdAgent') {
                $scope.isForwardingAgent = true;
            }
            if (type == 'ShippingAgent') {
                $scope.isShippingAgent = true;
            }
            if (type == 'OriginAgent') {
                $scope.isOriginAgent = true;
            }

            if (type == 'ConsigneeCode') {

                if ($scope.oe[type] == $scope.oe.ShipperCode) {
                    if (confirm("Are you sure?\nDo you want to clear the same information in Consignor section!")) {
                        $scope.oe.addAddress = true;
                        $scope.oe.ShipperCode = '';
                        $scope.oe.ShipperAddress = '';
                        $scope.oe.ShipperROCNo = '';
                        $scope.oe.ShipperAddressID = '';
                        $scope.oe.ShipperName = '';
                        $scope.oe.ConsigneeChk = ($scope.oe[type] == $scope.oe.CustomerCode ? true : false);
                        $scope.oe.ShipperChk = false;
                        $scope.isConsigneeChecked = true;
                        $scope.isConsignorChecked = false;
                    }
                    else {
                        $scope.oe.addAddress = false;
                        $scope.oe[type] = '';
                        $scope.oe[ROCNo] = '';
                        $scope.oe.ConsigneeName = '';
                    }

                }
                else {
                    //$scope.oe.ConsigneeChk = ($scope.oe[type] == $scope.oe.CustomerCode ? true : false);
                    //$scope.oe.ShipperChk = false;
                    //$scope.isConsigneeChecked = true;
                    //$scope.isConsignorChecked = false;
                }
            }

            if (type == 'ShipperCode') {
                if ($scope.oe[type] == $scope.oe.ConsigneeCode) {
                    if (confirm("Are you sure?\nDo you want to clear the same information in Consignee section!")) {
                        $scope.oe.addAddress = true;
                        $scope.oe.ConsigneeCode = '';
                        $scope.oe.ConsigneeAddress = '';
                        $scope.oe.ConsigneeROCNo = '';
                        $scope.oe.ConsigneeAddressID = '';
                        $scope.oe.ConsigneeName = '';
                        $scope.oe.ShipperChk = ($scope.oe[type] == $scope.oe.CustomerCode ? true : false);
                        $scope.oe.ConsigneeChk = false;
                        $scope.isConsignorChecked = true;
                        $scope.isConsigneeChecked = false;
                    }
                    else {
                        $scope.oe.addAddress = false;
                        $scope.oe[type] = '';
                        $scope.oe[ROCNo] = '';
                        $scope.oe.ShipperName = '';
                    }

                }
                else {
                    //$scope.oe.ShipperChk = ($scope.oe[type] == $scope.oe.CustomerCode ? true : false);
                    //$scope.oe.ConsigneeChk = false;
                    //$scope.isConsignorChecked = true;
                    //$scope.isConsigneeChecked = false;
                }
            }
            if ($scope.oe.addAddress) {
                AddressService.GetAddress(item.Value).then(function (d) {
                    if (d.data != null) {

                        $scope.oe[addressID] = d.data.AddressId;
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

                    $scope.oe[addresstype] = html;
                    if (type == 'CustomerCode') {
                        $scope.isConsignorChecked = false;
                        $scope.isConsigneeChecked = false;
                        if ($scope.oe.ConsigneeChk) {
                            $scope.isConsigneeChecked = true;
                            $scope.oe.ConsigneeName = $scope.oe.CustomerName;
                            $scope.oe.ConsigneeCode = $scope.oe.CustomerCode;
                            $scope.oe.ConsigneeAddress = html;
                            $scope.oe.ConsigneeROCNo = $scope.oe.CustomerROCNo;
                            $scope.oe.ConsigneeAddressID = $scope.oe.CustomerAddressID;

                            if ($scope.oe.ShipperName == $scope.oe.CustomerName && $scope.oe.ShipperAddress == $scope.oe.CustomerAddress) {
                                $scope.oe.ShipperCode = '';
                                $scope.oe.ShipperAddress = '';
                                $scope.oe.ShipperROCNo = '';
                                $scope.oe.ShipperAddressID = '';
                                $scope.oe.ShipperName = '';
                            }
                        }
                        if ($scope.oe.ShipperChk) {

                            $scope.isConsignorChecked = true;
                            $scope.oe.ShipperName = $scope.oe.CustomerName;
                            $scope.oe.ShipperCode = $scope.oe.CustomerCode;
                            $scope.oe.ShipperAddress = html;
                            $scope.oe.ShipperROCNo = $scope.oe.CustomerROCNo;
                            $scope.oe.ShipperAddressID = $scope.oe.CustomerAddressID;

                            if ($scope.oe.ConsigneeName == $scope.oe.CustomerName && $scope.oe.ConsigneeAddress == $scope.oe.CustomerAddress) {

                                $scope.oe.ConsigneeCode = '';
                                $scope.oe.ConsigneeAddress = '';
                                $scope.oe.ConsigneeROCNo = '';
                                $scope.oe.ConsigneeAddressID = '';
                                $scope.oe.ConsigneeName = '';
                            }
                        }
                    }
                    $scope.showLoading = false;
                }, function (err) { });
            }

            /* vijay */            
            if (type == 'CustomerCode') {
                $scope.SetFwdAgentRequired(item.Value);
            }
           /* vijay */

        };

        $scope.portResults = function (text) {
            return PortAreaService.PortAutoComplete(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.PortSelected = function (item, type) {
            $scope.oe[type] = item.PortCode;
        };

        $scope.VesselNameResults = function (text) {
            return VesselScheduleService.VesselNameResults(text).then(function (d) {

                return limitToFilter(d.data, 15);
            }, function (err) { });
        };


        //test
        $scope.BLText = 'B/L';
        $scope.AgentText = 'ORIGIN';

        $scope.jobTypeChanged = function (jobType) {
            if (!angular.isUndefined(jobType)) {
                $scope.showLoading = true;
                $scope.BLText = ($scope.oe.JobType == 1061 ? 'Booking' : 'B/L');
                $scope.AgentText = ($scope.oe.JobType == 1061 ? 'DESTINATION' : 'ORIGIN');
                JobCategoryService.getJobCategoryListByJobType(jobType, $scope.oe.ShipmentType).then(function (d) {
                    $scope.showLoading = false;
                    if (angular.isUndefined($scope.lookupData))
                        $scope.lookupData = {};

                    $scope.lookupData.OrderCategoryList = d.data;

                }, function (err) { })
            }
        };
        $scope.isEnableTransport = false;
        $scope.enableCon = function () {

            if ($scope.oe.JobType == 1061 && $scope.oe.ShipmentType == 26530 && $scope.oe.OrderCategory == 'AE-FW') {
                $scope.isEnableTransport = true;
            }
            else if ($scope.oe.JobType == 1061 && $scope.oe.ShipmentType == 26530 && $scope.oe.OrderCategory == 'SEA-EXP OE') {
                $scope.isEnableTransport = true;
            }
            else if ($scope.oe.JobType == 1060 && $scope.oe.ShipmentType == 26530 && $scope.oe.OrderCategory == 'SEA-IMP-OE') {
                $scope.isEnableTransport = true;
            }
            else
                $scope.isEnableTransport = false;
        }

        $scope.changeShipmentType = function (ShipmentMode) {

            if (ShipmentMode == 26533 || ShipmentMode == 26531) {
                $scope.isConventionalCargo = true;
            }
            else
                $scope.isConventionalCargo = false;
        };
        $scope.transportTypeChanged = function () {
            if ($scope.oe.TransportType == 1021) {
                $scope.pallet = false;
            }
            else
                $scope.pallet = true;

            if ($scope.oe.TransportType != 1020 && $scope.oe.TransportType != 1024 && $scope.oe.TransportType != 1025) {
                $scope.tabs[2].visible = true;
                $scope.showCoLoader = false;
            } else {
                $scope.tabs[2].visible = false;
                $scope.showCoLoader = true;
            }
        };

        $scope.oe.TransportType = 1021;
        $scope.transportTypeChanged();

        $scope.TempFreightMode = -1;
        /*
        1030 - CONTAINERIZED
        1031 - BREAKBULK
        */

        //FCL(LOCAL) - IMPORT - AIR IMPORT FORWARDINF (AI-FW)
        var jobCategoryMovementsArr = new Array();
        $scope.orderCategoryChanged = function () {
            $scope.showLoading = true;
            JobCategoryService.getJobCategoryItem($scope.oe.OrderCategory).then(function (d) {

                $scope.tabs[2].visible = false;
                $scope.tabs[1].visible = false;
                $scope.TempFreightMode = d.data.jobCategory.FreightMode;
                if (d.data.jobCategory.FreightMode == 1030 && $scope.oe.TransportType != 1020) {
                    $scope.tabs[2].visible = true;
                }
                else if (d.data.jobCategory.FreightMode == 1031) {
                    $scope.isContainerized = false;
                    $scope.tabs[1].visible = true;
                }


                $scope.oe.IsCFS = d.data.jobCategory.IsCFS;
                $scope.oe.IsDepot = d.data.jobCategory.IsDepot;
                $scope.oe.IsForwarding = d.data.jobCategory.IsForwarding;
                $scope.oe.IsFreight = d.data.jobCategory.IsFreight;
                $scope.oe.IsHaulage = d.data.jobCategory.IsHaulage;
                $scope.oe.IsRail = d.data.jobCategory.IsRail;
                $scope.oe.IsTransport = d.data.jobCategory.IsTransport;
                $scope.oe.IsWareHouse = d.data.jobCategory.IsWareHouse;


                jobCategoryMovementsArr = d.data.jobCategory.JobCategoryMovements;

                /**/
                $scope.enableCon();

            }, function (err) { })
        };

        $scope.generate = function (isMarks, isCargo) {
            /*
            if (isMarks) {
                var marksNumbers = '';
                //marksNumbers += $scope.oe.ConsigneeName + '<br/>';
                //marksNumbers += $scope.oe.CustomerRef + '<br/>';

                angular.forEach($scope.oe.orderContainerList, function (item, index) {
                    marksNumbers += item.ContainerNo +  '<br/>'
                });

                $scope.oe.orderText.MarksNumbers = marksNumbers.toUpperCase();
            }

            if (isCargo) {
                var cargoDesc = '';
                //cargoDesc += 'SAID TO CONTAIN:-' + '<br/>';

                angular.forEach($scope.oe.orderCargoList, function (item, index) {
                    //cargoDesc += '   ' + item.Qty + ' ' + item.UOMDescription + ' ' + item.ProductDescription + '<br/>';
                    if (!angular.isUndefined(item.ItemDescription)) {
                        cargoDesc += item.ItemDescription + '<br/>';
                    }
                });
                $scope.oe.orderText.CargoDescription = cargoDesc.toUpperCase();
            }
            */
        };

        $scope.SendToAgent = function () {
            $scope.showLoading = true;
            OrderEntryService.SendToAgent($scope.oe.BranchID, $scope.oe.OrderNo).then(function (d) {
                $scope.showLoading = false;
                $scope.oe.WebOrderStatus = 4301;
            }, function (err) { });
        };

        $scope.ApproveWebOrder = function (flag) {
            OrderEntryService.ApproveWebOrder({
                branchID: $scope.oe.BranchID,
                orderNo: $scope.oe.OrderNo,
                isApproved: flag,
                remarks: ''
            }).then(function (d) {

            }, function (err) { });
        };

        $scope.GenerateDeclaration = function () {
            OrderEntryService.GenerateDeclaration($scope.oe).then(function (d) {
                if (d.data == 0) {
                    // growlService.growl('The Order Entry Job ' + $scope.oe.OrderNo + ' could not be forwarded to the nominated Forwarding Agent ' + $scope.oe.ForwardingAgentName + ' because the company is not a registered user of 1Trade Exchange', 'warning', { ttl: 10000 });
                    $.growl({
                        //icon: icon,
                        title: '',
                        message: 'The Order Entry Job ' + $scope.oe.OrderNo + ' could not be forwarded to the nominated Forwarding Agent ' + $scope.oe.ForwardingAgentName + ' because the company is not a registered user of 1Trade Exchange',
                        url: ''
                    }, {
                            element: 'body',
                            type: 'warning',
                            allow_dismiss: true,
                            //placement: {
                            //    from: from,
                            //    align: align
                            //},
                            offset: {
                                x: 20,
                                y: 85
                            },
                            spacing: 10,
                            z_index: 1031,
                            delay: 2500,
                            timer: 10000,
                            url_target: '_blank',
                            mouse_over: false,
                            //animate: {
                            //    enter: animIn,
                            //    exit: animOut
                            //},
                            icon_type: 'class',
                            template: '<div data-growl="container" class="alert" role="alert">' +
                            '<button type="button" class="close" data-growl="dismiss">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '<span class="sr-only">Close</span>' +
                            '</button>' +
                            '<span data-growl="icon"></span>' +
                            '<span data-growl="title"></span>' +
                            '<span data-growl="message"></span>' +
                            '<a href="#" data-growl="url"></a>' +
                            '</div>'
                        });
                    //$timeout(function () { }, 10000);
                }
                else {
                    growlService.growl('Declaration ' + d.data + ' Generated', 'success');
                }
                //growl.success('Declaration ' + d.data + ' Generated', {});
            }, function (err) { });
        };

        $scope.GenerateBookingEntry = function () {
            OrderEntryService.GenerateBookingEntry($scope.oe).then(function (d) {
                growlService.growl('Booking Posted To Port ' + d.data + '  Successfully.', 'success');
                //growl.success('Booking Posted To Port Successfully.', {});
            }, function (err) { });
        };

        var orderno = $stateParams.orderno;
        var IsWeb = $stateParams.IsWeb;
        var _branchId = $stateParams.branchId;
        var _orderOwner = $stateParams.orderOwner;
        $scope.IsWebOrder = false;
        if (IsWeb == 'true') {
            $scope.IsWebOrder = true;
            $scope.OrderOwner = _orderOwner;
        } else
            $scope.IsWebOrder = false;

        if (!angular.isUndefined(orderno)) {
            if (orderno != 'NEW' && orderno != '') {
                $scope.showLoading = true;
                OrderEntryService.GetOrderEntryByNo(orderno, _branchId).then(function (d) {
                    $scope.showLoading = false;
                    $scope.activityList = d.data.activityList;
                    $scope.oe = d.data.orderEntry;
                    debugger;
                    $scope.oeOld = angular.copy(d.data.orderEntry);
                    $scope.summary = d.data.declarationSummary;
                    if ($scope.summary == null) {
                        $scope.showDeclaration = false;
                    }
                    else
                        $scope.showDeclaration = true;
                    $scope.oeCntrl.dashBoardData = {
                        OrderBranchID: $scope.oe.BranchID,
                        OrderNo: $scope.oe.OrderNo,
                        TransactionBranchID: $scope.oe.DeclarationBranchID,
                        TransactionNo: $scope.oe.DeclarationNo,
                        PortBookingBranchID: $scope.oe.PortBookingBranchID,
                        PortBookingNo: $scope.oe.PortBookingNo
                    };
                    // $scope.val = $scope.summary.DeclarationNo;


                    $scope.BindAddress(d.data, 'Customer');
                    $scope.BindAddress(d.data, 'NotifyParty');
                    $scope.BindAddress(d.data, 'Consignee');
                    $scope.BindAddress(d.data, 'Shipper');
                    $scope.BindAddress(d.data, 'FwdAgent');
                    $scope.BindAddress(d.data, 'ShippingAgent');
                    $scope.BindAddress(d.data, 'FreightForwarder');
                    $scope.BindAddress(d.data, 'OverseasAgent');

                    $scope.changeShipmentType($scope.oe.ShipmentType);
                    OrderEntryService.GetOrderEntryDocsNo(orderno).then(function (d) {
                        $scope.docList = d.data;
                    });

                    $scope.GetRotDetails($scope.oe.OrderNo);

                    OrderEntryService.getUUIDFromInsuranceHeader(orderno).then(function (d) {
                        $scope.UUIDInfo = d.data.uuidInfo;
                        $scope.insuranceStatusList = d.data.insuranceStatusList;
                        $scope.isDownloadToken = d.data.isDownloadToken;
                        $scope.downloadUrl = 'https://52.163.52.156/webapi/v1/webservices/insured/downloadCertificate/@/' + d.data.downloadToken;
                        if ($scope.insuranceStatusList.length > 0)
                            $scope.tabs[6].visible = true;

                        if (!$scope.isDownloadToken) {
                            OrderEntryService.CheckNextInsuranceResponse(orderno).then(function (res) {
                                $scope.insuranceStatusList = res.data.insuranceStatusList;
                                $scope.isDownloadToken = res.data.isDownloadToken;

                                if ($scope.insuranceStatusList.length > 0)
                                    $scope.tabs[6].visible = true;
                            }, function (err) { });
                        }

                    });

                    $scope.refreshInsuranceStatus = function () {
                        OrderEntryService.CheckNextInsuranceResponse($scope.oe.OrderNo).then(function (res) {

                            $scope.insuranceStatusList = res.data.insuranceStatusList;
                            $scope.isDownloadToken = res.data.isDownloadToken;
                            $scope.downloadUrl = 'https://52.163.52.156/webapi/v1/webservices/insured/downloadCertificate/@/' + res.data.downloadToken;
                        }, function (err) { });
                    };

                    $scope.jobTypeChanged($scope.oe.JobType);
                    $scope.orderCategoryChanged();


                    if (!angular.isUndefined($scope.oe) && $scope.oe != null) {
                        if ($scope.oe.OrderDate == null || angular.isUndefined($scope.oe.OrderDate)) {
                            $scope.oe.OrderDate = undefined;
                        }
                        else
                            $scope.oe.OrderDate = moment($scope.oe.OrderDate);

                        if ($scope.oe.ETA == null || angular.isUndefined($scope.oe.ETA)) {
                            $scope.oe.ETA = undefined;
                        }
                        else
                            $scope.oe.ETA = moment($scope.oe.ETA);

                        if ($scope.oe.ETD == null || angular.isUndefined($scope.oe.ETD)) {
                            $scope.oe.ETD = undefined;
                        }
                        else
                            $scope.oe.ETD = moment($scope.oe.ETD);

                        if ($scope.oe.YardCutOffTime == null || angular.isUndefined($scope.oe.YardCutOffTime)) {
                            $scope.oe.YardCutOffTime = undefined;
                        }
                        else
                            $scope.oe.YardCutOffTime = moment($scope.oe.YardCutOffTime);

                        if ($scope.oe.InvoiceDate == null || angular.isUndefined($scope.oe.InvoiceDate)) {
                            $scope.oe.InvoiceDate = undefined;
                        }
                        else
                            $scope.oe.InvoiceDate = moment($scope.oe.InvoiceDate);

                        if ($scope.oe.SalesOrderDate == null || angular.isUndefined($scope.oe.SalesOrderDate)) {
                            $scope.oe.SalesOrderDate = undefined;
                        }
                        else
                            $scope.oe.SalesOrderDate = moment($scope.oe.SalesOrderDate);
                    }

                    $scope.transportTypeChanged();
                    if ($scope.oe.CustomerName != null && $scope.oe.CustomerName != '') {
                        $scope.isConsignorChecked = false;
                        $scope.isConsigneeChecked = false;
                    }
                    $scope.GetDeclarationStatus($scope.oe.OrderNo);
                    $scope.GetDeclarationVisibility($scope.oe.OrderNo, $scope.oe.JobType);
                    $scope.GetApproveOrderVisibility($scope.oe.BranchID, $scope.oe.OrderNo);
                    $scope.ngTblContainer();
                    $scope.ngTblCargo();
                    $scope.ngTblTransportInfo();
                }, function (err) { });
            }
            else {
                $scope.IsNew = true;
                $scope.IsClone = true;
            }
        }
        else {
            $scope.IsNew = true;
            $scope.IsClone = true;
        }



        $scope.BindAddress = function (item, addresstype) {
            $scope.addressId = null;
            if (addresstype == "Customer" && item.orderEntry.CustomerCode != 0) {
                $scope.addressId = item.orderEntry.CustomerCode;
                /* vijay */
                $scope.SetFwdAgentRequired(item.orderEntry.CustomerCode);
               /*  vijay */
            }
            if (addresstype == "NotifyParty" && item.orderEntry.NotifyParty != 0) {
                $scope.addressId = item.orderEntry.NotifyParty;
            }
            if (addresstype == "Consignee" && item.orderEntry.ConsigneeCode != 0) {
                $scope.addressId = item.orderEntry.ConsigneeCode;
            }
            if (addresstype == "Shipper" && item.orderEntry.ShipperCode != 0) {
                $scope.addressId = item.orderEntry.ShipperCode;
            }
            if (addresstype == "ShippingAgent" && item.orderEntry.ShippingAgent != 0) {
                $scope.addressId = item.orderEntry.ShippingAgent;
            }

            if (addresstype == "FwdAgent" && item.orderEntry.FwdAgent != 0) {
                $scope.addressId = item.orderEntry.FwdAgent;
            }
            if (addresstype == "FreightForwarder" && item.orderEntry.FregihtForwarderCode != 0) {
                $scope.addressId = item.orderEntry.FregihtForwarderCode;
            }
            if (addresstype == "OverseasAgent" && item.orderEntry.OverseasAgentCode != 0) {
                $scope.addressId = item.orderEntry.OverseasAgentCode;
            }
            if ($scope.addressId != null) {
                AddressService.GetAddress($scope.addressId).then(function (d) {

                    $scope.showLoading = true;
                    var html = '';
                    $scope.oe[addresstype + 'Address'] = '';

                    if (item != null) {
                        $scope.oe[addresstype + 'AddressID'] = item.orderEntry[addresstype + 'AddressID'];
                        if (addresstype == 'FwdAgent') {
                            $scope.isForwardingAgent = true;
                        }
                        if (addresstype == 'ShippingAgent') {
                            $scope.isShippingAgent = true;
                        }
                        if (addresstype == 'OriginAgent') {
                            $scope.isOriginAgent = true;
                        }

                        if (d.data != null && !angular.isUndefined(d.data)) {
                            if (d.data.Address1 != null && !angular.isUndefined(d.data.Address1))
                                html += d.data.Address1 + '<br/>';
                            if (d.data.Address2 != null && !angular.isUndefined(d.data.Address2))
                                html += d.data.Address2 + '<br/>';
                            if (d.data.Address3 != null && !angular.isUndefined(d.data.Address3))
                                html += d.data.Address3 + '<br/>';
                            if (d.data.City != null && !angular.isUndefined(d.data.City))
                                html += d.data.City + '<br/>';
                            if (d.data.State != null && !angular.isUndefined(d.data.State))
                                html += d.data.State + '<br/>';

                            if (d.data.ZipCode != null && !angular.isUndefined(d.data.ZipCode))
                                html += d.data.ZipCode;
                        }

                    }
                    $scope.oe[addresstype + 'Address'] = html.toUpperCase();


                }, function (err) {

                });
            }


        };
        $scope.CalulateLocalAmount = function () {
            var invoiceValue = parseFloat(angular.isUndefined($scope.oe.InvoiceAmount) ? 0 : $scope.oe.InvoiceAmount);
            var importRate = $filter('filter')($scope.lookupData.currencyList, { Value: $scope.oe.InvoiceCurrency })[0].ImportRate;
            $scope.oe.LocalAmount = (invoiceValue * importRate).toFixed(4);
            $scope.oe.ExchangeRate = importRate.toFixed(4);
        };
        $scope.CalulateLocalAmountByExchangeRate = function () {
            var invoiceAmount = parseFloat($scope.oe.InvoiceAmount);
            var exchangeRate = parseFloat($scope.oe.ExchangeRate);
            if (!isNaN(invoiceAmount) && !isNaN(exchangeRate)) {
                $scope.oe.LocalAmount = (invoiceAmount * exchangeRate).toFixed(4);
            }
            else {
                $scope.oe.LocalAmount = 0;
            }
        };

        $scope.files = [];
        $scope.getFileDetails = function (e) {
            if ($scope.fileValidate(e.files)) {
                $scope.$apply(function () {

                    for (var i = 0; i < e.files.length; i++) {
                        $scope.files.push(e.files[i])
                    }
                });
                if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                    var flag = false;
                    angular.forEach($scope.Activities, function (item, index) {
                        if (item.ActivityCode == 1013) {
                            flag = true;
                        }
                    });
                    if (flag == false) {
                        var obj = { ActivityCode: 1013 };
                        $scope.Activities.push(obj);
                    }
                }
            }
        };

        $scope.fileValidate = function (files) {
            var fileSize = 1024 * 1024 * 5;
            var isValidFileType = true;
            var isValidFileSize = true;
            var fileTotalSize = 0;

            for (var i = 0; i < files.length; i++) {
                $scope.theFile = files[i];
                var filename = $scope.theFile.name;
                var index = filename.lastIndexOf(".");
                var strsubstring = filename.substring(index, filename.length);
                if (strsubstring == '.pdf' || strsubstring == '.jpg' || strsubstring == '.jpeg' || strsubstring == '.png' || strsubstring == '.tif') {
                    isValidFileType = true;
                }
                else {
                    isValidFileType = false;
                }
                if (files[i].size <= fileSize) {
                    isValidFileSize = true;
                }
                else {
                    isValidFileSize = false;
                }
            }

            if (!isValidFileType) {
                growlService.growl('Please upload valid file type.', 'danger');
                return false
            }
            else if (!isValidFileSize) {
                growlService.growl('File size must be not more that 5 MB.', 'danger');
                return false;
            }
            return true;

        };

        $scope.DeleteDocument = function (index) {
            $scope.files.splice(index, 1);

        };

        $scope.DeleteImage = function (branchID, orderNo, itemNo) {
            OrderEntryService.DeleteImage(branchID, orderNo, itemNo).then(function (d) {
                OrderEntryService.GetOrderEntryDocsNo(orderNo).then(function (d) {
                    $scope.docList = d.data;
                });
            }, function (err) { });
            if ($scope.oe.OrderNo != null && $scope.oe.OrderNo != undefined && $scope.oe.OrderNo != "") {

                var flag = false;
                angular.forEach($scope.Activities, function (item, index) {
                    if (item.ActivityCode == 1014) {
                        flag = true;
                    }
                });
                if (flag == false) {
                    var obj = { ActivityCode: 1014 };
                    $scope.Activities.push(obj);
                }
            }
        };


        $scope.validateRecord = function (value, title) {

            $scope.oeCntrl.isOpenMerchantPPCustomer = false;
            $scope.oeCntrl.isOpenMerchantPPNotifyParty = false;
            $scope.oeCntrl.isOpenMerchantPPConsignee = false;
            $scope.oeCntrl.isOpenMerchantPPConsignor = false;
            $scope.mp.IsBillingCustomer = false;
            $scope.mp.IsShipper = false;
            $scope.mp.IsConsignee = false;

            if (title == 'CUSTOMER') {
                $scope.oeCntrl.isOpenMerchantPPCustomer = value;
                $scope.mp.IsBillingCustomer = true;
                $scope.mp.IsShipper = true;
                $scope.mp.IsConsignee = true;
            }
            else if (title == 'NOTIFY PARTY') {
                $scope.oeCntrl.isOpenMerchantPPNotifyParty = value;
                $scope.mp.IsBillingCustomer = true;
            }
            else if (title == 'CONSIGNEE') {
                $scope.oeCntrl.isOpenMerchantPPConsignee = value;
                $scope.mp.IsConsignee = true;
            }
            else if (title == 'CONSIGNOR') {
                $scope.oeCntrl.isOpenMerchantPPConsignor = value;
                $scope.mp.IsShipper = true;
            }
            $scope.oeCntrl.modaltitle = 'NEW ' + title;
        };

        $scope.countryResults = function (text) {
            return CountryService.SearchCountries(text).then(function (d) {
                return limitToFilter(d.data, 15);
            }, function (err) { });
        };

        $scope.countrySelect = function (item) {
            $scope.mp.address.CountryCode = item.Value;
        };

        $scope.isFrmMerchant = false;
        $scope.$watch('oeCntrl.frmMerchant.$valid', function (isValid) {
            $scope.isFrmMerchant = isValid;
        });

        $scope.mp = {};
        $scope.SaveMerchant = function (mp) {
            if ($scope.isFrmMerchant) {
                $scope.mp.AddressList = new Array();
                if (!angular.isUndefined(mp.address))
                    $scope.mp.AddressList.push(mp.address);

                var fResults = $scope.fResults;
                var yResults = $scope.yResults;
                var tResults = $scope.tResults;

                $scope.mp.MerchantRelationList = new Array();
                if (!angular.isUndefined(fResults)) {
                    for (var i = 0; i < fResults.length; i++) {
                        var obj = {
                            RelatedMerchantCode: fResults[i].Value,
                            RelationshipType: fResults[i].RelationshipType,

                        };

                        $scope.mp.MerchantRelationList.push(obj);
                    }
                }

                if (!angular.isUndefined(yResults)) {
                    for (var i = 0; i < yResults.length; i++) {
                        var obj = {
                            RelatedMerchantCode: yResults[i].Value,
                            RelationshipType: yResults[i].RelationshipType
                        };

                        $scope.mp.MerchantRelationList.push(obj);
                    }
                }

                if (!angular.isUndefined(tResults)) {
                    for (var i = 0; i < tResults.length; i++) {
                        var obj = {
                            RelatedMerchantCode: tResults[i].Value,
                            RelationshipType: tResults[i].RelationshipType
                        };

                        $scope.mp.MerchantRelationList.push(obj);
                    }
                }

                MerchantProfileService.SaveMerchantProfile(mp).then(function (d) {
                    $scope.showLoading = false;
                    if (d.data) {
                        $scope.mp = {};

                        $scope.oeCntrl.isOpenMerchantPPCustomer = false;
                        $scope.oeCntrl.isOpenMerchantPPNotifyParty = false;
                        $scope.oeCntrl.isOpenMerchantPPConsignee = false;
                        $scope.oeCntrl.isOpenMerchantPPConsignor = false;
                        growlService.growl(d.data, 'success');

                    }
                }, function (err) {
                    growlService.growl(err.statusText, 'danger');

                });


            } else {
                growlService.growl('please entry all mandatory fields.', 'danger');

            }
        };

        $scope.IsCloneBtnDisabled = false;
        $scope.CloneOrderEntry = function (BranchID, orderNo) {
            $scope.IsCloneBtnDisabled = true;
            $scope.isContainerChanged = false;
            $scope.showLoading = true;
            OrderEntryService.CloneOrderEntry(BranchID, orderNo).then(function (d) {
                $scope.IsClone = true;
                $scope.IsNew = true;
                $scope.tabs[6].visible = false;
                $scope.showLoading = false;
                $scope.oe = d.data.orderEntry;

                if (!angular.isUndefined($scope.oe.orderTruckMovementList) && $scope.oe.orderTruckMovementList.length > 0) {
                    $scope.SelectedContainerIndex = 0;
                    var containerKey = $scope.oe.orderTruckMovementList[0].ContainerKey;

                    jobCategoryMovementsArr = $scope.oe.orderTruckMovementList;
                    $scope.oe.selectedConMovements = $filter('filter')($scope.oe.orderTruckMovementList, { ContainerKey: containerKey });
                }

                //$scope.oe.orderContainerList = new Array();
                $scope.BindAddress(d.data, 'Customer');
                $scope.BindAddress(d.data, 'NotifyParty');
                $scope.BindAddress(d.data, 'Consignee');
                $scope.BindAddress(d.data, 'Shipper');
                $scope.BindAddress(d.data, 'FwdAgent');
                $scope.BindAddress(d.data, 'ShippingAgent');
                $scope.BindAddress(d.data, 'FreightForwarder');
                $scope.BindAddress(d.data, 'OverseasAgent');

                //console.log(JSON.stringify(d.data));
                $scope.jobTypeChanged($scope.oe.JobType);
                $scope.orderCategoryChanged();

                if (!angular.isUndefined($scope.oe)) {
                    if ($scope.oe.ETA == null) {
                        $scope.oe.ETA = undefined;
                    }
                    if ($scope.oe.ETD == null) {
                        $scope.oe.ETD = undefined;
                    }
                    if ($scope.oe.YardCutOffTime == null) {
                        $scope.oe.YardCutOffTime = undefined;
                    }

                    if ($scope.oe.SalesOrderDate == null) {
                        $scope.oe.SalesOrderDate = undefined;
                    }
                }
                $scope.declarationOrderStatus = null;
                $scope.oeCntrl.dashBoardData = null;
                $scope.transportTypeChanged();
                $scope.oe.IsPartial = true;
                $scope.UUIDInfo = null;
                $scope.ngTblContainer();

            }, function (err) { });
        };

        $scope.GetInsurance = function () {
            OrderEntryService.GetInsuranceCertificate().then(function (d) {
            }, function (err) {
            });
        }
        //OrderEntryService.GetContainerLookupData($scope.con.Size).then(function (d) {
        //    $scope.showLoading = false;
        //    $scope.ContainerlookupData = d.data;
        //}, function (err) { });


        /* excel import data for container start */
        //ref https://aspdotnetcodehelp.wordpress.com/2016/08/13/how-to-read-excel-files-in-javascriptjquery-and-convert-the-value-to-json/#comments
        $scope.ContainerFileUpload = function (e) {
            if (angular.isUndefined($scope.oe.orderContainerList))
                $scope.oe.orderContainerList = new Array();
            var file = document.getElementById('containerFile').files[0];
            debugger;
            UtilityFunc.GetExcelData(file, '1TradeOrderContainer').then(function (d) {
                if (d.length == 0) {
                    growlService.growl('Excel file Upload failed', 'danger');
                } else {
                    angular.forEach(d, function (item, index) {

                        debugger;
                        //  var grade = $filter('filter')($scope.lookupData.conGradeTypeList, { Desc: item.ContainerGrade })[0].Value;
                        var SOC = !angular.isUndefined(item.SOCType) ? item.SOCType.toUpperCase() == 'YES' ? true : false : false;

                        var obj = {
                            ContainerNo: item.ContainerNo,
                            SealNo: item.SealNo,
                            Size: item.Size,
                            Type: item.Type,
                            GrossWeight: item.DeclaredGrossWeight,
                            IsSOC: SOC,
                            ContainerGrade: item.ContainerGrade
                        };
                        $scope.oe.orderContainerList.push(obj);

                    });
                    $timeout(function () {
                        $scope.ngTblContainer();
                        growlService.growl('Excel file Uploaded Successfully', 'success');
                    }, 500);
                }
            }, function (err) {
            });
        }

        $scope.CargoFileUpload = function (e) {
            if (angular.isUndefined($scope.oe.orderCargoList))
                $scope.oe.orderCargoList = new Array();
            var file = document.getElementById('cargoFile').files[0];

            UtilityFunc.GetExcelData(file, '1TradeOrderCargo').then(function (d) {
                if (d.length == 0) {
                    growlService.growl('Excel file Upload failed', 'danger');
                } else {
                    angular.forEach(d, function (item, index) {
                        var packagetype = $filter('filter')($scope.lookupData.packageTypeList, { Text: item.TypeofPackage })[0].Value;
                        var obj = {
                            ContainerNo: item.ContainerNo,
                            ProductDescription: item.Product,
                            CountryCode: item.CountryOfOrigin,
                            HSCode: item.HSCode,
                            Qty: item.Quantity,
                            UOM: item.DeclaredUOM,
                            PackageCount: item.NoofPackages,
                            PackageType: packagetype,
                            GrossVolume: item.Volume,
                            GrossWeight: item.Weight,
                            ForeignCurrencyCode: item.ForeignCurrencyCode,
                            ForeignPrice: item.ForeignPrice,
                            LocalCurrencyCode: item.LocalCurrencyCode

                        };
                        $scope.oe.orderCargoList.push(obj);
                    });

                    $timeout(function () {
                        $scope.ngTblCargo();
                        growlService.growl('Excel file Uploaded Successfully', 'success');
                    }, 500);
                }
            }, function (err) {
            });

        }

        /* Declaration Visibility  */
        $scope.GetDeclarationStatus = function (orderNo) {
            OrderEntryService.GetDeclarationStatus(orderNo).then(function (d) {
                $scope.declarationOrderStatus = d.data;
            }, function (err) {
            });
        }

        $scope.GetDeclarationVisibility = function (orderNo, jobType) {
            if (jobType == 1060)
                $scope.declarationBtnText = 'K1 FORM';
            else if (jobType == 1061)
                $scope.declarationBtnText = 'K2 FORM';

            OrderEntryService.GetDeclarationVisibility(orderNo).then(function (d) {
                $scope.oe.DeclarationVisibility = d.data;
            }, function (err) { });
        };

        $scope.isFrmSuspensionValid = false;
        $scope.$watch('Cntrl.frmSuspension.$valid', function (isValid) {
            $scope.isFrmSuspensionValid = isValid;
        });
        $scope.CloseRejectPopOver = function () {
            $scope.oeCntrl.RejectPopOver = false;
        };

        $scope.RejectDeclaration = function (remarks) {
            var remarksObj = {
                BranchID: $scope.oe.DeclarationBranchID,
                DeclarationNo: $scope.oe.DeclarationNo,
                DeclarationType: 9101,
                OrderBranchID: $scope.oe.BranchID,
                OrderNo: $scope.oe.OrderNo,
                Remarks: remarks
            };

            OrderEntryService.RejectDeclaration(remarksObj).then(function (d) {
                growlService.growl('Declaration Rejected...!', 'danger');
                $scope.oeCntrl.RejectPopOver = false;
                $scope.oe.DeclarationVisibility.ApprovedBy = 'DEFAULTUSER';
            }, function (err) { });
        };

        $scope.ApproveDeclaration = function (status) {
            OrderEntryService.ApproveDeclaration($scope.oe.OrderNo, status).then(function (d) {
                growlService.growl('Declaration Approved...!', 'success');
                $scope.oe.DeclarationVisibility.ApprovedBy = 'DEFAULTUSER';
            }, function (err) { });
        };

        $scope.ViewDeclaration = function () {
            if ($scope.oe.JobType == 1060) {
                k1Service.GenerateReportPDF($scope.oe.DeclarationBranchID, $scope.oe.DeclarationNo, 'PDF');
            } else if ($scope.oe.JobType == 1061) {
                k2Service.GenerateReportPDF($scope.oe.DeclarationBranchID, $scope.oe.DeclarationNo, 'PDF');
            }
        };
        /* Declaration Visibility  */
        /* Order Approve Visibility */        
        $scope.GetApproveOrderVisibility = function (BranchID, OrderNo) {
            OrderEntryService.GetApproveOrderVisibility(BranchID, OrderNo).then(function (res) {
                $scope.oe.ApproveOrderVisibility = res.data.ApproveOrderVisibility;
            }, function (err) { });
        };
         
        $scope.UpdateOrderStatus = function (OrderNo, Status, rejectremarks) {
            debugger;
            if ($scope.isFrmRejectRemarksValid || Status == true) {
                OrderEntryService.UpdateApproveOrderStatus(OrderNo, Status, rejectremarks).then(function (res) {
                    $state.go('orderentry', {
                        orderno: $scope.oe.OrderNo,
                        IsWeb: false,
                        branchId: $scope.oe.BranchID,
                        orderOwner: null
                    }, { reload: true });
                }, function (err) { });
            }
            else {
                growlService.growl('please enter the reject remarks', 'danger');
            }
        };
      
        $scope.isFrmRejectRemarksValid = false;
        $scope.$watch('oeCntrl.frmRejectRemarks.$valid', function (isValid) {
            $scope.isFrmRejectRemarksValid = isValid;
        });
        $scope.IsFwdAgentRequired = true;
        $scope.SetFwdAgentRequired = function (merchantID) {
            MerchantProfileService.GetMerchant(merchantID).then(function (res) {
                if (res.data.IsApproveOrder) {
                    $scope.IsFwdAgentRequired = false;
                } else {
                    $scope.IsFwdAgentRequired = true;
                }
            }, function (err) { });
        };
        /* Order Approve Visibility */

        /*Request Rot No details starts*/

        $scope.GenerateRotNo = function (value, containerKey) {
            if ($scope.RequestObj == undefined) {
                $scope.RequestObj = {
                    ContainerKeys: new Array()
                }

            }
            if (value) {
                $scope.RequestObj.ContainerKeys.push(containerKey);
            } else
                $scope.RequestObj.ContainerKeys.splice(containerKey, 1);
        }

        $scope.BroadCastContainerRequest = function () {
            debugger;
            //if ($scope.equals($scope.oeOld.orderContainerList, $scope.oe.orderContainerList)) {
                if (!$scope.isContainerChanged) {
                    $scope.ConRequestObj = {
                        BranchID: null,
                        OrderNo: $scope.oe.OrderNo,
                        ContainerKeys: new Array()
                    }
                    var obj = $scope.oe;
                    angular.forEach($scope.oe.orderContainerList, function (obj, i) {
                        if (obj.isChecked)
                            $scope.ConRequestObj.ContainerKeys.push(obj.ContainerKey);

                    });

                    sessionStorage.setItem("SSNCONREQUESTOBJ", JSON.stringify($scope.ConRequestObj));
                    $state.go('containerrequest',
                        { requestNo: 'NEW' });
                    // $window.parent.MainModuleFunction({ requestNo: 'NEW' }, 'containerrequest', 'Container Request');
                //}
            }
            else
                growlService.growl('Please save order entry before proceeding', 'danger');

        };

        $scope.rot = new Array();

        $scope.GetRotDetails = function (orderno) {
            OrderEntryService.GetRotDetails(orderno).then(function (d) {
                $scope.rot = d.data.Rotdetails;
                $scope.ngTblROTInfo();
            }, function (err) {

            });
        }

        $scope.ngTblROTInfo = function () {
            if ($scope.rot == null || $scope.rot == undefined) {
                $scope.rot = new Array();
            }
            $scope.tblROTInfo = new NgTableParams({
                page: 1,
                count: 10,
                sorting: {
                    name: 'asc'
                }
            }, {

                    total: $scope.rot.length,
                    getData: function ($defer, params) {
                        var orderedData = params.sorting() ? $filter('orderBy')($scope.rot, params.orderBy()) : $scope.rot;

                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));

                    }
                });
        }
        /*Request Rot No details ends*/
    }]);





