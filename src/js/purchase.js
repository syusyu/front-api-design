var purchase = (function () {
    'use strict';
    var
        logger, getLogger, initModule,
        is_debug_mode = true;

    getLogger = function () {
        return logger;
    };

    initModule = function ($container) {
        var
            /**
             * Product detail
             */
            showProductDetail = spa_page_transition.createAjaxFunc('../../stub/purchase/product/show-product-detail.json', function (observer, anchor_map, data) {
                getLogger().debug('showProductDetail is called!');
                purchase.shell.hide_error();
                observer.trigger('PRODUCT-DETAIL', data.contents);
            }),
            addToCart = spa_page_transition.createAjaxFunc('../../stub/purchase/product/add-cart-item.json', function (observer, anchor_map, data) {
                getLogger().debug('addToCart is called!', anchor_map);
            }),
            addToCartFailure = spa_page_transition.createAjaxFunc('../../stub/purchase/product/add-cart-item-failure.json', function (observer, anchor_map, data) {
                getLogger().debug('addToCartFailure is called!', anchor_map);
                purchase.shell.show_error();
            }),

            /**
             * Cart top
             */
            showCartTop = spa_page_transition.createAjaxFunc('../../stub/purchase/cart/show-cart-top.json', function (observer, anchor_map, data) {
                getLogger().debug('showProductDetail is called!');
                purchase.shell.hide_error();
                observer.trigger('CART-TOP', data.contents);
            }),
            checkoutToAddress = spa_page_transition.createAjaxFunc('../../stub/purchase/cart/checkout-to-address.json', function (observer, anchor_map, data) {
                getLogger().debug('checkoutToAddress is called!', anchor_map);
            }),
            checkoutToBP = spa_page_transition.createAjaxFunc('../../stub/purchase/cart/checkout-to-bp.json', function (observer, anchor_map, data) {
                getLogger().debug('checkoutToBP is called!', anchor_map);
            }),
            checkoutFailure = spa_page_transition.createAjaxFunc('../../stub/purchase/cart/checkout-failure.json', function (observer, anchor_map, data) {
                getLogger().debug('checkoutFailure is called!', anchor_map);
                purchase.shell.show_error();
            }),

            /**
             * Checkout address
             */
            showCheckoutAddress = spa_page_transition.createAjaxFunc('../../stub/purchase/checkout/show-checkout-address.json', function (observer, anchor_map, data) {
                getLogger().debug('showCheckoutAddress is called!');
                purchase.shell.hide_error();
                observer.trigger('CHECKOUT-ADDRESS', data.contents);
            }),
            backFromCheckoutAddress = spa_page_transition.createAjaxFunc('../../stub/purchase/checkout/back-from-checkout-address.json', function (observer, anchor_map, data) {
                getLogger().debug('backFromCheckoutAddress is called!', anchor_map);
            }),
            nextFromCheckoutAddress = spa_page_transition.createAjaxFunc('../../stub/purchase/checkout/next-from-checkout-address.json', function (observer, anchor_map, data) {
                getLogger().debug('nextFromCheckoutAddress is called!', anchor_map);
            }),

            /**
             * Checkout BP
             */
            showCheckoutBP = spa_page_transition.createAjaxFunc('../../stub/purchase/checkout/show-checkout-bp.json', function (observer, anchor_map, data) {
                getLogger().debug('showCheckoutBP is called!');
                purchase.shell.hide_error();
                observer.trigger('CHECKOUT-BP', data.contents);
            }),
            backFromCheckoutBP = spa_page_transition.createAjaxFunc('../../stub/purchase/checkout/back-from-checkout-bp.json', function (observer, anchor_map, data) {
                getLogger().debug('backFromCheckoutBP is called!', anchor_map);
            }),

            dummy;


        logger = spa_log.createLogger(is_debug_mode, '### PURCHASE.LOG ###');
        purchase.shell.initModule($container);
        purchase.model.initModule();

        spa_page_transition.debugMode(is_debug_mode).initialize(showProductDetail)
            .addAction(spa_page_transition.model.START_ACTION, 'page-product-detail')

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
        initModule: initModule,
        getLogger: getLogger
    }
})();

purchase.shell = (function () {
    var
        show_error = function () {
            $('#notification-error').removeClass('contents-error-hide').addClass('contents-error-show');
        },
        hide_error = function () {
            $('#notification-error').addClass('contents-error-hide').removeClass('contents-error-show');
        },

        initModule = function (_$container) {
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
