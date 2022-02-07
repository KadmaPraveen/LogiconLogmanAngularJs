//angular.module('LogiCon').controller('OrderInquiryCntrl', ['$scope', function ($scope) {
//    var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. " +
//                      "Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor." +
//                      "Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, " +
//                      "ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor." +
//                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

//    $scope.side = '';

//    $scope.events = [{
//        badgeClass: 'info',
//        badgeIconClass: 'glyphicon-check',
//        title: 'First heading',
//        when: '11 hours ago via Twitter',
//        content: 'Some awesome content.'
//    }, {
//        badgeClass: 'warning',
//        badgeIconClass: 'glyphicon-credit-card',
//        title: 'Second heading',
//        when: '12 hours ago via Twitter',
//        content: 'More awesome content.'
//    }, {
//        badgeClass: 'default',
//        badgeIconClass: 'glyphicon-credit-card',
//        title: 'Third heading',
//        titleContentHtml: '<img class="img-responsive" src="http://www.freeimages.com/assets/183333/1833326510/wood-weel-1444183-m.jpg">',
//        contentHtml: lorem,
//        footerContentHtml: '<a href="">Continue Reading</a>'
//    }];

//    $scope.addEvent = function () {
//        $scope.events.push({
//            badgeClass: 'info',
//            badgeIconClass: 'glyphicon-check',
//            title: 'First heading',
//            when: '3 hours ago via Twitter',
//            content: 'Some awesome content.'
//        });

//    };
//    // optional: not mandatory (uses angular-scroll-animate)
//    $scope.animateElementIn = function ($el) {
//        $el.removeClass('timeline-hidden');
//        $el.addClass('bounce-in');
//    };

//    // optional: not mandatory (uses angular-scroll-animate)
//    $scope.animateElementOut = function ($el) {
//        $el.addClass('timeline-hidden');
//        $el.removeClass('bounce-in');
//    };

//    $scope.leftAlign = function () {
//        $scope.side = 'left';
//    }

//    $scope.rightAlign = function () {
//        $scope.side = 'right';
//    }

//    $scope.defaultAlign = function () {
//        $scope.side = ''; // or 'alternate'
//    }
//}]);

angular.module('LogiCon').controller('OrderInquiryCntrl', ['$scope', 'OrderInquiryService', '$q', 'UtilityFunc', 'growlService', '$stateParams', '$state',
function ($scope, OrderInquiryService, $q, UtilityFunc, growlService, $stateParams, $state) {

    $scope.currentPage = 1;
    $scope.limit = 10;
    $scope.i = {};

    $scope.dateFormat = UtilityFunc.DateFormat();
    $scope.dataGridNorecords = UtilityFunc.DataGridNorecords();
    $scope.i.DateFrom = UtilityFunc.FirstDateOfMonth(); //new Date(d.getFullYear(), d.getMonth(), 1);
    $scope.i.DateTo = moment();

    $scope.GetOrderInquiry = function (obj) {
        OrderInquiryService.SearchRegisteredCompanies(obj).then(function (d) {
            $scope.declarations = d.data.declarations;
            $scope.totalItems = d.data.recordsCount;
        }, function (err) { });

    };

    $scope.isFrmSearchValid = false;
    $scope.$watch('frmSearch.$valid', function (isValid) {
        $scope.isFrmSearchValid = isValid;
    });

    $scope.pageChanged = function () {
        $scope.SearchRegisteredCompanies();
    };


    //$scope.viewInfo = function (orderno) {
    //    $location.path('/Inquiry/OrderInquiry/' + orderno);
    //};

    //$scope.viewInfo2 = function (orderno) {
    //    $location.path('/Inquiry/orderentry/' + orderno);
    //};
    $scope.refresh = function () {
        //$route.reload();
        $state.transitionTo($state.current, $stateParams, {
            reload: true,
            inherit: false,
            notify: true
        });
    };

    $scope.OrderInquirySearch = function (i) {
        
        //if ($scope.isFrmSearchValid) {
        //    OrderInquiryService.OrderInquirySearch(i).then(function (d) {
        //        
        //    }, function (err) { });
        //} else {
        //    growl.error('Please enter all mandatory fields.');
        //}
        OrderInquiryService.OrderInquirySearch(i).then(function (d) {
            $scope.orders = d.data;
        }, function (err) { });
    };
}]);