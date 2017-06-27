var cart = (function () {
    'use strict';
    var
        logger, getLogger, initModule;

    getLogger = function () {
        return logger;
    };

    initModule = function ($container, is_debug_mode) {
        var
            validateAddToCart = spa_page_transition.createAjaxFunc('../../stub/product/add-to-cart.json', function (observer, anchor_map, data) {
                getLogger().debug('validateSearchCustomer is called!', anchor_map);
            }),

            validateAddToCartFailure = spa_page_transition.createAjaxFunc('../../stub/product/add-to-cart-failure.json', function (observer, anchor_map, data) {
                getLogger().debug('validateAddToCartFailure is called!', anchor_map);
            }),

            temp = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('searchCustomer is called!', anchor_map);
                observer.trigger('CUSTOMER', cart.model.search_customer());
            }),

            tearDown = spa_page_transition.createFunc(function (observer, anchor_map) {
                logger.debug('tearDown is called.');
                cart.shell.tear_down();
            }),

            initProduct = spa_page_transition.createFunc(function (observer, anchor_map) {
                getLogger().debug('initializationFunc is called!');
                cart.model.init_model();
                observer.trigger('CUSTOMER', cart.model.get_customer());
                observer.trigger('ITEM', cart.model.get_item());
            });


        logger = spa_log.createLogger(is_debug_mode, '### CART.LOG ###');

        cart.shell.initModule($container);

        spa_page_transition.debugMode(is_debug_mode).initialize(initProduct)
            .addAction(spa_page_transition.model.START_ACTION, 'page-product-detail')
            .addAction('to-product-detail', 'page-product-detail')
            .addAction('add-to-cart', 'dummy', [validateAddToCart])
            .addAction('add-to-cart-failure', 'page-product-detail', [validateAddToCartFailure])

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

cart.shell = (function () {
    var
        show_item_error = function () {
            $('#item-error').removeClass('contents-error-hide');
            $('#item-error').addClass('contents-error-show');
        },
        hide_item_error = function () {
            $('#item-error').addClass('contents-error-hide');
            $('#item-error').removeClass('contents-error-show');
        },
        show_credit_card_error = function () {
            $('#credit-card-error').removeClass('contents-error-hide');
            $('#credit-card-error').addClass('contents-error-show');
        },
        hide_credit_card_error = function () {
            $('#credit-card-error').addClass('contents-error-hide');
            $('#credit-card-error').removeClass('contents-error-show');
        },

        get_credit_card_num = function () {
            var result = '';
            $('.credit_num_text').each(function (idx, el) {
                result += $(el).val();
            });
            return result;
        },

        is_paymethod_new_credit_card = function () {
            return $('input[name="paymethod"]:checked').val() === 'paymethod-credit-new';
        },

        tear_down = function () {
            hide_item_error();
            hide_credit_card_error();
        },

        initModule = function (_$container) {
            $('.credit_num_text').on('click', function () {
                hide_credit_card_error();
            });
            $('input[name="paymethod"]:radio').change(function () {
                hide_credit_card_error();
                var add_cls = is_paymethod_new_credit_card() ? 'show' : 'hide';
                var remove_cls = add_cls === 'show' ? 'hide' : 'show';
                $('#credit-new-input-area').addClass(add_cls);
                $('#credit-new-input-area').removeClass(remove_cls);
            });
        };

    return {
        show_item_error: show_item_error,
        hide_item_error: hide_item_error,
        get_credit_card_num: get_credit_card_num,
        is_paymethod_new_credit_card: is_paymethod_new_credit_card,
        show_credit_card_error: show_credit_card_error,
        hide_credit_card_error: hide_credit_card_error,
        tear_down: tear_down,
        initModule: initModule
    }

})();