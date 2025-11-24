import express from "express";
import Feedback from "../modal/feedback.js";

const router = express.Router();

// POST — Create Feedback
router.post("/", async (req, res) => {
  try {
    const { name, email, rating, message, productId, timestamp } = req.body;

    if (!name || !email || !rating || !message || !productId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const feedback = new Feedback({
      name,
      email,
      rating,
      message,
      productId,
      timestamp,
    });

    await feedback.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error });
  }
});

// GET — Fetch Feedback by Product
router.get("/:productId", async (req, res) => {
  try {
    const feedback = await Feedback.find({ productId: req.params.productId }).sort({ timestamp: -1 });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error });
  }
});

export default router;
