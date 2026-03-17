import { useState, createContext, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CaretLeft, CaretRight, Plus, MagnifyingGlass, MapPin, Phone, CreditCard, Camera, Star, Truck, Package, Check, X, ShoppingCart, Funnel, PencilSimple, Trash, ChatCircle, Minus, ShareNetwork, Warning
} from '@phosphor-icons/react'
import { FarmerBottomNav } from './FarmerOnboardingPages'
import { TopNav, PageHeader } from '../components/UI'

// ── FARM CART STATE (module-level so it persists across pages) ────
let _farmCart = []
let _farmCartListeners = []
function getFarmCart() { return _farmCart }
function addToFarmCart(item) {
  const existing = _farmCart.find(i => i.id === item.id)
  if (existing) _farmCart = _farmCart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
  else _farmCart = [..._farmCart, { ...item, qty: 1 }]
  _farmCartListeners.forEach(fn => fn(_farmCart))
}
function removeFromFarmCart(id) {
  const item = _farmCart.find(i => i.id === id)
  if (!item) return
  if (item.qty <= 1) _farmCart = _farmCart.filter(i => i.id !== id)
  else _farmCart = _farmCart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i)
  _farmCartListeners.forEach(fn => fn(_farmCart))
}
function useFarmCart() {
  const [cart, setCart] = useState(() => getFarmCart())
  useState(() => { _farmCartListeners.push(setCart); return () => { _farmCartListeners = _farmCartListeners.filter(f => f !== setCart) } })
  return { cart, addToFarmCart, removeFromFarmCart, farmCartCount: cart.reduce((s,i) => s+i.qty, 0) }
}

