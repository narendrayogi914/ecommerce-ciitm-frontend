import { fetchMyOrders } from "@/store/shop/order/orderSlice";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Account() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  console.log(user, "user");

  const myOrders = useSelector((state) => state.orders.myOrders);

  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);
  const [showOrdersModal, setShowOrdersModal] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.userName || "");
      // Dispatch fetch orders with userId when component mounts
      dispatch(fetchMyOrders(user.id));
    }
  }, [user, dispatch]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUpdateProfile = () => {
    setUpdating(true);
    // Your update logic here
    setTimeout(() => {
      setUpdating(false);
      alert("Profile updated!");
    }, 1000);
  };

  const toggleOrdersModal = () => {
    setShowOrdersModal((prev) => !prev);
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">User Account</h2>

      <div className="mb-4">
        <label className="block font-medium mb-1" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.email || ""}
          readOnly
          className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          placeholder="Your email"
        />
      </div>

      <button
        onClick={handleUpdateProfile}
        disabled={updating || name.trim() === ""}
        className={`w-full py-2 rounded text-white mb-4 ${
          updating || name.trim() === ""
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {updating ? "Updating..." : "Update Profile"}
      </button>

      <button
        onClick={toggleOrdersModal}
        className="w-full py-2 rounded bg-green-600 hover:bg-green-700 text-white"
      >
        Orders
      </button>

      {/* Orders Modal */}
      {showOrdersModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={toggleOrdersModal}
        >
          <div
            className="bg-white rounded p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4">My Orders</h3>
            {myOrders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <ul className="space-y-3">
                {myOrders.map((order) => (
                  <li
                    key={order._id}
                    className="border border-gray-300 rounded p-3"
                  >
                    <p>
                      <strong>Order ID:</strong> {order._id}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> ₹{order.totalAmount}
                    </p>
                    <p>
                      <strong>Payment Status:</strong> {order.paymentStatus}
                    </p>
                    <p>
                      <strong>Payment Method:</strong> {order.paymentMethod}
                    </p>
                    <p>
                      <strong>Items:</strong>{" "}
                      {order.items
                        .map(
                          (item) =>
                            `${item.productId?.name || "Unknown"} (x${
                              item.quantity
                            })`
                        )
                        .join(", ")}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={toggleOrdersModal}
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
