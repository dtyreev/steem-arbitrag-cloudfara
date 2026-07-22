"use strict";

/*
    steem-arbitrag-cloudfara
    dom.js

    Построение интерфейса карточек.
*/

const DOMBuilder = {

    createCard(item) {

        const card = document.createElement("div");

        card.className = "sap-card";

        card.innerHTML = `

            <div class="sap-row">

                <span class="sap-label">
                    CSFloat
                </span>

                <span class="sap-value">
                    ${this.money(item.csFloatPrice)}
                </span>

                <span class="sap-label sap-right">
                    Steam
                </span>

                <span class="sap-value">
                    ${this.money(item.steamPrice)}
                </span>

            </div>

            <div class="sap-row">

                <span class="sap-label">
                    ROI Float
                </span>

                <span class="sap-value ${this.color(item.roiFloat)}">
                    ${this.percent(item.roiFloat)}
                </span>

                <span class="sap-label sap-right">
                    Net
                </span>

                <span class="sap-value">
                    ${this.money(item.steamNet)}
                </span>

            </div>

            <div class="sap-row">

                <span class="sap-label">
                    Profit
                </span>

                <span class="sap-value ${this.color(item.profit)}">
                    ${this.moneySigned(item.profit)}
                </span>

                <span class="sap-label sap-right">
                    ROI
                </span>

                <span class="sap-value ${this.color(item.roi)}">
                    ${this.percent(item.roi)}
                </span>

            </div>

        `;

        return card;

    },

    money(value) {

        if (value === undefined || value === null) {
            return "-";
        }

        return Number(value).toFixed(2);

    },

    moneySigned(value) {

        const number = Number(value);

        if (number > 0) {
            return "+" + number.toFixed(2);
        }

        return number.toFixed(2);

    },

    percent(value) {

        const number = Number(value);

        if (number > 0) {
            return "+" + number.toFixed(2) + "%";
        }

        return number.toFixed(2) + "%";

    },

    color(value) {

        return Number(value) >= 0
            ? "sap-positive"
            : "sap-negative";

    }

};