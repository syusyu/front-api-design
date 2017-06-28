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
            showProductDetail = spa_page_transition.createAjaxFunc('../../stub/purchase/product/show-product-detail.json', function (observer, anchor_map, data) {
                getLogger().debug('showProductDetail is called!');
                observer.trigger('PRODUCT-DETAIL', data.contents);
            }),
            showCartTop = spa_page_transition.createAjaxFunc('../../stub/purchase/cart/show-cart-top.json', function (observer, anchor_map, data) {
                getLogger().debug('showProductDetail is called!');
                observer.trigger('CART-TOP', data.contents);
            }),
            showCheckoutAddress = spa_page_transition.createAjaxFunc('../../stub/purchase/checkout/show-checkout-address.json', function (observer, anchor_map, data) {
                getLogger().debug('showCheckoutAddress is called!');
                observer.trigger('CHECKOUT-ADDRESS', data.contents);
            }),
            showCheckoutBP = spa_page_transition.createAjaxFunc('../../stub/purchase/checkout/show-checkout-bp.json', function (observer, anchor_map, data) {
                getLogger().debug('showCheckoutBP is called!');
                observer.trigger('CHECKOUT-BP', data.contents);
            }),

            addToCart = spa_page_transition.createAjaxFunc('../../stub/purchase/product/add-to-cart.json', function (observer, anchor_map, data) {
                getLogger().debug('validateSearchCustomer is called!', anchor_map);
            }),

            addToCartFailure = spa_page_transition.createAjaxFunc('../../stub/purchase/product/add-to-cart-failure.json', function (observer, anchor_map, data) {
                getLogger().debug('validateAddToCartFailure is called!', anchor_map);
            }),


            checkoutToAddress = spa_page_transition.createAjaxFunc('../../stub/purchase/cart/add-to-cart.json', function (observer, anchor_map, data) {
                getLogger().debug('validateSearchCustomer is called!', anchor_map);
            }),
            checkoutFailure = spa_page_transition.createAjaxFunc('../../stub/purchase/cart/checkout-failure.json', function (observer, anchor_map, data) {
                getLogger().debug('checkoutFailure is called!', anchor_map);
            }),

            dummy;


        logger = spa_log.createLogger(is_debug_mode, '### PURCHASE.LOG ###');
        purchase.shell.initModule($container);
        purchase.model.initModule();

        spa_page_transition.debugMode(is_debug_mode).initialize(showProductDetail)
            .addAction(spa_page_transition.model.START_ACTION, 'page-product-detail')

            .addAction('show-product-detail', 'page-product-detail', [showProductDetail])
            .addAction('add-to-cart', '', [addToCart])
            .addAction('add-to-cart-failure', 'page-product-detail', [addToCartFailure])

            .addAction('show-cart-top', 'page-cart-top', [showCartTop])
            .addAction('checkout-to-address', '', [temp])
            .addAction('checkout-to-bp', '', [temp])
            .addAction('checkout-failure', 'page-cart-top', [temp])

            .addAction('show-checkout-address', 'page-checkout-address', [showCheckoutAddress])
            .addAction('checkout-address-back', 'page-cart-top', [temp])
            .addAction('checkout-address-next', 'page-checkout-bp', [temp])
            .run();
    };

    return {
        initModule: initModule,
        getLogger: getLogger
    }
})();

purchase.shell = (function () {
    var
        initModule = function (_$container) {
        };

    return {
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
