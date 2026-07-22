"use strict";

/*
    steem-arbitrag-cloudfara
    steam.js

    Работа только со страницами Steam.

    Никаких запросов.
    Никакого Worker.
    Никаких расчетов.

    Только чтение DOM.
*/

const Steam = {

    /*
        Проверка страницы предмета
    */
    isListingPage() {

        return window.location.pathname.includes("/market/listings/");

    },

    /*
        Проверка страницы поиска
    */
    isSearchPage() {

        return window.location.pathname.includes("/market/search");

    },

    /*
        Получить market_hash_name
    */
    getMarketHashName() {

        const match = window.location.pathname.match(
            /\/market\/listings\/\d+\/(.+)$/
        );

        if (!match) {
            return null;
        }

        return decodeURIComponent(match[1]);

    },

    /*
        Найти блок покупки
    */
    getBuyBlock() {

        const selectors = [

            ".market_commodity_order_block",

            ".market_commodity_orders",

            "#market_commodity_buyrequests"

        ];

        for (const selector of selectors) {

            const element = document.querySelector(selector);

            if (element) {
                return element;
            }

        }

        return null;

    },

    /*
        Получить цену Steam
    */
    getSteamPrice() {

        const selectors = [

            ".market_commodity_orders_header_promote",

            ".market_listing_price.market_listing_price_without_fee",

            ".market_commodity_orders_header"

        ];

        for (const selector of selectors) {

            const element = document.querySelector(selector);

            if (!element) {
                continue;
            }

            const value = this.extractPrice(
                element.textContent
            );

            if (value > 0) {
                return value;
            }

        }

        return 0;

    },

    /*
        Получить валюту
    */
    getCurrency() {

        const selectors = [

            ".market_commodity_orders_header_promote",

            ".market_listing_price.market_listing_price_without_fee"

        ];

        for (const selector of selectors) {

            const element = document.querySelector(selector);

            if (!element) {
                continue;
            }

            const text = element.textContent.trim();

            const currency = text.replace(/[0-9.,\s]/g, "");

            if (currency.length > 0) {
                return currency;
            }

        }

        return "";

    },

    /*
        Найти все результаты поиска
    */
    getSearchItems() {

        return Array.from(

            document.querySelectorAll(
                "#searchResultsRows .market_listing_row_link"
            )

        );

    },

    /*
        Получить market_hash_name из строки поиска
    */
    getSearchItemName(row) {

        if (!row) {
            return null;
        }

        const href = row.href;

        const match = href.match(
            /\/market\/listings\/\d+\/(.+)$/
        );

        if (!match) {
            return null;
        }

        return decodeURIComponent(match[1]);

    },

    /*
        Извлечь цену
    */
    extractPrice(text) {

        if (!text) {
            return 0;
        }

        let value = text;

        value = value.replace(",", ".");

        value = value.replace(/[^0-9.]/g, "");

        const number = parseFloat(value);

        if (Number.isNaN(number)) {
            return 0;
        }

        return number;

    }

};