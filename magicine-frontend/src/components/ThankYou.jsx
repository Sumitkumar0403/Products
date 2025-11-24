import { useLocation } from "react-router-dom";

export default function ThankYouPage() {
  const location = useLocation();
  const data = location.state || {};
  const name = data.name || "there";
  const rating = data.rating;
  const message = data.message;

  return (
    <div className="page thank-you-page">
      <div className="thank-you-card">
        <div className="thank-you-icon">🎉</div>
        <h2>Thank you, {name}!</h2>
        <p>Your feedback has been submitted successfully.</p>

        {rating && (
          <p className="thank-you-rating">
            Your rating:{" "}
            <span>
              {Array.from({ length: rating })
                .map(() => "★")
                .join("")}
            </span>
          </p>
        )}

        {message && (
          <div className="thank-you-message">
            <h4>Your feedback:</h4>
            <p>{message}</p>
          </div>
        )}

        <button
          className="primary-btn"
          onClick={() => (window.location.href = "/")}
        >
          Back to Products
        </button>
      </div>
    </div>
  );
}