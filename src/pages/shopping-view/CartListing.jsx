import { fetchCart, removeFromCart } from "@/store/shop/cart/cartSlice";
import { placeOrder } from "@/store/shop/order/orderSlice";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function CartListing() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "cod",
  });

  const { items, status } = useSelector((state) => state.cartSlice);
  const { id: userId } = useSelector((state) => state.auth.user);

  console.log(items, "items");

  useEffect(() => {
    if (userId) dispatch(fetchCart(userId));
  }, [dispatch, userId]);

  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (productId) => {
    setRemovingId(productId);
    try {
      await dispatch(removeFromCart({ userId, productId }));
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setRemovingId(null);
    }
  };

  const getTotalAmount = () => {
    return items.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async () => {
    const orderPayload = {
      userId,
      items: items.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount: getTotalAmount(),
      deliveryAddress: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      },
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === "cod" ? "unpaid" : "pending",
    };

    console.log(orderPayload, "orderPayload");

    try {
      const res = await dispatch(placeOrder(orderPayload)).unwrap();
      setShowModal(false);

      if (formData.paymentMethod === "online") {
        navigate(`/payment/${res._id}`); // Redirect to Razorpay payment page
      } else {
        alert("Order placed successfully with Cash on Delivery!");
      }
    } catch (error) {
      alert(error?.message || "Failed to place order");
    }
  };

  if (status === "loading") {
    return <div className="text-center py-10">Loading cart...</div>;
  }

  if (!items.length) {
    return (
      <div className="text-center py-10 text-gray-500">Your cart is empty.</div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Your Cart</h2>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li
            key={item.productId._id}
            className="flex justify-between items-center py-4"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.productId.image || "https://via.placeholder.com/50"}
                alt={item.productId.name}
                className="w-14 h-14 rounded object-cover"
              />
              <div>
                <h4 className="font-medium">{item.productId.name}</h4>
                <p className="text-sm text-gray-600">
                  Price: ${item.productId.price}
                </p>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleRemove(item.productId._id)}
              disabled={removingId === item.productId._id}
              className={`px-3 py-1 rounded ${
                removingId === item.productId._id
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              } text-white`}
            >
              {removingId === item.productId._id ? "Removing..." : "Remove"}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <h3 className="text-xl font-bold mb-4">
          Total: ${getTotalAmount().toFixed(2)}
        </h3>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Checkout
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
            <h3 className="text-xl font-semibold mb-4">Delivery Information</h3>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
              <textarea
                name="address"
                placeholder="Delivery Address"
                value={formData.address}
                onChange={handleFormChange}
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
              <div className="flex flex-col">
                <label className="font-medium mb-1">Payment Method:</label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === "cod"}
                    onChange={handleFormChange}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={formData.paymentMethod === "online"}
                    onChange={handleFormChange}
                  />
                  <span>Online Payment</span>
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleOrderSubmit}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Submit Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartListing;
