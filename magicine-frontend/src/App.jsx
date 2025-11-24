// src/App.jsx
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { products } from "./data/products";
import api from "./api";
import { toast } from "react-toastify";
import ThankYouPage from "./components/ThankYou";
import ProductCarousel from "./components/ProductCasousel";
import FeedbackModal from "./components/FeedbackModal";



function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
    </Routes>
  );
}

function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const openFeedback = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="page">
      <header className="page-header">
        <h1>Our Products</h1>
        <p>Choose a product and share your feedback.</p>
      </header>

      <ProductCarousel products={products} onGiveFeedback={openFeedback} />

      {showModal && selectedProduct && (
        <FeedbackModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
}

// Horizontal “shower-style” carousel
// function ProductCarousel({ products, onGiveFeedback }) {
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (!scrollRef.current) return;
//     const amount = 320; // px
//     scrollRef.current.scrollBy({
//       left: direction === "left" ? -amount : amount,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="carousel-wrapper">
//       <button
//         className="carousel-arrow left"
//         onClick={() => scroll("left")}
//         aria-label="Scroll left"
//       >
//         ◀
//       </button>

//       <div className="carousel" ref={scrollRef}>
//         {products.map((product) => (
//           <ProductCard
//             key={product.id}
//             product={product}
//             onGiveFeedback={onGiveFeedback}
//           />
//         ))}
//       </div>

//       <button
//         className="carousel-arrow right"
//         onClick={() => scroll("right")}
//         aria-label="Scroll right"
//       >
//         ▶
//       </button>
//     </div>
//   );
// }

// function ProductCard({ product, onGiveFeedback }) {
//   return (
//     <div className="product-card">
//       <div className="product-image-wrap">
//         <img src={product.image} alt={product.name} />
//       </div>
//       <div className="product-body">
//         <h3>{product.name}</h3>
//         <p className="product-price">₹{product.price}</p>
//         <button
//           className="primary-btn"
//           onClick={() => onGiveFeedback(product)}
//         >
//           Give Feedback
//         </button>
//       </div>
//     </div>
//   );
// }

// Feedback Modal with form + validation
// function FeedbackModal({ product, onClose }) {
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     rating: 0,
//     message: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   const validate = () => {
//     const newErr = {};

//     if (!form.name.trim()) newErr.name = "Name is required.";
//     if (!form.email.trim()) {
//       newErr.email = "Email is required.";
//     } else if (
//       !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
//     ) {
//       newErr.email = "Enter a valid email address.";
//     }

//     if (!form.rating || form.rating < 1 || form.rating > 5) {
//       newErr.rating = "Please select a rating between 1 and 5.";
//     }

//     if (!form.message.trim()) {
//       newErr.message = "Feedback is required.";
//     } else if (form.message.trim().length < 10) {
//       newErr.message = "Feedback should be at least 10 characters.";
//     }

//     setErrors(newErr);
//     return Object.keys(newErr).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleRatingClick = (value) => {
//     setForm((prev) => ({ ...prev, rating: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setSubmitting(true);
//     try {
//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         rating: form.rating,
//         message: form.message.trim(),
//         productId: product.id,
//         timestamp: new Date().toISOString(),
//       };

//       await api.post("/feedback", payload);
//       toast.success("Feedback submitted!");


//   navigate("/thank-you", {
//     state: {
//       name: payload.name,
//       rating: payload.rating,
//       message: payload.message,
//     },
//   });
//     } catch (err) {
//       // Simple error display – can improve later
//       alert("Something went wrong submitting feedback. Please try again.");
//       console.error(err);
//     } finally {
//       setSubmitting(false);
//       onClose();
//     }
//   };

//   return (
//     <div className="modal-backdrop" onClick={onClose}>
//       <div
//         className="modal"
//         onClick={(e) => e.stopPropagation()} // Prevent close on inner click
//       >
//         <button className="modal-close" onClick={onClose}>
//           ✕
//         </button>
//         <h2>Feedback for {product.name}</h2>
//         <form onSubmit={handleSubmit} className="feedback-form row">
//           <div className="form-field col-12 ">
//             <label>
//               Name <span>*</span>
//             </label>
//             <input
//               name="name"
//               type="text"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Enter your name"
//             />
//             {errors.name && <p className="error-text">{errors.name}</p>}
//           </div>

//           <div className="form-field col-12">
//             <label>
//               Email <span>*</span>
//             </label>
//             <input
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               placeholder="you@example.com"
//             />
//             {errors.email && <p className="error-text">{errors.email}</p>}
//           </div>

//           <div className="form-field col-12">
//             <label>
//               Rating (1–5) <span>*</span>
//             </label>
//             <div className="rating-row">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <button
//                   key={star}
//                   type="button"
//                   className={
//                     star <= form.rating ? "star-btn active" : "star-btn"
//                   }
//                   onClick={() => handleRatingClick(star)}
//                 >
//                   ★
//                 </button>
//               ))}
//             </div>
//             {errors.rating && <p className="error-text">{errors.rating}</p>}
//           </div>

//           <div className="form-field col-12">
//             <label>
//               Feedback <span>*</span>
//             </label>
//             <textarea
//               name="message"
//               rows={4}
//               value={form.message}
//               onChange={handleChange}
//               placeholder="Write your feedback..."
//             />
//             {errors.message && <p className="error-text">{errors.message}</p>}
//           </div>

//           <button
//             type="submit"
//             className="primary-btn full-width"
//             disabled={submitting}
//           >
//             {submitting ? "Submitting..." : "Submit Feedback"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// Thank You Page
// function ThankYouPage() {
//   const location = useLocation();
//   const data = location.state || {};
//   const name = data.name || "there";
//   const rating = data.rating;
//   const message = data.message;

//   return (
//     <div className="page thank-you-page">
//       <div className="thank-you-card">
//         <div className="thank-you-icon">🎉</div>
//         <h2>Thank you, {name}!</h2>
//         <p>Your feedback has been submitted successfully.</p>

//         {rating && (
//           <p className="thank-you-rating">
//             Your rating:{" "}
//             <span>
//               {Array.from({ length: rating })
//                 .map(() => "★")
//                 .join("")}
//             </span>
//           </p>
//         )}

//         {message && (
//           <div className="thank-you-message">
//             <h4>Your feedback:</h4>
//             <p>{message}</p>
//           </div>
//         )}

//         <button
//           className="primary-btn"
//           onClick={() => (window.location.href = "/")}
//         >
//           Back to Products
//         </button>
//       </div>
//     </div>
//   );
// }

export default App;
