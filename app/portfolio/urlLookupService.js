export async function fetchUrlLocation(url) {
  const API_KEY = "5twGKhwWzClATFj2cdU8uQ==EZGLlorbiU8WUlP7"; // Reemplaza con tu API Key
  const apiUrl = `https://api.api-ninjas.com/v1/urllookup?url=${encodeURIComponent(url)}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`API Error: ${errorDetails}`);
    }

    const data = await response.json();
    console.log("API Response Data (URL):", data); // Depuración
    return data;
  } catch (error) {
    console.error("Error in fetchUrlLocation:", error);
    throw new Error("Failed to fetch URL location data.");
  }
}
