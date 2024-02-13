import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (name.trim() !== "") {
      setNameError("");
    }

    if (email.trim() !== "") {
      setEmailError("");
    }

    if (phone.trim() !== "") {
      setPhoneError("");
    }

    if (password.trim() !== "") {
      setPasswordError("");
    }
  }, [name, email, phone, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");

    if (!name.trim()) {
      setNameError("This field is required");
    }

    if (!email.trim()) {
      setEmailError("This field is required");
    }

    if (!phone.trim()) {
      setPhoneError("This field is required");
    }

    if (!password.trim()) {
      setPasswordError("This field is required");
    }

    if (name && email && phone && password) {
      try {
        const response = await fetch("http://159.65.21.42:9000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
          }),
        });

        if (response.ok) {
          alert("User created successfully");
        } else {
          alert("Error creating user:", response.statusText);
        }
      } catch (error) {
        alert("Error creating user:", error.message);
      }
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
        <div className="createUser">
          <form onSubmit={handleSubmit}>
            <h3>Create A New User</h3>
            <h4>Name</h4>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><br/>
            <span style={{ color: "red" }}>{nameError}</span>

            <h4>Email</h4>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br/>
            <span style={{ color: "red" }}>{emailError}</span>

            <h4>Phone Number</h4>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            /><br/>
            <span style={{ color: "red" }}>{phoneError}</span>

            <h4>Password</h4>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /><br/>
            <span style={{ color: "red" }}>{passwordError}</span>

            <button type="submit">Create User</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