const MARKETPLACE_ITEMS = [
  { id: 1, name: 'Premium Organic Compost', seller: 'Green Valley Farms', dist: '2.4 miles', qty: '15 tons', price: 45, priceLabel: '₹45/tone', category: 'Organic Manure', img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=300&q=80' },
  { id: 2, name: 'Dry Wheat Residue', seller: 'Evergreen Organics', dist: '1.8 miles', qty: '120 bales', price: 12, priceLabel: '₹12/bale', category: 'Crop Residue', img: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=300&q=80' },
  { id: 3, name: 'Heirloom Tomato Seeds', seller: 'Sunrise Seeds Co.', dist: '3.1 miles', qty: '500 packets', price: 80, priceLabel: '₹80/pkt', category: 'Seeds', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&q=80' },
  { id: 4, name: 'Manual Soil Tiller', seller: 'Farm Tools Hub', dist: '4.2 miles', qty: '8 units', price: 1200, priceLabel: '₹1200/unit', category: 'Equipment', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&q=80' },
  { id: 5, name: 'Vermicompost Mix', seller: 'Green Valley Farms', dist: '2.4 miles', qty: '30 bags', price: 60, priceLabel: '₹60/bag', category: 'Organic Manure', img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=300&q=80' },
  { id: 6, name: 'Rice Straw Bales', seller: 'Evergreen Organics', dist: '1.8 miles', qty: '80 bales', price: 15, priceLabel: '₹15/bale', category: 'Crop Residue', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=300&q=80' },
]

// ── RESOURCES MAIN ────────────────────────────────────────────────
export function ResourcesMainPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <TopNav farmerMode={true} />
      <div className="screen">
        <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Resources</span>
        </div>
        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80', title: 'Marketplace', desc: 'Buy & sell farm materials with ease', cta: 'Explore', path: '/farmer/marketplace' },
            { img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80', title: 'Counselling', desc: 'Get expert guidance for your farm', cta: 'Get Guidance', path: '/farmer/counselling' },
          ].map((card, i) => (
            <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ height: 160, overflow: 'hidden' }}>
                <img src={card.img} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{card.title}</div>
                <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginBottom: 14 }}>{card.desc}</div>
                <button className="btn btn-primary" onClick={() => navigate(card.path)}>{card.cta}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FarmerBottomNav active="resources" />
    </div>
  )
}

// ── MARKETPLACE ───────────────────────────────────────────────────
export function MarketplacePage() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('Browse')
  const [catFilter, setCatFilter] = useState('All')
  const [search, setSearch] = useState('')
  const { cart, farmCartCount } = useFarmCart()
  const cats = ['All', 'Organic Manure', 'Crop Residue', 'Seeds', 'Equipment']

  const filtered = MARKETPLACE_ITEMS.filter(item => {
    const matchCat = catFilter === 'All' || item.category === catFilter
    const matchQ = !search || item.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Marketplace</span>
        <button style={{ marginLeft: 'auto', position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} onClick={() => navigate('/farmer/farm-cart')}>
          <ShoppingCart size={24} color="var(--text-dark)" />
          {farmCartCount > 0 && <span style={{ position: 'absolute', top: 2, right: 2, width: 16, height: 16, borderRadius: '50%', background: 'var(--primary)', color: 'white', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{farmCartCount}</span>}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', background: 'white', borderBottom: '1px solid var(--border)' }}>
        {['Browse', 'My listings', 'My purchases'].map(t => (
          <button key={t} onClick={() => { setTab(t); if (t === 'My listings') navigate('/farmer/my-listings'); if (t === 'My purchases') navigate('/farmer/my-purchases') }}
            className={`chip ${tab === t ? 'chip-active' : 'chip-inactive'}`} style={{ padding: '8px 16px', fontSize: 13 }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: '14px 16px 100px' }}>
        <div className="search-inner" style={{ marginBottom: 12 }}>
          <MagnifyingGlass style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }} size={18} color="var(--text-subtle)" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search farm material"
            style={{ padding: '12px 12px 12px 42px', width: '100%', background: 'transparent', border: 'none', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 16 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`chip ${catFilter === c ? 'chip-active' : 'chip-inactive'}`} style={{ padding: '7px 14px', fontSize: 12, flexShrink: 0 }}>{c}</button>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-subtle)' }}>
            <Package size={40} color="var(--border)" style={{ marginBottom: 10 }} />
            <div style={{ fontWeight: 600 }}>No items found</div>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {filtered.map(item => (
            <MarketplaceCard key={item.id} item={item} navigate={navigate} />
          ))}
        </div>
      </div>
      <FarmerBottomNav active="resources" />
    </div>
  )
}

function MarketplaceCard({ item, navigate }) {
  const { cart, farmCartCount } = useFarmCart()
  const qty = cart.find(i => i.id === item.id)?.qty || 0
  return (
    <div onClick={() => navigate(`/farmer/material/${item.id}`)}
      style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ height: 120, overflow: 'hidden' }}>
        <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{item.name}</div>
        <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginBottom: 2 }}>{item.seller}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--text-subtle)', marginBottom: 8 }}>
          <MapPin size={11} /> {item.dist} <span style={{ marginLeft: 4 }}>{item.qty}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700, fontSize: 13 }}>{item.priceLabel}</span>
          {qty === 0 ? (
            <button className="add-btn" style={{ padding: '5px 10px', fontSize: 12 }}
              onClick={e => { e.stopPropagation(); addToFarmCart(item) }}>
              <Plus size={12} weight="bold" /> Add
            </button>
          ) : (
            <div className="qty-control" style={{ transform: 'scale(0.85)', transformOrigin: 'right' }} onClick={e => e.stopPropagation()}>
              <button className="qty-btn" onClick={() => removeFromFarmCart(item.id)}><Minus size={12} weight="bold" /></button>
              <span className="qty-num">{qty}</span>
              <button className="qty-btn" onClick={() => addToFarmCart(item)}><Plus size={12} weight="bold" /></button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MY LISTINGS ───────────────────────────────────────────────────
export function MyListingsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('Active')
  const filters = ['Active', 'Sold', 'Out of Stock']
  const items = [
    { name: 'Organic Compost', qty: '45 kg', orders: 12, price: '₹40 / kg', status: 'IN STOCK', img: 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=300&q=80' },
    { name: 'Dry Wheat Residue', qty: '45 kg', orders: 9, price: '₹30 / kg', status: 'IN STOCK', img: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=300&q=80' },
    { name: 'Dry Wheat Residue', qty: '15 kg', orders: 0, price: '₹30 / kg', status: 'IN STOCK', img: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=300&q=80' },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>My Listings</span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', background: 'white', borderBottom: '1px solid var(--border)' }}>
        {['My listings', 'Browse', 'My purchases'].map(t => (
          <button key={t} className={`chip ${t === 'My listings' ? 'chip-active' : 'chip-inactive'}`}
            onClick={() => { if (t === 'Browse') navigate('/farmer/marketplace'); if (t === 'My purchases') navigate('/farmer/my-purchases') }}
            style={{ padding: '8px 16px', fontSize: 13 }}>{t}</button>
        ))}
      </div>

      <div className="screen">
        <div style={{ padding: '14px 16px' }}>
          <div className="search-inner" style={{ marginBottom: 12 }}>
            <MagnifyingGlass className="search-icon-pos" size={18} />
            <input placeholder="Search Listings" style={{ padding: '12px 12px 12px 42px', width: '100%', background: 'transparent', border: 'none', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`chip ${filter === f ? 'chip-active' : 'chip-inactive'}`} style={{ padding: '7px 14px', fontSize: 12 }}>{f}</button>
            ))}
          </div>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, background: 'white', borderRadius: '12px', padding: 14, marginBottom: 10, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', alignItems: 'center' }}>
              <div style={{ width: 70, height: 70, borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>Available: {item.qty}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Active orders: {item.orders}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{item.price}
                  <span style={{ fontSize: 11, fontWeight: 600, marginLeft: 8, padding: '2px 8px', borderRadius: 10, background: 'var(--primary-light)', color: 'var(--primary)' }}>{item.status}</span>
                </div>
                <button style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--error)', cursor: 'pointer', fontFamily: 'var(--font)', marginTop: 4 }}>Disable</button>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8 }} onClick={() => navigate('/farmer/edit-material/1')}>
                <PencilSimple size={18} color="var(--text-subtle)" />
              </button>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 16px 20px' }}>
          <button className="btn btn-primary" onClick={() => navigate('/farmer/add-material')}>
            <Plus size={18} weight="bold" /> Add Material
          </button>
        </div>
      </div>
      <FarmerBottomNav active="resources" />
    </div>
  )
}

// ── MATERIAL DETAIL ───────────────────────────────────────────────
export function MaterialDetailPage() {
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Material Detail</span>
        <button className="icon-btn" style={{ marginLeft: 'auto' }}><ShareNetwork size={22} /></button>
      </div>
      <div style={{ height: 240, overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&q=80" alt="Compost" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', background: 'var(--primary-light)', padding: '3px 10px', borderRadius: 20 }}>In Stock</span>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, margin: '8px 0 4px' }}>Premium Organic Compost</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 4 }}>By Sunrise Farms</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 16 }}>Available: 142 bags</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--primary)', marginBottom: 16 }}>Rs.60/kg</div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-subtle)', marginBottom: 8 }}>Description</div>
          <div style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.7 }}>
            This compost is made from locally sourced, fully broken-down organic matter. Excellent for enriching soil!
          </div>
        </div>
      </div>
      <div style={{ padding: '0 20px 40px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/farm-cart')}>Add to Cart</button>
        <button className="btn btn-outline" onClick={() => navigate('/farmer/farm-cart')}>Buy Now</button>
      </div>
    </div>
  )
}

