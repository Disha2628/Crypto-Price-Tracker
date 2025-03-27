async function fetchHistoricalData(crypto, currency) {
    try {
        const URL = `${API_URL}/coins/${crypto}/market_chart?vs_currency=${currency}&days=7`;
        const response = await fetch(URL);
        const data = await response.json();
        const prices = data.prices.map(price => price[1]);
        const dates = data.prices.map(price => new Date(price[0]).toLocaleDateString());
        renderChart(dates, prices);
    } catch (error) {
        console.error("Error fetching historical data:", error);
    }
} 

function renderChart(labels, data) {
    const ctx = document.getElementById("cryptoChart").getContext("2d");
    if (window.cryptoChartInstance) {
        window.cryptoChartInstance.destroy();
    }
    window.cryptoChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Price (Last 7 Days)",
                data: data,
                borderColor: "blue",
                fill: false,
            }],
        },
    });
}
