import { useState } from "react";
import axios from "axios";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("khalti");

  const handlePayment = async () => {
    if (!amount) return alert("Please enter an amount!");

    try {
      if (paymentMethod === "khalti") {
        const res = await axios.post("http://localhost:5000/api/payment/khalti", {
          amount,
          purchase_order_id: "123456",
          purchase_order_name: "Travel Package"
        });
        window.location.href = res.data.payment_url;
      } else if (paymentMethod === "esewa") {
        window.location.href = `https://uat.esewa.com.np/epay/main?amt=${amount}&scd=EPAYTEST&pid=123456&su=http://localhost:3000/payment-success&fu=http://localhost:3000/payment-failed`;
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-lg rounded-md">
      <h1 className="text-2xl font-bold mb-4">Choose Payment Method</h1>
      
      <input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border p-2 mb-4 w-full"
      >
        <option value="khalti">Khalti</option>
        <option value="esewa">eSewa</option>
      </select>

      <button
        onClick={handlePayment}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
