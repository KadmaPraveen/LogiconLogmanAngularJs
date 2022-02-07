angular.module('LogiCon').controller('AddNews', ['$scope', 'NewsService', 'Utility', 'UtilityFunc', function ($scope, NewsService, Utility, UtilityFunc) {
    $scope.init = function () {
        $scope.dateFormat = UtilityFunc.DateFormat();
        $scope.news = {
            Id: -1,
            CategoryCode: null,
            Title: null,
            Message: null,
            NewsDate: null,
            ExpiryDate: null,
            Image: null,
            CreatedBy: null,
            CreatedOn: new Date(),
            ModifiedBy: null,
            ModifiedOn: new Date()
        };

        $scope.GetLookUpData();
    }
    $scope.fileChanged = function (file) {
        $scope.news.Image = file[0].name;
    };

    $scope.SaveNews = function (obj) {
        obj.CreatedBy = Utility.CreatedBy;
        obj.ModifiedBy = Utility.ModifiedBy;
        var file = document.getElementById('imageUpload').files[0];
        NewsService.saveNews(obj, file).then(function (d) {
            
        }, function (err) {

            
        });
    }

    $scope.GetLookUpData = function () {
        NewsService.GetLookUpData().then(function (d) {
            $scope.categoryList = d.data;
        }, function (err) {
            
        });
    }


    $scope.init();
    
}]);