// Imports
import { useState } from "react";
import { db } from "../firebase.js";
import { collection, addDoc } from "firebase/firestore";

// Component
function DbSeeder() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const seedDatabase = async () => {
    if (
      !window.confirm(
        "Are you sure you want to add 100 products to the database?",
      )
    )
      return;

    setIsUploading(true);
    const productsCollection = collection(db, "products");

    const names = [
      "Ultra",
      "Pro",
      "Max",
      "Lite",
      "Elite",
      "Master",
      "Gamer",
      "Office",
    ];
    const categories = [
      "Laptops",
      "Phones",
      "Tablets",
      "Audio",
      "Gaming",
      "Accessories",
    ];

    // Warehouses locations
    const warehouses = [
      { lat: 55.6761, lng: 12.5683, name: "Copenhagen Central Hub" },
      { lat: 55.6867, lng: 12.5701, name: "Nørrebro Storage" },
      { lat: 55.6621, lng: 12.5415, name: "Vesterbro Depot" },
      { lat: 55.6984, lng: 12.5794, name: "Østerbro Facility" },
      { lat: 55.6541, lng: 12.605, name: "Amager Distribution" },
      { lat: 55.6795, lng: 12.5298, name: "Frederiksberg Center" },
      { lat: 55.7204, lng: 12.4746, name: "Herlev Stock" },
      { lat: 55.6558, lng: 12.3855, name: "Glostrup Warehouse" },
      { lat: 55.7371, lng: 12.3965, name: "Ballerup Electronics Unit" },
      { lat: 55.6262, lng: 12.4781, name: "Hvidovre Dispatch" },
    ];

    const getImageForCategory = (category) => {
      switch (category) {
        case "Laptops":
          return "/laptop.jpg";
        case "Phones":
          return "/iphone.jpg";
        case "Tablets":
          return "/tablet.jpg";
        case "Audio":
          return "/headphones.jpg";
        case "Gaming":
          return "/gamepad.jpg";
        case "Accessories":
          return Math.random() > 0.5 ? "/mouse.jpg" : "/keyboard.jpg";
        default:
          return "/laptop.jpg";
      }
    };

    try {
      for (let i = 1; i <= 100; i++) {
        const randomCategory =
          categories[Math.floor(Math.random() * categories.length)];
        const randomName = `${names[Math.floor(Math.random() * names.length)]} ${randomCategory} v${i}`;

        const randomWarehouse =
          warehouses[Math.floor(Math.random() * warehouses.length)];

        const newProduct = {
          name: randomName,
          price: Math.floor(Math.random() * (2000 - 50 + 1)) + 50,
          category: randomCategory,
          image: getImageForCategory(randomCategory),
          description: `Perfect choice in the ${randomCategory} category. The ${randomName} model combines performance and style.`,
          createdAt: new Date(),
          location: {
            lat: randomWarehouse.lat,
            lng: randomWarehouse.lng,
            warehouseName: randomWarehouse.name,
          },
        };

        await addDoc(productsCollection, newProduct);
        setProgress(i);
      }
      alert("Done! 100 products successfully added with locations and images.");
    } catch (error) {
      console.error("Error during seeding:", error);
      alert("An error occurred while uploading data.");
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  return (
    <div style={seederStyle}>
      <h3>Developer Tool</h3>
      <p>
        Click the button below to automatically fill Firestore with products.
      </p>
      <button onClick={seedDatabase} disabled={isUploading} style={buttonStyle}>
        {isUploading ? `Uploading: ${progress}%` : "Upload 100 Products"}
      </button>
      {isUploading && (
        <p style={{ color: "#4caf50" }}>Please do not close the page...</p>
      )}
    </div>
  );
}

const seederStyle = {
  backgroundColor: "#242424",
  border: "2px dashed #4caf50",
  borderRadius: "12px",
  padding: "20px",
  margin: "40px auto",
  maxWidth: "400px",
  textAlign: "center",
};

const buttonStyle = {
  backgroundColor: "#4caf50",
  color: "white",
  border: "none",
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
  transition: "opacity 0.3s",
};

export default DbSeeder;
