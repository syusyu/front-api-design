var tutorial01 = (function () {
    'use strict';
    var
        initModule = function () {
            var
                shutUpFunc = spa_page_transition.createAjaxFunc(
                    tutorial_config.URL.SHUT_UP, 'get', function () {}, 'YOUR');

            spa_page_transition
                .setInitAction('page-your-room')
                .addAction('shut-up', 'page-your-room', [shutUpFunc])
                .run();
        };

    return {
        initModule: initModule
    }
})();
