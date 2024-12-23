import React, { useState, useCallback } from 'react';
import './PlaceItem.css';

const PlaceItem = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    category: 'Cars', // القيمة الافتراضية
    condition: '',
    subcategory: '',
    images: []
  });

  const apiUrl = 'https://demo.kwtmarkets.com'; // رابط الـ API

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can upload up to 5 images only.');
      return;
    }
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        value.forEach((file) => data.append('images', file));
      } else {
        data.append(key, value);
      }
    });

    try {
      const response = await fetch(`${apiUrl}/items`, { method: 'POST', body: data });
      if (response.ok) {
        alert('Item uploaded successfully!');
        setFormData({
          title: '',
          description: '',
          price: '',
          location: '',
          category: 'Cars',
          condition: '',
          subcategory: '',
          images: []
        });
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('Error uploading item:', err);
      alert('Failed to upload item.');
    }
  };

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/items`);
      const data = await response.json();
      setItems(data);
    } catch (err) {
      console.error('Error fetching items:', err);
      alert('Failed to fetch items.');
    }
  }, []);

  return (
    <div className="placeitem-container">
      <div className="form-container">
        <h1>Place your item</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Category:</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
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
              <label>Condition:</label>
              <input
                type="text"
                name="condition"
                value={formData.condition}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Subcategory:</label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Images (up to 5):</label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </div>
          <button type="submit">Upload Item</button>
        </form>
      </div>

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
    </div>
  );
};

export default PlaceItem;
