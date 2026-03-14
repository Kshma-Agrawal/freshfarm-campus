import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomNav, TopNav, PageHeader, Stars, MapPin, Bell, Package, CreditCard, Gear, SignOut, PencilSimple, Trash, ChatCircle, Phone, Check, CaretRight } from '../components/UI'
import { ORDERS, ADDRESSES, userKshmaImg } from '../data'
import farmerHarpalImg from '../assets/farmer-harpal.jpg'
import farmerRaniImg from '../assets/farmer-rani.jpg'
import farmerSunriseImg from '../assets/farmer-sunrise.jpg'
import logoImg from '../assets/logo.png'

// ── PROFILE ───────────────────────────────────────────────────────
export function ProfilePage() {
  const navigate = useNavigate()
  const menuItems = [
    { icon: <PencilSimple size={18} />, title: 'Edit Profile', sub: 'Update your personal info', path: '/edit-profile' },
    { icon: <MapPin size={18} />, title: 'Saved Addresses', sub: 'Manage delivery addresses', path: '/saved-addresses' },
    { icon: <Package size={18} />, title: 'My Orders', sub: 'View order history', path: '/orders' },
    { icon: <Package size={18} />, title: 'Coupons', sub: 'Your saved coupons', path: '/coupons' },
    { icon: <CreditCard size={18} />, title: 'Payment Settings', sub: 'Manage payment methods', path: '/payment-settings' },
    { icon: <Bell size={18} />, title: 'Notifications', sub: 'Manage alerts', path: '/notifications' },
    { icon: <Gear size={18} />, title: 'Settings', sub: 'App preferences', path: '/settings' },
  ]
  return (
    <div className="screen">
      <TopNav />
      <div style={{ padding: '16px 20px 4px', background: 'white' }}>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.011em' }}>My Profile</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 20px 24px', borderBottom: '1px solid var(--border)', background: 'white' }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', marginBottom: 12, border: '3px solid var(--primary)', overflow: 'hidden' }}>
          <img src={userKshmaImg} alt="Kshma" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: '-0.011em' }}>Kshma Agrawal</div>
        <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 4, fontWeight: 500 }}>+91 87555 00001</div>
      </div>
      {menuItems.map(item => (
        <div key={item.path} className="profile-menu-item" onClick={() => navigate(item.path)}>
          <div className="profile-menu-icon">{item.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2, fontWeight: 500 }}>{item.sub}</div>
          </div>
          <CaretRight size={16} color="var(--text-subtle)" />
        </div>
      ))}
      <div className="profile-menu-item" onClick={() => navigate('/splash')}>
        <div className="profile-menu-icon" style={{ background: '#ffebee', color: 'var(--error)' }}>
          <SignOut size={18} color="var(--error)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--error)' }}>Logout</div>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

// ── EDIT PROFILE ──────────────────────────────────────────────────
export function EditProfilePage() {
  const navigate = useNavigate()
  return (
    <div className="screen" style={{ background: 'white' }}>
      <PageHeader title="Edit Profile" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0 18px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: 84, height: 84, borderRadius: '50%', border: '3px solid var(--primary)', overflow: 'hidden' }}>
            <img src={userKshmaImg} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <PencilSimple size={13} color="white" />
          </div>
        </div>
        <div style={{ fontSize: 16, fontWeight: 700, marginTop: 10, letterSpacing: '-0.011em' }}>Kshma Agrawal</div>
      </div>
      <div style={{ padding: '0 20px' }}>
        {[
          { label: 'Name', val: 'Kshma Agrawal' },
          { label: 'Phone', val: '+91 7830124625' },
          { label: 'Email', val: 'kshmaagrawal@example.com' },
          { label: 'Location', val: 'Mathura' },
          { label: 'State', val: 'Uttar Pradesh' },
        ].map((f, i) => (
          <div key={i}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', display: 'block', marginBottom: 5, marginTop: 14 }}>{f.label}</label>
            <input style={{ width: '100%', padding: '13px 14px', border: '1.5px solid var(--border)', borderRadius: 12, fontFamily: 'var(--font)', fontSize: 14, fontWeight: 500, background: 'var(--bg)', color: 'var(--text-dark)', outline: 'none' }}
              defaultValue={f.val} />
          </div>
        ))}
        <button className="btn btn-primary mt-24 mb-16">Save Changes</button>
      </div>
    </div>
  )
}

// ── SAVED ADDRESSES ───────────────────────────────────────────────
export function SavedAddressesPage() {
  const navigate = useNavigate()
  return (
    <div className="screen" style={{ background: 'white' }}>
      <PageHeader title="Saved Addresses" />
      {ADDRESSES.map(a => (
        <div key={a.id} className="address-item">
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
            {a.icon}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, fontWeight: 700 }}>{a.label}</span>
              {a.current && <span style={{ fontSize: 11, color: 'var(--primary)', fontWeight: 500 }}>Current</span>}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 4, lineHeight: 1.5, fontWeight: 500 }}>{a.address}</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 3, fontWeight: 500 }}>{a.phone}</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <button className="address-action-btn edit-btn-sm"><PencilSimple size={14} color="var(--primary)" /></button>
            <button className="address-action-btn delete-btn-sm"><Trash size={14} color="var(--error)" /></button>
          </div>
        </div>
      ))}
      <div style={{ padding: 20 }}>
        <button className="btn btn-outline" onClick={() => navigate('/address')}>+ Add New Address</button>
      </div>
    </div>
  )
}