// ── FARM CART ─────────────────────────────────────────────────────
export function FarmCartPage() {
  const navigate = useNavigate()
  const { cart, farmCartCount } = useFarmCart()
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const VALID_CODES = { 'FARM10': 10, 'RESTOCK20': 20 }

  const applyPromo = () => {
    const d = VALID_CODES[promoCode.toUpperCase()]
    if (d) setDiscount(d)
    else { setDiscount(0); alert('Invalid promo code') }
  }

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const delivery = 60
  const discountAmt = Math.round(subtotal * discount / 100)
  const total = subtotal + delivery - discountAmt + 0.5

  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Farm Cart ({farmCartCount})</span>
      </div>
      <div style={{ paddingBottom: 120 }}>
        {cart.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-subtle)' }}>
            <ShoppingCart size={48} color="var(--border)" style={{ marginBottom: 12 }} />
            <div style={{ fontWeight: 600, fontSize: 15 }}>Your farm cart is empty</div>
            <button className="btn btn-primary" style={{ marginTop: 20, maxWidth: 200 }} onClick={() => navigate('/farmer/marketplace')}>Browse Marketplace</button>
          </div>
        )}
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
              <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{item.name}</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>{item.priceLabel}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginTop: 6 }}>₹{item.price * item.qty}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              <button onClick={() => { for(let i=0;i<item.qty;i++) removeFromFarmCart(item.id) }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', fontSize: 12, fontFamily: 'var(--font)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Trash size={14} /> Remove
              </button>
              <div className="qty-control">
                <button className="qty-btn" onClick={() => removeFromFarmCart(item.id)}><Minus size={14} weight="bold" /></button>
                <span className="qty-num">{item.qty}</span>
                <button className="qty-btn" onClick={() => addToFarmCart(item)}><Plus size={14} weight="bold" /></button>
              </div>
            </div>
          </div>
        ))}

        {/* Promo */}
        <div style={{ display: 'flex', gap: 10, padding: '16px 20px', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
          <input value={promoCode} onChange={e => setPromoCode(e.target.value)} placeholder="Enter Promo Code (try FARM10)"
            style={{ flex: 1, padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: '8px', fontFamily: 'var(--font)', fontSize: 14, outline: 'none' }} />
          <button onClick={applyPromo} style={{ padding: '12px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>Apply</button>
        </div>

        {/* Summary */}
        <div className="order-summary-box" style={{ margin: '16px 20px' }}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Order Summary</div>
          {[['Subtotal', `₹${subtotal}`], ['Delivery Fee', `₹${delivery}`], ...(discount ? [['Discount', `-₹${discountAmt}`]] : []), ['Tax', '₹0.50']].map(([l, v]) => (
            <div key={l} className="summary-row">
              <span style={{ color: l === 'Discount' ? 'var(--primary)' : 'var(--text-subtle)' }}>{l}</span>
              <span style={{ color: l === 'Discount' ? 'var(--primary)' : undefined }}>{v}</span>
            </div>
          ))}
          <div className="summary-row total"><span>Total:</span><span>₹{total.toFixed(2)}</span></div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '16px 20px 32px', background: 'white', boxShadow: '0 -2px 20px rgba(0,0,0,0.08)' }}>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/farm-checkout')}>Proceed to Checkout</button>
      </div>
    </div>
  )
}

