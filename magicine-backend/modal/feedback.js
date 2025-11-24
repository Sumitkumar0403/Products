import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  rating: { type: Number, required: true },
  message: { type: String, required: true },
  productId: { type: String, required: true },
  timestamp: { type: String, required: true },
});

// Index for faster product lookup
feedbackSchema.index({ productId: 1 });

export default mongoose.model("Feedback", feedbackSchema);
