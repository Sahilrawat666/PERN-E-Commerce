import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiHeart,
} from "react-icons/fi";
import { getProductById } from "../src/api/productApi.js";
import { useCart } from "../src/context/CartContext.jsx";
import { useWishlist } from "../src/context/WishlistContext.jsx";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const productInWishlist = product ? isInWishlist(product.id) : false;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);

        setProduct(data.product);
      } catch (error) {
        console.error("Fetch product error:", error);

        setError(error.message || "Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity((previous) => previous + 1);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((previous) => Math.max(1, previous - 1));
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5f0]">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#ddd5cc] border-t-[#b08d57]" />

          <p className="mt-4 text-sm text-[#81776e]">Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f5f0] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-light text-[#302923]">
            Product unavailable
          </h1>

          <p className="mt-3 text-sm text-[#81776e]">
            {error || "We couldn't find this product."}
          </p>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 border border-[#302923] px-6 py-3 text-sm text-[#302923] transition hover:bg-[#302923] hover:text-white"
          >
            <FiArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const price = Number(product.price);
  const originalPrice = Number(product.original_price);
  const rating = Number(product.rating);
  const stock = Number(product.stock);

  const isOutOfStock = stock <= 0;

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-10 lg:px-16">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-xs text-[#81776e]">
          <Link to="/shop" className="transition-colors hover:text-[#b08d57]">
            Shop
          </Link>

          <span>/</span>

          <span>{product.category}</span>

          <span>/</span>

          <span className="text-[#302923]">{product.name}</span>
        </div>

        {/* Product */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative overflow-hidden bg-[#eee9e2]">
            <img
              src={product.image_url}
              alt={product.name}
              className="aspect-[3/4] h-full w-full object-cover"
            />

            {product.discount > 0 && (
              <span className="absolute left-5 top-5 bg-[#241c18] px-4 py-2 text-xs tracking-wide text-white">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Information */}
          <div className="flex flex-col justify-center">
            <p className="text-xs uppercase tracking-[0.25em] text-[#b08d57]">
              {product.category}
            </p>

            <h1 className="mt-4 text-3xl font-light tracking-tight text-[#302923] md:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#b08d57]">
                <span>★</span>
                <span className="text-sm text-[#302923]">
                  {rating.toFixed(1)}
                </span>
              </div>

              <span className="text-sm text-[#c2b9b0]">|</span>

              <span className="text-sm text-[#81776e]">{product.gender}</span>
            </div>

            {/* Price */}
            <div className="mt-7 flex items-center gap-3">
              <span className="text-2xl font-medium text-[#302923]">
                ₹{price.toLocaleString("en-IN")}
              </span>

              {product.original_price && (
                <span className="text-base text-[#a49a91] line-through">
                  ₹{originalPrice.toLocaleString("en-IN")}
                </span>
              )}

              {product.discount > 0 && (
                <span className="text-sm font-medium text-[#b08d57]">
                  Save {product.discount}%
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-[#ddd5cc] pt-7">
              <p className="text-sm leading-7 text-[#6f665e]">
                {product.description}
              </p>
            </div>

            {/* Stock */}
            <div className="mt-6">
              {isOutOfStock ? (
                <p className="text-sm font-medium text-red-600">Out of stock</p>
              ) : stock <= 5 ? (
                <p className="text-sm font-medium text-[#b08d57]">
                  Only {stock} left in stock
                </p>
              ) : (
                <p className="text-sm text-[#81776e]">In stock</p>
              )}
            </div>

            {/* Quantity */}
            {!isOutOfStock && (
              <div className="mt-7">
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[#81776e]">
                  Quantity
                </p>

                <div className="flex h-12 w-36 items-center border border-[#d8d0c8]">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="flex h-full w-12 items-center justify-center text-[#302923] transition hover:bg-[#eee9e2] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiMinus size={16} />
                  </button>

                  <span className="flex flex-1 items-center justify-center text-sm text-[#302923]">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= stock}
                    className="flex h-full w-12 items-center justify-center text-[#302923] transition hover:bg-[#eee9e2] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <FiPlus size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            {/* add to cart and wishlist buttons */}
            <div className="mt-8 flex gap-3">
              <button
                type="button"
                onClick={() => addToCart(product)}
                disabled={isOutOfStock}
                className="flex flex-1 items-center justify-center gap-2 bg-[#241c18] px-6 py-4 text-sm tracking-wide text-white transition hover:bg-[#3a3029] disabled:cursor-not-allowed disabled:bg-[#b8afa7]"
              >
                <FiShoppingBag size={18} />
                {isOutOfStock ? "Out of Stock" : "Add to Bag"}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                aria-label={
                  productInWishlist ? "Remove from wishlist" : "Add to wishlist"
                }
                className={`flex h-14 w-14 items-center justify-center border transition ${
                  productInWishlist
                    ? "border-[#b08d57] bg-[#b08d57] text-white"
                    : "border-[#d8d0c8] text-[#302923] hover:border-[#302923]"
                }`}
              >
                <FiHeart
                  size={19}
                  fill={productInWishlist ? "currentColor" : "none"}
                />
              </button>
            </div>

            {/* Product details */}
            <div className="mt-10 border-t border-[#ddd5cc]">
              <div className="flex justify-between border-b border-[#ddd5cc] py-4 text-sm">
                <span className="text-[#81776e]">Category</span>

                <span className="text-[#302923]">{product.category}</span>
              </div>

              <div className="flex justify-between border-b border-[#ddd5cc] py-4 text-sm">
                <span className="text-[#81776e]">Gender</span>

                <span className="text-[#302923]">{product.gender}</span>
              </div>

              <div className="flex justify-between py-4 text-sm">
                <span className="text-[#81776e]">Product ID</span>

                <span className="text-[#302923]">#{product.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
