const BITLY_ACCESS_TOKEN = '5fabc3fc7ff40f9737bb3c5186ad885d23670ceb';

async function shortenLink() {
    const inputSpace = document.getElementById("inputSpace");
    const shortenedLinkElement = document.getElementById("shortenedLink");
    const errorMessageElement = document.getElementById("errorMessage");

    shortenedLinkElement.textContent = "";
    errorMessageElement.textContent = "";

    const longUrl = inputSpace.value.trim();

    if (!longUrl) {
        errorMessageElement.textContent = "Please enter a valid URL.";
        return;
    }

    try {
        const response = await fetch("https://api-ssl.bitly.com/v4/shorten", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${BITLY_ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ long_url: longUrl })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        let shortUrl = data.link;
        shortenedLinkElement.innerHTML = `<p>Your Shortened URL is:  <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>`;
    } catch (error) {
        errorMessageElement.textContent = `Failed to shorten URL. Check your Internet Connection`;
        console.error(error.message);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const profileCircle = document.getElementById("message-container");
    profileCircle.style.display = "block"
})