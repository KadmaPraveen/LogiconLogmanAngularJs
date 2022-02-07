app.service('CUSREPInquiryService', ['$http', '$q', 'Utility', function ($http, $q, Utility) {
    this.CUSREPInquiry = function (obj) {
        //
        //var temp = {
        //    vesselName: 'Vessel Name',
        //    voyageNo: 'Voyage NO',
        //    dischargePort: 'discharge port',
        //    placeofArrival: 'place of arrival',
        //    eta: null,
        //    etd: null
        //};
        //console.log(JSON.stringify(temp));
        /*
        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/edi/cusrep/inquiry', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            
            deferred.reject(err);
        });
        return deferred.promise;*/

        var deferred = $q.defer();
        $http.post(Utility.ServiceUrl + '/edi/cusrep/inquiry', JSON.stringify(obj)).then(function (res) {
            deferred.resolve(res);
        }, function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };

}]);