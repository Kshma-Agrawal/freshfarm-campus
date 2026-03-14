import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TopNav, BottomNav, PageHeader, Stars, QtyControl, MapPin, CaretLeft, Check, SealCheck, ShoppingCart, ChatCircle, PencilSimple } from '../components/UI'
import { useCart } from '../context/CartContext'
import { PRODUCTS, FARMERS } from '../data'

// ── PRODUCT DETAIL — Matches Figma exactly ────────────────────────
export function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart, cartCount } = useCart()
  const product = PRODUCTS.find(p => p.id === Number(id))
  const qty = cart.find(i => i.id === Number(id))?.qty || 0
  const [activeImg, setActiveImg] = useState(0)
  const farmer = FARMERS.find(f => f.id === product?.farmerId)

  if (!product) return <div style={{ padding: 40, textAlign: 'center' }}>Product not found</div>

  const images = product.images || [product.img]

  // Rating bars data
  const ratingBars = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 14 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 2 },
    { stars: 1, pct: 1 },
  ]

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <TopNav />

      {/* Hero image with back btn + carousel */}
      <div style={{ position: 'relative', background: 'white' }}>
        <button style={{ position: 'absolute', top: 14, left: 14, zIndex: 10, background: 'white', border: 'none', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.12)' }}
          onClick={() => navigate(-1)}>
          <CaretLeft size={20} weight="bold" />
        </button>
        <div style={{ width: '100%', height: 260, overflow: 'hidden', background: '#f0f0f0' }}>
          <img src={images[activeImg]} alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        {/* Dot indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, padding: '12px 0 16px', background: 'white' }}>
          {images.map((_, i) => (
            <div key={i} onClick={() => setActiveImg(i)}
              style={{ width: i === activeImg ? 20 : 8, height: 8, borderRadius: 4, background: i === activeImg ? 'var(--primary)' : '#d0d0d0', cursor: 'pointer', transition: 'all 0.2s' }} />
          ))}
        </div>
      </div>

      {/* Info card */}
      <div style={{ margin: '10px 14px', background: 'white', borderRadius: 14, padding: '18px 16px' }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--primary)', background: 'var(--primary-light)', padding: '4px 12px', borderRadius: 20 }}>
          In Stock
        </span>
        <div style={{ fontSize: 20, fontWeight: 800, marginTop: 10, letterSpacing: '-0.011em', lineHeight: 1.2 }}>{product.name}</div>
        <div style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 600, marginTop: 4 }}>By {product.farmer}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
          <Stars rating={product.rating} size={14} />
          <span style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>({product.reviews} reviews)</span>
        </div>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-dark)', marginTop: 10 }}>
          Rs.{product.price}/{product.unit}
        </div>
      </div>

      {/* Description */}
      <div style={{ margin: '0 14px 10px', background: 'white', borderRadius: 14, padding: '16px' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.011em' }}>Description</div>
        <p style={{ fontSize: 13, color: 'var(--text-subtle)', lineHeight: 1.7, fontWeight: 500, textAlign: 'justify' }}>{product.desc}</p>
      </div>

      {/* Farmer card */}
      {farmer && (
        <div style={{ margin: '0 14px 10px', background: 'white', borderRadius: 14, padding: '16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid var(--border)' }}>
            <img src={farmer.img} alt={farmer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.011em' }}>{farmer.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4, fontSize: 12, color: 'var(--text-subtle)', fontWeight: 500 }}>
              <MapPin size={12} weight="fill" color="var(--text-subtle)" />
              {farmer.location}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <span style={{ color: '#F4C652', fontSize: 14 }}>★</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{farmer.rating}</span>
            </div>
          </div>
          <button
            style={{ padding: '10px 18px', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font)', flexShrink: 0 }}
            onClick={() => navigate(`/farmer/${farmer.id}`)}>
            View Profile
          </button>
        </div>
      )}

      {/* Customer Feedback */}
      <div style={{ margin: '0 14px 10px', background: 'white', borderRadius: 14, padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ChatCircle size={18} weight="duotone" color="var(--primary)" />
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.011em' }}>Customer Feedback</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <PencilSimple size={14} /> Write a review
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16 }}>
          {/* Big score */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: 'var(--text-dark)', lineHeight: 1 }}>4.8</div>
          </div>
          {/* Bars */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {ratingBars.map(({ stars, pct }) => (
              <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 500, minWidth: 8 }}>{stars}</span>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#e8e8e8', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample review */}
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{product.reviewAuthor}</span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ color: i <= 4 ? '#F4C652' : '#e0e0e0', fontSize: 13 }}>★</span>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-subtle)', fontStyle: 'italic', lineHeight: 1.5, fontWeight: 500 }}>
            {product.reviewText}
          </p>
        </div>
      </div>

      {/* Sticky bottom actions */}
      <div style={{ height: 20 }} />
      <div style={{ position: 'sticky', bottom: 0, background: 'white', borderTop: '1px solid var(--border)', padding: '12px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 50 }}>
        <button className="btn btn-primary" style={{ fontSize: 15 }}
          onClick={() => { if (qty === 0) addToCart(product) }}>
          {qty === 0 ? '+ Add to Cart' : `In Cart (${qty})`}
        </button>
        <button className="btn btn-outline" style={{ fontSize: 15 }}
          onClick={() => { if (qty === 0) addToCart(product); navigate('/cart') }}>
          Buy Now
        </button>
      </div>
    </div>
  )
}

// ── FARMER PROFILE — Matches Figma exactly ────────────────────────
export function FarmerProfilePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cart, addToCart, removeFromCart } = useCart()
  const farmer = FARMERS.find(f => f.id === Number(id))
  const products = PRODUCTS.filter(p => p.farmerId === Number(id))
  const getQty = (pid) => cart.find(i => i.id === pid)?.qty || 0

  if (!farmer) return <div style={{ padding: 40, textAlign: 'center' }}>Farmer not found</div>

  const ratingBars = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 14 },
    { stars: 3, pct: 5 },
  ]

  return (
    <div className="screen" style={{ background: 'var(--bg)' }}>
      <TopNav />
      <PageHeader title="Farmer Profile" />

      {/* Avatar + info */}
      <div style={{ background: 'white', padding: '28px 20px 24px', textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
        <div style={{ width: 100, height: 100, borderRadius: '50%', margin: '0 auto 16px', border: '3px solid white', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', overflow: 'hidden', background: '#f0ebe3' }}>
          <img src={farmer.img} alt={farmer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.011em' }}>{farmer.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 6, fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>
          <MapPin size={13} weight="fill" color="var(--text-subtle)" />
          {farmer.location} ({farmer.dist})
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 8 }}>
          <span style={{ color: '#F4C652', fontSize: 16 }}>★</span>
          <span style={{ fontSize: 14, fontWeight: 700 }}>{farmer.rating}</span>
          <span style={{ fontSize: 13, color: 'var(--text-subtle)', fontWeight: 500 }}>({farmer.reviews} reviews)</span>
        </div>
        {farmer.verified && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 12, background: 'white', border: '1.5px solid var(--primary)', color: 'var(--primary)', padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>
            <Check size={14} weight="bold" color="var(--primary)" />
            Verified Farmer
          </div>
        )}
        <div style={{ fontSize: 13, color: 'var(--text-subtle)', marginTop: 14, fontWeight: 500 }}>
          {farmer.desc}
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', background: 'white', borderBottom: '1px solid var(--border)' }}>
        {[
          { num: farmer.products, lbl: 'Products' },
          { num: `${farmer.exp}+`, lbl: 'Years Exp.' },
          { num: `${farmer.orders}+`, lbl: 'Orders' },
        ].map((s, i) => (
          <div key={s.lbl} style={{ flex: 1, padding: '18px 0', textAlign: 'center', borderRight: i < 2 ? '1px solid var(--border)' : 'none' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-dark)', letterSpacing: '-0.011em' }}>{s.num}</div>
            <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 4, fontWeight: 500 }}>{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Available Produce */}
      <div style={{ padding: '20px 14px 10px' }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.011em', marginBottom: 14, textAlign: 'center' }}>Available Produce</div>
        <div className="product-grid" style={{ padding: 0 }}>
          {products.map(p => {
            const qty = getQty(p.id)
            return (
              <div key={p.id} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.06)', cursor: 'pointer' }}
                onClick={() => navigate(`/product/${p.id}`)}>
                <div style={{ height: 140, overflow: 'hidden', background: 'var(--primary-light)' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '10px 12px 12px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.011em' }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: 2, fontWeight: 500 }}>{p.farmer}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>₹{p.price}/{p.unit}</span>
                    <QtyControl qty={qty} onAdd={() => addToCart(p)} onRemove={() => removeFromCart(p.id)} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Customer Reviews section */}
      <div style={{ margin: '8px 14px 14px', background: 'white', borderRadius: 14, padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <ChatCircle size={18} weight="duotone" color="var(--primary)" />
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '-0.011em' }}>Customer Review</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--primary)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <PencilSimple size={14} /> Rate us
          </div>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ fontSize: 44, fontWeight: 800, lineHeight: 1 }}>4.8</div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
            {ratingBars.map(({ stars, pct }) => (
              <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 11, color: 'var(--text-subtle)', fontWeight: 500, minWidth: 8 }}>{stars}</span>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: '#e8e8e8', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--primary)', borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{farmer.reviewAuthor}</span>
            <div style={{ display: 'flex', gap: 2 }}>
              {[1,2,3,4,5].map(i => (
                <span key={i} style={{ color: i <= 4 ? '#F4C652' : '#e0e0e0', fontSize: 13 }}>★</span>
              ))}
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-subtle)', fontStyle: 'italic', lineHeight: 1.5, fontWeight: 500 }}>
            {farmer.reviewText}
          </p>
        </div>
      </div>

      {/* Sticky bottom actions */}
      <div style={{ height: 10 }} />
      <div style={{ position: 'sticky', bottom: 0, background: 'white', borderTop: '1px solid var(--border)', padding: '12px 16px 20px', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 50 }}>
        <button className="btn btn-primary" style={{ fontSize: 15 }} onClick={() => navigate('/cart')}>
          Place Order
        </button>
        <button className="btn btn-outline" style={{ fontSize: 15 }}>
          Message Farmer
        </button>
      </div>
    </div>
  )
}
