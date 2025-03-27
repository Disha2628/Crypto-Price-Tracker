const API_URL = "https://api.coingecko.com/api/v3";

async function fetchCrypto() {
    const searchQuery = document.getElementById("cryptoSearch").value.toLowerCase();
    const currency = document.getElementById("currency").value;

    if (!searchQuery) {
        alert("Please enter a cryptocurrency name.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/simple/price?ids=${searchQuery}&vs_currencies=${currency}`);
        // `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd` ( for bitcoin in usd )
        if (!response.ok) {
            throw new Error("Failed to fetch data.");
        }

        const data = await response.json();

        if (data[searchQuery]) {
            displayCryptoInfo(searchQuery, data[searchQuery][currency], currency);
            console.log(data[searchQuery][currency]);
            fetchHistoricalData(searchQuery, currency);
        } else {
            alert("Cryptocurrency not found!");
        }
    } catch (error) {
        console.error("Error fetching crypto data:", error);
        alert("Failed to fetch data. Please try again.");
    }
}

function displayCryptoInfo(name, price, currency) {
    const cryptoInfo = document.getElementById("cryptoInfo");
    cryptoInfo.innerHTML = `
        <p><strong>${name.toUpperCase()}</strong> - Price: ${price} ${currency.toUpperCase()} 
        <span class="favorite" onclick="addToFavorites('${name}')">❤</span></p>
    `;
}

 