// ── ORDERS ────────────────────────────────────────────────────────
export function OrdersPage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('All')
  const filtered = tab === 'All' ? ORDERS : ORDERS.filter(o => {
    if (tab === 'Ongoing') return o.status === 'ongoing'
    if (tab === 'Completed') return o.status === 'arrived'
    if (tab === 'Cancelled') return o.status === 'cancelled'
    return true
  })
  const statusClass = { arrived: 'status-arrived', cancelled: 'status-cancelled', ongoing: 'status-ongoing' }
  const statusLabel = { arrived: 'Arrived', cancelled: 'Cancelled', ongoing: 'Ongoing' }
  return (
    <div className="screen">
      <PageHeader title="My Orders" />
      <div className="tabs">
        {['All', 'Ongoing', 'Completed', 'Cancelled'].map(t => (
          <div key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</div>
        ))}
      </div>
      {filtered.map(order => (
        <div key={order.id} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', cursor: 'pointer', background: 'white' }}
          onClick={() => navigate(`/order/${order.id}`)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Order #{order.id}</span>
            <span className={`order-status ${statusClass[order.status]}`}>{statusLabel[order.status]}</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {order.items.slice(0, 3).map((item, i) => (
              <div key={i} style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', background: 'var(--primary-light)' }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 14 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>₹{order.amount}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2, fontWeight: 500 }}>{order.date}</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button style={{ padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: '1.5px solid var(--border)', background: 'var(--bg)', fontFamily: 'var(--font)' }}
                onClick={e => { e.stopPropagation(); navigate(`/rate/${order.id}`) }}>Rate Order</button>
              <button style={{ padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer', border: 'none', background: 'var(--primary)', color: 'white', fontFamily: 'var(--font)' }}>Reorder</button>
            </div>
          </div>
        </div>
      ))}
      <BottomNav />
    </div>
  )
}

// ── ORDER DETAIL ──────────────────────────────────────────────────
export function OrderDetailPage() {
  const navigate = useNavigate()
  const order = ORDERS[0]
  return (
    <div className="screen" style={{ background: 'white' }}>
      <PageHeader title="Order Summary" />
      <div style={{ background: 'var(--primary-pale)', borderRadius: 12, margin: '14px 20px 0', padding: '14px 16px' }}>
        <div style={{ fontSize: 14, fontWeight: 700 }}>Order #{order.id}</div>
        <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 3, fontWeight: 500 }}>₹{order.amount} • {order.date}</div>
      </div>
      <div style={{ padding: '18px 20px 6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Ordered Items</span>
        <span style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>{order.items.length} Items</span>
      </div>
      {order.items.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: 10, overflow: 'hidden', background: 'var(--primary-light)', flexShrink: 0 }}>
              <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2, fontWeight: 500 }}>{item.qty}</div>
            </div>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>₹{item.price}</div>
        </div>
      ))}
      <div style={{ margin: '16px 20px', background: 'var(--bg)', borderRadius: 12, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          <img src={order.farmer.img} alt={order.farmer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 700 }}>{order.farmer.name}</div>
          <div style={{ fontSize: 12, color: 'var(--text-subtle)', fontWeight: 500 }}>{order.farmer.location}</div>
          <Stars rating={order.farmer.rating} size={11} />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="contact-btn"><Phone size={16} /></button>
          <button className="contact-btn"><ChatCircle size={16} /></button>
        </div>
      </div>
      <div style={{ padding: '8px 20px 20px', display: 'flex', gap: 12 }}>
        <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('/order-tracking')}>Track Your Order</button>
        <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate('/home')}>Continue Shopping</button>
      </div>
    </div>
  )
}

