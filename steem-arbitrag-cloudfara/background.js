const WORKER_URL = "https://steemarditragcloudfare.dtyreev.workers.dev";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action !== "getCSFloatPrice") {
        return;
    }

    fetchPrice(message.marketHashName)
        .then((data) => {
            sendResponse({
                success: true,
                data: data
            });
        })
        .catch((error) => {
            console.error("Steam Profit Plus:", error);

            sendResponse({
                success: false,
                error: error.message
            });
        });

    return true;
});

async function fetchPrice(marketHashName) {
    const url =
        WORKER_URL +
        "?market_hash_name=" +
        encodeURIComponent(marketHashName);

    console.log("Steam Profit Plus: Request URL:", url);

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Worker request failed: " + response.status);
    }

    const json = await response.json();

    if (!json.success) {
        throw new Error(json.error || "Unknown Worker error");
    }

    return json;
}