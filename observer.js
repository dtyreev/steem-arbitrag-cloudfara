"use strict";

/*
    steem-arbitrag-cloudfara
    observer.js

    Следит за изменениями DOM.

    Никаких запросов.
    Никаких расчетов.

    Только уведомляет,
    что на странице появились новые элементы.
*/

const Observer = {

    observer: null,

    callback: null,

    started: false,

    start(callback) {

        if (this.started) {
            return;
        }

        this.started = true;

        this.callback = callback;

        this.observer = new MutationObserver(
            this.onMutation.bind(this)
        );

        this.observer.observe(document.body, {

            childList: true,

            subtree: true

        });

        console.log(
            "steem-arbitrag-cloudfara: Observer started"
        );

    },

    stop() {

        if (!this.observer) {
            return;
        }

        this.observer.disconnect();

        this.started = false;

        console.log(
            "steem-arbitrag-cloudfara: Observer stopped"
        );

    },

    onMutation(mutations) {

        let changed = false;

        for (const mutation of mutations) {

            if (mutation.addedNodes.length > 0) {

                changed = true;

                break;

            }

        }

        if (!changed) {
            return;
        }

        if (typeof this.callback === "function") {

            this.callback();

        }

    }

};