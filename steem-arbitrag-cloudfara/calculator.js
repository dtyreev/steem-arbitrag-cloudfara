"use strict";

/*
    steem-arbitrag-cloudfara
    calculator.js

    Этот файл отвечает только за расчеты.

    Никакого DOM.
    Никаких запросов.
    Никакого Chrome API.
*/

const Calculator = {

    /*
        Комиссия Steam.

        Сейчас используем стандартные 13%.

        Позже заменим на точный алгоритм Steam,
        чтобы расчеты совпадали до копейки.
    */
    STEAM_FEE: 0.13,

    /*
        Основная функция.

        Принимает объект item.

        Возвращает тот же объект,
        дополненный вычисленными значениями.
    */
    calculate(item) {

        if (!item) {
            return null;
        }

        item.steamPrice = this.toNumber(item.steamPrice);
        item.csFloatPrice = this.toNumber(item.csFloatPrice);

        item.steamNet = this.calculateSteamNet(item.steamPrice);

        item.profit = this.calculateProfit(
            item.steamNet,
            item.csFloatPrice
        );

        item.roi = this.calculateROI(
            item.csFloatPrice,
            item.profit
        );

        item.roiFloat = this.calculateROIFloat(
            item.steamPrice,
            item.csFloatPrice
        );

        return item;
    },

    /*
        Цена после комиссии Steam.
    */
    calculateSteamNet(steamPrice) {

        steamPrice = this.toNumber(steamPrice);

        return this.round(
            steamPrice * (1 - this.STEAM_FEE)
        );

    },

    /*
        Прибыль.
    */
    calculateProfit(steamNet, csFloatPrice) {

        steamNet = this.toNumber(steamNet);
        csFloatPrice = this.toNumber(csFloatPrice);

        return this.round(
            steamNet - csFloatPrice
        );

    },

    /*
        ROI
    */
    calculateROI(cost, profit) {

        cost = this.toNumber(cost);
        profit = this.toNumber(profit);

        if (cost <= 0) {
            return 0;
        }

        return this.round(
            (profit / cost) * 100
        );

    },

    /*
        ROI Float

        Пока используем простую формулу.

        Позже заменим на окончательную.
    */
    calculateROIFloat(steamPrice, csFloatPrice) {

        steamPrice = this.toNumber(steamPrice);
        csFloatPrice = this.toNumber(csFloatPrice);

        if (csFloatPrice <= 0) {
            return 0;
        }

        return this.round(
            ((steamPrice - csFloatPrice) / csFloatPrice) * 100
        );

    },

    /*
        Преобразование в число.
    */
    toNumber(value) {

        const number = Number(value);

        if (Number.isNaN(number)) {
            return 0;
        }

        return number;

    },

    /*
        Округление.
    */
    round(value) {

        return Math.round(value * 100) / 100;

    }

};