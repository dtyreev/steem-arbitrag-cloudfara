"use strict";

(async function () {
    console.log("steem-arbitrag-cloudfara: content.js loaded");

    const marketHashName = getMarketHashName();

    if (!marketHashName) {
        console.log("steem-arbitrag-cloudfara: Item not found.");
        return;
    }

    console.log("steem-arbitrag-cloudfara: Item =", marketHashName);

    const steamPriceElement = waitForSteamPrice();

    if (!steamPriceElement) {
        console.log("steem-arbitrag-cloudfara: Steam price block not found.");
        return;
    }

    try {
        const response = await chrome.runtime.sendMessage({
            action: "getCSFloatPrice",
            marketHashName: marketHashName
        });

        if (!response.success) {
            console.error(response.error);
            return;
        }

        createCard(steamPriceElement, response.data);

    } catch (error) {
        console.error(error);
    }

})();

function getMarketHashName() {
    const match = window.location.pathname.match(/\/market\/listings\/\d+\/(.+)$/);

    if (!match) {
        return null;
    }

    return decodeURIComponent(match[1]);
}

function waitForSteamPrice() {

    const selectors = [
        ".market_commodity_orders_header_promote",
        ".market_listing_price.market_listing_price_without_fee",
        ".market_commodity_order_block"
    ];

    for (const selector of selectors) {

        const element = document.querySelector(selector);

        if (element) {
            return element;
        }

    }

    return null;
}

function createCard(target, workerData) {

    if (document.querySelector(".sap-card")) {
        return;
    }

    const price =
        workerData.item &&
        workerData.item.price
            ? workerData.item.price
            : "-";

    const currency =
        workerData.item &&
        workerData.item.currency
            ? workerData.item.currency
            : "";

    const card = document.createElement("div");

    card.className = "sap-card";

    card.innerHTML = `
        <div class="sap-row">
            <span class="sap-label">CSFloat</span>
            <span class="sap-value">${price} ${currency}</span>
        </div>

        <div class="sap-row">
            <span class="sap-label">Steam</span>
            <span class="sap-value">Loading...</span>
        </div>

        <div class="sap-row">
            <span class="sap-label">Net</span>
            <span class="sap-value">Loading...</span>
        </div>

        <div class="sap-row">
            <span class="sap-label">Profit</span>
            <span class="sap-value">Loading...</span>
        </div>

        <div class="sap-row">
            <span class="sap-label">ROI</span>
            <span class="sap-value">Loading...</span>
        </div>
    `;

    target.parentNode.insertBefore(card, target.nextSibling);

}