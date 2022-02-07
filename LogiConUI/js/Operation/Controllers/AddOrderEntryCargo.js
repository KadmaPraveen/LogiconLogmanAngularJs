angular.module('LogiCon').controller('AddOrderEntryCargo', ['$scope', 'OrderEntryService', 'HSCodeService', '$uibModalInstance', 'dataObj', '$http', 'Utility', 'limitToFilter', 'CountryService', 'growlService',
    function ($scope, OrderEntryService, HSCodeService, $uibModalInstance, dataObj, $http, Utility, limitToFilter, CountryService, growlService) {


        $scope.showTrucks = dataObj.TransportType != 1020 ? true : false;
        $scope.showPallet = dataObj.TransportType == 1020 ? true : false;
        $scope.IsWebOrder = dataObj.iswebOrder;
        $scope.c = {};
        $scope.isFrmCargoValid = false;
        $scope.$watch('frmCargo.$valid', function (isValid) {
            $scope.isFrmCargoValid = isValid;
        });
        
        var SelectData = new Array();
        if (dataObj.FreightMode == 1030) {
            $scope.lblText = 'Containers';
        } else if (dataObj.FreightMode == 1031) {
            $scope.lblText = 'Trucks';
        } else {
            $scope.lblText = 'Trucks';
        }

        angular.forEach(dataObj.List, function (item, index) {

            if (!angular.isUndefined(item.ContainerNo)) {
                var obj = {
                    Value: item.ContainerNo,
                    Text: item.ContainerNo
                };
                SelectData.push(obj);
            }

        });

        $scope.lookUpData = {};
        $scope.lookUpData.List = SelectData;
        $scope.lookUpData.uomList = dataObj.uomList;
        $scope.lookUpData.stockRoomList = dataObj.stockRoomList;
        $scope.lookUpData.currencyList = dataObj.currencyList;        
        $scope.lookUpData.packageTypeList = dataObj.packageTypeList;
        $scope.lookUpData.CountriesList = dataObj.countryList;
        $scope.c = angular.copy(dataObj.cargoItem);

        if ($scope.c != null) {
            if (angular.isUndefined($scope.c.ProductDescription) || $scope.c.ProductDescription == null)
                $scope.c.ProductDescription = '';
        }
        $scope.GenericMerchantResults = function (text, filter) {
            return $http.get(Utility.ServiceUrl + '/master/MerchantProfile/search/' + text + '/' + filter).then(function (response) {
                return limitToFilter(response.data, 15);
            });
        };
        //test
        //CountryService.GetCountriesList().then(function (d) {
        //    $scope.lookUpData.CountriesList = d.data;
        //}, function (err) { growlService.growl(err.statusText, 'danger'); });

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };

        $scope.CustomerSelected = function (item, type) {
            $scope.c[type] = item.Value;
        };

        $scope.HSCodeResults = function (text) {
            //return HSCodeService.Search(text).then(function (res) {
            //    
            //    return limitToFilter(res.data, 15);
            //}, function (err) { });
            return HSCodeService.AutoComplete(text).then(function (res) {
                return limitToFilter(res.data, 15);
            }, function (err) { });
        };

        $scope.SaveCargo = function (c) {

            if ($scope.isFrmCargoValid) {
                $uibModalInstance.close(c);
            } else {
                growlService.growl('please entry all mandatory fields', 'danger');
            }
        };
        $scope.CaluclateLocalCargoAmount = function () {
            // 
            var foreignAmount = parseFloat($scope.c.ForeignPrice);
            var exchangeRate = parseFloat($scope.c.ExchangeRate);
            if (!isNaN(foreignAmount) && !isNaN(exchangeRate)) {
                $scope.c.LocalPrice = (foreignAmount * exchangeRate).toFixed(4);
            }
            else {
                $scope.c.LocalPrice = 0;
            }

        };
        
        var val = dataObj;
        $scope.seaMode = false;
        $scope.CalculateVolume = function () {
            //lengthwidthheight
            
            if (dataObj.transportType == "1021") {
                $scope.c.GrossVolume = ($scope.c.Len) * ($scope.c.Width) * ($scope.c.Height);
                $scope.seaMode = false;
            }
            // else {
            //    $scope.seaMode = false;
            //}
            if (dataObj.transportType == "1020") {
                // lengthweightheight / 6000
                $scope.c.GrossVolume = (($scope.c.Len) * ($scope.c.Width) * ($scope.c.Height)) / 6000;
                $scope.seaMode = false;
            }
            else {
                $scope.seaMode = true;
            }
        }

        //$scope.GetLookupData();
        $scope.HSCodeChange = function (obj) {
            
            $scope.c.HSCode = obj.Value;
            $scope.c.HSCodeDescription = obj.Description;

            $scope.GetHSCodeHeaderObject(obj.HeaderCode);
            //$scope.CurrencyRateChanged();

        };

        $scope.GetHSCodeHeaderObject = function (headerCode) {
            HSCodeService.GetHSCodeHeader(headerCode).then(function (d) {
                $scope.c.Description = d.data.HeadingDescription;
            }, function () { });
        };

        $scope.GetHSCodeHeaderObjectByTariffCode = function (tariffCode) {
            
            HSCodeService.GetHSCodeHeaderByTariffCode(tariffCode).then(function (d) {
                
                $scope.c.Description = d.data.HeadingDescription;
            }, function () { });
        };

        
        if (!angular.isUndefined($scope.c.HSCode)) {
            $scope.GetHSCodeHeaderObjectByTariffCode($scope.c.HSCode);
        }
    }]);