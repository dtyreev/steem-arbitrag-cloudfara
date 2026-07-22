"use strict";

/*
    steem-arbitrag-cloudfara
    api.js

    Работа с background.js.

    Никакого DOM.
    Никаких расчетов.

    Только получение данных.
*/

const API = {

    /*
        Получить информацию о предмете.
    */
    async getItem(marketHashName) {

        if (!marketHashName) {
            throw new Error("marketHashName is empty");
        }

        return new Promise((resolve, reject) => {

            chrome.runtime.sendMessage({

                action: "getCSFloatPrice",

                marketHashName: marketHashName

            }, (response) => {

                if (chrome.runtime.lastError) {

                    reject(
                        new Error(chrome.runtime.lastError.message)
                    );

                    return;
                }

                if (!response) {

                    reject(
                        new Error("Empty response")
                    );

                    return;
                }

                if (!response.success) {

                    reject(
                        new Error(
                            response.error || "Unknown error"
                        )
                    );

                    return;
                }

                resolve(response.data);

            });

        });

    },

    /*
        Проверка соединения с Worker.
    */
    async ping(marketHashName) {

        try {

            await this.getItem(marketHashName);

            return true;

        } catch (error) {

            console.error(
                "steem-arbitrag-cloudfara:",
                error
            );

            return false;

        }

    }

};