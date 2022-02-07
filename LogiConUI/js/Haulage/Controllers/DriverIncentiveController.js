angular.module('LogiCon').controller('DriverIncentiveCntrl', ['$scope', '$uibModal', 'DriverIncentiveService', 'Utility', function ($scope, $uibModal, DriverIncentiveService, Utility) {
    $scope.di = {
        DriverIncentiveDetails: new Array()
    };
    $scope.AddDriverIncentive = function (id) {
        console.log(id);
        var dataObj = {};

        if (id != -1) {
            dataObj = $scope.di.DriverIncentiveDetails[id];
        } else {
            dataObj = {
                index: $scope.di.DriverIncentiveDetails.length
            };
        }

        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'Js/Haulage/Templates/DriverIncentive/add-driverincentive.html?v=' + Utility.Version,
            controller: 'EditDriverIncentiveController',            
            size: 'lg',
            resolve: {
                dataObj: function () {
                    return dataObj;
                }
            }
        });

        modalInstance.result.then(function (obj) {            
            $scope.di.DriverIncentiveDetails[obj.index] = obj;
        }, function (err) {

        });
    };

    $scope.GetQuotationList = function () {
        DriverIncentiveService.GetQuotationList().then(function (d) {
            $scope.QuotationList = d.data;
        }, function (err) { });
    };

    $scope.SelectedQuotationChange = function () {
        DriverIncentiveService.GetQuotation($scope.SelectedQuotation).then(function (d) {            
            angular.forEach(d.data.DriverIncentiveDetails, function (item, index) {
                item.index = index;
            });
            $scope.di = d.data;
        }, function (err) { });
    };

    $scope.SaveDriverIncentive = function (di) {        
        DriverIncentiveService.SaveDriverIncentive(di).then(function (d) {
            
        }, function (err) { });
    };
    $scope.GetQuotationList();

    /**/
    var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. " +
                      "Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor." +
                      "Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, " +
                      "ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor." +
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

    $scope.side = '';

    $scope.events = [{
        badgeClass: 'info',
        badgeIconClass: 'glyphicon-check',
        title: 'First heading',
        when: '11 hours ago via Twitter',
        content: 'Some awesome content.'
    }, {
        badgeClass: 'warning',
        badgeIconClass: 'glyphicon-credit-card',
        title: 'Second heading',
        when: '12 hours ago via Twitter',
        content: 'More awesome content.'
    }, {
        badgeClass: 'default',
        badgeIconClass: 'glyphicon-credit-card',
        title: 'Third heading',
        titleContentHtml: '<img class="img-responsive" src="http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg">',
        contentHtml: lorem,
        footerContentHtml: '<a href="">Continue Reading</a>'
    }];

    $scope.addEvent = function () {
        $scope.events.push({
            badgeClass: 'info',
            badgeIconClass: 'glyphicon-check',
            title: 'First heading',
            when: '3 hours ago via Twitter',
            content: 'Some awesome content.'
        });

    };
    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementIn = function ($el) {
        $el.removeClass('timeline-hidden');
        $el.addClass('bounce-in');
    };

    // optional: not mandatory (uses angular-scroll-animate)
    $scope.animateElementOut = function ($el) {
        $el.addClass('timeline-hidden');
        $el.removeClass('bounce-in');
    };

    $scope.leftAlign = function () {
        $scope.side = 'left';
    }

    $scope.rightAlign = function () {
        $scope.side = 'right';
    }

    $scope.defaultAlign = function () {
        $scope.side = ''; // or 'alternate'
    }    
    /**/
}]);