import { useRef } from "react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, onGiveFeedback }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = 320; // px
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="carousel-wrapper">
      <button
        className="carousel-arrow left"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        ◀
      </button>

      <div className="carousel" ref={scrollRef}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onGiveFeedback={onGiveFeedback}
          />
        ))}
      </div>

      <button
        className="carousel-arrow right"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        ▶
      </button>
    </div>
  );
}