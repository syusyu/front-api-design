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
            showProductDetail = spa_page_transition.createAjaxFunc('../../stub/purchase/product/product-detail.json', function (observer, anchor_map, data) {
                getLogger().debug('showProductDetail is called!');
                observer.trigger('PRODUCT-DETAIL', data.contents);
            }),

            addToCart = spa_page_transition.createAjaxFunc('../../stub/purchase/product/add-to-cart.json', function (observer, anchor_map, data) {
                getLogger().debug('validateSearchCustomer is called!', anchor_map);
            }),

            addToCartFailure = spa_page_transition.createAjaxFunc('../../stub/purchase/product/add-to-cart-failure.json', function (observer, anchor_map, data) {
                getLogger().debug('validateAddToCartFailure is called!', anchor_map);
            }),

            temp = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('searchCustomer is called!', anchor_map);
                observer.trigger('CUSTOMER', purchase.model.search_customer());
            });


        logger = spa_log.createLogger(is_debug_mode, '### PURCHASE.LOG ###');
        purchase.shell.initModule($container);
        purchase.model.initModule();

        spa_page_transition.debugMode(is_debug_mode).initialize(showProductDetail)
            .addAction(spa_page_transition.model.START_ACTION, 'page-product-detail')
            .addAction('to-product-detail', 'page-product-detail', [showProductDetail])
            .addAction('add-to-cart', 'dummy', [addToCart])
            .addAction('add-to-cart-failure', 'page-product-detail', [addToCartFailure])

            .addAction('to-cart-top', 'page-cart-top')
            .addAction('checkout-to-address', 'page-checkout-address', [temp])
            .addAction('checkout-to-bp', 'page-checkout-bp', [temp])

            .addAction('shipping-address-back', 'page-cart-top', [temp])
            .addAction('shipping-address-next', 'page-checkout-bp', [temp])
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
