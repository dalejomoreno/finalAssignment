"use client"; // Añadir esto para marcar el componente como cliente

import { useState } from "react";
import Link from "next/link";
import { fetchUrlLocation } from "./urlLookupService";
import { fetchPopulationData } from "./populationService";

// Función para obtener una imagen aleatoria
const fetchRandomImage = async (category, width, height) => {
  const apiKey = "5twGKhwWzClATFj2cdU8uQ==EZGLlorbiU8WUlP7"; // Sustituye con tu API Key de API Ninjas
  const url = `https://api.api-ninjas.com/v1/randomimage?${category ? `category=${category}&` : ""}width=${width || 640}&height=${height || 480}`;
  const headers = {
    "X-Api-Key": apiKey,
    Accept: "image/jpg",
  };

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error("Failed to fetch random image");
  }
  const blob = await response.blob(); // Recibe la imagen en formato binario
  return URL.createObjectURL(blob); // Convierte el blob en un objeto URL para mostrar en el navegador
};

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("randomImage"); // Estado para la pestaña activa, ahora por defecto se selecciona Random Image
  const [url, setUrl] = useState("");
  const [urlLocation, setUrlLocation] = useState(null);
  const [urlError, setUrlError] = useState("");

  const [country, setCountry] = useState("");
  const [populationData, setPopulationData] = useState([]);
  const [populationError, setPopulationError] = useState("");

  const [category, setCategory] = useState("");
  const [width, setWidth] = useState(640);
  const [height, setHeight] = useState(480);
  const [randomImage, setRandomImage] = useState("");
  const [imageError, setImageError] = useState("");

  const handleUrlLocation = async () => {
    setUrlError("");
    try {
      if (url) {
        const data = await fetchUrlLocation(url);
        setUrlLocation(data);
      } else {
        setUrlError("Please enter a valid URL.");
      }
    } catch (error) {
      setUrlError("Failed to fetch URL location data.");
    }
  };

  const handlePopulationLookup = async () => {
    setPopulationError("");
    try {
      if (country) {
        const data = await fetchPopulationData(country);
        setPopulationData(data);
      } else {
        setPopulationError("Please enter a valid country.");
      }
    } catch (error) {
      setPopulationError("Failed to fetch population data.");
    }
  };

  const handleRandomImage = async () => {
    setImageError("");
    try {
      const imageUrl = await fetchRandomImage(category, width, height);
      setRandomImage(imageUrl);
    } catch (error) {
      setImageError("Failed to fetch random image.");
    }
  };

  return (
    <div className="portfolio-page container py-5">
      <h1 className="text-center mb-4">My Portfolio</h1>
      <p className="lead text-center">Explore some of my recent projects and designs.</p>

      {/* Navegación de pestañas */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "randomImage" ? "active" : ""}`}
            onClick={() => setActiveTab("randomImage")}
          >
            Random Image Generator
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "population" ? "active" : ""}`}
            onClick={() => setActiveTab("population")}
          >
            Population Data
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "urlLookup" ? "active" : ""}`}
            onClick={() => setActiveTab("urlLookup")}
          >
            URL Location Lookup
          </button>
        </li>
      </ul>

      {/* Contenido dinámico basado en la pestaña activa */}
      <div className="tab-content mt-4">
        {activeTab === "randomImage" && (
          <div>
            <h2>Random Image Generator</h2>
            <input
              type="text"
              placeholder="Enter Category (optional)"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            />
            <input
              type="number"
              placeholder="Enter Width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="form-control mt-2"
            />
            <input
              type="number"
              placeholder="Enter Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="form-control mt-2"
            />
            <button onClick={handleRandomImage} className="btn btn-primary mt-2">
              Get Random Image
            </button>
            {imageError && <p className="text-danger">{imageError}</p>}
            {randomImage && <img src={randomImage} alt="Random" className="img-fluid mt-3" />}
          </div>
        )}

        {activeTab === "population" && (
          <div>
            <h2>Population Data</h2>
            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="form-control"
            />
            <button onClick={handlePopulationLookup} className="btn btn-primary mt-2">
              Get Population Data
            </button>
            {populationError && <p className="text-danger">{populationError}</p>}
            {populationData.historical_population &&
            populationData.historical_population.length > 0 ? (
              <div>
                <h3>Historical Population Data</h3>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Population</th>
                      <th>Yearly Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {populationData.historical_population.map((item, index) => (
                      <tr key={index}>
                        <td>{item.year}</td>
                        <td>{item.population.toLocaleString()}</td>
                        <td>{item.yearly_change.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              !populationError && <p>No population data found.</p>
            )}
          </div>
        )}

        {activeTab === "urlLookup" && (
          <div>
            <h2>URL Location Lookup</h2>
            <input
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="form-control"
            />
            <button onClick={handleUrlLocation} className="btn btn-primary mt-2">
              Get Location
            </button>
            {urlError && <p className="text-danger">{urlError}</p>}
            {urlLocation && (
              <div>
                <p>City: {urlLocation.city || "N/A"}</p>
                <p>Country: {urlLocation.country || "N/A"}</p>
                <p>Latitude: {urlLocation.latitude || "N/A"}</p>
                <p>Longitude: {urlLocation.longitude || "N/A"}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-center mt-5">
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link href="/about" className="btn btn-light ms-3">
          About Me
        </Link>
      </div>
    </div>
  );
}
