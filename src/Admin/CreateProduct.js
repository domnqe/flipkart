import React, { useState } from "react";
import { Link } from "react-router-dom";

function CreateProduct() {
  const initialFormData = {
    name: "",
    image: null,
    price: "",
    quantity: "",
    description: "",
    category: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const [nameError, setNameError] = useState("");
  const [imageError, setImageError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError("");
    setImageError("");
    setPriceError("");
    setQuantityError("");
    setDescriptionError("");
    setCategoryError("");

    if (!formData.name.trim()) {
      setNameError("This field is required");
    }

    if (!formData.image) {
      setImageError("This field is required");
    }

    if (!formData.price.trim()) {
      setPriceError("This field is required");
    }

    if (!formData.quantity.trim()) {
      setQuantityError("This field is required");
    }

    if (!formData.description.trim()) {
      setDescriptionError("This field is required");
    }

    if (!formData.category.trim()) {
      setCategoryError("This field is required");
    }

    if (
      formData.name &&
      formData.image &&
      formData.price &&
      formData.quantity &&
      formData.description &&
      formData.category
    ) {
      const formCopy = { ...formData };
      setFormData({ ...initialFormData });

      const formDataToSend = new FormData();
      formDataToSend.append("name", formCopy.name);
      formDataToSend.append("image", formCopy.image);
      formDataToSend.append("price", formCopy.price);
      formDataToSend.append("quantity", formCopy.quantity);
      formDataToSend.append("description", formCopy.description);
      formDataToSend.append("category", formCopy.category);

      try {
        const response = await fetch("http://159.65.21.42:9000/create/product", {
          method: "POST",
          body: formDataToSend,
        });

        if (response.ok) {
          alert("Product created successfully");
        } else {
          alert("Error creating product:", response.statusText);
        }
      } catch (error) {
        alert("Error creating product:", error.message);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="admin">
      <div className="admin-nav">
        <img
          src="https://ae01.alicdn.com/kf/S4fccb8f4b6b2454699e1b4d8a93706f0m/416x128.png"
          alt=""
        />
        <ul>
          <Link className="link" to="/admin"><li>Dashboard</li></Link>
          <Link className="link" to="/admin-users"><li>Users</li></Link>
          <Link className="link" to="/admin-product"><li>Products</li></Link>
          <Link className="link" to="/create-user"><li>New User</li></Link>
          <Link className="link" to="/create-product"><li>New Product</li></Link>
        </ul>
      </div>
      <div className="admin-main">
        <div className="top">
          <h1>Product Details</h1>
          <Link className="link" to="/"><p className="site">Back to website</p></Link>
        </div>
        <div className="createProduct">
          <form onSubmit={handleSubmit}>
            <h3>Create A New Product</h3>
            <h4>Name</h4>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <br />
            <span style={{ color: "red" }}>{nameError}</span>

            <h4>Image</h4>
            <input type="file" name="image" onChange={handleInputChange} />
            <br />
            <span style={{ color: "red" }}>{imageError}</span>

            <h4>Price</h4>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <br />
            <span style={{ color: "red" }}>{priceError}</span>

            <h4>Quantity</h4>
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
            />
            <br />
            <span style={{ color: "red" }}>{quantityError}</span>

            <h4>Description</h4>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <br />
            <span style={{ color: "red" }}>{descriptionError}</span>

            <h4>Category</h4>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <br />
            <span style={{ color: "red" }}>{categoryError}</span>

            <button type="submit">Create Product</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
