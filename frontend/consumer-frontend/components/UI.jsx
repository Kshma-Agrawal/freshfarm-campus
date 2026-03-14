import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import logoImg from '../assets/logo.png'
import logoWordmarkImg from '../assets/logo-wordmark.png'

// ── PHOSPHOR ICONS ─────────────────────────────────────────────────
import {
  House, MagnifyingGlass, ShoppingCart, User,
  MapPin, Bell, CaretDown, CaretLeft, CaretRight,
  Eye, EyeSlash, Lock, Phone, EnvelopeSimple,
  Check, X, Trash, Funnel, Star,
  Package, CreditCard, Gear, SignOut,
  PencilSimple, ChatCircle, Plus, Minus,
  MapTrifold, SealCheck, Heart
} from '@phosphor-icons/react'

export { logoImg, logoWordmarkImg }

// ── STARS ────────────────────────────────────────────────────────
export function Stars({ rating, size = 13 }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          weight={i < full ? 'fill' : (i === full && half ? 'regular' : 'regular')}
          color={i < full || (i === full && half) ? '#F4C652' : '#e0e0e0'}
        />
      ))}
      <span style={{ fontSize: size - 1, color: 'var(--text-subtle)', marginLeft: 4, fontWeight: 600 }}>
        {rating}
      </span>
    </span>
  )
}

// ── QTY CONTROL ───────────────────────────────────────────────────
export function QtyControl({ qty, onAdd, onRemove, stopPropagation = true }) {
  const wrap = (fn) => (e) => { if (stopPropagation) e.stopPropagation(); fn() }
  if (qty === 0) {
    return (
      <button className="add-btn" onClick={wrap(onAdd)}>
        <Plus size={14} weight="bold" /> Add
      </button>
    )
  }
  return (
    <div className="qty-control" onClick={e => stopPropagation && e.stopPropagation()}>
      <button className="qty-btn" onClick={wrap(onRemove)}><Minus size={14} weight="bold" /></button>
      <span className="qty-num">{qty}</span>
      <button className="qty-btn" onClick={wrap(onAdd)}><Plus size={14} weight="bold" /></button>
    </div>
  )
}

// ── GOOGLE ICON ───────────────────────────────────────────────────
export function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

// ── TOP NAV ───────────────────────────────────────────────────────
export function TopNav({ showLocation = true, location = 'Gurgaon, Haryana' }) {
  const navigate = useNavigate()
  return (
    <div className="top-nav">
      <div className="logo-area">
        <div className="logo-circle">
          <img src={logoImg} alt="Fresh Farm" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div className="logo-text">Fresh Farms</div>
          <div className="logo-sub">Campus</div>
        </div>
      </div>
      {showLocation && (
        <div className="location-pill" onClick={() => navigate('/location')}>
          <MapPin size={13} weight="fill" />
          <span>{location}</span>
          <CaretDown size={13} weight="bold" />
        </div>
      )}
      <button className="icon-btn" onClick={() => navigate('/notifications')}>
        <Bell size={22} />
      </button>
    </div>
  )
}

// ── BOTTOM NAV ────────────────────────────────────────────────────
export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { cartCount } = useCart()

  const items = [
    { key: '/home', icon: House, label: 'Home' },
    { key: '/search', icon: MagnifyingGlass, label: 'Search' },
    { key: '/cart', icon: ShoppingCart, label: 'Cart' },
    { key: '/profile', icon: User, label: 'Profile' },
  ]

  const active = items.find(i => i.key === location.pathname)?.key || '/home'

  return (
    <nav className="bottom-nav">
      {items.map(({ key, icon: Icon, label }) => {
        const isActive = active === key

        return (
          <button
            key={key}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(key)}
          >
            <span className="nav-icon">
              <Icon
                size={24}
                weight={isActive ? "fill" : "bold"}
                color={isActive ? "var(--primary)" : "#222"}
              />

              {key === '/cart' && cartCount > 0 && (
                <span className="badge">{cartCount}</span>
              )}
            </span>

            <span>{label}</span>

            {isActive && <div className="nav-active-dot" />}
          </button>
        )
      })}
    </nav>
  )
}

// ── PAGE HEADER ───────────────────────────────────────────────────
export function PageHeader({ title, onBack }) {
  const navigate = useNavigate()
  return (
    <div className="page-header">
      <button className="back-btn" onClick={onBack || (() => navigate(-1))}>
        <CaretLeft size={20} weight="bold" />
      </button>
      <span style={{ fontSize: 'var(--text-h2)', fontWeight: 700, letterSpacing: '-0.011em' }}>{title}</span>
    </div>
  )
}

// Re-export Phosphor icons for use in pages
export {
  House, MagnifyingGlass, ShoppingCart, User,
  MapPin, Bell, CaretDown, CaretLeft, CaretRight,
  Eye, EyeSlash, Lock, Phone, EnvelopeSimple,
  Check, X, Trash, Funnel, Star,
  Package, CreditCard, Gear, SignOut,
  PencilSimple, ChatCircle, Plus, Minus,
  MapTrifold, SealCheck, Heart
}
