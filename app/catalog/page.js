"use client";  // Ensures it's treated as a Client Component

import "./ProductList.css";

// Sample data
const sampleProducts = [
  { id: 1, name: "Laptop", department: "Electronics", brand: "Brand A" },
  { id: 2, name: "T-Shirt", department: "Apparel", brand: "Brand B" },
  { id: 3, name: "Smartphone", department: "Electronics", brand: "Brand A" },
  { id: 4, name: "Jacket", department: "Apparel", brand: "Brand B" },
  { id: 5, name: "Tablet", department: "Electronics", brand: "Brand C" },
  { id: 6, name: "Sneakers", department: "Footwear", brand: "Brand D" },
  { id: 7, name: "Headphones", department: "Electronics", brand: "Brand E" },
  { id: 8, name: "Dress", department: "Apparel", brand: "Brand F" },
  { id: 9, name: "Camera", department: "Electronics", brand: "Brand A" },
  { id: 10, name: "Jeans", department: "Apparel", brand: "Brand B" },
  { id: 11, name: "Smartwatch", department: "Electronics", brand: "Brand C" },
  { id: 12, name: "Boots", department: "Footwear", brand: "Brand D" },
  { id: 13, name: "Bluetooth Speaker", department: "Electronics", brand: "Brand E" },
  { id: 14, name: "Sweater", department: "Apparel", brand: "Brand F" },
  { id: 15, name: "Gaming Console", department: "Electronics", brand: "Brand A" },
  { id: 16, name: "Sandals", department: "Footwear", brand: "Brand D" },
  { id: 17, name: "VR Headset", department: "Electronics", brand: "Brand C" },
  { id: 18, name: "Watch", department: "Apparel", brand: "Brand B" },
  { id: 19, name: "Desktop PC", department: "Electronics", brand: "Brand A" },
  { id: 20, name: "Scarf", department: "Apparel", brand: "Brand F" },
];

const handleProductClick = (product) => {
  // Action to perform on click
  alert(`Clicked on ${product.name}`);
};

const ProductList = () => {
  return (
    <div className="product-list-container">
      <div className="product-list-box">
        <section className="products-container">
          <div className="product-list-product-wrapper">
            {sampleProducts.map((product) => (
              <div
                key={product.id}
                className="product-item"
                onClick={() => handleProductClick(product)}
              >
                <p>{product.name}</p>
                <p>{`Department: ${product.department}`}</p>
                <p>{`Brand: ${product.brand}`}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductList;
