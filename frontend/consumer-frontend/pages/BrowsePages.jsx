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
          <h2>Hello, Kshma 👋</h2>
          <p>What fresh produce are you looking for?</p>
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

      {/* Farmers Near You */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Farmers Near You</span>
          <button className="see-all" onClick={() => navigate('/farmers')}>See All</button>
        </div>
        <div className="h-scroll">
          {FARMERS.slice(0, 4).map(farmer => (
            <div key={farmer.id} className="farmer-card-h" onClick={() => navigate(`/farmer/${farmer.id}`)}>
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
                <span style={{ fontSize: 12, color: 'var(--text-subtle)', fontWeight: 500 }}>({farmer.reviews})</span>
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

      {/* Fresh Picks */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">Fresh Picks</span>
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
  return (
    <div className="screen">
      <PageHeader title="Farmers Near You" />
      {FARMERS.map(farmer => (
        <div key={farmer.id} className="farmer-list-item" onClick={() => navigate(`/farmer/${farmer.id}`)}>
          <div className="farmer-avatar">
            <img src={farmer.img} alt={farmer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{farmer.name}</span>
              {farmer.verified && (
                <span style={{ fontSize: 11, color: 'var(--primary)', background: 'var(--primary-light)', padding: '2px 8px', borderRadius: 20, fontWeight: 600 }}>✓</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 12, color: 'var(--text-subtle)', fontWeight: 500 }}>
              <MapPin size={11} weight="fill" color="var(--text-subtle)" /> {farmer.location} • {farmer.dist}
            </div>
            <div style={{ display: 'flex', align: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
              {farmer.tags.map(t => (
                <span key={t} className="tag tag-green">{t}</span>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
              <span style={{ color: '#F4C652', fontSize: 13 }}>★</span>
              <span style={{ fontSize: 13, fontWeight: 700 }}>{farmer.rating}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2, fontWeight: 500 }}>{farmer.reviews} reviews</div>
          </div>
        </div>
      ))}
      <BottomNav />
    </div>
  )
}
