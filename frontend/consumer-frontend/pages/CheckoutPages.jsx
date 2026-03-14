import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageHeader, Trash, Check, ShoppingCart, MapPin, CreditCard, Phone } from '../components/UI'
import { useCart } from '../context/CartContext'
import orderConfirmedImg from '../assets/order-confirmed.jpg'
import userKshmaImg from '../assets/user-kshma.jpg'

// ── CART ──────────────────────────────────────────────────────────
export function CartPage() {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart, clearCart, cartTotal } = useCart()
  const [coupon, setCoupon] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)

  const discount = appliedCoupon === 'FRESH20' ? Math.round(cartTotal * 0.2) : 0
  const delivery = cart.length > 0 ? 25 : 0
  const total = cartTotal - discount + delivery

  if (cart.length === 0) {
    return (
      <div className="screen" style={{ background: 'white' }}>
        <PageHeader title="My Cart" />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 16 }}>
          <ShoppingCart size={72} weight="duotone" color="var(--border)" />
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-subtle)' }}>Your cart is empty</div>
          <p style={{ fontSize: 14, color: 'var(--text-subtle)', textAlign: 'center', maxWidth: 240, fontWeight: 500 }}>Add some fresh produce from local farmers!</p>
          <button className="btn btn-primary" style={{ maxWidth: 240 }} onClick={() => navigate('/home')}>Browse Produce</button>
        </div>
      </div>
    )
  }

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <PageHeader title={`My Cart (${cart.length})`} />

      {/* Cart Items */}
      <div style={{ background: 'white', marginBottom: 10 }}>
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-img">
              <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2, fontWeight: 500 }}>{item.farmer}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--primary)', marginTop: 5 }}>₹{item.price * item.qty}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', padding: 4 }}
                onClick={() => removeFromCart(item.id, true)}>
                <Trash size={16} color="var(--error)" />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button style={{ width: 26, height: 26, borderRadius: 7, border: '1.5px solid var(--primary)', background: 'white', color: 'var(--primary)', fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
                  onClick={() => removeFromCart(item.id)}>−</button>
                <span style={{ fontSize: 14, fontWeight: 700, minWidth: 18, textAlign: 'center' }}>{item.qty}</span>
                <button style={{ width: 26, height: 26, borderRadius: 7, border: '1.5px solid var(--primary)', background: 'white', color: 'var(--primary)', fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}
                  onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div style={{ background: 'white', padding: '16px 20px', marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>Apply Coupon</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <input style={{ flex: 1, padding: '11px 14px', border: '1.5px solid var(--border)', borderRadius: 10, fontFamily: 'var(--font)', fontSize: 13, fontWeight: 500, outline: 'none' }}
            placeholder="Enter coupon code" value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} />
          <button style={{ padding: '11px 18px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)' }}
            onClick={() => { if (coupon === 'FRESH20') setAppliedCoupon('FRESH20') }}>Apply</button>
        </div>
        {appliedCoupon && (
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Check size={13} weight="bold" color="var(--primary)" /> FRESH20 applied — 20% discount!
          </div>
        )}
      </div>

      {/* Bill Summary */}
      <div style={{ background: 'white', padding: '16px 20px', marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 14 }}>Bill Summary</div>
        {[
          { label: 'Subtotal', val: `₹${cartTotal}` },
          ...(discount > 0 ? [{ label: 'Discount (FRESH20)', val: `-₹${discount}`, green: true }] : []),
          { label: 'Delivery Fee', val: `₹${delivery}` },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, fontSize: 14, fontWeight: 500 }}>
            <span style={{ color: 'var(--text-subtle)' }}>{r.label}</span>
            <span style={{ color: r.green ? 'var(--primary)' : 'var(--text-dark)', fontWeight: 600 }}>{r.val}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800 }}>
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div style={{ padding: '0 20px 20px' }}>
        <button className="btn btn-primary" onClick={() => navigate('/checkout')}>
          Proceed to Checkout  ₹{total}
        </button>
      </div>
    </div>
  )
}

