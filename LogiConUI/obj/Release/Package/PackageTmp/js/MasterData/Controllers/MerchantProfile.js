﻿angular.module('LogiCon').controller('MerchantProfileController', ['$scope', '$http', '$uibModal', 'MerchantProfileService', '$window', '$stateParams', '$location', 'growlService', 'limitToFilter', 'Utility', '$state', 'NgTableParams', 'UtilityFunc',
    function ($scope, $http, $uibModal, MerchantProfileService, $window, $stateParams, $location, growlService, limitToFilter, Utility, $state, NgTableParams, UtilityFunc) {

        $scope.IsFwdAgent = false;
        $scope.CompanySubscriptionList = UtilityFunc.CompanySubscriptionList();
        angular.forEach($scope.CompanySubscriptionList, function (item, key) {
            if (item.ModuleID == 9152) {
                $scope.IsFwdAgent = true;
            }
        });
        $scope.validateCuntry = '';
        $scope.search = {
            filter: ''
        };
        $scope.CompanyID = UtilityFunc.CompanyID();
        $scope.AddAddress = function (addressId) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/MasterData/Templates/MerchantProfile/add-address.html?v=' + Utility.Version,
                controller: 'addEditAddressCntrl',
                size: 'lg',
                resolve: {
                    addressObj: function () {
                        return (addressId != -1 ? $scope.mp.AddressList[addressId] : { AddressId: -1 });
                    }
                }
            });

            modalInstance.result.then(function (address) {
                if ($scope.mp.AddressList != null) {
                    if (address.AddressId != -1) {
                        for (var i = 0; i < $scope.mp.AddressList.length; i++) {
                            if ($scope.mp.AddressList[i].AddressId == address.AddressId) {
                                $scope.mp.AddressList[i] = address;
                                break;
                            }
                        }
                    }
                    else {
                        $scope.mp.AddressList.push(address);
                    }
                }
                else {
                    $scope.mp.AddressList = new Array();
                    $scope.mp.AddressList.push(address);
                }

                $scope.validateCuntry = '';
                for (var i = 0; i < $scope.mp.AddressList.length; i++) {
                    $scope.validateCuntry = $scope.mp.AddressList[i].CountryCode;
                    if ($scope.validateCuntry == 'MY') {
                        break;
                    }
                }
            }, function () {

            });
        };

        $scope.DeleteAddress = function (addressId) {
            $scope.mp.AddressList[addressId].IsActive = false;
            $scope['tr_' + addressId] = true;

        };

        $scope.ValidateCountry = function () {
            $scope.validateCuntry = '';
            for (var i = 0; i < $scope.mp.AddressList.length; i++) {
                if ($scope.mp.AddressList[i].IsActive != false) {
                    $scope.validateCuntry = $scope.mp.AddressList[i].CountryCode;
                    if ($scope.validateCuntry == 'MY') {
                        break;
                    }
                }
            }
        };

        $scope.isFrmMerchantProfile = false;
        $scope.$watch('frmMerchantProfile.$valid', function (isValid) {
            $scope.isFrmMerchantProfile = isValid;
        });

        $scope.AddMerchantProfile = function (mp) {
            $scope.showLoading = true;
            if ($scope.isFrmMerchantProfile) {
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

                if ($scope.IsFwdAgent) {
                    if ($scope.mp.IsConsignee || $scope.mp.IsShipper || $scope.mp.IsFreightForwarder) {

                    } else {
                        $scope.IsViewDeclaration = false;
                        $scope.IsApproveDeclaration = false;
                    }
                } else {
                    $scope.IsViewDeclaration = false;
                    $scope.IsApproveDeclaration = false;
                }
                
                if ($scope.mp.IsConsignee || $scope.mp.IsBillingCustomer || $scope.mp.IsShipper) {
                    }
                 else {
                    $scope.mp.IsViewOrder = false;
                    $scope.mp.IsApproveOrder = false;
                }


                MerchantProfileService.SaveMerchantProfile(mp).then(function (d) {
                    
                    $scope.showLoading = false;
                    $state.go('merchant', {});
                    growlService.growl(d.data, 'success');
                }, function (err) {
                    growlService.growl(err.statusText, 'danger');
                });
            } else {
                
                $scope.showLoading = false;
                growlService.growl('Please enter all mandatory fields', 'danger');
            }


        };

        var DataTblobj = {};
        $scope.GetTableData = function (type) {
            $scope.ngTblData = new NgTableParams({
                page: 0,
                count: 10,
                sorting: {
                    MerchantCode: 'asc'
                }
            }, {
                counts: [10, 20, 30],
                getData: function ($defer, params) {
                    if (type == 'admin') {
                        $scope.search.Name = '';
                        $scope.search.RegNo = '';
                        $scope.search.AgentCode = '';
                        $scope.search.GSTNo = '';

                        DataTblobj.MerchantType = (type == 'admin' ? $scope.search.filter : '');
                        DataTblobj.MerchantName = $scope.search.MerchantName == undefined ? '' : $scope.search.MerchantName;
                        DataTblobj.RegNo = '';
                        DataTblobj.AgentCode = '';
                        DataTblobj.GSTNo = '';
                    }
                    else {
                        $scope.search.filter = undefined;
                        $scope.search.MerchantName = '';

                        DataTblobj.MerchantType = '';
                        DataTblobj.MerchantName = $scope.search.Name == undefined ? '' : $scope.search.Name;
                        DataTblobj.RegNo = $scope.search.RegNo == undefined ? '' : $scope.search.RegNo;
                        DataTblobj.AgentCode = $scope.search.AgentCode == undefined ? '' : $scope.search.AgentCode;
                        DataTblobj.GSTNo = $scope.search.GSTNo == undefined ? '' : $scope.search.GSTNo;
                    }

                    
                    DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
                    DataTblobj.limit = params.count();
                    if (params.sorting()) {
                        var orderBy = params.orderBy()[0];

                        DataTblobj.sortColumn = orderBy.substring(1);
                        DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
                    }
                    MerchantProfileService.GetTableList(DataTblobj).then(function (res) {
                        params.total(res.data.records);
                        $defer.resolve(res.data.data);
                    }, function (err) { })
                }
            });
        };

        $scope.GetTableData('user');

        //var DataTblobj = {};
        //$scope.GetTableAdminData = function () {
        //    $scope.ngTblAdminData = new NgTableParams({
        //        page: 0,
        //        count: 10,
        //        sorting: {
        //            MerchantCode: 'asc'
        //        }
        //    }, {
        //        counts: [10, 20, 30],
        //        getData: function ($defer, params) {
        //            
        //            //DataTblobj.MerchantType = $scope.search.filter;
        //            DataTblobj.MerchantName = $scope.search.MerchantName == undefined ? '' : $scope.search.MerchantName;
        //            DataTblobj.RegNo = $scope.search.RegNo == undefined ? '' : $scope.search.RegNo;
        //            DataTblobj.AgentCode = $scope.search.AgentCode == undefined ? '' : $scope.search.AgentCode;
        //            DataTblobj.GSTNo = $scope.search.GSTNo == undefined ? '' : $scope.search.GSTNo;

        //            
        //            DataTblobj.offset = params.page() == 0 ? 0 : (params.count() * (params.page() - 1));
        //            DataTblobj.limit = params.count();
        //            if (params.sorting()) {
        //                var orderBy = params.orderBy()[0];

        //                DataTblobj.sortColumn = orderBy.substring(1);
        //                DataTblobj.sortType = orderBy[0] == '+' ? 'asc' : 'desc'
        //            }
        //            MerchantProfileService.GetAdminTableList(DataTblobj).then(function (res) {
        //                params.total(res.data.records);
        //                $defer.resolve(res.data.data);
        //            }, function (err) { })
        //        }
        //    });
        //};

        //$scope.GetTableAdminData();



        $scope.DeleteMerchant = function (code, name) {
            if ($window.confirm('Are you sure, you want to delete \'' + name + '\' ?')) {
                MerchantProfileService.DeleteMerchant(code).then(function (d) {
                    growlService.growl("Deleted Successfully.", 'success');
                    $scope.GetTableData('user');
                }, function (err) { });
            }
        }

        $scope.InsertMerchantProfile = function (merchantCode, taxID, regNo) {
            var Obj = {
                MerchantCode: merchantCode,
                RegNo: regNo,
                TaxID: taxID
            };
            MerchantProfileService.InsertMerchantProfile(Obj).then(function (d) {
                $scope.showLoading = false;
                growlService.growl(d.data, 'success');

                $state.reload();
            }, function (err) {
                growlService.growl(err.statusText, 'danger');
            });
        }

        $scope.print = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'Js/MasterData/Templates/MerchantProfile/print.html?v=' + Utility.Version,
                controller: 'PrintCntrl',
                size: 'lg',
                resolve: {
                    reportObj: function () {
                        return {
                            branchID: 10,
                            poNo: '1606002',
                            Url: '/NetStockDiamondReports/Diamond.PurchaseOrder'
                        }
                    }
                }
            });

            modalInstance.result.then(function (d) {

            }, function () {

            });
        };

        var code = $stateParams.code;
        $scope.isOriginal = $stateParams.isOriginal;
        $scope.isNewMerchant = false;
        if (typeof code != 'undefined') {
            if (code != null && code != 'NEW' && code != '') {
                var Obj = {
                    MerchantCode: code,
                    RegNo: $stateParams.regNo,
                    TaxID: $stateParams.taxID
                };
                MerchantProfileService.GetMerchantProfile(Obj).then(function (d) {
                    $scope.showLoading = false;
                    $scope.mp = d.data.merchant;
                    $scope.fResults = d.data.fResults;
                    $scope.yResults = d.data.yResults;
                    $scope.tResults = d.data.tResults;

                    $scope.isNewMerchant = false;
                }, function (err) {
                    growlService.growl(err.statusText, 'danger');
                });
            } else {
                $scope.showLoading = false;
                $scope.isNewMerchant = true;
            }
            MerchantProfileService.GetLookupData().then(function (d) {
                $scope.lookupData = d.data;
            }, function (err) {
                growlService.growl(err.statusText, 'danger');
            });
        }
        else {
            $scope.GetTableData('user');
        }

        $scope.GetMerchantByRegNo = function () {
            if (!angular.isUndefined($scope.mp.RegNo)) {
                MerchantProfileService.GetRegistrationNoResults($scope.mp.RegNo).then(function (d) {
                    $scope.mp = d.data;
                    if ($scope.mp.CompanyCode == $scope.CompanyID)
                        $scope.isNewMerchant = false;
                }, function (err) {
                    growlService.growl('No merchant found', 'danger');
                });
            }

        };


        //$scope.filterChanged = function () {
        //    $scope.search.MerchantName = '';
        //    $scope.GetTableData('');
        //};

        $scope.refresh = function () {
            $state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });
        }

        $scope.refresh2 = function () {
            $scope.mp = null;
            $scope.fResults = new Array();
            $scope.yResults = new Array();
            $scope.tResults = new Array();

            $scope.isNewMerchant = true;
        }

        //$scope.SearchMerchant = function () {
        //    if ($scope.search.filter == '')
        //        growlService.growl('Merchant Type is required', 'danger');
        //    else
        //        $scope.search.RegNo = '';
        //    $scope.search.AgentCode = '';
        //    $scope.search.GSTNo = '';
        //    $scope.GetTableData();
        //};

        //$scope.AdvSearchMerchant = function () {
        //    
        //    delete $scope.search.filter;
        //    delete $scope.search.MerchantName;
        //    //if ($scope.search.RegNo == '' && $scope.search.AgentCode == '' && $scope.search.GSTNo == '') 

        //    //    growlService.growl('Merchant  details  required', 'danger');
        //    // else {
        //    
        //    //      $scope.search.filter = '';
        //    //$scope.search.MerchantName = '';

        //    // } 
        //    $scope.GetTableData();

        //};
        $scope.forwarderResults = function ($query) {
            if ($query != '') {
                return MerchantProfileService.SearchMerchantResults($query, 'freightForwarder').then(function (d) {
                    return limitToFilter(d.data, 15);
                }, function (err) { });
                //return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + $query + '/freightForwarder', { cache: true }).then(function (response) {
                //    return response.data;
                //});
            }
            else {
                return [];
            }
        };

        $scope.yardResults = function ($query) {
            if ($query != '') {
                return MerchantProfileService.SearchMerchantResults($query, 'yard').then(function (d) {
                    return limitToFilter(d.data, 15);
                }, function (err) { });
                //return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + $query + '/yard', { cache: true }).then(function (response) {
                //    return response.data;
                //});
            }
            else {
                return [];
            }
        };

        $scope.transportResults = function ($query) {
            if ($query != '') {
                return MerchantProfileService.SearchMerchantResults($query, 'transporter').then(function (d) {
                    return limitToFilter(d.data, 15);
                }, function (err) { });
                //return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + $query + '/transporter', { cache: true }).then(function (response) {
                //    return response.data;
                //});
            }
            else {
                return [];
            }
        };

    }]);

angular.module('LogiCon').controller('PrintCntrl', ['$scope', 'reportObj', 'Utility', function ($scope, reportObj, Utility) {

    $scope.reportPath = Utility.ReportPath
        + '/PurchaseOrderReport?branchID='
        + reportObj.branchID
        + '&poNo=' + reportObj.poNo
        + '&Url=' + reportObj.Url;
}]);