// ── ORDER TRACKING ────────────────────────────────────────────────
export function OrderTrackingPage() {
  const steps = [
    { label: 'Order Placed', time: '12:30 PM', done: true },
    { label: 'Packed', time: '12:45 PM', done: true },
    { label: 'Out for Delivery', time: 'Rahul is on his way', done: true },
    { label: 'Delivered', time: 'Pending', done: false },
  ]
  return (
    <div className="screen" style={{ background: 'white' }}>
      <PageHeader title="Track Order" />
      <div style={{ width: 'calc(100% - 40px)', height: 220, background: 'linear-gradient(135deg, #b2dfdb, #80cbc4, #4db6ac)', borderRadius: 12, margin: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48 }}>🗺️</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.95)', fontWeight: 600, marginTop: 8 }}>Arriving in 15 mins</div>
        </div>
      </div>
      <div style={{ background: 'var(--primary-pale)', borderRadius: 12, margin: '0 20px 20px', padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden' }}>
            <img src={farmerHarpalImg} alt="Delivery partner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>Rahul Sharma</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', fontWeight: 500 }}>Your delivery partner</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="contact-btn"><Phone size={16} /></button>
          <button className="contact-btn"><ChatCircle size={16} /></button>
        </div>
      </div>
      <div style={{ padding: '0 20px' }}>
        {steps.map((step, i) => (
          <div key={i} className="tracking-step">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`step-dot ${step.done ? 'done' : 'pending'}`}>
                {step.done && <Check size={12} weight="bold" color="white" />}
              </div>
              {i < steps.length - 1 && <div className={`step-line ${step.done ? 'done' : ''}`} />}
            </div>
            <div style={{ paddingTop: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{step.label}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2, fontWeight: 500 }}>{step.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── RATE EXPERIENCE ───────────────────────────────────────────────
export function RateExperiencePage() {
  const navigate = useNavigate()
  const [overall, setOverall] = useState(0)
  const [itemRatings, setItemRatings] = useState({})
  const [review, setReview] = useState('')
  const order = ORDERS[0]
  return (
    <div className="screen" style={{ background: 'white' }}>
      <PageHeader title="Rate Your Experience" />
      <div style={{ padding: 20 }}>
        <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.011em' }}>How was your delivery Experience?</p>
        <p style={{ fontSize: 13, color: 'var(--text-subtle)', marginBottom: 14, fontWeight: 500 }}>with {order.farmer.name}</p>
        <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
          {[1,2,3,4,5].map(i => (
            <span key={i} style={{ fontSize: 32, cursor: 'pointer', color: i <= overall ? '#F4C652' : '#e0e0e0', transition: 'color 0.15s' }}
              onClick={() => setOverall(i)}>★</span>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 18 }}>
          <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, letterSpacing: '-0.011em' }}>Rate items in your order</p>
          {order.items.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', background: 'var(--primary-light)' }}>
                  <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</span>
              </div>
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(i => (
                  <span key={i} style={{ fontSize: 22, cursor: 'pointer', color: i <= (itemRatings[idx] || 0) ? '#F4C652' : '#e0e0e0' }}
                    onClick={() => setItemRatings(p => ({ ...p, [idx]: i }))}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <textarea style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: 12, fontFamily: 'var(--font)', fontSize: 14, resize: 'none', outline: 'none', marginTop: 18, fontWeight: 500 }}
          rows={3} placeholder="Write your review..." value={review} onChange={e => setReview(e.target.value)} />
        <button className="btn btn-primary mt-16" onClick={() => navigate('/home')}>Submit Review</button>
        <button className="btn btn-outline mt-8" onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}

// ── COUPONS ───────────────────────────────────────────────────────
export function CouponsPage() {
  const coupons = [
    { code: 'FRESH20', desc: '20% off on your first order', expiry: 'Expires 31 Mar 2026' },
    { code: 'CAMPUS10', desc: 'Flat ₹10 off on orders above ₹100', expiry: 'Expires 15 Apr 2026' },
    { code: 'VEGGIE50', desc: '₹50 off on vegetable orders above ₹200', expiry: 'Expires 30 Apr 2026' },
  ]
  return (
    <div className="screen" style={{ background: 'white' }}>
      <PageHeader title="Coupons" />
      <div style={{ padding: '16px 0 8px' }}>
        {coupons.map((c, i) => (
          <div key={i} className="coupon-card">
            <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--primary-dark)', letterSpacing: '0.05em' }}>{c.code}</div>
            <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 5, fontWeight: 500 }}>{c.desc}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
              <span style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 500 }}>{c.expiry}</span>
              <button className="btn btn-sm" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>Apply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────
export function NotificationsPage() {
  const notifs = [
    { text: 'Your order #FFC-12345 has been delivered successfully!', time: '2 mins ago', unread: true },
    { text: 'New produce available from Rani Kumari: Fresh Mangoes at ₹120/kg', time: '1 hour ago', unread: true },
    { text: 'Exclusive offer: Use FRESH20 for 20% off today only.', time: '3 hours ago', unread: false },
    { text: 'Harpal Singh Farm just added Fresh Spinach to the store.', time: 'Yesterday', unread: false },
    { text: 'Your order #FFC-12344 is out for delivery.', time: 'Yesterday', unread: false },
  ]
  return (
    <div className="screen" style={{ background: 'white' }}>
      <PageHeader title="Notifications" />
      {notifs.map((n, i) => (
        <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 20px', borderBottom: '1px solid var(--border)', background: n.unread ? 'var(--primary-pale)' : 'white' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
            <img src={logoImg} alt="FFC" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: 'var(--text-dark)', lineHeight: 1.5, fontWeight: 500 }}>{n.text}</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 5, fontWeight: 500 }}>{n.time}</div>
          </div>
          {n.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)', marginTop: 6, flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  )
}
