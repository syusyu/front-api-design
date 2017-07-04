var tutorial02 = (function () {
    'use strict';
    var
        initModule = function () {
            var
                angryFunc = spa_page_transition.createAjaxFunc(
                    tutorial_config.URL.GO_WITH_ANGER, 'get', function () {}, 'YOU'),

                calmFunc = spa_page_transition.createAjaxFunc(
                    tutorial_config.URL.LEAVE_WITH_CALM, 'get', function () {}, 'YOU');

            spa_page_transition
                .setInitAction('page-my-room')
                .addAction('go-to-your-room-with-anger', 'page-your-room', [angryFunc])
                .addAction('leave-with-calm', 'page-my-room', [calmFunc])
                .run();
        };

    return {
        initModule: initModule
    }
})();
