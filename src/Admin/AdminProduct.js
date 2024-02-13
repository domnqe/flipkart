import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://159.65.21.42:9000/products")
      .then((response) => response.json())
      .then((data) => {
        const tezzergreatsProducts = data.filter(
          (product) => product.category === "tezzergreats"
        );

        setProducts(tezzergreatsProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmed) {
      fetch(`http://159.65.21.42:9000/product/${productId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Product deleted successfully", data);
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== productId)
          );
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
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
          <Link className="link" to="/admin">
            <li>Dashboard</li>
          </Link>
          <Link className="link" to="/admin-users">
            <li>Users</li>
          </Link>
          <Link className="link" to="/admin-product">
            <li>Products</li>
          </Link>
          <Link className="link" to="/create-user">
            <li>New User</li>
          </Link>
          <Link className="link" to="/create-product">
            <li>New Product</li>
          </Link>
        </ul>
      </div>
      <div className="admin-main">
        <div className="top">
          <h1>Product Details</h1>
          <Link className="link" to="/">
            <p className="site">Back to website</p>
          </Link>
        </div>
        <div className="second">
          {loading && (
            <div className="load">
              <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          )}
          {!loading && products.length === 0 && <p>No products found</p>}
          {!loading &&
            products.map((product) => (
              <div key={product._id} className="admin-card2">
                <h1>{product.name}</h1>
                <img
                  src={`http://159.65.21.42:9000${product.image}`}
                  alt={product.title}
                />
                <p>{`NGN ${product.price}`}</p>
                <div className="flex admin-btn">
                  <button>
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDelete(product._id)}>
                    <RiDeleteBin6Line /> Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
