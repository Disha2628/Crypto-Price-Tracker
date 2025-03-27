async function fetchHistoricalData(crypto, currency) {
    try {
        const URL = `${API_URL}/coins/${crypto}/market_chart?vs_currency=${currency}&days=7`;
        console.log(URL);
        const response = await fetch(URL);
        //https://api.coingecko.com/api/v3/coins/
        const data = await response.json();
        console.log(data);
        const prices = data.prices.map(price => price[1]);
        console.log(prices);
        const dates = data.prices.map(price => new Date(price[0]).toLocaleDateString());
        console.log(dates);
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