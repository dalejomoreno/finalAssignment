export async function fetchPopulationData(country) {
  const API_KEY = "5twGKhwWzClATFj2cdU8uQ==EZGLlorbiU8WUlP7"; // Reemplaza con tu API Key
  const apiUrl = `https://api.api-ninjas.com/v1/population?country=${encodeURIComponent(
    country
  )}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text(); // Obtén detalles del error
      throw new Error(`API Error: ${errorDetails}`);
    }

    const data = await response.json();
    console.log("API Response Data:", data); // Depuración
    return data;
  } catch (error) {
    console.error("Error in fetchPopulationData:", error);
    throw new Error("Failed to fetch population data.");
  }
}
