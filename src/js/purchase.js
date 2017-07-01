var purchase = (function () {
    'use strict';
    var
        initModule;

    initModule = function ($container) {
        var
            /**
             * Product detail
             */
            showProductDetail = spa_page_transition.createAjaxFunc(purchase_config.URL.PRODUCT_DETAIL, 'get', function (observer, anchor_map, data) {
                purchase.view.hide_error();
            }, 'PRODUCT-DETAIL'),

            addToCart = spa_page_transition.createAjaxFunc(purchase_config.URL.ADD_TO_CART, 'post', function (observer, anchor_map, data) {
            }),

            addToCartFailure = spa_page_transition.createAjaxFunc(purchase_config.URL.ADD_TO_CART_FAILURE, 'post', function (observer, anchor_map, data) {
                purchase.view.show_error();
            }),

            /**
             * Cart top
             */
            showCartTop = spa_page_transition.createAjaxFunc(purchase_config.URL.SHOW＿CART_TOP, 'get', function (observer, anchor_map, data) {
                purchase.view.hide_error();
            }, 'CART-TOP'),

            checkoutToAddress = spa_page_transition.createAjaxFunc(purchase_config.URL.CHECKOUT_TO_ADDRESS, 'post', function (observer, anchor_map, data) {
            }),

            checkoutToBP = spa_page_transition.createAjaxFunc(purchase_config.URL.CHECKOUT_TO_BP, 'post', function (observer, anchor_map, data) {
            }),

            checkoutFailure = spa_page_transition.createAjaxFunc(purchase_config.URL.CHECKOUT_TO_FAILURE, 'post', function (observer, anchor_map, data) {
                purchase.view.show_error();
            }),

            /**
             * Checkout address
             */
            showCheckoutAddress = spa_page_transition.createAjaxFunc(purchase_config.URL.SHOW_CHECKOUT_ADDRESS, 'get', function (observer, anchor_map, data) {
                purchase.view.hide_error();
            }, 'CHECKOUT-ADDRESS'),

            backFromCheckoutAddress = spa_page_transition.createAjaxFunc(purchase_config.URL.BACK_FROM_CHECKOUT_ADDRESS, 'post', function (observer, anchor_map, data) {
            }),

            nextFromCheckoutAddress = spa_page_transition.createAjaxFunc(purchase_config.URL.NEXT_FROM_CHECKOUT_ADDRESS, 'post', function (observer, anchor_map, data) {
            }),

            /**
             * Checkout BP
             */
            showCheckoutBP = spa_page_transition.createAjaxFunc(purchase_config.URL.SHOW_CHECKOUT_BP, 'get', function (observer, anchor_map, data) {
                purchase.view.hide_error();
            }, 'CHECKOUT-BP'),

            backFromCheckoutBP = spa_page_transition.createAjaxFunc(purchase_config.URL.BACK_FROM_CHECKOUT_BP, 'post', function (observer, anchor_map, data) {
            }),

            dummy;


        //Init view
        purchase.view.initModule($container);

        //Init model
        purchase.model.initModule();

        //Init Application
        spa_page_transition.setApiMode(spa_page_transition.ENUM_API_MODE.REAL)
            .setInitAction('page-product-detail', [showProductDetail])

            .addAction('show-product-detail', 'page-product-detail', [showProductDetail])
            .addAction('add-cart-item', '', [addToCart])
            .addAction('add-cart-item-failure', 'page-product-detail', [addToCartFailure])

            .addAction('show-cart-top', 'page-cart-top', [showCartTop])
            .addAction('checkout-to-address', '', [checkoutToAddress])
            .addAction('checkout-to-bp', '', [checkoutToBP])
            .addAction('checkout-failure', 'page-cart-top', [checkoutFailure])

            .addAction('show-checkout-address', 'page-checkout-address', [showCheckoutAddress])
            .addAction('back-from-checkout-address', '', [backFromCheckoutAddress])
            .addAction('next-from-checkout-address', '', [nextFromCheckoutAddress])

            .addAction('show-checkout-bp', 'page-checkout-bp', [showCheckoutBP])
            .addAction('back-from-checkout-bp', '', [backFromCheckoutBP])

            .run();
    };

    return {
        initModule: initModule
    }
})();

purchase.view = (function () {
    var
        $container,

        show_error = function () {
            $container.find('#notification-error').removeClass('contents-error-hide').addClass('contents-error-show');
        },
        hide_error = function () {
            $container.find('#notification-error').addClass('contents-error-hide').removeClass('contents-error-show');
        },

        initModule = function (_$container) {
            $container = _$container;
        };

    return {
        show_error: show_error,
        hide_error: hide_error,
        initModule: initModule
    }
})();

purchase.model = (function () {
    var
        initModule = function () {
        };

    return {
        initModule: initModule,
    }
})();
