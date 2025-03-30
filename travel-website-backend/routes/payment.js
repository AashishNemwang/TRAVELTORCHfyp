const express = require("express");
const router = express.Router();
const axios = require("axios");

// Khalti Payment Initiation
router.post("/khalti", async (req, res) => {
  const { amount, purchase_order_id, purchase_order_name } = req.body;
  
  const khaltiData = {
    return_url: "http://localhost:3000/payment-success",
    website_url: "http://localhost:3000",
    amount: amount * 100, // Khalti requires amount in paisa
    purchase_order_id,
    purchase_order_name
  };

  try {
    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/", khaltiData, {
      headers: {
        Authorization: `Key YOUR_KHALTI_SECRET_KEY`,
        "Content-Type": "application/json"
      }
    });
    res.json({ payment_url: response.data.payment_url });
  } catch (error) {
    res.status(500).json({ error: error.response.data });
  }
});

// eSewa Payment Verification (After User Pays)
router.post("/esewa", async (req, res) => {
  const { amt, rid, pid } = req.body;

  const esewaData = {
    amt,
    scd: "EPAYTEST",
    rid,
    pid
  };

  try {
    const response = await axios.post("https://uat.esewa.com.np/epay/transrec", esewaData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    });
    
    if (response.data.includes("Success")) {
      res.json({ message: "Payment Successful" });
    } else {
      res.status(400).json({ message: "Payment Verification Failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error verifying payment" });
  }
});

module.exports = router;
