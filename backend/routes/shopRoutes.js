const express = require("express");
const Razorpay = require("razorpay");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();
const logger = require("../utils/logger");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route 1: Create Razorpay Order
router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount." });
  }

  const options = {
    amount,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      message: "Razorpay order created successfully.",
    });
  } catch (error) {
    logger.error("❌ Razorpay order creation failed:", error);
    res.status(500).json({ error: "Order creation failed. " + error.message });
  }
});

// Route 2: Send Order Confirmation Email
router.post("/send-confirmation", async (req, res) => {
  const { formData, cart, paymentResponse } = req.body;

  if (!formData || !cart || !paymentResponse) {
    return res.status(400).json({ error: "Missing required data." });
  }

  let totalAmount = 0;
  cart.forEach(item => {
    if (!item.comingSoon) {
      totalAmount += item.price * item.quantity;
    }
  });

  const htmlContent = `
    <div style="font-family: 'Segoe UI', sans-serif; background-color: #f9fdf9; padding: 20px; border-radius: 12px; max-width: 700px; margin: auto; box-shadow: 0 0 15px rgba(0,0,0,0.05); color: #333;">
      <div style="background-color: #e6f4ea; padding: 20px; border-radius: 12px 12px 0 0; text-align: center;">
        <h2 style="color: #2e7d32; margin: 0;">🌿 Growlify Essentials Order Confirmation</h2>
      </div>

      <div style="padding: 20px;">
        <p>Dear <strong>${formData.fullName}</strong>,</p>
        <p>Thank you for your recent purchase from <strong>Growlify Essentials</strong>! Your order has been successfully placed and your payment processed.</p>

        <h3 style="color: #2e7d32; margin-top: 30px;">Customer & Shipping Details:</h3>
        <p><strong>Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
        <p><strong>Phone:</strong> ${formData.phone}</p>
        <p><strong>Address:</strong> ${formData.address}, ${formData.area}, ${formData.city}, ${formData.state} - ${formData.pincode}</p>

        <h3 style="color: #2e7d32; margin-top: 30px;">🛒 Items Ordered:</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; background-color: #ffffff;">
          <thead style="background-color: #d1f0d4;">
            <tr>
              <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ccc;">Product</th>
              <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ccc;">Option</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ccc;">Quantity</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ccc;">Unit Price</th>
              <th style="padding: 10px; text-align: right; border-bottom: 1px solid #ccc;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${cart.map(item => {
              const subtotal = item.price * item.quantity;
              return `
                <tr style="background-color: #f5fcf6;">
                  <td style="padding: 10px;">${item.name}</td>
                  <td style="padding: 10px;">${item.selectedOption || 'N/A'}</td>
                  <td style="padding: 10px; text-align: right;">${item.quantity}</td>
                  <td style="padding: 10px; text-align: right;">₹${item.price.toFixed(2)}</td>
                  <td style="padding: 10px; text-align: right;">₹${subtotal.toFixed(2)}</td>
                </tr>
              `;
            }).join("")}
          </tbody>
          <tfoot>
            <tr style="font-weight: bold;">
              <td colspan="4" style="padding: 10px; text-align: right;">Grand Total:</td>
              <td style="padding: 10px; text-align: right;">₹${totalAmount.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <h3 style="color: #2e7d32; margin-top: 30px;">💳 Payment Details:</h3>
        <p><strong style="color: #2e7d32;">Razorpay Payment ID:</strong> ${paymentResponse.razorpay_payment_id}</p>
        <p><strong style="color: #2e7d32;">Razorpay Order ID:</strong> ${paymentResponse.razorpay_order_id}</p>
        <p><strong>Status:</strong> ✅ Payment Successful</p>

        <p style="margin-top: 20px;">We are preparing your order for shipment and will notify you once it's on its way. You can expect your gardening essentials to arrive soon!</p>
        <p>If you have any questions, feel free to reach out.</p>

        <p>Thank you again for choosing <strong>Growlify Essentials</strong> 🌱</p>

        <p style="margin-top: 30px;">Warm Regards,<br><strong>The Growlify Essentials Team</strong></p>
      </div>

      <div style="text-align: center; font-size: 12px; color: #888; padding: 10px; border-top: 1px solid #eee;">
        © ${new Date().getFullYear()} Growlify Essentials. All rights reserved.
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: `${formData.email}, ${process.env.EMAIL_USER}`,
      subject: "🌿 Your Growlify Essentials Order is Confirmed!",
      html: htmlContent,
    });

    res.status(200).json({ message: "Confirmation email sent." });
  } catch (error) {
    logger.error("❌ Email send failed:", error.message);
    res.status(500).json({ error: "Failed to send email. " + error.message });
  }
});

module.exports = router;
