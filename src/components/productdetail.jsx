import React, { useState } from "react";
import "./productdetail.css";

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Red");
  const [currentImage, setCurrentImage] = useState(0);
  const [reviews, setReviews] = useState([
    { rating: 5, text: "Amazing quality and fast shipping!", author: "Alex D." },
    { rating: 4, text: "Great fit and fabric, but delivery was delayed.", author: "Samira K." },
  ]);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState(0);

  const sizes = ["S", "M", "L", "XL"];
  const colors = ["Red", "Blue", "Green"];
  const images = [
    "https://m.media-amazon.com/images/I/71eUwDk8z+L._SX569_.jpg",
    "https://m.media-amazon.com/images/I/71mh8ZJZFuL._SX569_.jpg",
    "https://m.media-amazon.com/images/I/71vSLpVgZpL._SX569_.jpg",
  ];

  const handleAddToCart = () => {
    alert(`Added to cart: Size - ${selectedSize}, Color - ${selectedColor}`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newReview.trim() && newRating > 0) {
      setReviews([{ rating: newRating, text: newReview, author: "You" }, ...reviews]);
      setNewReview("");
      setNewRating(0);
    }
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="product-container">
      <div className="product-image-slider">
        <img src={images[currentImage]} alt={`Product ${currentImage + 1}`} />
        <button className="slider-btn prev" onClick={prevImage}>&#10094;</button>
        <button className="slider-btn next" onClick={nextImage}>&#10095;</button>
      </div>

      <div className="product-details">
        <h1 className="product-title">Premium T-Shirt</h1>
        <p className="product-description">
          This is a high-quality premium cotton T-shirt available in various sizes and colors.
        </p>
        <div className="product-price">$29.99</div>

        <div className="product-section">
          <label>Size:</label>
          <div className="option-buttons">
            {sizes.map((size) => (
              <button
                key={size}
                className={`option-button ${selectedSize === size ? "selected" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="product-section">
          <label>Color:</label>
          <div className="option-buttons">
            {colors.map((color) => (
              <button
                key={color}
                className={`option-button color-btn ${selectedColor === color ? "selected" : ""}`}
                onClick={() => setSelectedColor(color)}
                style={{ backgroundColor: color.toLowerCase() }}
                title={color}
              ></button>
            ))}
          </div>
        </div>

        <button className="add-to-cart" onClick={handleAddToCart}>
          Add to Cart
        </button>

        <div className="reviews">
          <h2>Customer Reviews</h2>

          <form onSubmit={handleReviewSubmit} className="review-form">
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`star ${star <= newRating ? "filled" : ""}`}
                  onClick={() => setNewRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review..."
              required
            ></textarea>
            <button type="submit">Submit Review</button>
          </form>

          {reviews.map((review, index) => (
            <div className="review" key={index}>
              <div className="stars">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </div>
              <p>{review.text}</p>
              <small>— {review.author}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;