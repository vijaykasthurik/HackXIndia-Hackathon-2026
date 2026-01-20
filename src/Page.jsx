import React, { useState, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS bundle

// SVG Icons
// LeafIcon: Now represents a shopping bag, to match the image.
const LeafIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

// ShoppingCartIcon: (This remains the same, as its SVG content is now duplicated in LeafIcon)
const ShoppingCartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

// ... (rest of your Page.jsx content)
// PlusIcon: Used for the "Add to Cart" button.
const PlusIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Trash2Icon: Used for removing items from the cart.
const Trash2Icon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

// ArrowLeftIcon: Used for navigating back in the checkout process.
const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

// CheckCircleIcon: Used in the payment success animation.
const CheckCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#28a745" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-8.83" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);


// Mock product data for the store
export const products = [
  // Plants (8 Cards)
  { id: 1, name: 'Tomato Plant', price: 99.00, image: './p2.jpg', type: 'Edible Vegetable Plant',  details: '🌱 Organic starter in nursery pot, perfect for home gardening beginners.', bestSeller: true },
  {
    id: 2,
    name: 'Rose Plant',
    price: 149.00,
    image: './p3.jpg', // fallback
    type: 'Flowering Plant',
    details: '🌸 Available in red, pink, yellow',
    bestSeller: true,
    colors: ['Red', 'Pink', 'Yellow', 'White'],
    colorImages: {
      Red: './p3.jpg',
      Pink: './p5.jpg',
      Yellow: './p7.jpg',
      White: './p6.jpg'
    }
  },
  { id: 3, name: 'Hibiscus Plant', price: 129.00, image: './p8.jpg', type: 'Outdoor Flowering', details: '🌼 Daily blooming, pest resistant, thrives in full sun with vibrant colors.' },
  { id: 4, name: 'Strawberry Plant', price: 149.00, image: './p10.jpg', type: 'Fruit Plant', details: '🍓 Grows well in pots, balcony-friendly, yields sweet and juicy strawberries.', bestSeller: true },
  { id: 5, name: 'Money Plant', price: 79.00, image: './p9.jpg', type: 'Indoor Air Purifier', details: '🌿 Grows in water/soil', bestSeller: true },
  { id: 6, name: 'Snake Plant', price: 199.00, image: './p11.jpg', type: 'Indoor Air Purifying', details: '🌬️ NASA approved oxygen booster' },
  { id: 7, name: 'Peace Lily', price: 189.00, image: './p12.jpg', type: 'Indoor Flowering', details: '🌸 Low light flowering plant' },
  { id: 8, name: 'Spider Plant', price: 119.00, image: './p13.png', type: 'Indoor Hanging', details: '🪴 Great for pet-friendly homes' },

  // Organic Fertilizers (5 Cards)
  { id: 9, name: 'Vermicompost', price: 99.00, image: './p16.png', type: 'Organic Soil Enricher', details: '🌿 Improves root growth and soil health', bestSeller: true },
  { id: 10, name: 'Neem Cake Fertilizer', price: 89.00, image: './p17.jpg', type: 'Dual-purpose Pest Control + Fertilizer', details: '🐛 Natural insect deterrent' },
  { id: 11, name: 'Seaweed Extract / Liquid Seaweed', price: 199.00, image: './p18.png', type: 'Liquid Plant Tonic', details: '🌱 Stimulates flowering and immunity' },
  { id: 12, name: 'Bone Meal', price: 149.00, image: './p19.png', type: '🌼 Ideal for flowering plants' },
  { id: 13, name: 'Panchagavya', price: 179.00, image: './p21.png', type: 'Traditional Bio-Fertilizer', details: '🧪 Made from cow-based natural inputs' },

  // Planters (2 Cards)
  { id: 14, name: 'Ceramic Duo Planter ', price: 499.00, image: './p20.png', type: 'Premium Indoor Pot (Holds 2 Plants)', details: '🎍 Ceramic + Bamboo Tray', bestSeller: true },
  { id: 15, name: 'GardenStretch 3-in-1 Grow Trough', price: 799.00, image: './p22.png', type: 'Rectangular Outdoor Planter', details: '🌿 Holds up to 3 medium plants' },

  // Smart System (1 Card)
  { id: 16, name: 'Growlify – Smart Irrigation System (Auto Water)', price: 'Coming Soon', image: './p14.jpg', type: 'IoT-Based Auto Watering System', details: '🔄 Sensors + Scheduled Watering', comingSoon: true },
];

// Product Card Component: Displays individual product information and an "Add to Cart" button.
const ProductCard = ({ product, onAddToCart }) => {
  // State to manage selected option (e.g., color) for products that have them.
  const [selectedOption, setSelectedOption] = useState(product.colors ? product.colors[0] : null);

  // Handler for adding the product to the cart.
  const handleAddToCartClick = () => {
    onAddToCart(product, selectedOption);
  };

  return (
    <div className="card shadow-sm h-100 position-relative overflow-hidden">
      {/* Best Seller badge, shown if the product is marked as a best seller */}
      {product.bestSeller && (
        <span
          className="best-seller badge position-absolute top-0 end-0 m-2 text-white shadow"
          style={{ zIndex: 10 }}
        >
          Best Seller
        </span>
      )}
     
      {/* Product image */}
      <img
        src={product.colorImages?.[selectedOption] || product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: '180px', objectFit: 'cover', transition: '0.3s ease-in-out' }}
      />
     
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          {/* Product name */}
          <h5 className="card-title text-dark flex-grow-1">{product.name}</h5>
          {/* Product price, not shown if "Coming Soon" */}
          {!product.comingSoon && (
            <p className="card-text text-success fw-bold">₹{product.price.toFixed(2)}</p>
          )}
        </div>
        {/* Product type and details */}
        <p className="card-text text-muted small mb-1">{product.type}</p>
        <p className="product-description">{product.details}</p>

        {/* Color selection dropdown if product has colors */}
        {product.colors && (
          <div className="mb-3">
            <label htmlFor={`color-select-${product.id}`} className="form-label small text-dark">Select Color:</label>
            <select
              id={`color-select-${product.id}`}
              className="form-select form-select-sm rounded-pill border-success shadow-sm"
              style={{
                backgroundColor: '#f0fdf4',
                borderColor: '#28a745',
                color: '#1b5e20',
                fontWeight: '500'
              }}
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)} // Fixed: Changed setSelected to setSelectedOption
            >
              {product.colors.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
        )}

        {/* "Coming Soon" button or "Add to Cart" button */}
        {product.comingSoon ? (
            <button
              className="coming-soon mt-auto d-flex align-items-center justify-content-center gap-2 w-100 py-2"
            >
                Coming Soon
            </button>
        ) : (
          <button
            onClick={handleAddToCartClick}
            // Removed 'btn' class to avoid Bootstrap conflicts
            className="main-action-button add-to-cart-button mt-auto d-flex align-items-center justify-content-center gap-2"
          >
            <PlusIcon style={{ width: '1.25em', height: '1.25em' }} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

// Payment Success Animation Component: Displays a success message and animation after payment.
const PaymentSuccessAnimation = ({ onHideAnimation }) => {
    // Automatically hide the animation after a few seconds.
    useEffect(() => {
        const timer = setTimeout(() => {
            onHideAnimation();
        }, 3000); // Animation visible for 3 seconds
        return () => clearTimeout(timer);
    }, [onHideAnimation]);

    return (
        <div className="payment-success-overlay">
            <div className="payment-success-card">
                <CheckCircleIcon className="payment-success-icon" />
                <h3 className="mt-3 mb-2 text-dark">Payment Successful!</h3>
                <p className="text-muted text-center">Your order has been confirmed.</p>
                <p className="text-muted text-center">An email receipt has been sent.</p>
                <button onClick={onHideAnimation} className="btn btn-success mt-4">
                    Continue Shopping
                </button>
            </div>

            {/* Styles specific to PaymentSuccessAnimation */}
            <style jsx="true">{`
                /* Styles for Payment Success Animation */
                .payment-success-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(0, 0, 0, 0.6); /* Semi-transparent background */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 2000; /* Above everything else */
                    backdrop-filter: blur(5px); /* Optional: blur background */
                    animation: fadeIn 0.3s ease-out;
                }

                .payment-success-card {
                    background-color: #fff;
                    padding: 40px;
                    border-radius: 15px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                    text-align: center;
                    max-width: 400px;
                    transform: translateY(20px);
                    animation: slideIn 0.4s ease-out forwards;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .payment-success-icon {
                    animation: checkmarkGrow 0.6s ease-out forwards;
                    transform-origin: center;
                    stroke-dasharray: 1000; /* Adjust this value */
                    stroke-dashoffset: 1000; /* Adjust this value */
                    animation: drawCheckmark 0.8s ease-out forwards, pulseGreen 1.5s infinite alternate;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(50px) scale(0.9); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                /* Specific animation for the checkmark path */
                @keyframes drawCheckmark {
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes pulseGreen {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.05); opacity: 0.9; }
                    100% { transform: scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

// Payment Failure Animation Component: Displays a failure message and animation after payment.
const PaymentFailureAnimation = ({ onHideAnimation }) => {
  useEffect(() => {
    const timer = setTimeout(onHideAnimation, 4000); // Auto-hide after 4 seconds as per user's prompt
    return () => clearTimeout(timer);
  }, [onHideAnimation]);

  return (
    <div className="payment-failure-popup-overlay">
      <div className="payment-failure-card">
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#dc3545" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
        <h3 className="mt-3 mb-2 text-dark">Payment Cancelled</h3>
        <p className="text-muted text-center">Your order was not placed. You exited the payment process.</p>
        <button onClick={onHideAnimation} className="btn btn-danger mt-4">
          Close
        </button>
      </div>
      <style jsx="true">{`
        .payment-failure-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
          animation: fadeInOverlay 0.3s ease-out;
        }

        .payment-failure-card {
          background-color: #fff;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          text-align: center;
          max-width: 400px;
          transform: translateY(20px);
          animation: slideInCard 0.4s ease-out forwards;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInCard {
          from { opacity: 0; transform: translateY(50px) scale(0.9); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};


// Checkout Form Component: Handles user input for shipping address and payment initiation.
const CheckoutForm = ({ onBackToCart, cartData, onCloseCart, onPaymentSuccess, setShowPaymentFailure, handlePlaceOrder, isProcessingOrder, setIsProcessingOrder }) => {
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', address: '', area: '', city: '', state: '', pincode: ''
  });
  const [errors, setErrors] = useState({});
  // Removed local isProcessingOrder, now passed as prop

  // Effect to auto-fetch city and state based on pincode using an external API.
  useEffect(() => {
    // Clear city/state errors when pincode changes
    setErrors(prev => {
        const { pincode, city, state, ...rest } = prev;
        return rest;
    });

    if (formData.pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${formData.pincode}`)
        .then(res => res.json())
        .then(data => {
          if (
            data[0].Status === 'Success' &&
            data[0].PostOffice &&
            data[0].PostOffice.length > 0
          ) {
            const postOffice = data[0].PostOffice[0];
            setFormData(prev => ({
              ...prev,
              city: postOffice.District,
              state: postOffice.State
            }));
          } else {
            setFormData(prev => ({
              ...prev,
              city: '',
              state: ''
            }));
            setErrors(prev => ({ ...prev, pincode: 'Invalid Pincode.' }));
          }
        })
        .catch(() => {
          console.warn('Invalid PIN or network error');
          setFormData(prev => ({
            ...prev,
            city: '',
            state: ''
          }));
          setErrors(prev => ({ ...prev, pincode: 'Failed to fetch Pincode details.' }));
        });
    } else if (formData.pincode.length > 0 && formData.pincode.length < 6) {
        setErrors(prev => ({ ...prev, pincode: 'Pincode must be 6 digits.' }));
        setFormData(prev => ({
            ...prev,
            city: '',
            state: ''
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            city: '',
            state: ''
        }));
    }
  }, [formData.pincode]);

  // Handles changes to form input fields and clears associated errors.
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
    });
  };

  // Validates all form fields.
  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
        newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Invalid email format.';
    }
    if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits.';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required.';
    if (!formData.area.trim()) newErrors.area = 'Area is required.';
   
    if (!formData.pincode.trim()) {
        newErrors.pincode = 'Pincode is required.';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
        newErrors.pincode = 'Pincode must be 6 digits.';
    }

    if (!formData.city.trim()) newErrors.city = 'City is required.';
    if (!formData.state.trim()) newErrors.state = 'State is required.';
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="p-4 d-flex flex-column" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <div className="flex-shrink-0">
        {/* Back to Cart button */}
        <button onClick={onBackToCart} className="btn btn-link text-dark d-flex align-items-center gap-2 mb-4 p-0 text-decoration-none">
          <ArrowLeftIcon style={{ width: '1.25em', height: '1.25em' }} />
          Back to Cart
        </button>
        <h3 className="mb-4 text-dark">Checkout</h3>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validateForm()) {
            handlePlaceOrder(formData, cartData, onCloseCart, onPaymentSuccess);
          }
        }}
        className="flex-grow-1"
        id="checkout-form" // Added id to link button to the form
        style={{
          maxWidth: '600px',
          margin: 'auto',
          padding: '1.5rem',
          background: '#fffef3',
          borderRadius: '16px',
          boxShadow: '0 0 10px rgba(0,0,0,0.05)',
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
        }}
      >
        <h4 className="mb-3 text-secondary">Shipping Address</h4>
        {/* Full Name input */}
        <div className="mb-3">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
            className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
            required
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
        {/* Email input */}
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            required
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        {/* Phone Number input */}
        <div className="mb-3">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel" // Use type="tel" for phone numbers
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            maxLength={10} // Assuming 10-digit phone numbers
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            required
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>
        {/* Address input */}
        <div className="mb-3">
          <label htmlFor="address">Plot No. / Address</label>
          <input
            type="text"
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
            required
          />
          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
        </div>
        {/* Area input */}
        <div className="mb-3">
          <label htmlFor="area">Area</label>
          <input
            type="text"
            id="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Enter your area"
            className={`form-control ${errors.area ? 'is-invalid' : ''}`}
            required
          />
          {errors.area && <div className="invalid-feedback">{errors.area}</div>}
       </div>
       
        {/* Pincode input */}
        <div className="mb-3">
          <label htmlFor="pincode">Pincode</label>
          <input
            type="text"
            id="pincode"
            value={formData.pincode}
            onChange={handleChange}
            placeholder="Enter pincode"
            maxLength={6}
            className={`form-control ${errors.pincode ? 'is-invalid' : ''}`}
            required
          />
          {errors.pincode && <div className="invalid-feedback">{errors.pincode}</div>}
        </div>

        {/* City and State inputs (read-only, populated by pincode) */}
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleChange} // Still include onChange to clear errors if user tries to type
              placeholder="Enter your city"
              readOnly
              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              required
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>
          <div className="col-md-6">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={formData.state}
              onChange={handleChange} // Still include onChange to clear errors if user tries to type
              placeholder="Enter state"
              readOnly
              className={`form-control ${errors.state ? 'is-invalid' : ''}`}
              required
            />
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>
        </div>
      </form>
      <div className="flex-shrink-0 mt-4">
        {/* Place Order button with loading spinner */}
        <button
          className="main-action-button w-100 py-3"
          type="submit" // Set type to submit to trigger form's onSubmit
          form="checkout-form" // Link button to the form
          disabled={isProcessingOrder} // Disable button when processing
        >
          {isProcessingOrder ? (
            <>
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="ms-2">Processing...</span>
            </>
          ) : (
            'Place Order Now'
          )}
        </button>
      </div>
    </div>
  );
};

// Cart Sidebar Component: Displays cart items, allows quantity updates, removal, and proceeds to checkout.
const CartSidebar = ({ isOpen, onClose, cart, onRemoveFromCart, onUpdateQuantity, onClearCart, onPaymentSuccess, setShowPaymentFailure, handlePlaceOrder, isProcessingOrder, setIsProcessingOrder }) => {
  const [view, setView] = useState('cart'); // State to toggle between cart view and checkout form

  // Calculate total price of items in the cart (excluding "coming soon" items).
  const total = useMemo(() =>
    cart.reduce((sum, item) => {
        if (item.comingSoon) return sum;
        return sum + item.price * item.quantity;
    }, 0),
    [cart]
  );

  // Functions to change the view within the sidebar.
  const handleCheckout = () => setView('checkout');
  const handleBackToCart = () => setView('cart');

  // Reset view to 'cart' when the sidebar is closed.
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setView('cart'), 300); // Small delay to allow transition
    }
  }, [isOpen]);

  return (
    <>
      {/* Backdrop for the offcanvas sidebar */}
      <div
        className={`offcanvas-backdrop fade ${isOpen ? 'show' : ''}`}
        style={{ display: isOpen ? 'block' : 'none' }}
        onClick={onClose}
      ></div>

      {/* The offcanvas sidebar itself */}
      <div
        className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
        tabIndex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvasLabel"
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          width: '100%',
          maxWidth: '450px',
          backgroundColor: '#F5F5DC' // Light tan background for the sidebar
        }}
      >
        <div className="offcanvas-header pb-0 border-bottom">
          {/* Header for the cart view */}
          {view === 'cart' ? (
            <>
              <h5 className="offcanvas-title text-dark" id="cartOffcanvasLabel">
                My Cart ({cart.length})
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </>
          ) : (
            null // No header for checkout view, as CheckoutForm handles its own "Back to Cart"
          )}
        </div>
        <div className="offcanvas-body d-flex flex-column p-0">
            {/* Conditional rendering based on current view (cart or checkout) */}
            {view === 'cart' ? (
                <>
                    {/* Display if cart is empty */}
                    {cart.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
                            <p className="text-secondary fs-5">Your cart is empty.</p>
                            <button onClick={onClose} className="btn btn-link text-success text-decoration-underline mt-3">
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        // Display cart items
                        <div className="flex-grow-1 overflow-auto p-4">
                            {cart.map(item => (
                                <div key={`${item.id}-${item.selectedOption || ''}`} className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom">
                                    <img src={item.image} className="rounded" alt={item.name} style={{ width: '64px', height: '64px', objectFit: 'cover' }} />
                                    <div className="flex-grow-1">
                                        <p className="fw-bold mb-1 text-dark">
                                            {item.name}
                                            {item.selectedOption && ` (${item.selectedOption})`}
                                        </p>
                                        {!item.comingSoon ? (
                                            // Quantity controls for non-"coming soon" items
                                            <div className="d-flex align-items-center gap-2">
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1, item.selectedOption)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span className="text-sm text-muted">{item.quantity}</span>
                                                <button
                                                    className="btn btn-outline-secondary btn-sm"
                                                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1, item.selectedOption)}
                                                >
                                                    +
                                                </button>
                                                <span className="text-sm text-muted ms-auto">₹{(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                        ) : (
                                            <p className="fw-bold text-info mb-0">Coming Soon</p>
                                        )}
                                    </div>
                                    {/* Remove item button */}
                                    <button onClick={() => onRemoveFromCart(item.id, item.selectedOption)} className="btn btn-outline-danger btn-sm border-0 p-1">
                                        <Trash2Icon style={{ width: '1.25em', height: '1.25em' }} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Total and Proceed to Checkout button, only shown if there are purchasable items */}
                    {cart.filter(item => !item.comingSoon).length > 0 && (
                        <div className="p-4 border-top">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="h5 text-dark">Total</p>
                                <p className="h4 fw-bold text-dark">₹{total.toFixed(2)}</p>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="main-action-button w-100 py-3"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </>
            ) : (
                // Render CheckoutForm when view is 'checkout'
                <CheckoutForm
                    onBackToCart={handleBackToCart}
                    cartData={cart}
                    onCloseCart={() => { onClose(); onClearCart(); }}
                    onPaymentSuccess={onPaymentSuccess} // Pass the new prop here
                    setShowPaymentFailure={setShowPaymentFailure} // Pass setShowPaymentFailure
                    handlePlaceOrder={handlePlaceOrder} // Pass handlePlaceOrder to CheckoutForm
                    isProcessingOrder={isProcessingOrder} // Pass isProcessingOrder to CheckoutForm
                    setIsProcessingOrder={setIsProcessingOrder} // Pass setIsProcessingOrder to CheckoutForm
                />
            )}
        </div>
      </div>
    </>
  );
};

// MainAppContent: This component now encapsulates all the logic and rendering for the main application.
export default function Page() { // Renamed from MainAppContent to Page as per original file name
  // State for the shopping cart items.
  const [cart, setCart] = useState([]);
  // State to control the visibility of the cart sidebar.
  const [isCartOpen, setIsCartOpen] = useState(false);
  // State for displaying toast notifications (e.g., "Item added to cart!").
  const [showToast, setShowToast] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  // State to control the visibility of the payment success animation.
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  // State for payment failure popup
  const [showPaymentFailure, setShowPaymentFailure] = useState(false);
  // State for payment processing spinner
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);


  // The handlePlaceOrder function is moved inside the Page component
  const handlePlaceOrder = async (formData, cartData, onCloseCart, onPaymentSuccess) => {
    console.log("🟢 Place Order clicked"); // Debugging log
    setIsProcessingOrder(true); // Start loading state

    // Calculate total amount from cart data, excluding "coming soon" items.
    const totalAmount = cartData.reduce(
      (sum, item) => item.comingSoon ? sum : sum + item.price * item.quantity,
      0
    );
    const amountInPaise = Math.round(totalAmount * 100); // Convert ₹ to paise

    // Debugging log for amount
    console.log("Total Amount (INR):", totalAmount, "Amount (Paise):", amountInPaise);

    try {
      // ✅ 1. Create Razorpay order (updated endpoint)
      const response = await fetch("http://localhost:5000/api/shop/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      const orderData = await response.json();

      if (!orderData.orderId) {
        alert("❌ Failed to initiate payment. Please try again. No order ID received.");
        setIsProcessingOrder(false);
        return;
      }

      // ✅ 2. Open Razorpay checkout
      const options = {
        key: process.env.RAZORPAY_KEY_ID, // Your Razorpay Test Key ID
        amount: orderData.amount,
        currency: "INR",
        name: "Growlify Gardening",
        description: "Plant Order Payment",
        order_id: orderData.orderId,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: { color: "#1e7e34" },
        handler: async function (response) {
          console.log("✅ Razorpay payment successful:", response);

          try {
            // ✅ 3. Send confirmation email (updated endpoint)
            await fetch("http://localhost:5000/api/shop/send-confirmation", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                formData,
                cart: cartData,
                paymentResponse: response,
              }),
            });
            onPaymentSuccess(); // Show success animation
          } catch (error) {
            console.error("Error sending confirmation email:", error);
            alert("Payment successful, but failed to send confirmation email.");
          } finally {
            setIsProcessingOrder(false);
            onCloseCart(); // Close cart and clear it
          }
        },
        // ✅ This handles cancel or "exit" case
        modal: {
         ondismiss: function () {
            console.log("❌ Payment popup dismissed");
            setIsProcessingOrder(false);           // ✅ Stop loader
            setShowPaymentFailure(true);           // ✅ Trigger cancel animation
            window.scrollTo({ top: 0, behavior: "smooth" });
            
            // Optional: auto-hide after 4s
            setTimeout(() => {
              // navigate("/"); // or navigate("/shop") as needed - Assuming 'navigate' is available (e.g., from react-router-dom)
              setShowPaymentFailure(false); // Hide the popup after 4s
            }, 4000);
          },
        }, 
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      // Payment failure handler
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed details:", response.error);
        setIsProcessingOrder(false);
        setShowPaymentFailure(true); // Show failure popup
      });
    } catch (error) {
      console.error("Payment initiation failed:", error);
      alert("Failed to initiate payment. Please try again.");
      setIsProcessingOrder(false);
    }
  };


  // Handler to add a product to the cart.
  const handleAddToCart = (product, selectedOption = null) => {
    // Prevent adding "coming soon" products to the cart.
    if (product.comingSoon) {
      alert("This product is coming soon and cannot be added to the cart yet!");
      return;
    }

    setCart(prevCart => {
      // Create a unique identifier for cart items, including selected options (like color).
      const cartItemId = `${product.id}-${selectedOption || ''}`;
      // Check if the item already exists in the cart.
      const existingItem = prevCart.find(item => `${item.id}-${item.selectedOption || ''}` === cartItemId);

      if (existingItem) {
        // If item exists, update its quantity.
        setToastMessage(`${product.name} quantity updated!`);
        return prevCart.map(item =>
          `${item.id}-${item.selectedOption || ''}` === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // If item is new, add it to the cart with quantity 1.
      setToastMessage(`${product.name} added to cart!`);
      return [...prevCart, { ...product, quantity: 1, selectedOption }];
    });
    // Show toast notification and hide it after 3 seconds.
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Handler to remove a product from the cart.
  const handleRemoveFromCart = (productId, selectedOption = null) => {
    setCart(prevCart => prevCart.filter(item => {
        const itemIdentifier = `${item.id}-${item.selectedOption || ''}`;
        const targetIdentifier = `${productId}-${selectedOption || ''}`;
        return itemIdentifier !== targetIdentifier;
    }));
  };

  // Handler to update the quantity of a product in the cart.
  const handleUpdateQuantity = (productId, quantity, selectedOption = null) => {
    if (quantity <= 0) {
      // If quantity becomes 0 or less, remove the item.
      handleRemoveFromCart(productId, selectedOption);
    } else {
      // Otherwise, update the quantity.
      setCart(prevCart =>
        prevCart.map(item => {
          const itemIdentifier = `${item.id}-${item.selectedOption || ''}`;
          const targetIdentifier = `${productId}-${selectedOption || ''}`;
          return itemIdentifier === targetIdentifier ? { ...item, quantity } : item;
        })
      );
    }
  };

  // Handler to clear all items from the cart.
  const handleClearCart = () => {
    setCart([]);
  };

  // Handler for when payment is successfully completed.
  const handlePaymentSuccess = () => {
    setShowPaymentSuccess(true); // Show the payment success animation.
    setIsCartOpen(false); // Close the cart sidebar.
    handleClearCart(); // Clear the cart.
  };

  // Handler to hide the payment success animation.
  const handleHidePaymentSuccess = () => {
    setShowPaymentSuccess(false);
  };

  // Memoized calculation of total items in the cart (excluding "coming soon" items).
  const cartItemCount = useMemo(() =>
    cart.reduce((count, item) => (item.comingSoon ? count : count + item.quantity), 0),
    [cart]
  );

  return (
  <div
    style={{
      backgroundColor: '#F5F5DC',
      minHeight: '100vh',
      overflowX: 'hidden',
    }}
  >
    <main
      className="container py-5"
      style={{
        marginTop: '90px', // Fixes content shifting under fixed navbar
      }}
    >
        {/* Header section with logo, title, and cart button */}
        <div className="p-4 rounded-3 shadow-sm mb-5 d-flex justify-content-between align-items-center" style={{backgroundColor: '#E9E9D4'}}>
            <div className="d-flex align-items-center gap-3">
                <div className="bg-success-subtle p-3 rounded-circle">
                    <LeafIcon style={{ width: '2em', height: '2em', color: '#1B5E20' }}/>
                </div>
                <div>
                    <h1 className="display-5 fw-bold text-dark mb-1">Gardening Essentials</h1>
                    <p className="text-secondary mb-0">Everything you need for your urban gardening journey.</p>
                </div>
            </div>
            {/* Shopping Cart button with item count badge */}
            <button onClick={() => setIsCartOpen(true)} className="btn btn-link text-dark position-relative p-0 text-decoration-none">
                <ShoppingCartIcon style={{ width: '2em', height: '2em' }} />
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {cartItemCount}
                    <span className="visually-hidden">items in cart</span>
                  </span>
                )}
            </button>
        </div>

        {/* Product Grid */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {products.map(product => (
            <div className="col" key={product.id}>
              <ProductCard product={product} onAddToCart={handleAddToCart} />
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar component */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        onPaymentSuccess={handlePaymentSuccess}
        setShowPaymentFailure={setShowPaymentFailure} // Pass setShowPaymentFailure to CheckoutForm
        handlePlaceOrder={handlePlaceOrder} // Pass handlePlaceOrder to CheckoutForm
        isProcessingOrder={isProcessingOrder} // Pass isProcessingOrder to CheckoutForm
        setIsProcessingOrder={setIsProcessingOrder} // Pass setIsProcessingOrder to CheckoutForm
      />

      {/* Toast Container for Add to Cart feedback */}
      {showToast && (
        <div
          className="toast show align-items-center text-white bg-success border-0 fade"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1050 }}
        >
          <div className="d-flex">
            <div className="toast-body">
              {toastMessage}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
        </div>
      )}

    {/* Payment Success Animation Overlay */}
    {showPaymentSuccess && (
        <PaymentSuccessAnimation onHideAnimation={handleHidePaymentSuccess} />
    )}

    {/* Payment Failure Animation Overlay*/}
    {showPaymentFailure && (
      <PaymentFailureAnimation onHideAnimation={() => setShowPaymentFailure(false)} />
    )}


    {/* Global Styles for the application */}
    <style jsx="true">{`
      html, body {
        overflow-x: hidden !important;
        overflow-y: auto !important;
      }

      /* Apply font to cards */
      .card {
        font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        border: none;
        box-shadow: 0 4px 8px rgba(0,0,0,.05);
        border-radius: 1rem;
        background-color: var(--card); /* Uses the updated --card variable (white) */
        color: var(--card-foreground);
        transition: transform 0.3s ease, box-shadow 0.3s ease; /* Removed background-color from transition */
      }

      /* Font styles for Product Cards */

      /* Plant Name (e.g., "Tomato Plant", "Rose Plant") */
      .card-title {
        font-family: 'Inter', 'Poppins', 'Segoe UI', sans-serif; /* Choose one or provide fallbacks */
        font-weight: 600; /* Semi-Bold */
        font-size: 1.25rem; /* ~20px, adjusted for responsiveness */
        color: #1f1f1f; /* Black / Dark grey */
      }

      /* 💰 Price (e.g., ₹99.00, ₹149.00) */
      .card-text.text-success.fw-bold {
        font-family: 'Inter', 'Poppins', 'Segoe UI', sans-serif; /* Same as title */
        font-weight: 600; /* Or 700 for bolder */
        font-size: 1.125rem; /* ~18px, adjusted for responsiveness */
        color: #28a745; /* Green */
      }

      /* 🪴 Subcategory (e.g., "Edible Vegetable Plant", "Flowering Plant") */
      /* 🪴 Subcategory (e.g., "Edible Vegetable Plant", "Flowering Plant") */
.card-text.text-muted.small.mb-1 {
  font-family: 'Poppins', sans-serif; /* Changed to Poppins */
  font-weight: 400; /* Regular */
  font-size: 17px; /* Set explicitly to 14px */
  color: #060707ff; /* Bootstrap Gray-600 */
  letter-spacing: 0.3px; /* Added letter spacing */
  margin-top: 4px; /* Added margin top */
}

      /* 📝 Additional Info (e.g., "Organic starter...", "Available in red...") */
      .product-description { /* Assuming you add this class to the p tag */
        font-family: sans-serif; /* Bootstrap's default or specify */
        font-style: italic;
        font-weight: 500; /* Medium */
        font-size: 17px; /* ~14px, adjusted for responsiveness */
        color: #444; /* Dark Gray or matching category tone */
      }

      /* 🔽 Dropdown Label (e.g., "Select Color") */
      .form-label.small.text-dark {
        font-size: 0.875rem; /* ~14px, adjusted for responsiveness */
        font-weight: 500; /* Medium */
        color: #444; /* Dark Gray */
      }

      /* Keyframe animations for various effects */
      @keyframes shine {
        0% {
          background-position: -200% center;
        }
        100% {
          background-position: 200% center;
        }
      }

      @keyframes sparkle {
        0%, 100% {
          opacity: 0;
          transform: scale(0.8) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: scale(1.4) rotate(45deg);
        }
      }

      /* Styles for "Best Seller" and "Coming Soon" badges */
      .best-seller, .coming-soon {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 6px 14px;
        background: linear-gradient(90deg, #ff4e50 0%, #ff0000 50%, #ff4e50 100%);
        background-size: 300% auto;
        color: white !important;
        font-weight: bold;
        border-radius: 20px;
        border: none;
        box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
        animation: shine 2.5s linear infinite;
        overflow: hidden;
      }

      /* Sparkle effect for badges */
      .best-seller::after, .coming-soon::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        top: 10%;
        right: 10%;
        background: radial-gradient(circle, #fff, transparent);
        border-radius: 50%;
        box-shadow:
          0 0 8px rgba(255, 255, 255, 0.9),
          0 0 12px rgba(255, 255, 255, 0.7);
        animation: sparkle 2s ease-in-out infinite;
      }

      /* Styles for main action buttons (Add to Cart, Proceed to Checkout) */
      .main-action-button,
      .add-to-cart-button {
        background-color: #28a745 !important; /* Green */
        border: none !important;
        padding: 12px 24px;
        color: white !important;
        font-weight: bold;
        border-radius: 10px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        margin-top: 16px;
        width: 100%; /* Ensure button takes full width */
        display: flex; /* Changed from block to flex to center content with gap */
        align-items: center;
        justify-content: center;
        gap: 8px; /* Added gap for icon and text */
        text-decoration: none; /* Remove any underline if it's a link-like button */
      }

      .main-action-button:hover,
      .add-to-cart-button:hover {
        transform: scale(1.03);
        box-shadow: 0 0 12px rgba(40, 167, 69, 0.3);
        background-color: #28a745 !important;
        color: white !important;
      }

      .coming-soon {
        background-color: #dc3545 !important; /* Red for coming soon button */
        border: none !important;
        padding: 12px 24px;
        color: white !important;
        font-weight: bold;
        border-radius: 10px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        margin-top: 16px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        text-decoration: none;
      }

      .coming-soon:hover {
        transform: scale(1.03);
        box-shadow: 0 0 10px rgba(255, 0, 0, 0.4);
        background: linear-gradient(90deg, #ff4e50 0%, #ff0000 50%, #ff4e50 100%) !important;
        color: white !important;
        text-decoration: none;
      }

      /* Form input styles */
      form input {
        width: 100%;
        padding: 6px 12px;
        margin-bottom: 12px;
        border: 1px solid #ccc;
        border-radius: 10px;
        transition: all 0.3s ease;
        background-color: #EFEFD8; /* Light tan */
        font-size: 0.9rem;
      }

      form input:focus {
        border-color: #28a745; /* Green on focus */
        box-shadow: 0 0 6px rgba(40, 167, 69, 0.2);
        outline: none;
      }

      form label {
        font-weight: 600;
        margin-bottom: 4px;
        display: block;
        color: #444;
        font-size: 0.9rem;
      }

      /* Invalid form field feedback styles */
      form .form-control.is-invalid {
        border-color: #dc3545; /* Red */
        padding-right: calc(1.5em + 0.75rem);
        background-image: none;
      }
      form .invalid-feedback {
        display: block;
        margin-top: -8px;
        margin-bottom: 8px;
        font-size: 0.875em;
        color: #dc3545; /* Red */
      }

      /* Product card hover effect */
      .card:hover {
          background-color: var(--secondary); /* Uses the updated --secondary variable (white) */
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,.15);
      }

      .section-padding {
          padding-top: 80px;
          padding-bottom: 80px;
      }

      /* Emoji styling within cards */
      .card-emoji {
          font-size: 3rem;
          line-height: 1;
          margin-bottom: 1rem;
          display: inline-block;
      }

      .image-placeholder {
          background-color: var(--muted);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 250px;
          color: var(--muted-foreground);
          font-size: 1.25rem;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          overflow: hidden;
      }
      .image-placeholder img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .cta-section h2, .cta-section p {
          color: white;
      }
      .cta-section p {
          opacity: 0.9;
      }

      /* Navbar centering */
      .navbar-nav-center {
        margin-left: auto;
        margin-right: auto;
        flex-grow: 1;
        justify-content: center;
      }
      /* Adjust for small screens where navbar items stack */
      @media (max-width: 991.98px) {
        .navbar-nav-center {
          justify-content: flex-start;
          margin-left: 0;
          margin-right: 0;
        }
      }

      .navbar-nav .nav-link {
          border-radius: var(--radius);
          font-size: 1.15rem;
          color: var(--foreground);
          font-weight: 400;
          padding: 0.5rem 0.75rem;
          transition: background-color 0.2s ease, color 0.2s ease;
      }
      .navbar-nav .nav-link.active {
          font-weight: 600;
          background-color: transparent;
      }
      /* Hover effect for navbar links */
      .navbar-nav .nav-link:not(.active):hover {
        background-color: hsl(60, 30%, 80%);
        color: var(--foreground);
      }
      .navbar-nav .nav-link.active:hover {
         background-color: transparent;
         color: var(--foreground);
      }

      .navbar-brand img {
          /* No specific border-radius needed if the image itself is designed with it */
      }

    /* Profile icon container and dropdown positioning */
    .profile-icon-container {
      position: relative;
      margin-left: 1.5rem;
    }
    .profile-icon-container button.nav-link {
      cursor: pointer;
      transition: color 0.2s ease-in-out, background-color 0.2s ease;
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius);
      color: var(--foreground);
      background-color: transparent;
    }
    .profile-icon-container button.nav-link:hover {
      background-color: hsl(60, 30%, 80%);
      color: var(--foreground);
    }
      .profile-dropdown {
        position: absolute;
        top: 100%;
        right: 0;
        background-color: var(--card);
        border: 1px solid var(--border);
        border-radius: var(--radius);
        box-shadow: 0 4px 8px rgba(0,0,0,.1);
        min-width: 160px;
        z-index: 1001;
        padding: 0;
        text-align: left;
        transform: translateY(5px);
      }
      .profile-dropdown .dropdown-item {
        display: block;
        padding: 0.5rem 1rem;
        color: var(--foreground);
        text-decoration: none;
        cursor: pointer;
        white-space: nowrap;
      }
      .profile-dropdown .dropdown-item:hover {
        background-color: var(--secondary);
      }
      .profile-dropdown .dropdown-title {
        padding: 0.5rem 1rem;
        font-weight: 600;
        color: var(--foreground);
        border-bottom: 1px solid var(--border);
        margin-bottom: 0.25rem;
      }

      /* Ensure consistent vertical alignment for nav items */
      .navbar-nav .nav-item {
        display: flex;
        align-items: center;
      }

      /* Media Queries for Mobile */
      @media (max-width: 767.98px) {
        .navbar-nav .nav-link {
          font-size: 1rem; /* Slightly smaller font for mobile */
          padding: 0.4rem 0.6rem;
        }

        /* Ensure navbar-collapse takes full width and items are stacked */
        .navbar-collapse {
          width: 100%;
        }

        /* Make the nav items stack vertically within the collapsed navbar */
        .navbar-nav {
          flex-direction: column !important; /* Override Bootstrap's default flex-direction */
          margin-top: 0.5rem; /* Add some space below the toggle button */
        }

        .navbar-nav .nav-item {
          width: 100%; /* Make each item take the full width */
          text-align: center; /* Center the text within each item */
        }

        .navbar-nav .nav-link {
          display: block; /* Make the link fill the entire item */
          padding: 0.75rem 1rem; /* Add more padding for touch targets */
          border-bottom: 1px solid var(--border); /* Optional: Add dividers between links */
        }

        .navbar-nav .nav-link:last-child {
          border-bottom: none; /* Remove the bottom border from the last item */
        }

        /* Adjust profile dropdown for mobile */
        .profile-icon-container {
          margin-left: 0; /* Reset margin */
          width: 100%; /* Full width */
          text-align: center; /* Center align */
          margin-top: 0.5rem; /* Add some spacing */
        }
        .profile-dropdown {
          position: static; /* Flow with the content */
          width: 100%; /* Full width */
          border-top: 1px solid var(--border); /* Add a top border to separate */
          box-shadow: none; /* Remove shadow */
          transform: translateY(0); /* Reset transform */
        }
        .profile-dropdown .dropdown-title {
          border-bottom: none; /* Remove extra bottom border */
        }
      }
        /* Original navbar state (not scrolled) */
.navbar-fixed-top {
  background-color: hsla(60, 56%, 93%, 0.3);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

/* Scrolled state */
.navbar-fixed-top.scrolled {
  background-color: hsla(60, 56%, 93%, 0.8);
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* State for specific pages that don't need blur */
.navbar-fixed-top.no-blur {
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

/* Active navigation link */
.navbar-nav .nav-link.active {
  font-weight: 600; /* Or any other style */
  color: var(--primary); /* Example color */
}
        `}
      </style>
    </div>
  );
}