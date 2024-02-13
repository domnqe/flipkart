import { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";

function AdminUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://159.65.21.42:9000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmed) {
      fetch(`http://159.65.21.42:9000/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return {};
          }
        })
        .then((data) => {
          alert("User deleted successfully");
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user._id !== userId)
          );
        })
        .catch((error) => {
          alert("Error deleting user");
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
          <h1>User Details</h1>
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
          {!loading && users.length === 0 && <p>No users found</p>}
          {!loading &&
            users.map((user) => (
              <div key={user._id} className="admin-card2">
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
                <p>{user.location}</p>
                <div className="flex admin-btn">
                  <button>
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDelete(user._id)}>
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

export default AdminUser;
