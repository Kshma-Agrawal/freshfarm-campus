import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav, BottomNav, PageHeader, Stars, QtyControl, MagnifyingGlass, MapPin, Funnel } from '../components/UI'
import { useCart } from '../context/CartContext'
import { PRODUCTS, FARMERS, CATEGORIES } from '../data'

// ── HOME PAGE ─────────────────────────────────────────────────────
export function HomePage() {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart } = useCart()
  const getQty = (id) => cart.find(i => i.id === id)?.qty || 0

  return (
    <div className="screen">
      <TopNav />

      {/* Greeting + Search */}
      <div style={{ background: 'white', paddingBottom: 16 }}>
        <div className="home-greeting">
          <h2>Good Morning, Kshma 👋</h2>
          <p>Fresh produce delivered today</p>
        </div>
        <div className="search-wrap">
          <div className="search-inner" onClick={() => navigate('/search')}>
            <span className="search-icon-pos"><MagnifyingGlass size={18} /></span>
            <input readOnly placeholder="Search fresh produce, farmers…" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="section" style={{ marginTop: 16 }}>
        <div className="section-header">
          <span className="section-title">Categories</span>
          <button className="see-all" onClick={() => navigate('/search')}>See All</button>
        </div>
        <div className="h-scroll">
          {CATEGORIES.map((cat, i) => (
            <div key={cat} className={`chip ${i === 0 ? 'chip-active' : 'chip-inactive'}`}
              onClick={() => navigate('/search')}>
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Nearby Farmers */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Nearby Farmers</span>
          <button className="see-all" onClick={() => navigate('/farmers')}>See All</button>
        </div>
        <div className="h-scroll">
          {FARMERS.slice(0, 4).map(farmer => (
            <div key={farmer.id} className="farmer-card-h" onClick={() => navigate(`/view-farmer/${farmer.id}`)}>
              <div className="farmer-card-avatar">
                <img src={farmer.img} alt={farmer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="farmer-card-name">{farmer.name}</div>
              <div className="farmer-card-meta">
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <MapPin size={11} weight="fill" color="var(--text-subtle)" /> {farmer.dist}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'center' }}>
                <span style={{ color: '#F4C652', fontSize: 13 }}>★</span>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{farmer.rating}</span>
              </div>
              {farmer.verified && (
                <div style={{ fontSize: 11, color: 'var(--primary)', background: 'var(--primary-light)', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>
                  ✓ Verified
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Best Selling */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Best Selling</span>
          <button className="see-all" onClick={() => navigate('/search')}>See All</button>
        </div>
        <div className="product-grid">
          {PRODUCTS.slice(0, 6).map(product => {
            const qty = getQty(product.id)
            return (
              <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="product-img">
                  <img src={product.img} alt={product.name} />
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-farmer-name">{product.farmer}</div>
                  <div className="product-footer">
                    <span className="product-price">₹{product.price}/{product.unit}</span>
                    <QtyControl qty={qty} onAdd={() => addToCart(product)} onRemove={() => removeFromCart(product.id)} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div style={{ height: 16 }} />
      <BottomNav />
    </div>
  )
}

// ── SEARCH PAGE ───────────────────────────────────────────────────
export function SearchPage() {
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart } = useCart()
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const getQty = (id) => cart.find(i => i.id === id)?.qty || 0

  const filtered = PRODUCTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) || p.farmer.toLowerCase().includes(query.toLowerCase())
    return matchCat && matchQ
  })

  return (
    <div className="screen">
      <div style={{ background: 'white', padding: '14px 20px 10px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.011em' }}>Browse Produce</div>
        <div className="search-inner">
          <span className="search-icon-pos"><MagnifyingGlass size={18} /></span>
          <input placeholder="Search produce or farmers…" value={query} onChange={e => setQuery(e.target.value)}
            style={{ width: '100%', padding: '13px 44px', background: 'transparent', border: 'none', fontFamily: 'var(--font)', fontSize: 14, fontWeight: 500, color: 'var(--text-dark)', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 4, scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => (
            <div key={cat} className={`chip ${activeCategory === cat ? 'chip-active' : 'chip-inactive'}`}
              style={{ padding: '8px 16px', fontSize: 13 }}
              onClick={() => setActiveCategory(cat)}>
              {cat}
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>{filtered.length} results</span>
        <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, border: '1.5px solid var(--border)', background: 'white', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)', color: 'var(--text-dark)' }}>
          <Funnel size={14} /> Filter
        </button>
      </div>

      <div className="product-grid">
        {filtered.map(product => {
          const qty = getQty(product.id)
          return (
            <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
              <div className="product-img">
                <img src={product.img} alt={product.name} />
              </div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-farmer-name">{product.farmer}</div>
                <div className="product-footer">
                  <span className="product-price">₹{product.price}/{product.unit}</span>
                  <QtyControl qty={qty} onAdd={() => addToCart(product)} onRemove={() => removeFromCart(product.id)} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ height: 16 }} />
      <BottomNav />
    </div>
  )
}

// ── FARMERS LIST ──────────────────────────────────────────────────
export function FarmersPage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const farmerCats = ['All', 'Nearby', 'Organic', 'Fresh Today', 'Premium', 'Seasonal']

  const filtered = FARMERS.filter(f => {
    const matchQ = !query || f.name.toLowerCase().includes(query.toLowerCase())
    const matchCat = catFilter === 'All' || f.tags.includes(catFilter) || (catFilter === 'Nearby' && parseFloat(f.dist) < 3)
    return matchQ && matchCat
  })

  return (
    <div className="screen">
      <TopNav />
      <div style={{ background: 'white', padding: '12px 20px 0', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.011em' }}>Browse Farmer</div>
        <div className="search-inner" style={{ marginBottom: 12 }}>
          <span className="search-icon-pos"><MagnifyingGlass size={18} /></span>
          <input placeholder="Search farmer by name or produce" value={query} onChange={e => setQuery(e.target.value)}
            style={{ width: '100%', padding: '13px 44px', background: 'transparent', border: 'none', fontFamily: 'var(--font)', fontSize: 14, fontWeight: 500, color: 'var(--text-dark)', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 700 }}>Categories</span>
          <button className="see-all">See All</button>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, scrollbarWidth: 'none' }}>
          {farmerCats.map(c => (
            <button key={c} onClick={() => setCatFilter(c)}
              className={`chip ${catFilter === c ? 'chip-active' : 'chip-inactive'}`}
              style={{ padding: '8px 16px', fontSize: 13, flexShrink: 0 }}>{c}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '12px 16px 16px' }}>
        {filtered.map(farmer => {
          const farmerProducts = PRODUCTS.filter(p => p.farmerId === farmer.id).slice(0, 2)
          return (
            <div key={farmer.id} style={{ background: 'white', borderRadius: 16, padding: 16, marginBottom: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 10 }}>
                <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--border)' }}>
                  <img src={farmer.img} alt={farmer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{farmer.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-subtle)', marginTop: 3 }}>
                    <MapPin size={12} weight="fill" color="var(--text-subtle)" /> {farmer.location}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                    <span style={{ color: '#F4C652', fontSize: 14 }}>★</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{farmer.rating}</span>
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginBottom: 10 }}>
                {farmer.specialty}
              </div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                {farmer.tags.map(t => (
                  <span key={t} style={{ fontSize: 12, fontWeight: 500, padding: '4px 12px', borderRadius: 20, border: '1px solid var(--border)', color: 'var(--text-dark)', background: 'white' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  {farmerProducts.map(p => (
                    <div key={p.id} style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                      <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
                <button style={{ padding: '10px 20px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font)' }}
                  onClick={() => navigate(`/view-farmer/${farmer.id}`)}>View More</button>
              </div>
            </div>
          )
        })}
      </div>
      <BottomNav />
    </div>
  )
}