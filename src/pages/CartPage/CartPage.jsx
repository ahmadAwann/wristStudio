import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './CartPage.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useCart();

  const shipping = cartTotal >= 100 ? 0 : 15;
  const tax = +(cartTotal * 0.08).toFixed(2);
  const total = +(cartTotal + shipping + tax).toFixed(2);

  if (cart.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <div className="container cart-empty">
          <ShoppingBag size={64} className="cart-empty__icon" />
          <h2 className="cart-empty__title">Your Cart is Empty</h2>
          <p className="cart-empty__sub">Looks like you haven't added any watches yet.</p>
          <Link to="/collections" className="btn-primary">
            Browse Collections <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-hero">
        <div className="container">
          <h1 className="cart-hero__title">Shopping Cart</h1>
          <p className="cart-hero__sub">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>
      </div>

      <div className="container cart-layout">
        {/* Items */}
        <div className="cart-items">
          <div className="cart-items__header">
            <span>Product</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span />
          </div>

          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__product">
                <Link to={`/product/${item.id}`} className="cart-item__img-wrap">
                  <img src={item.image} alt={item.name} className="cart-item__img" />
                </Link>
                <div className="cart-item__details">
                  <Link to={`/product/${item.id}`} className="cart-item__name">{item.name}</Link>
                  <p className="cart-item__collection">{item.collection}</p>
                  {item.originalPrice && (
                    <span className="cart-item__was">Was ${item.originalPrice}</span>
                  )}
                </div>
              </div>

              <span className="cart-item__price">${item.price}</span>

              <div className="cart-item__qty">
                <button
                  className="cart-item__qty-btn"
                  onClick={() => updateQty(item.id, item.qty - 1)}
                  aria-label="Decrease"
                >
                  <Minus size={13} />
                </button>
                <span className="cart-item__qty-val">{item.qty}</span>
                <button
                  className="cart-item__qty-btn"
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  aria-label="Increase"
                >
                  <Plus size={13} />
                </button>
              </div>

              <span className="cart-item__subtotal">${(item.price * item.qty).toFixed(2)}</span>

              <button
                className="cart-item__remove"
                onClick={() => removeFromCart(item.id)}
                aria-label="Remove"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {/* Actions row */}
          <div className="cart-items__actions">
            <Link to="/collections" className="btn-outline cart-continue">
              Continue Shopping
            </Link>
            <button className="cart-clear" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3 className="cart-summary__title">Order Summary</h3>

          <div className="cart-summary__rows">
            <div className="cart-summary__row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary__row">
              <span>Shipping</span>
              <span className={shipping === 0 ? 'cart-summary__free' : ''}>
                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="cart-summary__shipping-note">
                Add ${(100 - cartTotal).toFixed(2)} more for free shipping
              </p>
            )}
            <div className="cart-summary__row">
              <span>Tax (8%)</span>
              <span>${tax}</span>
            </div>
            <div className="cart-summary__divider" />
            <div className="cart-summary__row cart-summary__row--total">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Promo */}
          <div className="cart-promo">
            <div className="cart-promo__inner">
              <Tag size={15} />
              <input
                type="text"
                placeholder="Promo code"
                className="cart-promo__input"
              />
              <button className="cart-promo__btn">Apply</button>
            </div>
          </div>

          <button className="cart-summary__checkout btn-primary">
            Proceed to Checkout <ArrowRight size={16} />
          </button>

          <div className="cart-summary__secure">
            <span>🔒 Secure checkout — SSL encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}