// ── CHECKOUT ──────────────────────────────────────────────────────
export function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, cartTotal, clearCart } = useCart()
  const [delivery, setDelivery] = useState('standard')
  const [slot, setSlot] = useState('9-12')
  const [payment, setPayment] = useState('cod')

  const deliveryFee = delivery === 'express' ? 49 : 25
  const total = cartTotal + deliveryFee

  const slots = ['9-12', '12-3', '3-6', '6-9']
  const paymentOpts = [
    { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
    { id: 'upi', label: 'UPI / Net Banking', icon: '📱' },
    { id: 'card', label: 'Credit / Debit Card', icon: '💳' },
  ]

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <PageHeader title="Checkout" />

      {/* Delivery Address */}
      <div className="checkout-section" style={{ background: 'white', marginBottom: 10 }}>
        <div className="checkout-section-title">Delivery Address</div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <MapPin size={18} weight="fill" color="var(--primary)" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Home</div>
            <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 3, lineHeight: 1.5, fontWeight: 500 }}>
              123 Campus Lane, Block B, Gurgaon, Haryana 122018
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Type */}
      <div className="checkout-section" style={{ background: 'white', marginBottom: 10 }}>
        <div className="checkout-section-title">Delivery Type</div>
        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { id: 'standard', label: 'Standard', sub: 'Today, 4-6 hrs', fee: '₹25' },
            { id: 'express', label: 'Express', sub: 'In 1-2 hrs', fee: '₹49' },
          ].map(opt => (
            <div key={opt.id} className={`delivery-option ${delivery === opt.id ? 'selected' : ''}`}
              onClick={() => setDelivery(opt.id)}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{opt.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 3, fontWeight: 500 }}>{opt.sub}</div>
              <div style={{ fontSize: 13, color: 'var(--primary)', marginTop: 5, fontWeight: 700 }}>{opt.fee}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div className="checkout-section" style={{ background: 'white', marginBottom: 10 }}>
        <div className="checkout-section-title">Select Time Slot</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {slots.map(s => (
            <button key={s} className={`time-slot ${slot === s ? 'selected' : ''}`} onClick={() => setSlot(s)}>
              {s} AM
            </button>
          ))}
        </div>
      </div>

      {/* Payment */}
      <div className="checkout-section" style={{ background: 'white', marginBottom: 10 }}>
        <div className="checkout-section-title">Payment Method</div>
        {paymentOpts.map(opt => (
          <div key={opt.id} className="payment-option" onClick={() => setPayment(opt.id)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="payment-icon">{opt.icon}</div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{opt.label}</span>
            </div>
            <div className={`radio-outer ${payment === opt.id ? 'selected' : ''}`}>
              {payment === opt.id && <div className="radio-inner" />}
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div style={{ background: 'white', padding: '16px 20px', marginBottom: 10 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Order Summary</div>
        {cart.slice(0, 3).map(item => (
          <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>
            <span style={{ color: 'var(--text-subtle)' }}>{item.name} × {item.qty}</span>
            <span style={{ fontWeight: 600 }}>₹{item.price * item.qty}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, marginTop: 4 }}>
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <div style={{ padding: '0 20px 24px' }}>
        <button className="btn btn-primary" onClick={() => { clearCart(); navigate('/order-confirmation') }}>
          Place Order  •  ₹{total}
        </button>
      </div>
    </div>
  )
}

// ── ORDER CONFIRMATION ────────────────────────────────────────────
export function OrderConfirmationPage() {
  const navigate = useNavigate()
  return (
    <div className="screen no-nav" style={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '100vh', padding: 0 }}>
      {/* Hero image */}
      <div style={{ width: '100%', height: 260, overflow: 'hidden', flexShrink: 0 }}>
        <img src={orderConfirmedImg} alt="Order Confirmed" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 28px 0', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 6px 20px rgba(65,101,70,0.35)' }}>
          <Check size={36} weight="bold" color="white" />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.011em', marginBottom: 10 }}>Order Confirmed!</h2>
        <p style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.7, maxWidth: 280, fontWeight: 500 }}>
          Your order has been placed successfully. Fresh produce will be delivered to your doorstep soon!
        </p>

        {/* Order details chip */}
        <div style={{ background: 'var(--primary-pale)', border: '1.5px solid var(--primary-light)', borderRadius: 12, padding: '14px 20px', marginTop: 20, width: '100%', maxWidth: 320 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13, fontWeight: 500 }}>
            <span style={{ color: 'var(--text-subtle)' }}>Order ID</span>
            <span style={{ fontWeight: 700 }}>FFC-12348</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 500 }}>
            <span style={{ color: 'var(--text-subtle)' }}>Estimated Delivery</span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Today, 5:30 PM</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 24px 36px', width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn btn-primary" onClick={() => navigate('/order-tracking')}>Track Order</button>
        <button className="btn btn-outline" onClick={() => navigate('/home')}>Continue Shopping</button>
      </div>
    </div>
  )
}

// ── ADDRESS PAGE ──────────────────────────────────────────────────
export function AddressPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState('Home')
  const addresses = [
    { id: 'Home', icon: '🏠', label: 'Home', detail: '123 Campus Lane, Block B, Gurgaon, Haryana 122018' },
    { id: 'Office', icon: '🏢', label: 'Office', detail: '456 Business Park, Sector 34, Gurgaon, Haryana 122001' },
  ]
  return (
    <div className="screen" style={{ background: 'white' }}>
      <PageHeader title="Select Address" />
      {addresses.map(a => (
        <div key={a.id} style={{ display: 'flex', gap: 14, padding: '16px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer', alignItems: 'flex-start' }}
          onClick={() => setSelected(a.id)}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{a.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{a.label}</div>
            <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 4, lineHeight: 1.5, fontWeight: 500 }}>{a.detail}</div>
          </div>
          <div className={`radio-outer ${selected === a.id ? 'selected' : ''}`} style={{ marginTop: 4 }}>
            {selected === a.id && <div className="radio-inner" />}
          </div>
        </div>
      ))}
      <div style={{ padding: '14px 20px' }}>
        <button className="btn btn-outline" onClick={() => navigate('/saved-addresses')}>+ Add New Address</button>
      </div>
      <div style={{ padding: '0 20px 24px' }}>
        <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Confirm Address</button>
      </div>
    </div>
  )
}

// ── PAYMENT SETTINGS ──────────────────────────────────────────────
export function PaymentSettingsPage() {
  const navigate = useNavigate()
  const options = [
    { icon: '💵', label: 'Cash on Delivery', sub: 'Pay when your order arrives' },
    { icon: '📱', label: 'UPI', sub: 'Pay via Google Pay, PhonePe, Paytm' },
    { icon: '💳', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay accepted' },
    { icon: '🏦', label: 'Net Banking', sub: 'All major banks supported' },
  ]
  return (
    <div className="screen" style={{ background: 'white' }}>
      <PageHeader title="Payment Settings" />
      {options.map((o, i) => (
        <div key={i} className="payment-option">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div className="payment-icon" style={{ fontSize: 22 }}>{o.icon}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{o.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2, fontWeight: 500 }}>{o.sub}</div>
            </div>
          </div>
          <CreditCard size={18} color="var(--text-subtle)" />
        </div>
      ))}
    </div>
  )
}
