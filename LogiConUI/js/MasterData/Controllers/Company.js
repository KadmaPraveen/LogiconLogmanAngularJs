angular.module('LogiCon').controller('CompanyCntrl', ['$scope', 'CompanyService', 'CountryService', '$timeout', 'Utility', 'growlService', 'UtilityFunc', '$window', '$filter', function ($scope, CompanyService, CountryService, $timeout, Utility, growlService, UtilityFunc, $window, $filter) {
    $scope.isSelected = false;
    $scope.showLoading = true;
    $scope.Version = '?v=' + Utility.Version;
    $scope.IsAgentDisabled = true;
    $scope.GetCompanyDetails = function () {
        CompanyService.GetCompanyDetails(UtilityFunc.CompanyID()).then(function (d) {            
            var arr = new Array();
            var obj = {
                'label': d.data.companyInfo.CompanyName,
                'id': d.data.companyInfo.CompanyCode,
                'i': 0,
                'type': 'company',
                'children': GetBranchArr(d.data.companyInfo.Branches, 0)
            };
            arr.push(obj);
            $scope.company = d.data.companyInfo;
            $scope.BranchDetails = d.data.companyInfo.CompanyCode;
            $scope.treedata = arr;
            $scope.showLoading = false;
        }, function (err) {
            growlService.growl(err.statusText, 'danger');
        });
    };

    CountryService.GetCountriesList().then(function (d) {        
        $scope.CountriesList = d.data;
    }, function (err) { growlService.growl(err.statusText, 'danger'); });

    CompanyService.GetCompanySubscription().then(function (d) {        
        $scope.modulesList = d.data;
    }, function (err) { growlService.growl(err.statusText, 'danger'); });

    $scope.isDisabledCompany = true;
    $scope.detailsUrl = 'Js/MasterData/Templates/Company/companydetails.html?v=' + Utility.Version;
    $scope.showSelected = function (sel) {  
        
        $scope.showLoading = true;
        if (sel.type == 'company') {
            $scope.isDisabledCompany = true;
            $scope.detailsUrl = 'Js/MasterData/Templates/Company/companydetails.html?v=' + Utility.Version;

            CompanyService.GetCompanyDetails(sel.id).then(function (d) {
                $scope.billingModules = d.data.billingModules;
                $scope.CompanyDetails = d.data.companyInfo;
                $scope.regDetails = d.data.regDetails;
                $scope.showLoading = false;
            }, function (err) { growlService.growl(err.statusText, 'danger'); });
        }
        else if (sel.type == 'branch') {            
            $scope.detailsUrl = 'Js/MasterData/Templates/Company/branchdetails.html?v=' + Utility.Version;
            var tempObj = $scope.company.Branches[sel.i];
            
            CompanyService.GetBranchDetails({
                BranchID: tempObj.BranchID,
                CompanyCode: tempObj.CompanyCode
            }).then(function (d) {
                $scope.BranchDetails = d.data;
                $scope.showLoading = false;
            }, function (err) { growlService.growl(err.statusText, 'danger'); });

            CompanyService.GetRegisteredCompany().then(function (d) {
                $scope.registeredCompany = d.data.registeredCompany;                
            }, function (err) { });
        }        
    };

    $scope.isfrmCompanyDetailsValid = false;
    $scope.$watch('Cntrl.frmCompanyDetails.$valid', function (isValid) {        
        $scope.isfrmCompanyDetailsValid = isValid;
    });

    $scope.isfrmBranchDetailsValid = false;
    $scope.$watch('Cntrl.frmBranchDetails.$valid', function (isValid) {
        $scope.isfrmBranchDetailsValid = isValid;
    });

    $scope.AddCompany = function () {
        $scope.isSelected = true;
        $scope.isDisabledCompany = false;
        $scope.detailsUrl = 'Js/MasterData/Templates/Company/companydetails.html?v=' + Utility.Version;
        $scope.CompanyDetails = {
            CompanyCode: ''
        };
        
    };

    $scope.SaveCompany = function (CompanyDetails) {
        if ($scope.isfrmCompanyDetailsValid) {            
            CompanyDetails.CreatedBy = Utility.CreatedBy;
            CompanyDetails.ModifiedBy = Utility.ModifiedBy;
            var file = document.getElementById('companyLogo').files[0];
            CompanyService.SaveCompanyWithLogo(CompanyDetails, file).then(function (res) {
                growlService.growl(res, 'success');
                //$scope.GetCompaniesList();
                $scope.isDisabledCompany = true;
            }, function (err) {                
                growlService.growl(err.statusText, 'danger');
            });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };

    $scope.SaveBranch = function (BranchDetails) {       
        if ($scope.isfrmBranchDetailsValid) {
            BranchDetails.CreatedBy = Utility.CreatedBy;
            BranchDetails.ModifiedBy = Utility.ModifiedBy;
            CompanyService.SaveBranch(BranchDetails).then(function (res) {
                growlService.growl(res.data, 'success');
                //$scope.GetCompaniesList();
                $scope.isDisabledCompany = true;
            }, function (err) {
                growlService.growl(err.statusText, 'danger');
            });
        }
        else {
            growlService.growl('Please enter all mandatory fields..', 'danger');
        }
    };

    $scope.AddBranch = function (CompanyCode, CompanyName) {
        $scope.detailsUrl = 'Js/MasterData/Templates/Company/branchdetails.html?v=' + Utility.Version;
        $scope.BranchDetails = {
            CompanyCode: CompanyCode,
            CompanyName: CompanyName
        };
    };

    function GetBranchArr(data, parentIndex) {
        var arr = new Array();
        if (typeof data != 'undefined') {
            for (var i = 0; i < data.length; i++) {
                var obj = {
                    'label': data[i].BranchName,
                    'id': data[i].BranchID,
                    'i': i,
                    'type': 'branch',
                    parentIndex: parentIndex
                    //'children': GetBranchArr(data[i].BranchList)
                };
                arr.push(obj);
            }
        }

        return arr;
    };
    $scope.Cntrl.ModulesPopOver = false;
    $scope.closeModulesPopOver = function () {
        $scope.Cntrl.ModulesPopOver = false;
    };

    $scope.SaveModules = function (modulesList) {
        var obj = $filter('filter')(modulesList, { ModuleID: 9152, isSelected :true})[0];
        if(obj!=null)
        {
            if ($scope.CompanyDetails.AgentCode != 'undefined' && $scope.CompanyDetails.AgentCode != '')
            {
                CompanyService.SaveCompany($scope.CompanyDetails, '').then(function (res) {
                    $scope.ModuleSaveSubscription(modulesList);
                }, function (err) {
                })
            }
            else
            {
                $scope.IsAgentDisabled = false;
                obj.isSelected = false;
                $scope.Cntrl.ModulesPopOver = false;
                growlService.growl('Please enter Agent code..', 'danger');
            }
        }
        else
        {
            $scope.ModuleSaveSubscription(modulesList);
        }
       
        
    };

    $scope.ModuleSaveSubscription = function (modulesList)
    {
        CompanyService.SaveCompanySubscription(modulesList).then(function (d) {
            $scope.IsAgentDisabled = true;
            $scope.Cntrl.ModulesPopOver = false;
            growlService.growl(d.data, 'success');
        }, function (err) { growlService.growl(err.statusText, 'danger'); });
     }

    $scope.fileChanged = function (file) {        
        $scope.CompanyDetails.Logo = file[0].name;
    };

    $scope.DeleteLogo = function () {
        var r = $window.confirm('Are you sure you want to delete the logo ?')
        if (r) {
            CompanyService.DeleteCompanyLogo().then(function (d) {
                growlService.growl('Deleted successfully!','success');
                $scope.CompanyDetails.Logo = '';
            }, function (err) { });
        }
        
    };
    $scope.Clear = function () {
        $scope.CompanyDetails = {};
    };

    $scope.GetCompanyDetails();
    $scope.AddCompany();
}]);

