app.service('OrderEntryService', ['$http', '$q', 'Utility', 'UtilityFunc', function ($http, $q, Utility, UtilityFunc) {
    this.SaveOrderEntry = function (oe) {
        var Url = '/Operation/OrderEntry/save';
        //if (angular.isUndefined(oe.BranchID) || oe.BranchID == null || oe.BranchID == '' || oe.BranchID == UtilityFunc.BranchID()) {
        //    Url = '/Operation/OrderEntry/save';
        //} else {
        //    Url = '/Operation/OrderEntry/oe/save';
        //}
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + Url, JSON.stringify(oe)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        // this.SaveActivityStatus(obj);
        return deferred.promise;
    };

    this.SaveActivityStatus = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/OrderEntry/activityLogSave', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.CheckContainerStatus = function (OrderNo,ContainerNo, containerKey) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/CheckContainerStatus/' + OrderNo + '/' + ContainerNo+ '/' + containerKey).then(function(res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetLookupData = function (type) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetTerminalList = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/TerminalOperator/operatorList').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetContainerLookupData = function (size) {


        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/container/lookup/' + size).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);

        });
        return deferred.promise;
    };


    this.GetTransportLookupData = function (size) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/transport/lookup').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetPendingOrders = function (type, text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/' + type + '/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetSizeType = function (size) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/master/equipment/' + size + '/type').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetOrderEntryByNo = function (orderNo, branchID) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/orderno/' + orderNo + '/' + branchID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.CloneOrderEntry = function (BranchID, orderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/clone/orderno/' + BranchID + '/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.deleteOrderEntry = function (orderNo) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/Operation/OrderEntry/deleteorderheader/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchOrder = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/search/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SendToAgent = function (branchID, orderNo) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/Operation/OrderEntry/' + branchID + '/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetWebOrdersForAgent = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/agentweborders').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetWebOrder = function (orderNo, branchId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/weborder/' + orderNo + '/' + branchId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ApproveWebOrder = function (obj) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/Operation/OrderEntry/weborder/approve', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GenerateDeclaration = function (oe) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/OrderEntry/declaration', JSON.stringify(oe)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GenerateBookingEntry = function (oe) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/OrderEntry/bookingEntry', JSON.stringify(oe)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };


    this.uploadFiles = function (data, OrderNo, BranchID) {
        var deferred = $q.defer();

        var objXhr = new XMLHttpRequest();
        objXhr.onreadystatechange = function () {
            if (objXhr.readyState == 4) {
                deferred.resolve('Success');
            }
        };

        objXhr.onerror = function (err) {
            deferred.reject('Error');
        };
        debugger;
        objXhr.open('POST', Utility.ServiceUrl + '/Operation/OrderEntry/uploadFiles/' + OrderNo);
        objXhr.setRequestHeader('USERID', UtilityFunc.UserID());
        objXhr.setRequestHeader('BRANCH_ID', BranchID);
        objXhr.setRequestHeader('COMPANY_ID', BranchID.toString().substring(0, 4));
        objXhr.setRequestHeader('AUTH_TOKEN', UtilityFunc.AuthToken());
        objXhr.send(data);
        return deferred.promise;
    };

    this.GetOrderEntryDocsNo = function (orderNo) {
        var deferred = $q.defer();

        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/getOrderEntryDocs/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.getUUIDFromInsuranceHeader = function (OrderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/getUUIDFromInsuranceHeader/' + OrderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.DeleteImage = function (branchID, orderNo, itemNo) {
        var deferred = $q.defer();
        $http.delete(Utility.ServiceUrl + '/Operation/OrderEntry/deleteOrderEntryDoc/' + branchID + '/' + orderNo + '/' + itemNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetInsuranceCertificate = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/getinsurancecertificate').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.CheckNextInsuranceResponse = function (orderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/insurance/' + orderNo).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.operatorList = function (operatorType, operatorName) {

        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/TerminalOperator/operatorSearch/' + operatorType + '/' + operatorName).then(function (res) {

            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ImportExcelData = function (file, contractType) {

        var deferred = $q.defer();
        var data = new FormData();
        data.append('file', file);

        var objXhr = new XMLHttpRequest();
        objXhr.onreadystatechange = function () {
            if (objXhr.readyState == 4) {
                deferred.resolve(objXhr.response);
            }
        };

        objXhr.onerror = function () {
            deferred.reject('Error');
        };

        objXhr.open('POST', Utility.ServiceUrl + '/Operation/OrderEntry/excel/importData/' + contractType);
        objXhr.setRequestHeader('COMPANY_ID', UtilityFunc.CompanyID());
        objXhr.setRequestHeader('USERID', UtilityFunc.UserID());
        objXhr.setRequestHeader('BRANCH_ID', UtilityFunc.BranchID());
        objXhr.send(data);
        return deferred.promise;
    };


    this.GetDeclarationStatus = function (orderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/getdeclartionstatus/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDeclarationVisibility = function (orderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/declarationvisibility/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ApproveDeclaration = function (orderNo, status) {
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/Operation/OrderEntry/approvedeclaration/' + orderNo + '/' + status).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.RejectDeclaration = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/OrderEntry/rejectdeclaration/', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SubmitToCustomsVisibility = function (declarationNo, declarationType) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/submittocustomsvisibility/' + declarationNo + '/' + declarationType).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetRotDetails = function (orderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/rotdetails/' + orderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetApproveOrderVisibility = function (BranchID, OrderNo) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/OrderEntry/approveordervisibility/' + BranchID + '/' + OrderNo).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.UpdateApproveOrderStatus = function (OrderNo, Status, rejectremarks) {
        debugger;
        var deferred = $q.defer();
        $http.put(Utility.ServiceUrl + '/Operation/OrderEntry/UpdateApproveOrderStatus/' + OrderNo + '/' + Status + '/' + rejectremarks +  '?v=' + $.now()).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
}]);