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
  const [deliveryMode, setDeliveryMode] = useState('fast')  // 'fast' | 'scheduled'
  const [selectedSlot, setSelectedSlot] = useState('10:00 - 12:00')
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const VALID_CODES = { 'FRESH20': 20, 'CAMPUS10': 10 }

  const applyPromo = () => {
    const pct = VALID_CODES[promoCode.toUpperCase()]
    if (pct) setDiscount(Math.round(cartTotal * pct / 100))
    else { setDiscount(0) }
  }

  const slots = ['10:00 - 12:00', '14:00 - 16:00', '18:00 - 20:00']
  const deliveryFee = 60
  const tax = 0.50
  const subtotal = cartTotal || 120
  const total = subtotal + deliveryFee + tax - discount

  // Use real cart items or fallback sample items
  const displayItems = cart.length > 0 ? cart : [
    { id: 1, name: 'Organic Carrots', qty: 1, price: 30, unit: 'kg', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=80&q=80' },
    { id: 2, name: 'Organic tomatoes', qty: 1, price: 40, unit: 'kg', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=80&q=80' },
    { id: 3, name: 'Pure Cow milk', qty: 1, price: 50, unit: 'ltr', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=80&q=80' },
  ]

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <PageHeader title="Checkout" />

      {/* Delivery Address */}
      <div style={{ background: 'white', margin: '8px 0', padding: '14px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1 }}>
            <MapPin size={18} weight="fill" color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Delivery Address</div>
              <div style={{ fontSize: 13, color: 'var(--text-subtle)', lineHeight: 1.5, fontWeight: 500 }}>
                123 Campus Lane, Block B,<br />Gurgaon, Haryana, 122018
              </div>
            </div>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)', flexShrink: 0 }}
            onClick={() => navigate('/address')}>Change</button>
        </div>
      </div>

      {/* Contact Information */}
      <div style={{ background: 'white', margin: '0 0 8px', padding: '14px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flex: 1 }}>
            <Phone size={18} color="var(--primary)" style={{ flexShrink: 0, marginTop: 2 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Contact Information</div>
              <div style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>Kshma Agrawal</div>
              <div style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>7830124625</div>
            </div>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)', flexShrink: 0 }}>Change</button>
        </div>
      </div>

      {/* Delivery Options */}
      <div style={{ background: 'white', margin: '0 0 8px', padding: '14px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="1" y="3" width="15" height="13" rx="2" stroke="var(--primary)" strokeWidth="1.8"/>
            <path d="M16 8h3l3 4v4h-6V8z" stroke="var(--primary)" strokeWidth="1.8" strokeLinejoin="round"/>
            <circle cx="5.5" cy="18.5" r="2" stroke="var(--primary)" strokeWidth="1.8"/>
            <circle cx="18.5" cy="18.5" r="2" stroke="var(--primary)" strokeWidth="1.8"/>
          </svg>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Delivery Options</span>
        </div>

        {/* Two option cards — only one active at a time */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {/* Fast Delivery card */}
          <div onClick={() => setDeliveryMode('fast')}
            style={{ flex: 1, border: `2px solid ${deliveryMode === 'fast' ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 12, padding: '14px 12px', cursor: 'pointer', background: deliveryMode === 'fast' ? 'var(--primary-pale)' : 'white', transition: 'all 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              {/* lightning bolt */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill={deliveryMode === 'fast' ? 'var(--primary)' : '#aaa'}><path d="M13 2L4.5 13.5H11L10 22L20 10H13.5L13 2Z"/></svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: deliveryMode === 'fast' ? 'var(--text-dark)' : 'var(--text-subtle)' }}>Fast Delivery</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 500 }}>30-45 MINS</div>
          </div>

          {/* Scheduled card */}
          <div onClick={() => setDeliveryMode('scheduled')}
            style={{ flex: 1, border: `2px solid ${deliveryMode === 'scheduled' ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 12, padding: '14px 12px', cursor: 'pointer', background: deliveryMode === 'scheduled' ? 'var(--primary-pale)' : 'white', transition: 'all 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              {/* clock icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={deliveryMode === 'scheduled' ? 'var(--primary)' : '#aaa'} strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 700, color: deliveryMode === 'scheduled' ? 'var(--text-dark)' : 'var(--text-subtle)' }}>Scheduled</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 500 }}>PICK A SLOT</div>
          </div>
        </div>

        {/* Slot picker — only shown when Scheduled is selected */}
        {deliveryMode === 'scheduled' && (
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available Slots Today</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {slots.map(s => (
                <button key={s} onClick={() => setSelectedSlot(s)}
                  style={{ padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)', border: `1.5px solid ${selectedSlot === s ? 'var(--primary)' : 'var(--border)'}`, background: selectedSlot === s ? 'var(--primary)' : 'white', color: selectedSlot === s ? 'white' : 'var(--text-dark)', transition: 'all 0.15s' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fast delivery ETA note */}
        {deliveryMode === 'fast' && (
          <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 4 }}>
            ⚡ Estimated arrival: <strong style={{ color: 'var(--primary)' }}>30–45 minutes</strong>
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div style={{ background: 'white', margin: '0 0 8px', padding: '14px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <CreditCard size={18} color="var(--primary)" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Payment Method</div>
              <div style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>Cash on delivery</div>
            </div>
          </div>
          <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}
            onClick={() => navigate('/payment-settings')}>Change</button>
        </div>
      </div>

      {/* Promo Code */}
      <div style={{ background: 'white', margin: '0 0 8px', padding: '12px 20px' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, padding: '10px 14px', border: '1.5px solid var(--border)', borderRadius: 10, background: 'var(--bg)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
            <input value={promoCode} onChange={e => setPromoCode(e.target.value.toUpperCase())}
              placeholder="Enter Promo Code"
              style={{ flex: 1, background: 'transparent', border: 'none', fontFamily: 'var(--font)', fontSize: 13, outline: 'none', color: 'var(--text-dark)' }} />
          </div>
          <button onClick={applyPromo}
            style={{ padding: '11px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)', flexShrink: 0 }}>
            Apply
          </button>
        </div>
        {discount > 0 && (
          <div style={{ marginTop: 8, fontSize: 12, color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
            <Check size={12} weight="bold" color="var(--primary)" /> {promoCode} applied — ₹{discount} off!
          </div>
        )}
      </div>

      {/* Ordered Items */}
      <div style={{ background: 'white', margin: '0 0 8px', padding: '14px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Ordered Items</span>
          <span style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>{displayItems.length} Items</span>
        </div>
        {displayItems.map((item, i) => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: i < displayItems.length - 1 ? 12 : 0 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: 'var(--primary-light)' }}>
              <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>{item.qty} {item.unit}</div>
            </div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>₹{item.price * item.qty}</div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div style={{ background: 'white', margin: '0 0 16px', padding: '14px 20px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Order Summary</div>
        {[
          ['Subtotal', `₹${subtotal}`],
          ['Delivery Fee', `₹${deliveryFee}`],
          ...(discount > 0 ? [['Discount', `-₹${discount}`]] : []),
          ['Tax', `₹${tax.toFixed(2)}`],
        ].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
            <span style={{ color: 'var(--text-subtle)', fontWeight: 500 }}>{l}</span>
            <span style={{ fontWeight: 600, color: l === 'Discount' ? 'var(--primary)' : 'var(--text-dark)' }}>{v}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontSize: 17, fontWeight: 800, marginTop: 4 }}>
          <span>Total:</span>
          <span style={{ color: 'var(--primary)' }}>₹{total.toFixed(2)}</span>
        </div>
      </div>

      {/* Place Order CTA */}
      <div style={{ padding: '0 20px 32px' }}>
        <button className="btn btn-primary" onClick={() => { clearCart(); navigate('/order-confirmation') }}>
          Place Order
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