// ── FARM CHECKOUT ─────────────────────────────────────────────────
export function FarmCheckoutPage() {
  const navigate = useNavigate()
  const [delivery, setDelivery] = useState('request')

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header" style={{ background: 'var(--bg)' }}>
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Checkout</span>
      </div>
      <div style={{ paddingBottom: 120 }}>
        {/* Address */}
        <div className="checkout-section" style={{ margin: '12px 16px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ display:"flex", alignItems:"center", gap:6, fontSize: 13, fontWeight: 600 }}><MapPin size={14} weight="fill" color="var(--primary)" /> Delivery Address</span>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>Change</button>
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-subtle)', lineHeight: 1.6 }}>123 Campus Lane, Block B, Gurgaon, Haryana, 122018</div>
        </div>

        {/* Contact */}
        <div className="checkout-section" style={{ margin: '0 16px 12px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ display:"flex", alignItems:"center", gap:6, fontSize: 13, fontWeight: 600 }}><Phone size={14} color="var(--primary)" /> Contact Information</span>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>Change</button>
          </div>
          <div style={{ fontSize: 14, color: 'var(--text-subtle)' }}>Kshma Agrawal</div>
          <div style={{ fontSize: 13, color: 'var(--text-subtle)' }}>7830124625</div>
        </div>

        {/* Delivery options */}
        <div style={{ margin: '0 16px 12px', background: 'white', borderRadius: '16px', padding: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}> Delivery Options</div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className={`delivery-option ${delivery === 'request' ? 'selected' : ''}`} onClick={() => setDelivery('request')}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🚚</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Request Delivery</div>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 3 }}>WITHIN 2-3 DAYS</div>
            </div>
            <div className={`delivery-option ${delivery === 'pickup' ? 'selected' : ''}`} onClick={() => setDelivery('pickup')}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>🏃</div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Pickup Myself</div>
              <div style={{ fontSize: 11, color: 'var(--text-subtle)', marginTop: 3 }}>READY IN 2 HOURS</div>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div style={{ margin: '0 16px 12px', background: 'white', borderRadius: '16px', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ display:"flex", alignItems:"center", gap:6, fontSize: 13, fontWeight: 600 }}><CreditCard size={14} color="var(--primary)" /> Payment Method</span>
            <button style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>Change</button>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 6 }}>Cash on delivery</div>
        </div>

        {/* Promo */}
        <div style={{ display: 'flex', gap: 10, padding: '0 16px 12px' }}>
          <input placeholder="Enter Promo Code" style={{ flex: 1, padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: '8px', fontFamily: 'var(--font)', fontSize: 14, outline: 'none', background: 'white' }} />
          <button style={{ padding: '12px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}>Apply</button>
        </div>

        {/* Ordered items */}
        <div style={{ margin: '0 16px 12px', background: 'white', borderRadius: '16px', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
            <span>Ordered Items</span><span style={{ color: 'var(--text-subtle)' }}>3 Items</span>
          </div>
        </div>

        {/* Total */}
        <div style={{ margin: '0 16px', background: 'var(--primary-pale)', borderRadius: '16px', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 17 }}>
            <span>Total:</span><span>₹180.50</span>
          </div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '16px 20px 32px', background: 'white', boxShadow: '0 -2px 20px rgba(0,0,0,0.08)' }}>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/order-confirm')}>Place Order</button>
      </div>
    </div>
  )
}

// ── ORDER CONFIRMATION ────────────────────────────────────────────
export function FarmOrderConfirmPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Order Confirmation</span>
      </div>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', border: '4px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Check size={36} color="var(--primary)" weight="bold" />
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>Order Placed</div>
        <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Successfully!</div>
        <div style={{ fontSize: 14, color: 'var(--text-subtle)', marginBottom: 32 }}>Your Materials are on their way to you.</div>
      </div>

      {/* Farm image */}
      <div style={{ margin: '0 20px 20px', borderRadius: '16px', overflow: 'hidden', height: 160 }}>
        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" alt="farm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ margin: '0 20px 24px', background: 'var(--bg)', borderRadius: '16px', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700 }}>Order Details</span>
          <span style={{ fontSize: 12, fontWeight: 700, background: 'var(--primary-light)', color: 'var(--primary)', padding: '3px 10px', borderRadius: 10 }}>CONFIRMED</span>
        </div>
        {[['Order ID', '#FFC-88291'], ['Amount Paid', '₹42.50'], ['Delivery Address', '123 University Hall, Campus East'], ['Estimated Arrival', 'Today, 5:30 PM · In 45 mins']].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>{l}</span>
            <span style={{ fontSize: 13, fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{v}</span>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="btn btn-primary" onClick={() => navigate('/farmer/track-order')}>Track Your Order</button>
        <button className="btn btn-outline" onClick={() => navigate('/farmer/marketplace')}>Back</button>
      </div>
    </div>
  )
}

// ── ADD MATERIAL ──────────────────────────────────────────────────
export function AddMaterialPage() {
  const navigate = useNavigate()
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Add Material</span>
      </div>
      <div style={{ padding: '16px 20px 100px' }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 8 }}>Material Image</div>
          <div style={{ border: '2px dashed var(--border)', borderRadius: '12px', padding: '32px 20px', textAlign: 'center', cursor: 'pointer', background: 'var(--bg)' }}>
            <Camera size={32} color="var(--text-subtle)" style={{ marginBottom: 6 }} />
            <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-subtle)' }}>Upload Material Photo</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 3 }}>PNG, JPG or JPEG (Max. 5MB)</div>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Material Name</label>
          <input className="input-field no-icon" placeholder="e.g. OrganicCompost" />
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Quantity</label>
            <input className="input-field no-icon" placeholder="0.00" type="number" />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Unit</label>
            <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none' }}>
              <option>kg</option><option>ton</option><option>bale</option><option>litre</option>
            </select>
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Price per unit</label>
          <input className="input-field no-icon" placeholder="₹ 0.00" type="number" />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Category</label>
          <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none' }}>
            <option>Organic Manure</option><option>Crop Residue</option><option>Seeds</option><option>Equipment</option>
          </select>
        </div>
        <div style={{ marginBottom: 28 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Description</label>
          <textarea style={{ width: '100%', padding: 14, border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none', resize: 'none', minHeight: 90 }}
            defaultValue="This compost is made from locally sourced, fully broken-down organic matter. Excellent" />
        </div>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>Save &amp; List Material</button>
        <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>Cancel</button>
      </div>
    </div>
  )
}

// ── EDIT MATERIAL ─────────────────────────────────────────────────
export function EditMaterialPage() {
  const navigate = useNavigate()
  const [inStock, setInStock] = useState(true)
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Edit Material</span>
      </div>
      <div style={{ padding: '0 0 100px' }}>
        <div style={{ position: 'relative', height: 200, background: 'var(--primary-light)' }}>
          <img src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" alt="plant" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <button style={{ position: 'absolute', bottom: 12, right: 12, width: 36, height: 36, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow)' }}>
            <Camera size={18} color="var(--primary)" />
          </button>
        </div>
        <div style={{ padding: '20px' }}>
          {[['Material Name', 'Organic Compost'], ['', '']].slice(0,1).map(([l, v]) => (
            <div key={l} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>{l}</label>
              <input className="input-field no-icon" defaultValue={v} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Category</label>
            <select defaultValue="Organic Manure" style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none' }}>
              <option>Organic Manure</option><option>Crop Residue</option><option>Seeds</option>
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Quantity</label>
              <input className="input-field no-icon" defaultValue="45" type="number" />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Unit</label>
              <select style={{ width: '100%', padding: '14px', border: '1.5px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font)', fontSize: 14, background: 'white', outline: 'none' }}>
                <option>kg</option><option>ton</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-subtle)', marginBottom: 6, display: 'block' }}>Price per Unit</label>
            <input className="input-field no-icon" defaultValue="250" type="number" />
          </div>
          {/* Stock toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', border: '1.5px solid var(--border)', borderRadius: '12px', marginBottom: 28 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Stock Availability</div>
              <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Currently listed as In Stock</div>
            </div>
            <button onClick={() => setInStock(!inStock)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <div style={{ width: 48, height: 26, borderRadius: 13, background: inStock ? 'var(--primary)' : 'var(--border)', position: 'relative', transition: 'background 0.2s' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: inStock ? 25 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
              </div>
            </button>
          </div>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Save Changes</button>
          <button onClick={() => navigate(-1)} style={{ width: '100%', padding: 15, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font)', marginTop: 12 }}>
            Delete Material
          </button>
        </div>
      </div>
    </div>
  )
}

// ── MY PURCHASES ──────────────────────────────────────────────────
export function MyPurchasesPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')
  const orders = [
    { id: '#FFC-12345', amount: '₹420.50', date: '30 Mar', time: '12:31 pm', status: 'Out for Delivery', imgs: ['', ''] },
    { id: '#FFC-12345', amount: '₹420.50', date: '30 Mar', time: '12:31 pm', status: 'Completed', imgs: ['', ''] },
    { id: '#FFC-12345', amount: '₹420.50', date: '30 Mar', time: '12:31 pm', status: 'Processing', imgs: ['', ''] },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>My Purchases</span>
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', background: 'white', borderBottom: '1px solid var(--border)' }}>
        {['My purchases', 'Browse', 'My listings'].map(t => (
          <button key={t} className={`chip ${t === 'My purchases' ? 'chip-active' : 'chip-inactive'}`}
            onClick={() => { if (t === 'Browse') navigate('/farmer/marketplace'); if (t === 'My listings') navigate('/farmer/my-listings') }}
            style={{ padding: '8px 16px', fontSize: 13 }}>{t}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, padding: '12px 16px', background: 'white', borderBottom: '1px solid var(--border)' }}>
        {['All', 'Ongoing', 'Completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`chip ${filter === f ? 'chip-active' : 'chip-inactive'}`} style={{ padding: '7px 14px', fontSize: 12 }}>{f}</button>
        ))}
      </div>

      <div style={{ padding: '12px 16px' }}>
        {orders.map((o, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{o.id}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2 }}>{o.amount} · {o.date}, {o.time}</div>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--error)' }}><Trash size={18} /></button>
            </div>
            <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 20,
              background: o.status === 'Completed' ? 'var(--primary-light)' : o.status === 'Out for Delivery' ? '#e8f5e9' : '#fff8e1',
              color: o.status === 'Completed' ? 'var(--primary)' : o.status === 'Out for Delivery' ? 'var(--primary)' : '#f57f17' }}>{o.status}</span>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, marginBottom: 12 }}>
              {o.imgs.map((img, j) => (
                <div key={j} style={{ width: 48, height: 48, borderRadius: 8, background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>{img}</div>
              ))}
            </div>
            <button className="btn btn-primary" style={{ padding: '11px' }} onClick={() => navigate('/farmer/purchase/1')}>
              {o.status === 'Completed' ? 'Order Summary' : 'View Details'}
            </button>
          </div>
        ))}
      </div>
      <FarmerBottomNav active="resources" />
    </div>
  )
}

// ── PURCHASE DETAILS ──────────────────────────────────────────────
export function PurchaseDetailsPage() {
  const navigate = useNavigate()
  const isCompleted = false
  const items = [
    { name: 'Organic Compost', qty: '1 kg', price: '₹30', img: '' },
    { name: 'Dry Wheat Residue', qty: '1 kg', price: '₹40', img: '' },
    { name: 'Heirloom Seeds', qty: '1000 gm', price: '₹50', img: '' },
  ]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Purchase details</span>
      </div>
      <div style={{ padding: '12px 16px 100px' }}>
        {/* Order status pill */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '14px 16px', marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: isCompleted ? 'var(--primary-light)' : '#e3f2fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {isCompleted ? <Check size={18} color="var(--primary)" weight="bold" /> : <span style={{ fontSize: 18 }}>🔄</span>}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Order #FFC-12345</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>₹420.50 · 30 Mar, 12:31 pm</div>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20, background: isCompleted ? 'var(--primary-light)' : '#fff8e1', color: isCompleted ? 'var(--primary)' : '#f57f17' }}>
              {isCompleted ? 'Completed' : 'Ongoing'}
            </span>
          </div>
        </div>

        {/* Items */}
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Ordered Items <span style={{ color: 'var(--text-subtle)', fontWeight: 400, fontSize: 12 }}>3 Items</span></div>
          {items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{item.img}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{item.qty}</div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{item.price}</div>
            </div>
          ))}
        </div>

        {/* Seller info */}
        <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 12, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--primary-light)', overflow: 'hidden', fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧑‍</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>Harpal Singh</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-subtle)' }}><MapPin size={12} /> Gurgaon, Haryana</div>
              <div style={{ display:"flex", alignItems:"center", gap:4, fontSize: 13, color: '#F4C652', fontWeight: 600 }}><Star size={13} weight="fill" color="#F4C652" /> 4.5</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-outline" style={{ flex: 1, padding: '11px' }}>View Profile</button>
            <button className="btn btn-primary" style={{ flex: 1, padding: '11px' }}>{isCompleted ? 'Rate' : 'Contact'}</button>
          </div>
        </div>

        {/* Delivery agent */}
        {!isCompleted && (
          <div style={{ background: 'white', borderRadius: '16px', padding: 16, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--primary-light)', fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🚴</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Rahul Sharma</div>
                <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>On the way to you</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="contact-btn"><Phone size={16} /></button>
              <button className="contact-btn"><ChatCircle size={16} /></button>
            </div>
          </div>
        )}

        <button className="btn btn-primary" onClick={() => navigate('/farmer/track-order')}>
          {isCompleted ? 'Repeat Your Order' : 'Track Your Order'}
        </button>
        <button className="btn btn-outline" style={{ marginTop: 12 }} onClick={() => navigate(-1)}>
          {isCompleted ? 'Rate Items' : 'Continue Shopping'}
        </button>
      </div>
    </div>
  )
}

