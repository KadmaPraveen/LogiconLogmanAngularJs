/// <reference path="C:\Users\LOGICON LENOVO\AppData\Roaming\Skype\My Skype Received Files\LogiConUI\LogiConUI\js/Admin/Controllers/UserProfileController.js" />
/// <reference path="C:\Users\LOGICON LENOVO\AppData\Roaming\Skype\My Skype Received Files\LogiConUI\LogiConUI\js/Admin/Services/UserProfileService.js" />

app.config(function ($stateProvider, $urlRouterProvider, Utility, $ocLazyLoadProvider, $httpProvider, $mdDateLocaleProvider, $sceProvider, $uibModalProvider, $uibTooltipProvider) {

    $uibModalProvider.options.backdrop = 'static';
    $uibModalProvider.options.keyboard = false;

    $uibTooltipProvider.options({
        appendToBody: true
    });

    $sceProvider.enabled(false);

    $stateProvider
        .state('user', {
            url: '/user',
            templateUrl: 'Js/Home/Views/dashboard.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([

                        {
                            name: 'Logicon',
                            files: ['js/Home/controller/HomeController.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/Operation/Services/VesselScheduleService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/PortAreaService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('owner', {
            url: '/owner',
            templateUrl: 'Js/Home/Views/owner-dashboard.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Home/controller/OwnerDashboardController.js?v=' + Utility.Version,
                            'js/Home/Services/OwnerService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        /* operation module starts */
        .state('orderentrylist', {
            url: '/orderentrylist',
            templateUrl: 'Js/Operation/Views/OrderEntry/orderentrylist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                'js/Operation/controllers/OrderEntryListController.js?v=' + Utility.Version,
                                'js/Operation/Services/OrderEntryListService.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })
        .state('orderentry', {
            //url: '/orderentry/',
            //params: { orderno: 'NEW', IsWeb: false, branchId: null, orderOwner: null },
            url: '/orderentry/:orderno/:IsWeb/:branchId/:orderOwner',
            //params: { orderno: 'NEW', IsWeb: false, branchId: null, orderOwner: null },
            templateUrl: 'Js/Operation/Views/OrderEntry/orderentry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Operation/controllers/OrderEntryController.js?v=' + Utility.Version,
                            'js/Operation/controllers/AddOrderEntryContainer.js?v=' + Utility.Version,
                            'js/Operation/controllers/AddOrderEntryTransport.js?v=' + Utility.Version,
                            'js/Operation/controllers/AddOrderEntryCargo.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/Operation/Services/VesselScheduleService.js?v=' + Utility.Version,
                            'js/MasterData/Services/JobCategoryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/AddressService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/HSCodeService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/PortAreaService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/JobCategoryChargesService.js?v=' + Utility.Version,
                            'js/declaration/services/k1Service.js?v=' + Utility.Version,
                            'js/declaration/services/k2Service.js?v=' + Utility.Version, ]
                        }
                    ])
                }
            }
        })
        /*Web Order : Maruthi*/

        .state('weborderslist', {
            url: '/weborderslist',
            templateUrl: 'Js/Operation/Views/WebOrder/weborderlist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                'js/Operation/controllers/OrderEntryListController.js?v=' + Utility.Version,
                                'js/Operation/Services/OrderEntryListService.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })
        /* operation module ends */

         .state('declarationInquiry', {
             url: '/declarationInquiry',
             templateUrl: 'Js/Declaration/Views/DeclarationInquiry.html?v=' + Utility.Version,
             resolve: {
                 loadPlugin: function ($ocLazyLoad) {
                     return $ocLazyLoad.load([
                         {
                             name: 'LogiCon',
                             files: [
                                 'js/declaration/controllers/declarationInquiry.js?v=' + Utility.Version,
                                 'js/declaration/services/declarationService.js?v=' + Utility.Version
                             ]
                         }
                     ])
                 }
             }
         })


        .state('k1Inquiry', {
            url: '/k1Inquiry',
            templateUrl: 'Js/Declaration/Views/k1Inquiry/k1Inquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                'js/declaration/controllers/k1Inquiry.js?v=' + Utility.Version,
                                'js/declaration/services/k1Service.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })




        .state('1customs', {
            url: '/1customs',
            templateUrl: 'Js/declaration/Views/1Customs/1Customs.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/declaration/controllers/k1Controller.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('k1declaration', {
            url: '/k1declaration/:declarationNo',
            templateUrl: 'Js/declaration/Views/k1/k1declaration.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/declaration/controllers/k1Controller.js?v=' + Utility.Version,
                            'js/declaration/controllers/AddEditItemEntry.js?v=' + Utility.Version,
                            'js/declaration/controllers/AddDownload.js?v=' + Utility.Version,
                            'js/declaration/services/k1Service.js?v=' + Utility.Version,
                            'js/declaration/services/ItemEntryService.js?v=' + Utility.Version,
                            'js/MasterData/services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/services/PortAreaService.js?v=' + Utility.Version,
                            'js/MasterData/services/CurrencyRateService.js?v=' + Utility.Version,
                            'js/Operation/services/OrderEntryService.js?v=' + Utility.Version,
                            'js/Operation/services/VesselScheduleService.js?v=' + Utility.Version,
                            'js/MasterData/services/VesselMasterService.js?v=' + Utility.Version,
                            'js/declaration/controllers/k1Clause.js?v=' + Utility.Version,
                            'js/declaration/controllers/k1Document.js?v=' + Utility.Version,
                            'js/MasterData/Services/AddressService.js?v=' + Utility.Version,
                            'js/MasterData/Services/HSCodeService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomDeclarantService.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })

        .state('k1AInquiry', {
            url: '/k1AInquiry',
            templateUrl: 'Js/Declaration/Views/k1AInquiry/k1AInquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                'js/declaration/controllers/k1AInquiry.js?v=' + Utility.Version,
                                'js/declaration/services/k1AService.js?v=' + Utility.Version,
                            ]
                        }
                    ])
                }
            }
        })

        .state('k1Adeclaration', {
            url: '/k1Adeclaration/:declarationNo',
            templateUrl: 'Js/Declaration/Views/k1A/k1Adeclaration.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                  'js/declaration/controllers/k1AController.js?v=' + Utility.Version,
                                  'js/declaration/services/k1AService.js?v=' + Utility.Version,
                                  'js/MasterData/services/PortAreaService.js?v=' + Utility.Version,
                                  'js/Operation/services/OrderEntryService.js?v=' + Utility.Version,
                                  'js/MasterData/Services/CustomDeclarantService.js?v=' + Utility.Version,
                                  'js/MasterData/services/MerchantProfileService.js?v=' + Utility.Version,
                                  'js/MasterData/Services/AddressService.js?v=' + Utility.Version,
                            ]
                        }
                    ])
                }
            }
        })

        .state('k2Inquiry', {
            url: '/k2Inquiry',
            templateUrl: 'Js/Declaration/Views/k2Inquiry/k2Inquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                'js/declaration/controllers/k2Inquiry.js?v=' + Utility.Version,
                                'js/declaration/services/k2Service.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })
        .state('k2declaration', {
            url: '/k2declaration/:declarationNo',
            templateUrl: 'Js/declaration/Views/k2/k2declaration.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/declaration/controllers/k2Controller.js?v=' + Utility.Version,
                            'js/declaration/controllers/k2ItemEntry.js?v=' + Utility.Version,
                            'js/declaration/controllers/AddDownload.js?v=' + Utility.Version,
                            'js/declaration/services/k2Service.js?v=' + Utility.Version,
                            'js/declaration/services/ItemEntryService.js?v=' + Utility.Version,
                            'js/MasterData/services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/services/PortAreaService.js?v=' + Utility.Version,
                            'js/MasterData/services/CurrencyRateService.js?v=' + Utility.Version,
                            'js/Operation/services/OrderEntryService.js?v=' + Utility.Version,
                            'js/Operation/services/VesselScheduleService.js?v=' + Utility.Version,
                            'js/MasterData/services/VesselMasterService.js?v=' + Utility.Version,
                            'js/MasterData/Services/AddressService.js?v=' + Utility.Version,
                            'js/declaration/controllers/k2Document.js?v=' + Utility.Version,
                            'js/declaration/controllers/k2Clause.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version,
                            'js/MasterData/Services/HSCodeService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomDeclarantService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })

        .state('k3Inquiry', {
            url: '/k3Inquiry',
            templateUrl: 'Js/Declaration/Views/k3Inquiry/k3Inquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                'js/declaration/controllers/k3Inquiry.js?v=' + Utility.Version,
                                'js/declaration/services/k3Service.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })
        .state('k3declaration', {
            url: '/k3declaration/:declarationNo',
            templateUrl: 'Js/Declaration/Views/k3/k3declaration.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/declaration/controllers/k3Controller.js?v=' + Utility.Version,
                            'js/declaration/controllers/k3ItemEntry.js?v=' + Utility.Version,
                            'js/declaration/controllers/AddDownload.js?v=' + Utility.Version,
                            'js/declaration/services/k3Service.js?v=' + Utility.Version,
                            'js/declaration/services/ItemEntryService.js?v=' + Utility.Version,
                            'js/MasterData/services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/services/PortAreaService.js?v=' + Utility.Version,
                            'js/MasterData/services/CurrencyRateService.js?v=' + Utility.Version,
                            'js/Operation/services/OrderEntryService.js?v=' + Utility.Version,
                            'js/Operation/services/VesselScheduleService.js?v=' + Utility.Version,
                            'js/MasterData/services/VesselMasterService.js?v=' + Utility.Version,
                            //'js/declaration/controllers/k3Clause.js?v=' + Utility.Version,
                            'js/declaration/controllers/k3Document.js?v=' + Utility.Version,
                            'js/MasterData/Services/AddressService.js?v=' + Utility.Version,
                            'js/admin/Services/DeclarantService.js?v=' + Utility.Version,
                            'js/MasterData/Services/HSCodeService.js?v=' + Utility.Version,
                            'js/declaration/controllers/AddEditk3ContainerInfoController.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomDeclarantService.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })

        .state('k8Inquiry', {
            url: '/k8Inquiry',
            templateUrl: 'Js/Declaration/Views/k8Inquiry/k8Inquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                'js/declaration/controllers/k8Inquiry.js?v=' + Utility.Version,
                                'js/declaration/services/k8Service.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })
        .state('k8declaration', {
            url: '/k8declaration/:declarationNo',
            templateUrl: 'Js/Declaration/Views/k8/k8declaration.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/declaration/controllers/k8Controller.js?v=' + Utility.Version,
                            'js/declaration/controllers/k8ItemEntry.js?v=' + Utility.Version,
                            'js/declaration/controllers/AddDownload.js?v=' + Utility.Version,
                            'js/declaration/services/k8Service.js?v=' + Utility.Version,
                            'js/declaration/services/ItemEntryService.js?v=' + Utility.Version,
                            'js/MasterData/services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/services/PortAreaService.js?v=' + Utility.Version,
                            'js/MasterData/services/CurrencyRateService.js?v=' + Utility.Version,
                            'js/Operation/services/OrderEntryService.js?v=' + Utility.Version,
                            'js/Operation/services/VesselScheduleService.js?v=' + Utility.Version,
                            'js/MasterData/services/VesselMasterService.js?v=' + Utility.Version,
                            'js/declaration/controllers/k8Conveyance.js?v=' + Utility.Version,
                            'js/declaration/controllers/k8Document.js?v=' + Utility.Version,
                            'js/MasterData/Services/AddressService.js?v=' + Utility.Version,
                            'js/declaration/services/k1Service.js?v= ' + Utility.Version,
                             'js/declaration/services/k2Service.js?v= ' + Utility.Version,
                            'js/MasterData/Services/HSCodeService.js?v=' + Utility.Version,
                            'js/declaration/controllers/AddOrEditK8Container.js?v=' + Utility.Version,
                            'js/declaration/controllers/k8ItemEntryExportCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomDeclarantService.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })

        .state('k9Inquiry', {
            url: '/k9Inquiry',
            templateUrl: 'Js/Declaration/Views/k9Inquiry/k9Inquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                'js/declaration/controllers/k9Inquiry.js?v=' + Utility.Version,
                                'js/declaration/services/k9Service.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })
        .state('k9declaration', {
            url: '/k9declaration/:declarationNo',
            templateUrl: 'Js/Declaration/Views/k9/k9declaration.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/declaration/controllers/k9Controller.js?v=' + Utility.Version,
                            'js/declaration/controllers/k9ItemEntry.js?v=' + Utility.Version,
                            'js/declaration/controllers/AddDownload.js?v=' + Utility.Version,
                            'js/declaration/controllers/AddEditContainerInfoCntrl.js?v=' + Utility.Version,
                            'js/declaration/services/k9Service.js?v=' + Utility.Version,
                            'js/declaration/services/ItemEntryService.js?v=' + Utility.Version,
                            'js/MasterData/services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/services/PortAreaService.js?v=' + Utility.Version,
                            'js/MasterData/services/CurrencyRateService.js?v=' + Utility.Version,
                            'js/Operation/services/OrderEntryService.js?v=' + Utility.Version,
                            'js/Operation/services/VesselScheduleService.js?v=' + Utility.Version,
                            'js/MasterData/services/VesselMasterService.js?v=' + Utility.Version,
                            'js/declaration/controllers/k9Clause.js?v=' + Utility.Version,
                            'js/declaration/controllers/k9Document.js?v=' + Utility.Version,
                            'js/MasterData/Services/HSCodeService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomDeclarantService.js?v=' + Utility.Version,
                            'js/MasterData/Services/AddressService.js?v=' + Utility.Version,
                             'js/declaration/services/k8Service.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })

        .state('registration', {
            url: '/registration',
            templateUrl: 'Js/Home/Views/Registration.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: [
                                'js/Home/controller/RegistrationController.js?v=' + Utility.Version,
                                'js/Home/Services/RegistrationService.js?v=' + Utility.Version,
                                'js/MasterData/Services/CountryService.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })
        .state('registrationuserID', {
            url: '/registration/:userID',
            templateUrl: 'Js/Home/Views/Registration.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/RegistrationController.js?v=' + Utility.Version,
                            'js/Home/Services/RegistrationService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('forgotpassword', {
            url: '/forgotpassword',
            templateUrl: 'Js/Home/Views/forgotpassword.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/RegistrationController.js?v=' + Utility.Version,
                            'js/Home/Services/RegistrationService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('emailverification/:uniqueid', {
            url: '/emailverification/:uniqueid',
            templateUrl: 'Js/Home/Views/Emailverification.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/EmailVerificationController.js?v=' + Utility.Version,
                            'js/Home/Services/VerificationService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('login', {
            url: '/login',
            templateUrl: 'Js/Home/Views/login.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/LoginController.js?v=' + Utility.Version,
                            'js/Home/Services/RegistrationService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('registeredcompany', {
            url: '/registeredcompany',
            templateUrl: 'Js/Home/Views/registeredcompany.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/RegisteredCompanyController.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('home', {
            url: '/home',
            templateUrl: 'Js/Home/Views/dashboard.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/HomeController.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/Operation/Services/VesselScheduleService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/PortAreaService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })

        .state('company', {
            url: '/company',
            templateUrl: 'Js/MasterData/Views/Company/company.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/Company.js?v=' + Utility.Version,
                            'js/MasterData/Services/CompanyService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('companydetails', {
            url: '/companydetails/:companyID',
            templateUrl: 'Js/Home/Views/companydetails.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Home/controller/CompanyDetailsController.js?v=' + Utility.Version,
                            'js/Home/Services/CompanyDetailsService.js?v=' + Utility.Version,
                            'js/Home/Services/RegisteredCompanyService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })

        .state('merchantlist', {
            url: '/merchantlist',
            templateUrl: 'Js/MasterData/Views/MerchantProfile/merchantprofilelist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/MerchantProfile.js?v=' + Utility.Version,
                            'js/MasterData/controllers/addEditAddressCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('merchant', {
            url: '/merchant/',
            params: {
                code: null,
                taxID: null,
                regNo: null,
                isOriginal: null
            },
            templateUrl: 'Js/MasterData/Views/MerchantProfile/merchant.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/MerchantProfile.js?v=' + Utility.Version,
                            'js/MasterData/controllers/addEditAddressCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('userlist', {
            url: '/userlist',
            templateUrl: 'Js/admin/Views/userprofile/userlist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/userslistcontroller.js?v=' + Utility.Version,
                            'js/admin/services/userprofileservice.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('roles', {
            url: '/roles',
            templateUrl: 'Js/admin/Views/Roles/Roles.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'Logicon',
                        files: ['js/admin/controllers/RolesController.js?v=' + Utility.Version,
                        'js/admin/controllers/EditRoleController.js?v=' + Utility.Version,
                        'js/admin/services/RolesService.js?v=' + Utility.Version]
                    }]);
                }
            }
        })

        .state('rolerights', {
            url: '/rolerights',
            templateUrl: 'Js/admin/Views/Roles/RoleRights.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'Logicon',
                        files: ['js/admin/controllers/RoleRightsController.js?v=' + Utility.Version,
                        'js/admin/services/RolesService.js?v=' + Utility.Version,
                        'js/admin/services/SecurablesService.js?v=' + Utility.Version]
                    }]);
                }
            }
        })
        //.state('userprofile', {
        //    url: '/userlist',
        //    templateUrl: 'Js/admin/Views/userprofile/userprofile.html?v=' + Utility.Version,
        //    resolve: {
        //        lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
        //            return $ocLazyLoad.load(
        //                {
        //                    name: 'Logicon',
        //                    files: ['js/admin/controllers/userprofilecontroller.js?v=' + Utility.Version,
        //                            'js/admin/services/userprofileservice.js?v=' + Utility.Version,
        //                            'js/Security/Services/SecurableService.js?v=' + Utility.Version]
        //                }
        //            );
        //        }]
        //    }
        //})

        .state('userprofile', {
            url: '/userprofile/:userID',
            templateUrl: 'Js/admin/Views/userprofile/userprofile.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Admin/Controllers/UserProfileController.js?v=' + Utility.Version,
                            'js/admin/services/UserProfileService.js?v=' + Utility.Version,
                            'js/Security/Services/SecurableService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('standardtariff', {
            url: '/standardtariff',
            templateUrl: 'Js/MasterData/Views/StandardTariff/StandardTariff.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/StandardTariffCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/TariffService.js?v=' + Utility.Version,
                            'js/MasterData/controllers/TariffDetailCntrl.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })


        .state('Associationdiscountlist', {
            url: '/Associationdiscountlist',
            templateUrl: 'Js/MasterData/Views/AssociationTariff/AssociationTarifflist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/AssociationTariffCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/TariffService.js?v=' + Utility.Version,
                            'js/MasterData/controllers/TariffDetailCntrl.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('Associationtariff', {
            url: '/Associationtariff/:tariffno',
            templateUrl: 'Js/MasterData/Views/AssociationTariff/AssociationTariff.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/AssociationTariffCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/TariffService.js?v=' + Utility.Version,
                            'js/MasterData/controllers/TariffDetailCntrl.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        //.state('Associationtariff', {
        //    url: '/Associationtariff',
        //    templateUrl: 'Js/MasterData/Views/DiscountTariff/AssociationTariff.html?v=' + Utility.Version,
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'Logicon',
        //                    files: ['js/MasterData/controllers/AssociationTariffCntrl.js?v=' + Utility.Version,
        //                            'js/MasterData/Services/TariffService.js?v=' + Utility.Version,
        //                            'js/MasterData/controllers/TariffDetailCntrl.js?v=' + Utility.Version]
        //                }
        //            ]);
        //        }
        //    }
        //})

        .state('AssociationList', {
            url: '/AssociationList',
            templateUrl: 'Js/admin/Views/AssociationList/associationlist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/AssociationListController.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version,
                            'js/admin/Services/AssociationListService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('MerchantProfileList', {
            url: '/MerchantProfileList',
            templateUrl: 'Js/admin/Views/MerchantProfileList/MerchantProfileList.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'Logicon',
                        files: ['js/admin/controllers/AdminMerchantProfile.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version]
                    }]);
                }
            }
        })
        .state('adminmerchant', {
            url: '/adminmerchant/',
            params: {
                code: null,
                taxID: null,
                regNo: null,
                isOriginal: null
            },
            templateUrl: 'Js/admin/Views/MerchantProfileList/adminmerchant.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/AdminMerchantProfile.js?v=' + Utility.Version,
                            'js/MasterData/controllers/addEditAddressCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }
        })
        .state('DeclarantList', {
            url: '/DeclarantList',
            templateUrl: 'Js/admin/Views/Declarants/DeclarantsList.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/DeclarantListController.js?v=' + Utility.Version,
                            'js/admin/Services/DeclarantService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('Declarant', {
            url: '/Declarant/:declarantno',
            templateUrl: 'Js/admin/Views/Declarants/Declarant.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/DeclarantController.js?v=' + Utility.Version,
                            'js/admin/Services/DeclarantService.js?v=' + Utility.Version,
                            'js/admin/Services/UserProfileService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('ClaimantList', {
            url: '/ClaimantList',
            templateUrl: 'Js/admin/Views/Claimant/ClaimantList.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/ClaimantListController.js?v=' + Utility.Version,
                            'js/admin/Services/ClaimantService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('Claimant', {
            url: '/Claimant/:ClaimantID',
            templateUrl: 'Js/admin/Views/Claimant/Claimant.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/ClaimantController.js?v=' + Utility.Version,
                            'js/admin/Services/ClaimantService.js?v=' + Utility.Version,
                            'js/admin/Services/UserProfileService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('Clause', {
            url: '/Clause',
            templateUrl: 'Js/admin/Views/DeclarationClause/DeclarationClause.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/DeclarationClauseController.js?v=' + Utility.Version,
                            'js/admin/Services/ClauseService.js?v=' + Utility.Version]

                        }
                    ]);
                }
            }
        })

        .state('EmailSetting', {
            url: '/Email',
            templateUrl: 'Js/admin/Views/EmailSetting/EmailSetting.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/EmailSettingController.js?v=' + Utility.Version,
                            'js/admin/Services/EmailSettingService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('Association', {
            url: '/Association/:associationID',
            templateUrl: 'Js/admin/Views/AssociationList/associationheader.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/AssociationHeaderController.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version,
                            'js/admin/Services/AssociationListService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CompanyService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('snnupdate', {
            url: '/snnupdate',
            templateUrl: 'js/admin/CompanyProfile/Views/snnlist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/CompanyProfile/Controller/snnupdates.js?v=' + Utility.Version,
                            'js/admin/Services/SnnService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })


        .state('CompanyBilling', {
            url: '/CompanyBilling',
            templateUrl: 'Js/admin/Views/CompanyBilling/CompanyBilling.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/admin/controllers/CompanyBillingController.js?v=' + Utility.Version,
                            'js/MasterData/Services/CompanyService.js?v=' + Utility.Version,
                            'js/Billing/Services/StatementService.js?v=' + Utility.Version,
                            'js/Reports/services/operationalservice.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('map', {
            url: '/map',
            templateUrl: 'Js/Home/Views/map.html?v=' + Utility.Version
        })

        .state('vesselprofilelist', {
            url: '/vesselprofilelist',
            templateUrl: 'Js/Operation/Views/VesselProfile/vesselprofilelist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Operation/controllers/VesselProfile.js?v=' + Utility.Version,
                            'js/Operation/Services/VesselProfileService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('vesselprofile', {
            url: '/vesselprofile/:vesselID',
            templateUrl: 'Js/Operation/Views/VesselProfile/vesselprofile.html?v=' + Utility.Version,
            //templateUrl: function ($stateParams) {
            //    
            //    return Utility.ServiceUrl + '/Operation/VesselProfile/page/' + $stateParams.vesselID + '?v=' + Utility.Version
            //},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Operation/controllers/VesselProfile.js?v=' + Utility.Version,
                            'js/Operation/Services/VesselProfileService.js?v=' + Utility.Version,
                            'js/Operation/controllers/addEditVesselScheduleCntrl.js?v=' + Utility.Version,
                            'js/Operation/Services/VesselScheduleService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/PortAreaService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('vesselschedule', {
            url: '/vesselschedule',
            templateUrl: 'Js/Operation/Views/VesselSchedule/vesselschedule.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Operation/controllers/VesselSchedule.js?v=' + Utility.Version,
                            'js/Operation/controllers/addEditVesselScheduleCntrl.js?v=' + Utility.Version,
                            'js/Operation/Services/VesselScheduleService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/PortAreaService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })
        .state('orderinquiry', {
            url: '/orderinquiry',
            templateUrl: 'Js/Inquiry/Views/OrderInquiry/orderinquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'LogiCon',
                            files: ['js/Inquiry/controllers/OrderInquiryCntrl.js?v=' + Utility.Version,
                            'js/Inquiry/services/OrderInquiryService.js?v=' + Utility.Version]
                        }
                    ])
                }
            }
        })

        .state('depotbookingentrylist', {
            url: '/depotbookingentrylist',
            templateUrl: 'Js/Depot/Views/BookingEntry/depotbookingentrylist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['Js/Depot/Controllers/DepotBookingEntryListController.js?v=' + Utility.Version,
                                'Js/Depot/Services/DepotBookingEntryService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }
        })
        .state('depotbookingentry', {
            url: '/depotbookingentry/:orderNo',
            templateUrl: 'Js/Depot/Views/BookingEntry/depotbookingentry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['Js/Depot/Controllers/DepotBookingEntry.js?v=' + Utility.Version,
                                'Js/Depot/Controllers/DepotBookingContainerInfoCntrl.js?v=' + Utility.Version,
                                'Js/Depot/Services/DepotBookingEntryService.js?v=' + Utility.Version,
                                'js/MasterData/services/VesselMasterService.js?v=' + Utility.Version,
                                'js/Operation/Services/VesselScheduleService.js?v=' + Utility.Version,
                                'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                                 'Js/MasterData/Services/PortAreaService.js?v=' + Utility.Version,
                                 'js/MasterData/Services/JobCategoryChargesService.js?v=' + Utility.Version,
                                 'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version
                            ]
                        }
                    ])
                }
            }
        })
        .state('depotgatein', {
            url: '/depotgatein',
            templateUrl: 'Js/Depot/Views/GateIn/depotgatein.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'Logicon',
                        files: [
                            'Js/Depot/Controllers/depotgatein.js?v=' + Utility.Version,
                            'Js/Depot/Services/DepotGateInService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'Js/Depot/Services/DepotBookingEntryService.js?v=' + Utility.Version,
                             'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                             'js/MasterData/services/VesselMasterService.js?v=' + Utility.Version,
                             'js/MasterData/Services/CountryService.js?v=' + Utility.Version,
                        ]
                    }]);
                }
            }
        })
        .state('depotgateout', {
            url: '/depotgateout',
            templateUrl: 'Js/Depot/Views/GateOut/depotgateout.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'Logicon',
                        files: [
                            'Js/Depot/Controllers/depotgateout.js?v=' + Utility.Version,
                             'Js/Depot/Services/DepotGateInService.js?v=' + Utility.Version,
                               'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'Js/Depot/Services/DepotBookingEntryService.js?v=' + Utility.Version,
                             'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                             'js/MasterData/services/VesselMasterService.js?v=' + Utility.Version,
                             'js/MasterData/Services/CountryService.js?v=' + Utility.Version,
                        ]
                    }]);
                }
            }
        })


        .state('bookingentrylist', {
            url: '/bookingentrylist',
            templateUrl: 'Js/Port/Views/BookingEntry/bookingentrylist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['Js/Port/Controllers/BookingEntryListController.js?v=' + Utility.Version,
                            'Js/Port/Services/BookingEntryListService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/port/Services/BookingEntryService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('bookingentry', {
            url: '/bookingentry/:orderNo',
            templateUrl: 'Js/Port/Views/BookingEntry/bookingentry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['Js/port/Controllers/BookingEntry.js?v=' + Utility.Version,
                            'Js/port/Controllers/VASChargesCntrl.js?v=' + Utility.Version,
                            'Js/port/Controllers/BookingContainerInfoCntrl.js?v=' + Utility.Version,
                            'js/port/Services/BookingEntryService.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/JobCategoryChargesService.js?v=' + Utility.Version,
                            'js/MasterData/Services/VesselMasterService.js?v=' + Utility.Version,
                            'js/Operation/Services/VesselScheduleService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/PortAreaService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('gatein', {
            url: '/gatein',
            templateUrl: 'Js/Port/Views/GateIn/gatein.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Port/controllers/GateIn.js?v=' + Utility.Version,
                            'js/Port/Services/GateInService.js?v=' + Utility.Version,
                            'js/Port/Services/BookingEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/VesselMasterService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('gateout', {
            url: '/gateout',
            templateUrl: 'Js/Port/Views/GateOut/gateout.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Port/controllers/GateOut.js?v=' + Utility.Version,
                            'js/Port/Services/GateInService.js?v=' + Utility.Version,
                            'js/Port/Services/BookingEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/VesselMasterService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('operational', {
            url: '/operational',
            templateUrl: 'Js/Reports/Views/Operational/operational.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Reports/controllers/OperationalReports.js?v=' + Utility.Version,
                            'js/Reports/services/operationalservice.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('statutory', {
            url: '/statutory',
            templateUrl: 'Js/Reports/Views/Statutory/statutory.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Reports/controllers/StatutoryReports.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('management', {
            url: '/management',
            templateUrl: 'Js/Reports/Views/management/management.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Reports/controllers/ManagementReports.js?v=' + Utility.Version,
                                'js/Reports/services/operationalservice.js?v=' + Utility.Version,
                                'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('chargecodelist', {
            url: '/chargecodelist',
            templateUrl: 'Js/MasterData/Views/ChargeCode/chargecodelist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/ChargeCode.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/MasterData/Services/GstRateService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('chargecodemaster', {
            url: '/chargecodemaster/:chargecode',
            templateUrl: 'Js/MasterData/Views/ChargeCode/chargecodemaster.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/ChargeCode.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/MasterData/Services/GstRateService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('processmaster', {
            url: '/processmaster',
            templateUrl: 'Js/MasterData/Views/ProcessMaster/processmaster.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/ProcessMaster.js?v=' + Utility.Version,
                            'js/MasterData/controllers/AddProcessMasterCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/ProcessMasterService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CompanyService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })



        .state('jobcategory', {
            url: '/jobcategory',
            templateUrl: 'Js/MasterData/Views/JobCategory/jobcategory.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/JobCategory.js?v=' + Utility.Version,
                            'js/MasterData/controllers/addEditJobCategoryCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditChargesCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/JobCategoryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/JobCategoryChargesService.js?v=' + Utility.Version,
                            'js/MasterData/Services/ProcessMasterService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CompanyService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('addjobcategory', {
            url: '/addjobcategory/:code',
            templateUrl: 'Js/MasterData/Views/JobCategory/addjobcategory.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/JobCategory.js?v=' + Utility.Version,
                            'js/MasterData/controllers/addEditJobCategoryCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditChargesCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/JobCategoryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/ProcessMasterService.js?v=' + Utility.Version,
                            'js/MasterData/Services/JobCategoryChargesService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CompanyService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('gstrate', {
            url: '/gstrate',
            templateUrl: 'Js/MasterData/Views/GSTRate/gstrate.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/GSTRateCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/AddEditGSTRateCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/GstRateService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('productmaster', {
            url: '/productmaster',
            templateUrl: 'Js/MasterData/Views/ProductMaster/productmaster.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/ProductMasterCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/ProductMasterService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            ]
                        }
                    ]);
                }
            }
        })

        .state('productlocation', {
            url: '/productlocation',
            templateUrl: 'Js/MasterData/ProductLocation/Views/productlocation.html?v=' + Utility.Version
        })

        .state('warehouse', {
            url: '/warehouse',
            templateUrl: 'Js/MasterData/WareHouse/Views/warehouse.html?v=' + Utility.Version
        })

        .state('cfs', {
            url: '/cfs',
            templateUrl: 'Js/MasterData/CFS/Views/cfs.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/CFS/Controllers/CFSController.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('zonemaster', {
            url: '/zonemaster',
            templateUrl: 'Js/MasterData/ZoneMaster/Views/zonemaster.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/ZoneMaster/Controllers/ZoneMasterController.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('drivermasterlist', {
            url: '/drivermasterlist',
            templateUrl: 'Js/MasterData/Views/DriverMaster/drivermasterlist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/DriverMasterCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/DriverMasterService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('drivermaster', {
            url: '/drivermaster/:driverId',
            templateUrl: 'Js/MasterData/Views/DriverMaster/drivermaster.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/DriverMasterCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/DriverMasterService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('truckmaster', {
            url: '/truckmaster',
            templateUrl: 'Js/MasterData/Views/TruckMaster/truckmaster.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/TruckMasterController.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditTruckController.js?v=' + Utility.Version,
                            'js/MasterData/Services/TruckMasterService.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/DriverMasterService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('trailermaster', {
            url: '/trailermaster',
            templateUrl: 'Js/MasterData/Views/TrailerMaster/trailermaster.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/TrailerMasterController.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditTrailerController.js?v=' + Utility.Version,
                            'Js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/TrailerMasterService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('driverassignment', {
            url: '/driverassignment',
            templateUrl: 'Js/MasterData/DriverAssignment/Views/driverassignment.html?v=' + Utility.Version
        })

        .state('driverallocation', {
            url: '/driverallocation',
            templateUrl: 'Js/MasterData/DriverAllocation/Views/driverallocation.html?v=' + Utility.Version
        })
        .state('portareacode', {
            url: '/portareacode',
            templateUrl: 'Js/MasterData/Views/PortAreaCode/portareacode.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/PortAreaCodeCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditPortAreaCntrl.js?v=' + Utility.Version,
                            'Js/MasterData/Services/CountryService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/PortAreaService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('currencyrate', {
            url: '/currencyrate',
            templateUrl: 'Js/MasterData/Views/CurrencyRate/currencyrate.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/CurrencyRateCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditExpiryExchangeCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/CurrencyService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CurrencyRateService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('railterminal', {
            url: '/railterminal',
            templateUrl: 'Js/MasterData/RailTerminal/Views/railterminal.html?v=' + Utility.Version
        })

        .state('holiday', {
            url: '/holiday',
            templateUrl: 'Js/MasterData/Views/Holiday/holidaylist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/Controllers/HolidayCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Controllers/AddEditHolidayCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/HolidayService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('pudomaster', {
            url: '/pudomaster',
            templateUrl: 'Js/MasterData/Views/PUDOMaster/pudomaster.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/PUDOMasterCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/AddEditPUDOMasterCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/PUDOMasterService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('equipmentsizetype', {
            url: '/equipmentsizetype',
            templateUrl: 'Js/MasterData/Views/EquipmentSizeType/equipmentsizetype.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/EquipmentSizeTypeCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/AddEditEquipmentSizeTypeCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/EquipmentSizeTypeService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('containerstatus', {
            url: '/containerstatus',
            templateUrl: 'Js/MasterData/Views/ContainerStatus/containerstatus.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/ContainerStatusCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/AddEditContainerStatusCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/ContainerStatusService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('countries', {
            url: '/countries',
            templateUrl: 'Js/MasterData/Views/Country/countries.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/CountryCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditCountryCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/CountryService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('currencylist', {
            url: '/currencylist',
            templateUrl: 'Js/MasterData/Views/Currency/currencies.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/CurrencyCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditCurrencyCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/CurrencyService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('uom', {
            url: '/uom',
            templateUrl: 'Js/MasterData/Views/Uom/uom.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/UomCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditUomCntrl.js?v=' + Utility.Version,
                            'Js/MasterData/Services/UomService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        //.state('portlist', {
        //    url: '/portlist',
        //    templateUrl: 'Js/MasterData/Views/Uom/uom.html?v=' + Utility.Version,
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'Logicon',
        //                    files: ['js/MasterData/controllers/UomCntrl.js?v=' + Utility.Version,
        //                            'js/MasterData/controllers/EditUomCntrl.js?v=' + Utility.Version,
        //                            'Js/MasterData/Services/UomService.js?v=' + Utility.Version]
        //                }
        //            ]);
        //        }
        //    }
        //})

        .state('commoditycode', {
            url: '/commoditycode',
            templateUrl: 'Js/MasterData/Views/CommodityCode/commoditycodelist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/CommodityCodeCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/AddEditCommodityCodeCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/CommodityCodeService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('holdstatus', {
            url: '/holdstatus',
            templateUrl: 'Js/MasterData/Views/HoldStatus/holdstatus.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/HoldStatusCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditHoldStatusCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/HoldStatusService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('imocode', {
            url: '/imocode',
            templateUrl: 'Js/MasterData/Views/IMOCode/Imocode.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/IMOCodeCntrl.js?v=' + Utility.Version,
                            'js/MasterData/controllers/EditIMOCodeCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/IMOCodeService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('lookupconfig', {
            url: '/lookupconfig',
            templateUrl: 'Js/MasterData/LookupConfig/Views/lookupconfig.html?v=' + Utility.Version
        })

        .state('hscode', {
            url: '/hscode/:tariffCode',
            templateUrl: 'Js/MasterData/Views/HSCode/hscode.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/HSCodeController.js?v=' + Utility.Version,
                            'js/MasterData/Services/HSCodeService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('hscodelist', {
            url: '/hscodelist',
            templateUrl: 'Js/MasterData/Views/HSCode/hscodelist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/HSCodeController.js?v=' + Utility.Version,
                            'js/MasterData/Services/HSCodeService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        /* operation module starts */
        .state('registrationlist', {
            url: '/registrationlist',
            templateUrl: 'Js/Operation/Views/Registration/registrationlist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Operation/controllers/RegistrationList.js?v=' + Utility.Version,
                            'js/Home/Services/RegisteredCompanyService.js?v=' + Utility.Version,
                            'js/Home/Services/RegistrationService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        //.state('/company/:companyID', {
        //    url: '/company/:companyID',
        //    templateUrl: 'Js/Home/Views/companydetails.html?v=' + Utility.Version,
        //    resolve: {
        //        loadPlugin: function ($ocLazyLoad) {
        //            return $ocLazyLoad.load([
        //                {
        //                    name: 'Logicon',
        //                    files: ['js/Home/controller/CompanyDetailsController.js?v=' + Utility.Version,
        //                            'js/Home/Services/CompanyDetailsService.js?v=' + Utility.Version,
        //                            'js/Home/Services/RegisteredCompanyService.js?v=' + Utility.Version]
        //                }
        //            ]);
        //        }
        //    }
        //})
        .state('subscriberslist', {
            url: '/subscriberslist',
            templateUrl: 'Js/Operation/Views/Subscribers/subscriberslist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Operation/controllers/Subscribers.js?v=' + Utility.Version,
                            'js/MasterData/Services/CompanyService.js?v=' + Utility.Version,
                            'js/Billing/Services/StatementService.js?v=' + Utility.Version,
                            'js/Reports/services/operationalservice.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('subscribers', {
            url: '/subscribers/:companycode',
            templateUrl: 'Js/Operation/Views/Subscribers/subscriber.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Operation/controllers/Subscribers.js?v=' + Utility.Version,
                            'js/MasterData/Services/CompanyService.js?v=' + Utility.Version,
                            'js/Billing/Services/StatementService.js?v=' + Utility.Version,
                            'js/Reports/services/operationalservice.js?v=' + Utility.Version,
                            'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('subscriber', {
            url: '/subscriber',
            templateUrl: 'Js/inquiry/Views/Subscriberinquiry/Subscriberinquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/inquiry/controllers/Subscriberinquiry.js?v=' + Utility.Version,
                            'js/Billing/services/PendingBillingService.js?v=' + Utility.Version,
                            'js/MasterData/services/CompanyService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('payment', {
            url: '/payment',
            templateUrl: 'Js/inquiry/Views/paymentinquiry/paymentinquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/inquiry/controllers/paymentinquiry.js?v=' + Utility.Version,
                            'js/Billing/services/PendingBillingService.js?v=' + Utility.Version,
                            'js/MasterData/services/CompanyService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })


        /* billing module starts */
        .state('costsheet', {
            url: '/costsheet',
            templateUrl: 'Js/Billing/Views/CostSheet/costsheet.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CostSheet.js?v=' + Utility.Version,
                            'js/Billing/controllers/addEditCostSheetCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/Billing/Services/CostSheetService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
         .state('costsheetList', {
             url: '/costsheetList',
             templateUrl: 'Js/Billing/Views/CostSheetList/CostSheetList.html?v=' + Utility.Version,
             resolve: {
                 loadPlugin: function ($ocLazyLoad) {
                     return $ocLazyLoad.load([
                         {
                             name: 'Logicon',
                             files: ['js/Billing/controllers/CostSheetList.js?v=' + Utility.Version,
                             'js/Billing/controllers/addEditCostSheetCntrl.js?v=' + Utility.Version,
                             'js/Billing/Services/CostSheetService.js?v=' + Utility.Version,
                             'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version]
                         }
                     ]);
                 }
             }
         })
        .state('costsheetListorderno', {
            url: '/costsheetListorderno/:orderno',
            templateUrl: 'Js/Billing/Views/CostSheet/costsheet.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CostSheet.js?v=' + Utility.Version,
                           'js/Billing/controllers/addEditCostSheetCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/Billing/Services/CostSheetService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('costsheetorderno', {
            url: '/costsheet/:orderno',
            templateUrl: 'Js/Billing/Views/CostSheet/costsheet.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CostSheet.js?v=' + Utility.Version,
                            'js/Billing/controllers/addEditCostSheetCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/Billing/Services/CostSheetService.js?v=' + Utility.Version,
                            'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }
        })

        .state('unbilledorders', {
            url: '/unbilledorders',
            templateUrl: 'Js/Billing/Views/UnBilledOrders/unbilledorders.html?v=' + Utility.Version,
            resolve: {
        loadPlugin: function ($ocLazyLoad) {
            return $ocLazyLoad.load([
                {
                    name: 'Logicon',
                    files: ['js/Billing/controllers/UnBilledOrders.js?v=' + Utility.Version,
                        'js/Billing/Services/UnBilledOrdersService.js?v=' + Utility.Version
                    ]
                }
            ]);
        }
    }
        })
        .state('unbilledorderslist', {
            url: '/unbilledorderslist',
            templateUrl: 'Js/Billing/Views/UnBilledOrdersList/UnBilledOrdersList.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/UnBilledOrdersList.js?v=' + Utility.Version,
                               'js/Billing/Services/UnBilledOrdersService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }


        })
        .state('unbilledorderslistorderno', {
            url: '/unbilledorderslistorderno/:orderno',
            templateUrl: 'Js/Billing/Views/UnBilledOrders/unbilledorders.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/UnBilledOrders.js?v=' + Utility.Version,
                                'js/Billing/Services/UnBilledOrdersService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }
        })

        .state('customerinvoice', {
            url: '/customerinvoice',
            templateUrl: 'Js/Billing/Views/CustomerInvoice/customerinvoicelist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CustomerInvoiceList.js?v=' + Utility.Version,
                            'js/Billing/controllers/addEditCustomerInvoice.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/Billing/Services/CostSheetService.js?v=' + Utility.Version,
                            'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }
        })
        .state('customerinvoiced', {
            url: '/customerinvoiced/:Invoiceno',
            templateUrl: 'Js/Billing/Views/CustomerInvoice/customerinvoice.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CustomerInvoice.js?v=' + Utility.Version,
                            'js/Billing/controllers/addEditCustomerInvoice.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/Billing/Services/CostSheetService.js?v=' + Utility.Version,
                            'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }
        })

        .state('customerinvoices', {
            url: '/customerinvoices/:Invoiceno',
            templateUrl: 'Js/Billing/Views/CustomerInvoice/customerinvoice.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CustomerInvoice.js?v=' + Utility.Version,


                            ]
                        }
                    ]);
                }
            }
        })


        .state('customercashbill', {
            url: '/customercashbill',
            templateUrl: 'Js/Billing/Views/CustomerCashBill/customercashbill.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CustomerCashBill.js?v=' + Utility.Version,
                            'js/Billing/controllers/addEditCustomerCashBill.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/Billing/Services/CostSheetService.js?v=' + Utility.Version,
                            'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version,
                            'js/port/Services/BookingEntryService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }
        })
          .state('customercashbilllist', {
              url: '/customercashbilllist',
              templateUrl: 'Js/Billing/Views/CustomerCashBill/customercashbilllist.html?v=' + Utility.Version,
              resolve: {
                  loadPlugin: function ($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          {
                              name: 'Logicon',
                              files: ['js/Billing/controllers/CashBillInvoiceList.js?v=' + Utility.Version,
                              'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version,
                              'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                              'js/Billing/Services/CostSheetService.js?v=' + Utility.Version,
                              'js/Billing/controllers/addEditCustomerCashBill.js?v=' + Utility.Version]
                          }
                      ]);
                  }
              }
          })

        .state('customercashbilltype', {
            url: '/customercashbilltype/:Invoiceno',
            templateUrl: 'Js/Billing/Views/CustomerCashBill/customercashbill.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CustomerCashBill.js?v=' + Utility.Version,
                                'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/Billing/controllers/addEditCustomerCashBill.js?v=' + Utility.Version,
                            'js/Billing/Services/CostSheetService.js?v=' + Utility.Version,
                            'js/Billing/Services/CustomerInvoiceService.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })


        .state('customercreditnote', {
            url: '/customercreditnote',
            templateUrl: 'Js/Billing/Views/CustomerCreditNote/customercreditnote.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CustomerCreditNote.js?v=' + Utility.Version,
                                    'js/Admin/Services/ActivityService.js?v=' + Utility.Version,
                                    'js/Billing/Services/CustomerCreditNoteService.js?v=' + Utility.Version,
                            ]
                        }
                    ]);
                }
            }
        })
        .state('customercreditnotelist', {
            url: '/customercreditnotelist',
            templateUrl: 'Js/Billing/Views/CustomerCreditNote/customercreditnotelist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CustomerCreditList.js?v=' + Utility.Version,

                                    'js/Billing/Services/CustomerCreditNoteService.js?v=' + Utility.Version,
                            ]
                        }
                    ]);
                }
            }
        })

        .state('customercreditnotelistinvoice', {
            url: '/customercreditnotelistinvoice/:CreditNoteNo',
            templateUrl: 'Js/Billing/Views/CustomerCreditNote/CustomerCreditNote.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Billing/controllers/CustomerCreditNote.js?v=' + Utility.Version,
                                'js/Admin/Services/ActivityService.js?v=' + Utility.Version,
                                    'js/Billing/Services/CustomerCreditNoteService.js?v=' + Utility.Version,
                            ]
                        }
                    ]);
                }
            }
        })
        .state('cnsubmission', {
            url: '/cnsubmission',
            templateUrl: 'Js/Billing/Views/CNSubmission/cnsubmission.html?v=' + Utility.Version
        })

        .state('whcustomerinvoice', {
            url: '/whcustomerinvoice',
            templateUrl: 'Js/Billing/Views/WHCustomerInvoice/whcustomerinvoice.html?v=' + Utility.Version
        })

        .state('vendorinvoice', {
            url: '/vendorinvoice',
            templateUrl: 'Js/Billing/Views/VendorInvoice/vendorinvoice.html?v=' + Utility.Version
        })

        .state('vendorreversebilling', {
            url: '/vendorreversebilling',
            templateUrl: 'Js/Billing/Views/VendorReverseBilling/vendorreversebilling.html?v=' + Utility.Version
        })

        .state('vendorcreditnote', {
            url: '/vendorcreditnote',
            templateUrl: 'Js/Billing/Views/VendorCreditNote/vendorcreditnote.html?v=' + Utility.Version
        })

        .state('paymentrequest', {
            url: '/paymentrequest',
            templateUrl: 'Js/Billing/Views/PaymentRequest/paymentrequest.html?v=' + Utility.Version
        })

        .state('advanceentry', {
            url: '/advanceentry',
            templateUrl: 'Js/Billing/Views/AdvanceEntry/advanceentry.html?v=' + Utility.Version
        })

        .state('advancesettlement', {
            url: '/advancesettlement',
            templateUrl: 'Js/Billing/Views/AdvanceSettlement/advancesettlement.html?v=' + Utility.Version
        })

        .state('billcostapproval', {
            url: '/billcostapproval',
            templateUrl: 'Js/Billing/Views/BillCostApproval/billcostapproval.html?v=' + Utility.Version
        })


        .state('outstandingmvtsinquiry', {
            url: '/outstandingmvtsinquiry',
            templateUrl: 'Js/Inquiry/Views/OutstandingMvts/OutstandingMvts.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Inquiry/controllers/OutstandingMvts.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('containercargostatus', {
            url: '/containercargostatus',
            templateUrl: 'Js/Inquiry/Views/containercargo/containercargo.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Inquiry/controllers/OutstandingMvts.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('bookinginquiry', {
            url: '/bookinginquiry',
            templateUrl: 'Js/Inquiry/Views/bookinginquiry/bookinginquiry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Inquiry/controllers/BookingInquiry.js?v=' + Utility.Version,
                            'js/Inquiry/Services/BookingInquiryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('containerrequestinquiry', {
            url: '/containerrequestinquiry',
            templateUrl: 'Js/Freight/Views/ContainerRequest/ContainerRequestList.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: [
                                'js/Freight/controllers/ContainerRequestInquiry.js?v=' + Utility.Version,
                                'js/Freight/Services/ContainerRequestService.js?v=' + Utility.Version,
                            ]
                        }
                    ]);
                }
            }
        })

        .state('containerrequest', {
            url: '/containerrequest/:requestNo',
            templateUrl: 'Js/Freight/Views/ContainerRequest/ContainerRequest.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Freight/controllers/ContainerRequest.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                              'js/Operation/Services/VesselScheduleService.js?v=' + Utility.Version,
                            'js/Freight/controllers/add-container-request.js?v=' + Utility.Version,
                            'js/Freight/Services/ContainerRequestService.js?v=' + Utility.Version,
                             'js/MasterData/services/VesselMasterService.js?v=' + Utility.Version,
                             'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            ]
                        }
                    ]);
                }
            }
        })

         .state('Addcontainerrequest', {
             url: '/Addcontainerrequest',
             templateUrl: 'Js/Freight/Templates/ContainerRequest/add-container-request.html?v=' + Utility.Version,
             resolve: {
                 loadPlugin: function ($ocLazyLoad) {
                     return $ocLazyLoad.load([
                         {
                             name: 'Logicon',
                             files: ['js/Freight/controllers/add-container-request.js?v=' + Utility.Version]
                         }
                     ]);
                 }
             }
         })

        .state('containermonitor', {
            url: '/containermonitor',
            templateUrl: 'Js/Freight/Views/ContainerMonitor/ContainerMonitor.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Freight/controllers/ContainerMonitor.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('collectionadvice', {
            url: '/collectionadvice',
            templateUrl: 'Js/Freight/Views/CollectionAdvice/collectionadvice.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Freight/controllers/CollectionAdvice.js?v=' + Utility.Version,
                            'js/Freight/controllers/CollectionAdviceFilter.js?v=' + Utility.Version,
                            'js/Freight/Services/CollectionAdviceService.js?v=' + Utility.Version,
                            'Js/MasterData/Services/PortAreaService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }
        })

        .state('transportrequest', {
            url: '/transportrequest',
            templateUrl: 'Js/Freight/Views/TransportRequest/transportrequest.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: [
                                'js/Freight/controllers/TransportRequest.js?v=' + Utility.Version,
                                'js/Freight/Services/RequestOfTransportService.js?v=' + Utility.Version,
                                'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                                'js/Reports/controllers/ReportController.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('transportmonitor', {
            url: '/transportmonitor',
            templateUrl: 'Js/Freight/Views/TransportMonitor/transportmonitor.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Freight/controllers/TransportMonitor.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('billoflad', {
            url: '/billoflad',
            templateUrl: 'Js/Freight/Views/BillOfLad/billoflad.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Freight/controllers/BillOfLad.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('shippinginstruction', {
            url: '/shippinginstruction',
            templateUrl: 'Js/Freight/Views/ShippingInstruction/shippinginstruction.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Freight/controllers/ShippingInstruction.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('shipperinvoice', {
            url: '/shipperinvoice',
            templateUrl: 'Js/Freight/Views/ShipperInvoice/shipperinvoice.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Freight/controllers/ShipperInvoice.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('documentation', {
            url: '/documentation',
            templateUrl: 'Js/Freight/Views/Documentation/documentation.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Freight/controllers/documentation.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('houseairwaybill', {
            url: '/houseairwaybill',
            templateUrl: 'Js/Freight/Views/HouseAirWaybill/houseairwaybill.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/Freight/controllers/HouseAirWaybill.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('standardquotation', {
            url: '/standardquotation/:quotation',
            templateUrl: 'Js/MasterData/Views/StandardQuotation/standardquotation.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/StandardQuotation.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomerQuotationService.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Directives/QuotationDetail.js?v=' + Utility.Version,
                            'js/MasterData/Services/JobCategoryService.js?v=' + Utility.Version,
                            'js/MasterData/controllers/QuotationDetail.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
          .state('standardquotationlist', {
              url: '/standardquotationlist',
              templateUrl: 'Js/MasterData/Views/StandardQuotation/standardquotationlist.html?v=' + Utility.Version,
              resolve: {
                  loadPlugin: function ($ocLazyLoad) {
                      return $ocLazyLoad.load([
                          {
                              name: 'Logicon',
                              files: ['js/MasterData/controllers/StandardQuotationlist.js?v=' + Utility.Version,
                              'js/MasterData/Services/CustomerQuotationService.js?v=' + Utility.Version
                             ]
                          }
                      ]);
                  }
              }
          })
        .state('customerquotationlist', {
            url: '/customerquotationlist',
            templateUrl: 'Js/MasterData/Views/CustomerQuotation/customerquotationlist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/CustomerQuotation.js?v=' + Utility.Version,
                            'js/MasterData/controllers/addCustomerQuotationCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomerQuotationService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Directives/QuotationDetail.js?v=' + Utility.Version,
                            'js/MasterData/controllers/QuotationDetail.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('customerquotation', {
            url: '/customerquotation/:quotation',
            templateUrl: 'Js/MasterData/Views/CustomerQuotation/customerquotation.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/CustomerQuotation.js?v=' + Utility.Version,
                            'js/MasterData/controllers/addCustomerQuotationCntrl.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomerQuotationService.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/MasterData/Services/JobCategoryService.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/AddressService.js?v=' + Utility.Version,
                            'js/MasterData/Directives/customer-address.js?v=' + Utility.Version,
                            'js/MasterData/Directives/QuotationDetail.js?v=' + Utility.Version,
                            'js/MasterData/controllers/QuotationDetail.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })
        .state('vendorquotationlist', {
            url: '/vendorquotationlist',
            templateUrl: 'Js/MasterData/Views/VendorQuotation/vendorquotationlist.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/VendorQuotationlist.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomerQuotationService.js?v=' + Utility.Version
                            ]
                        }
                    ]);
                }
            }
        })
        .state('vendorquotation', {
            url: '/vendorquotation/:quotation',
            templateUrl: 'Js/MasterData/Views/VendorQuotation/vendorquotation.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/MasterData/controllers/VendorQuotation.js?v=' + Utility.Version,
                            'js/MasterData/Services/MerchantProfileService.js?v=' + Utility.Version,
                            'js/MasterData/Services/CustomerQuotationService.js?v=' + Utility.Version,
                            'js/MasterData/Services/ChargeCodeService.js?v=' + Utility.Version,
                            'js/Operation/Services/OrderEntryService.js?v=' + Utility.Version,
                            'js/MasterData/Services/AddressService.js?v=' + Utility.Version,
                            'js/MasterData/Services/JobCategoryService.js?v=' + Utility.Version,
                            'js/MasterData/Directives/QuotationDetail.js?v=' + Utility.Version,
                            'js/MasterData/Directives/customer-address.js?v=' + Utility.Version,
                            'js/MasterData/controllers/QuotationDetail.js?v=' + Utility.Version]
                        }
                    ]);
                }
            }
        })

        .state('insurance', {
            url: '/insurance',
            templateUrl: 'Js/Insurance/Views/Insurance/insurance.html?v=' + Utility.Version
        })
        /* SNN */
    .state('News', {
        url: '/News',
        templateUrl: 'js/SNN/Views/News/News.html?v=' + Utility.Version,
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                {
                    name: 'Logicon',
                    files: ['js/SNN/Controllers/News.js?v=' + Utility.Version]
                }]);
            }
        }

    })

            .state('AddNews', {
                url: '/AddNews',
                templateUrl: 'js/SNN/Views/News/AddNews.html?v=' + Utility.Version,
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/SNN/Controllers/AddNews.js?v=' + Utility.Version,
                            'js/SNN/Services/NewsService.js?v=' + Utility.Version]
                        }]);
                    }
                }

            })

            .state('DashboardSNN', {
                url: '/DashboardSNN',
                templateUrl: 'js/SNN/Views/Dashboard/Dashboard.html?v=' + Utility.Version,
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                        return $ocLazyLoad.load([
                        {
                            name: 'Logicon',
                            files: ['js/SNN/Controllers/Dashboard.js?v=' + Utility.Version]
                        }]);
                    }
                }

            })
      .state('Category', {
          url: '/Category',
          templateUrl: 'js/SNN/Views/Category/Category.html?v=' + Utility.Version,
          resolve: {
              loadPlugin: function ($ocLazyLoad) {
                  return $ocLazyLoad.load([
                  {
                      name: 'Logicon',
                      files: ['js/SNN/Controllers/Category.js?v=' + Utility.Version,
                      'js/SNN/Services/categoryService.js?v=' + Utility.Version]
                  }]);
              }
          }

      })
      .state('AddCategory', {
          url: '/AddCategory/:id/:category',
          templateUrl: 'js/SNN/Views/Category/AddCategory.html?v=' + Utility.Version,
          resolve: {
              loadPlugin: function ($ocLazyLoad) {
                  return $ocLazyLoad.load([
                  {
                      name: 'Logicon',
                      files: ['js/SNN/Controllers/AddCategory.js?v=' + Utility.Version,
                      'js/SNN/Services/categoryService.js?v=' + Utility.Version]
                  }]);
              }
          }

      })

    /* Haulage */
     .state('Collectionadvice', {
         url: '/Collectionadvice',
         templateUrl: 'js/Haulage/Views/CollectionAdvice/collectionadvice.html?v=' + Utility.Version,
         resolve: {
             loadPlugin: function ($ocLazyLoad) {
                 return $ocLazyLoad.load([
                 {
                     name: 'Logicon',
                     files: ['js/Haulage/Controllers/collectionadvice.js?v=' + Utility.Version]
                 }]);
             }
         }

     })
    .state('OperationMonitor', {
        url: '/OperationMonitor',
        templateUrl: 'js/Haulage/Views/OperationMonitor/operationmonitor.html?v=' + Utility.Version,
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                {
                    name: 'Logicon',
                    files: ['js/Haulage/Controllers/OperationMonitor.js?v=' + Utility.Version]
                }]);
            }
        }

    })
          .state('addoperationmonitor', {
              url: '/addoperationmonitor',
              templateUrl: 'js/Haulage/Templates/OperationMonitor/add-operation-monitor.html?v=' + Utility.Version,
              resolve: {
                  loadPlugin: function ($ocLazyLoad) {
                      return $ocLazyLoad.load([
                      {
                          name: 'Logicon',
                          files: ['js/Haulage/Controllers/add-operation-monitor.js?v=' + Utility.Version]
                      }]);
                  }
              }

          })
        .state('DriverPaymentBreakDown', {
            url: '/DriverPaymentBreakDown',
            templateUrl: 'js/Haulage/Views/DriverPaymentBreakDown/driverpaymentbreakdown.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                    {
                        name: 'Logicon',
                        files: ['js/Haulage/Controllers/driverpaymentbreakdown.js?v=' + Utility.Version]
                    }]);
                }
            }
        })
             .state('addDriverPaymentBreakDown', {
                 url: '/addDriverPaymentBreakDown',
                 templateUrl: 'js/Haulage/Templates/DriverPaymentBreakDown/add-driverbreakdown.html?v=' + Utility.Version,
                 resolve: {
                     loadPlugin: function ($ocLazyLoad) {
                         return $ocLazyLoad.load([
                         {
                             name: 'Logicon',
                             files: ['js/Haulage/Controllers/add-driverbreakdown.js?v=' + Utility.Version]
                         }]);
                     }
                 }

             })
        .state('DriverIncentive', {
            url: '/DriverIncentive',
            templateUrl: 'js/Haulage/Views/DriverIncentive/driverincentive.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                    {
                        name: 'Logicon',
                        files: ['js/Haulage/Controllers/DriverIncentiveController.js?v=' + Utility.Version]
                    }]);
                }
            }

        })
    .state('DriverPaymentApproval', {
        url: '/DriverPaymentApproval',
        templateUrl: 'js/Haulage/Views/DriverPaymentApproval/driverpaymentapproval.html?v=' + Utility.Version,
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                {
                    name: 'Logicon',
                    files: ['js/Haulage/Controllers/DriverPaymentApproval.js?v=' + Utility.Version]
                }]);
            }
        }

    })
     .state('fuelusage', {
         url: '/fuelusage',
         templateUrl: 'js/Haulage/Views/fuelusage/fuelusage.html?v=' + Utility.Version,
         resolve: {
             loadPlugin: function ($ocLazyLoad) {
                 return $ocLazyLoad.load([
                 {
                     name: 'Logicon',
                     files: ['js/Haulage/Controllers/fuelusage.js?v=' + Utility.Version]
                 }]);
             }
         }

     })
         .state('addfuelusage', {
             url: '/addfuelusage',
             templateUrl: 'js/Haulage/Templates/fuelusage/add-fuelusage.html?v=' + Utility.Version,
             resolve: {
                 loadPlugin: function ($ocLazyLoad) {
                     return $ocLazyLoad.load([
                     {
                         name: 'Logicon',
                         files: ['js/Haulage/Controllers/add-fuelusage.js?v=' + Utility.Version]
                     }]);
                 }
             }

         })

     .state('PortTimeSlot', {
         url: '/PortTimeSlot',
         templateUrl: 'js/Haulage/Views/PortTimeSlot/PortTimeSlot.html?v=' + Utility.Version,
         resolve: {
             loadPlugin: function ($ocLazyLoad) {
                 return $ocLazyLoad.load([
                 {
                     name: 'Logicon',
                     files: ['js/Haulage/Controllers/PortTimeSlot.js?v=' + Utility.Version]
                 }]);
             }
         }

     })
        .state('EquipmentCostEntry', {
            url: '/EquipmentCostEntry',
            templateUrl: 'js/Haulage/Views/EquipmentCostEntry/EquipmentCostEntry.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                    {
                        name: 'Logicon',
                        files: ['js/Haulage/Controllers/EquipmentCostEntry.js?v=' + Utility.Version]
                    }]);
                }
            }

        })
         .state('addEquipmentCostEntry', {
             url: '/addEquipmentCostEntry',
             templateUrl: 'js/Haulage/Templates/EquipmentCostEntry/add-equipmentcostentry.html?v=' + Utility.Version,
             resolve: {
                 loadPlugin: function ($ocLazyLoad) {
                     return $ocLazyLoad.load([
                     {
                         name: 'Logicon',
                         files: ['js/Haulage/Controllers/add-equipmentcostentry.js?v=' + Utility.Version]
                     }]);
                 }
             }

         })
        .state('DriverPaymentByVendor', {
            url: '/DriverPaymentByVendor',
            templateUrl: 'js/Haulage/Views/DriverPaymentByVendor/driverpaymentbyvendor.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                    {
                        name: 'Logicon',
                        files: ['js/Haulage/Controllers/driverpaymentbyvendor.js?v=' + Utility.Version]
                    }]);
                }
            }

        })

      .state('EquipmentPlanning', {
          url: '/EquipmentPlanning',
          templateUrl: 'js/Haulage/Views/EquipmentPlanning/equipmentplanning.html?v=' + Utility.Version,
          resolve: {
              loadPlugin: function ($ocLazyLoad) {
                  return $ocLazyLoad.load([
                  {
                      name: 'Logicon',
                      files: ['js/Haulage/Controllers/EquipmentPlanning.js?v=' + Utility.Version]
                  }]);
              }
          }

      })

    .state('addEquipment', {
        url: '/addEquipment',
        templateUrl: 'js/Haulage/Templates/EquipmentPlanning/add-equipment.html?v=' + Utility.Version,
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                {
                    name: 'Logicon',
                    files: ['js/Haulage/Controllers/add-equipment.js?v=' + Utility.Version]
                }]);
            }
        }

    })
    .state('HaulageCollectionAdvice', {
        url: '/HaulageCollectionAdvice',
        templateUrl: 'js/Haulage/Views/CollectionAdvice/collectionadvice.html?v=' + Utility.Version,
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                {
                    name: 'Logicon',
                    files: ['js/Haulage/Controllers/collectionadvice.js?v=' + Utility.Version]
                }]);
            }
        }

    })
    .state('addcollectionadvice', {
        url: '/addcollectionadvice',
        templateUrl: 'js/Haulage/Templates/collectionadvice/add-collectionadvice.html?v=' + Utility.Version,
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                {
                    name: 'Logicon',
                    files: ['js/Haulage/Controllers/add-collectionadvice.js?v=' + Utility.Version]
                }]);
            }
        }

    })
        .state('ActivityMaster', {
            url: '/ActivityMaster',
            templateUrl: 'js/Admin/Views/ActivityMaster/ActivityMaster.html?v=' + Utility.Version,
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                    {
                        name: 'Logicon',
                        files: ['js/Admin/Controllers/ActivityMaster.js?v=' + Utility.Version,
                                'js/Admin/Controllers/AddActivityMaster.js?v=' + Utility.Version,
                                'js/Admin/Services/ActivityService.js?v=' + Utility.Version
                        ]
                    }]);
                }
            }

        })

    /* Haulage End */
    /* SNN */

    //$urlRouterProvider.otherwise(function ($injector, UtilityFunc) {
    //    var $state = $injector.get('$state');
    //    var companyType = sessionStorage.getItem('COMPANYTYPE');
    //    if (companyType == 'OWNER') {
    //        $state.go('owner');
    //    }
    //    else {
    //        $state.go('user');
    //    }
    //});


    $httpProvider.interceptors.push('HttpRequestInterceptor');

    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD/MM/YYYY');
    };
});

app.controller('iframeController', ['$scope', '$stateParams', '$state', '$location', 'Utility', function ($scope, $stateParams, $state, $location, Utility) {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    $scope.uiView = getParameterByName('id');
    var routeParams = {};

    if (sessionStorage.getItem('ROUTE_PARAMS') != undefined) {
        routeParams = JSON.parse(sessionStorage.getItem('ROUTE_PARAMS'));
        sessionStorage.removeItem('ROUTE_PARAMS');
    }

    $state.go($scope.uiView, routeParams, {});
    $scope.appVersion = Utility.appVersion;
}]);
