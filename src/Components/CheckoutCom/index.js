import React, { useEffect, useState } from 'react';
import { Country } from 'country-state-city';
import './checkoutcom.css';
import { useInstructions } from '../../APIContext/InstructionsContext';

const Checkout = () => {
    const { fetchCartItems, cartItems, applyCoupon, proceedToCheckout, verifyPaymentStatus } = useInstructions();

    const [couponCode, setCouponCode] = useState('');
    const [couponData, setCouponData] = useState(null);
    const [couponMessage, setCouponMessage] = useState('');
    const [couponLoading, setCouponLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '', 
        company: '', 
        country: 'US',
        streetAddress: '', 
        city: '', 
        state: '', 
        zip: '', 
        phone: '', 
        email: '', 
        notes: '',
    });

    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('verifying'); // verifying, success, failed
    const [paymentMessage, setPaymentMessage] = useState('Verifying your payment...');
    const [pollInterval, setPollInterval] = useState(null);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const allCountries = Country.getAllCountries();
    const sortedCountries = allCountries.sort((a, b) => a.name.localeCompare(b.name));
    const usCountry = sortedCountries.find(c => c.isoCode === 'US');
    const otherCountries = sortedCountries.filter(c => c.isoCode !== 'US');
    const finalCountryList = usCountry ? [usCountry, ...otherCountries] : sortedCountries;

    // Totals
    const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.total_price || 0), 0);
    const finalTotal = couponData ? couponData.coupon.discounted_price.toFixed(2) : subtotal.toFixed(2);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) {
            setCouponMessage('⚠️ Please enter a coupon code');
            return;
        }

        if (cartItems.length === 0) {
            setCouponMessage('⚠️ Your cart is empty');
            return;
        }

        setCouponLoading(true);
        setCouponMessage('');
        setCouponData(null);

        const packageId = cartItems[0].package;

        try {
            const payload = {
                code: couponCode.trim().toUpperCase(),
                package_id: packageId
            };

            const result = await applyCoupon(payload);

            if (result.success) {
                setCouponData(result);
                setCouponMessage(`✅ ${result.message} — Saved $${result.coupon.discount_value.toFixed(2)}!`);
            } else {
                setCouponMessage(`❌ ${result.message || 'Invalid coupon code'}`);
            }
        } catch (err) {
            setCouponMessage('❌ Failed to apply coupon. Please try again.');
            console.error(err);
        } finally {
            setCouponLoading(false);
        }
    };

    // Start polling payment status
    const startPaymentPolling = (sessionId) => {
        setShowPaymentModal(true);
        setPaymentStatus('verifying');
        setPaymentMessage('Verifying your payment... Please do not close this window.');

        const interval = setInterval(async () => {
            try {
                const result = await verifyPaymentStatus(sessionId);

                if (result?.payment?.paid === true) {
                    clearInterval(interval);
                    setPaymentStatus('success');
                    setPaymentMessage('Payment Successful! Redirecting you...');

                    setTimeout(() => {
                        window.location.href = '/profile/billing'; // Change to your success page
                    }, 2500);
                }
            } catch (err) {
                console.log('Still waiting for payment confirmation...');
            }
        }, 3000);

        setPollInterval(interval);

        // Timeout after 10 minutes
        setTimeout(() => {
            if (paymentStatus === 'verifying') {
                clearInterval(interval);
                setPaymentStatus('failed');
                setPaymentMessage('Payment verification timed out. Please contact support.');
            }
        }, 10 * 60 * 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        const payload = {
            packages: cartItems.map(item => ({
                package_id: item.package,
                player_id: item.player
            })),
        };

        try {
              const response = await proceedToCheckout(payload);
            // const response = {
            //     "id": "cs_test_a1MrdK7dVVsG17dNmvqp1PZZnD4TK12lV4KagMrXi9prVnd2tO7LoFDpUp",
            //     "url": "https://checkout.stripe.com/c/pay/cs_test_a1MrdK7dVVsG17dNmvqp1PZZnD4TK12lV4KagMrXi9prVnd2tO7LoFDpUp#fidkdWxOYHwnPyd1blpxYHZxWjA0VjZRZjxMfzRKVGlBNjRAS1NvbU5pcFJ3MENoa2BGfzddZj1hSV1SNnFOcmtwMmBnVWBuQHJpd3BpSWlhcU9zMDZHQl1QTzU3SkhtVU5oNklPQkBpSnVMNTVnQU1qbTNvPCcpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
            // }

            if (response?.url) {
                const sessionId = response.id;
                const stripeWindow = window.open(response.url, '_blank');

                if (stripeWindow) {
                    startPaymentPolling(sessionId);
                } else {
                    alert('Please allow pop-ups to continue with payment.');
                }
            }
        } catch (err) {
            console.error('Checkout failed:', err);
            alert('Failed to proceed to checkout. Please try again.');
        }
    };

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (pollInterval) clearInterval(pollInterval);
        };
    }, [pollInterval]);

    return (
        <>
            <div className="checkout-wrapper">

                {/* ORDER SUMMARY */}
                <div className="checkout-card summary-section">
                    <div className="summary-header">
                        <span className="header-gold">PRODUCT</span>
                        <span className="header-gold">TOTAL</span>
                    </div>
                    <div className="divider"></div>

                    {cartItems.length === 0 ? (
                        <div className="summary-item empty-cart">
                            <span className="item-name">Your cart is empty</span>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="summary-item">
                                <span className="item-name">
                                    {item.package_name}
                                    <br />
                                    <small style={{ color: '#888' }}>
                                        Player: {item.player_name}
                                    </small>
                                </span>
                                <span className="item-price">${parseFloat(item.total_price).toFixed(2)}</span>
                            </div>
                        ))
                    )}

                    <div className="coupon-row">
                        <label className="coupon-label">Have a coupon?</label>
                        <div className="coupon-input-group">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                className="form-input coupon-input"
                                placeholder="e.g. SUMMER25"
                                disabled={couponLoading || !!couponData}
                            />
                            <button
                                onClick={handleApplyCoupon}
                                className="apply-btn"
                                disabled={couponLoading || !!couponData || !couponCode.trim()}
                            >
                                {couponLoading ? 'Applying...' : 'Apply'}
                            </button>
                        </div>
                    </div>

                    {couponMessage && (
                        <div style={{
                            padding: '12px',
                            margin: '10px 0',
                            borderRadius: '6px',
                            fontSize: '14px',
                            textAlign: 'center',
                            backgroundColor: couponMessage.includes('✅') ? '#d4edda' : '#f8d7da',
                            color: couponMessage.includes('✅') ? '#155724' : '#721c24',
                            border: `1px solid ${couponMessage.includes('✅') ? '#c3e6cb' : '#f5c6cb'}`
                        }}>
                            {couponMessage}
                        </div>
                    )}

                    <div className="divider"></div>

                    <div className="summary-footer">
                        <span className="header-gold total-text">TOTAL</span>
                        <span className="total-price">
                            <strong>${finalTotal}</strong>
                            {couponData && (
                                <del style={{ color: '#999', marginLeft: '12px', fontSize: '15px' }}>
                                    ${subtotal.toFixed(2)}
                                </del>
                            )}
                        </span>
                    </div>
                </div>

                {/* BILLING DETAILS */}
                <div className="checkout-card billing-section">
                    <h2 className="section-title">BILLING DETAILS</h2>

                    <form onSubmit={handleSubmit}>
                        {/* First & Last Name */}
                        <div className="form-row">
                            <div className="form-group half-width">
                                <label className="input-label">First Name *</label>
                                <input type="text" name="firstName" className="form-input" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className="form-group half-width">
                                <label className="input-label">Last Name *</label>
                                <input type="text" name="lastName" className="form-input" value={formData.lastName} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Company & Country */}
                        <div className="form-row">
                            <div className="form-group half-width">
                                <label className="input-label">Company Name (Optional)</label>
                                <input type="text" name="company" className="form-input" value={formData.company} onChange={handleChange} />
                            </div>
                            <div className="form-group half-width">
                                <label className="input-label">Country / Region *</label>
                                <select name="country" className="form-select" value={formData.country} onChange={handleChange} required>
                                    <option value="">Select a country</option>
                                    {finalCountryList.map((country) => (
                                        <option key={country.isoCode} value={country.isoCode}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Street Address */}
                        <div className="form-group">
                            <label className="input-label">Street address *</label>
                            <input type="text" name="streetAddress" className="form-input" value={formData.streetAddress} onChange={handleChange} required />
                        </div>

                        {/* City, State, ZIP */}
                        <div className="form-row three-col">
                            <div className="form-group col-third">
                                <label className="input-label">Town / City *</label>
                                <input type="text" name="city" className="form-input" value={formData.city} onChange={handleChange} required />
                            </div>
                            <div className="form-group col-third">
                                <label className="input-label">State *</label>
                                <input type="text" name="state" className="form-input" value={formData.state} onChange={handleChange} required />
                            </div>
                            <div className="form-group col-third">
                                <label className="input-label">ZIP Code *</label>
                                <input type="text" name="zip" className="form-input" value={formData.zip} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Phone & Email */}
                        <div className="form-row">
                            <div className="form-group half-width">
                                <label className="input-label">Phone *</label>
                                <input type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} required />
                            </div>
                            <div className="form-group half-width">
                                <label className="input-label">Email address *</label>
                                <input type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="form-group">
                            <label className="input-label">Additional Information</label>
                            <textarea
                                name="notes"
                                className="form-textarea"
                                placeholder="Notes about your order e.g. special notes for delivery"
                                rows="4"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="place-order-btn">
                            Pay Now – ${finalTotal}
                        </button>
                    </form>
                </div>
            </div>

            {/* PAYMENT VERIFICATION MODAL */}
            {showPaymentModal && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.85)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    backdropFilter: 'blur(8px)',
                }}>
                    <div style={{
                        background: 'white',
                        padding: '50px 40px',
                        borderRadius: '20px',
                        textAlign: 'center',
                        maxWidth: '420px',
                        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
                        animation: 'fadeIn 0.4s ease-out'
                    }}>
                        {paymentStatus === 'verifying' && (
                            <>
                                <div style={{
                                    width: '70px',
                                    height: '70px',
                                    border: '8px solid #f0f0f0',
                                    borderTop: '8px solid #007bff',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    margin: '0 auto 25px'
                                }}></div>
                                <h3 style={{ margin: '0 0 15px', color: '#333' }}>Processing Payment</h3>
                                <p style={{ color: '#666', fontSize: '15px' }}>{paymentMessage}</p>
                            </>
                        )}

                        {paymentStatus === 'success' && (
                            <>
                                <div style={{ fontSize: '80px', color: '#28a745', marginBottom: '20px' }}>✓</div>
                                <h3 style={{ color: '#28a745' }}>Payment Successful!</h3>
                                <p style={{ color: '#555' }}>{paymentMessage}</p>
                            </>
                        )}

                        {paymentStatus === 'failed' && (
                            <>
                                <div style={{ fontSize: '80px', color: '#dc3545', marginBottom: '20px' }}>✕</div>
                                <h3 style={{ color: '#dc3545' }}>Payment Failed</h3>
                                <p style={{ color: '#555' }}>{paymentMessage}</p>
                                <button onClick={() => setShowPaymentModal(false)} style={{
                                    marginTop: '20px',
                                    padding: '12px 24px',
                                    background: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}>
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Checkout;