// ── TRACK ORDER ───────────────────────────────────────────────────
export function TrackOrderPage() {
  const navigate = useNavigate()
  const steps = [
    { label: 'Order Placed', time: '12:30 PM', done: true },
    { label: 'Packed', time: '12:45 PM', done: true },
    { label: 'Out for Delivery', time: "Rahul is on his way", done: true, sub: true },
    { label: 'Delivered', time: 'Pending', done: false },
  ]
  return (
    <div style={{ background: 'var(--white)', minHeight: '100vh' }}>
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate(-1)}><CaretLeft size={20} weight="bold" /></button>
        <span style={{ fontSize: 18, fontWeight: 700 }}>Track Order</span>
      </div>

      {/* Map placeholder */}
      <div style={{ height: 260, background: '#e8f4ea', position: 'relative', overflow: 'hidden' }}>
        <img src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4194,37.7749,13,0/430x260?access_token=placeholder" alt="map"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} onError={e => e.target.style.display = 'none'} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #a8d5a2 0%, #6eb86a 100%)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 8 }}>🗺️</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary-dark)' }}>Live tracking map</div>
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', background: 'white', borderRadius: 20, padding: '8px 18px', fontSize: 13, fontWeight: 600, boxShadow: 'var(--shadow)' }}>
          Arriving in 15 mins
        </div>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        {steps.map((s, i) => (
          <div key={i} className="tracking-step">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className={`step-dot ${s.done ? 'done' : 'pending'}`}>
                {s.done ? <Check size={12} color="white" weight="bold" /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
              </div>
              {i < steps.length - 1 && <div className={`step-line ${s.done ? 'done' : ''}`} />}
            </div>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontWeight: s.done ? 700 : 400, fontSize: 15, color: s.done ? 'var(--text-dark)' : 'var(--text-subtle)' }}>{s.label}</div>
              <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 2 }}>{s.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery agent */}
      <div style={{ margin: '16px 20px', background: 'var(--bg)', borderRadius: '16px', padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--primary-light)', fontSize: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🚴</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Rahul Sharma</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>On the way to you</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="contact-btn"><Phone size={16} /></button>
          <button className="contact-btn"><ChatCircle size={16} /></button>
        </div>
      </div>
    </div>
  )
}