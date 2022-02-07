app.service('VesselScheduleService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.SaveVesselSchedule = function (vs) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/vesselschedule/save', JSON.stringify(vs)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetVesselScheduleList = function (date) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/vesselschedule/list/' + date).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    
    this.GetVesselSchedule = function (vesselScheduleID) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/vesselschedule/' + vesselScheduleID).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.SearchVesselSchedule = function (vs, take) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/vesselschedule/search/' + take, JSON.stringify(vs)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.VoyageSearchByObj = function (obj) {
        
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Operation/vesselschedule/voyagesearch', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.VoyageSearch = function (voyage, jobType) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/vesselschedule/voyagesearch/' + voyage + '/' + jobType).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.VesselNameResults = function (vessel) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/vesselschedule/vesselsearch/' + vessel).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.VesselIdResults = function (vesselId) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/vesselschedule/vesselIdsearch/' + vesselId).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.ShipCallNoSearch = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/vesselschedule/search/shipcallno/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.VoyageNoInWardSearch = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/vesselschedule/search/voyagenoinward/' + text).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.VoyageNoOutWardSearch = function (text) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/vesselschedule/search/voyagenooutward/' + text).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetOrderCount = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Reports/VisualReports/getordercount').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetHSCodePortOfLoading = function () {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Reports/VisualReports/hscodeportofloading').then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetJobTypeByDate = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Reports/VisualReports/JobTypeByDate', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

    this.GetDeclarationByDate = function (obj) {
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/Reports/VisualReports/declaration', JSON.stringify(obj)).then(function (res) {
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
    }

    this.GetPortList = function (countryID) {
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Operation/vesselschedule/getportlist/' + countryID).then(function (res) {
            //
            deferred.resolve(res);
        }, function (err) {
           // 
            deferred.reject(err);
        });
        return deferred.promise;
    }

    this.GetVesselSchedulesByPort = function (portCode) {
        var deffered = $q.defer();
        $http.get(Utility.ServiceUrl + "/Operation/vesselschedule/getvesselsbyport/"+ portCode).then(function (res) {
            deffered.resolve(res);
        }, function (err) {
            // 
            deffered.reject(err);
        });
        return deffered.promise;
    }
    this.GetTableData = function (vesselObj) {
        var deffered = $q.defer();
        $http.post(Utility.ServiceUrl + "/Operation/vesselschedule/list/table", JSON.stringify(vesselObj)).then(function (res) {
            deffered.resolve(res);
        }, function (err) {
            // 
            deffered.reject(err);
        });
        return deffered.promise;
    }
    //GetTableData
    this.operatorList = function (operatorType, operatorName) {
        
        var deferred = $q.defer();
        $http.get(Utility.ServiceUrl + '/Master/TerminalOperator/operatorSearch/' + operatorType + '/' + operatorName).then(function (res) {
            
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
}]);