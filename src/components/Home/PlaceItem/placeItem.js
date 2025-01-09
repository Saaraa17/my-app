/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import "./PlaceItem.css";

const PlaceItem = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    category: "Cars", // القيمة الافتراضية
    condition: "",
    subcategory: "",
    images: [],
  });

  const apiUrl = "https://kwtmarkets.net/back/items?status=act"; // رابط الـ API

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("You can upload up to 5 images only.");
      return;
    }
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // إذا لم يختار المستخدم فئة، يتم تعيين "Cars" كفئة افتراضية
    const category = formData.category || "Cars";

    const data = new FormData();
    Object.entries({ ...formData, category }).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => data.append("images", file));
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await fetch(`${apiUrl}`, { method: "POST", body: data });
      if (response.ok) {
        alert(t("upload_item_button") + "!");
        setFormData({
          title: "",
          description: "",
          price: "",
          location: "",
          category: "Cars", // إعادة التعيين للقيمة الافتراضية
          condition: "",
          subcategory: "",
          images: [],
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error("Error uploading item:", err);
      alert(t("failed_to_upload_item"));
    }
  };

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/items`);
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error("Error fetching items:", err);
      alert(t("failed_to_fetch_items"));
    }
  }, [t]);

  return (
    <div className="placeitem-container">
      <div className="form-container">
        <h1>{t("place_item_title")}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>{t("title")}</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>{t("description")}</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>{t("price")}</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>{t("location")}</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>{t("category")}</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="Cars">Cars</option>
                <option value="Property">Property</option>
                <option value="Services">Services</option>
                <option value="Furniture">Furniture</option>
                <option value="Camping">Camping</option>
                <option value="Gifts">Gifts</option>
                <option value="Contracting">Contracting</option>
                <option value="Family">Family</option>
                <option value="Animals">Animals</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
            <div>
              <label>{t("condition")}</label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>{t("subcategory")}</label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>{t("images_label")}</label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button type="submit">{t("upload_item_button")}</button>
        </form>
      </div>
    
  

{/*
      <div className="items-container">
        <button onClick={fetchItems}>See your Upload Item</button>
        <div id="itemsContainer">
          {items.length === 0 ? (
            <p>No items found. Try uploading some items!</p>
          ) : (
            items.map((item, index) => (
              <div key={index} className="item">
                {item.images.map((imageBase64, i) => (
                  <img key={i} src={imageBase64} alt={`Item ${i + 1}`} />
                ))}
                <div>
                  <strong>Title:</strong> {item.title}<br />
                  <strong>Description:</strong> {item.description}<br />
                  <strong>Price:</strong> ${item.price}<br />
                  <strong>Location:</strong> {item.location}<br />
                  <strong>Category:</strong> {item.category}<br />
                  <strong>Condition:</strong> {item.condition}<br />
                  <strong>Subcategory:</strong> {item.subcategory || 'N/A'}<br />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      */}
    </div>
  );
};

export default PlaceItem;
