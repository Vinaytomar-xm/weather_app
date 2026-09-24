export default async function handler(req, res) {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({
            success: false,
            message: "City name is required"
        });
    }

    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
        return res.status(500).json({
            success: false,
            message: "API key is not configured"
        });
    }

    try {
        const url =
            `https://api.weatherapi.com/v1/current.json` +
            `?key=${API_KEY}` +
            `&q=${encodeURIComponent(city)}` +
            `&aqi=yes`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({
                success: false,
                message: data?.error?.message || "Unable to fetch weather"
            });
        }

        return res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        console.error("Weather API Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}