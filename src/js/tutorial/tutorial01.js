var tutorial01 = (function () {
    'use strict';
    var
        initModule = function () {
            var
                knockingFunc = spa_page_transition.createAjaxFunc(
                    tutorial_config.URL.KNOCKING, 'get', function () {}, 'YOU');

            spa_page_transition
                .setInitAction('page-my-room')
                .addAction('knocking', 'page-my-room', [knockingFunc])
                .run();
        };

    return {
        initModule: initModule
    }
})();
